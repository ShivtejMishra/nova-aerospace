import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { FeatureCard } from '../ui/FeatureCard'
import { SceneSection } from '../ui/SceneSection'
import { TechnologyScene } from '../../three/scenes/TechnologyScene'

export function Technology() {
  return (
    <SceneSection id="technology" scene={<TechnologyScene />}>
      <SectionHeading
        align="left"
        eyebrow="Technology"
        title={
          <>
            The engineering <span className="text-gradient">underneath it all</span>
          </>
        }
        subtitle="Proprietary propulsion, materials science, autonomy, and manufacturing converge to make routine spaceflight possible."
      />
      <Reveal delay={0.15} className="mt-8 grid gap-4 sm:grid-cols-2">
        <FeatureCard icon="🔥" title="Methalox Engines" description="Full-flow staged combustion delivering high efficiency and low cost." delay={0} />
        <FeatureCard icon="🧪" title="Advanced Materials" description="Carbon composites and ablative tiles rated for repeated re-entry." delay={0.05} />
        <FeatureCard icon="🤖" title="Autonomous Flight" description="On-board guidance that lands boosters with meter precision." delay={0.1} />
        <FeatureCard icon="🏭" title="In-House Manufacturing" description="3D-printed engines and structures built on rapid lines." delay={0.15} />
      </Reveal>
    </SceneSection>
  )
}
