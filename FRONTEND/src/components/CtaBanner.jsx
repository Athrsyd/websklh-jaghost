import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 bg-slate-100/60">
      <div 
        ref={bannerRef}
        className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 md:p-14 text-white shadow-2xl text-center flex flex-col items-center justify-center space-y-6 border border-blue-400/30"
      >
        {/* Title */}
        <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold font-sans text-white tracking-tight leading-tight max-w-3xl">
          Jelajahi Program dan Keunggulan SMK Negeri 26 Jakarta
        </h2>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Liat Program Button */}
          <button
            type="button"
            className="bg-white text-blue-600 font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Liat Program
          </button>

          {/* Hubungi Kami Button */}
          <button
            type="button"
            className="border-2 border-white/80 text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Hubungi Kami
          </button>
        </div>
      </div>
    </section>
  );
}
