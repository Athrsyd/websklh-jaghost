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
      qty: "3000 +",
      desc: "Jumlah Siswa",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 16 16"
        >
          <path d="M0 0h16v16H0z" fill="none" />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m14.25 9.25v-3.25l-6.25-3.25-6.25 3.25 6.25 3.25 3.25-1.5v3.5c0 1-1.5 2-3.25 2s-3.25-1-3.25-2v-3.5"
          />
        </svg>
      ),
    },
    {
      id: 2,
      qty: "200 +",
      desc: "Jumlah Guru Aktif",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 90 68"
          fill="currentColor"
        >
          <path d="M49.815 29.0588C52.5485 25.2112 54.0183 20.5983 54.0183 15.8668C54.0183 11.1353 52.5485 6.52242 49.815 2.67483C52.3746 0.918306 55.403 -0.014345 58.5 0.00016681C62.6772 0.00016681 66.6832 1.67183 69.6369 4.6474C72.5906 7.62296 74.25 11.6587 74.25 15.8668C74.25 20.0749 72.5906 24.1106 69.6369 27.0862C66.6832 30.0618 62.6772 31.7334 58.5 31.7334C55.403 31.7479 52.3746 30.8153 49.815 29.0588ZM15.75 15.8668C15.75 12.7287 16.6737 9.66102 18.4044 7.05177C20.135 4.44252 22.5948 2.40885 25.4727 1.20794C28.3507 0.00703525 31.5175 -0.307177 34.5727 0.30504C37.6279 0.917258 40.4343 2.42841 42.6369 4.6474C44.8396 6.86638 46.3397 9.69354 46.9474 12.7714C47.5551 15.8492 47.2432 19.0394 46.0511 21.9387C44.859 24.8379 42.8403 27.316 40.2502 29.0594C37.6602 30.8029 34.6151 31.7334 31.5 31.7334C27.3228 31.7334 23.3168 30.0618 20.3631 27.0862C17.4094 24.1106 15.75 20.0749 15.75 15.8668ZM24.75 15.8668C24.75 17.2117 25.1459 18.5264 25.8876 19.6447C26.6293 20.7629 27.6835 21.6345 28.9169 22.1492C30.1503 22.6638 31.5075 22.7985 32.8169 22.5361C34.1262 22.2737 35.329 21.6261 36.273 20.6751C37.217 19.7241 37.8599 18.5125 38.1203 17.1934C38.3808 15.8743 38.2471 14.5071 37.7362 13.2646C37.2253 12.022 36.3601 10.96 35.2501 10.2128C34.1401 9.46562 32.835 9.06681 31.5 9.06681C29.7098 9.06681 27.9929 9.78323 26.727 11.0585C25.4612 12.3337 24.75 14.0633 24.75 15.8668ZM63 58.9334V68H0V58.9334C0 58.9334 0 40.8001 31.5 40.8001C63 40.8001 63 58.9334 63 58.9334ZM54 58.9334C53.37 55.3974 48.015 49.8667 31.5 49.8667C14.985 49.8667 9.315 55.8054 9 58.9334M62.775 40.8001C65.5331 42.9612 67.7881 45.7044 69.3818 48.8371C70.9755 51.9697 71.8691 55.4158 72 58.9334V68H90V58.9334C90 58.9334 90 42.4774 62.73 40.8001H62.775Z" />
        </svg>
      ),
    },
    {
      id: 3,
      qty: "100 +",
      desc: "Mitra Industri",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 90 90"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27 13.5C27 9.91958 28.4223 6.4858 30.9541 3.95406C33.4858 1.42232 36.9196 0 40.5 0H76.5C80.0804 0 83.5142 1.42232 86.046 3.95406C88.5777 6.4858 90 9.91958 90 13.5V76.5C90 80.0804 88.5777 83.5142 86.046 86.046C83.5142 88.5777 80.0804 90 76.5 90H40.5C36.9196 90 33.4858 88.5777 30.9541 86.046C28.4223 83.5142 27 80.0804 27 76.5V13.5ZM40.5 9C39.3065 9 38.1619 9.47411 37.318 10.318C36.4741 11.1619 36 12.3065 36 13.5V76.5C36 77.6935 36.4741 78.8381 37.318 79.682C38.1619 80.5259 39.3065 81 40.5 81H76.5C77.6935 81 78.8381 80.5259 79.682 79.682C80.5259 78.8381 81 77.6935 81 76.5V13.5C81 12.3065 80.5259 11.1619 79.682 10.318C78.8381 9.47411 77.6935 9 76.5 9H40.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 40.5C0 36.9196 1.42232 33.4858 3.95406 30.9541C6.4858 28.4223 9.91958 27 13.5 27H33.75V36H13.5C12.3065 36 11.1619 36.4741 10.318 37.318C9.47411 38.1619 9 39.3065 9 40.5V76.5C9 77.6935 9.47411 78.8381 10.318 79.682C11.1619 80.5259 12.3065 81 13.5 81H56.25V90H13.5C9.91958 90 6.4858 88.5777 3.95406 86.046C1.42232 83.5142 0 80.0804 0 76.5V40.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45 67.5C45 65.1131 45.9482 62.8239 47.636 61.136C49.3239 59.4482 51.6131 58.5 54 58.5H63C65.387 58.5 67.6761 59.4482 69.364 61.136C71.0518 62.8239 72 65.1131 72 67.5V81H63V67.5H54V81H45V67.5Z"
          />
          <path d="M45 18C45 16.8065 45.4741 15.6619 46.318 14.818C47.1619 13.9741 48.3065 13.5 49.5 13.5C50.6935 13.5 51.8381 13.9741 52.682 14.818C53.5259 15.6619 54 16.8065 54 18V22.5C54 23.6935 53.5259 24.8381 52.682 25.682C51.8381 26.5259 50.6935 27 49.5 27C48.3065 27 47.1619 26.5259 46.318 25.682C45.4741 24.8381 45 23.6935 45 22.5V18ZM45 40.5C45 39.3065 45.4741 38.1619 46.318 37.318C47.1619 36.4741 48.3065 36 49.5 36C50.6935 36 51.8381 36.4741 52.682 37.318C53.5259 38.1619 54 39.3065 54 40.5V45C54 46.1935 53.5259 47.3381 52.682 48.182C51.8381 49.0259 50.6935 49.5 49.5 49.5C48.3065 49.5 47.1619 49.0259 46.318 48.182C45.4741 47.3381 45 46.1935 45 45V40.5ZM13.5 58.5C13.5 57.3065 13.9741 56.1619 14.818 55.318C15.6619 54.4741 16.8065 54 18 54C19.1935 54 20.3381 54.4741 21.182 55.318C22.0259 56.1619 22.5 57.3065 22.5 58.5V63C22.5 64.1935 22.0259 65.3381 21.182 66.182C20.3381 67.0259 19.1935 67.5 18 67.5C16.8065 67.5 15.6619 67.0259 14.818 66.182C13.9741 65.3381 13.5 64.1935 13.5 63V58.5ZM63 18C63 16.8065 63.4741 15.6619 64.318 14.818C65.1619 13.9741 66.3065 13.5 67.5 13.5C68.6935 13.5 69.8381 13.9741 70.682 14.818C71.5259 15.6619 72 16.8065 72 18V22.5C72 23.6935 71.5259 24.8381 70.682 25.682C69.8381 26.5259 68.6935 27 67.5 27C66.3065 27 65.1619 26.5259 64.318 25.682C63.4741 24.8381 63 23.6935 63 22.5V18ZM63 40.5C63 39.3065 63.4741 38.1619 64.318 37.318C65.1619 36.4741 66.3065 36 67.5 36C68.6935 36 69.8381 36.4741 70.682 37.318C71.5259 38.1619 72 39.3065 72 40.5V45C72 46.1935 71.5259 47.3381 70.682 48.182C69.8381 49.0259 68.6935 49.5 67.5 49.5C66.3065 49.5 67.1619 49.0259 64.318 48.182C63.4741 47.3381 63 46.1935 63 45V40.5Z" />
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
    if (jurusanId === 7) {
      setJurusanId(1);
    } else {
      setJurusanId(jurusanId + 1);
    }
  };

  const handleJurusanInc = () => {
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

        <div className="container w-4/5 flex flex-col gap-4 mx-auto relative z-10 pt-32">
          <div
            className="rounded-tl-full rounded-tr-full rounded-br-full rounded-bl-none w-7/8 md:w-5/8
            lg:w-3/8 bg-secondary/20 backdrop-blur-3xl text-white px-4 md:px-8 py-1 border
            border-white/20 shadow-lg shadow-black/20"
          >
            Selamat datang di SMK Negeri 26 Jakarta
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold text-white mt-4">
            Belajar, <br />
            Bekerja, <br />
            Membangun
          </h1>

          {/* Banner Card Statistik */}
          <div
            className="mt-8 bg-linear-to-b w-4/5 from-tertiary to-[#99341F] text-white 
        rounded-3xl py-6 px-10 shadow-2xl flex flex-col lg:flex-row 
        items-start lg:items-center justify-between gap-3 border border-orange-400/30"
          >
            {deskripsi.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                  <div className="text-white shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      {item.qty}
                    </h3>
                    <p className="text-sm font-medium text-orange-100">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Sambutan */}
      <section className="w-full min-h-screen bg-white py-20">
        <div
          className="container lg:w-4/5 w-full mx-auto flex flex-col 
        md:flex-row gap-2 items-center justify-center"
        >
          <div className="w-3/5 lg:w-1/2">
            <img
              src={kepsek}
              alt="Kepala Sekolah"
              className="w-full lg:w-4/5 h-auto"
            />
          </div>

          <div className="w-4/5 lg:w-1/2 flex flex-col ">
            <div className=" flex flex-row h-16 gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M32 0H8C3.57333 0 0 3.57333 0 8V21.3333C0 25.76 3.57333 29.3333 8 29.3333V40L18.6667 29.3333H32C36.4267 29.3333 40 25.76 40 21.3333V8C40 3.57333 36.4267 0 32 0Z"
                  fill="#1E1E1E"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-gray-500 text-lg font-bold">
                Sambutan Kepala Sekolah{" "}
              </p>
            </div>
            <div
              className="w-full text-start indent-4 lg:text-justify md:border-none  lg:border-l-2 
            border-tertiary text-2xl pl-4"
            >
              <p>
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
        className="w-full min-h-135 bg-yellow-400 rounded-t-[7em] py-15"
        style={{
          background: `color-mix(in srgb, ${activeJurusan.color} 30%, transparent)`,
        }}
      >
        <div
          className="container relative w-2/10 opacity-70 mx-auto flex flex-col bg-white/50 border border-white
  rounded-full py-2 px-2 shadow-2xl items-center justify-center bottom-6"
        >
          <h1 className="text-[21px] font-bold text-center font-poppins text-black">
            • Program Keahlian •
          </h1>
        </div>

        {/* Judul + Deskripsi */}
        <div className="container relative w-full mx-auto flex flex-col items-center justify-center mt-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={jurusanId}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute z-99 bottom-2 w-full flex flex-col items-center"
            >
              <h1 className="font-poppins text-3xl font-bold text-black text-center">
                {activeJurusan.nama}
              </h1>
              <p className="mt-6 text-md font-poppins font-semibold text-center text-black w-3/5">
                {activeJurusan.deskripsi}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative w-2/3 flex flex-col mx-auto top-55 items-center justify-center">
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

          {/* Detail box */}
          <div className="absolute z-10 w-3/4 h-17 top-15 mx-auto rounded-[34px] backdrop-blur-xl shadow-2xl bg-white"></div>
          <div className="absolute top-19 z-100 w-2/3 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={jurusanId}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-3 w-full text-black"
              >
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

          <div className="indicator absolute top-30 flex flex-row gap-2">
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDot(index + 1)}
                  className={`indicator-item indicator-center transition-all duration-300
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
