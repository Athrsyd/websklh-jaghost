import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router/Router'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  )
}

export default App