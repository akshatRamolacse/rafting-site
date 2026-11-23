import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import ContactButtons from './components/ContactButtons.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Bungee from './pages/Bungee.jsx'
import About from './pages/About.jsx'
import Booking from './pages/Booking.jsx'
import Camping from './pages/Camping.jsx'
import Faq from './pages/Faq.jsx'
import Gallery from './pages/Gallery.jsx'
import Guide from './pages/Guide.jsx'
import Home from './pages/Home.jsx'
import Rafting from './pages/Rafting.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rafting" element={<Rafting />} />
          <Route path="/bungee" element={<Bungee />} />
          <Route path="/camping" element={<Camping />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/book" element={<Booking />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ContactButtons />
      <div aria-hidden className="h-14 bg-night md:hidden" />
    </>
  )
}
