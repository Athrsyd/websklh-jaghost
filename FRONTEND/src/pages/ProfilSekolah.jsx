import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilImg from '../assets/profil_img.jpg';
import visimisiImg from '../assets/visimisi_img.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilSekolah() {
  const sectionRef = useRef(null);
  const profilImgRef = useRef(null);
  const profilTextRef = useRef(null);
  const visiMisiTitleRef = useRef(null);
  const misiCardRef = useRef(null);
  const visiImgRef = useRef(null);
  const visiCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ──────────────────────────────────────────────────
      // LUSION-STYLE GSAP ANIMATIONS
      // ──────────────────────────────────────────────────

      // 1. Profil Image — Masked clip-path reveal + subtle scale
      if (profilImgRef.current) {
        gsap.fromTo(
          profilImgRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            delay: 0.1,
          }
        );
      }

      // 2. Profil Text — Staggered children fade+slide
      if (profilTextRef.current) {
        gsap.fromTo(
          profilTextRef.current.children,
          { y: 50, opacity: 0, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // 3. Visi & Misi Title — ScrollTrigger masked reveal
      if (visiMisiTitleRef.current) {
        gsap.fromTo(
          visiMisiTitleRef.current,
          { y: 60, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: visiMisiTitleRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Misi Card — ScrollTrigger slide from left with stagger list items
      if (misiCardRef.current) {
        // Card container
        gsap.fromTo(
          misiCardRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: misiCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Stagger each misi list item
        const misiItems = misiCardRef.current.querySelectorAll('.misi-item');
        gsap.fromTo(
          misiItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: misiCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. Visi Image — ScrollTrigger clip-path reveal from right
      if (visiImgRef.current) {
        gsap.fromTo(
          visiImgRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: visiImgRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 6. Visi Card — ScrollTrigger float up with subtle rotation
      if (visiCardRef.current) {
        gsap.fromTo(
          visiCardRef.current,
          { y: 60, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: visiCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 7. Parallax on profil image (subtle scroll-driven zoom)
      if (profilImgRef.current) {
        gsap.to(profilImgRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: profilImgRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
    <div ref={sectionRef}>
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: PROFIL SEKOLAH                                             */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FFF3F0] min-h-[80vh] pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center w-full">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 flex justify-center overflow-hidden">
            <div 
              ref={profilImgRef}
              className="w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl border border-orange-200/40"
            >
              <img 
                src={profilImg} 
                alt="Gedung & Fasilitas SMKN 26 Jakarta" 
                className="w-full h-[300px] xs:h-[360px] sm:h-[430px] object-cover" 
              />
            </div>
          </div>

          {/* Right Column: Text */}
          <div ref={profilTextRef} className="lg:col-span-6 flex flex-col justify-center space-y-4">
            
            {/* Breadcrumb */}
            <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
              <span>Tentang Kami</span>
              <span className="mx-1.5 text-slate-400">&gt;</span>
              <span className="text-[#FF5533] font-bold">Profil Sekolah</span>
            </div>

            {/* Title — Dark Navy (NOT gradient!) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1a2744] font-sans leading-tight">
              Profil Sekolah
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans">
              SMK Negeri 26 Jakarta merupakan salah satu institusi pendidikan kejuruan terkemuka yang berdedikasi untuk menghasilkan lulusan yang kompeten, inovatif, dan siap bersaing di pasar kerja global. Dengan fasilitas modern dan tenaga pengajar profesional, kami berkomitmen membentuk karakter bangsa melalui pendidikan vokasi yang bermutu.
            </p>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: VISI & MISI SEKOLAH (SAME PAGE, CONTINUOUS SCROLL)         */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto w-full space-y-8 sm:space-y-10">
          
          {/* Section Title */}
          <div ref={visiMisiTitleRef} className="overflow-hidden">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1a2744] font-sans leading-tight">
              Visi & Misi Sekolah
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            
            {/* Left Column: Misi Card (6 Cols) */}
            <div
              ref={misiCardRef}
              className="lg:col-span-6 bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100/80"
            >
              <h3 className="text-xs sm:text-sm font-extrabold text-[#FF5533] tracking-widest uppercase mb-5">
                Misi Sekolah
              </h3>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {misiList.map((misi, idx) => (
                  <li key={idx} className="misi-item flex gap-2.5 items-start">
                    <span className="font-bold text-[#FF5533] shrink-0">{idx + 1}.</span>
                    <span>{misi}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Column: Image Box + Visi Card (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              
              {/* Image */}
              <div 
                ref={visiImgRef}
                className="rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-lg border border-slate-100"
              >
                <img 
                  src={visimisiImg} 
                  alt="Kegiatan Siswa SMKN 26 Jakarta" 
                  className="w-full h-[200px] sm:h-[250px] object-cover" 
                />
              </div>

              {/* Visi Card */}
              <div
                ref={visiCardRef}
                className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100/80 flex flex-col justify-center items-center text-center perspective-1000"
              >
                <h3 className="text-xs sm:text-sm font-extrabold text-[#FF5533] tracking-widest uppercase mb-4">
                  Visi Sekolah
                </h3>
                <blockquote className="text-base sm:text-xl md:text-2xl font-black text-[#1a2744] italic leading-snug font-sans max-w-md">
                  "SMK teknologi unggul yang menghasilkan lulusan berkarakter, kompeten, inovatif, dan berdaya saing global"
                </blockquote>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
