import React from 'react'
import { ArrowRight, Mail, MapPin, PhoneCall } from 'lucide-react'


const BKK = () => {

  const dataPelayanan = [
    {
      untuk: "Alumni",
      keterangan: 'Informasi karier, lowongan kerja, dan pengembangan diri untuk alumni SMKN 26 Jakarta.',
      imgUrl: ''
    },
    {
      untuk: "Siswa",
      keterangan: 'Akses informasi lowongan kerja dan rekrutmen dari berbagai mitra.',
      imgUrl: ''
    },
    {
      untuk: "Perusahaan",
      keterangan: 'Temukan talenta terbaik dari informasi rekrutmen melalui kerja sama dengan BKK SMKN 26 Jakarta.',
      imgUrl: ''
    },
  ];


  const dataBkk = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="60" height="67" viewBox="0 0 60 67" fill="none">
        <path d="M30 0C20.8 0 13.3333 7.46667 13.3333 16.6667V20H3.33333C1.5 20 0 21.5 0 23.3333V60C0 63.6667 3 66.6667 6.66667 66.6667H53.3333C57 66.6667 60 63.6667 60 60V23.3333C60 21.5 58.5 20 56.6667 20H46.6667V16.6667C46.6667 7.46667 39.2 0 30 0ZM20 16.6667C20 11.1667 24.5 6.66667 30 6.66667C35.5 6.66667 40 11.1667 40 16.6667V20H20V16.6667ZM53.3333 26.6667V60H6.66667V26.6667H53.3333Z" fill="#007AFF" />
      </svg>,
      title: 'Informasi Lowongan Kerja',
      description: 'Dapatkan informasi peluang kerja terbaru dari berbagai perusahaan dari bidang industri.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="67" height="54" viewBox="0 0 67 54" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 18.2657C23.266 18.2657 24.0246 18.1154 24.7323 17.8233C25.4401 17.5312 26.0831 17.1031 26.6248 16.5634C27.1665 16.0238 27.5961 15.3831 27.8893 14.678C28.1824 13.9728 28.3333 13.2171 28.3333 12.4539C28.3333 11.6907 28.1824 10.9349 27.8893 10.2298C27.5961 9.52467 27.1665 8.88398 26.6248 8.34431C26.0831 7.80463 25.4401 7.37653 24.7323 7.08446C24.0246 6.79239 23.266 6.64207 22.5 6.64207C20.9529 6.64207 19.4692 7.25438 18.3752 8.34431C17.2812 9.43423 16.6667 10.9125 16.6667 12.4539C16.6667 13.9953 17.2812 15.4735 18.3752 16.5634C19.4692 17.6534 20.9529 18.2657 22.5 18.2657ZM22.5 24.9077C24.1415 24.9077 25.767 24.5856 27.2835 23.9598C28.8001 23.3339 30.1781 22.4165 31.3388 21.2601C32.4996 20.1036 33.4203 18.7307 34.0485 17.2198C34.6767 15.7088 35 14.0893 35 12.4539C35 10.8184 34.6767 9.19896 34.0485 7.68798C33.4203 6.17701 32.4996 4.8041 31.3388 3.64766C30.1781 2.49121 28.8001 1.57386 27.2835 0.947995C25.767 0.322129 24.1415 -2.43703e-08 22.5 0C19.1848 4.92181e-08 16.0054 1.3121 13.6612 3.64766C11.317 5.98321 10 9.1509 10 12.4539C10 15.7568 11.317 18.9245 13.6612 21.2601C16.0054 23.5956 19.1848 24.9077 22.5 24.9077ZM4.22 34.9605C7.21667 30.8125 11.7833 28.2288 17.62 28.2288H29.0467C34.8867 28.2288 39.45 30.8125 42.4467 34.9605C45.3567 38.9889 46.6667 44.2993 46.6667 49.8155C46.6667 50.6963 46.3155 51.541 45.6904 52.1638C45.0652 52.7866 44.2174 53.1365 43.3333 53.1365C42.4493 53.1365 41.6014 52.7866 40.9763 52.1638C40.3512 51.541 40 50.6963 40 49.8155C40 45.2424 38.9 41.4232 37.0333 38.8395C35.2567 36.3753 32.6767 34.8708 29.0467 34.8708H17.62C13.9867 34.8708 11.41 36.3753 9.63 38.8395C7.76667 41.4199 6.66667 45.2424 6.66667 49.8155C6.66667 50.6963 6.31548 51.541 5.69036 52.1638C5.06524 52.7866 4.21739 53.1365 3.33333 53.1365C2.44928 53.1365 1.60143 52.7866 0.976311 52.1638C0.351189 51.541 0 50.6963 0 49.8155C0 44.2993 1.31 38.9889 4.22 34.9605Z" fill="#FF5733" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 49.8155C0 48.9347 0.351189 48.0898 0.976311 47.467C1.60143 46.8442 2.44928 46.4943 3.33333 46.4943H43.2367C44.1207 46.4943 44.9686 46.8442 45.5937 47.467C46.2188 48.0898 46.57 48.9345 46.57 49.8153C46.57 50.6961 46.2188 51.5408 45.5937 52.1637C44.9686 52.7865 44.1207 53.1364 43.2367 53.1364L3.33333 53.1365C2.44928 53.1365 1.60143 52.7866 0.976311 52.1638C0.351189 51.541 0 50.6963 0 49.8155ZM42.9733 6.2002L42.88 6.19355C42.3791 6.16461 41.8823 6.08674 41.3967 5.96108C40.2467 5.65555 39.2133 5.04448 38.7433 3.98507L38.7 3.89208C38.0067 2.33119 38.72 0.461451 40.41 0.172521C42.1188 -0.113741 43.8687 -0.0429058 45.5486 0.380529C47.2284 0.803964 48.8016 1.57075 50.1682 2.63221C51.5347 3.69366 52.6649 5.02661 53.4868 6.54641C54.3088 8.06622 54.8046 9.73969 54.9428 11.4606C55.0811 13.1815 54.8587 14.9122 54.2897 16.5429C53.7208 18.1736 52.8178 19.6687 51.638 20.9331C50.4583 22.1976 49.0275 23.2039 47.4366 23.8881C45.8457 24.5723 44.1294 24.9195 42.3967 24.9076C40.6833 24.8943 39.68 23.1607 40.1167 21.5102L40.1433 21.4105C40.4367 20.288 41.3633 19.5209 42.4433 19.0393C42.9316 18.8243 43.441 18.6607 43.9633 18.5511C45.4272 18.208 46.7192 17.3537 47.6052 16.143C48.4912 14.9324 48.9125 13.4455 48.7928 11.952C48.6731 10.4585 48.0203 9.05711 46.9527 8.00191C45.885 6.9467 44.4733 6.30752 42.9733 6.2002ZM45 31.5496C45 30.6688 45.3512 29.8241 45.9763 29.2013C46.6014 28.5785 47.4493 28.2286 48.3333 28.2286H49.0467C54.8867 28.2286 59.45 30.8124 62.4467 34.9603C65.3567 38.9888 66.6667 44.2991 66.6667 49.8153C66.6667 50.6961 66.3155 51.5408 65.6904 52.1637C65.0652 52.7865 64.2174 53.1364 63.3333 53.1364C62.4493 53.1364 61.6014 52.7865 60.9763 52.1637C60.3512 51.5408 60 50.6961 60 49.8153C60 45.2423 58.9 41.4231 57.0333 38.8393C55.2567 36.3751 52.6767 34.8707 49.0467 34.8707H48.3333C47.4493 34.8707 46.6014 34.5208 45.9763 33.898C45.3512 33.2752 45 32.4304 45 31.5496Z" fill="#FF5733" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M50 49.8158C50 48.935 50.3512 48.0903 50.9763 47.4675C51.6014 46.8446 52.4493 46.4948 53.3333 46.4948H63.2367C64.1207 46.4948 64.9686 46.8446 65.5937 47.4675C66.2188 48.0903 66.57 48.935 66.57 49.8158C66.57 50.6966 66.2188 51.5413 65.5937 52.1641C64.9686 52.7869 64.1207 53.1368 63.2367 53.1368H53.3333C52.4493 53.1368 51.6014 52.7869 50.9763 52.1641C50.3512 51.5413 50 50.6966 50 49.8158Z" fill="#FF5733" />
      </svg>,
      title: 'Informasi Rekrutmen',
      description: 'Informasi mengenai proses rekrutmen, seleksi, hingga kebutuhan tenaga kerja dari perusahaan mitra.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 80 60" fill="none">
        <path d="M45.6044 1.26083C43.8543 0.430666 41.9415 0 40.0044 0C38.0674 0 36.1546 0.430666 34.4044 1.26083L1.91111 16.6542C1.31306 16.9363 0.812433 17.3899 0.472915 17.9574C0.133396 18.5248 -0.0296754 19.1804 0.00444033 19.8408V40.0142C0.00444033 40.8982 0.35563 41.7461 0.980751 42.3712C1.60587 42.9963 2.45372 43.3475 3.33777 43.3475C4.22183 43.3475 5.06967 42.9963 5.6948 42.3712C6.31992 41.7461 6.67111 40.8982 6.67111 40.0142V25.0408L13.3378 28.3475V46.6808C13.3379 47.1193 13.4245 47.5535 13.5926 47.9585C13.7608 48.3634 14.0072 48.7313 14.3178 49.0408L14.4844 49.2008L14.8844 49.5675C15.2178 49.8875 15.7 50.3053 16.3311 50.8208C17.5778 51.8408 19.3778 53.1875 21.6244 54.5408C26.0911 57.2142 32.5178 60.0075 40.0044 60.0075C47.4911 60.0075 53.9244 57.2142 58.3844 54.5408C60.7842 53.0982 63.0431 51.4331 65.1311 49.5675L65.5311 49.2008L65.6844 49.0408H65.6978C66.0079 48.7299 66.2536 48.3608 66.4206 47.9546C66.5876 47.5485 66.6728 47.1133 66.6711 46.6742V28.3408L78.1511 22.6475C78.7123 22.3696 79.1838 21.9392 79.5117 21.4056C79.8396 20.8721 80.0105 20.257 80.005 19.6308C79.9994 19.0046 79.8176 18.3926 79.4802 17.865C79.1429 17.3373 78.6638 16.9154 78.0978 16.6475L45.6044 1.26083ZM45.8178 38.6942L60.0044 31.6542V45.2008L59.4578 45.6675C58.0318 46.8205 56.5283 47.8741 54.9578 48.8208C51.0911 51.1408 45.8511 53.3475 40.0044 53.3475C34.1578 53.3475 28.9244 51.1475 25.0511 48.8208C23.2776 47.7468 21.5903 46.5365 20.0044 45.2008V31.6542L34.1911 38.6942C37.8578 40.5075 42.1511 40.5075 45.8178 38.6942ZM42.7511 7.2875L69.0311 19.7342L42.8511 32.7208C41.9665 33.1602 40.9922 33.3888 40.0044 33.3888C39.0167 33.3888 38.0424 33.1602 37.1578 32.7208L10.9778 19.7342L37.2578 7.2875C38.116 6.87971 39.0543 6.66814 40.0044 6.66814C40.9546 6.66814 41.8929 6.87971 42.7511 7.2875Z" fill="#007AFF" />
      </svg>,
      title: 'Pembekalan Dunia Kerja',
      description: 'Persiapan diri memasuki dunia kerja melalui berbagai pembekalan dan informasi persiapan karier.'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="60" height="67" viewBox="0 0 60 67" fill="none">
        <path d="M30 33.3333C39.2 33.3333 46.6667 25.8667 46.6667 16.6667C46.6667 7.46667 39.2 0 30 0C20.8 0 13.3333 7.46667 13.3333 16.6667C13.3333 25.8667 20.8 33.3333 30 33.3333ZM30 6.66667C35.5 6.66667 40 11.1667 40 16.6667C40 22.1667 35.5 26.6667 30 26.6667C24.5 26.6667 20 22.1667 20 16.6667C20 11.1667 24.5 6.66667 30 6.66667ZM3.33333 66.6667H56.6667C58.5 66.6667 60 65.1667 60 63.3333V60C60 47.1333 49.5333 36.6667 36.6667 36.6667H23.3333C10.4667 36.6667 0 47.1333 0 60V63.3333C0 65.1667 1.5 66.6667 3.33333 66.6667ZM23.3333 43.3333H36.6667C45.8667 43.3333 53.3333 50.8 53.3333 60H6.66667C6.66667 50.8 14.1333 43.3333 23.3333 43.3333Z" fill="#FF5733" />
      </svg>,
      title: 'Pemdataan Alumni',
      description: 'Pendataan alumni untuk pengelolaan informasi lulusan dan pengembangan jaringan alumni.'
    }
  ];

  return (
    <>

      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-linear-to-b from-accent to-white px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">
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
          className="pointer-events-none absolute -right-16 -top-40 z-0 h-107.5 w-107.5 rounded-bl-[170px] bg-[#d9d9d9] sm:-right-24 sm:-top-52 lg:h-140 lg:w-127.5"
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
                <span className="font-semibold text-[#0075FF]">Bursa Kerja Khusus</span>
              </nav>

              <h1 className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0075FF] sm:text-5xl lg:text-[54px]">
                Bursa Kerja Khusus
              </h1>

              <p className="mb-8 max-w-110 text-left text-sm leading-relaxed text-slate-700 sm:text-base lg:text-[16px]">
                Bursa Kerja Khusus SMK Negeri 26 Jakarta hadir sebagai pusat
                layanan informasi dan fasilitasi ketenagakerjaan yang menghubungkan
                lulusan dengan berbagai peluang karier. Bersama jaringan dunia usaha
                dan dunia industri, BKK 26 menyediakan informasi, pendampingan, serta
                layanan yang mendukung kesiapan menuju dunia kerja.
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

      <section className="bg-white relative flex min-h-screen w-full flex-col
      items-center overflow-hidden
      px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24 lg:pt-36">

        <div className="title w-full flex flex-col items-center justify-center gap-4">
          <h1 className='text-5xl font-montserrat text-center text-black font-bold '>
            Bursa Kerja Khusus </h1>
          <div className="bg-secondary rounded-full w-60 h-0.75"></div>

          <p className='text-slate-600 text-md px-60 text-center'>Bursa Kerja Khusus menyediakan berbagai layanan untuk mendukung dalam menemukan peluang karier terbaik.</p>
        </div>



        <div className="flex flex-row flex-wrap justify-center gap-8 mt-16 w-full">
          {dataBkk.map((item, index) => (
            <div className="flex flex-col shadow-md bg-white w-1/5 rounded-xl items-center justify-center gap-4 p-8 h-80">
              <div className={`w-15 h-15 flex rounded-full   p-4 items-center justify-center`}
                style={{
                  backgroundColor: (index + 1) % 2 === 0
                    ? 'color-mix(in srgb, var(--color-tertiary) 50%, transparent)'
                    : 'color-mix(in srgb, var(--color-secondary) 50%, transparent)'
                }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-xl font-bold text-center">0{index + 1}</h1>
                <h2 className="text-md font-bold text-center">{item.title}</h2>
                <p className="text-sm text-center my-4 text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-accent relative flex min-h-screen w-full flex-col
      items-center overflow-hidden
      px-6 pb-16 pt-16 sm:px-5 lg:px-16 lg:pb-24 lg:pt-18">
        <div className="title w-full flex flex-col items-center justify-center gap-4">
          <h1 className='text-5xl font-montserrat text-center text-primary font-bold '>
            BKK Untuk Siapa ? </h1>
          <div className="bg-secondary rounded-full w-60 h-0.75 mb-3"></div>

          <p className='text-slate-600 text-md text-center'>Layanan BKK 26 untuk berbagai pihak yang membutuhkan informasi dan peluang di dunia kerja</p>
        </div>

        <div className="container flex flex-row flex-wrap justify-center gap-8 mt-16 w-full">
          {dataPelayanan.map((item, index) => (
            <div key={index} className="flex flex-row p-0 overflow-hidden rounded-2xl shadow-md bg-white w-3/10 h-60 items-center justify-start gap-4">
              <div className="w-1/2 h-full">
                <div className="h-1/3 w-full flex items-center justify-start p-4">
                  <h1 className="text-xl font-bold text-center">{item.untuk}</h1>
                </div>
                <div className="h-1/2 w-full flex items-center justify-center p-4">
                  <p>{item.keterangan}</p>
                </div>
              </div>
              <div className="w-1/2 h-full bg-[#d9d9d9]"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-4xl bg-primary lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col items-start justify-center px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <p className=" pb-2  font-montserrat text-md font-semibold text-white sm:text-2xl">
              Hubungi Tim BKK SMKN 26 Jakarta
            </p>
            <div className="bg-secondary rounded-full w-60 h-0.75 mb-4"></div>

            <h2 className="max-w-2xl font-montserrat text-xl font-bold leading-wide tracking-tight text-white sm:text-4xl lg:text-4xl">
              BUTUH INFORMASI BKK?
            </h2>
            <p className="pr-30 max-w-md text-sm leading-relaxed font-semibold text-white/90 sm:text-base">
              Kami siap membantu Anda mendapatkan informasi seputar peluang kerja,
              rekrutmen, pembekalan, dan layanan lainnya.
            </p>
            <a
              href="mailto:smkn26jakarta@gmail.com"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-secondary px-8 py-4 font-montserrat text-base font-bold text-white transition hover:bg-white hover:text-primary sm:text-xl"
            >
              Hubungi Tim BKK
              <ArrowRight size={22} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="m-3 flex flex-col justify-center rounded-2xl bg-white px-7 py-8 sm:m-8 sm:px-10 sm:py-10 lg:m-7 lg:px-12">
            <div className="flex items-center gap-5 border-b-2 border-slate-200 pb-7">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-200 text-primary">
                <MapPin size={34} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-montserrat text-2xl font-bold leading-tight text-primary sm:text-3xl">Alamat</h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Jl. Balai Pustaka Baru I No.2, RT.2/RW.7, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13220
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 border-b-2 border-slate-200 py-7">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-200 text-primary">
                <PhoneCall size={34} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-montserrat text-xl font-bold leading-tight text-primary sm:text-2xl">No. Telepon / Fax</h3>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">(021) 4720310</p>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-7">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-blue-200 text-primary">
                <Mail size={34} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-montserrat text-xl font-bold leading-tight text-primary sm:text-2xl">Email</h3>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">smkn26jakarta@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default BKK