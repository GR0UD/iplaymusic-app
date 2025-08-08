"use client";

import "../globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function HeadOnlyLayout({ children }) {
  const pathname = usePathname();
  const pageName = pathname.split("/").filter(Boolean).pop() || "home";

  return (
    <>
      <Header pageName={pageName} />
      <main>{children}</main>
    </>
  );
}
