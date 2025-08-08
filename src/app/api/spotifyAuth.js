// Server-only helper: get a Spotify access token via Client Credentials flow
// Expects environment variables: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET

export async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
  }

  const base64 = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64}`,
    },
    body: "grant_type=client_credentials",
    // Force server-side fetch caching off for tokens
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Spotify token error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}
