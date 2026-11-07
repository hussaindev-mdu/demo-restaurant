import { ArrowRight, Clock } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { OFFERS, formatINR } from '../data/content.js'

export default function SpecialOffers({ onSelectOffer }) {
  return (
    <section id="offers" aria-labelledby="offers-title" className="section-y bg-charcoal text-cream-100">
      <div className="container-x">
        <SectionHeading
          id="offers-title"
          light
          eyebrow="Special Offers"
          title="Better together"
          intro="Thoughtful packages for family tables and slow weekends. Demo offers, for illustration only."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.id} delay={i * 120}>
              <article className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] ring-1 ring-gold-500/20">
                <SmartImage
                  id={offer.photo}
                  alt={offer.alt}
                  sizes="(min-width:1024px) 45vw, 92vw"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/10" />

                <span className="absolute right-5 top-5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-semibold text-charcoal">
                  {offer.badge}
                </span>

                <div className="p-7 sm:p-9">
                  <p className="eyebrow !text-gold-400">{offer.tag}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-cream-50 sm:text-4xl">{offer.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-200/85 sm:text-base">{offer.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
                    <div>
                      <p className="font-serif text-3xl font-semibold text-gold-400">
                        {formatINR(offer.price)}{' '}
                        <span className="font-sans text-sm font-normal text-cream-200/70">{offer.priceNote}</span>
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-cream-200/70">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {offer.detail}
                      </p>
                    </div>
                    <Button variant="gold" onClick={() => onSelectOffer(offer)}>
                      Enquire <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
