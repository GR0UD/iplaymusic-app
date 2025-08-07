import { poppins } from "@/utils/fonts";
import "@/styles/main.scss";
import "./globals.css";

export const metadata = {
  title: "iPlayMusic App",
  description: "Your app description here",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
