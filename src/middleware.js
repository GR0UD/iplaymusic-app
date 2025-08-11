import { NextResponse } from "next/server";

export const config = {
  // Run on everything except known static assets; we are skipping internal paths inside the handler too.
  matcher: [
    "/((?!_next/|favicon.ico|robots.txt|sitemap.xml|assets/|images/|fonts/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|mp3|txt|xml)$).*)",
  ],
};

export async function middleware(request) {
  const url = request.nextUrl;
  const { pathname } = url;

  // Pass through API & build assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.has("ipm_access_token");
  const hasRefresh = request.cookies.has("ipm_refresh_token");

  // If logged in already, block /login and send to /featured
  if (pathname.startsWith("/login") && hasAccess) {
    return NextResponse.redirect(new URL("/featured", request.url));
  }

  // Helper: after successful auth, either go to /featured (for "/") or continue
  const proceedAfterAuth = (response) => {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/featured", request.url), {
        headers: response.headers,
      });
    }
    return response;
  };

  // If we already have access, either redirect "/" -> "/featured" or proceed
  if (hasAccess) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/featured", request.url));
    }
    return NextResponse.next();
  }

  // No access token
  if (!hasRefresh) {
    // If we’re at "/", send to login; otherwise also send to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Try to refresh using the refresh token
  const refreshToken = request.cookies.get("ipm_refresh_token")?.value ?? "";

  try {
    J;
    // Prefer Basic auth (client_id:client_secret) if you have a secret; fallback to public-only (PKCE)
    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    if (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) {
      const basic = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64");
      headers.set("Authorization", `Basic ${basic}`);
    }

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    // If you’re using a pure PKCE flow (no secret), Spotify allows client_id in body:
    if (!headers.has("Authorization") && process.env.SPOTIFY_CLIENT_ID) {
      body.set("client_id", process.env.SPOTIFY_CLIENT_ID);
    }

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body,
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await res.json();

    // Prepare response and set cookies
    const response = NextResponse.next();

    if (data.access_token) {
      response.cookies.set("ipm_access_token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: typeof data.expires_in === "number" ? data.expires_in : 3600, // seconds
      });
    } else {
      // No new access token -> cannot proceed
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Spotify may return a new refresh token
    if (data.refresh_token) {
      response.cookies.set("ipm_refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return proceedAfterAuth(response);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
