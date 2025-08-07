import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname === "/") {
    const token = request.cookies.get("ipm_access_token");
    if (token) {
      // If token exists, go to /featured
      return NextResponse.redirect(new URL("/featured", request.url));
    } else {
      // If no token, go to /login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // For all other paths, just continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
