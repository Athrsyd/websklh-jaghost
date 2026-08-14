import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsGridCards() {
  const containerRef = useRef(null);

  const stats = [
    { number: '1756', label: 'JUMLAH MURID', color: 'text-[#FF5533]' },
    { number: '80', label: 'JUMLAH PENDIDIK', color: 'text-[#2563EB]' },
    { number: '29', label: 'JUMLAH TENAGA KEPENDIDIKAN', color: 'text-[#FF5533]' },
    { number: '1971', label: 'TAHUN BERDIRI', color: 'text-[#2563EB]' },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
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
    <section className="py-12 sm:py-16 px-4 sm:px-8 bg-slate-100/60">
      <div 
        ref={containerRef}
        className="max-w-5xl mx-auto grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center justify-center text-center space-y-2 hover:shadow-xl transition-shadow duration-300 group"
          >
            <span className={`text-4xl sm:text-5xl font-black tracking-tight font-sans ${item.color} transform group-hover:scale-105 transition-transform duration-300`}>
              {item.number}
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold text-slate-400 tracking-wider font-sans leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
