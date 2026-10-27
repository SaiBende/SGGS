import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigationbar from "./components/Navigationbar";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <Navigationbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
