import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import kepsekImg from './../assets/kepsek.png'; // Ensure the image path is correct

gsap.registerPlugin(ScrollTrigger);

export default function SambutanKepsek() {
  const sambutanCardRef = useRef(null);
  const sambutanTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sambutanCardRef.current) {
        gsap.fromTo(
          sambutanCardRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sambutanCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (sambutanTextRef.current) {
        gsap.fromTo(
          sambutanTextRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.1,
            scrollTrigger: {
              trigger: sambutanTextRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Principal Card */}
        <div ref={sambutanCardRef} className="lg:col-span-5 flex justify-center">
          <div className="border-2 border-dashed border-[#FF4E2B] rounded-tl-[32px] sm:rounded-tl-[40px] rounded-tr-[100px] sm:rounded-tr-[140px] rounded-br-[14px] sm:rounded-br-[16px] rounded-bl-[14px] sm:rounded-bl-[16px] p-2 sm:p-2.5 w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] shadow-sm">
            <div className="bg-gradient-to-b from-[#FF4E2B] via-[#E83C1A] to-[#C82D10] rounded-tl-[24px] sm:rounded-tl-[30px] rounded-tr-[90px] sm:rounded-tr-[125px] rounded-br-[10px] rounded-bl-[10px] overflow-hidden relative shadow-xl flex flex-col justify-end h-[360px] xs:h-[400px] sm:h-[450px]">
              
              <img 
                src={kepsekImg} 
                alt="Darminto M.Par - Kepala SMK Negeri 26 Jakarta" 
                className="w-full h-full object-cover object-top filter contrast-[1.05] grayscale brightness-95 select-none"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#200A05]/95 via-[#38120A]/85 to-[#501A0F]/50 backdrop-blur-md rounded-tr-[45px] sm:rounded-tr-[60px] px-4 sm:px-6 py-4 sm:py-5 border-t border-white/10 shadow-2xl">
                <h3 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight font-sans">
                  DARMINTO M.Par
                </h3>
                <p className="text-slate-200/90 text-[11px] sm:text-xs md:text-sm font-medium mt-0.5 sm:mt-1">
                  Kepala SMK Negeri 26 Jakarta
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Sambutan Content */}
        <div ref={sambutanTextRef} className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-slate-100 rounded-lg shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 fill-current" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <h2 className="text-slate-800 text-base sm:text-lg md:text-xl font-bold tracking-tight font-sans">
              Sambutan
            </h2>
          </div>

          <div className="border-l-2 sm:border-l-3 border-slate-200 pl-3 sm:pl-4 py-1">
            <p className="text-slate-700 italic text-xs sm:text-base md:text-lg leading-relaxed sm:leading-relaxed font-sans font-normal tracking-wide">
              Selamat datang di website resmi SMK Negeri 26 Jakarta. Website ini menjadi sarana informasi, komunikasi, dan layanan digital bagi seluruh warga sekolah serta masyarakat. Semoga kehadiran website ini dapat memberikan informasi yang mudah diakses, meningkatkan pelayanan, dan mendukung terciptanya pendidikan yang berkualitas, inovatif, serta berdaya saing. Terima kasih atas kunjungan Anda.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
