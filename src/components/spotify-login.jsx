import Icons from "@/utils/icons";

import "@/styles/pages/_login.scss";

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  "response_type=code" +
  `&client_id=${process.env.SPOTIFY_CLIENT_ID}` +
  "&scope=user-read-private%20user-read-email" +
  `&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}`;

export default function SpotifyLogin() {
  return (
    <div className='login__biometric'>
      <a href={authUrl} className='biometric__button'>
        <Icons.fingerPrint aria-label='Finger print icon' />
      </a>
      <p className='biometric__label'>One-Touch Login</p>
    </div>
  );
}
