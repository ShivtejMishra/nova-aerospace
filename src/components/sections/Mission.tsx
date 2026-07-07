import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { Counter } from '../ui/Counter'
import { SceneSection } from '../ui/SceneSection'
import { MissionScene } from '../../three/scenes/MissionScene'

const PILLARS = [
  { icon: '🚀', title: 'Accessible Access', text: 'Driving the cost of orbit down by an order of magnitude through full reusability.' },
  { icon: '🌍', title: 'A Multiplanetary Future', text: 'Establishing the first self-sustaining habitats beyond Earth.' },
  { icon: '🔭', title: 'Scientific Discovery', text: 'Launching instruments that expand humanity’s understanding of the cosmos.' },
]

export function Mission() {
  return (
    <SceneSection id="mission" scene={<MissionScene />}>
      <SectionHeading
        align="left"
        eyebrow="Our Mission"
        title={
          <>
            Make life <span className="text-gradient">multiplanetary</span>, and make space open to all.
          </>
        }
        subtitle="We exist to compress the timeline to a thriving off-world civilization — building the rockets, satellites, and habitats that turn science fiction into infrastructure."
      />
      <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <GlassPanel key={p.title} className="!p-5">
            <div className="text-2xl">{p.icon}</div>
            <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--muted)]">{p.text}</p>
          </GlassPanel>
        ))}
      </Reveal>
      <Reveal delay={0.2} className="mt-8">
        <GlassPanel className="grid grid-cols-2 gap-6 md:grid-cols-4" glow={false}>
          <Counter value={142} label="Successful launches" suffix="+" />
          <Counter value={98} label="Mission success rate" suffix="%" />
          <Counter value={3400} label="Satellites deployed" suffix="+" />
          <Counter value={27} label="Nations served" />
        </GlassPanel>
      </Reveal>
    </SceneSection>
  )
}
