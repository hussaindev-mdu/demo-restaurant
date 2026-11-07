import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'

const WIDTHS = [480, 800, 1200, 1600]
const build = (id, w) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`

/**
 * Responsive, lazy-loaded image with a graceful fallback so a failed request
 * never leaves a broken-image icon on screen.
 */
export default function SmartImage({
  id,
  alt,
  sizes = '100vw',
  widths = WIDTHS,
  priority = false,
  className = '',
  width = 1200,
  height = 800,
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-charcoal-800 text-gold-500 ${className}`}
      >
        <UtensilsCrossed aria-hidden="true" className="h-8 w-8 opacity-70" />
      </div>
    )
  }

  return (
    <img
      src={build(id, widths[Math.min(1, widths.length - 1)])}
      srcSet={widths.map((w) => `${build(id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
