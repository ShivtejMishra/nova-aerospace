import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { TimelineScene } from '../../three/scenes/TimelineScene'

const MILESTONES = [
  { year: '2018', title: 'Founded', text: 'Nova Aerospace is founded with a mandate to make life multiplanetary.' },
  { year: '2022', title: 'Orbital Debut', text: 'Nova-I reaches orbit and recovers its booster on the droneship.' },
  { year: '2024', title: 'Crewed Flight', text: 'First astronauts fly aboard a fully reused vehicle.' },
  { year: '2029', title: 'Mars Cargo', text: 'Uncrewed cargo pre-positioning mission launches for Mars.' },
  { year: '2032', title: 'First Settlement', text: 'Founding of the first permanent research settlement off-world.' },
]

export function Timeline() {
  return (
    <SceneSection id="timeline" scene={<TimelineScene />}>
      <SectionHeading
        align="left"
        eyebrow="Timeline"
        title={
          <>
            A trajectory measured in <span className="text-gradient">decades, not years</span>
          </>
        }
        subtitle="From a garage prototype to a permanent off-world presence — the road we are already building."
      />
      <Reveal delay={0.1} className="mt-8 space-y-3">
        {MILESTONES.map((m) => (
          <GlassPanel key={m.year} className="!p-5">
            <div className="flex items-center gap-4">
              <div className="font-display text-2xl font-bold text-gradient">{m.year}</div>
              <div>
                <h3 className="font-display text-base font-semibold">{m.title}</h3>
                <p className="text-sm text-[color:var(--muted)]">{m.text}</p>
              </div>
            </div>
          </GlassPanel>
        ))}
      </Reveal>
    </SceneSection>
  )
}
