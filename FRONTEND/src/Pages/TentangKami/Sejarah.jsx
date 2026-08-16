import React, { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const timelineData = [
  {
    year: "1969-1970",
    title: "Awal Gagasan Pendidikan Teknik",
    description:
      "Pada masa PELITA I, pembangunan nasional mendorong pembaruan sistem pendidikan nasional, termasuk pengembangan pendidikan teknik. Gagasan ini menjadi bagian dari upaya mempersiapkan tenaga terampil melalui pendidikan Sekolah Teknologi Menengah.",
    side: "left", // dot di KANAN path → teks kiri, gambar kanan
  },
  {
    year: "1971",
    title: "Proyek Perintis Dimulai",
    description:
      "Proyek Perintis Sekolah Teknologi Menengah Pembangunan Jakarta mulai diwujudkan sebagai bagian dari pengembangan pendidikan teknik. Pada 1 Juli 1971, Proyek Perintis STM Pembangunan Jakarta diresmikan dan menerapkan masa pendidikan selama empat tahun.",
    side: "right", // dot di KIRI path → gambar kiri, teks kanan
  },
  {
    year: "1986",
    title: "Menjadi STMN Pembangunan",
    description:
      "Setelah periode sebagai Proyek Perintis STM Pembangunan, status proyek tidak lagi digunakan. Pada tahun 1986, sekolah berubah menjadi Sekolah Teknologi Menengah Negeri Pembangunan (STMN Pembangunan) Jakarta.",
    side: "left",
  },
  {
    year: "1997",
    title: "Lahirnya SMK Negeri 26 Jakarta",
    description:
      "Pada tahun 1997 terjadi perubahan nomenklatur. STM Negeri Pembangunan Jakarta kemudian berubah menjadi Sekolah Menengah Kejuruan Negeri 26 Jakarta, yang dikenal sebagai SMK Negeri 26 Jakarta.",
    side: "right",
  },
  {
    year: "SEKARANG",
    title: "Melanjutkan Perjalanan",
    description:
      "Perjalanan panjang tersebut menjadi bagian dari identitas SMK Negeri 26 Jakarta dalam menjalankan pendidikan vokasi dan terus berkembang menghadapi kebutuhan pendidikan dan dunia kerja.",
    side: "left",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS — ubah nilai ini untuk tune layout
// ─────────────────────────────────────────────────────────────────────────────
const ITEM_HEIGHT = 340;        // px — tinggi per timeline item
const DOT_R = 14;               // radius lingkaran dot
const PATH_STROKE = 28;         // tebal garis SVG
const CURVE_AMPLITUDE = 200;    // seberapa jauh path berbelok ke kiri/kanan dari center

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER IMAGE
// ─────────────────────────────────────────────────────────────────────────────
const PlaceholderImage = () => (
  <div
    style={{
      width: "100%",
      aspectRatio: "4/3",
      backgroundColor: "#c8cdd6",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <path d="M4 40L14 24L22 33L31 20L48 40H4Z" fill="#a0a8b5" />
      <circle cx="14" cy="14" r="5" fill="#a0a8b5" />
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE TIMELINE ITEM (kiri-kanan layout)
// ─────────────────────────────────────────────────────────────────────────────
const TimelineItem = ({ item }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const isLeft = item.side === "left";
  const isSekarang = item.year === "SEKARANG";

  const transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  // Teks: muncul dari tengah ke sisi teks
  const textVariants = {
    hidden: { opacity: 0, x: isLeft ? 80 : -80, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition },
  };
  // Gambar: muncul dari tengah ke sisi gambar (kebalikan teks)
  const imgVariants = {
    hidden: { opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { ...transition, delay: 0.12 } },
  };

  const TextBlock = (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        flex: 1,
        textAlign: isLeft ? "right" : "left",
        paddingRight: isLeft ? 32 : 0,
        paddingLeft: isLeft ? 0 : 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: isSekarang ? "3.2rem" : "2.8rem",
          lineHeight: 1,
          color: isSekarang ? "#0ea5e9" : "#f97316",
          margin: 0,
          marginBottom: 6,
        }}
      >
        {item.year}
      </p>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "0.82rem",
          color: "#38bdf8",
          margin: 0,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          color: "#94a3b8",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      variants={imgVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: isLeft ? 32 : 0,
        paddingRight: isLeft ? 0 : 32,
      }}
    >
      <div style={{ width: "100%" }}>
        <PlaceholderImage />
      </div>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: ITEM_HEIGHT,
        width: "100%",
        position: "relative",
      }}
    >
      {/* Kolom kiri */}
      <div style={{ flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
        {isLeft ? TextBlock : ImageBlock}
      </div>

      {/* Kolom tengah — ruang untuk dot SVG (lebar SVG diatur dari parent) */}
      <div style={{ width: 0, flexShrink: 0 }} />

      {/* Kolom kanan */}
      <div style={{ flex: 1, height: "100%", display: "flex", alignItems: "center" }}>
        {isLeft ? ImageBlock : TextBlock}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SNAKE SVG PATH  (dirender sekali, di-overlay di atas items)
// Menggunakan koordinat yang diselaraskan dengan ITEM_HEIGHT
// ─────────────────────────────────────────────────────────────────────────────
const buildSnakePath = (itemCount, itemHeight, amplitude) => {
  // Center X dari SVG (viewBox width = 2*amplitude)
  const cx = amplitude;
  const startY = 0;
  const points = [];

  // Titik awal — tengah atas
  points.push({ x: cx, y: startY });

  // Setiap item punya satu "gelombang" setinggi itemHeight
  for (let i = 0; i < itemCount; i++) {
    const topY = i * itemHeight;
    const midY = topY + itemHeight / 2;   // letak dot
    const botY = topY + itemHeight;

    // side: "left" item → dot di sisi kanan → path melengkung ke kanan
    const dotX = timelineData[i].side === "left"
      ? cx + amplitude  // kanan
      : cx - amplitude; // kiri

    points.push({ x: dotX, y: midY });
    points.push({ x: cx, y: botY });
  }

  // Build cubic bezier path
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i += 2) {
    const prev = points[i - 1];
    const dot  = points[i];
    const next = points[i + 1];
    const cp1x = prev.x + (dot.x - prev.x) * 0.5;
    const cp2x = dot.x  + (next.x - dot.x) * 0.5;
    d += ` C ${cp1x} ${prev.y + (dot.y - prev.y) * 0.6},`
       + `   ${cp2x} ${dot.y  + (next.y - dot.y) * 0.4},`
       + `   ${next.x} ${next.y}`;
  }
  return d;
};

const buildDotPositions = (itemCount, itemHeight, amplitude) => {
  const cx = amplitude;
  return timelineData.map((item, i) => ({
    x: item.side === "left" ? cx + amplitude : cx - amplitude,
    y: i * itemHeight + itemHeight / 2,
  }));
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Sejarah = () => {
  const timelineRef = useRef(null);
  const n = timelineData.length;
  const totalHeight = n * ITEM_HEIGHT;
  const svgWidth = CURVE_AMPLITUDE * 2;       // e.g. 400px
  const svgHeight = totalHeight;

  const snakePath = buildSnakePath(n, ITEM_HEIGHT, CURVE_AMPLITUDE);
  const dots = buildDotPositions(n, ITEM_HEIGHT, CURVE_AMPLITUDE);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.0001,
  });

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #0d2748, #ffffff)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 10%",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            color: "#000",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          MELANGKAH DARI <br />
          <span style={{ color: "#0ea5e9" }}>MASA</span> KE{" "}
          <span style={{ color: "#f97316" }}>MASA</span>
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.05rem",
            color: "#4b5563",
            maxWidth: "460px",
            marginTop: "18px",
            lineHeight: 1.75,
          }}
        >
          Menelusuri perjalanan dan langkah SMK Negeri 26 Jakarta dalam
          membangun pendidikan vokasi.
        </p>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <a href="#timeline">
            <svg width="25" height="12" viewBox="0 0 34 17" fill="none">
              <path
                d="M32 2L19.6515 13.9422C18.1932 15.3526 15.8068 15.3526 14.3485 13.9422L2 2"
                stroke="#001F3F"
                strokeWidth="4"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TIMELINE SECTION
      ════════════════════════════════════════════ */}
      <section
        id="timeline"
        ref={timelineRef}
        style={{
          backgroundColor: "#001f3f",
          width: "100%",
          borderTopLeftRadius: "5rem",
          borderTopRightRadius: "5rem",
          paddingTop: "96px",
          paddingBottom: "120px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Judul */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 9vw, 7rem)",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            JEJAK WAKTU
          </h1>
        </div>

        {/* ── Grid 3-kolom: items | SVG | items ── */}
        <div
          style={{
            position: "relative",
            width: "90%",
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          {/* Kolom ITEMS (kiri & kanan) — flex column stack */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              zIndex: 2,
            }}
          >
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>

          {/* Kolom tengah — SVG snake path */}
          <div
            style={{
              width: "100%",
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
            }}
          >
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              width="100%"
              height={svgHeight}
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
              style={{ display: "block" }}
            >
              {/* Guide line (samar) */}
              {/* <path
                d={snakePath}
                stroke="#F8FAFC"
                strokeOpacity="0.12"
                strokeWidth={PATH_STROKE}
                strokeLinecap="round"
                fill="none"
              /> */}

              {/* Animated fill path */}
              <motion.path
                d={snakePath}
                stroke="#e2e8f0"
                strokeOpacity="0.85"
                strokeWidth={PATH_STROKE}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />

              {/* Dot titik start (atas tengah) */}
              <circle
                cx={CURVE_AMPLITUDE}
                cy={0}
                r={DOT_R + 4}
                fill="#001f3f"
                stroke="#0ea5e9"
                strokeWidth="8"
              />

              {/* Dot per item */}
              {dots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={DOT_R}
                  fill="#001f3f"
                  stroke="#0ea5e9"
                  strokeWidth="7"
                />
              ))}

              {/* Dot akhir (bawah tengah) */}
              <circle
                cx={CURVE_AMPLITUDE}
                cy={svgHeight}
                r={DOT_R + 4}
                fill="#001f3f"
                stroke="#0ea5e9"
                strokeWidth="8"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sejarah;