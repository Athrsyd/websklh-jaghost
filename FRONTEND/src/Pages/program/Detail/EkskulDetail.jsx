import React from "react";
import { useParams } from "react-router-dom";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../../../components/ScrollReveal";

// ── SVG Icon: User with Badge/Medal (100% match design) ──
const UserBadgeIcon = ({ size = "lg" }) => {
  const isLarge = size === "lg";
  return (
    <div
      className={`rounded-full bg-[#FF5733] flex items-center justify-center shrink-0 ${
        isLarge
          ? "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          : "w-9 h-9 sm:w-11 sm:h-11"
      }`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isLarge ? "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" : "w-5 h-5 sm:w-6 sm:h-6"}
      >
        {/* Head */}
        <circle
          cx="21"
          cy="15"
          r="6.5"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Shoulder / Body */}
        <path
          d="M9 34C9 28.5 13.5 24 19.5 24C22 24 24.3 24.8 26 26.2"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Badge circle */}
        <circle cx="34" cy="30" r="5" stroke="white" strokeWidth="2.8" />
        {/* Ribbon legs */}
        <path
          d="M31.5 34.5L30.5 41L34 39.5L37.5 41L36.5 34.5"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// ── Downward Indicator Icon ──
const ScrollDownArrow = () => (
  <svg
    viewBox="0 0 24 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-8 sm:w-6 sm:h-9 text-[#0075FF]"
  >
    <path
      d="M12 2V22M12 22L6 16M12 22L18 16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

const EkskulDetail = () => {
  const { id } = useParams();

  return (
    <div className="w-full bg-white text-slate-800 overflow-x-hidden font-poppins">
      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}

       {/*       <section
        className="w-full relative h-screen flex items-center overflow-hidden 
        bg-linear-to-b  from-[#D8E2FF] to-[#F8FAFC]
        pt-28 pb-16 lg:pt-36 lg:pb-24"
      >
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #d9d9d9 2px, transparent 1.4px)",
            backgroundSize: "24px 24px",
            opacity: "70%",
          }}
          className="absolute top-0 left-0 w-full h-full z-0"
        ></div> */}
      <section className="w-full relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 bg-linear-to-b  from-[#D8E2FF] to-[#F8FAFC]">
        {/* Subtle dot pattern */}
        <div
          style={{
            backgroundImage: "radial-gradient(circle, #d9d9d9 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            opacity: "35%",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="w-full" />

        {/* Main Content */}
        <ScrollReveal direction="up" duration={0.6} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full my-auto">
          {/* Badge */}
          <div className="mb-5 sm:mb-6">
            <span className="inline-block bg-[#03172E] text-white px-8 sm:px-9 py-1 sm:py-1.25 rounded-t-full rounded-br-full text-md sm:text-base md:text-xl font-medium tracking-wide shadow-sm">
              Indoor / Dalam Ruangan
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-montserrat font-black  text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-[#FF5733] leading-[1.04] tracking-tight mb-3 sm:mb-4">
            NAMA
            <br />
            EKSTRAKURIKULER
          </h1>

          {/* Subtitle */}
          <p className="font-montserrat font-black  text-xl sm:text-3xl md:text-4xl lg:text-[42px] text-[#0075FF] tracking-wide">
            SMK NEGERI 26 JAKARTA
          </p>
        </ScrollReveal>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 flex justify-center items-center pt-6">
          <div className="animate-bounce">
            <ScrollDownArrow />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — APA ITU NAMA EKSKUL ? (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <ScrollReveal direction="up" duration={0.55} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Image Placeholder */}
            <div className="lg:col-span-5 w-full">
              <div className="w-full aspect-[4/3] bg-[#D9D9D9] rounded-[28px] sm:rounded-[36px]" />
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h2 className="font-montserrat font-black  text-3xl sm:text-4xl lg:text-[44px] leading-tight mb-3">
                <span className="text-[#FF5733]">APA ITU </span>
                <span className="text-[#0075FF]">NAMA EKSKUL ?</span>
              </h2>

              {/* Red underline */}
              <div className="w-32 sm:w-40 h-[3px] bg-[#FF5733] mb-6 sm:mb-8" />

              <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed text-justify font-normal">
                SMK Negeri 26 Jakarta merupakan salah satu institusi pendidikan kejuruan
                terkemuka yang berdedikasi untuk menghasilkan lulusan yang kompeten,
                inovatif, dan siap bersaing di pasar kerja global. Dengan fasilitas
                modern dan tenaga pengajar profesional, kami berkomitmen membentuk
                karakter bangsa melalui pendidikan vokasi yang bermutu.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — MANFAAT BERGABUNG (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#DCE7FD] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Section Title */}
          <ScrollReveal direction="up" duration={0.5} className="text-center mb-10 sm:mb-14">
            <h2 className="font-montserrat font-black  text-3xl sm:text-4xl lg:text-[46px] text-[#FF5733] tracking-wide">
              MANFAAT BERGABUNG
            </h2>
            <div className="w-28 sm:w-36 h-[3px] bg-[#FF5733] mx-auto mt-3 sm:mt-4" />
          </ScrollReveal>

          {/* Top Big Card (Special Rounded Top Corners) */}
          <ScrollReveal direction="up" delay={0.06} duration={0.55} className="bg-[#FED9C9] rounded-t-[32px] sm:rounded-t-[44px] rounded-b-xl p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8">
            <UserBadgeIcon size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-montserrat font-black  text-xl sm:text-2xl lg:text-[28px] text-[#FF5733] mb-2 sm:mb-3">
                MELATIH JIWA KEPEMIMPINAN
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                Lorem ipsum dolor sit amet, do elit aliquip incididunt exercitation. Pariatur
                nisi labore aute culpa elit veniam sunt in qui aliquip id id. Occaecat in
                incididunt minim qui labore incididunt aute aute nisi enim sunt. Ea laboris
                deserunt ut veniam nostrud sed magna elit reprehenderit aliqua exercitation
              </p>
            </div>
          </ScrollReveal>

          {/* Bottom 3 Cards with distinct corner roundings matching design */}
          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.08}>
            {/* Card 1: Bottom-Left heavily rounded */}
            <ScrollStaggerItem className="bg-[#FED9C9] rounded-t-xl rounded-br-xl rounded-bl-[32px] sm:rounded-bl-[44px] p-6 sm:p-7 flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <UserBadgeIcon size="sm" />
                <h4 className="font-montserrat font-black  text-sm sm:text-base lg:text-[17px] text-[#FF5733] leading-tight">
                  MENINGKATKAN
                  <br />
                  KEPERCAYAAN DIRI
                </h4>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, dolor eu enim anim. Mollit enim id qui elit id
                laboris laboris sed ea nisi. Fugiat elit commodo id ullamco irure officia
                magna adipiscing aliqua enim nulla.
              </p>
            </ScrollStaggerItem>

            {/* Card 2: Regular rounded */}
            <ScrollStaggerItem className="bg-[#FED9C9] rounded-xl p-6 sm:p-7 flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <UserBadgeIcon size="sm" />
                <h4 className="font-montserrat font-black  text-sm sm:text-base lg:text-[17px] text-[#FF5733] leading-tight">
                  MENINGKATKAN
                  <br />
                  KEBUGARAN
                </h4>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, dolor eu enim anim. Mollit enim id qui elit id
                laboris laboris sed ea nisi. Fugiat elit commodo id ullamco irure officia
                magna adipiscing aliqua enim nulla.
              </p>
            </ScrollStaggerItem>

            {/* Card 3: Bottom-Right heavily rounded */}
            <ScrollStaggerItem className="bg-[#FED9C9] rounded-t-xl rounded-bl-xl rounded-br-[32px] sm:rounded-br-[44px] p-6 sm:p-7 flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <UserBadgeIcon size="sm" />
                <h4 className="font-montserrat font-black  text-sm sm:text-base lg:text-[17px] text-[#FF5733] leading-tight">
                  MEMPERERAT
                  <br />
                  KEBERSAMAAN
                </h4>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, dolor eu enim anim. Mollit enim id qui elit id
                laboris laboris sed ea nisi. Fugiat elit commodo id ullamco irure officia
                magna adipiscing aliqua enim nulla.
              </p>
            </ScrollStaggerItem>
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — JADWAL AGENDA (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#DCE7FD]/40 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Section Title (Left aligned) */}
          <ScrollReveal direction="up" duration={0.5} className="mb-10 sm:mb-14">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[44px] text-[#03172E] tracking-tight">
              JADWAL AGENDA
            </h2>
            <div className="w-24 sm:w-32 h-[3px] bg-[#03172E] mt-3" />
          </ScrollReveal>

          {/* Agenda Table Container with Solid Drop Shadow */}
          <ScrollReveal direction="up" delay={0.08} duration={0.55} className="w-full max-w-4xl mx-auto border-2 border-[#03172E] shadow-[8px_8px_0px_0px_#03172E] bg-[#FED9C9] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-[#03172E] text-center border-b-2 border-[#03172E]">
              <div className="py-5 sm:py-6 border-r-2 border-[#03172E]">
                <span className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-[#FF5733] tracking-wider">
                  HARI
                </span>
              </div>
              <div className="py-5 sm:py-6">
                <span className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-[#FF5733] tracking-wider">
                  WAKTU
                </span>
              </div>
            </div>

            {/* Table Body */}
            <div className="grid grid-cols-2">
              {/* Left Column (Split 2 Rows) */}
              <div className="border-r-2 border-[#03172E] flex flex-col">
                <div className="h-24 sm:h-28 border-b-2 border-[#03172E]" />
                <div className="h-24 sm:h-28" />
              </div>

              {/* Right Column (Single Merged Block) */}
              <div className="h-48 sm:h-56" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — GALERI PHOTO (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <ScrollReveal direction="up" duration={0.5} className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="font-montserrat font-black  text-3xl sm:text-4xl lg:text-[46px] text-[#0075FF] tracking-wide">
              GALERI PHOTO
            </h2>
            <div className="w-28 sm:w-36 h-[3px] bg-[#0075FF] mx-auto mt-3 sm:mt-4" />
          </div>
        </ScrollReveal>

        {/* Staggered Brick Pattern Photo Grid */}
        <ScrollReveal direction="up" delay={0.08} duration={0.55} className="w-full overflow-x-auto pb-4 scrollbar-none">
          <div className="flex flex-col gap-5 sm:gap-6 min-w-[1100px] lg:min-w-[1280px] px-6 sm:px-12">
            {/* Row 1 */}
            <div className="flex gap-5 sm:gap-6 items-center">
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
            </div>

            {/* Row 2 (Staggered offset) */}
            <div className="flex gap-5 sm:gap-6 items-center -ml-16 sm:-ml-24">
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[360px] h-[180px] sm:w-[420px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
              <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[200px] shrink-0 bg-[#D9D9D9] rounded-[24px] sm:rounded-[32px]" />
            </div>
          </div>
        </ScrollReveal>
      </section>


    </div>
  );
};

export default EkskulDetail;