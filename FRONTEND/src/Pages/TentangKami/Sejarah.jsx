import React, { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import foto1 from '../../assets/sejarah/1.avif';
import foto2 from '../../assets/sejarah/2.jpg';
import foto3 from '../../assets/sejarah/3.jpg';
import foto4 from '../../assets/sejarah/4.jpg';
import foto5 from '../../assets/sejarah/5.jpeg';
// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const timelineData = [
  {
    year: "1969-1970",
    title: "Awal Gagasan Pendidikan Teknik",
    image: foto1,
    description:
      "Pada masa PELITA I, pembangunan nasional mendorong pembaruan sistem pendidikan nasional, termasuk pengembangan pendidikan teknik. Gagasan ini menjadi bagian dari upaya mempersiapkan tenaga terampil melalui pendidikan Sekolah Teknologi Menengah.",
    side: "left", // dot muncul di KANAN -> pair (teks+gambar) digeser ke KIRI
  },
  {
    year: "1971",
    title: "Proyek Perintis Dimulai",
    image: foto2,
    description:
      "Proyek Perintis Sekolah Teknologi Menengah Pembangunan Jakarta mulai diwujudkan sebagai bagian dari pengembangan pendidikan teknik. Pada 1 Juli 1971, Proyek Perintis STM Pembangunan Jakarta diresmikan dan menerapkan masa pendidikan selama empat tahun.",
    side: "right", // dot muncul di KIRI -> pair digeser ke KANAN
  },
  {
    year: "1986",
    title: "Menjadi STMN Pembangunan",
    image: foto3,
    description:
      "Setelah periode sebagai Proyek Perintis STM Pembangunan, status proyek tidak lagi digunakan. Pada tahun 1986, sekolah berubah menjadi Sekolah Teknologi Menengah Negeri Pembangunan (STMN Pembangunan) Jakarta.",
    side: "left",
  },
  {
    year: "1997",
    title: "Lahirnya SMK Negeri 26 Jakarta",
    image: foto4,
    description:
      "Pada tahun 1997 terjadi perubahan nomenklatur. STM Negeri Pembangunan Jakarta kemudian berubah menjadi Sekolah Menengah Kejuruan Negeri 26 Jakarta, yang dikenal sebagai SMK Negeri 26 Jakarta.",
    side: "right",
  },
  {
    year: "SEKARANG",
    title: "Melanjutkan Perjalanan",
    image: foto5,
    description:
      "Perjalanan panjang tersebut menjadi bagian dari identitas SMK Negeri 26 Jakarta dalam menjalankan pendidikan vokasi dan terus berkembang menghadapi kebutuhan pendidikan dan dunia kerja.",
    side: "left",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DESAIN REFERENSI — semua ukuran diturunkan dari CONTENT_WIDTH ini,
// baik untuk CSS (%) maupun SVG (viewBox), supaya dot SELALU align
// dengan posisi visual card, di lebar layar berapa pun.
// ─────────────────────────────────────────────────────────────────────────────
const CONTENT_WIDTH = 1000;   // px acuan
const TEXT_W = 290;          // lebar blok teks
const IMAGE_W = 330;         // lebar blok gambar
const PAIR_GAP = 20;         // jarak teks <-> gambar
const PAIR_W = TEXT_W + PAIR_GAP + IMAGE_W;

const ITEM_HEIGHT = 380;     // tinggi tiap item (jarak antar dot)
const GAP = 80;              // jarak antar card (harus sama dengan `gap` di container flex)
const ROW_HEIGHT = ITEM_HEIGHT + GAP; // jarak vertikal antar titik dot, sudah termasuk gap
const DOT_R = 12;            // radius dot per-item
const EDGE_DOT_R = 17;       // radius dot start/end (sedikit lebih besar)
const DOT_STROKE = 8;        // tebal border dot
const PATH_STROKE = 12;      // tebal garis path
const EDGE_SPACE = 140;      // ruang ekstra vertikal di ujung atas & bawah, supaya
// kurva ke dot pertama/terakhir tidak terlalu "dempet"
// (jarak jangkar->dot pertama jadi sebanding dengan
// jarak antar-dot biasa, bukan cuma setengah ITEM_HEIGHT)

const COLOR_BG = "#001f3f";
const COLOR_ORANGE = "#f97316";
const COLOR_BLUE = "#38bdf8";
const COLOR_DESC = "#cbd5e1";
const COLOR_PATH = "#e2e8f0";

// posisi X dot (dalam unit CONTENT_WIDTH), dihitung LANGSUNG dari lebar
// pair teks+gambar -> dijamin selalu jatuh di titik tengah area kosong
const CENTER_X = CONTENT_WIDTH / 2;
const DOT_X_WHEN_LEFT = (PAIR_W + CONTENT_WIDTH) / 2;   // pair nempel kiri -> dot kanan
const DOT_X_WHEN_RIGHT = (CONTENT_WIDTH - PAIR_W) / 2;  // pair nempel kanan -> dot kiri

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER GAMBAR
// ─────────────────────────────────────────────────────────────────────────────
const PlaceholderImage = () => (
  <div
    style={{
      width: "100%",
      aspectRatio: "3 / 2",
      backgroundColor: "#dde3f5",
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      boxSizing: "border-box",
    }}
  >
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.72rem",
        color: "#6b7280",
        textAlign: "center",
        margin: 0,
        lineHeight: 1.4,
      }}
    >
      Foto sejarah akan ditambahkan
    </p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SATU ITEM TIMELINE
// Teks & gambar diperlakukan sebagai SATU pasangan yang bergeser ke salah
// satu sisi (flex-start / flex-end), sisi kosongnya jadi tempat dot muncul.
// Animasi: keduanya masuk dari arah dot (sisi kosong) menuju posisi akhir,
// gambar (lebih dekat dot) muncul duluan, teks menyusul.
// ─────────────────────────────────────────────────────────────────────────────
const TimelineItem = ({ item }) => {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const isLeft = item.side === "left";

  // arah datang: kalau dot di kanan (isLeft), elemen datang dari kanan (+x)
  const fromX = isLeft ? 80 : -80;
  const baseTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  const fastVariants = {
    hidden: { opacity: 0, x: fromX, scale: 0.88 },
    visible: { opacity: 1, x: 0, scale: 1, transition: baseTransition },
  };
  const slowVariants = {
    hidden: { opacity: 0, x: fromX, scale: 0.88 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { ...baseTransition, delay: 0.1 },
    },
  };

  const TextBlock = (
    <motion.div
      variants={slowVariants}
      initial="hidden"
      // animate={isInView ? "visible" : "hidden"}
      whileInView="visible"
      transition={{duration:1, delay:0.5, ease:'easeInOut'}}
      style={{ width: TEXT_W, flexShrink: 0, boxSizing: "border-box" }}
    >
      <p
        style={{
          textAlign: isLeft ? "right" : "left",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "3rem",
          color: '#FF5733',
          margin: 0,
          lineHeight: 1,
        }}
      >
        {item.year}
      </p>
      <p
        style={{
          textAlign: isLeft ? "right" : "left",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "1.7rem",
          color: '#007AFF',
          margin: "8px 0 12px",
          lineHeight: 1,
        }}
      >
        {item.title}
      </p>
      <p
        style={{
          textAlign: isLeft ? "right" : "left",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: 'var(--color-white)',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </motion.div>
  );

  const ImageBlock = (
    <motion.div
      variants={fastVariants}
      initial="hidden"
      whileInView="visible"
      transition={{duration:1, delay:0.5, ease:'easeInOut'}}
      // animate={isInView ? "visible" : "hidden"}
      style={{ width: IMAGE_W, flexShrink: 0, boxSizing: "border-box" }}
    >
      <a href={item.image} target="_blank" rel="noopener noreferrer">
        <img src={item.image} alt={item.title} className="w-full h-full rounded-2xl cursor-zoom-in object-cover" />
      </a>
    </motion.div>
  );

  return (
    <div
      ref={ref}
      style={{
        height: ITEM_HEIGHT,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",

      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isLeft ? "row" : "row-reverse",
          alignItems: "center",
          gap: PAIR_GAP,
        }}
      >
        {TextBlock}
        {ImageBlock}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PATH SVG
// ─────────────────────────────────────────────────────────────────────────────
// PERBAIKAN (v2): versi sebelumnya memaksa kurva melewati titik CENTER_X
// sebagai NODE terpisah di antara dua dot. Itu menciptakan simpul buatan
// yang bikin kurva "patah"/lancip persis di titik dot.
//
// Meniru teknik dari Figma: dot dihubungkan LANGSUNG ke dot berikutnya
// dengan SATU kurva Bezier kubik, tanpa node tengah. Titik kontrol di
// setiap ujung diletakkan pada X yang SAMA dengan titik itu sendiri
// (tangent vertikal murni). Karena titik kontrol masuk & keluar di satu
// dot berbagi arah X yang sama, sambungan antar-segmen otomatis mulus
// (C1-continuous) tanpa sudut — dan lengkungan "S" yang melewati tengah
// muncul alami di antara dua dot, bukan dipaksakan lewat node tengah.
// ─────────────────────────────────────────────────────────────────────────────
const CURVE_FACTOR = 0.62; // seberapa jauh titik kontrol (vertikal) dari tiap dot; makin besar makin bulat
const EDGE_ANCHOR_FACTOR = 0.32; // faktor khusus di ujung anchor (atas/bawah) —
// dibuat lebih kecil supaya kurva cepat bergerak
// menjauhi area card (tidak "mampir" lama di
// rentang X card sebelum menuju dot pertama/terakhir)

const buildSnakePath = (n) => {
  const totalHeight = n * ITEM_HEIGHT + (n - 1) * GAP + 2 * EDGE_SPACE;
  const pts = [{ x: CENTER_X, y: EDGE_DOT_R }];
  for (let i = 0; i < n; i++) {
    const isLeft = timelineData[i].side === "left";
    const dotX = isLeft ? DOT_X_WHEN_LEFT : DOT_X_WHEN_RIGHT;
    pts.push({ x: dotX, y: EDGE_SPACE + i * ROW_HEIGHT + ITEM_HEIGHT / 2 });
  }
  pts.push({ x: CENTER_X, y: totalHeight - EDGE_DOT_R });

  const last = pts.length - 1;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let k = 0; k < last; k++) {
    const p0 = pts[k];
    const p1 = pts[k + 1];
    const dy = p1.y - p0.y;
    // sisi anchor terbuka (awal path di k=0, akhir path di k=last-1) pakai
    // faktor lebih kecil; sisi yang menempel ke dot tetap pakai CURVE_FACTOR
    // penuh supaya tangent vertikal ke dot tetap mulus seperti sebelumnya
    const f1 = k === 0 ? EDGE_ANCHOR_FACTOR : CURVE_FACTOR;
    const f2 = k === last - 1 ? EDGE_ANCHOR_FACTOR : CURVE_FACTOR;
    const cp1x = p0.x; // tangent vertikal di titik awal segmen
    const cp1y = p0.y + dy * f1;
    const cp2x = p1.x; // tangent vertikal di titik akhir segmen
    const cp2y = p1.y - dy * f2;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }
  return d;
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const Sejarah = () => {
  const timelineRef = useRef(null);
  const n = timelineData.length;
  const totalHeight = n * ITEM_HEIGHT + (n - 1) * GAP + 2 * EDGE_SPACE;
  const snakePath = buildSnakePath(n);

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
      <section className='bg-linear-to-b from-side-back to-white'
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 10%",
          position: "relative",
          boxSizing: "border-box",
        }}
      >

        <div
          style={{
            backgroundImage: "radial-gradient(circle, #FF573380, 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
            opacity: "35%",
          }}
          className="absolute inset-0 pointer-events-none"
        />
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

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <a href="#timeline">
            <svg id="arrowSejarah" width="25" height="12" viewBox="0 0 34 17" fill="none">
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
          backgroundColor: COLOR_BG,
          width: "100%",
          borderTopLeftRadius: "5rem",
          borderTopRightRadius: "5rem",
          paddingTop: "96px",
          paddingBottom: "120px",
          boxSizing: "border-box",
          overflowX: "auto",
        }}
      >
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

        <div
          style={{
            position: "relative",
            width: CONTENT_WIDTH,
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {/* SVG path — absolute, mengisi persis area items di bawahnya */}
          <svg
            viewBox={` 0 0 ${CONTENT_WIDTH + 10} ${totalHeight}`}
            width={CONTENT_WIDTH}
            height={totalHeight}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "block",
            }}
          >
            {/* guide line samar */}
            <path
              d={snakePath}
              stroke={COLOR_PATH}
              strokeOpacity="0"
              strokeWidth={PATH_STROKE}
              strokeLinecap="round"
              fill="none"
            />
            {/* garis beranimasi sesuai scroll */}
            <motion.path
              d={snakePath}
              stroke={COLOR_PATH}
              strokeOpacity="1"
              strokeWidth={PATH_STROKE}
              strokeLinecap="round"
              fill="none"
              style={{ pathLength }}
            />

            {/* dot start (atas) */}
            <motion.circle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              cx={CENTER_X}
              cy={EDGE_DOT_R}
              r={EDGE_DOT_R}
              fill="#ffffff"
              stroke={COLOR_BLUE}
              strokeWidth={DOT_STROKE}
            />

            {/* dot tiap item */}
            {timelineData.map((item, i) => {
              const isLeft = item.side === "left";
              const dotX = isLeft ? DOT_X_WHEN_LEFT : DOT_X_WHEN_RIGHT;
              const dotY = EDGE_SPACE + i * ROW_HEIGHT + ITEM_HEIGHT / 2;
              return (
                <motion.circle
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  key={i}
                  cx={dotX}
                  cy={dotY}
                  r={DOT_R}
                  fill="#ffffff"
                  stroke={COLOR_BLUE}
                  strokeWidth={DOT_STROKE}
                />
              );
            })}

            {/* dot end (bawah) */}
            <motion.circle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              cx={CENTER_X}
              cy={totalHeight - EDGE_DOT_R}
              r={EDGE_DOT_R}
              fill="#ffffff"
              stroke={COLOR_BLUE}
              strokeWidth={DOT_STROKE}
            />
          </svg>

          {/* Items — normal flow, flex column, di atas SVG */}
          <div
            style={{
              gap: "80px",
              paddingTop: EDGE_SPACE,
              paddingBottom: EDGE_SPACE,
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sejarah;