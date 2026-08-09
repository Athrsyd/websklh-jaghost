# CLAUDE.md — Panduan Lengkap Proyek websklh-jaghost

> **Baca file ini DULU sebelum menyentuh kode apapun.**
> Ini adalah satu-satunya dokumen yang perlu kamu baca untuk memahami seluruh arsitektur proyek.

---

## 🏫 Tentang Proyek Ini

### Apa ini?
Ini adalah proyek **website resmi SMK Negeri 26 Jakarta** (sekolah menengah kejuruan negeri di Jakarta, Indonesia). Proyek ini dibuat oleh **tim siswa** sebagai proyek sekolah/tugas kelompok.

### Untuk siapa?
Website ini akan dipakai oleh:
- **Calon siswa & orang tua** — untuk cari info tentang sekolah, jurusan, pendaftaran (SPMB), beasiswa (KJP/PIP)
- **Siswa aktif** — untuk lihat pengumuman, kalender akademik, kegiatan, dan info BKK (Bursa Kerja Khusus)
- **Guru & staf** — sebagai portal informasi sekolah
- **Masyarakat umum** — untuk mengenal SMKN 26 Jakarta

### Apa yang bikin proyek ini spesial?
Bukan cuma website sekolah biasa. Proyek ini punya **AI chatbot** yang terintegrasi langsung ke website. Chatbot ini:
- Menjawab pertanyaan tentang sekolah berdasarkan **dokumen PDF resmi sekolah** (brosur, profil, panduan PPDB, dll)
- Bisa **mengarahkan user ke halaman yang tepat** (misal user tanya "Dimana info jurusan?" → AI otomatis navigasi ke halaman jurusan)
- Menggunakan teknologi **RAG (Retrieval-Augmented Generation)** — artinya AI cari dulu info relevan dari dokumen, baru generate jawaban. Bukan asal ngarang.

### Tim & Pembagian Kerja
- **Frontend** dikerjakan oleh beberapa orang (ada yang bikin routing/halaman, ada yang bikin desain UI + animasi)
- **Backend AI RAG** dikerjakan terpisah
- Kedua bagian ini **terhubung via REST API** — frontend kirim pertanyaan, backend jawab

### Budget & Constraint
- **$0 budget** — semua pakai API gratis (Gemini free tier, Groq free tier)
- **Hosting**: belum di-deploy, masih development lokal
- **Database**: PostgreSQL lokal (Laragon) dengan extension pgvector untuk vector search

---

## 🗂️ Dua Folder Utama

| Folder | Stack | Fungsi |
|---|---|---|
| `BACKEND/` | Laravel 13 + PHP 8.4 + PostgreSQL + pgvector | **AI RAG Chatbot API** — menerima pertanyaan, cari jawaban dari dokumen PDF sekolah, lalu generate jawaban pakai LLM |
| `FRONTEND/` | React 19 + Vite 8 + TailwindCSS v4 + GSAP | **Landing page & UI** — halaman publik sekolah dengan animasi premium |

Keduanya **terpisah total** (decoupled). Frontend memanggil Backend lewat REST API.

### Halaman Website yang Direncanakan (dari `pages.txt`):
```
Beranda (landing page)

Tentang Kami
├── Profil Sekolah        ← sudah di-design + animasi GSAP
├── Hubungan Industri     ← placeholder
├── Sejarah               ← placeholder
├── Fasilitas             ← placeholder
├── Prestasi              ← placeholder
└── Profil Guru & Staff   ← placeholder

Program
├── Profil Jurusan        ← placeholder
├── Ekstrakurikuler       ← placeholder
├── BKK                   ← placeholder
├── LSP                   ← placeholder
└── BLUD                  ← placeholder

Informasi
├── Berita                ← placeholder
├── Pengumuman            ← placeholder
├── Kalender Akademik     ← placeholder
└── FAQ                   ← belum ada

Dokumentasi
├── Galeri Foto           ← placeholder
├── Galeri Video          ← placeholder
├── Kegiatan Sekolah      ← placeholder
└── Virtual Tour          ← placeholder

Portal
├── SPMB (Pendaftaran)    ← placeholder
├── KJP (Beasiswa)        ← placeholder
└── PIP (Beasiswa)        ← placeholder
```

> "placeholder" = file JSX sudah ada tapi isinya cuma `<div>NamaHalaman</div>`, belum di-design.

---

## 📁 Struktur Folder

