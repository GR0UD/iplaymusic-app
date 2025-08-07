import Header from "../../components/header";
import Dock from "../../components/dock";
import "../styles/pages/_album-details.scss";
import Icons from "@/utils/icons";

const newReleases = [
  {
    image: "/images/placeholders/album.png",
    title: "Old Town Road",
    artist: "Billy Ray Cyrus",
    songs: "3:58",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Don’t Call Me Up",
    artist: "Mabel",
    songs: "2:46",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    songs: "4:12",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Paradise",
    artist: "Bazzi",
    songs: "3:12",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Sucker",
    artist: "Jonas Brothers",
    songs: "3:56",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Kill This Love",
    artist: "BLACKPINK",
    songs: "2:47",
  },
];

export default function AlbumsDetailsPage() {
  return (
    <>
      <Header heading='Album' search={false} dark={true} />

      <main className='album-details'>
        <section className='album-details__hero'>
          <img
            src='/images/placeholders/album-details.png'
            alt='Album cover'
            className='album-details__background'
          />
          <div className='album-details__content'>
            <div className='album-details__content-wrapper'>
              <div className='album-details__header-group'>
                <h2 className='album-details__title'>Old Town Road</h2>
                <p className='album-details__songs-count'>12 Songs</p>
              </div>

              <div className='album-details__meta-group'>
                <p className='album-details__genres-label'>Genres & Hashtags</p>
                <div className='album-details__hashtags'>
                  <span>#country</span>
                  <span>#country road</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='album-details__tracks'>
          <h2 className='album-details__heading'>All Songs</h2>
          <ul className='album-details__track-list'>
            {newReleases.map((song, index) => (
              <li key={index} className='album-details__track'>
                <button
                  className='album-details__play-btn'
                  aria-label={`Play ${song.title}`}
                >
                  <Icons.play size={22} />
                </button>
                <div className='album-details__track-info'>
                  <h3 className='album-details__track-title'>{song.title}</h3>
                  <p className='album-details__track-artist'>{song.artist}</p>
                </div>
                <span className='album-details__duration'>{song.songs}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Dock />
    </>
  );
}
