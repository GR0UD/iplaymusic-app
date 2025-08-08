"use client";

import "../globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Dock from "@/components/dock";

export default function BothLayout({ children }) {
  const pathname = usePathname();
  const pageName = pathname.split("/").filter(Boolean).pop() || "home";

  return (
    <>
      <Header pageName={pageName} search={true} />
      <main>{children}</main>
      <Dock />
    </>
  );
}
