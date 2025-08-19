import Link from "next/link";
import { cookies } from "next/headers";
import Icons from "@/utils/icons";

export const metadata = {
  title: "Playlists",
};

function formatDuration(ms) {
  if (typeof ms !== "number") return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default async function PlaylistsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ipm_access_token")?.value;

  if (!accessToken) {
    return (
      <>
        <main className='playlist'>
          <h2 className='playlist__title'>Playlists</h2>
          <p className='playlist__error'>
            No Spotify access token found. Please log in.
          </p>
        </main>
      </>
    );
  }

  // 1) Featured playlists (carousel + pick one as "current")
  const listResp = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists?limit=50",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );

  if (!listResp.ok) {
    return (
      <>
        <main className='playlist'>
          <h2 className='playlist__title'>Playlists</h2>
          <p className='playlist__error'>
            Spotify API error: {listResp.status} {listResp.statusText}
          </p>
        </main>
      </>
    );
  }

  const listData = await listResp.json();
  const playlists = listData?.playlists?.items ?? [];
  const featured = playlists.slice(0, 6);
  const current = playlists[0];

  // 2) If we have at least one playlist, fetch its tracks
  let tracks = [];
  if (current?.id) {
    const tracksResp = await fetch(
      `https://api.spotify.com/v1/playlists/${current.id}/tracks?limit=50`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );

    if (tracksResp.ok) {
      const tData = await tracksResp.json();
      tracks =
        (tData.items || []).map((item) => item.track).filter(Boolean) || [];
    }
  }

  const bgImg = "/images/sound-wave.png";
  const currentCover =
    current?.images?.[0]?.url || "/images/placeholders/album.png";
  const currentTitle = current?.name || "Playlist";
  const currentSubtitle =
    current?.owner?.display_name ||
    (current?.description ? current.description.replace(/<[^>]*>/g, "") : "");

  return (
    <>
      <Header heading='Playlists' search={true} dark={true} />
      <main className='playlist'>
        <img
          className='playlist__background-img'
          src={bgImg}
          alt='Gradient background image'
        />

        <h2 className='playlist__title'>Playlists</h2>

        {/* Featured Playlists Carousel */}
        <section className='playlist__carousel' aria-label='Featured playlists'>
          <div className='playlist__scroll hide-scrollbar'>
            {featured.map((pl) => {
              const cover =
                pl.images?.[0]?.url || "/images/placeholders/note.jpg";
              return (
                <Link
                  key={pl.id}
                  href={`/playlists/${pl.id}`}
                  className='playlist__carousel-item'
                  aria-label={`Open playlist ${pl.name}`}
                >
                  <img src={cover} alt={`Cover of ${pl.name}`} loading='lazy' />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Current Playlist Details */}
        <section
          className='playlist__details'
          aria-labelledby='playlist-heading'
        >
          <div className='playlist__hero'>
            <img
              className='playlist__cover'
              src={currentCover}
              alt={`Cover of ${currentTitle}`}
              loading='lazy'
            />
            <div>
              <h2 id='playlist-heading' className='playlist__name'>
                {currentTitle}
              </h2>
              {currentSubtitle && (
                <p className='playlist__subtitle'>{currentSubtitle}</p>
              )}
            </div>
          </div>
        </section>

        {/* Track list for the current playlist */}
        <section className='playlist__tracklist' aria-label='Playlist songs'>
          {tracks.length === 0 ? (
            <p className='playlist__empty'>No tracks found.</p>
          ) : (
            <ol className='playlist__songs'>
              {tracks.map((track, index) => {
                const artists = (track?.artists || [])
                  .map((a) => a.name)
                  .join(", ");
                return (
                  <li key={track.id || index} className='playlist__song'>
                    <button
                      className='playlist__play-button'
                      aria-label={`Play ${track?.name || "track"}`}
                    >
                      <Icons.play size={25} />
                    </button>

                    <div className='playlist__song-info'>
                      <h3 className='playlist__song-title'>
                        {track?.name || "—"}
                      </h3>
                      <p className='playlist__song-artist'>{artists || "—"}</p>
                    </div>

                    <span className='playlist__song-time'>
                      {formatDuration(track?.duration_ms)}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          <div className='playlist__actions'>
            <Link
              className='playlist__listen-all'
              href={`/playlists/${current?.id || ""}`}
            >
              Open in details
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
