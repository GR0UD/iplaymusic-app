import FeaturedAlbumCard from "@/components/featuredAlbumCard";
import { cookies } from "next/headers";
import "@/styles/pages/_featured.scss";

export default async function FeaturedPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("ipm_access_token");

  if (!accessToken?.value) {
    // Optionally, redirect to login or show an error
    return (
      <main className='featured'>
        <section className='featured__section'>
          <h2 className='featured__title'>Featured</h2>
          <p className='featured__error'>
            No Spotify access token found. Please log in.
          </p>
        </section>
      </main>
    );
  }

  const response = await fetch(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  return (
    <main className='featured'>
      <section className='featured__section'>
        <h2 className='featured__title'>Featured</h2>
        <div className='featured__grid'>
          {data.albums.items.map((album) => (
            <FeaturedAlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </main>
  );
}
