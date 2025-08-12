import Header from "../../components/header";
import Dock from "../../components/dock";
import Icons from "@/utils/icons";

const featuredAlbums = [
  { title: "Featured 1", image: "/images/placeholders/album.png" },
  { title: "Featured 2", image: "/images/placeholders/album.png" },
  { title: "Featured 3", image: "/images/placeholders/album.png" },
];

const newReleases = [
  {
    image: "/images/placeholders/album.png",
    title: "Old Town Road",
    artist: "Billy Ray Cyrus",
    songs: "12 Songs",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Victory Lab",
    artist: "Nipsey Hussle",
    songs: "8 Songs",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Thank U, Next",
    artist: "Ariana Grande",
    songs: "13 Songs",
  },
  {
    image: "/images/placeholders/album.png",
    title: "Death Race For Love",
    artist: "Juice WRLD",
    songs: "11 Songs",
  },
];

export default function AlbumsPage() {
  return (
    <>
      <Header heading='MUSIC' search={true} dark={false} />

      <main className='albums'>
        <h2 className='albums__title'>All Albums</h2>

        <section className='albums__section'>
          <div className='albums__subheading'>
            <h3 className='albums__heading'>Featured Albums</h3>
            <a className='albums__viewall' href='#'>
              View All
            </a>
          </div>

          <div className='albums__featured'>
            {featuredAlbums.map((album, index) => (
              <div className='albums__featured-item' key={index}>
                <img
                  src={album.image}
                  alt={`Cover of ${album.title}`}
                  className='albums__featured-img'
                />
              </div>
            ))}
          </div>
        </section>

        <section className='albums__section'>
          <div className='albums__subheading'>
            <h3 className='albums__heading'>New Releases</h3>
            <a className='albums__viewall' href='#'>
              View All
            </a>
          </div>

          <ul className='albums__list'>
            {newReleases.map((album, index) => (
              <li className='albums__item' key={index}>
                <img
                  src={album.image}
                  alt={`Cover of ${album.title}`}
                  className='albums__item-img'
                />
                <div className='albums__info'>
                  <h3 className='albums__name'>{album.title}</h3>
                  <p className='albums__artist'>{album.artist}</p>
                </div>
                <span className='albums__count'>{album.songs}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Dock />
    </>
  );
}
