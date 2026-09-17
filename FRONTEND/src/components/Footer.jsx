import React from 'react';
import { Link } from 'react-router-dom';
import logo26 from '../assets/logo26.webp';
import partner from '../assets/partner.webp';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-700 font-sans pt-12 sm:pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
        
        {/* Column 1: School Info, Contacts, Socials, Partners, Copyright (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <img src={logo26} alt="SMK Negeri 26 Jakarta" className="w-8 h-8 object-contain" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              SMK Negeri 26 Jakarta

            </h2>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
            SMK Negeri 26 Jakarta, membentuk generasi kompeten dan siap menghadapi dunia industri.
          </p>

          {/* Contact List */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-1">
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>smkn26jkt@gmail.com</span>
            </div>

            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(021) 4720310</span>
            </div>

            <div className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-snug">
                Jl. Balai Pustaka Baru I No. 2, Rawamangun, Jakarta Timur 13220
              </span>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 pt-2">
            {/* Website / Globe */}
            <a href="#" className="p-1.5 text-slate-700 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="p-1.5 text-slate-700 hover:text-pink-600 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="p-1.5 text-slate-700 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="p-1.5 text-slate-700 hover:text-emerald-600 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
            {/* Youtube */}
            <a href="#" className="p-1.5 text-slate-700 hover:text-red-600 transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Partner Logos Image */}
          <div className="pt-2">
            <img 
              src={partner} 
              alt="Mitra Industri SMKN 26 Jakarta" 
              className="h-7 w-auto object-contain" 
            />
          </div>

          {/* Copyright */}
          <div className="pt-2">
            <p className="text-[11px] text-slate-500 font-medium">
              Copyright © 2026 SMK Negeri 26 Jakarta. All Rights Reserved.
            </p>
          </div>

        </div>

        {/* Column 2: Menu Utama & Portal (2.5 Cols) */}
        <div className="lg:col-span-3 space-y-7">
          
          {/* Menu Utama */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">
              Menu Utama
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/tentang-kami/profil-sekolah" className="hover:text-blue-600 transition-colors">Profil Sekolah</Link>
              </li>
              <li>
                <Link to="/program/jurusan" className="hover:text-blue-600 transition-colors">Profil Jurusan</Link>
              </li>
              <li>
                <Link to="/tentang-kami/hubungan-industri" className="hover:text-blue-600 transition-colors">Hubungan Industri</Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="hover:text-blue-600 transition-colors">Fasilitas</Link>
              </li>
            </ul>
          </div>

          {/* Portal */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">
              Portal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link to="/portal/spmb" className="hover:text-blue-600 transition-colors">Portal SPMB</Link>
              </li>
              <li>
                <Link to="/portal/kjp" className="hover:text-blue-600 transition-colors">Portal KJP</Link>
              </li>
              <li>
                <Link to="/portal/pip" className="hover:text-blue-600 transition-colors">Portal PIP</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Column 3: Informasi & Dokumentasi (2.5 Cols) */}
        <div className="lg:col-span-2 space-y-7">
          
          {/* Informasi */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">
              Informasi
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link to="/informasi/berita" className="hover:text-blue-600 transition-colors">Berita</Link>
              </li>
              <li>
                <Link to="/informasi/prestasi" className="hover:text-blue-600 transition-colors">Prestasi</Link>
              </li>
              <li>
                <Link to="/informasi/kalender-akademik" className="hover:text-blue-600 transition-colors">Kalender Akademik</Link>
              </li>
              <li>
                <Link to="/informasi" className="hover:text-blue-600 transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Dokumentasi */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-tight">
              Dokumentasi
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <Link to="/dokumentasi/galeri-photo" className="hover:text-blue-600 transition-colors">Galeri Foto</Link>
              </li>
              <li>
                <Link to="/dokumentasi/galeri-video" className="hover:text-blue-600 transition-colors">Galeri Video</Link>
              </li>
              <li>
                <Link to="/dokumentasi/kegiatan-sekolah" className="hover:text-blue-600 transition-colors">Kegiatan Sekolah</Link>
              </li>
              <li>
                <Link to="/dokumentasi/virtual-tour" className="hover:text-blue-600 transition-colors">Virtual Tour</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Column 4: Lokasi Sekolah Map Box (2.5 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Lokasi Sekolah
          </h3>
          <div className="bg-slate-200 rounded-2xl w-[200px] h-[200px] overflow-hidden shadow-inner border border-slate-200 relative group">
            <iframe 
              title="Lokasi SMKN 26 Jakarta"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.522482086522!2d106.88731419999999!3d-6.1945787999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f49532b5b715%3A0xa4012b68ec698d4e!2sSMK%20Negeri%2026%20Jakarta!5e0!3m2!1sid!2sid!4v1786606693578!5m2!1sid!2sid"
              width="200"
              height="200"
              className="w-full h-full border-0 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
