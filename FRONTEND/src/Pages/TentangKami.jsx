import React from 'react';

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
  ]
  return (
    <>
      {/* hero */}
      <section className="w-full min-h-screen bg-side-back py-28">
        <div className="container w-4/5 mx-auto flex flex-row gap-4">
          <div className="w-1/2">
            <div className="h-110 rounded-3xl w-9/10 bg-gray-300 ">
              {/* bikin img pake object-cover */}
            </div>
          </div>
          <div className="w-1/2 py-8 flex flex-col gap-8">
            <h3 className="text-sm font-bold ">
              <span className='text-gray-500'>Tentang Kami</span> {' '}
              &gt; {' '} <span className='text-tertiary'>Profil Sekolah</span>
            </h3>
            <div className=" flex flex-col gap-2">
              <h1 className="text-4xl text-tertiary font-bold">Profil Sekolah</h1>
              <p className='text-gray-500 font-semibold text-justify'>SMK Negeri 26 Jakarta merupakan salah satu institusi pendidikan kejuruan terkemuka yang berdedikasi untuk menghasilkan lulusan yang kompeten, inovatif, dan siap bersaing di pasar kerja global. Dengan fasilitas modern dan tenaga pengajar profesional, kami berkomitmen membentuk karakter bangsa melalui pendidikan vokasi yang bermutu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="w-full min-h-screen py-20 ">
        <div className="container w-4/5 mx-auto flex flex-row gap-4">
          <div className="w-1/2 py-8 flex flex-col gap-8">
            <h1 className="text-4xl text-secondary font-bold">Visi & Misi Sekolah</h1>
            <div className="bg-[#ffffff] p-4 rounded-3xl shadow-lg">
              <h1 className='text-tertiary text-md font-bold'>Misi Sekolah</h1>
              <ol className='list-decimal gap-2 flex flex-col p-4 list-outside text-black/70 '>
                {misiSekolah.map((misi, index) => (
                  <li key={index}>{misi}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center gap-4">
            <div className="h-110 rounded-3xl w-9/10 bg-gray-300 "></div>
            <div className="h-auto bg-[#ffffff] p-7 rounded-3xl shadow-lg flex flex-col gap-4">
              <h1 className='text-tertiary text-md font-bold'>Visi Sekolah</h1>
              <h2 className='text-xl text-center font-bold text-black'>"SMK teknologi unggul yang menghasilkan lulusan berkarakter, kompeten, inovatif, dan berdaya saing global"</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full py-12 px-4 space-y-16">

        {/* 1. Baris 4 Kartu Statistik */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-slate-100 cursor-pointer rounded-2xl p-6 shadow-md shadow-gray-200/60 border border-gray-100 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1"
            >
              <h2 className={`text-4xl font-extrabold ${item.textColor} tracking-tight`}>
                {item.number}
              </h2>
              <p className="text-[11px] font-bold text-gray-400 mt-2 tracking-wider uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Bagian Video Mars SMK Negeri 26 Jakarta */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-12  border border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-orange-500 to-orange-600 mb-8 inline-block">
            Mars SMK Negeri 26 jakarta
          </h2>

          {/* Placeholder Frame Video */}
          <div className="w-full max-w-3xl mx-auto aspect-video bg-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
            <span className="text-xl font-extrabold text-black tracking-wide">
              NANTI VIDEO MARS 26
            </span>
          </div>
        </div>

        {/* 3. Banner Call-to-Action (CTA) */}
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-blue-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-wide">
            Jelajahi Program dan Keunggulan <br className="hidden sm:inline" /> SMK Negeri 26 Jakarta
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-xl shadow-sm hover:bg-gray-100 transition-colors text-sm w-full sm:w-auto">
              Lihat Program
            </button>
            <button className="bg-transparent border border-white/60 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm w-full sm:w-auto">
              Hubungi Kami
            </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default TentangKami;