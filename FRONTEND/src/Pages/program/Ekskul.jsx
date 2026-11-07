import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../../components/ScrollReveal";
import {
  IoSearch,
  IoClose,
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTrophyOutline,
  IoChevronForward,
  IoCheckmarkCircleOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import {
  Cpu,
  Shield,
  Award,
  HeartPulse,
  Activity,
  Music,
  Palette,
  BookOpen,
  Compass,
  Code,
  Flame,
  Globe,
} from "lucide-react";

// const ekskulData = [
//   {
//     id: 1,
//     nama: "Robotik & IoT Club",
//     kategori: "IPTEK & Kejuruan",
//     singkatan: "DUNEM-ROBOTIC",
//     tagline: "Inovasi Otomasi & Kontrol Cerdas Masa Depan",
//     deskripsi:
//       "Wadah pengembangan riset teknologi robotika, mikrokontroler (Arduino, ESP32, STM32), otomatisasi industri, dan Internet of Things (IoT). Rutin menjuarai kompetisi tingkat nasional.",
//     jadwal: "Rabu & Sabtu, 15.30 - 17.30 WIB",
//     lokasi: "Laboratorium Elektronika & Robotik",
//     pembina: "Drs. Eko Prasetyo, M.T.",
//     ketua: "Muhammad Rizky Pratama (XI TEK)",
//     prestasi: [
//       "Juara 1 Lomba Robotika Nasional 2025",
//       "Medali Emas LKS Wilayah DKI Jakarta",
//       "Best Innovation Award IoT Expo",
//     ],
//     syarat: "Siswa aktif SMKN 26, memiliki ketertarikan pada elektronika & coding.",
//     color: "from-blue-600 to-cyan-500",
//     icon: Cpu,
//   },
//   {
//     id: 2,
//     nama: "Kopas 26 (Paskibra)",
//     kategori: "Bela Negara",
//     singkatan: "KOPAS 26",
//     tagline: "Disiplin, Tangguh, dan Berjiwa Patriot",
//     deskripsi:
//       "Korps Pasukan Pengibar Bendera SMKN 26 Jakarta yang melatih ketangkasan baris berbaris (PBB), formasi variasi, kepemimpinan, dan etika kedisiplinan tinggi.",
//     jadwal: "Selasa & Jumat, 15.30 - 17.30 WIB",
//     lokasi: "Lapangan Utama SMKN 26",
//     pembina: "Bambang Sudibyo, S.Pd.",
//     ketua: "Fajar Anugrah (XI KGS)",
//     prestasi: [
//       "Juara Umum LPBB Tingkat Provinsi DKI 2024",
//       "Danton Terbaik Se-Jabodetabek 2025",
//       "Pengibar Bendera Tingkat Kota Jakarta Timur",
//     ],
//     syarat: "Fisik sehat, tinggi badan proporsional, berkomitmen tinggi.",
//     color: "from-red-600 to-rose-500",
//     icon: Shield,
//   },
//   {
//     id: 3,
//     nama: "Pramuka Gudep 26",
//     kategori: "Bela Negara",
//     singkatan: "PRAMUKA 26",
//     tagline: "Satyaku Kudharmakan, Dharmaku Kubaktikan",
//     deskripsi:
//       "Gerakan Kepanduan yang membentuk karakter mandiri, survival skills, pionering, tali-temali, penjelajahan alam bebas, serta bakti sosial kemasyarakatan.",
//     jadwal: "Kamis, 15.30 - 17.30 WIB",
//     lokasi: "Ruang Pramuka & Area Terbuka",
//     pembina: "Sri Handayani, M.Pd.",
//     ketua: "Aditya Wardhana (XI TITL)",
//     prestasi: [
//       "Regu Terbaik Raimuna Cabang Jakarta Timur",
//       "Juara 1 Lomba Pionering Konstruksi SMK",
//       "Gudep Teraktif Tingkat Wilayah 2024",
//     ],
//     syarat: "Siap mengikuti kegiatan penjelajahan dan pelatihan karakter.",
//     color: "from-amber-600 to-orange-500",
//     icon: Compass,
//   },
//   {
//     id: 4,
//     nama: "PMR Wira 26",
//     kategori: "Bela Negara",
//     singkatan: "PMR WIRA",
//     tagline: "Siamo Tutti Fratelli - Kita Semua Bersaudara",
//     deskripsi:
//       "Palang Merah Remaja unit Wira yang memfokuskan pembinaan pada pertolongan pertama, penanganan cedera medis darurat, kesiapsiagaan bencana, dan donor darah.",
//     jadwal: "Senin & Rabu, 15.30 - 17.00 WIB",
//     lokasi: "Ruang UKS & Lapangan SMKN 26",
//     pembina: "Nurul Hidayati, S.Kep.",
//     ketua: "Alya Putri Ramadhani (XI SIJA)",
//     prestasi: [
//       "Juara 1 Pertolongan Pertama Tingkat Kota",
//       "Relawan Muda Berprestasi PMI Jakarta",
//       "Penyelenggara Donor Darah Sukarela Terbanyak",
//     ],
//     syarat: "Memiliki jiwa kemanusiaan, empati tinggi, dan ketelitian.",
//     color: "from-rose-600 to-red-500",
//     icon: HeartPulse,
//   },
//   {
//     id: 5,
//     nama: "Dunem Futsal Club",
//     kategori: "Olahraga",
//     singkatan: "DFC 26",
//     tagline: "Sportivitas, Kecepatan, dan Kekompakan Tim",
//     deskripsi:
//       "Klub futsal kebanggaan sekolah dengan pembinaan taktik modern, fisik prima, dan uji tanding berkala antar-sekolah menengah kejuruan se-Jabodetabek.",
//     jadwal: "Senin & Kamis, 16.00 - 18.00 WIB",
//     lokasi: "Lapangan Futsal SMKN 26",
//     pembina: "Rian Hendrawan, S.Pd.",
//     ketua: "Kevin Sanjaya (XI TFLM)",
//     prestasi: [
//       "Juara 1 Futsal Cup Pelajar DKI Jakarta 2025",
//       "Top Scorer Turnamen Antar SMK Se-Jabodetabek",
//       "Runner-up Liga Pelajar Indonesia",
//     ],
//     syarat: "Mampu bermain futsal, disiplin latihan fisik.",
//     color: "from-emerald-600 to-teal-500",
//     icon: Flame,
//   },
//   {
//     id: 6,
//     nama: "Dunem Basketball Team",
//     kategori: "Olahraga",
//     singkatan: "DBT 26",
//     tagline: "Play Hard, Play Smart, Play Together",
//     deskripsi:
//       "Ekstrakurikuler bola basket putra dan putri yang melatih fundamental shooting, defense, fast-break plays, dan partisipasi rutin di kompetisi DBL serta kejuruan.",
//     jadwal: "Rabu & Sabtu, 15.30 - 17.30 WIB",
//     lokasi: "Gelanggang Olahraga Remaja (GOR)",
//     pembina: "Hendra Gunawan, S.Or.",
//     ketua: "Raka Pratama (XI TKR)",
//     prestasi: [
//       "Semifinalis DBL Seri Jakarta Timur",
//       "Juara 2 Basketball Championship Pelajar 2024",
//       "Pemain MVP Invitasi Pelajar Jakarta",
//     ],
//     syarat: "Menyukai basket dan siap menjalani program conditioning.",
//     color: "from-orange-600 to-amber-500",
//     icon: Activity,
//   },
//   {
//     id: 7,
//     nama: "Cyber & Software Dev Club",
//     kategori: "IPTEK & Kejuruan",
//     singkatan: "CODE 26",
//     tagline: "Explore Code, Secure Systems, Build Impact",
//     deskripsi:
//       "Komunitas pemrograman web, mobile apps, basis data, dan cyber security / CTF. Mendukung persiapan lomba LKS IT Software dan Network Systems.",
//     jadwal: "Selasa & Jumat, 15.30 - 17.30 WIB",
//     lokasi: "Lab Komputer SIJA",
//     pembina: "Arif Kurniawan, S.Kom., M.T.",
//     ketua: "Naufal Hilmi (XI SIJA)",
//     prestasi: [
//       "Juara 1 Web Technologies LKS DKI Jakarta",
//       "Finalis Capture The Flag (CTF) Cyber Defense Nasional",
//       "Developer Website Komunitas Sekolah 2025",
//     ],
//     syarat: "Membawa laptop pribadi, paham dasar logika algoritma.",
//     color: "from-indigo-600 to-blue-500",
//     icon: Code,
//   },
//   {
//     id: 8,
//     nama: "Seni Musik & Band Sekolah",
//     kategori: "Seni & Budaya",
//     singkatan: "DUNEM BAND",
//     tagline: "Harmoni Melodi, Ekspresi Karya Tanpa Batas",
//     deskripsi:
//       "Wadah olah vokal, instrumen musik (gitar, bass, drum, keyboard), aransemen lagu, dan performa live dalam berbagai event perayaan serta festival musik pelajar.",
//     jadwal: "Jumat & Sabtu, 15.00 - 17.30 WIB",
//     lokasi: "Studio Musik SMKN 26",
//     pembina: "Dewi Anggraini, S.Sn.",
//     ketua: "Jonathan Calvin (XI TEK)",
//     prestasi: [
//       "Juara 1 Festival Band Pelajar Se-Jakarta",
//       "Best Vocalist & Best Drummer Sound of Youth 2025",
//       "Pengisi Musik Acara Resmi Dinas Pendidikan",
//     ],
//     syarat: "Dapat memainkan alat musik atau memiliki vokal yang terlatih.",
//     color: "from-purple-600 to-pink-500",
//     icon: Music,
//   },
//   {
//     id: 9,
//     nama: "Seni Tari & Kreasi Nusantara",
//     kategori: "Seni & Budaya",
//     singkatan: "TARI 26",
//     tagline: "Lestarikan Budaya Bangsa dengan Gerak Anggun",
//     deskripsi:
//       "Mempelajari ragam tari tradisional Betawi, Saman Aceh, Nusantara kontemporer, hingga modern dance untuk pementasan budaya dan kejuaraan seni kreasi.",
//     jadwal: "Rabu, 15.30 - 17.30 WIB",
//     lokasi: "Aula Serbaguna SMKN 26",
//     pembina: "Siti Rahmawati, S.Pd.",
//     ketua: "Zahra Anindya (X KGS)",
//     prestasi: [
//       "Juara 2 Festival Tari Tradisional FLS2N Jakarta",
//       "Penyaji Tari Betawi Terbaik Pekan Kebudayaan Pelajar",
//       "Tampil di Pembukaan Expo Vokasi Nasional",
//     ],
//     syarat: "Pria/Wanita yang berminat pada gerak tari dan olah tubuh.",
//     color: "from-fuchsia-600 to-rose-500",
//     icon: Palette,
//   },
//   {
//     id: 10,
//     nama: "English Club & Debate (EDC)",
//     kategori: "IPTEK & Kejuruan",
//     singkatan: "EDC 26",
//     tagline: "Speak with Confidence, Debate with Wisdom",
//     deskripsi:
//       "Klub bahasa Inggris fokus pada public speaking, parliamentary debate, storytelling, dan persiapan sertifikasi TOEIC yang sangat dibutuhkan di industri global.",
//     jadwal: "Kamis, 15.30 - 17.00 WIB",
//     lokasi: "Ruang Multimedia",
//     pembina: "Linda Marlina, M.Pd.",
//     ketua: "Clarissa Natalie (XI SIJA)",
//     prestasi: [
//       "1st Runner Up English Debate Competition Jabodetabek",
//       "Best Speaker Vokasi English Fest 2024",
//       "Rata-rata Skor TOEIC Anggota > 800",
//     ],
//     syarat: "Kemauan aktif berbicara dalam bahasa Inggris.",
//     color: "from-cyan-600 to-blue-500",
//     icon: Globe,
//   },
//   {
//     id: 11,
//     nama: "Rohis (Rohani Islam At-Tarbiyah)",
//     kategori: "Keagamaan",
//     singkatan: "ROHIS 26",
//     tagline: "Membina Akhlak Mulia, Menuju Pribadi Rabbani",
//     deskripsi:
//       "Organisasi kerohanian Islam yang menyelenggarakan kajian Al-Qur'an, tahsin, hadroh, pembinaan dai muda, serta kepanitiaan peringatan hari besar Islam (PHBI).",
//     jadwal: "Jumat, 13.00 - 15.00 WIB",
//     lokasi: "Masjid At-Tarbiyah SMKN 26",
//     pembina: "Ust. Ahmad Fauzi, S.Ag.",
//     ketua: "Ibrahim Maulana (XI TITL)",
//     prestasi: [
//       "Juara 1 Musabaqah Tilawatil Qur'an (MTQ) Pelajar",
//       "Grup Hadroh Terbaik Festival Maulid Pelajar",
//       "Penyelenggara Pesantren Kilat Ramadhan Terpadu",
//     ],
//     syarat: "Terbuka untuk seluruh siswa muslim SMKN 26.",
//     color: "from-green-600 to-emerald-500",
//     icon: BookOpen,
//   },
//   {
//     id: 12,
//     nama: "Rokris (Rohani Kristen 26)",
//     kategori: "Keagamaan",
//     singkatan: "ROKRIS 26",
//     tagline: "Bertumbuh dalam Kasih, Terang bagi Sesama",
//     deskripsi:
//       "Persekutuan doa siswa Kristen dan Katolik dengan kegiatan pendalaman alkitab, vocal group rohani, bakti sosial, dan perayaan ibadah Natal serta Paskah bersama.",
//     jadwal: "Jumat, 13.00 - 14.30 WIB",
//     lokasi: "Ruang Pembinaan Rohani Kristen",
//     pembina: "Dra. Ester Simanjuntak",
//     ketua: "Samuel Timothy (XI TKR)",
//     prestasi: [
//       "Penyaji Paduan Suara Rohani Terbaik Tingkat Wilayah",
//       "Bakti Sosial Donasi Panti Asuhan Peduli Sesama",
//       "Retreat Pembinaan Karakter Pemuda Kristen",
//     ],
//     syarat: "Terbuka untuk seluruh siswa Kristen/Katolik SMKN 26.",
//     color: "from-sky-600 to-indigo-500",
//     icon: Award,
//   },
// ];

// const categories = [
//   "Semua",
//   "IPTEK & Kejuruan",
//   "Bela Negara",
//   "Olahraga",
//   "Seni & Budaya",
//   "Keagamaan",
// ];

const Ekskul = () => {
  const [filterType, setFilterType] = useState("INDOOR");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToDaftar = () => {
    const section = document.getElementById("daftar-ekskul");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Data ekskul default 1:1 sesuai desain (6 kartu per kategori)
  const ekskulList = [
    // INDOOR
    { id: 1, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },
    { id: 2, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },
    { id: 3, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },
    { id: 4, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },
    { id: 5, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },
    { id: 6, nama: "Nama Ekstrakurikuler", tipe: "INDOOR" },

    // OUTDOOR
    { id: 7, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
    { id: 8, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
    { id: 9, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
    { id: 10, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
    { id: 11, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
    { id: 12, nama: "Nama Ekstrakurikuler", tipe: "OUTDOOR" },
  ];

  const filteredEkskul = ekskulList.filter((item) => {
    const matchesType = item.tipe === filterType;
    const matchesSearch = item.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full bg-[#eef4fd] text-slate-800 relative">
      {/* ─── HERO SECTION (SESUAI DOKUMEN DESAIN 1:1) ─── */}
      <section
        className="w-full relative min-h-[85vh] lg:h-screen flex items-center overflow-hidden 
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
          className="absolute top-0 left-0 w-full h-full z-0"
        ></div>

        {/* Kontainer Utama Hero */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Kolom Kiri: Angka Raksasa "26" Bergaris Tepi Biru (Outline) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center select-none pointer-events-none pr-0 lg:pr-6"></div>

            {/* Kolom Kanan: Teks Konten Ekstrakurikuler */}
            <ScrollReveal direction="up" duration={0.55} className="lg:col-span-7 flex flex-col justify-center items-start pl-0 lg:pl-6 max-w-2xl">
              {/* Breadcrumb: Program > Ekstrakurikuler */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 text-sm md:text-[15px] font-medium mb-3 tracking-wide"
              >
                <span className="text-slate-500">Program</span>
                <span className="text-slate-800 font-bold text-xs md:text-sm">
                  &gt;
                </span>
                <span className="text-[#0075FF] font-semibold">
                  Ekstrakurikuler
                </span>
              </nav>

              {/* Judul Utama: Ekstrakurikuler */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0075FF] tracking-tight leading-[1.1] mb-5">
                Ekstrakurikuler
              </h1>

              {/* Paragraf Deskripsi */}
              <p
                className="text-slate-800 text-sm sm:text-base lg:text-[16px] leading-relaxed 
              font-normal mb-8 text-left pr-0 sm:pr-8 lg:pr-24"
              >
                SMK Negeri 26 Jakarta menyediakan wadah yang besar untuk
                menampung minat dan bakat siswa-siswi yang sangat beragam. Selain
                itu Ekskul juga wadah untuk siswa siswi dalam meningkatkan
                softskill seperti kerjasama, berorganisasi, dan disiplin yang
                dapat di implementasikan saat sudah berada di dunia kerja
              </p>

              {/* Tombol Jelajahi */}
              <button
                onClick={scrollToDaftar}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0075FF] hover:bg-[#0062db] active:scale-[0.98] text-white font-medium text-[15px] rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 cursor-pointer group"
              >
                <span>Jelajahi</span>
                <span className="font-bold text-base transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION EKSTRAKURIKULER (100% SESUAI DESAIN) ─── */}
      <section
        id="daftar-ekskul"
        className="bg-tertiary w-full min-h-screen px-6 sm:px-10 lg:px-16 py-14 sm:py-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Judul Utama */}
          <ScrollReveal direction="up" duration={0.5} className="title text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-6xl lg:text-[88px] font-montserrat font-black text-white tracking-wider leading-[1.1]">
              EKSTRAKURIKULER
            </h1>
          </ScrollReveal>

          {/* Bar Kontrol: Search Bar & Filter Switch INDOOR / OUTDOOR */}
          <ScrollReveal direction="up" delay={0.06} duration={0.5} className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 mb-8 sm:mb-12">
            {/* Search Input Bar */}
            <div className="bg-white rounded-full flex items-center px-5 sm:px-6 py-3 sm:py-4 shadow-sm w-full md:flex-1 md:max-w-2xl">
              <IoSearch className="text-xl sm:text-3xl shrink-0 text-slate-500" />
              <div className="w-[1.5px] h-5 sm:h-7 bg-slate-300 mx-3 sm:mx-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari ekstrakurikuler..."
                className="w-full bg-transparent text-slate-800 placeholder:text-slate-400 font-medium text-sm sm:text-lg outline-none border-none"
              />
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="shrink-0 text-slate-400 hover:text-slate-600 transition-opacity cursor-pointer flex items-center justify-center ml-2"
                aria-label="Hapus pencarian"
              >
                <IoClose className="text-xl sm:text-3xl" />
              </button>
            </div>

            {/* Toggle INDOOR / OUTDOOR */}
            <div className="bg-white/20 backdrop-blur-xs p-1.5 rounded-full flex items-center shrink-0 border border-white/10 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setFilterType("INDOOR")}
                className={`rounded-full px-5 sm:px-9 py-2 sm:py-3 text-xs sm:text-base font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex-1 sm:flex-initial text-center ${
                  filterType === "INDOOR"
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-transparent text-white hover:text-white/80"
                }`}
              >
                INDOOR
              </button>
              <button
                type="button"
                onClick={() => setFilterType("OUTDOOR")}
                className={`rounded-full px-5 sm:px-9 py-2 sm:py-3 text-xs sm:text-base font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex-1 sm:flex-initial text-center ${
                  filterType === "OUTDOOR"
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-transparent text-white hover:text-white/80"
                }`}
              >
                OUTDOOR
              </button>
            </div>
          </ScrollReveal>

          {/* Grid Kartu Ekstrakurikuler (3 Kolom x 2 Baris = 6 Kartu) */}
          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.06}>
            {filteredEkskul.map((item) => (
              <ScrollStaggerItem
                key={item.id}
                className="bg-white rounded-4xl sm:rounded-4xl overflow-hidden flex flex-col shadow-lg shadow-black/5"
              >
                {/* Area Gambar / Placeholder Abu-Abu */}
                <div className="w-full aspect-video bg-gray-300 flex items-center justify-center overflow-hidden relative">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#cfd4d8]" />
                  )}
                </div>

                {/* Bar Bawah Putih */}
                <div className="bg-white px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between gap-3">
                  <span className="text-slate-800 font-normal text-base sm:text-lg truncate">
                    {item.nama}
                  </span>
                  <button
                    type="button"
                    className="bg-secondary hover:bg-[#0066d6] text-white text-sm font-semibold rounded-full px-5 py-1.5 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Lihat</span>
                    <span className="text-sm font-bold">&gt;</span>
                  </button>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </section>
    </div>
  );
};

export default Ekskul;