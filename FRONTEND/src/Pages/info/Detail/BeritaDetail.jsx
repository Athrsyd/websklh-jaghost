import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight, Calendar, User, Tag, Share2 } from 'lucide-react'
import logo26 from '../../../assets/logo26.webp'
import depanSekolah from '../../../assets/depanSekolah.jpeg'
import profilImg from '../../../assets/profil_img.jpg'
import visimisiImg from '../../../assets/visimisi_img.jpg'
import heroBg from '../../../assets/hero-bg.webp'
import { ScrollReveal } from '../../../components/ScrollReveal'

const BeritaDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Berita utama dan daftar berita terkait/sidebar
  const allNews = [
    {
      id: '1',
      title: 'Juara 2 LKS Tingkat Nasional Bidang Lomba Electronics',
      category: 'Prestasi',
      date: '08 September 2026',
      author: 'Team Jurnalistik SMKN 26 Jakarta',
      image: depanSekolah,
      secondaryImages: [
        {
          src: profilImg,
          caption: 'Delegasi siswa saat melakukan pengujian rangkaian sirkuit mikroprosesor di lab elektronika.',
        },
        {
          src: visimisiImg,
          caption: 'Sesi presentasi inovasi dan verifikasi teknis di hadapan dewan juri industri.',
        },
      ],
      thirdImage: {
        src: heroBg,
        caption: 'Pemberian apresiasi dan piagam penghargaan oleh Kepala SMKN 26 Jakarta.',
      },
      headline:
        'Siswa SMKN 26 Jakarta Sabet Juara 2 LKS Tingkat Nasional Bidang Electronics: Inovasi Rekayasa Perangkat Pintar Memukau Dewan Juri',
      paragraphsPart1: [
        'Prestasi gemilang kembali ditorehkan oleh siswa-siswi SMK Negeri 26 Jakarta di tingkat nasional. Dalam perhelatan bergengsi Lomba Kompetensi Siswa (LKS) Nasional ke-34, perwakilan bidang Electronics berhasil meraih Juara 2 (Medali Perak) setelah bersaing ketat dengan puluhan peserta terbaik dari berbagai provinsi di seluruh Indonesia.',
        'Kompetisi yang berlangsung selama lima hari ini menguji ketangkasan peserta dalam pemecahan masalah rangkaian elektronika terintegrasi, perancangan Printed Circuit Board (PCB) berbasis perangkat lunak industri, perakitan perangkat keras presisi tinggi, hingga pemrograman mikrokontroler untuk sistem automasi masa depan.',
      ],
      quote:
        '“Prestasi ini bukan sekadar pencapaian individu, melainkan buah dari kedisiplinan belajar di bengkel praktik, bimbingan intensif para guru kejuruan, serta dukungan ekosistem fasilitas yang terus diperbarui di SMKN 26 Jakarta.”',
      quoteAuthor: 'Kepala SMK Negeri 26 Jakarta',
      paragraphsPart2: [
        'Persiapan menuju kompetisi ini tidaklah instan. Selama lebih dari enam bulan, tim siswa bersama guru pembimbing menghabiskan waktu di laboratorium untuk menganalisis berbagai skenario tantangan industri mutakhir, termasuk teknologi sensor nirkabel dan efisiensi konsumsi daya listrik pada perangkat IoT.',
        'Salah satu poin krusial yang memikat perhatian para juri adalah kecepatan dan keakuratan sistem pemantau keselamatan kerja pintar yang dirancang oleh perwakilan SMKN 26. Alat ini mampu mendeteksi potensi korsleting listrik dan kebocoran gas dalam hitungan milidetik dan langsung mengirimkan peringatan darurat ke pusat kontrol.',
        'Dengan raihan medali perak ini, perwakilan SMKN 26 Jakarta juga berkesempatan mengikuti seleksi pembinaan nasional untuk ajang internasional WorldSkills Competition mendatang. Pihak sekolah berkomitmen penuh untuk terus menyediakan pendampingan terbaik agar talenta muda kejuruan Indonesia siap bersinar di panggung dunia.',
      ],
    },
    {
      id: '2',
      title: 'Kerjasama Strategis dan Penandatanganan MoU dengan Mitra Industri Ternama',
      category: 'Kerjasama',
      date: '02 Agustus 2026',
      author: 'Humas SMKN 26 Jakarta',
      image: profilImg,
      secondaryImages: [
        {
          src: visimisiImg,
          caption: 'Pertukaran dokumen kerjasama antara pihak sekolah dan perwakilan industri global.',
        },
        {
          src: depanSekolah,
          caption: 'Kunjungan perwakilan direksi industri ke unit workshop teknik manufaktur.',
        },
      ],
      thirdImage: {
        src: heroBg,
        caption: 'Foto bersama manajemen SMKN 26 dan perwakilan asosiasi industri.',
      },
      headline:
        'Akselerasi Link and Match: SMKN 26 Jakarta Perkuat Kemitraan Strategis Bersama Industri Manufaktur Global',
      paragraphsPart1: [
        'SMK Negeri 26 Jakarta secara resmi memperluas jalinan kemitraan strategis dengan menandatangani Nota Kesepahaman (MoU) bersama lima perusahaan manufaktur dan teknologi terkemuka. Kerjasama ini difokuskan pada penguatan kurikulum berbasis industri, program magang siswa bersertifikasi, serta penyerapan langsung lulusan sekolah.',
        'Dalam era disrupsi teknologi, keselarasan antara materi kejuruan di sekolah dengan kebutuhan nyata di industri merupakan kunci utama untuk mencetak tenaga kerja terampil yang siap kerja tanpa perlu proses adaptasi yang panjang.',
      ],
      quote:
        '“Kolaborasi ini memberikan kepastian bahwa siswa kami mendapatkan paparan standar teknologi industri terkini sejak hari pertama mereka belajar di ruang praktik.”',
      quoteAuthor: 'Wakil Kepala Sekolah Bidang Hubungan Industri',
      paragraphsPart2: [
        'Melalui perjanjian ini, mitra industri juga akan menghadirkan program guru tamu secara rutin setiap bulan serta memberikan fasilitas donasi peralatan mesin mutakhir untuk menunjang kegiatan belajar mengajar di laboratorium sekolah.',
      ],
    },
    {
      id: '3',
      title: 'Pelaksanaan Uji Sertifikasi Kompetensi (USK) Siswa Tahun Ajaran 2025/2026',
      category: 'Akademik',
      date: '25 Juli 2026',
      author: 'LSP SMKN 26 Jakarta',
      image: visimisiImg,
      secondaryImages: [
        {
          src: profilImg,
          caption: 'Asesor independen BNSP melakukan verifikasi langsung saat ujian praktik berlangsung.',
        },
        {
          src: heroBg,
          caption: 'Siswa memperagakan standar operasional prosedur keselamatan kerja di bengkel teknik.',
        },
      ],
      thirdImage: {
        src: depanSekolah,
        caption: 'Pengumuman kelulusan uji kompetensi dengan persentase kompeten 100%.',
      },
      headline:
        'Standarisasi Kompetensi Global: Lembaga Sertifikasi Profesi Gelar Uji Asesmen Siswa Tingkat Akhir',
      paragraphsPart1: [
        'Lembaga Sertifikasi Profesi (LSP) P1 SMKN 26 Jakarta menyelenggarakan Uji Sertifikasi Kompetensi (USK) berlisensi Badan Nasional Sertifikasi Profesi (BNSP). Asesmen ini diikuti oleh ratusan siswa dari seluruh program keahlian teknik untuk memastikan kualifikasi yang diakui secara nasional maupun internasional.',
        'Uji kompetensi meliputi asesmen pengetahuan teori kejuruan, keterampilan praktik di bengkel standar industri, serta wawancara pemahaman etika profesi dan keselamatan kerja (K3).',
      ],
      quote:
        '“Sertifikat kompetensi BNSP adalah paspor profesional bagi lulusan SMK untuk membuktikan keahlian terverifikasi di dunia kerja.”',
      quoteAuthor: 'Ketua LSP SMKN 26 Jakarta',
      paragraphsPart2: [
        'Seluruh proses uji diawasi langsung oleh asesor independen yang berpengalaman di bidangnya, menjamin objektivitas dan standar mutu asesmen yang transparan.',
      ],
    },
    {
      id: '4',
      title: 'Pameran Inovasi dan Karya Teknologi Unggulan Siswa BLUD SMKN 26',
      category: 'Kegiatan',
      date: '18 Juli 2026',
      author: 'BLUD SMKN 26 Jakarta',
      image: heroBg,
      secondaryImages: [
        {
          src: depanSekolah,
          caption: 'Pengunjung antusias mencoba prototipe sistem otomasi hemat energi karya siswa.',
        },
        {
          src: profilImg,
          caption: 'Booth produk cetak presisi dan komponen mekanik buatan unit bengkel mesin.',
        },
      ],
      thirdImage: {
        src: visimisiImg,
        caption: 'Apresiasi dari dinas pendidikan atas komitmen inovasi mandiri unit BLUD.',
      },
      headline:
        'Showcase Hasil Karya Teknologi Terapan: Siswa Ciptakan Solusi Cerdas Ramah Lingkungan',
      paragraphsPart1: [
        'Badan Layanan Umum Daerah (BLUD) SMKN 26 Jakarta menyelenggarakan pameran tahunan inovasi teknologi. Berbagai produk unggulan karya siswa mulai dari mesin pengolah limbah otomatis, sensor IoT pemantau kualitas udara, hingga suku cadang presisi dipamerkan secara terbuka.',
        'Kegiatan ini menjadi wadah unjuk kebolehan sekaligus penjajakan komersialisasi produk yang dapat dimanfaatkan langsung oleh masyarakat dan industri rekanan.',
      ],
      quote:
        '“Pendidikan vokasi yang sejati adalah ketika karya siswa tidak hanya berakhir sebagai tugas sekolah, melainkan mampu menjawab persoalan riil di masyarakat.”',
      quoteAuthor: 'Kepala Unit Pelaksana Teknis BLUD',
      paragraphsPart2: [
        'Pameran ini berhasil menarik perhatian ratusan pengunjung termasuk perwakilan perguruan tinggi teknik dan komunitas industri manufaktur dari berbagai wilayah Jakarta.',
      ],
    },
    {
      id: '5',
      title: 'Sosialisasi Bantuan Pendidikan KJP Plus dan Program PIP Tahap 1',
      category: 'Pengumuman',
      date: '10 Juli 2026',
      author: 'Bagian Kesiswaan SMKN 26',
      image: depanSekolah,
      secondaryImages: [
        {
          src: visimisiImg,
          caption: 'Sesi pemaparan regulasi pencairan bantuan dana pendidikan oleh tim kesiswaan.',
        },
        {
          src: profilImg,
          caption: 'Pendampingan langsung verifikasi dokumen administratif bagi wali murid.',
        },
      ],
      thirdImage: {
        src: heroBg,
        caption: 'Foto suasana aula sekolah saat sosialisasi berlangsung tertib.',
      },
      headline:
        'Sosialisasi Penyaluran Bantuan Pendidikan: SMKN 26 Jakarta Pastikan Bantuan Tepat Sasaran',
      paragraphsPart1: [
        'Guna mendukung kelancaran proses belajar siswa yang membutuhkan, SMKN 26 Jakarta menggelar pengarahan dan verifikasi data calon penerima KJP Plus dan Program Indonesia Pintar (PIP).',
        'Pertemuan ini menghadirkan perwakilan orang tua murid untuk memaparkan prosedur transparansi pelaporan serta etika pemanfaatan dana bantuan khusus kebutuhan akademik.',
      ],
      quote:
        '“Bantuan ini diharapkan menjadi penunjang utama kelengkapan alat belajar dan sertifikasi siswa tanpa kendala ekonomi.”',
      quoteAuthor: 'Koordinator Beasiswa Kesiswaan',
      paragraphsPart2: [
        'Sekolah menyediakan layanan helpdesk khusus bagi wali murid yang memerlukan konsultasi berkas administrasi agar seluruh proses berjalan lancar dan akuntabel.',
      ],
    },
    {
      id: '6',
      title: 'Tim Robotik SMKN 26 Borong Medali Emas Pada Turnamen Regional',
      category: 'Prestasi',
      date: '02 Juli 2026',
      author: 'Ekskul Robotik SMKN 26',
      image: profilImg,
      secondaryImages: [
        {
          src: heroBg,
          caption: 'Robot pemilah logistik otomatis saat bermanuver di lintasan sirkuit rintangan.',
        },
        {
          src: visimisiImg,
          caption: 'Anggota tim robotik saat mengkalibrasi sensor inframerah dan kamera kecerdasan buatan.',
        },
      ],
      thirdImage: {
        src: depanSekolah,
        caption: 'Penerimaan trofi juara umum turnamen robotik se-Jabodetabek.',
      },
      headline:
        'Dominasi Turnamen Robotik Regional: Robot Cerdas Karya Siswa SMKN 26 Tak Terkalahkan',
      paragraphsPart1: [
        'Ekstrakurikuler Robotik SMKN 26 Jakarta kembali mengukuhkan diri sebagai salah satu tim terkuat di wilayah Jabodetabek dengan memborong medali emas kategori Autonomous Industrial Robot.',
        'Robot karya siswa mampu memilah dan mendistribusikan barang logistik miniatur dengan presisi kecepatan 99.8% berkat integrasi sensor visi kecerdasan buatan.',
      ],
      quote:
        '“Kombinasi antara logika pemrograman yang matang dan mekanika presisi menjadi kunci kemenangan tim kami di setiap putaran.”',
      quoteAuthor: 'Ketua Tim Robotik SMKN 26',
      paragraphsPart2: [
        'Kemenangan ini menjadi pemacu semangat bagi para anggota ekstrakurikuler untuk mempersiapkan diri menghadapi kejuaraan tingkat internasional di semester depan.',
      ],
    },
  ]

  // Cari berita yang aktif berdasarkan URL id, atau default ke artikel pertama
  const [currentArticle, setCurrentArticle] = useState(allNews[0])

  useEffect(() => {
    if (id) {
      const found = allNews.find((item) => item.id === String(id))
      if (found) {
        setCurrentArticle(found)
      } else {
        setCurrentArticle(allNews[0])
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  // Daftar berita di sidebar (6 berita agar scrolling terasa kaya dan lancar)
  const sidebarNews = allNews

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pt-4 sm:pt-8 lg:pt-10 pb-20 px-4 sm:px-6 lg:px-12 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ═══════════════════════════════════════════════════════════
              KOLOM KIRI: SIDEBAR DAFTAR BERITA
              - Dilengkapi data-lenis-prevent & onWheel stopPropagation
                agar scroll lancar seperti pada komponen FAQ
             ═══════════════════════════════════════════════════════════ */}
          <aside className="order-2 lg:order-1 lg:col-span-4 w-full bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-6 static lg:sticky lg:top-8">
            {/* Tombol Kembali */}
            <div>
              <button
                type="button"
                onClick={() => navigate('/informasi/berita')}
                className="inline-flex items-center gap-1.5 bg-tertiary hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs px-4 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
              >
                <span className="font-bold text-[11px]">&lt;&lt;</span>
                <span>Kembali</span>
              </button>
            </div>

            {/* Identitas Sekolah */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src={logo26}
                alt="SMK Negeri 26 Jakarta"
                className="w-8 h-8 object-contain shrink-0"
              />
              <span className="font-montserrat font-bold text-sm sm:text-[15px] text-primary">
                SMK Negeri 26 Jakarta
              </span>
            </div>

            {/* Judul Bagian BERITA */}
            <div className="flex items-center gap-2.5 mt-6 mb-5">
              <span className="w-1 h-6 bg-black rounded-full shrink-0" />
              <h2 className="font-montserrat font-black text-xl text-black tracking-wider">
                BERITA
              </h2>
            </div>

            {/* List Berita Sidebar dengan Scrollbar Biru & Pencegah Lenis Intercept */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="space-y-5 max-h-[640px] overflow-y-auto pr-3 faq-scrollbar overscroll-contain"
            >
              {sidebarNews.map((item) => {
                const isSelected = item.id === currentArticle.id
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentArticle(item)
                      navigate(`/informasi/berita/${item.id}`)
                    }}
                    className={`group cursor-pointer p-2.5 rounded-2xl transition-all duration-200 border ${
                      isSelected
                        ? 'bg-blue-50/50 border-secondary/30 shadow-xs'
                        : 'border-transparent hover:bg-slate-50/70 hover:border-slate-100'
                    }`}
                  >
                    {/* Thumbnail Gambar */}
                    <div className="w-full aspect-16/10 rounded-2xl bg-[#D6D9DE] overflow-hidden relative shadow-xs">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#D6D9DE]" />
                      )}
                    </div>

                    {/* Meta: Kategori & Tanggal */}
                    <div className="flex items-center justify-between mt-3 px-1">
                      <span className="px-3 py-0.5 bg-[#FFE8E3] text-tertiary font-bold text-[10px] rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="text-slate-400 text-xs font-normal">
                        {item.date}
                      </span>
                    </div>

                    {/* Judul Berita */}
                    <h3 className="font-montserrat font-bold text-sm sm:text-[15px] text-primary leading-snug mt-2 line-clamp-2 group-hover:text-tertiary transition-colors px-1">
                      {item.title}
                    </h3>

                    {/* Tombol Baca Selengkapnya */}
                    <div className="flex items-center justify-between mt-2.5 pt-1 px-1">
                      <span className="text-secondary font-semibold text-xs sm:text-sm group-hover:underline flex items-center gap-1">
                        Baca Selengkapnya
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-secondary group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </aside>

          {/* ═══════════════════════════════════════════════════════════
              KOLOM KANAN: KARTU ARTIKEL UTAMA LEBIH PANJANG & KAYA GAMBAR
             ═══════════════════════════════════════════════════════════ */}
          <main className="order-1 lg:order-2 lg:col-span-8 w-full">
            <ScrollReveal direction="up" duration={0.55} className="w-full bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/80 shadow-md p-6 sm:p-10 lg:p-12 relative flex flex-col justify-start">
              {/* Baris Badge Header: Prestasi & Berita Terbaru */}
              <div className="flex items-center justify-between w-full">
              <div className="inline-block bg-primary text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-t-full rounded-br-full tracking-wide shadow-xs">
                {currentArticle.category || 'Prestasi'}
              </div>
              <div className="inline-block bg-tertiary text-white text-xs sm:text-sm font-bold px-6 py-2 rounded-t-full rounded-bl-full tracking-wide shadow-xs">
                Berita Terbaru
              </div>
            </div>

            {/* Judul Utama / Headline */}
            <h1 className="font-montserrat font-black text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] text-primary text-center leading-tight max-w-3xl mx-auto mt-8">
              {currentArticle.headline || currentArticle.title}
            </h1>

            {/* Info Tanggal & Penulis */}
            <p className="text-center font-poppins text-primary font-bold text-xs sm:text-sm mt-4">
              {currentArticle.date} — {currentArticle.author}
            </p>

            {/* Garis Horizontal Tengah */}
            <div className="w-36 sm:w-48 h-0.75 bg-primary/80 rounded-full mx-auto mt-3" />

            {/* 1. Gambar Utama Artikel (Hero Image) */}
            <div className="w-full max-w-4xl mx-auto aspect-16/10 sm:aspect-16/9 rounded-3xl overflow-hidden shadow-lg shadow-black/8 bg-[#D6D9DE] mt-8 sm:mt-10">
              {currentArticle.image ? (
                <img
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#D6D9DE]" />
              )}
            </div>

            {/* Bagian Teks Artikel Pembuka */}
            <div className="mt-8 space-y-5 font-poppins text-primary text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-justify sm:text-left">
              {currentArticle.paragraphsPart1?.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 2. Galeri Gambar Tambahan (Dual Photo Grid) */}
            {currentArticle.secondaryImages && currentArticle.secondaryImages.length > 0 && (
              <div className="my-8 sm:my-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {currentArticle.secondaryImages.map((imgItem, idx) => (
                    <div
                      key={idx}
                      className="group bg-slate-50 p-2.5 rounded-2xl border border-slate-100 shadow-xs"
                    >
                      <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-200 relative">
                        <img
                          src={imgItem.src}
                          alt={`Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="mt-2 text-[12px] text-slate-500 font-poppins italic leading-normal px-1">
                        {imgItem.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kutipan Eksklusif (Quote Card) */}
            {currentArticle.quote && (
              <div className="my-6 p-6 sm:p-7 bg-side-back/40 rounded-2xl border-l-4 border-tertiary relative">
                <p className="font-poppins italic text-slate-800 text-sm sm:text-base leading-relaxed">
                  {currentArticle.quote}
                </p>
                <p className="mt-3 font-montserrat font-bold text-xs sm:text-sm text-tertiary">
                  — {currentArticle.quoteAuthor}
                </p>
              </div>
            )}

            {/* Bagian Teks Artikel Lanjutan */}
            <div className="my-6 space-y-5 font-poppins text-primary text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-justify sm:text-left">
              {currentArticle.paragraphsPart2?.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 3. Gambar Dokumentasi Penutup (Landscape Showcase Banner) */}
            {currentArticle.thirdImage && (
              <div className="my-8 bg-slate-50 p-3 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-xs">
                <div className="w-full aspect-16/8 sm:aspect-16/7 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src={currentArticle.thirdImage.src}
                    alt="Dokumentasi Penutup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2.5 text-[12px] sm:text-xs text-slate-500 font-poppins italic text-center">
                  {currentArticle.thirdImage.caption}
                </p>
              </div>
            )}

            {/* Footer Artikel: Tag Kategori & Informasi Berita */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <Tag size={13} /> Tags:
                </span>
                <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                  #{currentArticle.category}
                </span>
                <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                  #SMKN26Jakarta
                </span>
                <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                  #VokasiKuat
                </span>
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Kategori: <strong className="text-primary">{currentArticle.category}</strong>
              </div>
            </div>
            </ScrollReveal>
          </main>
        </div>
      </div>
    </div>
  )
}

export default BeritaDetail