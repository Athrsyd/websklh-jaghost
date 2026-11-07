import React, { useState } from 'react'
import DepthCarousel from '../../components/DepthCarousel'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import juniorTechnicalSupport from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_junior_technical_support-A7lHgBLSzv0AOMZy.pdf'
import tukangBangunanGedung from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_tukang_bangunan_gedung-1kugtkpl7KIvmcJN.pdf'
import operatorMesinBubut from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_operator_mesin_bubut-o1To4U4xKbBZycHm.pdf'
import operatorPerkakasMesin from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_operator_perkakas_mesin-NiKzuNunGLtmTT2T.pdf'
import assemblingOperator from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_assembling_operator-IJEbXPSiM3kq5xB6.pdf'
import solderingOperator from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_soldering_operator-bt3SW76OgfJ4jSGz (1).pdf'
import perakitPeralatanElektronik from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_perakit_peralatan_elektronik-7phzxq7sn8R1BvK4.pdf'
import pelaksanaMadya from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_pelaksana_madya_pemeliharaan_instrumen_control_berbasis_plc-vsNWfftx8rYGDFmr.pdf'
import operatorPemasanganInstalasi from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_operator_pemasangan_instalasi_listrik-aPuwswH8655L9EOW.pdf'
import engineJuniorTechnician from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_engine_junior_technician-wlNtJAywp7ecEOQ9.pdf'
import chassisSuspension from '../../assets/skemaUjiKom/skema_sertifikasi_okupasi_chassis_suspension_junior_technician-7yadYmeNl6HDiePC.pdf'

