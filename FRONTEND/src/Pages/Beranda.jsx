import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tu from "./../assets/hero-bg.webp";
import heroVideo from "./../assets/hero_1080p30.webm";
import kepsek from "./../assets/kepsek.webp";
import RowKanan from "./../assets/rowKananHitam.svg?react";
import RowKiri from "./../assets/rowKiriHitam.svg?react";
import logoPLN from "./../assets/logopln.webp";
import logoAdw from "./../assets/mitraKerja/SIJA/adwSIJA.png";
import logoSolu from "./../assets/mitraKerja/SIJA/solu.png";
import logoLumosive from "./../assets/mitraKerja/SIJA/lumosive.png";
import logoBmw from "./../assets/mitraKerja/Otomotif/bmw.png";
import logoArtha from "./../assets/mitraKerja/KGS/arthaKarya.png";
import logoArvitech from "./../assets/mitraKerja/KGS/arvitech.png";
import logoBahariJaya from "./../assets/mitraKerja/KGS/bahariJaya.png";
import logoDwiTunggalKarunia from "./../assets/mitraKerja/KGS/dwitunggalKarunia.png";
import logoGaharuKonstruksindo from "./../assets/mitraKerja/KGS/gaharuKonstruksindo.png";
import logoGarudaIntiKarya from "./../assets/mitraKerja/KGS/garudaIntiKarya.png";
import logoKaryaBaruPerdana from "./../assets/mitraKerja/KGS/karyaBaruPerdana.png";
import logoPanasonic from "./../assets/mitraKerja/TEK/panasonic.png";
import logoKomatsu from "./../assets/mitraKerja/TFLM/komatsu.png";
import logoMercendes from "./../assets/mitraKerja/TFLM/mercendes.png";
import logoSiemens from "./../assets/mitraKerja/TFLM/siemens.png";
import logoSkf from "./../assets/mitraKerja/TFLM/skf.png";
import logoDamaiPutraGroup from "./../assets/mitraKerja/KGS/damaiPutraGroup.png";
import logoPlazaToyota from "./../assets/mitraKerja/Otomotif/plazaToyota.png";
import logoMacnesia from "./../assets/mitraKerja/TEK/macnesia.png";
import modelBangunan from "./../assets/modelJurusan/kgs.png";
import modelElektro from "./../assets/modelJurusan/tek.png";
import modelListrik from "./../assets/modelJurusan/titl.webp";
import modelMesin from "./../assets/modelJurusan/tflm.png";
import modelTkr from "./../assets/modelJurusan/tkr.png";
import modelSija from "./../assets/modelJurusan/sija.png";
import modelTbkr from "./../assets/modelJurusan/tbkr.png";
import briefcase from "./../assets/briefcase.svg?react";
import { Link } from "react-router-dom";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../components/ScrollReveal";

