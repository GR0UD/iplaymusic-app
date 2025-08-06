import Icons from "../utils/Icons";
import { NavLink } from "react-router-dom";

export default function Dock() {
  return (
    <nav className='dock' aria-label='Bottom Navigation'>
      <ul className='dock__list'>
        <li className='dock__item'>
          <NavLink
            to='/categories'
            className={({ isActive }) =>
              `dock__link${isActive ? " dock__link--active" : ""}`
            }
          >
            <Icons.pulse size={25} aria-label='Categories' />
          </NavLink>
        </li>
        <li className='dock__item'>
          <NavLink
            to='/featured'
            className={({ isActive }) =>
              `dock__link${isActive ? " dock__link--active" : ""}`
            }
          >
            <Icons.microphone size={25} aria-label='Featured' />
          </NavLink>
        </li>
        <li className='dock__item--events'>
          <NavLink
            to='/events'
            className={({ isActive }) =>
              `dock__link${isActive ? " dock__link--active" : ""}`
            }
          >
            <Icons.events size={30} aria-label='Events' />
          </NavLink>
        </li>
        <li className='dock__item'>
          <NavLink
            to='/playlists'
            className={({ isActive }) =>
              `dock__link${isActive ? " dock__link--active" : ""}`
            }
          >
            <Icons.playlist size={25} aria-label='Playlists' />
          </NavLink>
        </li>
        <li className='dock__item'>
          <NavLink
            to='/settings'
            className={({ isActive }) =>
              `dock__link${isActive ? " dock__link--active" : ""}`
            }
          >
            <Icons.settings size={25} aria-label='Settings' />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
