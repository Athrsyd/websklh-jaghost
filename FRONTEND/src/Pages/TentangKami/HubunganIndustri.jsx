import React from 'react'
import { useRef, useEffect } from "react";

// ─── Hook: auto-scroll dengan pause saat hover/touch ─────────
function useAutoScroll(speed = 1) {
  const ref     = useRef(null);
  const paused  = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Kalau arah mundur, mulai dari ujung kanan
    if (speed < 0) {
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    }

    const step = () => {
      if (!paused.current) {
        el.scrollLeft += speed;

        if (speed > 0 && el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          // Maju → loop balik ke kiri
          el.scrollLeft = 0;
        } else if (speed < 0 && el.scrollLeft <= 0) {
          // Mundur → loop balik ke kanan
          el.scrollLeft = el.scrollWidth - el.clientWidth;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  return {
    ref,
    pause:  () => { paused.current = true;  },
    resume: () => { paused.current = false; },
  };
}

// ─── Komponen ─────────────────────────────────────────────────
export function MitraScroll({ mitraIndustri = [] }) {
  const row1 = useAutoScroll(0.75);     // kanan →
  const row2 = useAutoScroll(-0.75); // kiri ←

  return (
    <div className="flex flex-col w-full mt-12">

      {/* ── Baris 1 ── */}
      <div
        ref={row1.ref}
        onMouseEnter={row1.pause}
        onMouseLeave={row1.resume}
        onTouchStart={row1.pause}
        onTouchEnd={row1.resume}
        className="overflow-hidden w-full px-4 mt-12 flex flex-row gap-8"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {mitraIndustri.map((mitra) => (
          <div
            key={mitra.id}
            className="bg-gray-300 h-40 w-75 shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform"
          >
            <span className="text-gray-500">{mitra.name}</span>
          </div>
        ))}
      </div>

      {/* ── Baris 2 ── */}
      <div
        ref={row2.ref}
        onMouseEnter={row2.pause}
        onMouseLeave={row2.resume}
        onTouchStart={row2.pause}
        onTouchEnd={row2.resume}
        className="overflow-hidden w-full px-4 mt-12 flex flex-row gap-8"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {mitraIndustri.map((mitra) => (
          <div
            key={mitra.id}
            className="bg-gray-300 h-40 w-75 shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform"
          >
            <span className="text-gray-500">{mitra.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}


const HubunganIndustri = () => {
  const mitraIndustri = [
    { id: 1, name: "PT. Industri Kreatif", logo: "logo1.png" },
    { id: 2, name: "CV. Teknologi Maju", logo: "logo2.png" },
    { id: 3, name: "PT. Inovasi Digital", logo: "logo3.png" },
    { id: 4, name: "PT. Solusi Industri", logo: "logo4.png" },
    { id: 5, name: "PT. Solusi Industri", logo: "logo4.png" },
    { id: 6, name: "PT. Solusi Industri", logo: "logo4.png" },
  ];
  return (
    <>
      <section className='bg-side mx-auto min-h-screen flex justify-center items-center py-16'>
        <div className="container w-8/10 mx-auto flex flex-row gap-4 items-center justify-center">

          <div className="w-1/2 flex flex-col justify-center items-start gap-4">
            <h3 className="text-sm font-semibold ">
              <span className='text-gray-500'>Tentang Kami</span> {' '}
              &gt; {' '} <span className='text-tertiary'>Hubungan Industri</span>
            </h3>
            <h1 className='text-start text-5xl font-bold text-tertiary'>Hubungan <br />Industri & Inovasi</h1>
            <p className='text-start text-xl'>
              Membangun jembatan strategis antara pendidikan vokasi dan dunia industri untuk mencetak generasi profesional yang siap menghadapi tantangan global.
            </p>
            <button className='bg-tertiary text-white py-2 px-4 rounded-lg hover:bg-tertiary-hover transition-colors duration-300'>
              Jelajahi
            </button>
          </div>
          <div className="w-1/2"></div>
        </div>
      </section>

      <section className='bg-white py-16 min-h-screen'>
        <div className="container mx-auto px-4">
          <h2 className='text-5xl font-bold text-center text-black'>Mitra <span className='text-secondary'>Industri</span></h2>
          <p className='text-lg mx-auto w-3/5 text-center text-gray-600 px-12 mt-4'>
            Kami bekerja sama dengan berbagai pemimpin industri global dan nasional untuk
            memastikan kurikulum yang relevan dan peluang karir terbaik bagi lulusan kami.          </p>
        </div>
        <MitraScroll mitraIndustri={mitraIndustri} />
      </section>
    </>
  )
}

export default HubunganIndustri
           