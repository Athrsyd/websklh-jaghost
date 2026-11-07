import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import Layout from "./layout/Layout";
import ChatBotBubble from "./components/ChatBotBubble";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    // Fix: pastikan html tidak punya scroll-behavior CSS yang conflict
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      allowNestedScroll: true,
    });
    window.__lenis = lenis;

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
      <Layout>
        <ChatBotBubble />
        <Router />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
