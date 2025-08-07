import "../globals.css";

import { usePathname } from "next/navigation";

import Header from "@/components/header";
import Dock from "@/components/dock";

export const metadata = {
  title: "iPlayMusic App",
  description: "Your app description here",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function BothLayout({ children }) {
  const pathname = usePathname();

  const pageName = pathname.split("/").filter(Boolean).pop();

  return (
    <html lang='en'>
      <body>
        <Header pageName={pageName} />
        <main>{children}</main>
        <Dock />
      </body>
    </html>
  );
}
