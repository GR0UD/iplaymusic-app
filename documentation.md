# iPlayMusic —

Marks Galkins - WU12

## 🛠 Tech Stack

| Category   | Technology                                                              |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | [Next.js 15] (https://nextjs.org/)                                      |
| Frontend   | [React 19] (https://react.dev/)                                         |
| Styling    | [SASS / SCSS] (https://sass-lang.com/)                                  |
| Icons      | [react-icons] (https://react-icons.github.io/react-icons/)              |
| Animations | [Framer Motion] (https://www.framer.com/motion/)                        |
| Validation | [Zod] (https://zod.dev/)                                                |
| API        | [Spotify Web API](https://developer.spotify.com/documentation/web-api/) |
| State/Data | React Hooks                                                             |
| Auth Flow  | OAuth 2.0 Authorization Code                                            |

---

## 📦 Dependencies

```json
"dependencies": {
  "framer-motion": "^12.23.12",
  "next": "15.4.5",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "react-icons": "^5.5.0",
  "sass": "^1.90.0",
  "zod": "^3.23.8"
},
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "eslint": "^9",
  "eslint-config-next": "15.4.5"
}
```

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone https://github.com/yourusername/iplaymusic.git
cd iplaymusic
npm install
```

### 2️⃣ Setup Environment Variables

Create `.env.local` in the project root:

```env
# Public vars (used in browser)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/auth/callback

# Server-only secrets
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

> ⚠ **Redirect URI must exactly match** what you set in your Spotify Developer Dashboard.

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open: `http://127.0.0.1:3000`

---

## 📂 Folder Structure

```
src/
  app/
    (nohead&dock)/
      login/page.jsx          # Login page
    api/
      auth/
        callback/route.js     # OAuth token exchange
  components/
    intro.jsx
    loginForm.jsx
    spotify-login.jsx
    onboarding.jsx
  styles/
    pages/_login.scss
  utils/
    icons.js
public/
.env.local
package.json
```

---

## 🔄 OAuth Flow

1. User clicks "Login with Spotify".
2. App redirects to Spotify authorize URL with `client_id` + `redirect_uri`.
3. Spotify redirects back to `/api/auth/callback` with `code`.
4. Server exchanges `code` for access + refresh tokens.
5. Access token is stored (e.g., in HTTP-only cookie).
6. App uses token to call Spotify Web API.

---

## 💻 Code Example

**Client — Spotify Login Button**  
(Uses public env vars)

```jsx
"use client";
import Icons from "@/utils/icons";
import { useMemo } from "react";
import "@/styles/pages/_login.scss";

export default function SpotifyLogin() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) return null;

  const authUrl = useMemo(() => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: "user-read-private user-read-email",
      redirect_uri: redirectUri,
    });
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }, [clientId, redirectUri]);

  return (
    <div className='login__biometric'>
      <a href={authUrl} className='biometric__button'>
        <Icons.fingerPrint aria-label='Fingerprint icon' />
      </a>
      <p className='biometric__label'>One-Touch Login</p>
    </div>
  );
}
```

---

**Server — Token Exchange Route**  
(Uses server-only env vars)

```js
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
  const cookieStore = await cookies();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing Spotify env vars");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code ?? "",
    redirect_uri: redirectUri,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error_description || "Token error");

  cookieStore.set({
    name: "ipm_access_token",
    value: data.access_token,
    maxAge: data.expires_in,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/featured");
}
```

---

## 🧪 Troubleshooting

### Hydration Error

- Use only `NEXT_PUBLIC_*` env vars in client code.
- Make sure env values match in `.env.local` and on server.
- Restart `npm run dev` after changing `.env.local`.

### INVALID_CLIENT from Spotify

- Check `client_id` in login URL — must not be `undefined`.
- Ensure `redirect_uri` is **identical** to Spotify Dashboard entry.

---

## 📜 License

MIT © 2025 MG-INC
