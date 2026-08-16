import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/dunemLogo.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { IoMenu, IoClose, IoChevronDown, IoChevronUp, IoCloudDownloadOutline } from "react-icons/io5";

const Navbar = () => {
    const location = useLocation();
    const [activePage, setActivePage] = useState('beranda');
    const [hoveredPage, setHoveredPage] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    // Mobile state
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
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

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setMobileAccordion(null);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const [bahasa, setBahasa] = useState('ID');

    const navlinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
        { name: 'Program', href: '/program' },
        { name: 'Informasi', href: '/informasi' },
        { name: 'Dokumentasi', href: '/dokumentasi' },
        { name: 'Portal', href: '/portal' },
    ];

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
    ];

    // Desktop hover handlers — unchanged
    const handleHover = (linkName) => {
        const normalizedName = linkName.toLowerCase();
        setHoveredPage(normalizedName);
        setOpenMenu(linkName);
    };
    const handleLeave = () => {
        setHoveredPage(null);
        setOpenMenu(null);
    };
    const currentPage = hoveredPage || activePage;

    // Mobile accordion toggle
    const toggleAccordion = (linkName) => {
        setMobileAccordion(prev => prev === linkName ? null : linkName);
    };

    const hasSublinks = (linkName) =>
        subnavlinks.some(sub => sub.parentName === linkName);

    return (
        <>
            {/* ─── DESKTOP NAVBAR ─── */}
            <div className="w-full fixed z-9999 hidden lg:block">
                <div className="container border-t-white bg-white backdrop-blur-sm flex justify-between shadow-xl items-center
                    rounded-full px-8 mt-4 w-[95%] mx-auto py-2">

                    <a href="">
                        <div className="flex justify-center items-center gap-4">
                            <img src={logo} alt="Logo" className="h-12" />
                            <h1 className="text-xl font-bold">SMK Negeri 26 Jakarta</h1>
                        </div>
                    </a>

                    {/* Desktop navlinks — unchanged */}
                    <div className="flex gap-8">
                        {navlinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => handleHover(link.name)}
                                onMouseLeave={handleLeave}
                            >
                                <Link
                                    to={link.href}
                                    className={`text-md hover:text-blue-500
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

                    {/* Desktop language toggle — unchanged */}
                    <div>
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

            {/* ─── MOBILE / TABLET NAVBAR ─── */}
            <div className="w-full fixed z-10000 lg:hidden">
                <div className="bg-white shadow-md flex rounded-full m-4 justify-between items-center px-4 py-3">
                    {/* Logo */}
                    <a href="">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="Logo" className="h-9" />
                            <h1 className="text-base font-bold leading-tight">SMK Negeri 26 Jakarta</h1>
                        </div>
                    </a>

                    {/* Hamburger */}
                    <button
                        onClick={
                            () => setMobileOpen(prev => !prev)
                        }
                        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        aria-label="Buka menu"
                    >
                        {mobileOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* ─── MOBILE MENU OVERLAY ─── */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-9999 bg-black/40 transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <div
                ref={mobileMenuRef}
                className={`fixed -top-2 left-0 right-0 z-9999 bg-white rounded-2xl shadow-2xl
                    transition-all duration-300 ease-in-out lg:hidden flex flex-col w-9/10 mx-auto
                    ${mobileOpen ? 'translate-y-24 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
                style={{ maxHeight: '92vh' }}
            >
                {/* Panel header */}
                {/* <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="Logo" className="h-9" />
                        <h1 className="text-base font-bold">SMK Negeri 26 Jakarta</h1>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
                        aria-label="Tutup menu"
                    >
                        <IoClose size={24} />
                    </button>
                </div> */}

                {/* Scrollable nav links */}
                <div className="overflow-y-auto flex-1 px-4 py-2">
                    {navlinks.map((link) => {
                        const subs = subnavlinks.filter(sub => sub.parentName === link.name);
                        const isAccordionOpen = mobileAccordion === link.name;
                        const isActive = activePage === link.name.toLowerCase();

                        return (
                            <div key={link.name}>
                                {subs.length > 0 ? (
                                    // Item with sublinks → accordion
                                    <>
                                        <div

                                            className={`w-full flex items-center justify-between py-3.5
                                                text-left text-[15px] font-medium border-b border-gray-100
                                                ${isActive ? 'text-blue-600' : 'text-gray-800'}`}
                                        >
                                            <Link className="block w-1/2" to={link.href}>
                                                {link.name}
                                            </Link>
                                            <div
                                                onClick={() => toggleAccordion(link.name)}
                                                className="w-1/2 flex justify-end items-center">
                                                <span>
                                                    {isAccordionOpen
                                                        ? <IoChevronUp size={18} className="text-gray-400" />
                                                        : <IoChevronDown size={18} className="text-gray-400" />
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        {/* Accordion sublinks */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out
                                                ${isAccordionOpen ? 'max-h-100' : 'max-h-0'}`}
                                        >
                                            {subs.map((sublink) => (
                                                <Link
                                                    key={sublink.name}
                                                    to={sublink.href}
                                                    className="block pl-5 py-2.5 text-[14px] text-gray-600 hover:text-blue-500 border-b border-gray-50"
                                                >
                                                    {sublink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    // Item tanpa sublinks → link biasa
                                    <Link
                                        to={link.href}
                                        className={`block py-3.5 text-[15px] font-medium border-b border-gray-100
                                            ${isActive ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom actions */}
                <div className="px-4 py-4 border-t border-gray-100 flex flex-col gap-3">
                    {/* Language toggle */}
                    <div className="flex rounded-full overflow-hidden border border-blue-500">
                        <button
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition duration-300
                                ${bahasa === 'ID' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'}`}
                            onClick={() => setBahasa('ID')}
                        >
                            ID
                        </button>
                        <button
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition duration-300
                                ${bahasa === 'EN' ? 'bg-blue-500 text-white' : 'text-blue-500 bg-white'}`}
                            onClick={() => setBahasa('EN')}
                        >
                            EN
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Navbar;