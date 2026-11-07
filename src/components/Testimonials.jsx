import { Quote, Star } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { TESTIMONIALS } from '../data/content.js'

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-y bg-cream-200/60">
      <div className="container-x">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Guest Words"
          title="What our guests say"
          intro="These three testimonials are fictional sample content written for this demo. They are not real customer reviews."
        />

        <ul className="mt-14 grid gap-7 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 100} className="h-full">
              <figure className="relative flex h-full flex-col rounded-3xl bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift">
                <Quote className="h-9 w-9 text-gold-400" strokeWidth={1.4} aria-hidden="true" />
                <div className="mt-4 flex gap-0.5 text-gold-500" role="img" aria-label="5 out of 5 stars (sample)">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-charcoal">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-charcoal/10 pt-5">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal font-serif text-lg font-semibold text-gold-400">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-charcoal-500">{t.role}</span>
                  </span>
                  <span className="ml-auto rounded-full bg-gold-400/20 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-gold-700">
                    Sample
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
