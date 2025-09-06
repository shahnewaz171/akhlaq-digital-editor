// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If home page ("/") then redirect to "/docs"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/docs", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only on root ("/")
export const config = {
  matcher: ["/"],
};
