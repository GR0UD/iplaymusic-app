import "../globals.css";

export const metadata = {
  title: "iPlayMusic App",
  description: "Your app description here",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function BothLayout({ children }) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <main>{children}</main>
      </body>
    </html>
  );
}
