import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Calendar, Search } from 'lucide-react'
import depanSekolah from '../../assets/depanSekolah.jpeg'
import profilImg from '../../assets/profil_img.jpg'
import visimisiImg from '../../assets/visimisi_img.jpg'
import heroBg from '../../assets/hero-bg.webp'

const Berita = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(0)

  // Kategori berita
  const categories = [
    'Semua',
    'Prestasi',
    'Akademik',
    'Kegiatan',
    'Pengumuman',
    'Kerjasama',
  ]

  // Data berita untuk penerapan layout card
  const newsList = [
    {
      id: 1,
      title: 'Siswa SMKN 26 Jakarta Juara 1 Lomba Kompetensi Siswa (LKS) Tingkat Nasional',
      category: 'Prestasi',
      date: '15 Maret 2026',
      image: depanSekolah,
      excerpt: 'Prestasi membanggakan kembali diukir oleh delegasi siswa dalam ajang bergengsi LKS Nasional dengan karya rekayasa teknologi dan otomasi industri unggulan.',
    },
    {
      id: 2,
      title: 'Penandatanganan Kerjasama Strategis (MoU) dengan Berbagai Mitra Industri Global',
      category: 'Kerjasama',
      date: '10 Maret 2026',
      image: profilImg,
      excerpt: 'SMKN 26 Jakarta terus memperkuat komitmen link & match bersama industri manufaktur dan teknologi untuk akselerasi keterserapan kerja lulusan.',
    },
    {
      id: 3,
      title: 'Pelaksanaan Uji Sertifikasi Kompetensi Kejuruan Terstandar BNSP Tahun 2026',
      category: 'Akademik',
      date: '05 Maret 2026',
      image: visimisiImg,
      excerpt: 'Lembaga Sertifikasi Profesi (LSP) SMKN 26 menyelenggarakan asesmen kompetensi komprehensif bagi seluruh siswa tingkat akhir agar siap bersaing global.',
    },
    {
      id: 4,
      title: 'Gelar Karya Inovasi & Pameran Produk Teknologi Unggulan Unit BLUD Siswa',
      category: 'Kegiatan',
      date: '28 Februari 2026',
      image: heroBg,
      excerpt: 'Ratusan inovasi terapan mulai dari perangkat IoT, komponen manufaktur presisi, hingga instalasi energi terbarukan dipamerkan ke publik.',
    },
    {
      id: 5,
      title: 'Sosialisasi Penyaluran Bantuan Operasional Pendidikan KJP Plus & Program PIP',
      category: 'Pengumuman',
      date: '20 Februari 2026',
      image: depanSekolah,
      excerpt: 'Manajemen sekolah memberikan arahan menyeluruh terkait alur validasi, transparansi, serta pemanfaatan dana bantuan pendidikan bagi siswa yang membutuhkan.',
    },
    {
      id: 6,
      title: 'Tim Robotik SMKN 26 Raih Medali Emas Pada Kejuaraan Robotik Regional',
      category: 'Prestasi',
      date: '12 Februari 2026',
      image: profilImg,
      excerpt: 'Inovasi robot penyortir logistik cerdas karya siswa berhasil mengungguli puluhan perwakilan sekolah menengah kejuruan terkemuka.',
    },
  ]

  // Filter berita berdasarkan kategori aktif & pencarian
  const filteredNews = newsList.filter((news) => {
    const matchesCategory =
      categories[activeCategory] === 'Semua' ||
      news.category === categories[activeCategory]
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <section className="w-full relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 bg-linear-to-b  from-side-back to-[#F8FAFC]">
        {/* Subtle dot pattern */}
        <div
          style={{
            backgroundImage: "radial-gradient(circle, #FF573380, 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            opacity: "35%",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="w-full" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full my-auto">
          {/* Badge */}
          <div className="mb-5 sm:mb-6">
            <span className="inline-block bg-tertiary text-white px-8 sm:px-9 py-1 sm:py-1.25 rounded-t-full rounded-br-full text-md sm:text-base md:text-xl font-medium tracking-wide shadow-sm">
              Berita SMKN 26 Jakarta
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-montserrat font-black  text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-primary leading-[1.04] tracking-tight mb-3 sm:mb-4">
            INFORMASI <span className="text-secondary">TERPADU</span> <br />
            SMKN 26 JAKARTA
          </h1>

          {/* Subtitle */}
          <p className="font-poppins pr-0 sm:pr-12 lg:pr-100 text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 tracking-wide">
            Informasi terkini tentang kegiatan dan prestasi SMK Negeri 26 Jakarta. Dapatkan berita terbaru, pengumuman penting, dan sorotan prestasi siswa kami di sini.
          </p>

          <button className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full mt-2 bg-[#0075FF] px-7 py-3 text-[15px] font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-[#0062db] hover:shadow-blue-500/40 active:scale-[0.98]">
            <span>Lihat Berita Lengkap</span>
            <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 flex justify-center items-center pt-6">

        </div>
      </section>

      <section className="w-full relative min-h-screen flex flex-col justify-start items-center pt-20 sm:pt-24 pb-16 sm:pb-24 bg-side-back">
        {/* Title Section */}
        <div className="title text-center mx-auto flex flex-col justify-center items-center">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-montserrat font-black text-tertiary tracking-wider leading-[1.1]">
            BERITA TERKINI
          </h2>
          <div className="w-28 sm:w-40 h-1 bg-tertiary rounded-full mt-2.5 sm:mt-3" />
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mx-auto px-4 mt-8 sm:mt-10">
          <div className="relative flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita..."
              className="w-full text-start py-3.5 sm:py-4 pl-14 pr-4 text-primary font-medium text-base sm:text-lg bg-[#DDE5F5] rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/30 placeholder:text-[#DF8776] placeholder:font-normal transition-all"
            />
            <span className='absolute left-4 text-tertiary'>< Search /></span>
          </div>
        </div>

        {/* Category Tabs Card */}
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 mt-7 sm:mt-8">
          <div className="bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.03)] border border-slate-100/80 p-2 sm:p-2.5 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto">
            {categories.map((cat, index) => {
              const isActive = activeCategory === index
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveCategory(index)}
                  className={`shrink-0 transition-all duration-200 font-bold text-sm sm:text-base cursor-pointer ${
                    isActive
                      ? 'bg-[#DBEAFE] text-tertiary px-6 sm:px-7 py-2 sm:py-2.5 rounded-xl shadow-xs'
                      : 'text-tertiary px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-blue-50/70'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Cards 3-Column Grid */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/informasi/berita/${item.id}`)}
                className="group bg-white rounded-[28px] sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100/80 cursor-pointer"
              >
                <div>
                  {/* Top Image Container */}
                  <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Tag Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-tertiary font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                      {item.category}
                    </div>
                    {/* Date Badge */}
                    <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title Bar */}
                  <h3 className="font-montserrat font-bold text-lg sm:text-xl text-primary group-hover:text-tertiary transition-colors duration-200 line-clamp-2 mt-5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Paragraph Lines / Excerpt */}
                  <p className="font-poppins text-slate-500 text-sm leading-relaxed line-clamp-3 mt-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Bottom Bar Placeholder / Read More Button */}
                <div className="mt-8 pt-4 border-t border-slate-100/80 flex justify-center items-center">
                  <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 group-hover:bg-tertiary text-slate-600 group-hover:text-white text-xs font-semibold tracking-wide transition-all duration-300">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 font-medium text-base">Tidak ada berita yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Berita