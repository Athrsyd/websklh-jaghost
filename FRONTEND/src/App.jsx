import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Router from './Router/Router';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 font-sans text-slate-900 selection:bg-orange-500 selection:text-white antialiased overflow-x-hidden flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
