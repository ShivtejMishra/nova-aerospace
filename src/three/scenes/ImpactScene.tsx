import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Earth } from '../Earth'
import { SignalBeam } from '../SignalBeam'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function ImpactScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const ring = useRef<THREE.Group>(null)
  const count = 9
  const R = 4
  useFrame((_, d) => {
    if (!reducedMotion && ring.current) {
      ring.current.rotation.y += d * 0.18
      ring.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.12
    }
  })
  const nodes = Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2
    return [Math.cos(a) * R, Math.sin(a * 2) * 0.7, Math.sin(a) * R] as [number, number, number]
  })
  return (
    <group position={[isMobile ? 0 : 1.6, 0, 0]}>
      <Earth radius={2.3} rotationSpeed={0.03} />
      <group ref={ring}>
        {nodes.map((p, i) => (
          <group key={i}>
            <mesh position={p}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshBasicMaterial color="#45e9ff" />
            </mesh>
            <SignalBeam start={p} end={[-p[0], -p[1], -p[2]]} color="#45e9ff" radius={0.008} />
          </group>
        ))}
      </group>
      <Particles count={isMobile ? 150 : 300} radius={9} color="#9fc4ff" size={0.045} />
    </group>
  )
}
