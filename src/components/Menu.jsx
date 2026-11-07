import { useState } from 'react'
import SectionHeading from './ui/SectionHeading.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Reveal from './ui/Reveal.jsx'
import { MENU_CATEGORIES, MENU_ITEMS, formatINR } from '../data/content.js'

function MenuCard({ item, index }) {
  return (
    <Reveal as="li" delay={(index % 3) * 90} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative overflow-hidden">
          <SmartImage
            id={item.photo}
            alt={item.alt}
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute left-4 top-4 rounded-full bg-charcoal/85 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
            {item.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-2xl font-semibold leading-tight">{item.name}</h3>
            <p className="shrink-0 font-sans text-lg font-semibold text-gold-600">{formatINR(item.price)}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{item.description}</p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Menu() {
  const [category, setCategory] = useState('All')
  const items = category === 'All' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === category)

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-y bg-cream-200/60">
      <div className="container-x">
        <SectionHeading
          id="menu-title"
          eyebrow="Popular Menu"
          title="Signature dishes, made slowly"
          intro="Six guest favourites from our kitchen. Prices are in Indian Rupees and inclusive of taxes (demo pricing)."
        />

        <div role="group" aria-label="Filter menu by category" className="mt-10 flex flex-wrap justify-center gap-2.5">
          {MENU_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? 'border-charcoal bg-charcoal text-cream-100'
                  : 'border-charcoal/20 text-charcoal-700 hover:border-gold-500 hover:text-gold-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul key={category} className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </ul>
        <p className="sr-only" aria-live="polite">
          Showing {items.length} dishes
        </p>
      </div>
    </section>
  )
}
