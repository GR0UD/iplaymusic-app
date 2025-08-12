import Header from "../../components/header";
import Dock from "../../components/dock";
import Icons from "@/utils/icons";

const playlistData = {
  title: "Top 50",
  subtitle: "Rock Ballads",
  songs: [
    { title: "Old Town Road", artist: "Billy Ray Cyrus", time: "3:58" },
    { title: "Don't Call Me Up", artist: "Mabel", time: "2:46" },
    { title: "Let Me Down Slowly", artist: "Alec Benjamin", time: "4:12" },
    { title: "Here With Me", artist: "Marshmello", time: "3:37" },
    { title: "Paradise", artist: "Bazzi", time: "3:12" },
    { title: "Let Me Down Slowly", artist: "Alec Benjamin", time: "4:12" },
    { title: "Here With Me", artist: "Marshmello", time: "3:37" },
    { title: "Paradise", artist: "Bazzi", time: "3:12" },
  ],
};

export default function PlaylistsPage() {
  return (
    <>
      <Header heading='Playlists' search={true} dark={true} />
      <main className='playlist'>
        <img
          className='playlist__background-img'
          src='/images/sound-wave.png'
          alt='Gradient background image'
        />

        <h2 className='playlist__title'>Playlists</h2>
        <section className='playlist__carousel' aria-label='Featured playlists'>
          <div className='playlist__scroll'>
            <img src='/images/placeholders/note.jpg' alt='Rock cover' />
            <img src='/images/placeholders/note.jpg' alt='Jazz cover' />
            <img src='/images/placeholders/note.jpg' alt='Pop cover' />
          </div>
        </section>

        <section
          className='playlist__details'
          aria-labelledby='playlist-heading'
        >
          <h2 id='playlist-heading' className='playlist__name'>
            {playlistData.title}
          </h2>
          <p className='playlist__subtitle'>{playlistData.subtitle}</p>
        </section>

        <section className='playlist__tracklist' aria-label='Playlist songs'>
          <ol className='playlist__songs'>
            {playlistData.songs.map((song, index) => (
              <li key={index} className='playlist__song'>
                <button
                  className='playlist__play-button'
                  aria-label={`Play ${song.title}`}
                >
                  <Icons.play size={25} />
                </button>
                <div className='playlist__song-info'>
                  <h3 className='playlist__song-title'>{song.title}</h3>
                  <p className='playlist__song-artist'>{song.artist}</p>
                </div>
                <span className='playlist__song-time'>{song.time}</span>
              </li>
            ))}
          </ol>

          <div className='playlist__actions'>
            <button className='playlist__listen-all'>Listen All</button>
          </div>
        </section>
      </main>

      <Dock />
    </>
  );
}
