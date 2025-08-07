"use client";

import "../globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Dock from "@/components/dock";

export default function BothLayout({ children }) {
  const pathname = usePathname();
  // Get the last part of the path as the page name
  const pageName = pathname.split("/").filter(Boolean).pop() || "home";

  return (
    <html lang='en'>
      <body>
        <Header pageName={pageName} search={true} />
        <main>{children}</main>
        <Dock />
      </body>
    </html>
  );
}
