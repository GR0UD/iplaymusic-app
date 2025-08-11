import { poppins } from "@/utils/fonts";
import "@/styles/main.scss";
import "./globals.css";

export const metadata = {
  title: "iPlayMusic",
  description: "Your app description here",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.variable}>
        {children}

        <svg
          width='0'
          height='0'
          style={{ position: "absolute" }}
          aria-hidden='true'
        >
          <defs>
            <linearGradient id='dock-gradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#EE0979' />
              <stop offset='100%' stopColor='#FF6A00' />
            </linearGradient>
          </defs>
        </svg>
      </body>
    </html>
  );
}
