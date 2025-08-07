import { poppins } from "@/utils/fonts";
import "@/styles/main.scss";
import "./globals.css";

export const metadata = {
  title: "iPlayMusic",
  description: "Your app description here",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
