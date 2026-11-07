import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Reveal from './ui/Reveal.jsx'
import { GALLERY } from '../data/content.js'

const lightboxSrc = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

function Lightbox({ index, onClose, onChange }) {
  const closeRef = useRef(null)
  const item = GALLERY[index]

  const prev = useCallback(() => onChange((index - 1 + GALLERY.length) % GALLERY.length), [index, onChange])
  const next = useCallback(() => onChange((index + 1) % GALLERY.length), [index, onChange])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const iconBtn =
    'flex h-11 w-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 backdrop-blur transition-colors hover:bg-gold-500 hover:text-charcoal'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${GALLERY.length}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery" className={`${iconBtn} absolute right-4 top-4`}>
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev() }}
        aria-label="Previous image"
        className={`${iconBtn} absolute left-3 top-1/2 -translate-y-1/2 sm:left-6`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img
          src={lightboxSrc(item.photo)}
          alt={item.alt}
          className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
        />
        <figcaption className="mt-4 text-center text-sm text-cream-200/80">
          {item.alt} <span className="text-gold-400">· {index + 1}/{GALLERY.length}</span>
        </figcaption>
      </figure>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); next() }}
        aria-label="Next image"
        className={`${iconBtn} absolute right-3 top-1/2 -translate-y-1/2 sm:right-6`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const lastTrigger = useRef(null)

  const close = useCallback(() => {
    setOpenIndex(null)
    lastTrigger.current?.focus()
  }, [])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y bg-cream-100">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="A feast for the eyes"
          intro="Plates, flames and the room where it all happens. Tap any photo to view it larger."
        />

        <ul className="mt-14 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[14rem]">
          {GALLERY.map((g, i) => (
            <Reveal as="li" key={g.id} delay={(i % 4) * 70} className={g.className}>
              <button
                type="button"
                onClick={(e) => { lastTrigger.current = e.currentTarget; setOpenIndex(i) }}
                aria-label={`View larger: ${g.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl"
              >
                <SmartImage
                  id={g.photo}
                  alt=""
                  sizes="(min-width:1024px) 30vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-charcoal/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-5 w-5 text-cream-100" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {openIndex !== null && <Lightbox index={openIndex} onClose={close} onChange={setOpenIndex} />}
    </section>
  )
}
