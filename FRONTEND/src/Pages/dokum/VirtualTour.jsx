import React from 'react'
import depanSekolah from '../../assets/depanSekolah.jpeg'

const VirtualTour = () => {
  return (
    <>
      <section className='min-h-screen bg-primary'>
        <div className='w-full h-screen relative'>
          <img src={depanSekolah} alt="Depan Sekolah" className="w-full h-full opacity-20
           object-cover shadow-[inset_700px_0_250px_0_rgba(0,0,0,0.40)]" />
        </div>

        <div className="absolute top-14 left-0 w-full h-full gap-8 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className='font-black uppercase text-6xl'>Telusuri ruang <span className='text-tertiary'>BELAJAR,</span> <br />
            <span className='text-secondary'>BERKARYA</span> DENGAN MENGIKUTI <br />
            JEJAK PARA <span className='text-[#FF8A8A]'>PEMBANGUN</span> PRESTASI</h1>

          <h2 className='text-2xl font-bold'>School Tour 360°</h2>

          <button className='bg-white text-primary mt-8 hover:bg-gray-200 font-bold py-2 px-4 rounded-full'>
            LIHAT SEKOLAH
          </button>
          <span className='animate-bounce'>
            <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="25" viewBox="0 0 25 50" fill="none">
              <path d="M25 12.5002C25.0007 14.8453 24.3417 17.1434 23.0983 19.1317C21.855 21.12 20.0774 22.7185 17.9688 23.7445V20.1162C19.5804 18.9587 20.7832 17.3197 21.4041 15.435C22.0251 13.5504 22.032 11.5173 21.4241 9.62848C20.8161 7.73962 19.6245 6.09237 18.0209 4.92383C16.4172 3.75528 14.4842 3.1257 12.5 3.1257C10.5158 3.1257 8.58276 3.75528 6.97911 4.92383C5.37545 6.09237 4.1839 7.73962 3.57593 9.62848C2.96796 11.5173 2.97494 13.5504 3.59586 15.435C4.21678 17.3197 5.41962 18.9587 7.03125 20.1162V23.7414C5.02446 22.765 3.31566 21.2691 2.08231 19.409C0.848964 17.549 0.136053 15.3927 0.0176177 13.164C-0.100818 10.9353 0.37954 8.7156 1.4088 6.73532C2.43807 4.75504 3.9787 3.08644 5.87071 1.90281C7.76271 0.719179 9.93708 0.0636879 12.168 0.00441094C14.3989 -0.054866 16.605 0.484233 18.5572 1.56572C20.5094 2.64721 22.1365 4.23164 23.2694 6.15447C24.4024 8.0773 24.9999 10.2684 25 12.5002ZM10.8438 49.3145C11.2832 49.7535 11.8789 50 12.5 50C13.1211 50 13.7168 49.7535 14.1562 49.3145L21.9687 41.5016C22.199 41.2871 22.3837 41.0283 22.5118 40.7408C22.6399 40.4533 22.7088 40.1429 22.7143 39.8282C22.7199 39.5135 22.662 39.2009 22.5441 38.909C22.4263 38.6172 22.2508 38.3521 22.0282 38.1295C21.8057 37.9069 21.5406 37.7315 21.2487 37.6136C20.9569 37.4957 20.6443 37.4378 20.3296 37.4433C20.0149 37.4489 19.7046 37.5178 19.4171 37.6459C19.1296 37.774 18.8708 37.9587 18.6563 38.189L14.8438 42.0017V11.7189C14.8438 11.0973 14.5968 10.5011 14.1573 10.0616C13.7177 9.62201 13.1216 9.37507 12.5 9.37507C11.8784 9.37507 11.2823 9.62201 10.8427 10.0616C10.4032 10.5011 10.1563 11.0973 10.1563 11.7189V42.0017L6.34375 38.189C5.89945 37.775 5.31181 37.5496 4.70462 37.5603C4.09743 37.571 3.5181 37.817 3.08868 38.2464C2.65927 38.6759 2.41329 39.2552 2.40258 39.8624C2.39187 40.4697 2.61725 41.0573 3.03125 41.5016L10.8438 49.3145Z" fill="#FF5733" fill-opacity="0.75" />
            </svg>
          </span>
        </div>
      </section>

      <section className="relative flex min-h-155 w-full items-center justify-center overflow-hidden bg-[#fdfdfd] px-5 py-16 sm:min-h-[720px] sm:px-10 lg:min-h-[820px] lg:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: 'radial-gradient(circle, #ff5733 1.15px, transparent 1.15px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="absolute left-1/2 top-4 -translate-x-1/2 font-montserrat text-[clamp(5rem,17vw,13rem)] font-black leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#1687ff] sm:top-3 sm:left-8 sm:translate-x-0">
          360°
        </div>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-montserrat text-[clamp(5rem,17vw,13rem)] font-black leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#1687ff] sm:bottom-0 sm:left-4 sm:translate-x-0">
          TOUR
        </div>

        <div className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 font-montserrat text-[clamp(4.5rem,14vw,11rem)] font-black leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_#1687ff] sm:right-[-3.5rem]">
          SCHOOL
        </div>

        <div className="relative z-10 flex w-full max-w-172.5 flex-col items-center">
          <div className="w-full rounded-[20px] bg-tertiary p-2 shadow-[20px_20px_0_#032544] sm:rounded-3xl  ">
            <div id="school-tour-frame" className="aspect-[1.65/1] overflow-hidden rounded-3xl border-14 border-tertiary bg-[#d9d9d9] sm:border-16">
              <iframe
                src="https://app.lapentor.com/sphere/smkn-26-1602643278?scene=5f87dd1c362df77f177c1f53"
                title="Virtual Tour SMKN 26 Jakarta"
                className="h-full w-full border-0"
                allow="fullscreen; autoplay; gyroscope; accelerometer"
                allowFullScreen
              />
            </div>
          </div>

          <a href="https://app.lapentor.com/sphere/smkn-26-1602643278?scene=5f87dd1c362df77f177c1f53" target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              className="mt-10 rounded-full bg-[#032544] px-5 py-2 font-montserrat text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_4px_0_#ff5733] transition hover:-translate-y-0.5 hover:bg-tertiary hover:shadow-[0_4px_0_#032544] focus:outline-none focus:ring-2 focus:ring-[#1687ff] focus:ring-offset-2 sm:mt-12 sm:px-6 sm:py-2.5 sm:text-xs"
            >
              Lihat lebih besar
            </button>
          </a>
        </div>
      </section>
    </>
  )
}

export default VirtualTour