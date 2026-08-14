import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import visimisiImg from '../assets/visimisi_img.jpg';

export default function VisiMisi() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out' }
      );
    }
  }, []);

  const misiList = [
    'Menanamkan nilai-nilai keimanan dan ketakwaan terhadap Tuhan Yang Maha Esa, kewargaan, penalaran kritis, kreativitas, kemandirian, kolaborasi, kesehatan, serta komunikasi.',
    'Mengembangkan kompetensi keahlian sesuai kebutuhan dunia usaha/dunia industri (DUDI) melalui teaching factory, magang, guru tamu, dan sertifikasi.',
    'Menyelenggarakan pembelajaran mendalam yang berpusat pada murid untuk mengembangkan kemampuan berpikir kritis, kreatif, inovatif, kolaboratif, dan komunikatif.',
    'Mengintegrasikan teknologi digital dan proyek nyata dalam proses pembelajaran.',
    'Meningkatkan profesionalisme pendidik dan tenaga kependidikan melalui pendidikan/pelatihan, inovasi pembelajaran dan penguasaan teknologi terkini.',
    'Membangun kemitraan strategis dengan dunia usaha/dunia industri (DUDI), perguruan tinggi, dan masyarakat untuk mendukung pembelajaran kontekstual dan berkelanjutan.',
    'Meningkatkan kemampuan berbahasa asing murid guna mendukung lulusan yang berdaya saing global.',
    'Menyediakan sarana dan prasarana pembelajaran yang sesuai standar pendidikan.',
  ];

  return (
    <section className="bg-[#F8FAFC] min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 relative overflow-hidden">
      <div ref={containerRef} className="max-w-5xl mx-auto w-full space-y-8 sm:space-y-10">
        
        {/* Section Header */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#FF5533] font-sans">
            Visi & Misi Sekolah
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* Left Column: Misi Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-xl border border-slate-100/80">
            <h2 className="text-xs sm:text-sm font-extrabold text-blue-600 tracking-wide uppercase mb-4">
              Misi Sekolah
            </h2>
            <ol className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {misiList.map((misi, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="font-bold text-blue-500 shrink-0">{idx + 1}.</span>
                  <span>{misi}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right Column: Image Box & Visi Card (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Top Dummy Image */}
            <div className="bg-slate-200 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-lg border border-slate-100 group">
              <img 
                src={visimisiImg} 
                alt="Kegiatan Siswa SMKN 26 Jakarta" 
                className="w-full h-[220px] sm:h-[260px] object-cover filter contrast-[1.03] transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Bottom Visi Card */}
            <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-xl border border-slate-100/80 flex flex-col justify-center items-center text-center">
              <h2 className="text-xs sm:text-sm font-extrabold text-[#FF5533] tracking-wide uppercase mb-3">
                Visi Sekolah
              </h2>
              <blockquote className="text-base sm:text-xl md:text-2xl font-black text-slate-800 italic leading-snug font-sans max-w-md">
                "SMK teknologi unggul yang menghasilkan lulusan berkarakter, kompeten, inovatif, dan berdaya saing global"
              </blockquote>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
