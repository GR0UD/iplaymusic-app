import { poppins } from "@/utils/fonts";
import "../globals.css";

export default function BothLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
