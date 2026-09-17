import React, { useState, useRef } from 'react'

// --- Custom SVGs matching the design mockup precisely ---

const BuildingPlusIcon = ({ className = "w-8 h-8", color = "#EF4444" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Main building outline */}
    <rect x="9" y="7" width="22" height="34" rx="2" stroke={color} strokeWidth="3" fill="none" />
    {/* Windows grid (2 columns x 3 rows) */}
    <rect x="13" y="12" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="12" width="4" height="4" rx="0.5" fill={color} />
    <rect x="13" y="19" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="19" width="4" height="4" rx="0.5" fill={color} />
    <rect x="13" y="26" width="4" height="4" rx="0.5" fill={color} />
    <rect x="22" y="26" width="4" height="4" rx="0.5" fill={color} />
    {/* Door */}
    <path d="M16 41V34H22V41" stroke={color} strokeWidth="2.5" />
    {/* Plus circle badge bottom right */}
    <circle cx="34" cy="33" r="8" fill={color} />
    <path d="M34 29V37M30 33H38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

const ChipIcon = ({ className = "w-8 h-8", color = "#0066FF" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="13" y="13" width="22" height="22" rx="3" stroke={color} strokeWidth="3.2" fill="none" />
    <rect x="20" y="20" width="8" height="8" rx="1" fill={color} />
    <path d="M19 6V13M29 6V13" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M19 35V42M29 35V42" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M6 19H13M6 29H13" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M35 19H42M35 29H42" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
)

const LightningIcon = ({ className = "w-8 h-8", color = "#FACC15" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M27 6L14 26H25L21 42L36 21H24L27 6Z"
      fill={color}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

const GearsIcon = ({ className = "w-8 h-8", color = "#9F1239" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Horizontal connecting bars */}
    <path d="M9 16H18" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M29 32H39" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    {/* Top Right Gear */}
    <g transform="translate(30, 18)">
      <circle cx="0" cy="0" r="4.5" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M0 -7V-5M0 5V7M-7 0H-5M5 0H7M-5 -5L-3.5 -3.5M3.5 3.5L5 5M-5 5L-3.5 3.5M3.5 -3.5L5 -5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </g>
    {/* Bottom Left Gear */}
    <g transform="translate(19, 31)">
      <circle cx="0" cy="0" r="4.5" fill="none" stroke={color} strokeWidth="2.5" />
      <path d="M0 -7V-5M0 5V7M-7 0H-5M5 0H7M-5 -5L-3.5 -3.5M3.5 3.5L5 5M-5 5L-3.5 3.5M3.5 -3.5L5 -5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
)

const CarIcon = ({ className = "w-8 h-8", color = "#334155" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M13 22L16 13C16.8 11.2 18.5 10 20.5 10H27.5C29.5 10 31.2 11.2 32 13L35 22C37 22.5 39 24.2 39 27V34H36V36C36 37.1 35.1 38 34 38H33C31.9 38 31 37.1 31 36V34H17V36C17 37.1 16.1 38 15 38H14C12.9 38 12 37.1 12 36V34H9V27C9 24.2 11 22.5 13 22Z"
      fill={color}
    />
    <path
      d="M17.5 13.5L15 21H33L30.5 13.5C30.2 12.6 29.3 12 28.3 12H19.7C18.7 12 17.8 12.6 17.5 13.5Z"
      fill="white"
    />
    <circle cx="14" cy="27" r="2" fill="white" />
    <circle cx="34" cy="27" r="2" fill="white" />
    <rect x="20" y="27" width="8" height="2.5" rx="1" fill="white" />
  </svg>
)

const MonitorIcon = ({ className = "w-8 h-8", color = "#FF5533" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="8" y="9" width="32" height="24" rx="2" stroke={color} strokeWidth="3" fill="none" />
    <path d="M24 33V39" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M16 39H32" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
)

// --- Teaching Factory Units Data ---
const teachingFactoryUnits = [
  {
    id: 'kgs',
    title: 'KGStudio',
    subtitle: 'Konstruksi Gedung dan Sanitasi',
    accentColor: '#FF5533',
    bgBadge: 'bg-[#FFCCD5]',
    activeIconColor: '#EF4444',
    icon: BuildingPlusIcon,
    showcaseTitle: 'KGStudio',
    showcaseSubtitle: 'Konstruksi Gedung dan Sanitasi',
    underlineColor: 'bg-[#FF5533]',
    services: [
      'Gambar kerja rumah tinggal',
      'Desain 2D/3D',
      'Pengukuran sederhana',
    ],
  },
  {
    id: 'tek',
    title: 'UpTechno',
    subtitle: 'Teknik Elektronika & Komunikasi',
    accentColor: '#0066FF',
    bgBadge: 'bg-[#BFDBFE]',
    activeIconColor: '#0066FF',
    icon: ChipIcon,
    showcaseTitle: 'UpTechno',
    showcaseSubtitle: 'Teknik Elektronika & Komunikasi',
    underlineColor: 'bg-[#0066FF]',
    services: [
      'Perakitan PCB & IoT',
      'Servis Audio & Video',
      'Pemrograman Mikrokontroler',
    ],
  },
  {
    id: 'titl',
    title: 'UpTechno',
    subtitle: 'Teknik Elektronika & Komunikasi',
    departmentLabel: 'Teknik Ketenagalistrikan',
    accentColor: '#EAB308',
    bgBadge: 'bg-[#FEF08A]',
    activeIconColor: '#EAB308',
    icon: LightningIcon,
    showcaseTitle: 'UpTechno',
    showcaseSubtitle: 'Teknik Ketenagalistrikan',
    underlineColor: 'bg-[#EAB308]',
    services: [
      'Instalasi Penerangan & Tenaga',
      'Perawatan Panel Listrik',
      'Otomasi PLC & Motor',
    ],
  },
  {
    id: 'tpm',
    title: 'UpTechno',
    subtitle: 'Teknik Elektronika & Komunikasi',
    departmentLabel: 'Teknik Pemesinan & Fabrikasi',
    accentColor: '#9F1239',
    bgBadge: 'bg-[#E5B6C5]',
    activeIconColor: '#9F1239',
    icon: GearsIcon,
    showcaseTitle: 'UpTechno',
    showcaseSubtitle: 'Teknik Pemesinan & Fabrikasi',
    underlineColor: 'bg-[#9F1239]',
    services: [
      'Bubut & Frais Presisi',
      'Fabrikasi Logam & Las',
      'Pemrograman Mesin CNC',
    ],
  },
  {
    id: 'tkro',
    title: 'UpTechno',
    subtitle: 'Teknik Elektronika & Komunikasi',
    departmentLabel: 'Teknik Otomotif',
    accentColor: '#334155',
    bgBadge: 'bg-[#CBD5E1]',
    activeIconColor: '#334155',
    icon: CarIcon,
    showcaseTitle: 'UpTechno',
    showcaseSubtitle: 'Teknik Kendaraan Ringan Otomotif',
    underlineColor: 'bg-[#334155]',
    services: [
      'Tune Up & Servis Berkala',
      'Perawatan AC Kendaraan',
      'Spooring & Balancing',
    ],
  },
  {
    id: 'sija',
    title: 'UpTechno',
    subtitle: 'Teknik Elektronika & Komunikasi',
    departmentLabel: 'Sistem Informatika Jaringan & Aplikasi',
    accentColor: '#FF5533',
    bgBadge: 'bg-[#FFBCAD]',
    activeIconColor: '#FF5533',
    icon: MonitorIcon,
    showcaseTitle: 'UpTechno',
    showcaseSubtitle: 'Sistem Informatika Jaringan & Aplikasi',
    underlineColor: 'bg-[#FF5533]',
    services: [
      'Pengembangan Web & Aplikasi',
      'Konfigurasi Jaringan & Server',
      'Solusi Cloud & IoT',
    ],
  },
]

const BLUD = () => {
  const [activeUnitIndex, setActiveUnitIndex] = useState(0)
  const visiMisiRef = useRef(null)
  const produkJasaRef = useRef(null)

  const scrollToVisiMisi = () => {
    visiMisiRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectUnitFromSection2 = (index) => {
    setActiveUnitIndex(index)
    produkJasaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const activeUnit = teachingFactoryUnits[activeUnitIndex]

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <section
        className="w-full relative h-screen flex items-center overflow-hidden 
        bg-linear-to-b from-[#D8E2FF] to-[#F8FAFC]
        pt-28 pb-16 lg:pt-36 lg:pb-24"
      >
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #d9d9d9 2px, transparent 1.4px)",
            backgroundSize: "24px 24px",
            opacity: "70%",
          }}
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
        {/* Shape Organik Abu-abu Lembut di Sisi Kiri Bawah */}
        <div className="absolute bottom-0 left-0 h-100 rounded-tr-full z-0 bg-[#D9D9D9] w-1/5" />

        {/* Kontainer Utama Hero */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Kolom Kiri: Kosong (Spasi) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center select-none pointer-events-none pr-0 lg:pr-6" />

            {/* Kolom Kanan: Teks Konten */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start pl-0 lg:pl-6 max-w-2xl">
              {/* Breadcrumb: Program > BLUD */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-sm md:text-[15px] font-medium mb-3 tracking-wide"
              >
                <span className="text-slate-500">Program</span>
                <span className="text-slate-800 font-bold text-xs md:text-sm">
                  &gt;
                </span>
                <span className="text-[#0075FF] font-semibold">
                  BLUD
                </span>
              </nav>

              {/* Judul Utama: BLUD */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0075FF] tracking-tight leading-[1.1] mb-5 font-montserrat">
                BLUD
              </h1>

              {/* Paragraf Deskripsi */}
              <p className="text-slate-800 text-md sm:text-lg lg:text-[20px] leading-relaxed font-normal mb-8 text-left pr-12 lg:pr-20">
                Badan Layanan Umum Daerah (BLUD) SMK Negeri 26 Jakarta adalah
                pola pengelolaan sekolah yang memberi fleksibilitas dalam
                mengelola layanan, teaching factory, dan aset sekolah.
              </p>

              {/* Tombol Jelajahi */}
              <button
                onClick={scrollToVisiMisi}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0075FF] hover:bg-[#0062db] active:scale-[0.98] text-white font-medium text-[15px] rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 cursor-pointer group"
              >
                <span>Jelajahi</span>
                <span className="font-bold text-base transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION: VISI, MISI, DAN TUJUAN (IMAGE 1) */}
      {/* ============================================================ */}
      <section ref={visiMisiRef} className="w-full py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0A2540] tracking-tight font-montserrat">
              Visi, Misi, dan Tujuan
            </h2>
            {/* Blue underline */}
            <div className="w-24 h-1 bg-[#0075FF] mx-auto mt-4 rounded-full" />
          </div>

          {/* 3 Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* CARD 1: VISI */}
            <div className="bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#0075FF] font-montserrat text-center mb-8">
                Visi
              </h3>
              <p className="text-slate-600 font-poppins text-[15px] sm:text-[16px] leading-[1.8] text-center sm:text-justify px-1">
                Menjadi pusat layanan teaching factory teknik yang profesional, akuntabel, dan bermanfaat bagi industri serta masyarakat.
              </p>
            </div>

            {/* CARD 2: MISI */}
            <div className="bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#0075FF] font-montserrat text-center mb-8">
                Misi
              </h3>
              <ol className="w-full space-y-3.5 sm:space-y-4 text-slate-600 font-poppins text-[15px] sm:text-[16px] leading-snug">
                <li className="flex items-start gap-2.5">
                  <span className="font-medium shrink-0">1.</span>
                  <span>Mengelola unit produksi sesuai kompetensi keahlian sekolah</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-medium shrink-0">2.</span>
                  <span>Memberi layanan jasa dan sewa aset yang terstandar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-medium shrink-0">3.</span>
                  <span>Melatih siswa bekerja dengan budaya industri</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-medium shrink-0">4.</span>
                  <span>Menjalankan tata kelola yang transparan</span>
                </li>
              </ol>
            </div>

            {/* CARD 3: TUJUAN */}
            <div className="bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 flex flex-col items-center">
              <h3 className="text-2xl sm:text-[28px] font-bold text-[#0075FF] font-montserrat text-center mb-8">
                Tujuan
              </h3>
              <ul className="w-full space-y-3.5 sm:space-y-4 text-slate-600 font-poppins text-[15px] sm:text-[16px] leading-snug">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-800 text-lg leading-none shrink-0">•</span>
                  <span>Menyelaraskan praktik siswa dengan kebutuhan industri</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-800 text-lg leading-none shrink-0">•</span>
                  <span>Memberi layanan teknik kepada masyarakat</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-800 text-lg leading-none shrink-0">•</span>
                  <span>Mengembangkan jiwa wirausaha siswa</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-800 text-lg leading-none shrink-0">•</span>
                  <span>Memanfaatkan fasilitas sekolah secara produktif</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION: UNIT TEACHING FACTORY (IMAGE 2) */}
      {/* ============================================================ */}
      <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#EBF2FF] via-[#F4F8FF] to-[#EDF4FF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Section Heading */}
          <div className="text-center mb-14 sm:mb-18">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0A2540] tracking-tight font-montserrat">
              Unit Teaching Factory
            </h2>
            {/* Blue underline */}
            <div className="w-24 h-1 bg-[#0075FF] mx-auto mt-4 rounded-full" />
          </div>

          {/* 6 Circular Icons Row */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 md:gap-9 lg:gap-11">
            {teachingFactoryUnits.map((unit, index) => {
              const UnitIcon = unit.icon
              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnitFromSection2(index)}
                  title={unit.title + ' - ' + unit.subtitle}
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center 
                  transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                  ${unit.bgBadge}`}
                >
                  <UnitIcon
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300"
                    color={unit.activeIconColor}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION: PRODUK & JASA (IMAGE 3) */}
      {/* ============================================================ */}
      <section ref={produkJasaRef} className="w-full py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Section Heading (Left Aligned) */}
          <div className="mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0A2540] tracking-tight font-montserrat">
              Produk & Jasa
            </h2>
            {/* Blue underline (Left Aligned) */}
            <div className="w-24 h-1 bg-[#0075FF] mt-3 sm:mt-4 rounded-full" />
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* KOLOM KIRI: Daftar Unit (Tabs) */}
            <div className="lg:col-span-5 bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100 p-5 sm:p-6 flex flex-col gap-3">
              {teachingFactoryUnits.map((unit, index) => {
                const isActive = activeUnitIndex === index
                const UnitIcon = unit.icon

                return (
                  <button
                    key={unit.id}
                    onClick={() => setActiveUnitIndex(index)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer
                    ${isActive
                        ? 'bg-[#FFF7F5] border border-[#FFD9D0]'
                        : 'hover:bg-slate-50 border border-transparent'
                      }`}
                  >
                    {/* Circle Icon Badge */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200
                      ${isActive ? unit.bgBadge : 'bg-[#CBD5E1]'}`}
                    >
                      <UnitIcon
                        className="w-7 h-7 sm:w-8 sm:h-8"
                        color={isActive ? unit.activeIconColor : '#334155'}
                      />
                    </div>

                    {/* Unit Titles */}
                    <div className="flex flex-col min-w-0">
                      <h4
                        className={`text-base sm:text-[17px] font-bold tracking-tight truncate transition-colors duration-200
                        ${isActive ? 'text-[#FF5533]' : 'text-[#0A2540]'}`}
                      >
                        {unit.title}
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] font-medium truncate transition-colors duration-200
                        ${isActive ? 'text-[#FF7F66]' : 'text-slate-500'}`}
                      >
                        {unit.subtitle}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* KOLOM KANAN: Detail Showcase Unit yang Aktif */}
            <div className="lg:col-span-7 bg-white rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 flex flex-col justify-between min-h-[520px]">
              {/* Header Box */}
              <div>
                <h3 className="text-3xl sm:text-[36px] font-extrabold text-[#0A2540] tracking-tight font-montserrat">
                  {activeUnit.showcaseTitle}
                </h3>
                <p className="text-slate-600 font-medium text-base sm:text-[17px] mt-1.5">
                  {activeUnit.showcaseSubtitle}
                </p>
                {/* Red/Coral Underline */}
                <div className={`w-28 sm:w-32 h-[3.5px] rounded-full mt-3 mb-6 sm:mb-8 ${activeUnit.underlineColor}`} />
              </div>

              {/* Showcase Image Placeholder (Matching Mockup Gray Box) */}
              <div className="w-full aspect-[16/10] sm:h-72 md:h-80 bg-[#D9D9D9] rounded-xl sm:rounded-2xl mb-6 sm:mb-8 overflow-hidden relative flex items-center justify-center">
                {/* Subtle watermark / icon illustration inside placeholder */}
                <div className="opacity-25 flex flex-col items-center justify-center pointer-events-none">
                  <activeUnit.icon className="w-20 h-20 sm:w-24 sm:h-24" color="#64748B" />
                </div>
              </div>

              {/* Bottom 3 Badges / Service Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                {activeUnit.services.map((service, sIndex) => (
                  <div
                    key={sIndex}
                    className="bg-[#FED7CC] text-[#1E293B] font-medium text-xs sm:text-sm py-3.5 sm:py-4 px-3 rounded-xl sm:rounded-2xl flex items-center justify-center text-center leading-snug shadow-xs transition-all hover:brightness-95"
                  >
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BLUD