const LSP = () => {

  const misi = [
    'Melaksanakan sertifikasi secara objektif dan independen',
    'Mengembangkan SDM LSP di bidang pelaksanaan sertifikasi',
    'Mengembangkan sarana dan prasarana pelaksanaan sertifikasi yang terstandar',
    'Mengembangkan manajemen dan tata kelola LSP',
    'Mengembangkan sistem informasi'
  ]

  const skemaSertifikasi = [
    ['Skema Sertifikasi Okupasi Junior Technical Support', juniorTechnicalSupport],
    ['Skema Sertifikasi Okupasi Tukang Bangunan Gedung', tukangBangunanGedung],
    ['Skema Sertifikasi Okupasi Operator Mesin Bubut', operatorMesinBubut],
    ['Skema Sertifikasi Okupasi Operator Perkakas Mesin', operatorPerkakasMesin],
    ['Skema Sertifikasi Okupasi Assembling Operator', assemblingOperator],
    ['Skema Sertifikasi Okupasi Soldering Operator', solderingOperator],
    ['Skema Sertifikasi Okupasi Perakit Peralatan Elektronik', perakitPeralatanElektronik],
    ['Skema Sertifikasi Okupasi Pelaksana Madya Pemeliharaan Instrumen Control Berbasis PLC', pelaksanaMadya],
    ['Skema Sertifikasi Okupasi Operator Pemasangan Instalasi Listrik', operatorPemasanganInstalasi],
    ['Skema Sertifikasi Okupasi Engine Junior Technician', engineJuniorTechnician],
    ['Skema Sertifikasi Okupasi Chassis Suspension Junior Technician', chassisSuspension]
  ]

  const [activeSkema, setActiveSkema] = useState(0)

  const changeSkema = (direction) => {
    setActiveSkema((current) => (current + direction + skemaSertifikasi.length) % skemaSertifikasi.length)
  }


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
            UJI <span className="text-[#0075FF]">KOMPETENSI,</span> <br />
            BUKTI DARI <span className="text-tertiary">KEAHLIAN</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins pr-0 sm:pr-12 lg:pr-100 text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 tracking-wide">
            Lembaga Sertifikasi Profesi SMK Negeri 26 Jakarta mendukung pengakuan kompetensi siswa sesuai bidang keahliannya.
          </p>
          <button className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full mt-4 bg-[#0075FF] px-7 py-3 text-[15px] font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-[#0062db] hover:shadow-blue-500/40 active:scale-[0.98]">
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

      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center bg-white min-h-[auto] lg:min-h-screen w-full px-6 sm:px-10 lg:px-18 py-14 lg:py-20 gap-10 lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          <div className="">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              <span className="text-primary">Lembaga</span>
              <br className="hidden sm:inline" />{" "}
              <span className="text-secondary">Sertifikasi</span>
              <br className="hidden sm:inline" />{" "}
              <span className="text-tertiary">Profesi — P1</span>
            </h1>
          </div>
          <div className="text-base sm:text-lg lg:text-xl text-slate-600 mt-4 sm:mt-5 max-w-xl mx-auto lg:mx-0">
            <p>SMK Negeri 26 Jakarta memiliki Lembaga Sertifikasi Profesi yang menjadi bagian dari proses sertifikasi kompetensi sesuai bidang keahlian.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 pl-0 lg:pl-16 flex justify-center overflow-hidden h-[340px] sm:h-[420px] lg:h-[550px]">
          <DepthCarousel cardWidth={520} cardHeight={400} />
        </div>
      </section>

      <section className='w-full bg-accent flex flex-col md:flex-row justify-center gap-8 md:gap-14 lg:gap-28 items-start px-6 sm:px-12 lg:px-24 py-12 lg:py-16 text-primary'>
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col border-l-4 sm:border-l-2 border-primary p-4 sm:p-5 bg-white/40 md:bg-transparent rounded-r-xl md:rounded-none">
          <h1 className='uppercase font-bold text-2xl sm:text-3xl lg:text-4xl' >Visi</h1>
          <p className='text-slate-600 mt-2 text-sm sm:text-base'>Menjadi lembaga sertifikasi profesi yang terpercaya dan professional untuk memastikan kompetensi peserta didik yang diakui dunia kerja di tingkat nasional maupun internasional</p>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col border-l-4 sm:border-l-2 border-primary p-4 sm:p-5 bg-white/40 md:bg-transparent rounded-r-xl md:rounded-none">
          <h1 className='uppercase font-bold text-2xl sm:text-3xl lg:text-4xl'>Misi</h1>
          <ul className="mt-2 space-y-1">
            {misi.map((item, index) => (
              <li key={index} className='text-slate-600 list-decimal ml-5 text-sm sm:text-base'>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full bg-[#032544] px-4 sm:px-10 lg:px-20 py-12 sm:py-14 lg:py-16 text-white">
        <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
          <h2 className="font-montserrat text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            SKEMA SERTIFIKASI
          </h2>
          <p className="mt-2 font-poppins text-xs sm:text-xs lg:text-sm text-white/85">
            Daftar skema kompetensi yang diujikan di LSP-P1 SMK Negeri 26 Jakarta.
          </p>

          <div className="mt-7 border-t border-white/20 px-0 sm:px-4 lg:px-8">
            {skemaSertifikasi.map((skema, index) => (
              <a
                key={skema[0]}
                href={skema[1]}
                download
                title={`Klik untuk mengunduh ${skema[0]}`}
                aria-label={`Klik untuk mengunduh ${skema[0]}`}
                className="grid group grid-cols-[34px_minmax(0,1fr)_24px] items-center gap-2 border-b border-white/20 py-2 sm:grid-cols-[42px_minmax(0,1fr)_28px] sm:gap-4 sm:py-2.5"
              >
                <span className="font-poppins text-md text-white/85 sm:text-lg font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-montserrat text-[15px] font-bold leading-tight sm:text-base lg:text-lg">
                  {skema[0]}
                </span>
                <span className="flex duration-300 group-hover:scale-105 size-4 items-center justify-center rounded-full bg-transparent group-hover:bg-white group-hover:text-primary transition-all ease-in-out text-white sm:size-4.5">
                  <Download size={12} strokeWidth={3} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-montserrat text-3xl font-bold tracking-tight text-[#062443] sm:text-4xl lg:text-5xl">
              Uji <span className="text-[#1687ff]">Sertifikasi</span>{' '}
              <span className="text-tertiary">Kompetensi</span>
            </h2>
            <p className="mt-2 font-poppins text-[10px] text-slate-500 sm:text-xs">
              Dokumentasi kegiatan uji sertifikasi kompetensi di SMK Negeri 26 Jakarta.
            </p>
          </div>

          <div className="relative mt-9 flex items-center justify-center gap-3 sm:mt-10 sm:gap-5 lg:gap-12">
            <button
              type="button"
              onClick={() => changeSkema(-1)}
              aria-label="Skema sertifikasi sebelumnya"
              className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1687ff] text-[#1687ff] transition hover:bg-[#1687ff] hover:text-white sm:size-11"
            >
              <ArrowLeft size={27} strokeWidth={2.5} />
            </button>

            <div className="grid min-w-0 flex-1 max-w-4xl grid-cols-1 gap-3 sm:grid-cols-[1.15fr_0.85fr] sm:grid-rows-2 sm:gap-3">
              {[0, 1, 2].map((offset) => {
                const index = (activeSkema + offset) % skemaSertifikasi.length
                const [title, file] = skemaSertifikasi[index]
                const isFeatured = offset === 0

                return (
                  <a
                    key={`${activeSkema}-${offset}`}
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Klik untuk mengunduh ${title}`}
                    aria-label={`Klik untuk mengunduh ${title}`}
                    className={`group relative flex min-h-24 overflow-hidden rounded-[20px] bg-[#d9d9d9] p-5 text-[#062443] transition hover:bg-[#cfcfcf] sm:p-6 ${
                      isFeatured ? 'sm:row-span-2 sm:min-h-48' : 'sm:min-h-24'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-4">
                      <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Skema {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`max-w-md font-montserrat font-bold leading-tight ${isFeatured ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                        {title.replace('Skema Sertifikasi Okupasi ', '')}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => changeSkema(1)}
              aria-label="Skema sertifikasi berikutnya"
              className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1687ff] text-[#1687ff] transition hover:bg-[#1687ff] hover:text-white sm:size-11"
            >
              <ArrowRight size={27} strokeWidth={2.5} />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-1.5" aria-label="Pilih skema sertifikasi">
            {skemaSertifikasi.map(([title], index) => (
              <button
                key={title}
                type="button"
                onClick={() => setActiveSkema(index)}
                aria-label={`Tampilkan skema ${index + 1}`}
                aria-current={activeSkema === index ? 'true' : undefined}
                className={`size-2.5 rounded-full transition sm:size-3 ${activeSkema === index ? 'bg-[#1687ff]' : 'bg-[#d9d9d9] hover:bg-[#9fcfff]'}`}
              />
            ))}
          </div>
        </div>
      </section>

    </>

  )
}

export default LSP