<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | School Website Navigation Registry
    |--------------------------------------------------------------------------
    |
    | Pemetaan struktur halaman dan section resmi pada situs web SMKN 26 Jakarta.
    | Digunakan oleh Agentic AI Navigation Tool untuk mengarahkan pengguna secara presisi
    | sesuai dengan routing yang ada di Frontend (React Router).
    |
    */
    'pages' => [
        'beranda' => [
            'title' => 'Beranda Utama',
            'path' => '/',
            'aliases' => ['home', 'beranda', 'utama', 'dashboard'],
            'description' => 'Halaman utama website sekolah SMKN 26 Jakarta, ucapan selamat datang, hero banner, sambutan kepala sekolah, statistik, dan overview kegiatan.',
            'sections' => [
                'hero' => 'Banner utama dan sambutan',
                'sambutan' => 'Sambutan Kepala Sekolah',
                'stats' => 'Statistik dan data pencapaian sekolah',
                'cta' => 'Informasi pendaftaran dan kontak cepat',
            ],
        ],

        // --- Tentang Kami ---
        'tentang-kami' => [
            'title' => 'Tentang Kami',
            'path' => '/tentang-kami',
            'aliases' => ['tentang', 'tentang-sekolah', 'about'],
            'description' => 'Informasi lengkap profil sekolah, identitas sekolah, visi & misi, budaya mutu, dan sejarah SMKN 26 Jakarta.',
            'sections' => [
                'visi-misi' => 'Visi, Misi, dan Tujuan Sekolah',
                'identitas' => 'Identitas dan profil umum sekolah',
                'mars-smkn26' => 'Lirik dan lagu Mars SMKN 26 Jakarta',
            ],
        ],
        'guru-dan-staf' => [
            'title' => 'Guru dan Staf',
            'path' => '/tentang-kami/guru-dan-staf',
            'aliases' => ['guru', 'staf', 'pengajar', 'guru-staf', 'tenaga-pendidik'],
            'description' => 'Daftar dewan guru, pengajar kejuruan & normatif-adaptif, staf tata usaha, dan tenaga kependidikan SMKN 26 Jakarta.',
            'sections' => [
                'daftar-guru' => 'Daftar pengajar per jurusan',
                'staf-tu' => 'Tenaga administrasi dan staf sekolah',
            ],
        ],
        'sejarah' => [
            'title' => 'Sejarah Sekolah',
            'path' => '/tentang-kami/sejarah',
            'aliases' => ['sejarah', 'history', 'stm-pembangunan', 'asal-usul'],
            'description' => 'Sejarah perjalanan berdirinya SMK Negeri 26 Jakarta (dahulu STM Negeri 1 Jakarta / STM Pembangunan) sejak masa kepemimpinan Presiden Soeharto hingga kini.',
            'sections' => [
                'latar-belakang' => 'Latar belakang pendirian STM Pembangunan',
                'tonggak-sejarah' => 'Garis waktu dan perkembangan sekolah',
            ],
        ],
        'profil-sekolah' => [
            'title' => 'Profil Sekolah',
            'path' => '/tentang-kami/profil-sekolah',
            'aliases' => ['profil-sekolah', 'fasilitas', 'sarana-prasarana', 'sarpras'],
            'description' => 'Profil lengkap satuan pendidikan, sarana prasarana, bengkel kerja kejuruan, laboratorium komputer, fasilitas olahraga, dan lingkungan sekolah.',
            'sections' => [
                'sarana-prasarana' => 'Fasilitas dan sarana pembelajaran',
                'data-sekolah' => 'Data pokok sekolah dan akreditasi',
            ],
        ],
        'hubungan-industri' => [
            'title' => 'Hubungan Industri (Hubin)',
            'path' => '/tentang-kami/hubungan-industri',
            'aliases' => ['hubin', 'hubungan-industri', 'pkl', 'prakerin', 'magang', 'mitra-dudi', 'kerjasama'],
            'description' => 'Kerjasama kemitraan Dunia Usaha & Dunia Industri (DUDI), program Praktik Kerja Lapangan (PKL/Prakerin), magang industri, dan penyelarasan kurikulum vokasi.',
            'sections' => [
                'mitra-industri' => 'Daftar perusahaan mitra DUDI',
                'program-pkl' => 'Informasi dan alur Praktik Kerja Lapangan',
            ],
        ],

        // --- Program & Keahlian ---
        'program' => [
            'title' => 'Program & Keahlian',
            'path' => '/program',
            'aliases' => ['program', 'keahlian', 'kurikulum'],
            'description' => 'Overview program keahlian teknik rekayasa & teknologi, kurikulum 4 tahun vokasi di SMKN 26 Jakarta.',
            'sections' => [
                'overview-program' => 'Ringkasan program vokasi',
            ],
        ],
        'bkk' => [
            'title' => 'Bursa Kerja Khusus (BKK)',
            'path' => '/program/bkk',
            'aliases' => ['bkk', 'bursa-kerja', 'lowongan-kerja', 'loker', 'alumni-karir', 'penyaluran-kerja'],
            'description' => 'Bursa Kerja Khusus (BKK) SMKN 26 Jakarta, informasi rekrutmen kerja dari industri rekanan, lowongan pekerjaan alumni, dan penelusuran lulusan (tracer study).',
            'sections' => [
                'lowongan-aktif' => 'Informasi rekrutmen dan loker terbaru',
                'tracer-study' => 'Penelusuran alumni',
            ],
        ],
        'jurusan' => [
            'title' => 'Jurusan / Program Keahlian',
            'path' => '/program/jurusan',
            'aliases' => ['jurusan', 'kompetensi-keahlian', 'prodi', 'tkj', 'sija', 'toi', 'mekatronika', 'tkr', 'listrik', 'tflm', 'kgsp'],
            'description' => 'Daftar lengkap jurusan/konsentrasi keahlian di SMKN 26 Jakarta: SIJA (Sistem Informatika Jaringan dan Aplikasi), TKJ (Teknik Komputer Jaringan), TOI (Teknik Otomasi Industri), Teknik Mekatronika, TKR (Teknik Kendaraan Ringan), KGSP (Konstruksi Gedung Sanitasi dan Perawatan), TFLM (Teknik Fabrikasi Logam dan Manufaktur), TITL (Teknik Instalasi Tenaga Listrik), TEDK (Teknik Elektronika Daya dan Komunikasi).',
            'sections' => [
                'daftar-jurusan' => 'Daftar 8+ program keahlian teknik',
                'peluang-karir' => 'Peluang karir dan prospek lulusan per jurusan',
            ],
        ],
        'ekskul' => [
            'title' => 'Ekstrakurikuler',
            'path' => '/program/ekskul',
            'aliases' => ['ekskul', 'ekstrakurikuler', 'kegiatan-siswa', 'paskibra', 'pramuka', 'robotik', 'futsal', 'basket', 'rohis', 'rokris', 'pmr'],
            'description' => 'Daftar kegiatan ekstrakurikuler siswa untuk pengembangan minat dan bakat: Robotik, Paskibra, Pramuka, PMR, Olahraga (Futsal, Basket, Voli), Seni Tari, Musik, Rohis & Rokris.',
            'sections' => [
                'daftar-ekskul' => 'Daftar organisasi dan klub ekstrakurikuler',
            ],
        ],
        'lsp' => [
            'title' => 'Lembaga Sertifikasi Profesi (LSP-P1)',
            'path' => '/program/lsp',
            'aliases' => ['lsp', 'sertifikasi', 'bnsp', 'lsp-p1', 'uji-kompetensi', 'ukom'],
            'description' => 'LSP-P1 SMKN 26 Jakarta berlisensi Badan Nasional Sertifikasi Profesi (BNSP) untuk sertifikasi kompetensi kerja resmi bagi siswa dan lulusan.',
            'sections' => [
                'skema-sertifikasi' => 'Skema uji kompetensi keahlian BNSP',
            ],
        ],

        // --- Informasi ---
        'informasi' => [
            'title' => 'Pusat Informasi',
            'path' => '/informasi',
            'aliases' => ['informasi', 'info', 'pusat-informasi'],
            'description' => 'Pusat informasi resmi sekolah, portal berita, jadwal kalender akademik, dan pengumuman kedinasan.',
            'sections' => [
                'ringkasan-info' => 'Ringkasan informasi dan warta sekolah',
            ],
        ],
        'berita' => [
            'title' => 'Berita Terkini',
            'path' => '/informasi/berita',
            'aliases' => ['berita', 'news', 'artikel', 'kabar-sekolah', 'liputan'],
            'description' => 'Kumpulan berita kegiatan, kunjungan industri, workshop, prestasi, dan kabar terkini SMKN 26 Jakarta.',
            'sections' => [
                'berita-populer' => 'Berita sekolah terhangat',
            ],
        ],
        'kalender-akademik' => [
            'title' => 'Kalender Akademik',
            'path' => '/informasi/kalender-akademik',
            'aliases' => ['kalender', 'kalender-akademik', 'jadwal-sekolah', 'jadwal-libur', 'jadwal-ujian', 'uts', 'uas'],
            'description' => 'Jadwal kalender pendidikan, agenda semester, tanggal libur nasional/sekolah, jadwal PTS/PAS/UKK, dan Ujian Kompetensi Keahlian.',
            'sections' => [
                'jadwal-semester' => 'Kalender kegiatan belajar mengajar',
            ],
        ],
        'prestasi' => [
            'title' => 'Prestasi Siswa & Sekolah',
            'path' => '/informasi/prestasi',
            'aliases' => ['prestasi', 'juara', 'lomba', 'penghargaan', 'lks'],
            'description' => 'Daftar perolehan prestasi, piala penghargaan, pemenang Lomba Kompetensi Siswa (LKS) tingkat provinsi & nasional, serta prestasi akademik maupun non-akademik.',
            'sections' => [
                'prestasi-terbaru' => 'Prestasi terkini siswa SMKN 26 Jakarta',
                'prestasi-lks' => 'Rekam jejak juara LKS',
            ],
        ],

        // --- Dokumentasi ---
        'dokumentasi' => [
            'title' => 'Galeri & Dokumentasi',
            'path' => '/dokumentasi',
            'aliases' => ['dokumentasi', 'dokum', 'galeri', 'media'],
            'description' => 'Koleksi dokumentasi media kegiatan sekolah, dokumentasi visual, galeri foto, galeri video, dan tur virtual.',
            'sections' => [
                'koleksi-media' => 'Sorotan media dokumentasi',
            ],
        ],
        'galeri-photo' => [
            'title' => 'Galeri Foto',
            'path' => '/dokumentasi/galeri-photo',
            'aliases' => ['galeri-photo', 'galeri-foto', 'foto', 'koleksi-foto', 'album-foto'],
            'description' => 'Album foto dokumentasi upacara, perlombaan, workshop kejuruan, kunjungan industri, dan perayaan hari besar di sekolah.',
            'sections' => [
                'album-terbaru' => 'Album foto kegiatan terkini',
            ],
        ],
        'galeri-video' => [
            'title' => 'Galeri Video',
            'path' => '/dokumentasi/galeri-video',
            'aliases' => ['galeri-video', 'video', 'youtube', 'liputan-video', 'mars-video'],
            'description' => 'Video profil SMKN 26 Jakarta, liputan video kegiatan sekolah, video Mars SMKN 26 Jakarta, dan karya multimedia siswa.',
            'sections' => [
                'video-profil' => 'Video profil dan Mars SMKN 26 Jakarta',
            ],
        ],
        'kegiatan-sekolah' => [
            'title' => 'Kegiatan Sekolah',
            'path' => '/dokumentasi/kegiatan-sekolah',
            'aliases' => ['kegiatan-sekolah', 'kegiatan', 'agenda-kegiatan', 'event', 'acara'],
            'description' => 'Dokumentasi agenda kegiatan kesiswaan, peringatan hari nasional, peringatan HUT SMKN 26 Jakarta, dan event tahunan.',
            'sections' => [
                'agenda-event' => 'Daftar event dan kegiatan sekolah',
            ],
        ],
        'virtual-tour' => [
            'title' => 'Virtual Tour 360',
            'path' => '/dokumentasi/virtual-tour',
            'aliases' => ['virtual-tour', 'tur-virtual', 'tour-360', 'keliling-sekolah', 'school-tour'],
            'description' => 'Tur virtual 360 derajat lingkungan SMKN 26 Jakarta: menjelajahi gedung utama, bengkel praktik, laboratorium, lapangan, dan aula secara interaktif.',
            'sections' => [
                'tour-view' => 'Penampil 360 derajat area sekolah',
            ],
        ],

        // --- Portal & PPDB/SPMB ---
        'portal' => [
            'title' => 'Portal Layanan',
            'path' => '/portal',
            'aliases' => ['portal', 'layanan-siswa', 'portal-sekolah'],
            'description' => 'Pusat layanan terpadu bagi siswa, orang tua, dan calon peserta didik: SPMB (PPDB), layanan bantuan KJP Plus, dan PIP Kemendikbud.',
            'sections' => [
                'layanan-online' => 'Pilihan menu portal layanan',
            ],
        ],
        'spmb' => [
            'title' => 'SPMB / PPDB Pendaftaran Siswa Baru',
            'path' => '/portal/spmb',
            'aliases' => ['spmb', 'ppdb', 'daftar-sekolah', 'pendaftaran', 'siswa-baru', 'cara-daftar', 'syarat-daftar', 'jalur-masuk'],
            'description' => 'Sistem Penerimaan Murid Baru (SPMB / PPDB Online) SMKN 26 Jakarta: alur pendaftaran, persyaratan berkas, kuota jalur prestasi/zonasi/afirmasi, dan kontak panitia.',
            'sections' => [
                'alur-pendaftaran' => 'Langkah-langkah pendaftaran PPDB',
                'syarat-berkas' => 'Persyaratan administrasi calon peserta didik',
                'jadwal-ppdb' => 'Jadwal pelaksanaan seleksi PPDB',
            ],
        ],
        'kjp' => [
            'title' => 'Kartu Jakarta Pintar (KJP Plus)',
            'path' => '/portal/kjp',
            'aliases' => ['kjp', 'kjp-plus', 'bantuan-kjp', 'kartu-jakarta-pintar'],
            'description' => 'Informasi bantuan pendidikan Kartu Jakarta Pintar Plus (KJP Plus) untuk siswa berdomisili DKI Jakarta: berkas verifikasi, pengecekan status, dan mekanisme bantuan.',
            'sections' => [
                'persyaratan-kjp' => 'Syarat penerima bantuan KJP Plus',
                'verifikasi-kjp' => 'Prosedur validasi berkas di tata usaha',
            ],
        ],
        'pip' => [
            'title' => 'Program Indonesia Pintar (PIP)',
            'path' => '/portal/pip',
            'aliases' => ['pip', 'program-indonesia-pintar', 'bantuan-pip', 'kip'],
            'description' => 'Bantuan tunai Program Indonesia Pintar (PIP / KIP) dari Kemendikbudristek: kriteria penerima, aktivasi rekening SimPel BNI/BRI, dan pencairan dana.',
            'sections' => [
                'syarat-pip' => 'Kriteria penerima dana PIP Kemendikbud',
                'aktivasi-rekening' => 'Panduan aktivasi rekening bank penyalur',
            ],
        ],
    ],
];
