import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { AmbientScene } from '../../three/scenes/AmbientScene'

const NEWS = [
  { tag: 'Launch', date: 'Jun 2026', title: 'Nova-Heavy lofts 54 satellites in record turnaround', text: 'The booster returned to the pad eight days after its previous flight.' },
  { tag: 'Deep Space', date: 'May 2026', title: 'Luna Gateway fuel depot enters service', text: 'The first orbital refueling node supports crew transfer and surface missions.' },
  { tag: 'Technology', date: 'Apr 2026', title: 'Next-gen methalox engine clears qualification', text: 'A 40% thrust increase cuts per-flight cost substantially.' },
  { tag: 'Impact', date: 'Mar 2026', title: 'NovaNet reaches one billion connected users', text: 'Affordable terminals bring broadband to the final underserved regions.' },
  { tag: 'Careers', date: 'Feb 2026', title: 'Opening our third engineering hub', text: 'A new campus expands propulsion and autonomy research with 400 roles.' },
  { tag: 'Mission', date: 'Jan 2026', title: 'Mars cargo architecture finalized', text: 'Cycling habitats and pre-positioned cargo set the timeline for settlement.' },
]

export function News() {
  return (
    <SceneSection id="news" scene={<AmbientScene />}>
      <SectionHeading
        align="left"
        eyebrow="Newsroom"
        title={
          <>
            The latest from <span className="text-gradient">Nova Aerospace</span>
          </>
        }
        subtitle="Milestones, missions, and momentum from across the program."
      />
      <Reveal delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2">
        {NEWS.map((n) => (
          <GlassPanel key={n.title} className="group h-full">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-nova-cyan/15 px-3 py-1 font-mono text-xs text-nova-cyan">{n.tag}</span>
              <span className="font-mono text-xs text-[color:var(--muted)]">{n.date}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold leading-snug">{n.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{n.text}</p>
            <span className="mt-3 inline-block text-sm text-nova-cyan transition-transform group-hover:translate-x-1">Read more →</span>
          </GlassPanel>
        ))}
      </Reveal>
    </SceneSection>
  )
}
