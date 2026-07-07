import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Spacecraft } from '../Spacecraft'
import { Planet } from '../Planet'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function SpacecraftScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const g = useRef<THREE.Group>(null)
  useFrame((_, d) => {
    if (!reducedMotion && g.current) g.current.rotation.y += d * 0.14
  })
  return (
    <group position={[isMobile ? 0 : 1.8, 0, 0]}>
      <Planet
        position={[-4.5, 1.6, -5]}
        radius={2.6}
        colorLow="#101a3d"
        colorHigh="#3a6bff"
        atmosphereColor="#45e9ff"
        rotationSpeed={0.05}
        bands={4}
      />
      <group ref={g}>
        <Spacecraft reducedMotion={reducedMotion} scale={1.15} />
      </group>
      <Particles count={isMobile ? 160 : 340} radius={12} color="#9fc4ff" size={0.05} />
      <pointLight position={[0, 0, 4]} color="#45e9ff" intensity={3} distance={18} />
    </group>
  )
}
