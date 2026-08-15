import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import TentangKami from '../Pages/TentangKami'
import HubunganIndustri from '../Pages/TentangKami/HubunganIndustri'
import Beranda from '../Pages/Beranda'
import GuruStaf from '../Pages/TentangKami/GuruStaf'
import Prestasi from '../Pages/TentangKami/Prestasi'
import Sejarah from '../Pages/TentangKami/Sejarah'
import ProfileSekolah from '../Pages/TentangKami/ProfileSekolah'
import Program from '../Pages/Program'
import BKK from '../Pages/program/BKK'
import Jurusan from '../Pages/program/Jurusan'
import Ekskul from '../Pages/program/Ekskul'
import LSP from '../Pages/program/LSP'
import Informasi from '../Pages/Informasi'
import Berita from '../Pages/info/Berita'
import KalenderAkademik from '../Pages/info/KalenderAkademik'
import Pengumuman from '../Pages/info/Pengumuman'
import Dokumentasi from '../Pages/Dokumentasi'
import GaleriFoto from '../Pages/dokum/GaleriFoto'
import GaleriVideo from '../Pages/dokum/GaleriVideo'
import VirtualTour from '../Pages/dokum/VirtualTour'
import Portal from '../Pages/Portal'
import SPMB from '../Pages/portal/SPMB'
import KJP from '../Pages/portal/KJP'
import PIP from '../Pages/portal/PIP'
import KegiatanSekolah from '../Pages/dokum/KegiatanSekola'
import Lenis from "lenis";


const Router = () => {
    const location = useLocation();
        useEffect(() => {
            const lenis = new Lenis();

            lenis.scrollTo(0, { immediate: true });
        }, [location.pathname]);

        return (
            <Routes>
                {/* Beranda */}
                <Route path="/" element={<Beranda />} />

                {/* Tentang Kami */}
                <Route path="/tentang-kami" element={<TentangKami />} />
                <Route path="/tentang-kami/guru-dan-staf" element={<GuruStaf />} />
                <Route path="/tentang-kami/prestasi" element={<Prestasi />} />
                <Route path="/tentang-kami/sejarah" element={<Sejarah />} />
                <Route path="/tentang-kami/profil-sekolah" element={<ProfileSekolah />} />
                <Route path="/tentang-kami/hubungan-industri" element={<HubunganIndustri />} />

                {/* program */}
                <Route path="/program" element={<Program />} />
                <Route path="/program/bkk" element={<BKK />} />
                <Route path="/program/jurusan" element={<Jurusan />} />
                <Route path="/program/ekskul" element={<Ekskul />} />
                <Route path="/program/lsp" element={<LSP />} />

                {/* Informasi */}
                <Route path="/informasi" element={<Informasi />} />
                <Route path="/informasi/berita" element={<Berita />} />
                <Route path="/informasi/kalender-akademik" element={<KalenderAkademik />} />
                <Route path="/informasi/pengumuman" element={<Pengumuman />} />

                {/* Dokumentasi */}
                <Route path="/dokumentasi" element={<Dokumentasi />} />
                <Route path="/dokumentasi/galeri-photo" element={<GaleriFoto />} />
                <Route path="/dokumentasi/galeri-video" element={<GaleriVideo />} />
                <Route path="/dokumentasi/kegiatan-sekolah" element={<KegiatanSekolah />} />
                <Route path="/dokumentasi/virtual-tour" element={<VirtualTour />} />

                {/* Portal */}
                <Route path="/portal" element={<Portal />} />
                <Route path="/portal/spmb" element={<SPMB />} />
                <Route path="/portal/kjp" element={<KJP />} />
                <Route path="/portal/pip" element={<PIP />} />
            </Routes>
        )
    }

export default Router