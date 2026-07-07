import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  AdaptiveDpr,
  Environment,
  Lightformer,
  ContactShadows,
  Preload,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useStore } from '../store/useStore'

interface SceneCanvasProps {
  children: ReactNode
  cameraPosition?: [number, number, number]
  fov?: number
  orbit?: boolean
  effects?: boolean
  contactShadows?: boolean
  className?: string
}

/**
 * Full-bleed, transparent 3D layer that fills its parent section. It mounts only
 * while near the viewport (frees WebGL contexts + pauses work off-screen) and
 * composites over the shared cosmic background. Provides PBR environment
 * lighting, contact shadows, and quality-gated bloom for a premium look.
 */
export function SceneCanvas({
  children,
  cameraPosition = [0, 0, 8],
  fov = 45,
  orbit = true,
  effects = true,
  contactShadows = false,
  className = '',
}: SceneCanvasProps) {
  const { quality, reducedMotion, paused } = useStore()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const obs = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: '300px',
    })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {active && (
        <Canvas
          dpr={[1, quality === 'high' ? 2 : 1.3]}
          gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: cameraPosition, fov }}
          frameloop={paused ? 'never' : reducedMotion ? 'demand' : 'always'}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[6, 9, 6]} intensity={2.4} color="#eaf2ff" />
            <directionalLight position={[-8, -3, -6]} intensity={0.6} color="#6f8cff" />
            <Environment resolution={quality === 'low' ? 64 : 256}>
              <Lightformer intensity={2} position={[0, 4, 6]} scale={[8, 4, 1]} color="#bcd4ff" />
              <Lightformer intensity={1.2} position={[-6, 1, 2]} scale={[4, 4, 1]} color="#4d7cff" />
              <Lightformer intensity={1} position={[6, -2, -2]} scale={[4, 4, 1]} color="#9b6bff" />
            </Environment>
            {children}
            {contactShadows && (
              <ContactShadows
                position={[0, -2.4, 0]}
                opacity={0.5}
                scale={16}
                blur={2.6}
                far={6}
                color="#0a1030"
              />
            )}
            {effects && quality !== 'low' && (
              <EffectComposer>
                <Bloom intensity={0.75} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur />
                <Vignette offset={0.32} darkness={0.6} />
              </EffectComposer>
            )}
            {orbit && (
              <OrbitControls
                enablePan={false}
                autoRotate={!reducedMotion}
                autoRotateSpeed={0.45}
                enableDamping
                dampingFactor={0.06}
                minDistance={4}
                maxDistance={20}
              />
            )}
            <AdaptiveDpr pixelated />
            <Preload all />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
