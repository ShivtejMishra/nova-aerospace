import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Earth } from '../Earth'
import { Satellite } from '../Satellite'
import { SignalBeam } from '../SignalBeam'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function SatelliteScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const ring = useRef<THREE.Group>(null)
  const nodes = Array.from({ length: 6 })

  useFrame((_, d) => {
    if (!reducedMotion && ring.current) {
      ring.current.rotation.y += d * 0.2
      ring.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.15
    }
  })

  const ringR = 4.6

  return (
    <group position={[isMobile ? 0 : 2.4, 0.2, 0]}>
      <Earth radius={2.4} rotationSpeed={0.03} />
      <group ref={ring}>
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2
          const x = Math.cos(a) * ringR
          const z = Math.sin(a) * ringR
          const y = Math.sin(a * 2) * 0.8
          return (
            <group key={i} position={[x, y, z]}>
              <Satellite reducedMotion={reducedMotion} />
              <SignalBeam start={[0, 0, 0]} end={[-x, -y, -z]} color="#45e9ff" radius={0.012} />
              {i < nodes.length - 1 && (
                <SignalBeam
                  start={[0, 0, 0]}
                  end={[
                    Math.cos(((i + 1) / nodes.length) * Math.PI * 2) * ringR - x,
                    Math.sin(((i + 1) / nodes.length) * Math.PI * 2) * 2 * 0.8 - y,
                    Math.sin(((i + 1) / nodes.length) * Math.PI * 2) * ringR - z,
                  ]}
                  color="#9b6bff"
                  radius={0.008}
                />
              )}
            </group>
          )
        })}
      </group>
      <Particles count={isMobile ? 160 : 300} radius={9} color="#9fc4ff" size={0.045} />
    </group>
  )
}
