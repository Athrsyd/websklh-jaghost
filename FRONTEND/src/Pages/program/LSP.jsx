import React from 'react'
import DepthCarousel from '../../components/DepthCarousel'

const LSP = () => {

  const misi = [
    'Melaksanakan sertifikasi secara objektif dan independen',
    'Mengembangkan SDM LSP di bidang pelaksanaan sertifikasi',
    'Mengembangkan sarana dan prasarana pelaksanaan sertifikasi yang terstandar',
    'Mengembangkan manajemen dan tata kelola LSP',
    'Mengembangkan sistem informasi'
  ]


  return (
    <>
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full my-auto">
          {/* Badge */}
          <div className="mb-5 sm:mb-6">
            <span className="inline-block bg-tertiary text-white px-8 sm:px-9 py-1 sm:py-1.25 rounded-t-full rounded-br-full text-md sm:text-base md:text-xl font-medium tracking-wide shadow-sm">
              Tentang Lembaga Sertifikasi Profesi
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-montserrat font-black  text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-primary leading-[1.04] tracking-tight mb-3 sm:mb-4">
            UJI <span className="text-[#0075FF]">KOMPETENSI</span>, <br />
            BUKTI DARI <span className="text-tertiary">KEAHLIAN</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins pr-100 text-sm sm:text-md md:text-lg lg:text-xl text-slate-600 tracking-wide">
            Lembaga Sertifikasi Profesi SMK Negeri 26 Jakarta <br /> mendukung pengakuan kompetensi siswa sesuai bidang <br /> keahliannya.
          </p>
          <button className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full mt-2 bg-[#0075FF] px-7 py-3 text-[15px] font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-[#0062db] hover:shadow-blue-500/40 active:scale-[0.98]">
            <span>Lihat Skema Sertifikasi</span>
            <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 flex justify-center items-center pt-6">

        </div>
      </section>

      <section className="container flex flex-row justify-between items-center bg-white min-h-screen w-full px-18">
        <div className="w-1/2 flex flex-col">
          <div className="">
            <h1 className="text-5xl font-black ">
              <span className="text-primary">Lembaga</span>
              <br />
              <span className="text-secondary">Sertifikasi</span>
              <br />
              <span className="text-tertiary">Profesi — P1</span>
            </h1>
          </div>
          <div className="text-xl text-slate-600 mt-5">
            <p>SMK Negeri 26 Jakarta memiliki Lembaga Sertifikasi Profesi yang menjadi bagian dari proses sertifikasi kompetensi sesuai bidang keahlian.</p>
          </div>
        </div>
        <div className="pl-16 w-1/2">
          <DepthCarousel />
        </div>
      </section>

      <section className='container flex flex-row bg-accent justify-center gap-28 items-start px-24 py-12 text-primary'>
        <div className="w-2/5 flex flex-col border-l-2 border-primary p-4">
          <h1 className='uppercase font-bold text-4xl' >Visi</h1>
          <p className='text-slate-600'>Menjadi lembaga sertifikasi profesi yang terpercaya dan professional untuk memastikan kompetensi peserta didik yang diakui dunia kerja di tingkat nasional maupun internasional</p>
        </div>
        <div className="w-2/5 flex flex-col border-l-2 border-primary p-4">
          <h1 className='uppercase font-bold text-4xl'>Misi</h1>
          <ul>
            {misi.map((item, index) => (
              <li key={index} className='text-slate-600 list-decimal ml-5'>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>

  )
}

export default LSP