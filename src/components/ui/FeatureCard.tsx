import type { ReactNode } from 'react'
import { GlassPanel } from './GlassPanel'
import { Reveal } from './Reveal'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <Reveal delay={delay}>
      <GlassPanel className="group h-full transition-transform duration-300 hover:-translate-y-1.5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/20 text-2xl">
          {icon}
        </div>
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted)]">{description}</p>
        <span className="mt-4 block h-px w-0 bg-gradient-to-r from-nova-cyan to-nova-violet transition-[width] duration-500 group-hover:w-full" />
      </GlassPanel>
    </Reveal>
  )
}
