import Link from "next/link";

export default function NotFound() {
  return (
    <main className='notfound'>
      <section className='notfound__card'>
        <h1 className='notfound__title'>404 — Not Found</h1>
        <p className='notfound__text'>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className='notfound__actions'>
          <Link href='/' className='notfound__btn notfound__btn--primary'>
            Go home
          </Link>
          <Link href='/search' className='notfound__btn notfound__btn--ghost'>
            Browse music
          </Link>
        </div>
      </section>
    </main>
  );
}
