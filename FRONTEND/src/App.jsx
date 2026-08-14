import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotBubble from "./components/ChatBotBubble";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    // Fix: pastikan html tidak punya scroll-behavior CSS yang conflict
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Fix: simpan RAF id agar bisa di-cancel
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // Fix: cancel loop saat cleanup
      lenis.destroy();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col justify-between">
        <Navbar />
        <main className="grow">
          <ChatBotBubble />
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
