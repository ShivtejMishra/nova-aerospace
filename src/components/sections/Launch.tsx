import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { FeatureCard } from '../ui/FeatureCard'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { LaunchScene } from '../../three/scenes/LaunchScene'

const VEHICLES = [
  { name: 'Nova-I', payloadLEO: '12 t', reuse: 'Full', note: 'Workhorse light lifter for rapid constellation deployment.' },
  { name: 'Nova-Heavy', payloadLEO: '64 t', reuse: 'Full + Boosters', note: 'Super-heavy architecture for crew and deep-space cargo.' },
  { name: 'Nova-X', payloadLEO: '150 t', reuse: 'Full + Refuel', note: 'Interplanetary class vehicle for lunar and Mars transit.' },
]

export function Launch() {
  return (
    <SceneSection id="launch" scene={<LaunchScene />} contactShadows>
      <SectionHeading
        align="left"
        eyebrow="Launch Services"
        title={
          <>
            Reliable rides to orbit, <span className="text-gradient">again and again</span>
          </>
        }
        subtitle="A family of fully reusable launch vehicles engineered for cadence, recovery, and rapid re-flight — turning launch from a rare event into routine logistics."
      />
      <Reveal delay={0.15} className="mt-8 space-y-3">
        {VEHICLES.map((v) => (
          <GlassPanel key={v.name} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-display text-lg font-semibold">{v.name}</div>
              <div className="text-sm text-[color:var(--muted)]">{v.note}</div>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <div className="font-display text-xl font-semibold text-gradient">{v.payloadLEO}</div>
                <div className="text-xs text-[color:var(--muted)]">to LEO</div>
              </div>
              <div>
                <div className="font-display text-xl font-semibold">{v.reuse}</div>
                <div className="text-xs text-[color:var(--muted)]">reuse</div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </Reveal>
      <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard icon="🛰️" title="Rapid Cadence" description="Weekly windows with automated range integration." delay={0} />
        <FeatureCard icon="♻️" title="Full Reuse" description="Boosters recovered, refurbished, re-flown in days." delay={0.05} />
        <FeatureCard icon="🎯" title="Precision Insertion" description="Guidance accurate to within meters." delay={0.1} />
        <FeatureCard icon="📡" title="Live Telemetry" description="Tracking and payload health from liftoff." delay={0.15} />
      </Reveal>
    </SceneSection>
  )
}
