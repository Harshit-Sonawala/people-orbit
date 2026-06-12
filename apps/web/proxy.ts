import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { getMeServer } from "./utils/getMeServer";

// Proxy function to forward requests from Next.js to the NestJS backend.
export default async function proxy(
  request: NextRequest,
): Promise<NextResponse> {
  const { pathname, search } = new URL(request.url); // "/api/auth", "/login",
  console.log(`[Proxy] ${request.method} ${pathname}${search}`);

  const BACKEND_URL =
    process.env.INTERNAL_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL; // for docker internal network
  if (!BACKEND_URL) {
    return NextResponse.json(
      { message: "Backend URL configuration missing" },
      { status: 500 },
    );
  }
  const targetUrl = `${BACKEND_URL}${pathname}${search}`;
  const isLoginOrSignup =
    pathname === "/api/auth/signup" || pathname === "/api/auth/login";
  const isRefresh = pathname === "/api/auth/refresh";
  const isLogout = pathname === "/api/auth/logout";

  try {
    // REQUEST SIDE
    const headers = new Headers(request.headers);
    headers.delete("host"); // Remove host header so Axios will correctly & automatically set it

    // Always send the accessToken with every request:
    const accessToken = request.cookies.get("accessToken")?.value;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        body = await request.json();
      } catch {
        body = undefined;
      }
    }

    // For routes that need it, add the cookie to the request body
    if (isLogout) {
      const refreshToken = request.cookies.get("refreshToken")?.value;
      if (refreshToken) {
        body = { ...body, refreshToken };
      }
    }

    // For refresh route add both tokens from cookies into request body
    if (pathname === "/api/auth/refresh") {
      const refreshToken = request.cookies.get("refreshToken")?.value;
      if (accessToken) body = { ...body, accessToken };
      if (refreshToken) body = { ...body, refreshToken };
    }

    // RESPONSE SIDE
    const apiResponse = await axios({
      url: targetUrl,
      method: request.method,
      headers: Object.fromEntries(headers.entries()),
      data: body,
      validateStatus: () => true, // pass through all status codes like 4xx, 5xx
    });

    // Refresh Interceptor
    // 401 on a non-auth route
    if (
      apiResponse.status === 401 &&
      !isLoginOrSignup &&
      !isRefresh &&
      !isLogout
    ) {
      const oldRefreshToken = request.cookies.get("refreshToken")?.value;
      const oldAccessToken = request.cookies.get("accessToken")?.value;

      if (oldRefreshToken) {
        const refreshResponse = await axios({
          url: `${BACKEND_URL}/api/auth/refresh`,
          method: "POST",
          data: { accessToken: oldAccessToken, refreshToken: oldRefreshToken },
          validateStatus: () => true, // pass through all status codes like 4xx, 5xx
        });

        if (refreshResponse.status >= 200 && refreshResponse.status < 300) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;

          // Retry original request with the newAccessToken
          const retryHeaders = Object.fromEntries(headers.entries());
          if (newAccessToken)
            retryHeaders["Authorization"] = `Bearer ${newAccessToken}`;

          const retryResponse = await axios({
            url: targetUrl,
            method: request.method,
            headers: retryHeaders,
            data: body,
            validateStatus: () => true,
          });

          const retryNextResponse = new NextResponse(
            JSON.stringify(retryResponse.data),
            {
              status: retryResponse.status,
              headers: {
                "Content-Type": String(
                  retryResponse.headers["content-type"] ?? "application/json",
                ),
              },
            },
          );

          if (newAccessToken) {
            retryNextResponse.cookies.set("accessToken", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              maxAge: 30 * 60,
            });
          }

          if (newRefreshToken) {
            retryNextResponse.cookies.set("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              path: "/",
              maxAge: 7 * 24 * 60 * 60,
            });
          }

          return retryNextResponse;
        } else {
          // Refresh failed - clear cookies and return a 401 so FE can logout
          const expiredResponse = NextResponse.json(
            { message: "Session expired" },
            { status: 401 },
          );
          expiredResponse.cookies.delete("accessToken");
          expiredResponse.cookies.delete("refreshToken");
          return expiredResponse;
        }
      }
    }

    const isResponseSuccess =
      apiResponse.status >= 200 && apiResponse.status < 300;

    // Handle both auth and non auth routes response data
    // Only get accessToken, refreshToken if it was an auth route and received apiResponse.data, else simply data, tokens are undefined
    const {
      accessToken: tokenFromResponse,
      refreshToken: refreshTokenFromResponse,
      ...responseBody
    } = (isLoginOrSignup || isRefresh) && apiResponse.data
      ? apiResponse.data
      : {
          accessToken: undefined,
          refreshToken: undefined,
          ...apiResponse.data,
        };

    // Immediately fetch the user details here and attach it to the response for usage in useAuth onSuccess
    if (isLoginOrSignup && isResponseSuccess && tokenFromResponse) {
      try {
        const user = await getMeServer(tokenFromResponse);
        if (user) responseBody.user = user;
      } catch (e) {
        console.error("[Proxy] getMeServer failed: ", e);
      }
    }

    // New basic response to forward to the FE
    const response = new NextResponse(JSON.stringify(responseBody), {
      status: apiResponse.status,
      headers: {
        "Content-Type": String(
          apiResponse.headers["content-type"] ?? "application/json",
        ),
      },
    });

    // if a Signup or login request, successful and received data, set the tokens in the cookies
    if ((isLoginOrSignup || isRefresh) && isResponseSuccess) {
      if (tokenFromResponse) {
        response.cookies.set("accessToken", tokenFromResponse, {
          httpOnly: true, // block document.cookie reads and XSS attacks
          secure: process.env.NODE_ENV === "production", // send over https only. always true in production
          sameSite: "strict", // cookies sent only if user on same site
          path: "/", // which path the cookie is sent
          maxAge: 30 * 60, // 30 minutes
        });
      }
      if (refreshTokenFromResponse) {
        response.cookies.set("refreshToken", refreshTokenFromResponse, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });
      }
    }

    // Logout request, delete token cookies
    if (pathname === "/api/auth/logout" && isResponseSuccess) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
    }

    return response;
  } catch (error) {
    console.error("Proxy error:", error);

    let status = 500;
    let message = "Internal Server Error";

    if (error instanceof AxiosError) {
      status = error.response?.status || 500;
      message = error.response?.data?.message || error.message;
    }

    return NextResponse.json({ message }, { status });
  }
}

// Scope this proxy to only intercept /api/* routes
export const config = {
  matcher: "/api/:path*",
};
