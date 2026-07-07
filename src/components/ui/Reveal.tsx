import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useStore } from '../../store/useStore'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom.delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const { reducedMotion } = useStore()
  const MotionTag = motion[as] as typeof motion.div

  if (reducedMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      custom={{ delay, y }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
