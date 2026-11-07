const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  gold: 'bg-gold-500 text-charcoal hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5',
  dark: 'bg-charcoal text-cream-100 hover:bg-charcoal-700 hover:-translate-y-0.5',
  outline: 'border border-cream-100/60 text-cream-100 hover:bg-cream-100 hover:text-charcoal',
  outlineDark: 'border border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-cream-100',
}

/** Renders an <a> when `href` is given, otherwise a <button>. */
export default function Button({ href, variant = 'gold', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
