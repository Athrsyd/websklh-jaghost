import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/dunemLogo.webp'
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
        if (location.pathname === '/program/bkk' || location.pathname === '/program/jurusan' || location.pathname === '/program/ekskul' || location.pathname === '/program/lsp' || location.pathname === '/program/blud' || location.pathname.startsWith('/program/')) {
            setActivePage('program');
        }
        else if (location.pathname === '/tentang-kami' || location.pathname === '/tentang-kami/guru-dan-staf' || location.pathname === '/tentang-kami/sejarah' || location.pathname === '/tentang-kami/profil-sekolah' || location.pathname === '/tentang-kami/hubungan-industri') {
            setActivePage('tentang kami');
        }
        else if (location.pathname === '/informasi' || location.pathname.startsWith('/informasi/')) {
            setActivePage('informasi');
        }
        else if (location.pathname === '/dokumentasi/galeri-photo' || location.pathname === '/dokumentasi/galeri-video' || location.pathname === '/dokumentasi/kegiatan-sekolah' || location.pathname.startsWith('/dokumentasi/')) {
            setActivePage('dokumentasi');
        }
        else if (location.pathname === '/portal/spmb' || location.pathname === '/portal/kjp' || location.pathname === '/portal/pip' || location.pathname.startsWith('/portal/')) {
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
        { name: 'Program', href: '/program/jurusan' },
        { name: 'Informasi', href: '/informasi' },
        { name: 'Dokumentasi', href: '/dokumentasi' },
        { name: 'Portal', href: '/portal' },
    ];

    const subnavlinks = [
        { parentName: 'Tentang Kami', name: 'Guru dan Staf', href: '/tentang-kami/guru-dan-staf' },
        { parentName: 'Tentang Kami', name: 'Sejarah', href: '/tentang-kami/sejarah' },
        { parentName: 'Tentang Kami', name: 'Profil Sekolah', href: '/tentang-kami' },
        { parentName: 'Tentang Kami', name: 'Hubungan Industri', href: '/tentang-kami/hubungan-industri' },
        { parentName: 'Program', name: 'BKK', href: '/program/bkk' },
        { parentName: 'Program', name: 'Jurusan', href: '/program/jurusan' },
        { parentName: 'Program', name: 'Ekskul', href: '/program/ekskul' },
        { parentName: 'Program', name: 'LSP', href: '/program/lsp' },
        { parentName: 'Program', name: 'BLUD', href: '/program/blud' },
        { parentName: 'Informasi', name: 'Berita', href: '/informasi/berita' },
        { parentName: 'Informasi', name: 'Prestasi', href: '/informasi/prestasi' },
        { parentName: 'Informasi', name: 'Kontak', href: '/informasi/kontak' },
        { parentName: 'Dokumentasi', name: 'Galeri Foto', href: '/dokumentasi/galeri-photo' },
        { parentName: 'Dokumentasi', name: 'Galeri Video', href: '/dokumentasi/galeri-video' },
        { parentName: 'Dokumentasi', name: 'Kegiatan Sekolah', href: '/dokumentasi/kegiatan-sekolah' },
        { parentName: 'Dokumentasi', name: 'School Tour ', href: '/dokumentasi/virtual-tour' },
        { parentName: 'Portal', name: 'SPMB', href: '/portal/spmb' },
        { parentName: 'Portal', name: 'KJP', href: '/portal/kjp' },
        { parentName: 'Portal', name: 'PIP', href: '/portal/pip' },
        { parentName: 'Portal', name: 'LMS', href: 'https://lms.smkn26jkt.sch.id/' },
        { parentName: 'Portal', name: 'Perpus26', href: 'https://perpus.smkn26jkt.sch.id/' },
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

                    <Link to="/">
                        <div className="flex justify-center items-center gap-4">
                            <img src={logo} alt="Logo" className="h-12" />
                            <h1 className="text-xl font-bold">SMK Negeri 26 Jakarta</h1>
                        </div>
                    </Link>

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
                                    className={`text-md hover:text-blue-500 flex items-center gap-1
                                        after:absolute after:top-6 after:left-0 after:h-0.5 after:w-0
                                        after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full
                                        ${currentPage === link.name.toLowerCase() ? 'text-blue-500 after:scale-100' : 'text-gray-700'}`}>
                                    <span>{link.name}</span>
                                    {hasSublinks(link.name) && (
                                        <IoChevronDown
                                            size={13}
                                            className={`transition-transform duration-200 ${openMenu === link.name ? 'rotate-180' : ''} ${currentPage === link.name.toLowerCase() ? 'text-blue-500' : 'text-gray-400'}`}
                                        />
                                    )}
                                </Link>
                                <div className={`absolute left-0 top-full mt-0.5 pt-2 ${openMenu === link.name ? 'block' : 'hidden'} bg-white shadow-xl
                                    transition-all duration-300 ease-in-out rounded-lg`}>
                                    {subnavlinks
                                        .filter((sublink) => sublink.parentName === link.name)
                                        .map((sublink) => (
                                            <Link
                                                key={sublink.name}
                                                to={sublink.href}
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
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
            <div className="w-full fixed top-0 left-0 z-10000 lg:hidden">
                <div className="bg-white/95 backdrop-blur-md shadow-md flex rounded-full m-3 sm:m-4 justify-between items-center px-4 py-2.5 sm:py-3 border border-gray-100">
                    {/* Logo */}
                    <Link to="/" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <img src={logo} alt="Logo" className="h-8 sm:h-9" />
                            <h1 className="text-sm sm:text-base font-bold leading-tight text-gray-900">SMK Negeri 26 Jakarta</h1>
                        </div>
                    </Link>

                    {/* Hamburger */}
                    <button
                        onClick={() => setMobileOpen(prev => !prev)}
                        className="p-2 rounded-full text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer"
                        aria-label="Buka menu navigasi"
                    >
                        {mobileOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* ─── MOBILE MENU OVERLAY ─── */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-9999 bg-black/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden
                    ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down panel */}
            <div
                ref={mobileMenuRef}
                className={`fixed top-18 sm:top-20 left-0 right-0 z-9999 bg-white rounded-3xl shadow-2xl border border-gray-100
                    transition-all duration-300 ease-in-out lg:hidden flex flex-col w-[92%] sm:w-[90%] max-w-lg mx-auto
                    ${mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0 pointer-events-none'}`}
                style={{ maxHeight: 'calc(100vh - 6rem)' }}
            >
                {/* Scrollable nav links */}
                <div className="overflow-y-auto flex-1 px-5 py-3">
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
                                                text-left text-[15px] sm:text-base font-medium border-b border-gray-100
                                                ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'}`}
                                        >
                                            <Link
                                                className="block flex-1 py-1"
                                                to={link.href}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => toggleAccordion(link.name)}
                                                className="p-2 -mr-2 flex justify-end items-center cursor-pointer text-gray-500 hover:text-blue-600"
                                                aria-label={`Toggle submenu ${link.name}`}
                                            >
                                                {isAccordionOpen
                                                    ? <IoChevronUp size={18} />
                                                    : <IoChevronDown size={18} />
                                                }
                                            </button>
                                        </div>
                                        {/* Accordion sublinks */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-50/70 rounded-xl px-2
                                                ${isAccordionOpen ? 'max-h-96 my-2 py-1' : 'max-h-0'}`}
                                        >
                                            {subs.map((sublink) => (
                                                <Link
                                                    key={sublink.name}
                                                    to={sublink.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="block pl-4 pr-3 py-2.5 text-[14px] font-medium text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors border-b border-gray-100/50 last:border-b-0"
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
                                        onClick={() => setMobileOpen(false)}
                                        className={`block py-3.5 text-[15px] sm:text-base font-medium border-b border-gray-100
                                            ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-800'} hover:text-blue-600`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom actions */}
                <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-3 bg-slate-50/50 rounded-b-3xl">
                    {/* Language toggle */}
                    <div className="flex rounded-full overflow-hidden border border-blue-500 p-0.5 bg-white">
                        <button
                            className={`flex-1 py-2 text-sm font-semibold rounded-full transition duration-300 cursor-pointer
                                ${bahasa === 'ID' ? 'bg-blue-500 text-white shadow-xs' : 'text-blue-500 bg-transparent'}`}
                            onClick={() => setBahasa('ID')}
                        >
                            ID
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-semibold rounded-full transition duration-300 cursor-pointer
                                ${bahasa === 'EN' ? 'bg-blue-500 text-white shadow-xs' : 'text-blue-500 bg-transparent'}`}
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