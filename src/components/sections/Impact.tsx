import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { Counter } from '../ui/Counter'
import { FeatureCard } from '../ui/FeatureCard'
import { SceneSection } from '../ui/SceneSection'
import { ImpactScene } from '../../three/scenes/ImpactScene'

const IMPACTS = [
  { icon: '🌐', title: 'Connected Communities', text: 'High-speed internet to the last billion unconnected people.' },
  { icon: '🌱', title: 'Climate Intelligence', text: 'Daily Earth observation powering wildfire and flood models.' },
  { icon: '🛰️', title: 'Disaster Response', text: 'Rapid imagery and comms for relief within hours of an event.' },
  { icon: '🔬', title: 'Open Science', text: 'Free data and ride-share grants for universities.' },
]

export function Impact() {
  return (
    <SceneSection id="impact" scene={<ImpactScene />}>
      <SectionHeading
        align="left"
        eyebrow="Global Impact"
        title={
          <>
            Space that <span className="text-gradient">returns to Earth</span>
          </>
        }
        subtitle="The same infrastructure that reaches other worlds delivers tangible benefits to every person on this one."
      />
      <Reveal delay={0.1} className="mt-8">
        <GlassPanel className="grid grid-cols-2 gap-6 md:grid-cols-4" glow={false}>
          <Counter value={1.2} label="Billion connected" suffix="B" decimals={1} />
          <Counter value={190} label="Countries served" suffix="+" />
          <Counter value={14} label="Petabytes of Earth data" suffix=" PB" />
          <Counter value={320} label="Emergency responses" suffix="+" />
        </GlassPanel>
      </Reveal>
      <Reveal delay={0.15} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IMPACTS.map((p, i) => (
          <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.text} delay={i * 0.05} />
        ))}
      </Reveal>
    </SceneSection>
  )
}
