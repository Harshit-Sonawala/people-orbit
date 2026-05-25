import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

// Proxy function to forward requests from Next.js to the NestJS backend.
export async function proxy(request: NextRequest) {
  const { pathname, search } = new URL(request.url); // "/api/auth", "/login",

  const BACKEND_URL =
    process.env.INTERNAL_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL; // to solve docker internal network issue

  if (!BACKEND_URL) {
    return NextResponse.json(
      { message: "Backend URL configuration missing" },
      { status: 500 },
    );
  }

  const targetUrl = `${BACKEND_URL}${pathname}${search}`;

  try {
    const incomingHeaders = Object.fromEntries(request.headers.entries());
    delete incomingHeaders.host; // remove host header to allow Axios to set it correctly

    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.json();
    } else {
      body = undefined;
    }

    const apiResponse = await axios({
      url: targetUrl,
      method: request.method,
      headers: {
        ...incomingHeaders,
        "Content-Type": "application/json",
      },
      data: body,
      validateStatus: () => true, // pass through all status codes like 4xx, 5xx
    });

    return new NextResponse(JSON.stringify(apiResponse.data), {
      status: apiResponse.status,
      headers: { "Content-Type": "application/json" },
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
