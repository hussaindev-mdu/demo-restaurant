import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import { CONTACT, NAV_LINKS, SOCIALS } from '../data/content.js'

const ICONS = { Instagram, Facebook, YouTube: Youtube }

export default function Footer() {
  return (
    <footer className="bg-[#161412] text-cream-200/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#home" aria-label="Saffron & Spice, back to top"><Logo light /></a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Premium South and North Indian fusion dining for families, professionals and food lovers.
          </p>
          <ul className="mt-6 flex gap-3">
            {SOCIALS.map(({ name, href }) => {
              const Icon = ICONS[name]
              return (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (opens in a new tab)`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-charcoal"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Explore</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[...NAV_LINKS, { id: 'reservation', label: 'Reservations' }].map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="transition-colors hover:text-gold-400">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" /><span>{CONTACT.addressLine}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" /><a href={`tel:${CONTACT.phoneTel}`} className="hover:text-gold-400">{CONTACT.phoneDisplay} (demo)</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" /><span>{CONTACT.email}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Saffron &amp; Spice. All rights reserved.</p>
          <p>Fictional restaurant brand. Demo website; photography via Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}
