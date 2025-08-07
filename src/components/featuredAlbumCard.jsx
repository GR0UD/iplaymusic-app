import Image from "next/image";

export default function FeaturedAlbumCard({ album }) {
  return (
    <article className='featured__card'>
      <Image
        unoptimized
        src={album.images[0].url}
        width={album.images[0].width}
        height={album.images[0].height}
        alt=''
        className='featured__image'
      />
      <div className='featured__overlay'></div>
      <div className='featured__content'>
        <h3 className='featured__heading'>{album.name}</h3>
        <span className='featured__subtext'>{album.album_type}</span>
      </div>
    </article>
  );
}
