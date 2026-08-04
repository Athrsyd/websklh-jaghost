import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarsVideoSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section className="bg-slate-50 py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden">
      <div ref={containerRef} className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF5533] to-[#2563EB] font-sans">
          Mars SMK Negeri 26 jakarta
        </h2>

        {/* Video Placeholder Container */}
        <div className="bg-slate-200 rounded-[28px] sm:rounded-[36px] h-[280px] xs:h-[340px] sm:h-[400px] flex items-center justify-center shadow-inner border border-slate-300/60 relative overflow-hidden group">
          <span className="font-extrabold text-[#1a2744] text-lg sm:text-2xl tracking-wider uppercase drop-shadow-sm select-none">
            NANTI VIDEO MARS 26
          </span>
          {/* Subtle Video Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 fill-current ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
