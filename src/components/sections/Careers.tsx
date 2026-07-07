import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { MagneticButton } from '../ui/MagneticButton'
import { scrollToId } from '../../hooks/useLenis'
import { SceneSection } from '../ui/SceneSection'
import { AmbientScene } from '../../three/scenes/AmbientScene'

const ROLES = [
  { title: 'Propulsion Engineer', team: 'Engines', loc: 'Remote / Cape Nova' },
  { title: 'Flight Software Engineer', team: 'Avionics', loc: 'Remote' },
  { title: 'Composite Manufacturing Lead', team: 'Production', loc: 'Cape Nova' },
  { title: 'Spacecraft Analyst', team: 'Mission Ops', loc: 'Remote / Houston' },
  { title: 'Autonomy Researcher', team: 'AI', loc: 'Remote' },
  { title: 'Mission Designer', team: 'Programs', loc: 'Remote / Lisbon' },
]

const VALUES = [
  { icon: '🚀', title: 'Own the Mission', text: 'Small teams with end-to-end ownership of flight-critical systems.' },
  { icon: '🌍', title: 'Global & Remote', text: 'A distributed workforce united by a single ambitious goal.' },
  { icon: '📈', title: 'Accelerated Growth', text: 'Mentorship, launch access, and a steep learning curve.' },
]

export function Careers() {
  return (
    <SceneSection id="careers" scene={<AmbientScene />}>
      <SectionHeading
        align="left"
        eyebrow="Careers"
        title={
          <>
            Help build the <span className="text-gradient">off-world future</span>
          </>
        }
        subtitle="We hire exceptional people who want to do the hardest, most meaningful work of their lives."
      />
      <Reveal delay={0.1} className="mt-8 grid gap-3">
        {VALUES.map((v) => (
          <GlassPanel key={v.title} className="!p-5">
            <div className="text-xl">{v.icon}</div>
            <h3 className="mt-2 font-display text-base font-semibold">{v.title}</h3>
            <p className="mt-1 text-sm text-[color:var(--muted)]">{v.text}</p>
          </GlassPanel>
        ))}
      </Reveal>
      <Reveal delay={0.15} className="mt-4">
        <GlassPanel className="!p-0" glow={false}>
          <ul className="divide-y divide-[color:var(--glass-border)]">
            {ROLES.map((r) => (
              <li key={r.title}>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors hover:bg-[color:var(--glass)]"
                >
                  <div>
                    <div className="font-display font-semibold">{r.title}</div>
                    <div className="text-sm text-[color:var(--muted)]">{r.team}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden text-sm text-[color:var(--muted)] sm:block">{r.loc}</span>
                    <span className="text-nova-cyan">Apply →</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </Reveal>
      <Reveal delay={0.2} className="mt-6">
        <MagneticButton onClick={() => scrollToId('contact')} className="btn-primary" ariaLabel="View all roles">
          View all open roles
        </MagneticButton>
      </Reveal>
    </SceneSection>
  )
}