```
websklh-jaghost/
├── BACKEND/                 ← Laravel 13 (API-only, no Blade views)
│   ├── app/
│   │   ├── AI/              ← Provider abstraction layer
│   │   │   ├── Contracts/   ← 4 interface: Embedding, LLM, Reranker, PdfParser
│   │   │   └── Providers/   ← 9 implementasi (Gemini, Groq, HuggingFace, PHP native)
│   │   ├── RAG/             ← Inti sistem RAG
│   │   │   ├── Chunking/    ← SemanticChunker + ParentChildMapper
│   │   │   ├── Embedding/   ← EmbeddingService + batch processor
│   │   │   ├── Generation/  ← AnswerGenerator + PromptBuilder + PromptInjectionDefense
│   │   │   ├── Ingestion/   ← PDF extraction → chunking → embedding pipeline
│   │   │   ├── Pipeline/    ← RagPipeline.php (entry point utama)
│   │   │   ├── Retrieval/   ← HybridRetriever (Dense + Sparse + RRF + Rerank + Gate)
│   │   │   └── Tools/       ← NavigationTool (function calling untuk navigasi halaman)
│   │   ├── Console/Commands/ ← Artisan commands: IngestDocument, EvaluateRag
│   │   ├── DTO/             ← 14 Data Transfer Objects (immutable value objects)
│   │   ├── Http/Controllers/Api/ ← ChatCompletionController, DocumentController
│   │   ├── Jobs/            ← ProcessDocumentIngestion (async queue)
│   │   ├── Providers/       ← RagServiceProvider (DI binding semua interface)
│   │   └── Repositories/    ← ChunkRepository, DocumentRepository, EmbeddingRepository
│   ├── config/
│   │   ├── rag.php          ← Semua config RAG (model, threshold, chunk size)
│   │   └── navigation.php   ← Mapping halaman frontend untuk NavigationTool
│   ├── database/migrations/ ← 7 migration (pgvector, documents, chunks, embeddings, dll)
│   ├── routes/api.php       ← 5 endpoint REST API
│   └── .env.example         ← Template environment variables
│
├── FRONTEND/                ← React 19 SPA
│   ├── src/
│   │   ├── Router/Router.jsx    ← React Router v7 — semua route definitions
│   │   ├── components/          ← Komponen UI reusable (sudah selesai desain)
│   │   │   ├── Navbar.jsx       ← Floating navbar + dropdown + mobile menu
│   │   │   ├── Hero.jsx         ← Landing hero (foto gedung + statistik animasi)
│   │   │   ├── SambutanKepsek.jsx ← Sambutan Kepala Sekolah
│   │   │   ├── AestheticDigitCounter.jsx ← Counter animasi angka GSAP
│   │   │   ├── StatsGridCards.jsx ← 4 kartu statistik (murid/pendidik/tenaga/tahun)
│   │   │   ├── MarsVideoSection.jsx ← Placeholder video Mars SMKN 26
│   │   │   ├── CtaBanner.jsx    ← Banner CTA biru "Jelajahi Program"
│   │   │   └── Footer.jsx      ← Footer sederhana
│   │   ├── pages/               ← Halaman utama (sudah di-style)
│   │   │   ├── Home.jsx         ← Beranda (Hero + SambutanKepsek)
│   │   │   └── ProfilSekolah.jsx ← Profil + Visi Misi (merged, GSAP animations)
│   │   ├── Pages/               ← Halaman placeholder dari teman (belum di-style)
│   │   │   ├── Beranda.jsx      ← Wrapper → render Home.jsx
│   │   │   ├── TentangKami.jsx  ← Wrapper → render ProfilSekolah.jsx
│   │   │   ├── TentangKami/     ← GuruStaf, Prestasi, Sejarah, HubunganIndustri, ProfileSekolah
│   │   │   ├── program/         ← BKK, Jurusan, Ekskul, LSP, BLUD
│   │   │   ├── info/            ← Berita, Pengumuman, KalenderAkademik
│   │   │   ├── dokum/           ← GaleriFoto, GaleriVideo, KegiatanSekolah, VirtualTour
│   │   │   └── portal/          ← SPMB, KJP, PIP
│   │   ├── hooks/
│   │   │   └── useChat.js       ← React Hook untuk integrasi AI chatbot
│   │   └── assets/              ← Gambar (background, logo, kepsek, profil, visimisi)
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── pages.txt                ← Daftar semua halaman yang direncanakan
```

