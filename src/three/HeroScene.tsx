import { OrbitControls, AdaptiveDpr, Preload, Environment, Lightformer } from '@react-three/drei'
import { Suspense } from 'react'
import { Starfield } from './Starfield'
import { Nebula } from './Nebula'
import { Lighting } from './Lighting'
import { Spacecraft } from './Spacecraft'
import { Planet } from './Planet'
import { Asteroids } from './Asteroids'
import { Particles } from './Particles'
import { Effects } from './Effects'
import { getPalette } from './themePresets'
import { useStore } from '../store/useStore'

export function HeroScene() {
  const { reducedMotion, quality, theme } = useStore()
  const palette = getPalette(theme)

  return (
    <>
      <color attach="background" args={[palette.background.getHex()]} />
      <fog attach="fog" args={[palette.fog.getHex(), 18, 70]} />
      <Suspense fallback={null}>
        <Lighting />
        <Environment resolution={quality === 'low' ? 64 : 256}>
          <Lightformer intensity={2.4} position={[0, 4, 6]} scale={[10, 5, 1]} color="#bcd4ff" />
          <Lightformer intensity={1.4} position={[-6, 1, 2]} scale={[5, 5, 1]} color="#4d7cff" />
          <Lightformer intensity={1.1} position={[6, -2, -2]} scale={[5, 5, 1]} color="#9b6bff" />
        </Environment>
        <Starfield count={quality === 'low' ? 2500 : 5500} radius={90} />
        <Nebula radius={85} />
        <Spacecraft position={[0, 0.2, 0]} scale={1.05} reducedMotion={reducedMotion} />
        <Particles count={quality === 'low' ? 200 : 500} radius={10} color="#9fc4ff" size={0.05} />
        <Planet
          position={[6.5, 2.2, -6]}
          radius={2.2}
          colorLow="#13204a"
          colorHigh="#4d7cff"
          atmosphereColor="#45e9ff"
          rotationSpeed={0.06}
          bands={5}
        />
        {/* Ringed planet accent */}
        <group position={[-7.5, -2.5, -8]} rotation={[0.4, 0, 0.2]}>
          <mesh>
            <sphereGeometry args={[1.6, 48, 48]} />
            <meshStandardMaterial color="#e7b97a" roughness={0.9} metalness={0.05} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.1, 3.2, 64]} />
            <meshStandardMaterial
              color="#ffd479"
              transparent
              opacity={0.55}
              side={2}
              roughness={1}
            />
          </mesh>
        </group>
        <Asteroids count={quality === 'low' ? 16 : 30} radius={22} reducedMotion={reducedMotion} />
        <Effects />
        <Preload all />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={14}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.6}
      />
      <AdaptiveDpr pixelated />
    </>
  )
}
