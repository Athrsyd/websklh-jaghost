import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import sejarahImage from "../../assets/sejarah.png";

const Sejarah = () => {
  const timelineRef = useRef(null);

  // Animasi akan mulai saat bagian atas timeline mencapai tengah layar (start center)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  // Koordinat SVG ini sudah saya balik. 
  // Sekarang dimulai dari M489.578 15 (ATAS) menuju ke 4416 (BAWAH)
  const reversedPath = "M489.578 15C489.578 351.973 964 254.794 964 686.179C964 1117.56 15 950.595 15 1403.97C15 1857.34 964 1682.37 964 2184.97C964 2687.56 15.0004 2408.21 15 2913.35C14.9996 3418.49 964 3183.14 964 3689.21C964 4195.29 15 3897.48 15 4416";

  return (
    <>
      <section className="w-full h-screen bg-white py-20">


      </section>

      {/* Section Timeline */}
      <section
        ref={timelineRef}
        className="bg-primary relative z-30  overflow-hidden w-full rounded-t-[6em] py-24 gap-32 flex flex-col justify-center items-center"
      >
        <div className="title">
          <h1 className="text-9xl font-black opacity-30 text-white">JEJAK WAKTU</h1>
        </div>

        <div className="w-full max-w-4xl mx-auto px-4 flex justify-center items-center">
          <div className="absolute top-230 rounded-full h-15 w-15 bg-white
          border-8 border-secondary"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 979 4431"
            fill="none"
            className="w-full h-auto overflow-visible"
          >
            {/* 1. Path Bayangan (Guide Line Samar) */}
            <path
              d={reversedPath}
              stroke="#F8FAFC"
              strokeOpacity="0"
              strokeWidth="30"
              strokeLinecap="round"
            />

            {/* 2. Path Beranimasi (Dari Ga Ada Jadi Ada, dari Atas ke Bawah) */}
            <motion.path
              d={reversedPath}
              stroke="#F8FAFC"
              strokeWidth="30"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Sejarah;