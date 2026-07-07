import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

/**
 * Holographic glassmorphism panel with corner brackets and an optional
 * animated glow border. Used as a building block across sections.
 */
export function GlassPanel({ children, className = '', glow = true }: GlassPanelProps) {
  const { reducedMotion } = useStore()
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`glass relative overflow-hidden rounded-3xl p-6 ${className}`}
    >
      {glow && (
        <>
          <span className="pointer-events-none absolute -left-px -top-px h-8 w-8 rounded-tl-3xl border-l-2 border-t-2 border-nova-cyan/70" />
          <span className="pointer-events-none absolute -bottom-px -right-px h-8 w-8 rounded-br-3xl border-b-2 border-r-2 border-nova-violet/70" />
        </>
      )}
      {children}
    </motion.div>
  )
}
