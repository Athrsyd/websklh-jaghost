<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | School Website Navigation Registry
    |--------------------------------------------------------------------------
    |
    | Pemetaan struktur halaman dan section resmi pada situs web SMKN 26 Jakarta.
    | Digunakan oleh Agentic AI Navigation Tool untuk mengarahkan pengguna secara presisi.
    |
    */
    'pages' => [
        'beranda' => [
            'title' => 'Beranda Utama',
            'path' => '/',
            'description' => 'Halaman utama website sekolah, ucapan selamat datang, pengumuman terkini, dan sorotan kegiatan.',
            'sections' => [
                'hero' => 'Banner utama dan pesan sambutan',
                'berita-terkini' => 'Sorotan berita sekolah terbaru',
                'pengumuman-singkat' => 'Pengumuman penting dan jadwal kegiatan',
            ],
        ],
        'tentang' => [
            'title' => 'Tentang Kami',
            'path' => '/tentang',
            'description' => 'Informasi lengkap profil sekolah, sejarah, visi & misi, profil guru, staf manajemen, serta fasilitas.',
            'sections' => [
                'profil-sejarah' => 'Profil Sekolah dan Sejarah SMK Negeri 26 Jakarta',
                'visi-misi' => 'Visi dan Misi sekolah',
                'profil-guru' => 'Daftar dan profil tenaga pengajar / guru',
                'staf-manajemen' => 'Struktur organisasi dan staf manajemen sekolah',
                'fasilitas' => 'Sarana prasarana, laboratorium, dan fasilitas sekolah',
                'mars-smkn26' => 'Lirik dan lagu Mars SMKN 26 Jakarta',
                'hymne-smkn26' => 'Lirik dan lagu Hymne SMKN 26 Jakarta',
            ],
        ],
        'program' => [
            'title' => 'Program & Keahlian',
            'path' => '/program',
            'description' => 'Profil jurusan teknik, kerja sama industri, program unggulan, ekstrakurikuler, dan produk unggulan siswa.',
            'sections' => [
                'profil-jurusan' => 'Daftar program keahlian / profil jurusan teknik rekayasa & teknologi',
                'kerja-sama-industri' => 'Mitra industri, Prakerin / PKL, dan kerja sama DUDI',
                'program-unggulan' => 'Program akademik dan vokasi unggulan sekolah',
                'ekstrakurikuler' => 'Daftar kegiatan ekstrakurikuler (Eskul) siswa',
                'produk-unggulan' => 'Karya, inovasi, dan produk unggulan buatan siswa',
            ],
        ],
        'informasi' => [
            'title' => 'Pusat Informasi',
            'path' => '/informasi',
            'description' => 'Pusat berita sekolah, pengumuman resmi, catatan prestasi, lulusan terbaik, dan ikatan alumni.',
            'sections' => [
                'berita' => 'Kumpulan artikel berita sekolah terbaru',
                'pengumuman' => 'Pengumuman edaran resmi sekolah',
                'prestasi' => 'Daftar prestasi lomba dan penghargaan siswa/sekolah',
                'lulusan-terbaik' => 'Daftar dan profil lulusan siswa terbaik',
                'alumni' => 'Informasi ikatan alumni dan penelusuran tamatan (Tracer Study)',
            ],
        ],
        'dokumentasi' => [
            'title' => 'Galeri & Dokumentasi',
            'path' => '/dokumentasi',
            'description' => 'Galeri foto kegiatan, video kegiatan sekolah, tur virtual sekolah (School Tour), dan liputan acara.',
            'sections' => [
                'galeri-foto' => 'Kumpulan dokumentasi foto kegiatan',
                'video' => 'Kumpulan video liputan dan profil sekolah',
                'school-tour' => 'Virtual tour dan penjelajahan lingkungan sekolah',
                'kegiatan' => 'Dokumentasi agenda kegiatan mingguan/tahunan',
            ],
        ],
        'ppdb' => [
            'title' => 'PPDB / Pendaftaran Siswa Baru',
            'path' => '/ppdb',
            'description' => 'Informasi Pendaftaran Peserta Didik Baru (PPDB), alur pendaftaran, syarat pendaftaran, dan FAQ.',
            'sections' => [
                'jadwal-ppdb' => 'Jadwal dan tanggal penting PPDB',
                'syarat-pendaftaran' => 'Persyaratan kriteria dan berkas pendaftaran',
                'alur-pendaftaran' => 'Alur dan cara daftar online',
                'faq-ppdb' => 'Pertanyaan yang sering ditanyakan seputar pendaftaran',
            ],
        ],
    ],
];