---

## 🔌 API Endpoints (Backend)

Semua endpoint berada di prefix `/api/v1`:

| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/chat/completions` | **Kirim pertanyaan ke AI chatbot** — format mirip OpenAI API |
| `POST` | `/documents/ingest` | Upload & proses dokumen PDF ke vector database |
| `GET` | `/documents` | List semua dokumen yang sudah di-ingest |
| `GET` | `/documents/{id}/status` | Cek status ingestion dokumen |
| `DELETE` | `/documents/{id}` | Hapus dokumen |

### Contoh Request Chat:
```json
POST /api/v1/chat/completions
{
  "messages": [
    {"role": "user", "content": "Apa visi SMKN 26 Jakarta?"}
  ],
  "stream": false
}
```

### Contoh Response:
```json
{
  "id": "rag-uuid",
  "object": "chat.completion",
  "model": "rag-sekolah",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Visi SMKN 26 Jakarta adalah... [Halaman 2]",
      "tool_calls": [...]
    },
    "finish_reason": "stop"
  }],
  "citations": [...],
  "retrieval_metadata": {
    "trace_id": "uuid",
    "confidence_score": 0.82,
    "retrieval_latency_ms": 150
  }
}
```

---

## 🧠 Cara Kerja RAG Pipeline (Backend)

Alur dari pertanyaan user sampai jawaban AI:

```
User Question
     │
     ▼
ChatCompletionController.store()
     │
     ▼
RagPipeline.query()
     │
     ├─► HybridRetriever.retrieve()
     │       ├─► DenseVectorSearcher (pgvector cosine similarity)
     │       ├─► SparseTextSearcher (PostgreSQL ts_rank full-text search)
     │       ├─► ReciprocalRankFusion (k=60, merge kedua hasil)
     │       ├─► ConfidenceGate (filter skor < threshold)
     │       └─► CrossEncoderReranker (rerank hasil akhir)
     │
     ▼
AnswerGenerator.generate()
     ├─► PromptInjectionDefense.sanitize() (cegah prompt injection)
     ├─► PromptBuilder.build() (rakit system prompt + konteks dokumen)
     ├─► LlmProvider.chat() (panggil Gemini/Groq API + function calling)
     └─► CitationFormatter (ekstrak referensi halaman)
     │
     ▼
GenerationResult (jawaban + citations + tool_calls + confidence)
```

### Alur Ingestion Dokumen:
```
PDF Upload
     │
     ▼
IngestionOrchestrator.ingest()
     ├─► PdfExtractor (parse PDF → text per halaman)
     ├─► StructuralAnalyzer (deteksi heading, section)
     ├─► SemanticChunker (potong teks jadi chunk semantik)
     ├─► ParentChildMapper (buat hierarki parent ↔ child chunks)
     ├─► ChunkSizeGuard (validasi ukuran chunk)
     ├─► EmbeddingService (generate vector 384-dim via Gemini API)
     └─► Store ke PostgreSQL (chunks + embeddings + metadata)
```

---

## ⚙️ Provider System (Backend)

Backend menggunakan **interface abstraction** sehingga provider bisa di-swap tanpa ubah kode bisnis:

| Interface | Default Provider | Alternatif |
|---|---|---|
| `EmbeddingProviderInterface` | `GeminiEmbeddingProvider` | HuggingFace, Local Python |
| `LlmProviderInterface` | `GeminiLlmProvider` | `GroqLlmProvider` (Llama 3.3 70B) |
| `RerankerProviderInterface` | `PhpCosineRerankerProvider` | `LocalRerankerProvider` (Python) |
| `PdfParserInterface` | `PhpPdfParserProvider` (smalot) | `PyMuPdfParserProvider` (Python) |

Provider di-bind di `app/Providers/RagServiceProvider.php`. Ganti provider = ubah binding di situ.

Pilihan LLM provider diatur via `RAG_LLM_PROVIDER` di `.env` (`gemini` atau `groq`).

---

## 🎨 Frontend — Halaman yang Sudah Selesai

| Route | Komponen | Status |
|---|---|---|
| `/` | `Home.jsx` → Hero + SambutanKepsek | ✅ Selesai (GSAP animasi) |
| `/tentang-kami/profil-sekolah` | `ProfilSekolah.jsx` → Profil + Visi Misi | ✅ Selesai (GSAP animasi) |

### Komponen Siap Pakai (Belum Dipasang):
- `StatsGridCards.jsx` — 4 kartu statistik
- `MarsVideoSection.jsx` — Section video Mars
- `CtaBanner.jsx` — Banner CTA biru

### Halaman Placeholder (Belum Di-Design):
Semua file di `src/Pages/` (uppercase P) dari teman — isinya hanya `<div>NamaHalaman</div>`. Perlu di-design.

---

## 🤖 Frontend — Integrasi AI Chatbot

Hook `useChat.js` sudah siap. Cara pakai di komponen React manapun:

```jsx
import { useChat } from '../hooks/useChat';

