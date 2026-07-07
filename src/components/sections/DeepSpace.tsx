import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { DeepSpaceScene } from '../../three/scenes/DeepSpaceScene'

const DESTINATIONS = [
  { name: 'Luna Gateway', dist: '384,400 km', text: 'Orbital fuel depot and crew waypoint for the lunar surface.' },
  { name: 'Mars Transit', dist: '54.6M km', text: 'Cycling habitats and cargo pre-positioning for the first settlement.' },
  { name: 'Europa Probe', dist: '628M km', text: 'Radiation-hardened orbiter surveying the ocean beneath the ice.' },
  { name: 'Asteroid Belt', dist: '329M km', text: 'Autonomous mining demonstrators for in-space resource use.' },
]

export function DeepSpace() {
  return (
    <SceneSection id="deepspace" scene={<DeepSpaceScene />}>
      <SectionHeading
        eyebrow="Deep Space Exploration"
        title={
          <>
            Pushing past the <span className="text-gradient">edge of the map</span>
          </>
        }
        subtitle="Our deep-space program develops the habitats, propulsion, and autonomous systems required for sustained presence at the most distant reaches of the solar system."
      />
      <Reveal delay={0.1}>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <GlassPanel key={d.name} className="h-full">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                <span className="font-mono text-xs text-nova-cyan">{d.dist}</span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{d.text}</p>
            </GlassPanel>
          ))}
        </div>
      </Reveal>
    </SceneSection>
  )
}