const Beranda = () => {
  const [jurusanId, setJurusanId] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);

  const faqData = [
    {
      id: 1,
      question: "Apa saja jurusan yang tersedia di SMKN 26 Jakarta?",
      answer:
        "SMKN 26 Jakarta memiliki berbagai kompetensi keahlian unggulan di bidang teknik industri seperti Konstruksi Gedung dan Sanitasi (KGS), Teknik Elektronika (TEK), Teknik Ketenagalistrikan (TITL), Teknik Fabrikasi Logam & Manufaktur (TFLM), dan Teknik Kendaraan Ringan (TKR).",
    },
    {
      id: 2,
      question: "Di mana lokasi SMKN 26 Jakarta?",
      answer:
        "SMKN 26 Jakarta berlokasi di Jl. Balai Pustaka Baru I No.2, RT.2/RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta"
    },
    {
      id: 3,
      question: "Bagaimana proses pendaftaran PPDB di SMKN 26 Jakarta?",
      answer:
        "Pendaftaran dilakukan melalui portal resmi SPMB/PPDB DKI Jakarta sesuai jalur dan jadwal yang telah ditetapkan."
    },
    {
      id: 4,
      question: "Apakah SMKN 26 Jakarta memiliki program PKL?",
      answer:
        "Ya, seluruh siswa mengikuti Praktik Kerja Lapangan (PKL) di perusahaan mitra sesuai kompetensi keahliannya."
    },
    {
      id: 5,
      question: "Apakah lulusan SMKN 26 Jakarta memiliki peluang kerja?",
      answer:
        "Ya, sekolah memiliki Bursa Kerja Khusus (BKK) yang membantu penyaluran informasi lowongan, rekrutmen, dan kemitraan dengan dunia industri."
    },
    {
      id: 6,
      question: "Fasilitas apa saja yang tersedia di SMKN 26 Jakarta?",
      answer:
        "Sekolah menyediakan laboratorium praktik, bengkel sesuai jurusan, ruang komputer, perpustakaan, serta fasilitas penunjang kegiatan belajar."
    }
  ];

  const [activeKategori, setActiveKategori] = useState("Semua");

  const handleFaqWheel = (e) => {
    const el = e.currentTarget;
    if (!el) return;

    const isDown = e.deltaY > 0;
    const maxScroll = el.scrollHeight - el.clientHeight;

    // Jika konten FAQ muat (tidak perlu scroll FAQ), langsung teruskan scroll ke web
    if (maxScroll <= 2) {
      if (window.__lenis) {
        window.__lenis.scrollTo(
          (window.__lenis.targetScroll ?? window.__lenis.scroll) + e.deltaY,
          {
            programmatic: false,
            duration: window.__lenis.options?.duration,
            easing: window.__lenis.options?.easing,
            lerp: window.__lenis.options?.lerp,
          }
        );
      } else {
        window.scrollBy(0, e.deltaY);
      }
      return;
    }

    const atBottom = el.scrollTop >= maxScroll - 2;
    const atTop = el.scrollTop <= 2;

    // Jika scroll ke bawah dan sudah mentok bawah, atau scroll ke atas dan sudah mentok atas:
    if ((isDown && atBottom) || (!isDown && atTop)) {
      if (window.__lenis) {
        window.__lenis.scrollTo(
          (window.__lenis.targetScroll ?? window.__lenis.scroll) + e.deltaY,
          {
            programmatic: false,
            duration: window.__lenis.options?.duration,
            easing: window.__lenis.options?.easing,
            lerp: window.__lenis.options?.lerp,
          }
        );
      } else {
        window.scrollBy(0, e.deltaY);
      }
    }
    // Jika belum mentok, biarkan browser men-scroll isi FAQ secara native dan mulus
  };

  const kategoriList = [
    "Semua",
    "Kegiatan Sekolah",
    "Prestasi",
    "Akademik",
    "Kompetisi",
    "Kerja Sama & Industri",
  ];

  const beritaData = [
    {
      id: 1,
      kategori: "PRESTASI",
      filterKategori: "Prestasi",
      tanggal: "02 Agustus 2026",
      judul: "Juara 2 LKS Tingkat Nasional Bidang Lomba Electronics",
      gambar: null,
    },
    {
      id: 2,
      kategori: "PROGRAM",
      filterKategori: "Kegiatan Sekolah",
      tanggal: "08 Agustus 2026",
      judul: "Pembukaan Kesemaptaan Angkatan ke-5!",
      gambar: null,
    },
    {
      id: 3,
      kategori: "AKADEMIK",
      filterKategori: "Akademik",
      tanggal: "15 Agustus 2026",
      judul: "Pelaksanaan Asesmen Bakat Minat dan Ujian Sertifikasi Kompetensi Siswa",
      gambar: null,
    },
    {
      id: 4,
      kategori: "KOMPETISI",
      filterKategori: "Kompetisi",
      tanggal: "21 Agustus 2026",
      judul: "Tim Robotik SMKN 26 Jakarta Raih Medali Emas di Ajang Nasional",
      gambar: null,
    },
    {
      id: 5,
      kategori: "KERJA SAMA",
      filterKategori: "Kerja Sama & Industri",
      tanggal: "28 Agustus 2026",
      judul: "Kunjungan Guru Tamu dan Rekrutmen Kerja Bersama Mitra Industri",
      gambar: null,
    },
  ];

  const filteredBerita =
    activeKategori === "Semua"
      ? beritaData.slice(0, 3)
      : beritaData.filter((item) => item.filterKategori === activeKategori).slice(0, 3);

  useEffect(() => {
    console.log(filteredBerita)
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
      nama: "ADW",
      logo: logoAdw,
    },
    {
      id: 2,
      nama: "lumosive",
      logo: logoLumosive,
    },
    {
      id: 3,
      nama: "solu",
      logo: logoSolu,
    },
    {
      id: 4,
      nama: "PLN",
      logo: logoPLN,
    },
    {
      id: 5,
      nama: "arthaKarya",
      logo: logoArtha,
    },
    {
      id: 6,
      nama: "arvitech",
      logo: logoArvitech,
    },
    {
      id: 7,
      nama: "bahariJaya",
      logo: logoBahariJaya,
    },
    {
      id: 8,
      nama: "damaiPutraGroup",
      logo: logoDamaiPutraGroup,
    },
    {
      id: 9,
      nama: "dwitunggalKarunia",
      logo: logoDwiTunggalKarunia,
    },
    {
      id: 10,
      nama: "gaharuKonstruksindo",
      logo: logoGaharuKonstruksindo,
    },
    {
      id: 11,
      nama: "garudaIntiKarya",
      logo: logoGarudaIntiKarya,
    },
    {
      id: 12,
      nama: "karyaBaruPerdana",
      logo: logoKaryaBaruPerdana,
    },
    {
      id: 13,
      nama: "bmw",
      logo: logoBmw,
    },
    {
      id: 14,
      nama: "plazaToyota",
      logo: logoPlazaToyota,
    },
    {
      id: 15,
      nama: "macnesia",
      logo: logoMacnesia,
    },
    {
      id: 16,
      nama: "panasonic",
      logo: logoPanasonic,
    },
    {
      id: 17,
      nama: "komatsu",
      logo: logoKomatsu,
    },
    {
      id: 18,
      nama: "mercendes",
      logo: logoMercendes,
    },
    {
      id: 19,
      nama: "siemens",
      logo: logoSiemens,
    },
    {
      id: 20,
      nama: "skf",
      logo: logoSkf,
    }
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
      color: "#FFE500",
      backgroundIconColor: "#FFDD004D",
      iconColor: "#FFE500",
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
      color: "#999797",
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
      img: modelTbkr,
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
      img: modelSija,
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
          className="w-12 h-12 text-tertibg-tertiary"
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
          className="w-12 h-12 text-tertibg-tertiary"
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
          className="w-12 h-12 text-tertibg-tertiary"
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

        <div className="container w-[90%] sm:w-4/5 flex flex-col gap-3 mx-auto relative z-10 pt-24 sm:pt-28 md:pt-32">
          {/* Welcome Tag Pill */}
          <div
            className="rounded-2xl w-fit bg-[#0c2f5e]/80 backdrop-blur-md text-white px-4 sm:px-6 md:px-8 py-2 font-semibold text-xs sm:text-sm md:text-base tracking-wide border border-blue-400/20 shadow-md"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Selamat datang di SMK Negeri 26 Jakarta
          </div>

          {/* Heading - BELAJAR, BEKERJA, MEMBANGUN */}
          <ScrollReveal direction="up" delay={0.05} duration={0.6}>
            <h1
              className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[70px] xl:text-[80px] uppercase font-extrabold mt-2 leading-[0.95] sm:leading-[0.92] tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
            >
              <span className="text-white">BELAJAR,</span> <br />
              <span className="text-secondary ">BEKERJA,</span> <br />
              <span className="text-tertiary">MEMBANGUN</span>
            </h1>
          </ScrollReveal>

          {/* Banner Card Statistik: Di Laptop/Desktop tetap 1 banner card orisinal, di HP menjadi beberapa badge putih terpisah */}
          <ScrollReveal direction="up" delay={0.12} duration={0.6}>
            <div
              className="mt-6 sm:mt-8 md:mt-10 w-full lg:w-[90%] max-w-5xl flex flex-col md:flex-row gap-2.5 sm:gap-3 md:gap-0
                md:bg-white md:rounded-[36px] md:py-5 md:px-10 md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:items-center md:justify-between"
            >
              {deskripsi.map((item, index) => (
                <React.Fragment key={item.id}>
                  {/* Di HP: badge putih terpisah dengan padding rapi dan shadow. Di desktop: tampilan flat di dalam container */}
                  <div className="flex items-center gap-3.5 sm:gap-4 flex-1 justify-start md:justify-center w-full bg-white md:bg-transparent rounded-2xl md:rounded-none py-3 px-4 md:p-0 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:shadow-none border border-slate-100/80 md:border-none">
                    <div className="shrink-0 text-tertiary scale-90 sm:scale-100">{item.icon}</div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-black font-poppins"
                        style={{ fontWeight: 600 }}
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
                    <div className="hidden md:block w-0.5 h-12 bg-tertiary mx-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sambutan */}
      <section className="w-full min-h-screen bg-white py-14 sm:py-20 flex items-center">
        <div
          className="container lg:w-4/5 w-[90%] mx-auto flex flex-col 
        md:flex-row gap-8 lg:gap-12 items-center justify-center"
        >
          <ScrollReveal direction="up" delay={0.05} duration={0.55} className="w-4/5 sm:w-3/5 lg:w-1/2 flex justify-center">
            <img
              src={kepsek}
              alt="Kepala Sekolah"
              className="w-full max-w-[320px] md:max-w-none lg:w-4/5 h-auto object-contain"
            />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.12} duration={0.55} className="w-full md:w-4/5 lg:w-1/2 flex flex-col gap-4">
            <div className="flex flex-row items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 40 40"
                fill="none"
                className="shrink-0"
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

            <div className="w-full flex flex-row gap-4 sm:gap-5 items-stretch pl-1 mt-2">
              <div className="w-[3.5px] bg-tertiary rounded-full shrink-0" />
              <p
                className="text-black/70 text-sm sm:text-base md:text-md lg:text-xl text-justify sm:text-left italic font-normal leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-xl sm:text-2xl lg:text-3xl font-serif">"</span>
                Selamat datang di website resmi SMK Negeri 26 Jakarta. Website
                ini menjadi sarana informasi, komunikasi, dan layanan digital
                bagi seluruh warga sekolah serta masyarakat. Semoga kehadiran
                website ini dapat memberikan informasi yang mudah diakses,
                meningkatkan pelayanan, dan mendukung terciptanya pendidikan
                yang berkualitas, inovatif, serta berdaya saing. Terima kasih
                atas kunjungan Anda.
                <span className="text-xl sm:text-2xl lg:text-3xl font-serif">"</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Program keahlian */}
      <div className="flex flex-col justify-center">
        <ScrollReveal direction="up" duration={0.5}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black tracking-wide text-center text-tertiary pb-6 sm:pb-10 pt-2 px-4">
            PROGRAM <span className='text-secondary'>KEAHLIAN</span>
          </h1>
        </ScrollReveal>

        {/* ─── DESKTOP VERSION (100% ORIGINAL & UNCHANGED) ─── */}
        <div className="hidden lg:block">
          <section
            className="w-full min-h-155 rounded-t-[7em] py-24 transition-colors duration-500"
            style={{
              background: `color-mix(in srgb, ${activeJurusan.color} 20%, transparent)`,
            }}
          >
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
                  <h1
                    style={{ color: activeJurusan.color }}
                    className=" text-5xl font-black font-montserrat mb-2 text-center px-4"
                  >
                    {activeJurusan.nama}
                  </h1>
                  <p className="text-md font-poppins font-semibold text-center text-black/50 w-3/5 px-4">
                    {activeJurusan.deskripsi}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative w-2/3 flex flex-col mx-auto top-70 items-center justify-center">
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
                      className={`absolute z-10 object-contain ${jurusanId === 1
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
                <Link
                  to="/program/jurusan"
                  style={{ color: activeJurusan.color }}
                  className="absolute w-1/4 z-99 flex flex-col bg-white
                  rounded-full p-2 shadow-2xl items-center justify-center
                  top-6 text-center font-montserrat font-semibold hover:shadow-lg transition-all"
                >
                  Pelajari Selengkapnya
                </Link>
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

            <div className="relative w-full h-full flex items-center justify-center top-80">
              <button
                onClick={() => handleJurusanInc()}
                className="absolute text-black left-30 z-10 w-10 h-10 bottom-18 bg-white/50 rounded-full border-white border flex items-center justify-center cursor-pointer hover:bg-white transition-all"
                aria-label="Jurusan sebelumnya"
              >
                <RowKiri
                  style={{ color: activeJurusan.iconColor }}
                  className="h-6 pr-0.5"
                />
              </button>
              <button
                onClick={() => handleJurusanDec()}
                className="absolute text-black right-30 z-10 w-10 h-10 bottom-18 bg-white/50 rounded-full border-white border flex items-center justify-center cursor-pointer hover:bg-white transition-all"
                aria-label="Jurusan berikutnya"
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
        </div>

        {/* ─── MOBILE / TABLET RESPONSIVE VERSION (< lg) ─── */}
        <div className="block lg:hidden px-4 sm:px-8 pb-12">
          <div
            className="w-full h-[500px] rounded-3xl p-5 sm:p-7 transition-colors duration-500 shadow-lg border border-slate-100 flex flex-col justify-between items-center overflow-hidden"
            style={{
              background: `color-mix(in srgb, ${activeJurusan.color} 12%, #f8fafc)`,
            }}
          >
            {/* Quick Major Selector Pills */}
            {/* <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {jurusanData.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => setJurusanId(j.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold font-montserrat shrink-0 transition-all cursor-pointer ${
                    j.id === jurusanId
                      ? "text-white shadow-sm scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white"
                  }`}
                  style={j.id === jurusanId ? { backgroundColor: j.color } : {}}
                >
                  {j.singkatan}
                </button>
              ))}
            </div> */}

            {/* Title (No Description) */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={jurusanId}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center text-center"
              >
                <h2
                  style={{ color: activeJurusan.color }}
                  className="text-xl sm:text-2xl font-black font-montserrat leading-tight"
                >
                  {activeJurusan.nama}
                </h2>

                <p className="text-xs font-poppins font-semibold mt-2 text-center text-black/50 px-4">
                  {activeJurusan.deskripsi}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Model Image with button covering the bottom */}
            <div className="relative flex flex-col items-center justify-end w-full flex-1 min-h-0 my-1">
              <div className="relative flex justify-center items-end h-[260px] sm:h-[280px] w-full">
                {activeJurusan.img && (
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
                      transition={{ duration: 0.3 }}
                      className="h-[260px] sm:h-[280px] max-w-full object-contain filter drop-shadow-md select-none pointer-events-none"
                    />
                  </AnimatePresence>
                )}

                {/* Button covering the cut-off bottom of student model */}
                <Link
                  to="/program/jurusan"
                  style={{ color: activeJurusan.color }}
                  className="absolute -bottom-2 z-20 inline-flex items-center gap-1.5 bg-white font-montserrat font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg hover:brightness-95 active:scale-95 transition-all border-2 border-white"
                >
                  <span>Pelajari Selengkapnya</span>
                  <span>&gt;</span>
                </Link>
              </div>
            </div>

            {/* Bottom Controls: Prev / Next & Indicators */}
            <div className="flex items-center justify-between w-full max-w-xs pt-3 border-t border-slate-200/60">
              <button
                type="button"
                onClick={handleJurusanInc}
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer"
                aria-label="Jurusan sebelumnya"
              >
                <RowKiri style={{ color: activeJurusan.iconColor }} className="h-4.5 pr-0.5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array(7)
                  .fill(0)
                  .map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDot(index + 1)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${index + 1 === jurusanId ? "w-4.5" : "w-2 bg-gray-300"
                        }`}
                      style={index + 1 === jurusanId ? { backgroundColor: activeJurusan.color } : {}}
                      aria-label={`Ke jurusan ${index + 1}`}
                    />
                  ))}
              </div>

              <button
                type="button"
                onClick={handleJurusanDec}
                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 cursor-pointer"
                aria-label="Jurusan berikutnya"
              >
                <RowKanan style={{ color: activeJurusan.iconColor }} className="h-4.5 pl-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Hubungan Industri */}
      <section className="w-full min-h-[60vh] lg:min-h-screen bg-white py-14 sm:py-20">
        <div className="w-full mx-auto flex flex-col gap-4 justify-center items-center">
          <ScrollReveal direction="up" duration={0.5}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black tracking-wide text-center text-tertiary pb-1 pt-2 px-4">
              HUBUNGAN <span className='text-secondary uppercase'>Industri</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1} duration={0.55} className="w-full">
            <div className="h-60 sm:h-80 w-full flex flex-row items-center">
              <div className="hidden md:flex pl-4 w-1/3 h-46 border-t-[1.75px] border-r-[1.75px] border-b-[1.75px] px-4  flex-col items-center justify-center border-[#0037B080]/30">
                <p className="text-black font-montserrat text-base lg:text-lg leading-5 text-justify">
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
                        className="flex items-center justify-center w-40 sm:w-50 h-36 sm:h-46 shrink-0 border-t-[1.75px] border-b-[1.75px] border-l border-r border-[#0037B080]/80 px-4"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.nama}
                          className="max-h-24 sm:max-h-30 max-w-32 sm:max-w-40 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15} duration={0.5}>
            <Link to="/tentang-kami/hubungan-industri">
              <button className="bg-secondary text-base sm:text-xl text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-blue-600 active:scale-95 transition-all cursor-pointer shadow-md">
                Lihat Selengkapnya
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full min-h-[70vh] lg:min-h-screen bg-linear-to-b from-side to-white py-14 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10 flex items-center justify-center">
        <div className="w-full max-w-310 bg-white rounded-3xl md:rounded-[40px] p-6 sm:p-10 md:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Sisi Kiri: Badge & Judul */}
            <ScrollReveal direction="up" duration={0.5} className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="bg-tertiary text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-t-full rounded-br-full mb-4 sm:mb-5 shadow-sm inline-block">
                Pertanyaan Umum
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-primary leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-5 tracking-tight font-montserrat">
                Yang Ingin <br />
                <span className="text-secondary">Anda Ketahui</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                Temukan jawaban singkat seputar SMKN 26 Jakarta, program, dan informasi sekolah.
              </p>
            </ScrollReveal>

            {/* Sisi Kanan: List Accordion FAQ dengan Custom Scrollbar */}
            <ScrollReveal direction="up" delay={0.1} duration={0.55} className="lg:col-span-7">
              <div
                data-lenis-prevent
                onWheel={handleFaqWheel}
                className="max-h-105 md:max-h-112.5 overflow-y-auto pr-2 sm:pr-3 md:pr-4 space-y-3 sm:space-y-3.5 md:space-y-4 faq-scrollbar overscroll-auto"
              >
                {faqData.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={item.id || index}
                      className="w-full rounded-2xl md:rounded-[22px] overflow-hidden transition-all duration-200 shadow-sm border border-slate-100"
                    >
                      {/* Tombol Pertanyaan */}
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className={`w-full bg-tertiary text-white px-4 sm:px-7 py-3.5 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left transition-all cursor-pointer ${isOpen
                          ? "rounded-t-2xl md:rounded-t-[22px]"
                          : "rounded-2xl md:rounded-[22px]"
                          }`}
                      >
                        <span className="font-semibold text-sm sm:text-base md:text-lg leading-snug flex-1">
                          {item.question}
                        </span>
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                          <svg
                            className={`w-3.5 h-3.5 sm:w-5 sm:h-5 text-tertiary transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </button>

                      {/* Konten Jawaban */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.04, 0.62, 0.23, 0.98],
                            }}
                            className="overflow-hidden bg-side-back rounded-b-2xl md:rounded-b-[22px]"
                          >
                            <div className="px-4 sm:px-7 py-4 sm:py-6 text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Berita Terkini */}
      <section className="w-full bg-linear-to-b from-side-back/35 via-white to-white py-14 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Judul Section */}
          <ScrollReveal direction="up" duration={0.5} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-montserrat font-black tracking-wide">
              <span className="text-tertiary">BERITA</span>{" "}
              <span className="text-secondary">TERKINI</span>
            </h1>
          </ScrollReveal>

          {/* Konten 2 Kolom: Kategori & List Berita */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Sidebar Kategori */}
            <ScrollReveal direction="up" delay={0.05} duration={0.5} className="lg:col-span-3 flex flex-col items-start w-full">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                Kategori Berita
              </h3>

              {/* Category Pills (horizontal scroll on mobile, vertical list on desktop) */}
              <div className="flex flex-row overflow-x-auto pb-2 scrollbar-none gap-2 w-full lg:flex-col lg:space-y-3.5 lg:overflow-visible">
                {kategoriList.map((kategori) => {
                  const isActive = activeKategori === kategori;
                  return (
                    <button
                      key={kategori}
                      type="button"
                      onClick={() => setActiveKategori(kategori)}
                      className={`text-left text-xs sm:text-[15px] sm:text-base font-medium transition-all cursor-pointer shrink-0 rounded-full lg:rounded-none px-3.5 py-1.5 lg:p-0 ${isActive
                        ? "text-secondary font-semibold bg-blue-50 lg:bg-transparent"
                        : "text-slate-600 hover:text-secondary bg-slate-100 lg:bg-transparent"
                        }`}
                    >
                      {kategori}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 sm:mt-8">
                <Link to="/informasi/berita">
                  <button
                    type="button"
                    className="border border-secondary text-secondary px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-secondary hover:text-white active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer group shadow-xs"
                  >
                    Lihat Semua Berita{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* List Berita (Fixed ml-0 on mobile, lg:ml-12 on desktop!) */}
            <ScrollStagger className="ml-0 lg:ml-12 lg:col-span-9 flex flex-col space-y-6 sm:space-y-8 w-full" staggerDelay={0.08}>
              {filteredBerita.length > 0 ? (
                filteredBerita.map((item) => (
                  <ScrollStaggerItem
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 items-start group bg-white/60 p-3 sm:p-0 rounded-2xl sm:rounded-none border border-slate-100 sm:border-none shadow-xs sm:shadow-none"
                  >
                    {/* Thumbnail Berita */}
                    <div className="w-full sm:w-72 md:w-80 lg:w-[320px] h-44 sm:h-50 md:h-48.75 shrink-0 rounded-xl sm:rounded-[22px] md:rounded-3xl overflow-hidden bg-[#d9d9d9] shadow-sm">
                      {item.gambar ? (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#d9d9d9]" />
                      )}
                    </div>

                    {/* Deskripsi & Tombol Baca */}
                    <div className="flex flex-col justify-center flex-1 py-1 w-full">
                      <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-3.5 mb-2 sm:mb-2.5">
                        <span className="bg-tertiary text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full uppercase tracking-wider">
                          {item.kategori}
                        </span>
                        <span className="text-slate-500 text-xs sm:text-sm font-medium ml-auto sm:ml-8">
                          {item.tanggal}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-slate-900 leading-snug group-hover:text-secondary transition-colors mb-3 sm:mb-4">
                        {item.judul}
                      </h3>

                      <div>
                        <Link to="/informasi/berita">
                          <button
                            type="button"
                            className="border border-secondary text-secondary px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-secondary hover:text-white active:scale-95 transition-all inline-flex items-center gap-1 cursor-pointer group/btn"
                          >
                            Baca Selengkapnya{" "}
                            <span className="transition-transform group-hover/btn:translate-x-1">
                              →
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </ScrollStaggerItem>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  Tidak ada berita di kategori ini.
                </div>
              )}
            </ScrollStagger>
          </div>
        </div>
      </section>
    </>
  );
};

export default Beranda;