function ChatBubble() {
  const { messages, loading, error, sendMessage, clearChat } = useChat();

  const handleSend = () => sendMessage("Apa visi sekolah?");

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i} className={msg.role}>{msg.content}</div>
      ))}
      {loading && <span>Mengetik...</span>}
    </div>
  );
}
```

Hook ini otomatis:
- Mengirim pesan ke `POST /api/v1/chat/completions`
- Menyimpan history percakapan
- Handle error
- Menjalankan `navigate_to_page` tool calls (navigasi otomatis ke halaman yang diminta AI)

---

## 🗄️ Database (PostgreSQL + pgvector)

| Tabel | Fungsi |
|---|---|
| `documents` | Daftar dokumen PDF yang di-upload |
| `document_versions` | Versi per-ingest (hash, status, jumlah chunk) |
| `chunks` | Potongan teks dokumen + metadata (heading, section, page, tsvector) |
| `embeddings` | Vector embedding 384-dim per chunk (HNSW index, cosine) |
| `retrieval_logs` | Log setiap query RAG (untuk evaluasi) |
| `users`, `cache`, `jobs` | Laravel default |

Vector search menggunakan operator `<=>` (cosine distance) dari extension `pgvector`.

---

## 🔑 Environment Variables Penting

```env
# Database
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=rag_sekolah
DB_USERNAME=postgres
DB_PASSWORD=

# AI Providers
GEMINI_API_KEY=           # Google Gemini API key (untuk embedding + LLM)
GROQ_API_KEY=             # Groq API key (untuk Llama 3.3 70B, opsional)
RAG_LLM_PROVIDER=gemini   # Pilih: "gemini" atau "groq"

# Frontend
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 🚀 Cara Jalankan

### Backend:
```bash
cd BACKEND
composer install
cp .env.example .env     # isi GEMINI_API_KEY
php artisan migrate
php artisan serve         # → http://localhost:8000
```

### Frontend:
```bash
cd FRONTEND
npm install
npm run dev               # → http://localhost:5173
```

### Ingest Dokumen PDF:
```bash
cd BACKEND
php artisan rag:ingest path/ke/dokumen.pdf
```

---

## 📏 Aturan Coding

1. **Backend**: Semua provider harus implement interface di `app/AI/Contracts/`. Jangan hardcode API call di pipeline.
2. **Frontend**: Gunakan `react-router-dom` untuk navigasi (`useNavigate`). Jangan pakai state-based tab switching.
3. **Styling**: TailwindCSS v4 (via `@tailwindcss/vite`). Warna utama: `#FF5533` (oranye-merah), `#2563EB` (biru), `#1a2744` (dark navy).
4. **Animasi**: GSAP + ScrollTrigger. Semua animasi scroll-triggered pakai `toggleActions: 'play none none reverse'`.
5. **Navbar**: Fixed floating navbar, rounded-full, backdrop-blur. Dropdown on hover (desktop), expanded tree (mobile).
6. **Case sensitivity**: Ada 2 folder pages: `src/pages/` (lowercase, halaman jadi) dan `src/Pages/` (uppercase, dari teman). Di Windows keduanya sama, di Linux beda. Hati-hati import path.

---

## 🧩 Dependencies

### Backend (composer.json):
- `laravel/framework: ^13.0`
- `smalot/pdfparser` — Parse PDF tanpa Python
- `pgvector/pgvector` — PostgreSQL vector extension support

### Frontend (package.json):
- `react: ^19.2.7`, `react-dom: ^19.2.7`
- `react-router-dom: ^7.18.2`
- `gsap: ^3.15.0` — Animasi premium
- `lucide-react: ^1.28.0` — Icon library
- `tailwindcss: ^4.3.3` + `@tailwindcss/vite`
