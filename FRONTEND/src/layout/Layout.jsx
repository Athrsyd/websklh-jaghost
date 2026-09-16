import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Menyembunyikan Navbar dan Footer pada halaman tertentu (misalnya detail berita)
  const hideNavbarFooter = location.pathname.includes("/berita/:id");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col justify-between">
      {!hideNavbarFooter && <Navbar />}
      <main className="grow">
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
