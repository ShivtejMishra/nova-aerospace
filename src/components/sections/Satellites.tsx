import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { FeatureCard } from '../ui/FeatureCard'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { SatelliteScene } from '../../three/scenes/SatelliteScene'

export function Satellites() {
  return (
    <SceneSection id="satellites" scene={<SatelliteScene />}>
      <SectionHeading
        align="left"
        eyebrow="Satellite Solutions"
        title={
          <>
            Constellations that <span className="text-gradient">connect the planet</span>
          </>
        }
        subtitle="From broadband mesh networks to Earth observation and navigation, our satellites are modular, software-defined, and built to scale by the thousand."
      />
      <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { n: 'NovaNet', d: 'Low-latency global broadband' },
          { n: 'EarthEye', d: 'Sub-meter observation' },
          { n: 'NavStar', d: 'Resilient PNT services' },
        ].map((p) => (
          <GlassPanel key={p.n} className="!p-5">
            <div className="font-display text-base font-semibold">{p.n}</div>
            <p className="mt-1.5 text-xs text-[color:var(--muted)]">{p.d}</p>
          </GlassPanel>
        ))}
      </Reveal>
      <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard icon="📶" title="Global Coverage" description="Polar-to-polar mesh with automatic handoff." delay={0} />
        <FeatureCard icon="⚡" title="Edge Compute" description="On-orbit processing to cut downlink volume." delay={0.05} />
        <FeatureCard icon="🔧" title="In-Orbit Servicing" description="Rendezvous and refuel extend lifetimes." delay={0.1} />
        <FeatureCard icon="🛡️" title="Resilient by Design" description="Proliferated, defended architecture." delay={0.15} />
      </Reveal>
    </SceneSection>
  )
}
