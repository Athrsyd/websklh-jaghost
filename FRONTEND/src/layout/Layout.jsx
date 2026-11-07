import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Menyembunyikan Navbar dan Footer pada halaman detail berita
  const hideNavbarFooter =
    Boolean(matchPath("/informasi/berita/:id/*", location.pathname)) ||
    Boolean(matchPath("/informasi/berita/:id", location.pathname)) ||
    Boolean(matchPath("/berita/:id/*", location.pathname)) ||
    Boolean(matchPath("/berita/:id", location.pathname));

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col justify-between">
      {!hideNavbarFooter && <Navbar />}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="grow"
      >
        {children}
      </motion.main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default Layout;
