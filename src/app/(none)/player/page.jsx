import Header from "../../components/header";
import Icons from "../utils/Icons";

export default function PlayerPage() {
  return (
    <>
      <Header heading='Playing' search={false} dark={false} />
      <main className='player'>
        <section className='player__section'>
          <article className='player__vinyl-wrapper'>
            <figure className='player__vinyl'>
              <img src='/images/vinyl.png' alt='Rotating vinyl record' />
            </figure>
          </article>

          <div className='player__info'>
            <h2 className='player__title'>Don't Call Me Up</h2>
            <p className='player__artist'>Mabel</p>
          </div>

          <div className='player__progress'>
            <input type='range' className='player__slider' />
            <div className='player__time-wrapper'>
              <span className='player__time player__time--start'>0:00</span>
              <span className='player__time player__time--end'>3:40</span>
            </div>
          </div>

          <nav className='player__controls'>
            <button
              className='player__button player__button--skip-back'
              aria-label='Skip to beginning'
            >
              <Icons.skipb size={30} />
            </button>

            <button
              className='player__button player__button--prev'
              aria-label='Previous track'
            >
              <Icons.prev size={30} />
            </button>

            <button
              className='player__button player__button--play'
              aria-label='Play or pause'
            >
              <Icons.play size={50} />
            </button>

            <button
              className='player__button player__button--next'
              aria-label='Next track'
            >
              <Icons.next size={30} />
            </button>

            <button
              className='player__button player__button--skip-forward'
              aria-label='Skip to end'
            >
              <Icons.skipf size={30} />
            </button>
          </nav>
        </section>
      </main>
    </>
  );
}
