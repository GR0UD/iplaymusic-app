import { useLocation } from "react-router-dom";

export default function Layout({ children, className = "" }) {
  const location = useLocation();

  const dockPaths = ["/", "/explore", "/details", "/savedplan"];
  const shouldShowDock = dockPaths.includes(location.pathname);

  return (
    <>
      <main className={`${shouldShowDock ? "main" : ""} ${className}`.trim()}>
        {children}
      </main>
    </>
  );
}
