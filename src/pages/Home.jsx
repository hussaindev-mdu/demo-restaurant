import { useCallback, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Menu from '../components/Menu.jsx'
import SpecialOffers from '../components/SpecialOffers.jsx'
import Gallery from '../components/Gallery.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Reservation from '../components/Reservation.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const [prefill, setPrefill] = useState(null)

  // "Enquire" on an offer pre-fills the reservation form, then scrolls to it
  const handleSelectOffer = useCallback((offer) => {
    setPrefill({ text: offer.request, key: Date.now() })
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2 focus:text-charcoal"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Menu />
        <SpecialOffers onSelectOffer={handleSelectOffer} />
        <Gallery />
        <Testimonials />
        <Reservation prefill={prefill} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
