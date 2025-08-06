"use client";

import { useState } from "react";

import Intro from "@/components/intro";
import Onboarding from "@/components/onboarding";
import Icons from "../../utils/Icons";

import "@/styles/pages/_login.scss";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);

  const handleBiometricLogin = () => {
    setStartFadeOut(true);

    setTimeout(() => {
      setShowLogin(false);
    }, 500);
  };

  return (
    <>
      <Intro />
      <main className='login'>
        {showLogin && (
          <section
            className={`login__section ${
              startFadeOut ? "fade-out" : "fade-in"
            }`}
          >
            <header className='login__header'>
              <h1 className='login__title'>Log In</h1>
            </header>

            <form className='login__form' onSubmit={(e) => e.preventDefault()}>
              <div className='form__group'>
                <label htmlFor='username' className='form__label'>
                  Username
                </label>
                <div className='form__input-wrapper'>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Enter your username'
                    className='form__input'
                  />
                  <span className='form__icon'>
                    <Icons.user size={21} aria-label='username icon' />
                  </span>
                </div>
              </div>

              <div className='form__group'>
                <label htmlFor='password' className='form__label'>
                  Password
                </label>
                <div className='form__input-wrapper'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter your password'
                    className='form__input'
                  />
                  <span className='form__icon'>
                    <Icons.key size={21} aria-label='password icon' />
                  </span>
                </div>
              </div>

              <button type='submit' className='login__button'>
                Log In
              </button>
            </form>

            <div className='login__biometric'>
              <button
                className='biometric__button'
                onClick={handleBiometricLogin}
              >
                <Icons.fingerPrint aria-label='Finger print icon' />
              </button>
              <p className='biometric__label'>One-Touch Login</p>
            </div>
          </section>
        )}
        {!showLogin && <Onboarding />}
      </main>
    </>
  );
}
