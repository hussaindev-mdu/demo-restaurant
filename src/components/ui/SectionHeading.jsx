import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, intro, align = 'center', light = false, id }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : 'text-left'
  return (
    <Reveal className={`max-w-2xl ${alignCls}`}>
      <p className={`eyebrow ${light ? '!text-gold-400' : ''}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-3 text-4xl font-semibold leading-[1.1] sm:text-5xl ${light ? 'text-cream-100' : 'text-charcoal'}`}
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`mt-5 block h-px w-16 bg-gold-500 ${align === 'center' ? 'mx-auto' : ''}`}
      />
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-cream-200/80' : 'text-charcoal-600'}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
