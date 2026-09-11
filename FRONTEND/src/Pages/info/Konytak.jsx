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
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-[#062443]">
      <section className="relative flex h-[310px] items-center justify-center overflow-hidden sm:h-[365px] lg:h-[400px]">
        <img
          src={depanSekolah}
          alt="Gedung SMK Negeri 26 Jakarta"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#001f3f]/75" />
        <h1 className="relative z-10 px-5 text-center font-montserrat text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          Kontak Kami
        </h1>
      </section>

      <section className="relative bg-white pb-0 pt-0">
        <div className="relative z-10 mx-auto -mt-14 max-w-5xl px-5 sm:-mt-20 sm:px-8 lg:-mt-24">
          <div className="grid overflow-hidden rounded-xl bg-[#a9cef4] shadow-[0_2px_5px_rgba(0,0,0,0.28)] md:grid-cols-2">
            <div className="px-7 py-8 sm:px-10 sm:py-10">
              <h2 className="mb-6 font-poppins text-[10px] font-extrabold uppercase text-[#ff5733] sm:text-xs">
                Mari saling terhubung
              </h2>

              <div className="space-y-5 font-poppins">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-[#ff5733]" size={18} strokeWidth={2.5} />
                  <div>
                    <h3 className="text-xs font-bold">Alamat</h3>
                    <p className="mt-1 max-w-[230px] text-[9px] leading-relaxed text-[#24415c]">
                      Jl. Balai Pustaka Baru I, Rawamangun, Jakarta Timur, DKI Jakarta 13220
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="mt-0.5 shrink-0 text-[#ff5733]" size={18} strokeWidth={2.5} />
                  <div>
                    <h3 className="text-xs font-bold">No. Telepon / Fax</h3>
                    <p className="mt-1 text-[9px] text-[#24415c]">(021) 475 1523</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Mail className="mt-0.5 shrink-0 text-[#ff5733]" size={18} strokeWidth={2.5} />
                  <div>
                    <h3 className="text-xs font-bold">Email</h3>
                    <p className="mt-1 text-[9px] text-[#24415c]">info@smkn26jakarta.sch.id</p>
                  </div>
                </div>
              </div>

              <h2 className="mb-3 mt-8 font-poppins text-[10px] font-extrabold uppercase text-[#ff5733] sm:text-xs">
                Ikuti sosial media kami
              </h2>
              <div className="flex gap-2">
                {[IoLogoFacebook, IoLogoInstagram, IoLogoYoutube, IoLogoLinkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={`Sosial media ${index + 1}`}
                    className="flex size-6 items-center justify-center rounded-full bg-[#ff5733] text-white transition hover:bg-[#062443]"
                  >
                    <Icon size={12} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-[#8bb8e8] px-7 py-8 sm:px-10 sm:py-10 md:border-l md:border-t-0">
              <h2 className="font-poppins text-[10px] font-extrabold uppercase text-[#ff5733] sm:text-xs">
                Tinggalkan pesan Anda di sini
              </h2>
              <p className="mt-1 text-[9px] leading-relaxed text-[#24415c]">
                Punya pertanyaan atau ingin mengetahui lebih lanjut? Kirimkan pesan kepada kami.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama lengkap"
                  aria-label="Nama lengkap"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-[10px] text-[#062443] outline-none placeholder:text-[#4d7196] focus:border-[#ff5733]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat email"
                  aria-label="Alamat email"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-[10px] text-[#062443] outline-none placeholder:text-[#4d7196] focus:border-[#ff5733]"
                  required
                />
                <input
                  type="text"
                  name="subjek"
                  placeholder="Subjek"
                  aria-label="Subjek pesan"
                  className="w-full border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-[10px] text-[#062443] outline-none placeholder:text-[#4d7196] focus:border-[#ff5733]"
                />
                <textarea
                  name="pesan"
                  rows="3"
                  placeholder="Pesan Anda"
                  aria-label="Pesan Anda"
                  className="w-full resize-none border-b border-[#6b9ed2] bg-transparent px-0 py-2 text-[10px] text-[#062443] outline-none placeholder:text-[#4d7196] focus:border-[#ff5733]"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff5733] px-4 py-2 text-[10px] font-bold uppercase text-white transition hover:bg-[#062443] focus:outline-none focus:ring-2 focus:ring-[#ff5733] focus:ring-offset-2 focus:ring-offset-[#a9cef4]"
                >
                  Kirim pesan
                  <Send size={12} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="h-[350px] w-full sm:h-[430px] lg:h-[510px]">
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