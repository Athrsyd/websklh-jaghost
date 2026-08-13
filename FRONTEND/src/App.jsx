import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
