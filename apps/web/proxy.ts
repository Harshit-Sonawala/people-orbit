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
      body = await request.json();
    } else {
      body = undefined;
    }

    const apiResponse = await axios({
      url: targetUrl,
      method: request.method,
      headers: Object.fromEntries(headers.entries()),
      data: body,
      validateStatus: () => true, // pass through all status codes like 4xx, 5xx
    });

    return new NextResponse(JSON.stringify(apiResponse.data), {
      status: apiResponse.status,
      headers: {
        "Content-Type": String(
          apiResponse.headers["content-type"] ?? "application/json",
        ),
      },
    });
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
