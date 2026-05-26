import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

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

  try {
    const headers = new Headers(request.headers);
    headers.delete("host"); // Remove host header so Axios will correctly & automatically set it

    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        body = await request.json();
      } catch {
        body = undefined;
      }
    }

    const apiResponse = await axios({
      url: targetUrl,
      method: request.method,
      headers: Object.fromEntries(headers.entries()),
      data: body,
      validateStatus: () => true, // pass through all status codes like 4xx, 5xx
    });

    const isAuthRoute =
      pathname === "/api/auth/signup" || pathname === "/api/auth/login";

    // Handle both auth and non auth routes response data
    const { accessToken, refreshToken, ...responseBody } =
      isAuthRoute && apiResponse.data
        ? apiResponse.data
        : {
            accessToken: undefined,
            refreshToken: undefined,
            ...apiResponse.data,
          };

    const response = new NextResponse(JSON.stringify(responseBody), {
      status: apiResponse.status,
      headers: {
        "Content-Type": String(
          apiResponse.headers["content-type"] ?? "application/json",
        ),
      },
    });

    // Signup or login request, successful and received data
    if (isAuthRoute && apiResponse.status >= 200 && apiResponse.status < 300) {
      if (accessToken) {
        response.cookies.set("accessToken", accessToken, {
          httpOnly: true, // block document.cookie reads and XSS attacks
          secure: process.env.NODE_ENV === "production", // send over https only. always true in production
          sameSite: "strict", // cookies sent only if user on same site
          path: "/", // which path the cookie is sent
          maxAge: 30 * 60, // 30 minutes
        });
      }
      if (refreshToken) {
        response.cookies.set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        });
      }
    }

    // Logout request, delete token cookies
    if (pathname === "/api/auth/logout") {
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
