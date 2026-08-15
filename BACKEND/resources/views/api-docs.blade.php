<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dokumentasi API — SMKN 26 Jakarta AI RAG Backend</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #2563EB;
            --primary-hover: #1D4ED8;
            --primary-light: #EFF6FF;
            --accent: #FF5533;
            --bg-body: #F8FAFC;
            --bg-card: #FFFFFF;
            --border-color: #E2E8F0;
            --text-main: #0F172A;
            --text-muted: #64748B;
            --code-bg: #0F172A;
            --code-text: #E2E8F0;
            --badge-get-bg: #DCFCE7;
            --badge-get-text: #166534;
            --badge-post-bg: #DBEAFE;
            --badge-post-text: #1E40AF;
            --badge-delete-bg: #FEE2E2;
            --badge-delete-text: #991B1B;
            --sidebar-width: 280px;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            line-height: 1.6;
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            width: var(--sidebar-width);
            background: #FFFFFF;
            border-right: 1px solid var(--border-color);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            z-index: 50;
        }

        .sidebar-header {
            padding: 24px 20px;
            border-bottom: 1px solid var(--border-color);
        }

        .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: var(--text-main);
        }

        .brand-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #2563EB, #FF5533);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-size: 16px;
        }

        .brand-text h2 {
            font-size: 15px;
            font-weight: 700;
            line-height: 1.2;
        }

        .brand-text span {
            font-size: 11px;
            color: var(--text-muted);
            font-weight: 500;
        }

        .sidebar-nav {
            padding: 16px 12px;
            flex: 1;
        }

        .nav-section-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
            color: var(--text-muted);
            padding: 8px 12px 4px 12px;
            margin-top: 12px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            color: #334155;
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            border-radius: 6px;
            transition: all 0.15s ease;
            margin-bottom: 2px;
        }

        .nav-item:hover {
            background-color: #F1F5F9;
            color: var(--primary);
        }

        .nav-item.active {
            background-color: var(--primary-light);
            color: var(--primary);
            font-weight: 600;
        }

        .nav-badge {
            font-size: 10px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
        }

        .badge-get { background: var(--badge-get-bg); color: var(--badge-get-text); }
        .badge-post { background: var(--badge-post-bg); color: var(--badge-post-text); }
        .badge-delete { background: var(--badge-delete-bg); color: var(--badge-delete-text); }

        /* Main Content */
        .main-content {
            margin-left: var(--sidebar-width);
            flex: 1;
            padding: 40px 60px 100px 60px;
            max-width: 1200px;
        }

        .hero-banner {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
            border-radius: 16px;
            padding: 36px 40px;
            color: white;
            margin-bottom: 40px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
        }

        .hero-banner::after {
            content: '';
            position: absolute;
            top: -50px;
            right: -50px;
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(255, 85, 51, 0) 70%);
            border-radius: 50%;
        }

        .hero-banner h1 {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 12px;
        }

        .hero-banner p {
            color: #94A3B8;
            font-size: 15px;
            max-width: 720px;
            line-height: 1.6;
        }

        .quick-meta {
            display: flex;
            gap: 20px;
            margin-top: 24px;
            flex-wrap: wrap;
        }

        .meta-pill {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 12px;
            color: #CBD5E1;
            font-family: 'JetBrains Mono', monospace;
        }

        /* Section */
        .section-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 32px;
            margin-bottom: 32px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }

        .section-header {
            margin-bottom: 24px;
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .section-subtitle {
            font-size: 14px;
            color: var(--text-muted);
            margin-top: 6px;
        }

        /* Endpoint Header */
        .endpoint-title-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            flex-wrap: wrap;
        }

        .endpoint-method {
            font-size: 13px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
        }

        .endpoint-path {
            font-size: 18px;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            color: var(--text-main);
        }

        /* Tables */
        .param-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0 24px 0;
            font-size: 13px;
        }

        .param-table th, .param-table td {
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }

        .param-table th {
            background: #F8FAFC;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
        }

        .param-name {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            color: var(--primary);
        }

        .param-type {
            font-family: 'JetBrains Mono', monospace;
            color: #D97706;
            font-size: 12px;
        }

        .param-required {
            background: #FEE2E2;
            color: #DC2626;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 6px;
        }

        .param-optional {
            background: #F1F5F9;
            color: #64748B;
            font-size: 10px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 6px;
        }

        /* Code Blocks */
        .code-container {
            background: var(--code-bg);
            border-radius: 10px;
            overflow: hidden;
            margin: 16px 0;
            border: 1px solid #334155;
        }

        .code-header {
            background: #1E293B;
            padding: 10px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #334155;
        }

        .code-tabs {
            display: flex;
            gap: 4px;
        }

        .code-tab {
            background: transparent;
            border: none;
            color: #94A3B8;
            padding: 4px 10px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'JetBrains Mono', monospace;
            transition: all 0.15s;
        }

        .code-tab:hover {
            color: white;
        }

        .code-tab.active {
            background: #334155;
            color: white;
        }

        .copy-btn {
            background: #334155;
            color: #CBD5E1;
            border: none;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s;
        }

        .copy-btn:hover {
            background: #475569;
            color: white;
        }

        pre {
            margin: 0;
            padding: 16px;
            color: var(--code-text);
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            line-height: 1.5;
            overflow-x: auto;
        }

        /* Interactive Tester */
        .tester-box {
            background: #F8FAFC;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 20px;
            margin-top: 24px;
        }

        .tester-title {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 12px;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .tester-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 12px;
        }

        .tester-input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 13px;
            font-family: inherit;
            background: white;
        }

        .tester-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .btn-run {
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .btn-run:hover {
            background: var(--primary-hover);
        }

        .btn-run:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .tester-result {
            margin-top: 12px;
            display: none;
        }

        /* Architecture Steps */
        .step-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 16px;
            margin: 20px 0;
        }

        .step-item {
            background: #F8FAFC;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px;
        }

        .step-num {
            font-size: 12px;
            font-weight: 800;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
        }

        .step-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 6px;
        }

        .step-desc {
            font-size: 12px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        /* Callout / Alert */
        .callout {
            border-left: 4px solid var(--primary);
            background: var(--primary-light);
            padding: 14px 18px;
            border-radius: 0 8px 8px 0;
            margin: 16px 0;
            font-size: 13px;
            color: #1E3A8A;
        }

        .callout strong {
            font-weight: 700;
        }

        @media (max-width: 900px) {
            .sidebar {
                display: none;
            }
            .main-content {
                margin-left: 0;
                padding: 24px;
            }
        }
    </style>
</head>
<body>

    <!-- Sidebar Navigation -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <a href="/api/docs" class="sidebar-brand">
                <div class="brand-icon">26</div>
                <div class="brand-text">
                    <h2>SMKN 26 Jakarta</h2>
                    <span>RAG Backend API v1.0</span>
                </div>
            </a>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-section-title">Pendahuluan</div>
            <a href="#overview" class="nav-item">🚀 Ringkasan & Arsitektur</a>
            <a href="#authentication" class="nav-item">🔑 Base URL & Autentikasi</a>

            <div class="nav-section-title">AI & Chatbot Endpoints</div>
            <a href="#chat-completions" class="nav-item">
                <span class="nav-badge badge-post">POST</span>
                <span>/chat/completions</span>
            </a>

            <div class="nav-section-title">Dokumen & Knowledge</div>
            <a href="#get-documents" class="nav-item">
                <span class="nav-badge badge-get">GET</span>
                <span>/documents</span>
            </a>
            <a href="#ingest-document" class="nav-item">
                <span class="nav-badge badge-post">POST</span>
                <span>/documents/ingest</span>
            </a>
            <a href="#document-status" class="nav-item">
                <span class="nav-badge badge-get">GET</span>
                <span>/documents/{id}/status</span>
            </a>
            <a href="#delete-document" class="nav-item">
                <span class="nav-badge badge-delete">DEL</span>
                <span>/documents/{id}</span>
            </a>

            <div class="nav-section-title">Integrasi & Client</div>
            <a href="#frontend-integration" class="nav-item">💻 Contoh React / Frontend</a>
            <a href="#status-codes" class="nav-item">⚠️ Error Codes & Status</a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">

        <!-- Hero Banner -->
        <div class="hero-banner" id="overview">
            <h1>Dokumentasi API AI RAG & Chatbot</h1>
            <p>Spesifikasi resmi REST API backend SMKN 26 Jakarta. Menyediakan pipeline Retrieval-Augmented Generation (RAG) cerdas berbasis dokumen PDF resmi sekolah dengan fitur <strong>Agentic Web Navigation</strong>.</p>
            <div class="quick-meta">
                <div class="meta-pill">Base URL: http://localhost:8000/api/v1</div>
                <div class="meta-pill">Format: OpenAI Chat Completion Compliant</div>
                <div class="meta-pill">PgVector: 384 Dimensions</div>
                <div class="meta-pill">Versi: v1.0.0</div>
            </div>
        </div>

        <!-- Section: Overview & Architecture -->
        <section class="section-card">
            <div class="section-header">
                <h2 class="section-title">🧠 Cara Kerja RAG Pipeline</h2>
                <p class="section-subtitle">Bagaimana pertanyaan dari pengguna diubah menjadi jawaban akurat bersitasi tanpa halusinasi.</p>
            </div>

            <div class="step-list">
                <div class="step-item">
                    <div class="step-num">Langkah 01</div>
                    <div class="step-title">Ingestion & Vectorize</div>
                    <div class="step-desc">Dokumen PDF resmi diekstrak, dipotong secara semantik (parent-child), lalu di-generate vector 384 dimensi.</div>
                </div>
                <div class="step-item">
                    <div class="step-num">Langkah 02</div>
                    <div class="step-title">Hybrid Retrieval</div>
                    <div class="step-desc">Dense Cosine Search (pgvector) + Sparse Text Search (tsvector) digabung via Reciprocal Rank Fusion (RRF).</div>
                </div>
                <div class="step-item">
                    <div class="step-num">Langkah 03</div>
                    <div class="step-title">Confidence & Defense</div>
                    <div class="step-desc">Penyaringan ambang batas relevansi (Confidence Gate) dan sanitasi prompt injection sebelum diserahkan ke LLM.</div>
                </div>
                <div class="step-item">
                    <div class="step-num">Langkah 04</div>
                    <div class="step-title">Generation & Tools</div>
                    <div class="step-desc">LLM menghasilkan jawaban dengan referensi nomor halaman [Halaman X] dan Function Call navigasi halaman web.</div>
                </div>
            </div>

            <div class="callout">
                <strong>💡 $0 Budget Stack:</strong> Backend menggunakan Google Gemini API & Groq Llama 3.3 free-tier dengan PostgreSQL pgvector lokal, siap dikoneksikan ke antarmuka React/Vue/Mobile.
            </div>
        </section>

        <!-- Section: Base URL & Auth -->
        <section class="section-card" id="authentication">
            <div class="section-header">
                <h2 class="section-title">🔑 Base URL & Headers</h2>
                <p class="section-subtitle">Konfigurasi dasar koneksi untuk setiap request HTTP.</p>
            </div>

            <table class="param-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Nilai Default</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="param-name">Local URL</td>
                        <td><code>http://localhost:8000/api/v1</code></td>
                        <td>Alamat server lokal Laravel saat menjalankan <code>php artisan serve</code></td>
                    </tr>
                    <tr>
                        <td class="param-name">Header Content-Type</td>
                        <td><code>application/json</code></td>
                        <td>Wajib untuk semua request dengan payload body (POST/PUT)</td>
                    </tr>
                    <tr>
                        <td class="param-name">Header Accept</td>
                        <td><code>application/json</code></td>
                        <td>Memastikan respons selalu dikembalikan dalam format JSON</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <!-- Endpoint: POST /chat/completions -->
        <section class="section-card" id="chat-completions">
            <div class="section-header">
                <div class="endpoint-title-row">
                    <span class="endpoint-method badge-post">POST</span>
                    <span class="endpoint-path">/api/v1/chat/completions</span>
                </div>
                <p class="section-subtitle">Mengirim pesan pengguna ke AI Chatbot RAG untuk diproses dan mendapatkan jawaban atau perintah navigasi.</p>
            </div>

            <h3 style="font-size: 15px; margin-bottom: 8px;">Request Body (JSON)</h3>
            <table class="param-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Tipe</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="param-name">messages</span> <span class="param-required">Wajib</span></td>
                        <td><span class="param-type">array&lt;object&gt;</span></td>
                        <td>Array riwayat chat. Minimal berisi objek <code>{"role": "user", "content": "..."}</code>.</td>
                    </tr>
                    <tr>
                        <td><span class="param-name">stream</span> <span class="param-optional">Opsional</span></td>
                        <td><span class="param-type">boolean</span></td>
                        <td>Status streaming respons (default: <code>false</code>).</td>
                    </tr>
                    <tr>
                        <td><span class="param-name">model</span> <span class="param-optional">Opsional</span></td>
                        <td><span class="param-type">string</span></td>
                        <td>Nama model identifier (default: <code>"rag-sekolah"</code>).</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="font-size: 15px; margin-bottom: 8px;">Contoh Request</h3>
            <div class="code-container">
                <div class="code-header">
                    <div class="code-tabs">
                        <button class="code-tab active" onclick="switchTab(this, 'curl-chat')">cURL</button>
                        <button class="code-tab" onclick="switchTab(this, 'js-chat')">JavaScript / Fetch</button>
                        <button class="code-tab" onclick="switchTab(this, 'py-chat')">Python</button>
                    </div>
                    <button class="copy-btn" onclick="copyCode('code-chat')">📋 Copy</button>
                </div>
                <pre id="code-chat"><code>curl -X POST http://localhost:8000/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Apa visi dan jurusan di SMKN 26 Jakarta?"}
    ],
    "stream": false
  }'</code></pre>
            </div>

            <h3 style="font-size: 15px; margin: 20px 0 8px 0;">Contoh Response (200 OK)</h3>
            <div class="code-container">
                <div class="code-header">
                    <span style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono';">Response JSON (OpenAI Standard)</span>
                    <button class="copy-btn" onclick="copyCode('code-res-chat')">📋 Copy</button>
                </div>
                <pre id="code-res-chat"><code>{
  "id": "rag-7d2d3e91-4cf5-4cf6-9da8-a006ef664a78",
  "object": "chat.completion",
  "created": 1755145200,
  "model": "rag-sekolah",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "SMK Negeri 26 Jakarta memiliki spesialisasi pada spektrum bidang keahlian Teknologi dan Rekayasa, serta Teknologi Informasi dan Komunikasi [Halaman 1]."
      },
      "finish_reason": "stop"
    }
  ],
  "citations": [
    {
      "index": 1,
      "text": "Arsitektur Pengetahuan Terintegrasi...",
      "page": 1,
      "section": "Dataset SMKN 26 Jakarta",
      "chunkId": "e317db97-e2f4-4f7f-b7de-6b1e6bae9873"
    }
  ],
  "retrieval_metadata": {
    "trace_id": "b73debe6-1f87-4738-b981-c1ef7394acf9",
    "confidence_score": 0.824,
    "retrieval_latency_ms": 175.4
  }
}</code></pre>
            </div>

            <!-- Live Tester Console -->
            <div class="tester-box">
                <div class="tester-title">⚡ Interactive API Tester (Coba Langsung)</div>
                <div class="tester-input-group">
                    <input type="text" id="live-query-input" class="tester-input" placeholder="Ketik pertanyaan, misal: 'dimana halaman mars smk26 apa ya?' atau 'apa visi sekolah?'" value="Apa keunggulan dan jurusan di SMKN 26 Jakarta?">
                    <button class="btn-run" id="btn-live-test" onclick="runLiveChatTest()">Kirim Request</button>
                </div>
                <div id="live-test-output" class="tester-result">
                    <div class="code-container">
                        <div class="code-header">
                            <span id="live-status-label" style="font-size: 12px; color: #4ADE80; font-family: 'JetBrains Mono';">Status: 200 OK</span>
                            <span id="live-time-label" style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono';">Latency: - ms</span>
                        </div>
                        <pre><code id="live-json-result"></code></pre>
                    </div>
                </div>
            </div>
        </section>

        <!-- Endpoint: GET /documents -->
        <section class="section-card" id="get-documents">
            <div class="section-header">
                <div class="endpoint-title-row">
                    <span class="endpoint-method badge-get">GET</span>
                    <span class="endpoint-path">/api/v1/documents</span>
                </div>
                <p class="section-subtitle">Mendapatkan daftar semua dokumen PDF yang telah di-ingest ke dalam database vektor.</p>
            </div>

            <div class="code-container">
                <div class="code-header">
                    <span style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono';">cURL</span>
                    <button class="copy-btn" onclick="copyCode('code-get-docs')">📋 Copy</button>
                </div>
                <pre id="code-get-docs"><code>curl -X GET http://localhost:8000/api/v1/documents \
  -H "Accept: application/json"</code></pre>
            </div>

            <h3 style="font-size: 15px; margin: 20px 0 8px 0;">Contoh Response (200 OK)</h3>
            <div class="code-container">
                <pre><code>[
  {
    "id": "892a5530-6961-43d7-8e65-9ec584e9634d",
    "file_path": "storage/app/knowledge/sekolah.pdf",
    "status": "completed",
    "created_at": "2026-08-14 04:18:49",
    "updated_at": "2026-08-14 04:19:00"
  }
]</code></pre>
            </div>
        </section>

        <!-- Endpoint: POST /documents/ingest -->
        <section class="section-card" id="ingest-document">
            <div class="section-header">
                <div class="endpoint-title-row">
                    <span class="endpoint-method badge-post">POST</span>
                    <span class="endpoint-path">/api/v1/documents/ingest</span>
                </div>
                <p class="section-subtitle">Memicu proses ekstraksi, pemotongan semantik, dan pembuatan vector embedding untuk file PDF baru.</p>
            </div>

            <table class="param-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Tipe</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="param-name">file_path</span> <span class="param-required">Wajib</span></td>
                        <td><span class="param-type">string</span></td>
                        <td>Path relatif ke file PDF di server (contoh: <code>"storage/app/knowledge/sekolah.pdf"</code>).</td>
                    </tr>
                </tbody>
            </table>

            <div class="code-container">
                <div class="code-header">
                    <span style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono';">Request Payload</span>
                    <button class="copy-btn" onclick="copyCode('code-ingest-post')">📋 Copy</button>
                </div>
                <pre id="code-ingest-post"><code>curl -X POST http://localhost:8000/api/v1/documents/ingest \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "file_path": "storage/app/knowledge/sekolah.pdf"
  }'</code></pre>
            </div>

            <h3 style="font-size: 15px; margin: 20px 0 8px 0;">Contoh Response (200 OK)</h3>
            <div class="code-container">
                <pre><code>{
  "id": "e30560a8-ff5a-4cb2-8789-f0270a442d8f",
  "status": "ingestion_started"
}</code></pre>
            </div>
        </section>

        <!-- Endpoint: GET /documents/{id}/status -->
        <section class="section-card" id="document-status">
            <div class="section-header">
                <div class="endpoint-title-row">
                    <span class="endpoint-method badge-get">GET</span>
                    <span class="endpoint-path">/api/v1/documents/{id}/status</span>
                </div>
                <p class="section-subtitle">Mengecek status pemrosesan dokumen (pending, processing, completed, atau failed).</p>
            </div>

            <div class="code-container">
                <pre><code>curl -X GET http://localhost:8000/api/v1/documents/892a5530-6961-43d7-8e65-9ec584e9634d/status \
  -H "Accept: application/json"</code></pre>
            </div>

            <h3 style="font-size: 15px; margin: 20px 0 8px 0;">Contoh Response (200 OK)</h3>
            <div class="code-container">
                <pre><code>{
  "id": "892a5530-6961-43d7-8e65-9ec584e9634d",
  "status": "completed"
}</code></pre>
            </div>
        </section>

        <!-- Section: Frontend Integration -->
        <section class="section-card" id="frontend-integration">
            <div class="section-header">
                <h2 class="section-title">💻 Integrasi Frontend React</h2>
                <p class="section-subtitle">Contoh pemanggilan API dan penanganan otomatis Function Call (Agentic Navigation).</p>
            </div>

            <div class="code-container">
                <div class="code-header">
                    <span style="font-size: 12px; color: #94A3B8; font-family: 'JetBrains Mono';">useChat.js Hook Contoh</span>
                    <button class="copy-btn" onclick="copyCode('code-hook-ex')">📋 Copy</button>
                </div>
                <pre id="code-hook-ex"><code>import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async (userText) => {
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, stream: false })
      });

      const data = await res.json();
      const choice = data.choices[0];
      const assistantMessage = choice.message;

      // Cek apakah AI memanggil tool navigasi otomatis
      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        const tool = assistantMessage.tool_calls[0];
        if (tool.function.name === 'navigate_to_page') {
          const args = JSON.parse(tool.function.arguments);
          const targetUrl = `/${args.page}${args.section ? '#' + args.section : ''}`;
          navigate(targetUrl); // Pindah halaman otomatis
        }
      }

      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage };
}</code></pre>
            </div>
        </section>

        <!-- Section: Error Codes -->
        <section class="section-card" id="status-codes">
            <div class="section-header">
                <h2 class="section-title">⚠️ Kode Status HTTP</h2>
                <p class="section-subtitle">Daftar kode status respon standar dari API.</p>
            </div>

            <table class="param-table">
                <thead>
                    <tr>
                        <th>Status Code</th>
                        <th>Deskripsi</th>
                        <th>Penyebab & Penanganan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong style="color: #16A34A;">200 OK</strong></td>
                        <td>Permintaan Berhasil</td>
                        <td>Chat berhasil digenerate atau data berhasil diambil.</td>
                    </tr>
                    <tr>
                        <td><strong style="color: #D97706;">422 Unprocessable Entity</strong></td>
                        <td>Validasi Gagal</td>
                        <td>Format body tidak valid (misal: field <code>messages</code> tidak disertakan).</td>
                    </tr>
                    <tr>
                        <td><strong style="color: #DC2626;">404 Not Found</strong></td>
                        <td>Tidak Ditemukan</td>
                        <td>Dokumen dengan ID yang dicari tidak ada dalam basis data.</td>
                    </tr>
                    <tr>
                        <td><strong style="color: #DC2626;">500 Internal Server Error</strong></td>
                        <td>Kesalahan Server</td>
                        <td>Gangguan koneksi database atau kuota API LLM habis.</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </main>

    <script>
        function switchTab(btn, tabId) {
            const tabs = btn.parentElement.querySelectorAll('.code-tab');
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            const codeBlock = document.getElementById('code-chat');
            if (tabId === 'curl-chat') {
                codeBlock.innerHTML = `<code>curl -X POST http://localhost:8000/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "Apa visi dan jurusan di SMKN 26 Jakarta?"}
    ],
    "stream": false
  }'</code>`;
            } else if (tabId === 'js-chat') {
                codeBlock.innerHTML = `<code>const response = await fetch('http://localhost:8000/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Apa visi dan jurusan di SMKN 26 Jakarta?' }
    ],
    stream: false
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);</code>`;
            } else if (tabId === 'py-chat') {
                codeBlock.innerHTML = `<code>import requests

url = "http://localhost:8000/api/v1/chat/completions"
payload = {
    "messages": [
        {"role": "user", "content": "Apa visi dan jurusan di SMKN 26 Jakarta?"}
    ],
    "stream": False
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())</code>`;
            }
        }

        function copyCode(elementId) {
            const el = document.getElementById(elementId);
            const text = el.innerText || el.textContent;
            navigator.clipboard.writeText(text).then(() => {
                alert('Kode berhasil disalin ke clipboard!');
            });
        }

        async function runLiveChatTest() {
            const inputEl = document.getElementById('live-query-input');
            const btn = document.getElementById('btn-live-test');
            const outBox = document.getElementById('live-test-output');
            const jsonResult = document.getElementById('live-json-result');
            const statusLabel = document.getElementById('live-status-label');
            const timeLabel = document.getElementById('live-time-label');

            const query = inputEl.value.trim();
            if (!query) return;

            btn.disabled = true;
            btn.innerHTML = 'Memproses... ⏳';
            outBox.style.display = 'block';
            jsonResult.textContent = 'Menghubungkan ke API RAG...';

            const startTime = performance.now();

            try {
                const res = await fetch('/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: [{ role: 'user', content: query }],
                        stream: false
                    })
                });

                const duration = Math.round(performance.now() - startTime);
                const data = await res.json();

                statusLabel.textContent = `Status: ${res.status} ${res.statusText || 'OK'}`;
                statusLabel.style.color = res.ok ? '#4ADE80' : '#F87171';
                timeLabel.textContent = `Latency: ${duration} ms`;

                jsonResult.textContent = JSON.stringify(data, null, 2);
            } catch (err) {
                statusLabel.textContent = 'Error: Gagal Terhubung';
                statusLabel.style.color = '#F87171';
                jsonResult.textContent = String(err);
            } finally {
                btn.disabled = false;
                btn.innerHTML = 'Kirim Request';
            }
        }
    </script>
</body>
</html>
