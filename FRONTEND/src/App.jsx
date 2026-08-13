import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router/Router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}

export default App