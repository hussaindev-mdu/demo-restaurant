import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import Logo from './ui/Logo.jsx'
import Button from './ui/Button.jsx'
import useScrolled from '../hooks/useScrolled.js'
import useActiveSection from '../hooks/useActiveSection.js'
import { NAV_LINKS } from '../data/content.js'

const SECTION_IDS = ['home', 'about', 'menu', 'offers', 'gallery', 'testimonials', 'reservation', 'contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const solid = scrolled || open || active !== 'home'

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Close the menu if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const linkCls = (id) =>
    `relative py-2 text-sm font-medium tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 ${
      active === id ? 'text-gold-400 after:scale-x-100' : 'text-cream-100/85 hover:text-gold-400 after:scale-x-0 hover:after:scale-x-100'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-charcoal/95 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <a href="#home" aria-label="Saffron & Spice, back to top" onClick={() => setOpen(false)}>
          <Logo light />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkCls(l.id)} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
          <Button href="#reservation" className="!px-6 !py-2.5">
            Book a Table
          </Button>
        </nav>

        <button
          type="button"
          className="-mr-2 rounded-full p-2 text-cream-100 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden bg-charcoal transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav aria-label="Mobile" className="min-h-0 overflow-hidden" inert={open ? undefined : ''}>
          <ul className="container-x space-y-1 pb-8 pt-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-cream-100/10 py-4 font-serif text-2xl ${
                    active === l.id ? 'text-gold-400' : 'text-cream-100'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-6">
              <Button href="#reservation" onClick={() => setOpen(false)} className="w-full">
                Book a Table
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
