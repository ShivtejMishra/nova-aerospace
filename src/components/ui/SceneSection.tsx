import type { ReactNode } from 'react'
import { SceneCanvas } from '../../three/SceneCanvas'

interface SceneSectionProps {
  id: string
  scene: ReactNode
  children: ReactNode
  className?: string
  cameraPosition?: [number, number, number]
  contactShadows?: boolean
  align?: 'left' | 'right'
}

/**
 * A full-height section whose 3D scene fills the entire background (no boxed
 * container) while content is overlaid with a readability scrim. The scene is
 * offset to the opposite side of the content so the composition stays balanced
 * across desktop, tablet, and mobile.
 */
export function SceneSection({
  id,
  scene,
  children,
  className = '',
  cameraPosition = [0, 0, 9],
  contactShadows = false,
  align = 'left',
}: SceneSectionProps) {
  return (
    <section
      id={id}
      className={`relative min-h-[88vh] overflow-hidden scroll-mt-24 ${className}`}
    >
      <SceneCanvas cameraPosition={cameraPosition} contactShadows={contactShadows}>
        {scene}
      </SceneCanvas>

      {/* readability scrims — blend the 3D into the page and protect text */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          align === 'left'
            ? 'bg-gradient-to-r from-[color:var(--bg)] via-[color:var(--bg)]/70 to-transparent'
            : 'bg-gradient-to-l from-[color:var(--bg)] via-[color:var(--bg)]/70 to-transparent'
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg)] via-transparent to-[color:var(--bg)]/50" />

      <div className="section-shell relative z-10 flex min-h-[88vh] items-center py-20">
        <div className="w-full max-w-2xl xl:max-w-3xl">{children}</div>
      </div>
    </section>
  )
}
