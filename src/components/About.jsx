import { ChefHat, Flame, HeartHandshake, Users } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Reveal from './ui/Reveal.jsx'
import { PHOTOS } from '../data/content.js'

const EXPERIENCE = [
  { icon: Flame, title: 'Open tandoor kitchen', text: 'Watch breads and kebabs come off the flame.' },
  { icon: Users, title: 'Made for families', text: 'Spacious tables, shared platters, a kids’ menu.' },
  { icon: HeartHandshake, title: 'Warm, attentive service', text: 'Unhurried hospitality for every occasion.' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-cream-100">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Photography */}
        <Reveal className="relative pb-12 sm:pb-16 lg:pb-0">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <SmartImage
              id={PHOTOS.curryPan}
              alt="Slow-cooked curry finished with fresh coriander"
              sizes="(min-width:1024px) 40vw, 90vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-0 right-0 w-1/2 overflow-hidden rounded-3xl border-[6px] border-cream-100 shadow-lift sm:right-[-1.5rem] lg:-bottom-10 lg:right-[-2rem]">
            <SmartImage
              id={PHOTOS.plating}
              alt="Beautifully plated dish on a set restaurant table"
              widths={[400, 600, 800]}
              sizes="(min-width:1024px) 20vw, 45vw"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -left-2 top-6 hidden rounded-2xl bg-charcoal px-5 py-4 text-center text-cream-100 shadow-lift sm:block lg:-left-6">
            <p className="font-serif text-4xl font-semibold text-gold-400">2012</p>
            <p className="text-[0.65rem] uppercase tracking-[0.2em]">Our story begins</p>
          </div>
        </Reveal>

        {/* Story */}
        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="Our Story"
            title="A table where two kitchens meet"
          />
          <Reveal delay={100} className="mt-6 space-y-5 text-base leading-relaxed text-charcoal-600 sm:text-lg">
            <p>
              Saffron &amp; Spice began with a simple idea: the finest dishes of Chennai, Kerala and Hyderabad
              deserve to share a table with the tandoor classics of Punjab and Lucknow.
            </p>
            <p>
              Every masala is ground in-house, every biryani is sealed and cooked <em>dum</em>, and every dosa is
              spread on the tawa to order. Nothing is rushed, because good food shouldn’t be.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-8 flex items-start gap-5 rounded-3xl border border-gold-500/30 bg-cream-50 p-6 shadow-card">
            <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold-400">
              <ChefHat className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <div>
              <p className="eyebrow">Meet the Chef</p>
              <h3 className="mt-1 text-2xl font-semibold">Chef Arjun Menon</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                A fictional chef for this demo. Trained in Kerala’s home kitchens and Delhi’s tandoor houses, he
                balances coconut-soft South Indian comfort with bold, smoky northern flavours.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {EXPERIENCE.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80}>
                <Icon className="h-6 w-6 text-gold-600" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-3 font-sans text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
