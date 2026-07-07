import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Earth } from '../Earth'
import { Satellite } from '../Satellite'
import { SignalBeam } from '../SignalBeam'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function MissionScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const orbit = useRef<THREE.Group>(null)
  const sats = [
    { r: 4.2, a: 0.4, y: 0.6, s: 0.5 },
    { r: 5.4, a: 2.1, y: -0.8, s: 0.42 },
    { r: 6.6, a: 4.0, y: 0.3, s: 0.38 },
  ]

  useFrame((_, d) => {
    if (!reducedMotion && orbit.current) orbit.current.rotation.y += d * 0.12
  })

  return (
    <group position={[isMobile ? 0 : 2.4, 0, 0]}>
      <Earth radius={2.8} rotationSpeed={0.04} />
      <group ref={orbit}>
        {sats.map((o, i) => (
          <group key={i} rotation={[0, o.a, 0]}>
            <group position={[o.r, o.y, 0]}>
              <Satellite reducedMotion={reducedMotion} />
              <group scale={o.s}>
                <Satellite reducedMotion={reducedMotion} />
              </group>
              <SignalBeam start={[0, 0, 0]} end={[-o.r, -o.y, 0]} color="#45e9ff" radius={0.015} />
            </group>
          </group>
        ))}
      </group>
      <Particles count={isMobile ? 160 : 320} radius={9} color="#9fc4ff" size={0.05} />
    </group>
  )
}
