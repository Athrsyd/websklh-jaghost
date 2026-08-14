import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import bgBuilding from '../assets/background.png';
import AestheticDigitCounter from './AestheticDigitCounter';

export default function Hero() {
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const statsBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroBadgeRef.current) {
        gsap.fromTo(
          heroBadgeRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 }
        );
      }

      if (heroTitleRef.current) {
        gsap.fromTo(
          heroTitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
        );
      }

      if (statsBarRef.current) {
        gsap.fromTo(
          statsBarRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-8 overflow-hidden bg-slate-950">
      
      {/* Background Building Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={bgBuilding} 
          alt="Gedung SMKN 26 Jakarta" 
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-brightness-90" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-1 sm:pt-6">
        <div ref={heroBadgeRef} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/60 to-blue-800/40 border border-blue-400/40 text-blue-100 text-[11px] sm:text-xs font-medium px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md mb-3 sm:mb-6 shadow-md max-w-full">
          <span className="truncate">Selamat datang di SMK Negeri 26 Jakarta</span>
        </div>

        <div ref={heroTitleRef} className="select-none">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.93] tracking-tight font-sans drop-shadow-md uppercase">
            BELAJAR,<br />
            BEKERJA,<br />
            MEMBANGUN
          </h1>
        </div>
      </div>

      {/* Floating Orange-Red Stats Bar */}
      <div ref={statsBarRef} className="relative z-10 max-w-4xl mx-auto w-full mt-4 sm:mt-12">
        <div className="bg-gradient-to-r from-[#EA4325] via-[#E83E20] to-[#E5381A] rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-6 shadow-[0_15px_40px_rgba(232,62,32,0.45)] text-white grid grid-cols-3 divide-x divide-white/20 border border-orange-400/30">
          
          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-0.5 sm:space-y-0 sm:space-x-4 px-1 sm:px-4">
            <div className="p-1 sm:p-2 bg-white/10 rounded-md sm:rounded-xl backdrop-blur-sm shrink-0">
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-7 sm:h-7 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.61l7.74-4.463M12 4.5l8.7 5.019v4.238a2 2 0 01-1.036 1.748L12 19.5l-7.664-4.004A2 2 0 013.3 13.757V9.519L12 4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v4.5M18 12v3" />
              </svg>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <AestheticDigitCounter targetNumber={3000} suffix="+" />
              <div className="text-[8px] xs:text-[9px] sm:text-xs font-medium text-orange-100/90 leading-tight mt-0.5 sm:mt-1">
                Jumlah Siswa Aktif
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-0.5 sm:space-y-0 sm:space-x-4 px-1 sm:px-4">
            <div className="p-1 sm:p-2 bg-white/10 rounded-md sm:rounded-xl backdrop-blur-sm shrink-0">
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-7 sm:h-7 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <AestheticDigitCounter targetNumber={200} suffix="+" />
              <div className="text-[8px] xs:text-[9px] sm:text-xs font-medium text-orange-100/90 leading-tight mt-0.5 sm:mt-1">
                Jumlah Guru Aktif
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left space-y-0.5 sm:space-y-0 sm:space-x-4 px-1 sm:px-4">
            <div className="p-1 sm:p-2 bg-white/10 rounded-md sm:rounded-xl backdrop-blur-sm shrink-0">
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-7 sm:h-7 text-white stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4m-8-12h.01M9 13h.01M9 9h.01M15 13h.01M15 9h.01" />
              </svg>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <AestheticDigitCounter targetNumber={100} suffix="+" />
              <div className="text-[8px] xs:text-[9px] sm:text-xs font-medium text-orange-100/90 leading-tight mt-0.5 sm:mt-1">
                Mitra Industri
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
