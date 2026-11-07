import React from 'react'
import AccrodionGallery from '../../components/AccrodionGallery'
import showcaseJurusan from './data/showcaseJurusan'

const Jurusan = () => {
  return (
    <>
      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-linear-to-b from-[#d8e2ff] to-[#f8fafc] px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d9d9d9 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-40 z-0 h-[470px] w-[430px] rounded-bl-[170px] bg-[#d9d9d9] sm:-right-24 sm:-top-52 lg:h-[560px] lg:w-[510px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-4">
            <div className="flex max-w-xl flex-col items-start lg:col-span-7">
              <nav
                aria-label="Breadcrumb"
                className="mb-3 flex items-center gap-2 text-sm font-medium tracking-wide md:text-[15px]"
              >
                <span className="text-slate-500">Program</span>
                <span className="text-xs font-bold text-slate-800 md:text-sm">
                  &gt;
                </span>
                <span className="font-semibold text-[#0075FF]">Profil Jurusan</span>
              </nav>

              <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0075FF] sm:text-5xl lg:text-[54px]">
                Profil Jurusan
              </h1>

              <p className="mb-8 max-w-[440px] text-left text-sm leading-relaxed text-slate-700 sm:text-base lg:text-[16px]">
                SMK Negeri 26 Jakarta menyediakan berbagai program keahlian untuk
                mengembangkan potensi dan kompetensi siswa. Setiap jurusan dirancang
                untuk membekali siswa dengan keterampilan, pengalaman, dan sikap
                profesional yang sesuai dengan kebutuhan dunia kerja.
              </p>

              <button className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0075FF] px-7 py-3 text-[15px] font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-[#0062db] hover:shadow-blue-500/40 active:scale-[0.98]">
                <span>Jelajahi</span>
                <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </button>
            </div>

            <div className="pointer-events-none relative hidden h-64 select-none items-center justify-center lg:col-span-5 lg:flex">
              <span
                aria-hidden="true"
                className="font-montserrat text-[210px] font-extrabold leading-none text-transparent"
                style={{ WebkitTextStroke: '1px #74a9ff' }}
              >
                26
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col min-h-screen w-full items-center overflow-hidden bg-linear-to-b px-4 sm:px-10 lg:px-16 pb-16 pt-24 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="title flex w-full flex-col items-center justify-center gap-3 sm:gap-4 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat text-center text-tertiary font-black leading-tight">
            Program Keahlian <span className="text-secondary">SMK Negeri 26 Jakarta</span>
          </h1>
        </div>

        <div className="w-full max-w-6xl p-4 sm:p-6 md:p-8 bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 mt-6 sm:mt-10 lg:mt-12">
          <AccrodionGallery items={showcaseJurusan} defaultIndex={0} />
        </div>
      </section>
    </>
  )
}
export default Jurusan