import "../globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function BothLayout({ children }) {
  const pathname = usePathname();
  const pageName = pathname.split("/").filter(Boolean).pop();

  return (
    <html lang='en'>
      <body>
        <Header pageName={pageName} />
        {children}
      </body>
    </html>
  );
}
