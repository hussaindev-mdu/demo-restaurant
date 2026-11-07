import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { CONTACT, HOURS } from '../data/content.js'

const waLink = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
  'Hello Saffron & Spice, I would like to make an enquiry.',
)}`
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.addressLine)}`

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y bg-charcoal text-cream-100">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          light
          eyebrow="Visit Us"
          title="Find your seat at our table"
          intro="Address and phone number below are fictional demo details."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <div className="flex gap-5 rounded-3xl border border-cream-100/10 bg-charcoal-800 p-6">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-semibold">Address</h3>
                <address className="mt-2 not-italic leading-relaxed text-cream-200/80">
                  {CONTACT.address.map((l) => (<span key={l} className="block">{l}</span>))}
                  <span className="mt-1 block text-xs text-gold-400">Fictional address, for demo only</span>
                </address>
              </div>
            </div>

            <div className="flex gap-5 rounded-3xl border border-cream-100/10 bg-charcoal-800 p-6">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <a href={`tel:${CONTACT.phoneTel}`} className="mt-2 block text-cream-200/80 transition-colors hover:text-gold-400">
                  {CONTACT.phoneDisplay}
                </a>
                <span className="mt-1 block text-xs text-gold-400">Demo number, not a working line</span>
              </div>
            </div>

            <div className="flex gap-5 rounded-3xl border border-cream-100/10 bg-charcoal-800 p-6">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-gold-400" aria-hidden="true" />
              <div className="w-full">
                <h3 className="text-xl font-semibold">Opening hours</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  {HOURS.map((h) => (
                    <div key={h.days} className="flex flex-col justify-between gap-1 border-b border-cream-100/10 pb-2 last:border-0 sm:flex-row">
                      <dt className="text-cream-200/70">{h.days}</dt>
                      <dd className="font-medium">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <Button href={waLink} target="_blank" rel="noopener noreferrer" variant="gold" className="w-full sm:w-auto">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp Enquiry
            </Button>
          </Reveal>

          {/* Google Maps placeholder */}
          <Reveal delay={120}>
            <div
              role="img"
              aria-label="Map placeholder showing the restaurant location"
              className="relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-3xl border border-cream-100/10 bg-charcoal-800 p-8 text-center"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'linear-gradient(#E2C98A 1px, transparent 1px), linear-gradient(90deg, #E2C98A 1px, transparent 1px)',
                  backgroundSize: '44px 44px',
                }}
              />
              <div aria-hidden="true" className="absolute left-[-10%] top-[38%] h-3 w-[120%] -rotate-12 bg-gold-500/20" />
              <div aria-hidden="true" className="absolute left-[30%] top-[-10%] h-[120%] w-3 rotate-6 bg-gold-500/15" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-charcoal shadow-lg shadow-gold-500/30">
                <MapPin className="h-8 w-8" aria-hidden="true" />
              </span>
              <p className="relative mt-5 font-serif text-2xl font-semibold">Google Maps placeholder</p>
              <p className="relative mt-2 max-w-xs text-sm text-cream-200/70">
                An embedded map will appear here once a real restaurant address is configured.
              </p>
              <Button href={mapsLink} target="_blank" rel="noopener noreferrer" variant="outline" className="relative mt-6">
                Open in Google Maps <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
