import { Flower2 } from 'lucide-react'

export default function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/70 text-gold-500"
      >
        <Flower2 className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="leading-none">
        <span
          className={`block font-serif text-2xl font-semibold tracking-wide ${light ? 'text-cream-100' : 'text-charcoal'}`}
        >
          Saffron <span className="text-gold-500">&amp;</span> Spice
        </span>
        <span className="mt-1 block text-[0.6rem] font-medium uppercase tracking-[0.3em] text-gold-600">
          Indian Fusion Dining
        </span>
      </span>
    </span>
  )
}
