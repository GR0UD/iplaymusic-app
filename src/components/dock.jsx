import Icons from "@/utils/icons";
import Link from "next/link";

export default function Dock() {
  return (
    <nav className='dock' aria-label='Bottom Navigation'>
      <ul className='dock__list'>
        <li className='dock__item'>
          <Link href='/albums' className='dock__link'>
            <Icons.pulse size={25} aria-label='Categories' />
          </Link>
        </li>
        <li className='dock__item'>
          <Link href='/playlists' className='dock__link'>
            <Icons.microphone size={25} aria-label='Featured' />
          </Link>
        </li>
        <li className='dock__item--events'>
          <Link href='/featured' className='dock__link'>
            <Icons.events size={30} aria-label='Events' />
          </Link>
        </li>
        <li className='dock__item'>
          <Link href='/playlists' className='dock__link'>
            <Icons.playlist size={25} aria-label='Playlists' />
          </Link>
        </li>
        <li className='dock__item'>
          <Link href='/settings' className='dock__link'>
            <Icons.settings size={25} aria-label='Settings' />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
