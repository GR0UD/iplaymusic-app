// middleware.js
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow /login only when NOT logged in. If logged in, kick to /featured.
  if (pathname.startsWith("/login")) {
    if (request.cookies.has("ipm_access_token")) {
      return NextResponse.redirect(new URL("/featured", request.url));
    }
    return NextResponse.next();
  }

  // Already authenticated
  if (request.cookies.has("ipm_access_token")) {
    // Root goes to /featured when logged in
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/featured", request.url));
    }
    return NextResponse.next();
  }

  // Not authenticated
  console.log("middleware: No access token");

  // Any page when not logged in requires refresh or redirect to /login
  if (!request.cookies.has("ipm_refresh_token")) {
    console.log("middleware: no refresh token. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log(
    "middleware: refresh token exists. Attempting to fetch new access token."
  );

  try {
    const refreshToken = request.cookies.get("ipm_refresh_token").value;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        )}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      }),
    });

    if (!response.ok) {
      console.log("middleware: refresh failed with status", response.status);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await response.json();
    console.log("middleware: data from spotify:", data);

    if (!data.access_token) {
      console.log(
        "middleware: no access_token in response. Redirecting to /login"
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Success: set cookies and head to /featured
    const res = NextResponse.redirect(new URL("/featured", request.url));
    res.cookies.set("ipm_access_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: typeof data.expires_in === "number" ? data.expires_in : 3600,
    });
    if (data.refresh_token) {
      res.cookies.set("ipm_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return res;
  } catch (err) {
    console.log("middleware: refresh threw", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Protect (almost) everything; skip static & API for perf.
export const config = {
  matcher: [
    "/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|assets/|images/|fonts/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|mp3|txt|xml)$).*)",
  ],
};
