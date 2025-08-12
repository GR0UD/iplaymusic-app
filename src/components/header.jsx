"use client";

import Icons from "@/utils/icons";
import { useRouter } from "next/navigation";

export default function Header({ heading, search = false, dark = false }) {
  const router = useRouter();
  const lightModeClass = dark ? "mode-light" : "mode-dark";

  const handleSearch = () => {
    console.log("Search triggered");
  };

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__icon-container'>
          <button
            className={`header__icon-button ${lightModeClass}`}
            onClick={() => router.back()}
            aria-label='Go back'
          >
            <Icons.back size={20} />
          </button>
        </div>
        <div className='header__title-container'>
          <h1 className={`header__title ${lightModeClass}`}>{heading}</h1>
        </div>
        <div className='header__actions'>
          {search && (
            <button
              className={`header__icon-button ${lightModeClass}`}
              onClick={handleSearch}
              aria-label='Search'
            >
              <Icons.search size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
