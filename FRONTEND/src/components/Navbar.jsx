import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import logo26 from '../assets/logo26.png';

export default function Navbar({ activeTab, setActiveTab, lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
    }
  }, []);

  const navItems = [
    { name: 'Beranda', pageKey: 'Beranda', hasDropdown: false },
    {
      name: 'Tentang Kami',
      pageKey: 'Profil Sekolah',
      hasDropdown: true,
      children: [
        { name: 'Profil Sekolah', pageKey: 'Profil Sekolah' },
      ],
    },
    { name: 'Program', pageKey: 'Program', hasDropdown: true },
    { name: 'Informasi', pageKey: 'Informasi', hasDropdown: true },
    { name: 'Dokumentasi', pageKey: 'Dokumentasi', hasDropdown: true },
    { name: 'Portal', pageKey: 'Portal', hasDropdown: true },
  ];

  const handleNavClick = (pageKey) => {
    setActiveTab(pageKey);
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <header ref={headerRef} className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-slate-100 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Logo & Brand Name */}
        <div 
          onClick={() => handleNavClick('Beranda')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img 
            src={logo26} 
            alt="Logo SMKN 26 Jakarta" 
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain transform group-hover:scale-105 transition-transform" 
          />
          <span className="font-extrabold text-slate-800 text-xs sm:text-sm tracking-tight font-sans whitespace-nowrap">
            SMK Negeri 26 Jakarta
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs sm:text-sm font-medium">
          {navItems.map((item) => (
            <div 
              key={item.name}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setDropdownOpen(item.name)}
              onMouseLeave={() => item.hasDropdown && setDropdownOpen(null)}
            >
              <div 
                onClick={() => !item.hasDropdown && handleNavClick(item.pageKey)}
                className={`relative flex items-center gap-1 py-1 cursor-pointer transition-colors duration-200 ${
                  activeTab === item.pageKey || (item.children && item.children.some(c => c.pageKey === activeTab))
                    ? 'text-blue-500 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span>{item.name}</span>
                {item.hasDropdown && (
                  <svg className="w-3 h-3 text-slate-400 fill-current mt-0.5" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}

                {(activeTab === item.pageKey || (item.children && item.children.some(c => c.pageKey === activeTab))) && (
                  <span className="absolute bottom-[-3px] left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                )}
              </div>

              {/* Sub-menu Dropdown */}
              {item.hasDropdown && item.children && dropdownOpen === item.name && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                  {item.children.map((child) => (
                    <div
                      key={child.name}
                      onClick={() => handleNavClick(child.pageKey)}
                      className={`px-4 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                        activeTab === child.pageKey
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-500'
                      }`}
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Controls: Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="border border-slate-200 rounded-full p-0.5 flex items-center text-[10px] sm:text-[11px] font-bold bg-slate-50/50">
            <button
              type="button"
              onClick={() => setLang('ID')}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                lang === 'ID'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang('EN')}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full transition-all duration-200 ${
                lang === 'EN'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM3 17.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-5xl mx-auto mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 flex flex-col space-y-1 animate-fadeIn">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              <div
                onClick={() => !item.hasDropdown && handleNavClick(item.pageKey)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                  activeTab === item.pageKey
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.name}</span>
              </div>
              {item.hasDropdown && item.children && (
                <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-3">
                  {item.children.map((child) => (
                    <div
                      key={child.name}
                      onClick={() => handleNavClick(child.pageKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                        activeTab === child.pageKey
                          ? 'text-blue-600 font-bold bg-blue-50'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </header>
  );
}
