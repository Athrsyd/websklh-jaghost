import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Handshake, FileText, Rocket, BarChart2, TrendingUp } from "lucide-react";

// ─── Hook: auto-scroll dengan pause saat hover/touch ─────────
function useAutoScroll(speed = 1) {
  const ref = useRef(null);
  const paused = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (speed < 0) {
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    }

    const step = () => {
      if (!paused.current) {
        el.scrollLeft += speed;

        if (speed > 0 && el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        } else if (speed < 0 && el.scrollLeft <= 0) {
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
    pause: () => { paused.current = true; },
    resume: () => { paused.current = false; },
  };
}

const AlurKerjaSama = () => {
  const steps = [
    {
      id: 1,
      title: "Penjajakan",
      desc: "Diskusi awal untuk menyelaraskan visi dan kebutuhan antara institusi dan industri.",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30" fill="none">
        <path d="M16.3275 27C16.4275 27 16.5275 26.975 16.6275 26.925C16.7275 26.875 16.8025 26.825 16.8525 26.775L29.1525 14.475C29.4525 14.175 29.6712 13.8375 29.8088 13.4625C29.9463 13.0875 30.015 12.7125 30.015 12.3375C30.015 11.9375 29.9463 11.5563 29.8088 11.1938C29.6712 10.8313 29.4525 10.5125 29.1525 10.2375L22.7775 3.8625C22.5025 3.5625 22.1838 3.34375 21.8213 3.20625C21.4588 3.06875 21.0775 3 20.6775 3C20.3025 3 19.9275 3.06875 19.5525 3.20625C19.1775 3.34375 18.84 3.5625 18.54 3.8625L18.1275 4.275L20.9025 7.0875C21.2775 7.4375 21.5525 7.8375 21.7275 8.2875C21.9025 8.7375 21.99 9.2125 21.99 9.7125C21.99 10.7625 21.6337 11.6438 20.9212 12.3562C20.2087 13.0687 19.3275 13.425 18.2775 13.425C17.7775 13.425 17.2962 13.3375 16.8337 13.1625C16.3713 12.9875 15.965 12.725 15.615 12.375L12.8025 9.6L6.24 16.1625C6.165 16.2375 6.10875 16.3188 6.07125 16.4062C6.03375 16.4937 6.015 16.5875 6.015 16.6875C6.015 16.8875 6.09 17.0688 6.24 17.2313C6.39 17.3938 6.565 17.475 6.765 17.475C6.865 17.475 6.965 17.45 7.065 17.4C7.165 17.35 7.24 17.3 7.29 17.25L12.39 12.15L14.49 14.25L9.4275 19.35C9.3525 19.425 9.29625 19.5063 9.25875 19.5938C9.22125 19.6812 9.2025 19.775 9.2025 19.875C9.2025 20.075 9.2775 20.25 9.4275 20.4C9.5775 20.55 9.7525 20.625 9.9525 20.625C10.0525 20.625 10.1525 20.6 10.2525 20.55C10.3525 20.5 10.4275 20.45 10.4775 20.4L15.5775 15.3375L17.6775 17.4375L12.615 22.5375C12.54 22.5875 12.4838 22.6625 12.4462 22.7625C12.4087 22.8625 12.39 22.9625 12.39 23.0625C12.39 23.2625 12.465 23.4375 12.615 23.5875C12.765 23.7375 12.94 23.8125 13.14 23.8125C13.24 23.8125 13.3338 23.7938 13.4213 23.7563C13.5087 23.7188 13.59 23.6625 13.665 23.5875L18.765 18.525L20.865 20.625L15.765 25.725C15.69 25.8 15.6337 25.8813 15.5962 25.9688C15.5587 26.0562 15.54 26.15 15.54 26.25C15.54 26.45 15.6212 26.625 15.7837 26.775C15.9462 26.925 16.1275 27 16.3275 27ZM16.29 30C15.365 30 14.5462 29.6937 13.8337 29.0812C13.1213 28.4688 12.7025 27.7 12.5775 26.775C11.7275 26.65 11.015 26.3 10.44 25.725C9.865 25.15 9.515 24.4375 9.39 23.5875C8.54 23.4625 7.83375 23.1062 7.27125 22.5187C6.70875 21.9312 6.365 21.225 6.24 20.4C5.29 20.275 4.515 19.8625 3.915 19.1625C3.315 18.4625 3.015 17.6375 3.015 16.6875C3.015 16.1875 3.10875 15.7062 3.29625 15.2437C3.48375 14.7812 3.7525 14.375 4.1025 14.025L12.8025 5.3625L17.715 10.275C17.765 10.35 17.84 10.4062 17.94 10.4438C18.04 10.4813 18.14 10.5 18.24 10.5C18.465 10.5 18.6525 10.4312 18.8025 10.2937C18.9525 10.1562 19.0275 9.975 19.0275 9.75C19.0275 9.65 19.0088 9.55 18.9713 9.45C18.9338 9.35 18.8775 9.275 18.8025 9.225L13.44 3.8625C13.165 3.5625 12.8463 3.34375 12.4838 3.20625C12.1213 3.06875 11.74 3 11.34 3C10.965 3 10.59 3.06875 10.215 3.20625C9.84 3.34375 9.5025 3.5625 9.2025 3.8625L3.915 9.1875C3.69 9.4125 3.5025 9.675 3.3525 9.975C3.2025 10.275 3.1025 10.575 3.0525 10.875C3.0025 11.175 3.0025 11.4812 3.0525 11.7937C3.1025 12.1062 3.2025 12.4 3.3525 12.675L1.1775 14.85C0.7525 14.275 0.44 13.6438 0.24 12.9563C0.04 12.2688 -0.035 11.575 0.015 10.875C0.065 10.175 0.24 9.49375 0.54 8.83125C0.84 8.16875 1.2525 7.575 1.7775 7.05L7.065 1.7625C7.665 1.1875 8.33375 0.75 9.07125 0.45C9.80875 0.15 10.565 0 11.34 0C12.115 0 12.8713 0.15 13.6088 0.45C14.3463 0.75 15.0025 1.1875 15.5775 1.7625L15.99 2.175L16.4025 1.7625C17.0025 1.1875 17.6713 0.75 18.4088 0.45C19.1462 0.15 19.9025 0 20.6775 0C21.4525 0 22.2088 0.15 22.9463 0.45C23.6838 0.75 24.34 1.1875 24.915 1.7625L31.2525 8.1C31.8275 8.675 32.265 9.3375 32.565 10.0875C32.865 10.8375 33.015 11.6 33.015 12.375C33.015 13.15 32.865 13.9062 32.565 14.6438C32.265 15.3813 31.8275 16.0375 31.2525 16.6125L18.9525 28.875C18.6025 29.225 18.1962 29.5 17.7337 29.7C17.2712 29.9 16.79 30 16.29 30Z" fill="white" />
      </svg>),
      color: "bg-[#FE5631]", // Oranye
    },
    {
      id: 2,
      title: "MoU",
      desc: "Peresmian komitmen kerja sama melalui penandatanganan dokumen legal.",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
        <path d="M6 24H18V21H6V24ZM6 18H18V15H6V18ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H15L24 9V27C24 27.825 23.7062 28.5312 23.1187 29.1187C22.5312 29.7062 21.825 30 21 30H3ZM13.5 10.5V3H3V27H21V10.5H13.5ZM3 3V10.5V3V10.5V27V3Z" fill="white" />
      </svg>),
      color: "bg-[#007BFF]", // Biru
    },
    {
      id: 3,
      title: "Pelaksanaan",
      desc: "Implementasi program unggulan mulai dari PKL hingga sinkronisasi kurikulum.",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
        <path d="M6 24H18V21H6V24ZM6 18H18V15H6V18ZM3 30C2.175 30 1.46875 29.7062 0.88125 29.1187C0.29375 28.5312 0 27.825 0 27V3C0 2.175 0.29375 1.46875 0.88125 0.88125C1.46875 0.29375 2.175 0 3 0H15L24 9V27C24 27.825 23.7062 28.5312 23.1187 29.1187C22.5312 29.7062 21.825 30 21 30H3ZM13.5 10.5V3H3V27H21V10.5H13.5ZM3 3V10.5V3V10.5V27V3Z" fill="white" />
      </svg>),
      color: "bg-[#FE5631]", // Oranye
    },
    {
      id: 4,
      title: "Evaluasi",
      desc: "Peninjauan berkala untuk memastikan kualitas dan efektivitas program kolaborasi.",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
        <path d="M5.4 11.9933L8.325 13.2308C8.675 12.5308 9.0375 11.8558 9.4125 11.2058C9.7875 10.5558 10.2 9.90585 10.65 9.25585L8.55 8.84335L5.4 11.9933ZM10.725 15.1058L15 19.3433C16.05 18.9433 17.175 18.3308 18.375 17.5058C19.575 16.6808 20.7 15.7433 21.75 14.6933C23.5 12.9433 24.8688 10.9996 25.8563 8.8621C26.8438 6.7246 27.275 4.75585 27.15 2.95585C25.35 2.83085 23.375 3.2621 21.225 4.2496C19.075 5.2371 17.125 6.60585 15.375 8.35585C14.325 9.40585 13.3875 10.5308 12.5625 11.7308C11.7375 12.9308 11.125 14.0558 10.725 15.1058ZM17.4 12.6683C16.825 12.0933 16.5375 11.3871 16.5375 10.5496C16.5375 9.7121 16.825 9.00585 17.4 8.43085C17.975 7.85585 18.6875 7.56835 19.5375 7.56835C20.3875 7.56835 21.1 7.85585 21.675 8.43085C22.25 9.00585 22.5375 9.7121 22.5375 10.5496C22.5375 11.3871 22.25 12.0933 21.675 12.6683C21.1 13.2433 20.3875 13.5308 19.5375 13.5308C18.6875 13.5308 17.975 13.2433 17.4 12.6683ZM18.1125 24.7058L21.2625 21.5558L20.85 19.4558C20.2 19.9058 19.55 20.3121 18.9 20.6746C18.25 21.0371 17.575 21.3933 16.875 21.7433L18.1125 24.7058ZM29.85 0.218347C30.325 3.24335 30.0312 6.1871 28.9688 9.0496C27.9062 11.9121 26.075 14.6433 23.475 17.2433L24.225 20.9558C24.325 21.4558 24.3 21.9433 24.15 22.4183C24 22.8933 23.75 23.3058 23.4 23.6558L17.1 29.9558L13.95 22.5683L7.5375 16.1558L0.15 13.0058L6.4125 6.70585C6.7625 6.35585 7.18125 6.10585 7.66875 5.95585C8.15625 5.80585 8.65 5.78085 9.15 5.88085L12.8625 6.63085C15.4625 4.03085 18.1875 2.19335 21.0375 1.11835C23.8875 0.0433468 26.825 -0.256653 29.85 0.218347ZM2.8125 20.9183C3.6875 20.0433 4.75625 19.5996 6.01875 19.5871C7.28125 19.5746 8.35 20.0058 9.225 20.8808C10.1 21.7558 10.5312 22.8246 10.5188 24.0871C10.5063 25.3496 10.0625 26.4183 9.1875 27.2933C8.5625 27.9183 7.51875 28.4558 6.05625 28.9058C4.59375 29.3558 2.575 29.7558 0 30.1058C0.35 27.5308 0.75 25.5121 1.2 24.0496C1.65 22.5871 2.1875 21.5433 2.8125 20.9183ZM4.95 23.0183C4.7 23.2683 4.45 23.7246 4.2 24.3871C3.95 25.0496 3.775 25.7183 3.675 26.3933C4.35 26.2933 5.01875 26.1246 5.68125 25.8871C6.34375 25.6496 6.8 25.4058 7.05 25.1558C7.35 24.8558 7.5125 24.4933 7.5375 24.0683C7.5625 23.6433 7.425 23.2808 7.125 22.9808C6.825 22.6808 6.4625 22.5371 6.0375 22.5496C5.6125 22.5621 5.25 22.7183 4.95 23.0183Z" fill="white" />
      </svg>),
      color: "bg-[#007BFF]", // Biru
    },
    {
      id: 5,
      title: "Pengembangan",
      desc: "Inovasi berkelanjutan untuk memperluas jangkauan dan dampak kemitraan.",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
        <path d="M2.1 18L0 15.9L11.1 4.725L17.1 10.725L24.9 3H21V0H30V9H27V5.1L17.1 15L11.1 9L2.1 18Z" fill="white" />
      </svg>),
      color: "bg-[#FE5631]", // Oranye
    },
  ];

  return (
    <section className="w-full bg-side-back py-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4">
            Alur <span className="text-[#FE5631]">Kerja Sama</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            Prosedur kemitraan yang transparan dan terstruktur untuk memastikan
            keberhasilan kolaborasi jangka panjang.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="relative w-full">
          {/* Garis Horizontal Background (Desktop only) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-300 z-0"></div>

          {/* Grid Container untuk Item */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                  {/* Lingkaran Ikon */}
                  <div
                    className={`w-20 h-20 py-8 rounded-full flex justify-center items-center text-white shadow-md mb-8 ${step.color}`}
                  >
                    {IconComponent}
                  </div>

                  {/* Card Deskripsi */}
                  <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 text-center w-full h-full flex flex-col items-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


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
            className="bg-gray-300 my-2 hover:scale-105 h-40 w-75 shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform duration-500 ease-in-out"
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
            className="bg-gray-300 my-2 hover:scale-105 h-40 w-75 shrink-0 flex items-center justify-center rounded-2xl shadow-md transition-transform duration-500 ease-in-out"
          >
            <span className="text-gray-500">{mitra.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}


const HubunganIndustri = () => {
  const heroSectionRef = useRef(null);
  const contentRef = useRef(null);
  const numberRef = useRef(null);
  const curveRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }

      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.1,
            ease: 'power2.out',
          }
        );
      }

      if (curveRef.current) {
        gsap.fromTo(
          curveRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.05,
            ease: 'power2.out',
          }
        );
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToMitra = () => {
    const nextSection = document.getElementById('mitra-industri');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      {/* ─── HERO SECTION (EXACT 100% DESIGN REPLICA) ─── */}
      <section ref={heroSectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-linear-to-b from-side-back to-[#f8fafc] px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d9d9d9 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-40 z-0 h-[470px] w-[430px] rounded-bl-[170px] bg-[#d9d9d9] sm:-right-24 sm:-top-52 lg:h-[560px] lg:w-[510px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-4">
            <div className="flex max-w-xl flex-col items-start lg:col-span-7">
              <nav
                aria-label="Breadcrumb"
                className="mb-3 flex items-center gap-2 text-sm font-medium tracking-wide md:text-[15px]"
              >
                <span className="text-slate-500">Program</span>
                <span className="text-xs font-bold text-slate-800 md:text-sm">
                  &gt;
                </span>
                <span className="font-semibold text-tertiary">Hubungan Industri</span>
              </nav>

              <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-tertiary sm:text-5xl lg:text-[54px]">
                Hubungan Industri
              </h1>

              <p className="mb-8 max-w-[440px] text-left text-sm leading-relaxed text-slate-700 sm:text-base lg:text-[16px]">
                SMK Negeri 26 Jakarta menyediakan berbagai program keahlian untuk
                mengembangkan potensi dan kompetensi siswa. Setiap jurusan dirancang
                untuk membekali siswa dengan keterampilan, pengalaman, dan sikap
                profesional yang sesuai dengan kebutuhan dunia kerja.
              </p>

              <button className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-tertiary text-white px-7 py-3 text-[15px] font-medium  shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-tertiary/70 hover:shadow-blue-500/40 active:scale-[0.98]">
                <span>Jelajahi</span>
                <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </button>
            </div>

            <div className="pointer-events-none relative hidden h-64 select-none items-center justify-center lg:col-span-5 lg:flex">
              <span
                aria-hidden="true"
                className="font-montserrat text-[210px] font-extrabold leading-none text-transparent"
                style={{ WebkitTextStroke: '1px #74a9ff' }}
              >
                26
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="mitra-industri" className='bg-white py-14 sm:py-20'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black'>Mitra <span className='text-secondary'>Industri</span></h2>
          <p className='text-sm sm:text-base lg:text-lg mx-auto max-w-2xl w-full text-center text-gray-600 px-4 sm:px-6 mt-3 sm:mt-4'>
            Kami bekerja sama dengan berbagai pemimpin industri global dan nasional untuk
            memastikan kurikulum yang relevan dan peluang karir terbaik bagi lulusan kami.
          </p>
        </div>
        <MitraScroll mitraIndustri={mitraIndustri} />
      </section>

      <section className='bg-side-back py-4 sm:py-8'>
        <div className="container mx-auto px-4">
          <AlurKerjaSama />
        </div>
      </section>
    </>
  )
}

export default HubunganIndustri
