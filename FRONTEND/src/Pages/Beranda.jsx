import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tu from "./../assets/hero-bg.png";
import heroVideo from "./../assets/hero_1080p30.webm";
import kepsek from "./../assets/kepsek.png";
import RowKanan from "./../assets/rowKananHitam.svg?react";
import RowKiri from "./../assets/rowKiriHitam.svg?react";
import logoPLN from "./../assets/logopln.png";
import modelBangunan from "./../assets/modelJurusan/kgs.png";
import modelElektro from "./../assets/modelJurusan/tek.png";
import modelListrik from "./../assets/modelJurusan/titl.png";
import modelMesin from "./../assets/modelJurusan/tflm.png";
import modelTkr from "./../assets/modelJurusan/tkr.png";
import briefcase from "./../assets/briefcase.svg?react";
import { Link } from "react-router-dom";

const Beranda = () => {
  const [jurusanId, setJurusanId] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    console.log(window.innerWidth, window.innerHeight);
  }, []);

  const HubunganIndustri = [
    {
      id: 1,
      nama: "PLN",
      logo: logoPLN,
    },
    {
      id: 2,
      nama: "PLN",
      logo: logoPLN,
    },
    {
      id: 3,
      nama: "PLN",
      logo: logoPLN,
    },
    {
      id: 4,
      nama: "PLN",
      logo: logoPLN,
    },
  ];

  const jurusanData = [
    {
      id: 1,
      nama: "Konstruksi Gedung dan Sanitasi",
      singkatan: "KGS",
      color: "#FF0000",
      backgroundIconColor: "#FA010126",
      iconColor: "#FF0000",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang mempelajari perencanaan, pembuatan, pemeliharaan bangunan gedung, serta sistem plumbing dan sanitasi lingkungan secara modern.",
      img: modelBangunan,
      prospekKerja: [
        "Drafter/BIM Operator",
        "Pelaksana Lapangan Konstruksi",
        "Estimator Biaya Konstruksi",
        "Teknisi Sanitasi & Plumbing",
        "Quality Control (QC) Konstruksi",
      ],
    },
    {
      id: 2,
      nama: "Teknik Elektronika dan Komunikasi",
      singkatan: "TEK",
      color: "#1F4481",
      backgroundIconColor: "#001F3F26",
      iconColor: "#001F3F",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang mempelajari sistem komunikasi radio, transmisi sinyal, jaringan telekomunikasi, dan perakitan perangkat elektronik.",
      img: modelElektro,
      prospekKerja: [
        "Teknisi Telekomunikasi",
        "Network Support Engineer",
        "Teknisi Radio & Pemancar",
        "Maintenance Technician Elektronika",
        "Radio Frequency (RF) Technician",
      ],
    },
    {
      id: 3,
      nama: "Teknik Instalasi Tenaga Listrik",
      singkatan: "TITL",
      color: "#FFDD00",
      backgroundIconColor: "#FFDD004D",
      iconColor: "#FFDD00",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang mempelajari perencanaan, pemasangan, dan pemeliharaan sistem kelistrikan bangunan, industri, serta panel kontrol otomasi.",
      img: modelListrik,
      prospekKerja: [
        "Teknisi Listrik Industri",
        "Panel Maker",
        "Maintenance Electrician",
        "Teknisi Instalasi Gedung",
        "Supervisor Otomasi Industri",
      ],
    },
    {
      id: 4,
      nama: "Teknik Fabrikasi Logam dan Manufaktur",
      singkatan: "TFLM",
      color: "#F10732",
      backgroundIconColor: "#FA063A26",
      iconColor: "#DC042F",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang mempelajari teknik pembentukan, pengelasan, pemotongan, dan fabrikasi logam untuk kebutuhan manufaktur serta industri berat.",
      img: modelMesin,
      prospekKerja: [
        "Welder Professional",
        "Fabricator Logam",
        "Operator Mesin CNC Cutting",
        "Quality Control Inspector",
        "Estimator Fabrikasi Logam",
      ],
    },
    {
      id: 5,
      nama: "Teknik Kendaraan Ringan",
      singkatan: "TKR",
      color: "#DED8E5",
      backgroundIconColor: "#1E1E1E26",
      iconColor: "#434655",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang mempelajari perawatan, perbaikan, dan diagnosis sistem mekanis serta elektronik pada mobil atau kendaraan ringan.",
      img: modelTkr,
      prospekKerja: [
        "Teknisi/Mekanik Mobil",
        "Service Advisor",
        "Diagnostic Technician",
        "Auto Electrician",
        "Quality Inspector Otomotif",
      ],
    },
    {
      id: 6,
      nama: "Teknik Bodi Kendaraan Ringan",
      singkatan: "TBKR",
      color: "#F4A34D",
      backgroundIconColor: "#99341F26",
      iconColor: "#895721",
      icon: briefcase,
      deskripsi:
        "Program keahlian yang fokus pada perbaikan, perataan, pengecatan, dan restorasi konstruksi bodi kendaraan akibat kerusakan atau modifikasi.",
      img: "",
      prospekKerja: [
        "Teknisi Body Repair",
        "Painter Otomotif",
        "Estimator Perbaikan Bodi (Asuransi/Bengkel)",
        "Detailer Kendaraan",
        "Specialist Modifikasi Bodi",
      ],
    },
    {
      id: 7,
      nama: "Sistem Informasi Jaringan dan Aplikasi",
      singkatan: "SIJA",
      color: "#FF5733",
      backgroundIconColor: "#FF573326",
      iconColor: "#FF5733",
      icon: briefcase,
      deskripsi:
        "Program 4 tahun yang mempelajari pemrograman, pengelolaan basis data, dan sistem informasi berbasis teknologi modern.",
      img: "",
      prospekKerja: [
        "Software Engineer",
        "Web Developer",
        "Mobile App Developer",
        "Database Administrator",
        "IT Security Specialist",
        "System Analyst",
      ],
    },
  ];

  const deskripsi = [
    {
      id: 1,
      qty: "3000+",
      desc: "Jumlah Siswa Aktif",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#FF5733]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 2,
      qty: "200+",
      desc: "Jumlah Guru Aktif",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#FF5733]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      id: 3,
      qty: "100+",
      desc: "Mitra Industri",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-[#FF5733]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left smaller building */}
          <path d="M4 22V11a2 2 0 0 1 2-2h3" />
          <path d="M6.5 13.5v2" />
          {/* Right taller building */}
          <rect x="9" y="3" width="11" height="19" rx="2" />
          {/* Windows on taller building */}
          <path d="M12.5 7v1.5M16.5 7v1.5M12.5 11.5v1.5M16.5 11.5v1.5" />
          {/* Entrance arch door */}
          <path d="M13 22v-3a1.5 1.5 0 0 1 3 0v3" />
        </svg>
      ),
    },
  ];

  const activeJurusan = jurusanData.find((jurusan) => jurusan.id === jurusanId);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const detailItems = [
    {
      judul: "Prospek Kerja:",
      deskripsi: activeJurusan.prospekKerja.join(", "),
      icon: activeJurusan.icon,
      isProspekKerja: true,
    },
  ];

  const handleJurusanDec = () => {
    setDirection(1);
    if (jurusanId === 7) {
      setJurusanId(1);
    } else {
      setJurusanId(jurusanId + 1);
    }
  };

  const handleJurusanInc = () => {
    setDirection(-1);
    if (jurusanId === 1) {
      setJurusanId(7);
    } else {
      setJurusanId(jurusanId - 1);
    }
  };

  const handleDot = (id) => {
    setJurusanId(id);
  };

  const partners = [...HubunganIndustri, ...HubunganIndustri];

  return (
    <>
      {/* Heroo */}
      <section className="w-full min-h-screen bg-primary relative overflow-hidden pb-12">
        {isDesktop ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={tu}
            className="w-full absolute inset-0 h-full opacity-25 object-cover pointer-events-none"
          >
            <source src={heroVideo} type="video/webm" />
            <img
              src={tu}
              alt="Hero Background"
              className="w-full absolute inset-0 h-full opacity-25 object-cover"
            />
          </video>
        ) : (
          <img
            src={tu}
            alt="Hero Background"
            className="w-full absolute inset-0 h-full opacity-25 object-cover"
          />
        )}

        <div className="container w-4/5 flex flex-col gap-3 mx-auto relative z-10 pt-28 md:pt-32">
          {/* Welcome Tag Pill */}
          <div
            className="rounded-2xl w-fit bg-[#0c2f5e]/80 backdrop-blur-md text-white px-6 md:px-8 py-2 font-semibold text-sm md:text-base tracking-wide border border-blue-400/20 shadow-md"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Selamat datang di SMK Negeri 26 Jakarta
          </div>

          {/* Heading - BELAJAR, BEKERJA, MEMBANGUN */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[112px] uppercase font-extrabold mt-2 leading-[0.92] tracking-tight"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
          >
            <span className="text-white">BELAJAR,</span> <br />
            <span className="text-[#007AFF]">BEKERJA,</span> <br />
            <span className="text-[#FF5733]">MEMBANGUN</span>
          </h1>

          {/* Banner Card Statistik Putih dengan Garis Oren */}
          <div
            className="mt-8 md:mt-10 w-full lg:w-[90%] max-w-5xl bg-white
        rounded-3xl md:rounded-[36px] py-5 px-6 md:px-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col md:flex-row
        items-center justify-between gap-4 md:gap-0"
          >
            {deskripsi.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3
                      className="text-2xl md:text-3xl font-extrabold tracking-tight text-black"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
                    >
                      {item.qty}
                    </h3>
                    <p
                      className="text-xs md:text-sm font-semibold text-gray-800"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
                {index < deskripsi.length - 1 && (
                  <div className="hidden md:block w-[1.5px] h-12 bg-[#FF5733] mx-3" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="w-full min-h-screen bg-white py-20">
        <div
          className="container lg:w-4/5 w-full mx-auto flex flex-col 
        md:flex-row gap-8 lg:gap-12 items-center justify-center"
        >
          <div className="w-3/5 lg:w-1/2 flex justify-center">
            <img
              src={kepsek}
              alt="Kepala Sekolah"
              className="w-full lg:w-4/5 h-auto"
            />
          </div>

          <div className="w-4/5 lg:w-1/2 flex flex-col gap-4">
            <div className="flex flex-row items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M32 0H8C3.57333 0 0 3.57333 0 8V21.3333C0 25.76 3.57333 29.3333 8 29.3333V40L18.6667 29.3333H32C36.4267 29.3333 40 25.76 40 21.3333V8C40 3.57333 36.4267 0 32 0Z"
                  fill="#4B5563"
                />
              </svg>
              <h2
                className="text-[#4B5563] text-xl md:text-2xl font-bold tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Sambutan
              </h2>
            </div>

            <div className="w-full flex flex-row gap-5 items-stretch pl-1 mt-2">
              <div className="w-[3.5px] bg-[#FF5733] rounded-full shrink-0" />
              <p
                className="text-[#1a2540] text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed md:leading-[1.75] text-justify italic font-normal"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Selamat datang di website resmi SMK Negeri 26 Jakarta. Website
                ini menjadi sarana informasi, komunikasi, dan layanan digital
                bagi seluruh warga sekolah serta masyarakat. Semoga kehadiran
                website ini dapat memberikan informasi yang mudah diakses,
                meningkatkan pelayanan, dan mendukung terciptanya pendidikan
                yang berkualitas, inovatif, serta berdaya saing. Terima kasih
                atas kunjungan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program keahlian */}
      <section
        className="w-full min-h-135 bg-yellow-400 rounded-t-[7em] py-15 transition-colors duration-500"
        style={{
          background: `color-mix(in srgb, ${activeJurusan.color} 30%, transparent)`,
        }}
      >
        <div
          className="container relative w-2/10 opacity-70 mx-auto flex flex-col bg-white/50 border border-white
          rounded-full py-2 px-2 shadow-2xl items-center justify-center bottom-8"
        >
          <h1 className="text-[21px] font-bold text-center font-poppins text-black">
            • Program Keahlian •
          </h1>
        </div>

        {/* Judul + Deskripsi — sekarang punya tinggi tetap supaya tidak collapse */}
        <div className="absolute w-full mx-auto mt-4 ">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={jurusanId}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 z-99 flex flex-col items-center justify-center"
            >
              <h1 className="font-poppins text-3xl font-bold text-black text-center">
                {activeJurusan.nama}
              </h1>
              <p className="text-md font-poppins font-semibold text-center text-black w-3/5">
                {activeJurusan.deskripsi}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative w-2/3 flex flex-col mx-auto top-60 items-center justify-center">
          {/* Gambar */}
          {activeJurusan.img && (
            <div className="absolute w-full overflow-hidden flex justify-center h-102">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={jurusanId}
                  src={activeJurusan.img}
                  alt={activeJurusan.nama}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className={`absolute z-10 object-contain ${
                    jurusanId === 1
                      ? "h-70 mt-3"
                      : jurusanId === 2
                        ? "h-83 mb-17"
                        : jurusanId === 4
                          ? "h-81 mt-1.5"
                          : "h-80 mt-3"
                  }`}
                />
              </AnimatePresence>
            </div>
          )}

          <div className="relative w-full mx-auto flex flex-col justify-center items-center">
            <div
              className="absolute w-1/4 z-99 flex flex-col bg-white
    rounded-full px-4 py-4 shadow-2xl items-center justify-center top-6"
            ></div>
            <h1
              className="absolute top-7.5 text-[13px] z-100 text-center font-montserrat font-semibold text-black"
              style={{ color: activeJurusan.color }}
            >
              Pelajari Selengkapnya
            </h1>
          </div>

          <div className="absolute top-15 z-10 w-3/4 mx-auto h-20 rounded-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={jurusanId}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full backdrop-blur-xl shadow-2xl bg-white flex items-center px-6"
              >
                <div className="flex flex-col gap-3 w-full text-black">
                  {detailItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className="relative flex flex-row gap-4 items-start"
                      >
                        <div
                          className={`rounded-full ${item.isProspekKerja ? "flex py-2 px-2 w-8" : "py-1 px-1"} shrink-0`}
                          style={{
                            backgroundColor: activeJurusan.backgroundIconColor,
                          }}
                        >
                          <IconComponent
                            style={{ color: activeJurusan.iconColor }}
                            className={`${item.isProspekKerja ? "h-4" : "h-6"}`}
                          />
                        </div>
                        <h1 className="text-black font-montserrat text-xs">
                          <span className="font-bold">{item.judul}</span>{" "}
                          {item.judul === "Prospek Kerja:" ? (
                            item.deskripsi
                          ) : (
                            <>
                              <br />
                              {item.deskripsi}
                            </>
                          )}
                        </h1>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-full h-full flex items-center justify-center top-60">
          <button
            onClick={() => handleJurusanInc()}
            className="absolute text-black left-30 z-10 w-10 h-10 bottom-18 bg-white/50 rounded-full border-white border flex items-center justify-center"
          >
            <RowKiri
              style={{ color: activeJurusan.iconColor }}
              className="h-6 pr-0.5"
            />
          </button>
          <button
            onClick={() => handleJurusanDec()}
            className="absolute text-black right-30 z-10 w-10 h-10 bottom-18 bg-white/50 rounded-full border-white border flex items-center justify-center"
          >
            <RowKanan
              style={{ color: activeJurusan.iconColor }}
              className="h-6 pl-0.5"
            />
          </button>

          <div className="indicator absolute top-40 flex flex-row gap-2">
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDot(index + 1)}
                  className={`indicator-item indicator-center cursor-pointer transition-all duration-300
        ${index + 1 === jurusanId ? "w-5" : "w-3"} h-3 rounded-full bg-white`}
                  style={
                    index + 1 === jurusanId
                      ? { backgroundColor: activeJurusan.color }
                      : undefined
                  }
                ></div>
              ))}
          </div>
        </div>
      </section>

      {/* Hubungan Industri */}
      <section className="w-full min-h-screen bg-white py-20">
        <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center text-black">
            Hubungan Industri
          </h1>
          <div className="h-80 w-full flex flex-row items-center">
            <div className="hidden md:flex w-1/3 h-46 border-t-[1.75px] border-r-[1.75px] border-b-[1.75px] px-4  flex-col items-center justify-center border-[#0037B080]/30">
              <p className="text-black font-montserrat text-lg leading-5 text-justify">
                Bekerja sama dengan berbagai perusahaan dan instansi untuk
                mendukung pembelajaran, PKL, serta penyerapan lulusan.
              </p>
            </div>
            <div className="w-full h-46 overflow-hidden border-t-2 border-b-2 border-[#0037B080]/30">
              <div
                className="h-full flex items-center group"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 15%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 15%)",
                }}
              >
                <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                  {partners.map((partner, index) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="flex items-center justify-center w-50 h-46 shrink-0 border-t-[1.75px] border-b-[1.75px] border-l border-r border-[#0037B080]/80"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.nama}
                        className="max-h-30 w-auto "
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link to="/tentang-kami/hubungan-industri">
            <button className="bg-secondary text-xl text-white py-3 px-16 rounded-xl hover:bg-blue-600 transition-colors">
              Lihat Selengkapnya
            </button>
          </Link>
        </div>
      </section>

      {/* Prestasi */}
      {/* <section className="w-full min-h-screen bg-white py-20">
        <div
          className="container w-9/10 bg-tertiary mx-auto rounded-4xl 
        px-4 py-8 flex flex-col gap-4 justify-center items-center"
        >
          <h1 className="text-5xl font-bold text-center text-white">
            Prestasi Kami
          </h1>
          <div className="h-160"></div>
        </div>
      </section> */}
    </>
  );
};;

export default Beranda;
