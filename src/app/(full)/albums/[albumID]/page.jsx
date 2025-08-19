import { cookies } from "next/headers";
import Icons from "@/utils/icons";

export const revalidate = 0;

function formatDuration(ms) {
  if (typeof ms !== "number") return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default async function AlbumsDetailsPage({ params }) {
  const { albumID } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ipm_access_token")?.value;

  if (!accessToken) {
    return (
      <main className='album-details'>
        <h2 className='album-details__heading'>Album</h2>
        <p className='album-details__error'>
          No Spotify access token found. Please log in.
        </p>
      </main>
    );
  }

  if (!albumID) {
    return (
      <main className='album-details'>
        <h2 className='album-details__heading'>Album</h2>
        <p className='album-details__error'>No album ID provided.</p>
      </main>
    );
  }

  // 1) Fetch album (includes first page of tracks)
  const albumRes = await fetch(
    `https://api.spotify.com/v1/albums/${albumID}?market=from_token`,
    { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
  );

  if (!albumRes.ok) {
    return (
      <main className='album-details'>
        <h2 className='album-details__heading'>Album</h2>
        <p className='album-details__error'>
          Spotify API error: {albumRes.status} {albumRes.statusText}
        </p>
      </main>
    );
  }

  const album = await albumRes.json();

  let genres = Array.isArray(album.genres) ? album.genres : [];
  if ((!genres || genres.length === 0) && album.artists?.[0]?.id) {
    const artistRes = await fetch(
      `https://api.spotify.com/v1/artists/${album.artists[0].id}`,
      { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
    );
    if (artistRes.ok) {
      const artist = await artistRes.json();
      genres = artist.genres || [];
    }
  }
  const tags = (genres.length ? genres : ["music"]).slice(0, 4);

  let tracks = album.tracks?.items ?? [];
  const total = album.tracks?.total ?? tracks.length ?? 0;

  const pageSize = 50;
  let offset = tracks.length;
  while (offset < total) {
    const trRes = await fetch(
      `https://api.spotify.com/v1/albums/${albumID}/tracks?market=from_token&limit=${pageSize}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
    );
    if (!trRes.ok) break;
    const trData = await trRes.json();
    const batch = trData.items || [];
    tracks = tracks.concat(batch);
    if (!trData.next || batch.length === 0) break;
    offset += batch.length;
  }

  const heroImg =
    album.images?.[0]?.url || "/images/placeholders/album-details.png";
  const trackCount = album.total_tracks ?? tracks.length ?? 0;

  return (
    <main className='album-details'>
      <section className='album-details__hero'>
        <img
          src={heroImg}
          alt={`Album cover for ${album.name}`}
          className='album-details__background'
        />
        <div className='album-details__content'>
          <div className='album-details__content-wrapper'>
            <div className='album-details__header-group'>
              <h2 className='album-details__title'>{album.name}</h2>
              <p className='album-details__songs-count'>
                {trackCount} {trackCount === 1 ? "Song" : "Songs"}
              </p>
            </div>

            <div className='album-details__meta-group'>
              <p className='album-details__genres-label'>Genres & Hashtags</p>
              <div className='album-details__hashtags'>
                {tags.map((g) => (
                  <span key={g}>#{g.replace(/\s+/g, "-").toLowerCase()}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='album-details__tracks'>
        <h2 className='album-details__heading'>All Songs</h2>
        <ul className='album-details__track-list'>
          {tracks.map((t) => {
            const artists = (t.artists || []).map((a) => a.name).join(", ");
            return (
              <li key={t.id} className='album-details__track'>
                <button
                  className='album-details__play-btn'
                  aria-label={`Play ${t.name}`}
                >
                  <Icons.play size={22} />
                </button>
                <div className='album-details__track-info'>
                  <h3 className='album-details__track-title'>{t.name}</h3>
                  <p className='album-details__track-artist'>{artists}</p>
                </div>
                <span className='album-details__duration'>
                  {formatDuration(t.duration_ms)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
