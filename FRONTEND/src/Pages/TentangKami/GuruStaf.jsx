import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import kepsekImg from "../../assets/kepsek.webp";

// ─── DATA GURU & STAFF SMKN 26 JAKARTA ────────────────────────

const dataWakasek = [
  {
    id: 1,
    name: "Drs. H. Mulyono, M.Pd.",
    role: "Wakil Kepala Sekolah",
    subRole: "Bidang Kurikulum",
    badge: "Kurikulum",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 2,
    name: "Dra. Hj. Siti Aminah, M.M.",
    role: "Wakil Kepala Sekolah",
    subRole: "Bidang Kesiswaan",
    badge: "Kesiswaan",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 3,
    name: "Ir. Ahmad Fauzi, M.T.",
    role: "Wakil Kepala Sekolah",
    subRole: "Bidang Hubungan Industri & Humas",
    badge: "Hubin & Humas",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 4,
    name: "Bambang Sudarmanto, S.Pd., M.T.",
    role: "Wakil Kepala Sekolah",
    subRole: "Bidang Sarana & Prasarana",
    badge: "Sarpras",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
];

const dataGuruKejuruan = [
  {
    id: 1,
    name: "Rahmat Hidayat, S.Kom., M.Kom.",
    role: "Guru Produktif SIJA",
    subRole: "Sistem Informatika, Jaringan & Aplikasi",
    badge: "SIJA",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 2,
    name: "Ir. Hendra Kusuma, S.T., M.T.",
    role: "Guru Produktif KGS",
    subRole: "Konstruksi Gedung & Sanitasi",
    badge: "KGS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 3,
    name: "Dra. Nurul Hidayati, M.Pd.",
    role: "Guru Produktif TEK",
    subRole: "Teknik Elektronika",
    badge: "TEK",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 4,
    name: "Agus Setiawan, S.T., M.Eng.",
    role: "Guru Produktif TITL",
    subRole: "Teknik Ketenagalistrikan",
    badge: "TITL",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 5,
    name: "Drs. Joko Prasetyo, M.T.",
    role: "Guru Produktif TFLM",
    subRole: "Teknik Fabrikasi Logam & Manufaktur",
    badge: "TFLM",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
  {
    id: 6,
    name: "Tri Wahyudi, S.Pd., M.T.",
    role: "Guru Produktif TKR",
    subRole: "Teknik Kendaraan Ringan Otomotif",
    badge: "TKR",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    color: "#FE5631",
  },
];

const dataGuruNormatif = [
  {
    id: 1,
    name: "Dra. Endang Lestari, M.Pd.",
    role: "Guru Matematika",
    subRole: "Koordinator MGMP Matematika",
    badge: "Matematika",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 2,
    name: "Drs. Muhammad Arifin, M.Hum.",
    role: "Guru Bahasa Indonesia",
    subRole: "Literasi & Bahasa Sekolah",
    badge: "B. Indonesia",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 3,
    name: "Sarah Wijaya, S.Pd., M.A.",
    role: "Guru Bahasa Inggris",
    subRole: "English Club Coordinator",
    badge: "B. Inggris",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 4,
    name: "Ust. H. Syarifuddin, S.Ag., M.Pd.I.",
    role: "Guru Pendidikan Agama Islam",
    subRole: "Pembina Rohani Islam (Rohis)",
    badge: "Agama Islam",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 5,
    name: "Budi Pratama, S.Pd., M.Si.",
    role: "Guru PPKn",
    subRole: "Pendidikan Pancasila & Kewarganegaraan",
    badge: "PPKn",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 6,
    name: "Dian Anggraeni, S.Psi., M.Pd.",
    role: "Guru Bimbingan Konseling (BK)",
    subRole: "Koordinator Karir & Konseling",
    badge: "BK",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
];

const dataTenagaKependidikan = [
  {
    id: 1,
    name: "Drs. Sugeng Waluyo",
    role: "Kepala Sub Bagian Tata Usaha",
    subRole: "Pimpinan Tata Usaha & Kepegawaian",
    badge: "Kasubag TU",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 2,
    name: "Hj. Ratna Dewi, S.E.",
    role: "Pengelola Kepegawaian",
    subRole: "Administrasi & Keuangan",
    badge: "Keuangan",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 3,
    name: "Aris Nugroho, S.Kom.",
    role: "Teknisi Laboratorium IT",
    subRole: "Pengelola Server & Lab Komputer",
    badge: "Teknisi IT",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 4,
    name: "Supriyadi, A.Md.",
    role: "Teknisi Bengkel Vokasi",
    subRole: "Pengelola Workshop & Mesin Industri",
    badge: "Teknisi Bengkel",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
  {
    id: 5,
    name: "Dewi Sartika, S.I.Pust.",
    role: "Pustakawan Sekolah",
    subRole: "Pengelola Perpustakaan Digital SMKN 26",
    badge: "Perpustakaan",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
    color: "#007AFF",
  },
];

// ─── KOMPONEN KARTU PROFIL (MOCKUP DESIGN REPLICA) ────────────

function TeacherCard({ item, themeColor = "#FE5631", isCompact = false }) {
  return (
    <div
      className={`group relative w-full ${
        isCompact ? "h-[370px] sm:h-[395px]" : "h-[390px] sm:h-[415px]"
      } rounded-tl-none rounded-tr-[46px] rounded-b-2xl overflow-hidden bg-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.12)] transition-all 
      duration-300 hover:-translate-y-1.5 flex flex-col justify-end select-none border border-slate-200/80`}
    >
      {/* Background Image Portrait */}
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95 contrast-[1.02] group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Subtle Top Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55 pointer-events-none" />

      {/* Top Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-full backdrop-blur-md shadow-sm text-white"
          style={{ backgroundColor: `${themeColor}E6` }}
        >
          {item.badge}
        </span>
      </div>

      {/* Sweeping Organic White Bottom Plate */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-tr-[38px] px-4 py-3 shadow-md border-t border-white/60">
        <div className="flex flex-col">
          <h3 className="font-bold text-slate-900 text-[14px] sm:text-[15px] leading-snug tracking-tight line-clamp-1 group-hover:text-[#FE5631] transition-colors">
            {item.name}
          </h3>
          <p className="text-[12px] font-semibold text-slate-700 mt-0.5 line-clamp-1">
            {item.role}
          </p>
          <p className="text-[10px] text-slate-500 line-clamp-1">
            {item.subRole}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── KOMPONEN CAROUSEL SLIDER ────────────────────────────────

function TeacherCarousel({ titleParts, data, themeColor = "#FE5631", columns = 3 }) {
  const sliderRef = useRef(null);
  const isFourCol = columns === 4;

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const cardEl = sliderRef.current.firstElementChild;
      const cardWidth = cardEl ? cardEl.clientWidth : 260;
      const gap = isFourCol ? 20 : 28;
      const scrollAmount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full py-14 sm:py-16 overflow-hidden bg-white">
      <div
        className={`${
          isFourCol
            ? "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            : "max-w-[1060px] mx-auto px-4 sm:px-10 lg:px-24"
        }`}
      >
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight">
            {titleParts.map((part, idx) => (
              <span key={idx} style={{ color: part.color }}>
                {part.text}{" "}
              </span>
            ))}
          </h2>
        </div>

        {/* Carousel Container with Arrows */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className={`absolute ${
              isFourCol
                ? "-left-2 sm:-left-6 lg:-left-8"
                : "-left-2 sm:-left-6 lg:-left-12"
            } z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-md shadow-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer`}
            style={{
              border: `2px solid ${themeColor}`,
              color: themeColor,
            }}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* Cards Track */}
          <div
            ref={sliderRef}
            className={`w-full flex ${
              isFourCol ? "gap-4 sm:gap-5" : "gap-5 sm:gap-7 justify-start"
            } overflow-x-auto py-3 px-1 scroll-smooth scrollbar-none`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                className={`flex-shrink-0 ${
                  isFourCol
                    ? "w-[240px] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3*1.25rem)/4)]"
                    : "w-[230px] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-2*1.75rem)/3)] max-w-[275px]"
                }`}
              >
                <TeacherCard
                  item={item}
                  themeColor={themeColor}
                  isCompact={isFourCol}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className={`absolute ${
              isFourCol
                ? "-right-2 sm:-right-6 lg:-right-8"
                : "-right-2 sm:-right-6 lg:-right-12"
            } z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-white/95 backdrop-blur-md shadow-md transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer`}
            style={{
              border: `2px solid ${themeColor}`,
              color: themeColor,
            }}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── HALAMAN UTAMA GURU & STAFF ───────────────────────────────

const GuruStaf = () => {
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const numberRef = useRef(null);
  const curveRef = useRef(null);
  const kepsekSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 0.1,
            ease: "power2.out",
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
            duration: 0.9,
            delay: 0.05,
            ease: "power2.out",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToKepsek = () => {
    if (kepsekSectionRef.current) {
      kepsekSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* ─── 1. HERO SECTION (100% MATCH MOCKUP IMAGE 4 TOP) ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden pt-28 lg:pt-32 pb-16"
        style={{
          backgroundColor: "#FAF4F0",
          backgroundImage: "radial-gradient(circle, #E6D5CE 1.25px, transparent 1.25px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* Giant Outline "26" Number */}
        <div
          ref={numberRef}
          aria-hidden="true"
          className="absolute left-[48%] sm:left-[50%] lg:left-[48%] top-[38%] -translate-y-1/2 select-none pointer-events-none z-5"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontSize: "clamp(80px, 15vw, 195px)",
            fontWeight: 700,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1.5px #FE5631",
            letterSpacing: "-0.04em",
          }}
        >
          26
        </div>

        {/* Right Organic Curved Shape */}
        <div
          ref={curveRef}
          aria-hidden="true"
          className="absolute top-0 right-0 h-full w-[42vw] min-w-[280px] pointer-events-none z-10"
        >
          <svg
            viewBox="0 0 450 700"
            preserveAspectRatio="none"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 120 0 
                 C 75 160, 50 280, 75 400 
                 C 100 520, 190 620, 320 700 
                 L 450 700 
                 L 450 0 
                 Z"
              fill="#D4D7DC"
            />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div ref={heroContentRef} className="max-w-xl flex flex-col items-start">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[15px] font-medium mb-4">
              <span className="text-gray-500">Tentang Kami</span>
              <span className="text-gray-400 font-semibold">&gt;</span>
              <span className="text-[#FE5631] font-semibold">Profil Guru</span>
            </nav>

            {/* Heading */}
            <h1
              className="text-start font-bold text-[#FE5631] tracking-tight leading-[1.12] mb-5"
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.5rem)",
              }}
            >
              Profil Guru <br />
              & Staff
            </h1>

            {/* Description */}
            <p className="text-start text-gray-600 text-[16px] sm:text-[17px] leading-[1.65] max-w-[500px] mb-6 font-normal">
              Guru dan staff SMK Negeri 26 Jakarta hadir untuk mendampingi, membimbing, dan menciptakan lingkungan belajar yang berkembang bersama siswa.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleScrollToKepsek}
              className="inline-flex items-center gap-2 bg-[#FE5631] hover:bg-[#e44622] text-white font-medium text-[15px] px-6 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer shadow-none"
            >
              <span>Jelajahi</span>
              <span className="text-[14px] font-bold leading-none select-none">&gt;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. KEPALA SEKOLAH SHOWCASE (IMAGE 4 BOTTOM) ─────── */}
      <section
        ref={kepsekSectionRef}
        id="kepala-sekolah"
        className="w-full py-20 sm:py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Sisi Kiri: Foto Melingkar Kepala Sekolah */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[390px] lg:h-[390px] rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-[#FE5631] to-[#FF7B59] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#FE5631] flex items-center justify-center relative">
                  <img
                    src={kepsekImg}
                    alt="DARMINTO M.Par - Kepala SMK Negeri 26 Jakarta"
                    className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95"
                  />
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Nama & Kutipan */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              <span className="text-[#007AFF] font-bold text-sm sm:text-base tracking-wider uppercase mb-2">
                Kepala SMK Negeri 26 JAKARTA
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001F3F] tracking-tight leading-tight mb-4">
                DARMINTO M.Par
              </h2>

              <blockquote className="text-slate-600 italic text-base sm:text-lg lg:text-[19px] leading-relaxed max-w-lg mx-auto lg:mx-0">
                “Dedikasi guru dan staff menjadi bagian penting dalam menciptakan proses pendidikan yang bermakna bagi setiap siswa.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CAROUSEL: WAKIL KEPALA SEKOLAH (IMAGE 5 - 4 COLUMNS) ──────── */}
      <TeacherCarousel
        titleParts={[
          { text: "Wakil", color: "#001F3F" },
          { text: "Kepala", color: "#FE5631" },
          { text: "Sekolah", color: "#007AFF" },
        ]}
        data={dataWakasek}
        themeColor="#FE5631"
        columns={4}
      />

      {/* ─── 4. CAROUSEL: GURU KEJURUAN (IMAGE 3) ─────────────── */}
      <TeacherCarousel
        titleParts={[
          { text: "Guru", color: "#001F3F" },
          { text: "Kejuruan", color: "#FE5631" },
        ]}
        data={dataGuruKejuruan}
        themeColor="#FE5631"
      />

      {/* ─── 5. CAROUSEL: GURU NORMATIF & SEKOLAH (IMAGE 2) ───── */}
      <TeacherCarousel
        titleParts={[
          { text: "Guru", color: "#001F3F" },
          { text: "Normatif", color: "#FE5631" },
          { text: "&", color: "#001F3F" },
          { text: "Sekolah", color: "#007AFF" },
        ]}
        data={dataGuruNormatif}
        themeColor="#007AFF"
      />

      {/* ─── 6. CAROUSEL: TENAGA KEPENDIDIKAN (IMAGE 1) ───────── */}
      <TeacherCarousel
        titleParts={[
          { text: "Tenaga", color: "#001F3F" },
          { text: "Kependidikan", color: "#007AFF" },
        ]}
        data={dataTenagaKependidikan}
        themeColor="#007AFF"
      />
    </div>
  );
};

export default GuruStaf;