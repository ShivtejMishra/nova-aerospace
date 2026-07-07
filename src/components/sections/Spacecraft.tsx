import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassPanel } from '../ui/GlassPanel'
import { SceneSection } from '../ui/SceneSection'
import { SpacecraftScene } from '../../three/scenes/SpacecraftScene'

const SPECS = [
  { k: 'Propulsion', v: 'Methalox full-flow staged combustion' },
  { k: 'Thrust', v: '7.4 MN sea level' },
  { k: 'Crew / Cargo', v: 'Up to 8 crew or 100 t' },
  { k: 'Reuse', v: '100+ flight cycles' },
  { k: 'Heat Shield', v: 'Hexagonal ablative tiles' },
  { k: 'Avionics', v: 'Triple-redundant flight computers' },
]

export function Spacecraft() {
  return (
    <SceneSection id="spacecraft" scene={<SpacecraftScene />}>
      <SectionHeading
        align="left"
        eyebrow="Spacecraft"
        title={
          <>
            A spacecraft built to <span className="text-gradient">fly, return, and fly again</span>
          </>
        }
        subtitle="Every surface is engineered for re-entry, reuse, and the punishing environment of deep space. Drag to orbit the vehicle and inspect its systems."
      />
      <Reveal delay={0.1}>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {SPECS.map((s) => (
            <GlassPanel key={s.k} className="!p-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">{s.k}</div>
              <div className="mt-1.5 font-display text-base font-semibold">{s.v}</div>
            </GlassPanel>
          ))}
        </div>
      </Reveal>
    </SceneSection>
  )
}
