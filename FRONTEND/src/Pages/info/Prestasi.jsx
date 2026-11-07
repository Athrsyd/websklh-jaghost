import React from 'react'
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../../components/ScrollReveal'

const Prestasi = () => {
  return (
    <>
      <section className="w-full relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 bg-linear-to-b from-side-back to-[#F8FAFC]">
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
        <ScrollReveal direction="up" duration={0.6} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full my-auto">
          {/* Badge */}
          <div className="mb-5 sm:mb-6">
            <span className="inline-block bg-tertiary text-white px-8 sm:px-9 py-1 sm:py-1.25 rounded-t-full rounded-br-full text-md sm:text-base md:text-xl font-medium tracking-wide shadow-sm">
              Prestasi Siswa & Sekolah
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-montserrat font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] text-primary leading-[1.04] tracking-tight mb-3 sm:mb-4">
            SETIAP <span className="text-tertiary">PENCAPAIAN</span> <br />
            DIMULAI DARI <span className="text-secondary">KEBERANIAN</span>
          </h1>

          {/* Subtitle */}
          <p className="font-poppins pr-0 sm:pr-12 lg:pr-100 text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 tracking-wide">
            Merayakan perjalanan siswa SMK Negeri 26 Jakarta dalam berkarya, berkompetisi, dan mengukir prestasi.
          </p>
        </ScrollReveal>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 flex justify-center items-center pt-6"></div>
      </section>

      <section className="relative w-full bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-11">
        <div className="mx-auto flex max-w-300 flex-col items-center">
          <ScrollReveal direction="up" duration={0.5} className="text-center">
            <h2 className="font-montserrat text-3xl font-bold leading-none text-primary sm:text-5xl lg:text-[42px]">
              Arsip <span className="text-secondary">Prestasi</span>
            </h2>
            <p className="mt-3 font-poppins text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
              Dokumentasi berbagai pencapaian dan momen membanggakan siswa SMK Negeri 26 Jakarta.
            </p>
          </ScrollReveal>

          <ScrollStagger className="mt-6 w-full max-w-5xl grid grid-cols-2 gap-4 sm:mt-7 sm:grid-cols-4 sm:gap-5 lg:mt-6 lg:gap-6" staggerDelay={0.05}>
            {Array.from({ length: 8 }, (_, index) => (
              <ScrollStaggerItem
                key={index}
                aria-label={`Dokumentasi prestasi ${index + 1}`}
                className="aspect-[0.8] w-full rounded-[25px] bg-[#D9D9D9] sm:aspect-[0.795] sm:rounded-[26px]"
              />
            ))}
          </ScrollStagger>

          <ScrollReveal direction="up" delay={0.1} duration={0.5}>
            <button
              type="button"
              className="mt-6 rounded-full border border-[#68809A] px-5 py-2 font-poppins text-[10px] font-medium text-primary transition-colors hover:bg-primary hover:text-white sm:mt-7 sm:px-6 sm:py-2.5 sm:text-[11px] cursor-pointer"
            >
              Lihat Lebih Banyak Prestasi
            </button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

export default Prestasi
