import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfilSekolah from './pages/ProfilSekolah';

export default function App() {
  const [lang, setLang] = useState('ID');
  const [activeTab, setActiveTab] = useState('Beranda');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'Profil Sekolah':
      case 'Visi & Misi':
        return <ProfilSekolah key="profil" />;
      case 'Beranda':
      default:
        return <Home key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-900 selection:bg-orange-500 selection:text-white antialiased overflow-x-hidden flex flex-col justify-between">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      <div className="flex-grow">
        {renderActivePage()}
      </div>

      <Footer />
    </div>
  );
}
