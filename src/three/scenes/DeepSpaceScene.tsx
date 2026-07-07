import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Nebula } from '../Nebula'
import { Asteroids } from '../Asteroids'
import { SpaceStation } from '../SpaceStation'
import { Spacecraft } from '../Spacecraft'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function DeepSpaceScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const station = useRef<THREE.Group>(null)
  const craft = useRef<THREE.Group>(null)

  useFrame((_, d) => {
    if (reducedMotion) return
    if (station.current) station.current.rotation.y += d * 0.1
    if (craft.current) craft.current.rotation.y += d * 0.15
  })

  return (
    <group position={[isMobile ? 0 : 1.2, 0, 0]}>
      <Nebula radius={9} />
      <Particles count={isMobile ? 240 : 520} radius={16} color="#cfe0ff" size={0.05} />
      <Asteroids count={isMobile ? 14 : 28} radius={14} reducedMotion={reducedMotion} />
      <group ref={station} position={[-3.4, 1.2, -1]} scale={0.7}>
        <SpaceStation reducedMotion={reducedMotion} />
      </group>
      <group ref={craft} position={[2.6, -1, 0.5]} scale={0.8}>
        <Spacecraft reducedMotion={reducedMotion} scale={1} />
      </group>
      {/* depth accent lights */}
      <pointLight position={[-6, 2, -4]} color="#9b6bff" intensity={3} distance={20} />
      <pointLight position={[6, -2, 2]} color="#45e9ff" intensity={2.5} distance={20} />
    </group>
  )
}
