import Layout from "../components/layout";
import Header from "../components/header";
import Dock from "../components/dock";
import "../styles/pages/_featured.scss";

export default function FeaturedPage() {
  return (
    <>
      <Header heading='Featured' search={true} dark={false} />

      <Layout className='featured'>
        <section className='featured__section'>
          <h2 className='featured__title'>Featured</h2>

          <div className='featured__grid'>
            <article className='featured__card'>
              <img
                src='/images/placeholders/1.png'
                alt='Cover for The Greatest Showman'
                className='featured__image'
              />

              <div className='featured__overlay'></div>
              <div className='featured__content'>
                <h3 className='featured__heading'>The Greatest Showman</h3>
                <span className='featured__subtext'>Soundtrack</span>
              </div>
            </article>

            <article className='featured__card'>
              <img
                src='/images/placeholders/2.png'
                alt='Cover for Another Album'
                className='featured__image'
              />
              <div className='featured__overlay'></div>

              <div className='featured__content'>
                <h3 className='featured__heading'>Another Album</h3>
                <span className='featured__subtext'>Soundtrack</span>
              </div>
            </article>
          </div>
        </section>
      </Layout>

      <Dock />
    </>
  );
}
