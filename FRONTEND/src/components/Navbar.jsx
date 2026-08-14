import React, { useState, useEffect } from 'react'
import logo from '../assets/dunemLogo.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('beranda');
    const [hoveredPage, setHoveredPage] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        console.log(location.pathname);
        console.log(activePage);
        if (location.pathname === '/program/bkk' || location.pathname === '/program/jurusan' || location.pathname === '/program/ekskul' || location.pathname === '/program/lsp') {
            setActivePage('program');
        }
        else if (location.pathname === '/tentang-kami' || location.pathname === '/tentang-kami/guru-dan-staf' || location.pathname === '/tentang-kami/prestasi' || location.pathname === '/tentang-kami/sejarah' || location.pathname === '/tentang-kami/profil-sekolah' || location.pathname === '/tentang-kami/hubungan-industri') {
            setActivePage('tentang kami');
        }
        else if (location.pathname === '/informasi/berita' || location.pathname === '/informasi/kalender-akademik' || location.pathname === '/informasi/pengumuman') {
            setActivePage('informasi');
        }
        else if (location.pathname === '/dokumentasi/galeri-photo' || location.pathname === '/dokumentasi/galeri-video' || location.pathname === '/dokumentasi/kegiatan-sekolah') {
            setActivePage('dokumentasi');
        }
        else if (location.pathname === '/portal/spmb' || location.pathname === '/portal/kjp' || location.pathname === '/portal/pip') {
            setActivePage('portal');
        }
        else {
            setActivePage('beranda');
        }
    }, [location.pathname]);

    const [bahasa, setBahasa] = useState('ID')
    const navlinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Program', href: '/program' },
        { name: 'Informasi', href: '/informasi' },
        { name: 'Dokumentasi', href: '/dokumentasi' },
        { name: 'Portal', href: '/portal' },
    ]
    const subnavlinks = [
        { parentName: 'Tentang Kami', name: 'Guru dan Staf', href: '/tentang-kami/guru-dan-staf' },
        { parentName: 'Tentang Kami', name: 'Prestasi', href: '/tentang-kami/prestasi' },
        { parentName: 'Tentang Kami', name: 'Sejarah', href: '/tentang-kami/sejarah' },
        { parentName: 'Tentang Kami', name: 'Profil Sekolah', href: '/tentang-kami/profil-sekolah' },
        { parentName: 'Tentang Kami', name: 'Hubungan Industri', href: '/tentang-kami/hubungan-industri' },
        { parentName: 'Program', name: 'BKK', href: '/program/bkk' },
        { parentName: 'Program', name: 'Jurusan', href: '/program/jurusan' },
        { parentName: 'Program', name: 'Ekskul', href: '/program/ekskul' },
        { parentName: 'Program', name: 'LSP', href: '/program/lsp' },
        { parentName: 'Informasi', name: 'Berita', href: '/informasi/berita' },
        { parentName: 'Informasi', name: 'Kalender Akademik', href: '/informasi/kalender-akademik' },
        { parentName: 'Informasi', name: 'Pengumuman', href: '/informasi/pengumuman' },
        { parentName: 'Dokumentasi', name: 'Galeri Foto', href: '/dokumentasi/galeri-photo' },
        { parentName: 'Dokumentasi', name: 'Galeri Video', href: '/dokumentasi/galeri-video' },
        { parentName: 'Dokumentasi', name: 'Kegiatan Sekolah', href: '/dokumentasi/kegiatan-sekolah' },
        { parentName: 'Portal', name: 'SPMB', href: '/portal/spmb' },
        { parentName: 'Portal', name: 'KJP', href: '/portal/kjp' },
        { parentName: 'Portal', name: 'PIP', href: '/portal/pip' },
    ]

    const handleHover = (linkName) => {
        const normalizedName = linkName.toLowerCase();
        setHoveredPage(normalizedName);
        setOpenMenu(linkName);
    }
    const handleLeave = () => {
        setHoveredPage(null);
        setOpenMenu(null);
    }
    const currentPage = hoveredPage || activePage;

    return (
        <div className="w-full fixed z-9999">
            <div className="container  border-t-white  bg-white backdrop-blur-sm flex justify-between shadow-xl items-center
                rounded-full px-8 mt-4 w-19/20 mx-auto py-2">

                <a href="">
                    <div className="flex justify-center items-center gap-4 ">
                        <img src={logo} alt="Logo" className="h-12" />
                        <h1 className="text-xl font-bold">SMK Negeri 26 Jakarta</h1>
                    </div>
                </a>


                {/* navliks */}
                <div className="flex gap-8">
                    {navlinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => handleHover(link.name)}
                            onMouseLeave={handleLeave}
                        >
                            <Link
                                to={link.href} className={` text-md  hover:text-blue-500
                                after:absolute after:top-6 after:left-0 after:h-0.5 after:w-0
                                after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full
                                ${currentPage === link.name.toLowerCase() ? 'text-blue-500 after:scale-100' : 'text-gray-700'}`}>
                                {link.name}
                            </Link>
                            <div className={`absolute left-0 top-full mt-0.5 pt-2 ${openMenu === link.name ? 'block' : 'hidden'} bg-white shadow-xl 
                                transition-all duration-300 ease-in-out rounded-lg`}>
                                {subnavlinks
                                    .filter((sublink) => sublink.parentName === link.name)
                                    .map((sublink) => (
                                        <Link
                                            key={sublink.name}
                                            to={sublink.href}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            {sublink.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* tombolbahas */}
                <div className="">
                    <div className="container flex flex-row gap-4 rounded-full px-2 py-2 bg-transparent text-white border border-blue-500
                        hover:text-white transition duration-300 ease-in-out">
                        <button
                            className={`rounded-full px-2 transition duration-300 ease-in-out ${bahasa === 'ID' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                            onClick={() => setBahasa('ID')}
                        >
                            ID
                        </button>
                        <button
                            className={`rounded-full px-2 transition duration-300 ease-in-out ${bahasa === 'EN' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                            onClick={() => setBahasa('EN')}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar