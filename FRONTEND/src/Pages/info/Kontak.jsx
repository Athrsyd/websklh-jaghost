import React from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io5'
import depanSekolah from '../../assets/depanSekolah.jpeg'

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.522482086522!2d106.88731419999999!3d-6.1945787999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f49532b5b715%3A0xa4012b68ec698d4e!2sSMK%20Negeri%2026%20Jakarta!5e0!3m2!1sid!2sid!4v1786606693578!5m2!1sid!2sid'

const Kontak = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-white text-primary">
      <section className="relative flex h-127.25 items-center justify-center overflow-hidden sm:h-141.25 lg:h-150">
        <img
          src={depanSekolah}
          alt="Gedung SMK Negeri 26 Jakarta"
          className="absolute inset-be-22 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75 flex " />
        <div className=" flex flex-col relative bottom-10 z-10 justify-center items-center gap-8 text-center">

          <h1 className=" px-5 text-center font-montserrat text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Kontak Kami
          </h1>
          <div className="bg-white rounded-full w-32 sm:w-60 md:w-120 max-w-[80vw] h-1"></div>
        </div>
      </section>

      <section className="relative bg-white pb-0 pt-0 ">
        <div className="relative -top-20 z-10 mx-auto -mt-29 max-w-5xl px-5 sm:-mt-20 sm:px-8 lg:-mt-24">
          <div className="grid overflow-hidden rounded-xl bg-[#a9cef4] shadow-[0_2px_5px_rgba(0,0,0,0.28)] md:grid-cols-2">

            <div className="px-7 py-8 sm:px-10 sm:py-10 flex flex-col gap-10">
              <div className="">
                <h2 className="mb-6 font-poppins text-xl font-extrabold uppercase text-tertiary sm:text-xl">
                  Mari saling terhubung
                </h2>

                <div className="space-y-5 font-poppins">
                  <div className="flex gap-3 flex-row items-center">
                    <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-tertiary">
                      <MapPin className="text-white" size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-md font-bold">Alamat</h3>
                      <p className="mt-1 max-w-75.5 text-sm leading-relaxed text-[#24415c]">
                        Jl. Balai Pustaka Baru I No.2, RT.2/RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-row items-center">
                    <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-tertiary">
                      <Phone className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-md font-bold">No. Telepon / Fax</h3>
                      <p className="mt-1 text-sm text-[#24415c]">(021) 475 1523</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-row items-center">
                    <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-tertiary">
                      <Mail className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-md font-bold">Email</h3>
                      <p className="mt-1 text-sm text-[#24415c]">info@smkn26jakarta.sch.id</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="">
                <h2 className="mb-3 mt-8 font-poppins text-xl font-extrabold uppercase text-tertiary ">
                  Ikuti sosial media kami
                </h2>
                <div className="flex gap-4">
                  {[IoLogoFacebook, IoLogoInstagram, IoLogoYoutube, IoLogoLinkedin].map((Icon, index) => (

                    <a
                      key={index}
                      href="#"
                      aria-label={`Sosial media ${index + 1}`}
                      className="flex size-8 items-center justify-center rounded-full bg-tertitext-tertiar bg-tertiary hover:scale-105 text-white transition hover:bg-primary"
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#8bb8e8] px-7 py-8 sm:px-10 sm:py-10 md:border-l md:border-t-0">
              <h2 className="font-poppins text-xl   font-extrabold uppercase text-tertiary ">
                Tinggalkan pesan Anda di sini
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#24415c]">
                Punya pertanyaan atau ingin mengetahui lebih lanjut? Kirimkan pesan kepada kami.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama lengkap"
                  aria-label="Nama lengkap"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-md text-primary outline-none placeholder:text-[#4d7196] focus:border-tertitext-tertiary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat email"
                  aria-label="Alamat email"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-md text-primary outline-none placeholder:text-[#4d7196] focus:border-tertitext-tertiary"
                  required
                />
                <input
                  type="text"
                  name="subjek"
                  placeholder="Subjek"
                  aria-label="Subjek pesan"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-md text-primary outline-none placeholder:text-[#4d7196] focus:border-tertitext-tertiary"
                />
                <textarea
                  name="pesan"
                  rows="3"
                  placeholder="Pesan Anda"
                  aria-label="Pesan Anda"
                  className="w-full resize-none border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-md text-primary outline-none placeholder:text-[#4d7196] focus:border-tertitext-tertiary"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-tertiary rounded-full bg-tertitext-tertiary px-4 py-2 text-md font-bold uppercase text-white transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-tertitext-tertiary focus:ring-offset-2 focus:ring-offset-[#a9cef4]"
                >
                  Kirim pesan
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="h-97.5 w-full sm:h-107.5 lg:h-127.5">
          <iframe
            title="Lokasi SMK Negeri 26 Jakarta"
            src={mapUrl}
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </main>
  )
}

export default Kontak