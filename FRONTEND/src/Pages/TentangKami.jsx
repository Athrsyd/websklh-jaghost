import React from 'react';
import { Link } from 'react-router-dom';
import akreditasi from '../assets/akre.png';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

const TentangKami = () => {

  const misiSekolah = [
    "Menanamkan nilai keimanan, ketakwaan, kewargaan, penalaran kritis, kreativitas, kemandirian, kolaborasi, kesehatan, dan komunikasi.",
    "Mengembangkan kompetensi keahlian sesuai kebutuhan DUDI lewat teaching factory, magang, guru tamu, dan sertifikasi.",
    "Menyelenggarakan pembelajaran mendalam berpusat pada murid untuk kemampuan berpikir kritis, kreatif, inovatif, kolaboratif, dan komunikatif.",
    "Mengintegrasikan teknologi digital dan proyek nyata dalam proses pembelajaran.",
    "Meningkatkan profesionalisme guru dan tenaga kependidikan lewat pelatihan, inovasi, dan penguasaan teknologi.",
    "Membangun kemitraan strategis dengan DUDI, kampus, dan masyarakat untuk pembelajaran kontekstual.",
    "Meningkatkan kemampuan berbahasa asing murid agar berdaya saing global.",
    "Menyediakan sarana dan prasarana pembelajaran sesuai standar pendidikan."
  ];

  const stats = [
    { id: 1, number: "1756", label: "JUMLAH MURID", textColor: "text-orange-500" },
    { id: 2, number: "80", label: "JUMLAH PENDIDIK", textColor: "text-blue-600" },
    { id: 3, number: "29", label: "JUMLAH TENAGA KEPENDIDIKAN", textColor: "text-orange-500" },
    { id: 4, number: "1971", label: "TAHUN BERDIRI", textColor: "text-blue-600" },
    { id: 5, number: "A", label: "Terakreditasi", textColor: "text-blue-600" },
  ];

  return (
    <>
      {/* hero */}
      <section className="w-full min-h-[auto] lg:min-h-screen bg-side-back py-20 lg:py-28 overflow-hidden">
        <div className="w-[90%] sm:w-4/5 mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <ScrollReveal direction="up" delay={0.05} duration={0.55} className="w-full lg:w-1/2 flex justify-center">
            <div className="h-64 sm:h-96 lg:h-110 rounded-3xl w-full max-w-lg bg-gray-300">
              {/* bikin img pake object-cover */}
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} duration={0.55} className="w-full lg:w-1/2 py-4 lg:py-8 flex flex-col gap-6 lg:gap-8">
            <h3 className="text-sm font-bold">
              <span className='text-gray-500'>Tentang Kami</span> {' '}
              &gt; {' '} <span className='text-tertiary'>Profil Sekolah</span>
            </h3>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl sm:text-4xl text-tertiary font-bold">Profil Sekolah</h1>
              <p className='text-gray-600 font-normal leading-relaxed text-left sm:text-justify text-sm sm:text-base'>
                SMK Negeri 26 Jakarta merupakan salah satu institusi pendidikan kejuruan terkemuka yang berdedikasi untuk menghasilkan lulusan yang kompeten, inovatif, dan siap bersaing di pasar kerja global. Dengan fasilitas modern dan tenaga pengajar profesional, kami berkomitmen membentuk karakter bangsa melalui pendidikan vokasi yang bermutu.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="w-full min-h-[auto] lg:min-h-screen py-14 lg:py-20 overflow-hidden">
        <div className="w-[90%] sm:w-4/5 mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          <ScrollReveal direction="up" delay={0.05} duration={0.55} className="w-full lg:w-1/2 py-4 lg:py-8 flex flex-col gap-6 lg:gap-8">
            <h1 className="text-3xl sm:text-4xl text-secondary font-bold">Visi & Misi Sekolah</h1>
            <div className="bg-[#ffffff] p-5 sm:p-6 rounded-3xl shadow-lg border border-slate-100">
              <h2 className='text-tertiary text-lg font-bold mb-2'>Misi Sekolah</h2>
              <ol className='list-decimal gap-2.5 flex flex-col p-2 sm:p-4 list-outside text-black/70 text-sm sm:text-base'>
                {misiSekolah.map((misi, index) => (
                  <li key={index} className="ml-4">{misi}</li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} duration={0.55} className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
            <div className="h-64 sm:h-96 lg:h-110 rounded-3xl w-full max-w-lg bg-gray-300"></div>
            <div className="w-full max-w-lg h-auto bg-[#ffffff] p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col gap-3 border border-slate-100">
              <h2 className='text-tertiary text-lg font-bold'>Visi Sekolah</h2>
              <h3 className='text-base sm:text-xl text-center font-bold text-black leading-snug'>
                "SMK teknologi unggul yang menghasilkan lulusan berkarakter, kompeten, inovatif, dan berdaya saing global"
              </h3>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="w-full py-12 px-4 space-y-16">

        {/* 1. Baris 4 Kartu Statistik */}
        <ScrollStagger className="max-w-6xl mx-auto flex flex-row flex-wrap gap-4 sm:gap-6 justify-center" staggerDelay={0.08}>
          {stats.map((item) => (
            <ScrollStaggerItem
              onClick={() => {
                if (item.id === 5) {
                  window.open(akreditasi, '_blank');
                }
              }}
              key={item.id}
              className="bg-slate-100 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(20%-1.25rem)] min-w-[160px] cursor-pointer rounded-2xl p-6 shadow-md shadow-gray-200/60 border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1"
            >
              {item.id !== 5 ? (
                <>
                  <h2 className={`text-4xl font-extrabold ${item.textColor} tracking-tight`}>
                    {item.number}
                  </h2>
                  <p className="text-[11px] font-bold text-gray-400 mt-2 tracking-wider uppercase">
                    {item.label}
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full cursor-zoom-in">
                  <p className="text-[11px] font-bold text-gray-400 mt-2 tracking-wider uppercase">
                    {item.label}
                  </p>
                  <h2 className={`text-4xl font-extrabold ${item.textColor} tracking-tight`}>
                    {item.number}
                  </h2>
                  <p className='text-slate-500 text-xs mt-4'>(klik untuk melihat sertifikat akreditasi)</p>
                </div>
              )}
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* 2. Bagian Video Mars SMK Negeri 26 Jakarta */}
        <ScrollReveal direction="up" duration={0.55} className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-12 border border-gray-100 text-center shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-orange-500 to-orange-600 mb-6 sm:mb-8 inline-block">
            Mars SMK Negeri 26 Jakarta
          </h2>

          {/* Placeholder Frame Video */}
          <div className="w-full max-w-3xl mx-auto aspect-video bg-gray-300 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden">
            <iframe className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/Ox5y2cs38cU?si=am2MgtdevgpZa7Wj"
              title="YouTube video player" frameborder="0" allow="accelerometer; 
            autoplay; clipboard-write; encrypted-media; gyroscope; 
            picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen></iframe>
          </div>
        </ScrollReveal>

        {/* 3. Banner Call-to-Action (CTA) */}
        <ScrollReveal direction="up" duration={0.55} delay={0.1} className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-6 sm:p-12 text-center text-white shadow-xl shadow-blue-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-wide">
            Jelajahi Program dan Keunggulan <br className="hidden sm:inline" /> SMK Negeri 26 Jakarta
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/program/jurusan" className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:bg-gray-100 transition-colors text-sm w-full sm:w-auto">
              Lihat Program
            </Link>
            <Link to="/informasi/kontak" className="bg-transparent border border-white/60 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm w-full sm:w-auto">
              Hubungi Kami
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </>
  )
}

export default TentangKami;