import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icons from "../utils/Icons";
import "../styles/components/_onboarding.scss";

const slides = [
  {
    border: "blob-1",
    title: "Where Words Fail,\nMusic Speaks",
    text: "Listen in, link up, and discover what others are vibing to, connect through pure sound.",
    icon: "signal",
  },
  {
    border: "blob-2",
    title: "No Music,\nNo Life",
    text: "Your music says who you are. Build your vibe, find your rhythm, and stay in the groove.",
    icon: "heart",
  },
  {
    border: "blob-3",
    title: "Peace, Love, Music",
    text: "Bring the good vibes. Share tracks, spread love, and let music do the talking.",
    icon: "note",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const handleChange = (i) => {
    if (i !== index) {
      setFading(true);
      setTimeout(() => {
        setIndex(i);
        setFading(false);
      }, 300);
    }
  };

  const current = slides[index];

  return (
    <section className='onboarding'>
      <div className={`onboarding__image-wrapper ${current.border}`}>
        <img src='/images/blob.png' alt='blob' />
      </div>

      <div className={`onboarding__content ${fading ? "fade" : ""}`}>
        <h2 className='onboarding__title'>
          {current.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>{" "}
        <p className='onboarding__text'>{current.text}</p>
      </div>

      <div className='onboarding__buttons'>
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`onboarding__icon-button ${i === index ? "active" : ""}`}
            onClick={() => handleChange(i)}
            aria-label={`Select ${slide.title}`}
          >
            {slide.icon === "signal" && <Icons.signal />}
            {slide.icon === "heart" && <Icons.heart />}
            {slide.icon === "note" && <Icons.note />}
          </button>
        ))}
      </div>

      <NavLink to='/featured' className='onboarding__skip'>
        SKIP
      </NavLink>
    </section>
  );
}
