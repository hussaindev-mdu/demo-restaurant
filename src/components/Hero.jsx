import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ArrowRight, CalendarCheck, ChevronDown } from 'lucide-react'
import ErrorBoundary from './ui/ErrorBoundary.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Button from './ui/Button.jsx'
import { PHOTOS } from '../data/content.js'

// The 3D scene (three.js) is code-split so it never blocks first paint
const Hero3D = lazy(() => import('./Hero3D.jsx'))

const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Hero() {
  const [show3D] = useState(supportsWebGL)
  const [inView, setInView] = useState(true)
  const [lidOpen, setLidOpen] = useState(true)
  const stageRef = useRef(null)

  // Pause rendering when the hero is scrolled out of view (saves battery/GPU)
  useEffect(() => {
    const el = stageRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [show3D])
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
      <SmartImage
        id={PHOTOS.hero}
        alt="Elegant restaurant interior with warm lighting and set tables"
        priority
        widths={[800, 1200, 1600, 2000]}
        sizes="100vw"
        width={2000}
        height={1333}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/80 via-charcoal/55 to-charcoal/95" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/70 to-transparent" />

      <div className="container-x grid items-center gap-4 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="max-w-3xl">
          <p className="eyebrow !text-gold-400 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gold-500" />
            South &amp; North Indian Fusion
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.75rem] font-semibold leading-[1.05] text-cream-50 sm:text-6xl lg:text-[4.25rem] xl:text-7xl">
            Experience the Art of <span className="italic text-gold-400">Authentic</span> Flavours
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-200/85 sm:text-lg">
            Where the slow-cooked richness of the South meets the tandoor-fired soul of the North. Handcrafted
            recipes, fragrant spices and a welcome that feels like family.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#menu" variant="gold">
              Explore Menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#reservation" variant="outline">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Reserve a Table
            </Button>
          </div>
        </div>

        {show3D && (
          <div ref={stageRef} className="relative h-[22rem] sm:h-[28rem] lg:h-[38rem]">
            <ErrorBoundary>
              <Suspense fallback={null}>
                <Hero3D active={inView} onOpenChange={setLidOpen} />
              </Suspense>
            </ErrorBoundary>
            <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[0.65rem] font-medium uppercase tracking-[0.28em] text-gold-400/80">
              {lidOpen ? 'Tap the pot to seal it · Dum biryani' : 'Tap the pot to lift the lid'}
            </p>
          </div>
        )}
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs uppercase tracking-[0.25em] text-cream-100/70 transition-colors hover:text-gold-400 sm:flex"
      >
        Discover
        <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
