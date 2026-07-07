import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  href?: string
  strength?: number
  ariaLabel?: string
}

/**
 * A button/link that subtly attracts toward the cursor (magnetic effect) and
 * lifts on hover. Falls back to a static element when reduced motion is on.
 */
export function MagneticButton({
  children,
  onClick,
  className = '',
  href,
  strength = 0.4,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useStore()

  const handleMove = (e: MouseEvent) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const inner = href ? (
    <a href={href} aria-label={ariaLabel} className={className}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={className}>
      {children}
    </button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={reducedMotion ? undefined : { scale: 1.04 }}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      style={{ display: 'inline-block' }}
    >
      {inner}
    </motion.div>
  )
}
