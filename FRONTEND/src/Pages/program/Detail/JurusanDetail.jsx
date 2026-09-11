import React from "react";
import { useParams } from "react-router-dom";

// Data untuk Prospek Karir / Dunia Kerja
const defaultJobProspects = [
  "Network Engineer",
  "System Administrator",
  "Cloud Architect",
  "Cybersecurity Analyst",
  "Web & Backend Developer",
  "Frontend Developer",
  "Database Administrator",
  "DevOps Engineer",
  "IT Support & Helpdesk",
  "IoT & Embedded Engineer",
  "Mobile App Developer",
  "IT Project Specialist",
];

const JurusanDetail = () => {
  const { id } = useParams();

  // Scroll to detail section
  const scrollToDetail = () => {
    const el = document.getElementById("wearpack-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 overflow-x-hidden font-poppins">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO SECTION (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full relative bg-tertiary pt-28 sm:pt-36 lg:pt-40 overflow-hidden">
        {/* Subtle dot pattern background */}
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            opacity: "25%",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end">
            {/* Left Content */}
            <div className="lg:col-span-7  flex flex-col items-start pb-12 sm:pb-16 lg:pb-24">
              {/* Badge */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-block bg-[#03172E] text-white px-5 sm:px-6 py-2 rounded-t-full rounded-br-full text-xs sm:text-sm md:text-base font-semibold tracking-wide shadow-sm">
                  Program Sekolah 4 Tahun
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-montserrat font-black italic text-3xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] text-white leading-[1.04] tracking-tight mb-4 sm:mb-6 uppercase">
                SISTEM INFORMASI
                JARINGAN & APLIKASI
              </h1>

              {/* Paragraph */}
              <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl text-justify sm:text-left">
                SMK Negeri 26 Jakarta menyediakan berbagai program keahlian
                untuk mengembangkan potensi dan kompetensi siswa. Setiap jurusan
                dirancang untuk membekali siswa dengan keterampilan, pengalaman,
                dan sikap profesional yang sesuai dengan kebutuhan dunia kerja.
              </p>

              {/* Action Button */}
              <button
                type="button"
                onClick={scrollToDetail}
                className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3 bg-[#0075FF] hover:bg-[#0062db] active:scale-[0.98] text-white font-semibold text-sm sm:text-base rounded-2xl shadow-lg shadow-black/15 transition-all duration-300 cursor-pointer"
              >
                <span>Pelajari</span>
                <span className="font-bold text-base transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </button>
            </div>

            {/* Right Image (Curved mask corner) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-end w-full">
              <div className="w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[16/11] bg-[#03172E]/20 rounded-tl-[140px] sm:rounded-tl-[200px] overflow-hidden shadow-2xl relative">
                {/* Fallback coding photo illustration */}
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                  alt="Siswa SIJA Praktik Lab Komputer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — WEARPACK SIJA (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section
        id="wearpack-section"
        className="w-full bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col items-center">
          {/* Section Title */}
          <h2 className="font-montserrat font-black italic text-4xl sm:text-6xl md:text-7xl lg:text-[80px] text-terbg-tertiary text-center tracking-wide uppercase mb-8 sm:mb-12">
            WEARPACK SIJA
          </h2>

          {/* Wearpack Uniform Students Image with soft bottom fade */}
          <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl flex justify-center items-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] flex justify-center items-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="Model Wearpack SIJA"
                className="w-full h-full object-contain object-center drop-shadow-xl"
              />
              {/* Bottom gradient fade to white */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — KOMPETENSI KEAHLIAN (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight uppercase">
              <span className="text-[#03172E]">KOMPETENSI </span>
              <span className="text-terbg-tertiary">KEAHLIAN</span>
            </h2>
            <div className="w-24 sm:w-32 h-[3px] bg-[#03172E] mt-3 mb-3" />
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-2xl leading-relaxed">
              Materi pembelajaran berbasis industri yang dirancang untuk
              memenuhi standar teknologi global terkini.
            </p>
          </div>

          {/* Cards Grid with exact corner roundings & solid hard shadow */}
          <div className="flex flex-col gap-6 sm:gap-7">
            {/* ROW 1: 2 Cards (Wide Left + Regular Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
              {/* Card 1: Large rounded top-left corner */}
              <div className="lg:col-span-7 bg-[#FFAE9D] border-2 border-[#03172E] rounded-tl-[36px] sm:rounded-tl-[54px] rounded-tr-xl rounded-b-xl shadow-[8px_8px_0px_0px_#03172E] min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                <div>
                  <h3 className="font-montserrat font-black text-xl sm:text-2xl text-[#03172E] mb-2">
                    Infrastruktur Jaringan &amp; Cloud
                  </h3>
                  <p className="text-[#03172E]/80 text-xs sm:text-sm leading-relaxed">
                    Instalasi, perancangan topologi, manajemen server Linux/Windows,
                    routing switching, serta virtualisasi cloud computing modern.
                  </p>
                </div>
              </div>

              {/* Card 2: Large rounded top-right corner */}
              <div className="lg:col-span-5 bg-[#FFAE9D] border-2 border-[#03172E] rounded-tr-[36px] sm:rounded-tr-[54px] rounded-tl-xl rounded-b-xl shadow-[8px_8px_0px_0px_#03172E] min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                <div>
                  <h3 className="font-montserrat font-black text-xl sm:text-2xl text-[#03172E] mb-2">
                    Keamanan Siber
                  </h3>
                  <p className="text-[#03172E]/80 text-xs sm:text-sm leading-relaxed">
                    Penerapan cyber defense, firewall, vulnerability scanning, dan
                    keamanan transmisi data terenkripsi.
                  </p>
                </div>
              </div>
            </div>

            {/* ROW 2: 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {/* Card 3: Large rounded bottom-left corner */}
              <div className="bg-[#FFAE9D] border-2 border-[#03172E] rounded-t-xl rounded-br-xl rounded-bl-[36px] sm:rounded-bl-[54px] shadow-[8px_8px_0px_0px_#03172E] min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                <div>
                  <h3 className="font-montserrat font-black text-lg sm:text-xl text-[#03172E] mb-2">
                    Pengembangan Web &amp; API
                  </h3>
                  <p className="text-[#03172E]/80 text-xs sm:text-sm leading-relaxed">
                    Membangun arsitektur frontend responsif dan REST API backend
                    skala industri.
                  </p>
                </div>
              </div>

              {/* Card 4: Standard rounded corners */}
              <div className="bg-[#FFAE9D] border-2 border-[#03172E] rounded-xl shadow-[8px_8px_0px_0px_#03172E] min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                <div>
                  <h3 className="font-montserrat font-black text-lg sm:text-xl text-[#03172E] mb-2">
                    Basis Data Terdistribusi
                  </h3>
                  <p className="text-[#03172E]/80 text-xs sm:text-sm leading-relaxed">
                    Pengolahan basis data SQL/NoSQL dengan integritas, replikasi,
                    dan kueri teroptimasi.
                  </p>
                </div>
              </div>

              {/* Card 5: Large rounded bottom-right corner */}
              <div className="bg-[#FFAE9D] border-2 border-[#03172E] rounded-t-xl rounded-bl-xl rounded-br-[36px] sm:rounded-br-[54px] shadow-[8px_8px_0px_0px_#03172E] min-h-[180px] sm:min-h-[220px] p-6 sm:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                <div>
                  <h3 className="font-montserrat font-black text-lg sm:text-xl text-[#03172E] mb-2">
                    Aplikasi Mobile &amp; IoT
                  </h3>
                  <p className="text-[#03172E]/80 text-xs sm:text-sm leading-relaxed">
                    Pengembangan aplikasi pintar terintegrasi mikrokontroler dan
                    sensor pintar cerdas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — PROSPEK DUNIA KERJA (100% MATCH DESIGN)
       ═══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#DCE7FD] rounded-t-[40px] sm:rounded-t-[60px] pt-14 sm:pt-18 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight uppercase">
              <span className="text-[#03172E]">PROSPEK </span>
              <span className="text-terbg-tertiary">DUNIA KERJA</span>
            </h2>
            <div className="w-24 sm:w-32 h-[3px] bg-[#03172E] mt-3 mb-3" />
            <p className="text-slate-700 text-xs sm:text-sm md:text-base font-normal max-w-2xl leading-relaxed">
              Kompetensi di bidang sistem informasi, jaringan, dan aplikasi
              membuka peluang untuk berkarier di berbagai bidang teknologi digital.
            </p>
          </div>

          {/* Pill Badges (4 Columns x 3 Rows = 12 Pills) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {defaultJobProspects.map((job, idx) => (
              <div
                key={idx}
                className="bg-tertiary hover:bg-[#ff451d] text-white rounded-full py-3.5 sm:py-4 px-5 sm:px-6 flex items-center justify-center text-center font-bold text-xs sm:text-sm shadow-md shadow-orange-950/10 transition-all duration-200 hover:scale-[1.03] cursor-default"
              >
                <span>{job}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JurusanDetail;