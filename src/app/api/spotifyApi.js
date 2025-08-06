import { getAccessToken } from "./spotifyAuth";

export async function getNewReleases() {
  const token = await getAccessToken();
  console.log(token);
const res = await fetch("https://api.spotify.com/v1/browse/new-releases", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


  const data = await res.json();
  console.log("Spotify data:", data);

  return data.playlists?.items || []; 
}
