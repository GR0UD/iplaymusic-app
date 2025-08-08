"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const cookieStore = await cookies();
  const code = request.nextUrl.searchParams.get("code");

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code ?? "",
    redirect_uri: redirectUri,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    },
    body,
    // cache: "no-store" // optional
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Token exchange failed:", data);
    throw new Error(data.error_description || "Spotify token error");
  }

  cookieStore.set({
    name: "ipm_access_token",
    value: data.access_token,
    maxAge: data.expires_in,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/featured");
}
