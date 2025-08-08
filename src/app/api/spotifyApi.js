import { getAccessToken } from "./spotifyAuth";

export async function getNewReleases() {
  const token = await getAccessToken();

  const res = await fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers: { Authorization: `Bearer ${token}` },
    // No caching for fresh results during development
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Spotify API error: ${res.status} ${err}`)
  }

  const data = await res.json();
  // The new-releases endpoint returns { albums: { items: [...] } }
  return data.albums?.items || [];
}
