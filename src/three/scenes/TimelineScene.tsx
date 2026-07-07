import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SignalBeam } from '../SignalBeam'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function TimelineScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const group = useRef<THREE.Group>(null)
  const count = 7
  const R = 4.2

  useFrame((_, d) => {
    if (!reducedMotion && group.current) group.current.rotation.y += d * 0.12
  })

  const nodes = Array.from({ length: count }).map((_, i) => {
    const a = (i / count) * Math.PI * 2
    return [Math.cos(a) * R, Math.sin(a * 1.5) * 0.6, Math.sin(a) * R] as [number, number, number]
  })

  return (
    <group position={[isMobile ? 0 : 1.4, 0, 0]}>
      {/* central core */}
      <mesh>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial color="#0a1030" emissive="#45e9ff" emissiveIntensity={1.2} metalness={1} roughness={0.1} />
      </mesh>
      <pointLight color="#45e9ff" intensity={4} distance={14} />

      {/* orbital path */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[R, 0.015, 10, 160]} />
        <meshBasicMaterial color="#4d7cff" transparent opacity={0.5} />
      </mesh>

      <group ref={group}>
        {nodes.map((p, i) => {
          const next = nodes[(i + 1) % count]
          return (
            <group key={i}>
              <mesh position={p}>
                <boxGeometry args={[0.35, 0.35, 0.35]} />
                <meshStandardMaterial color="#cfd8ea" metalness={0.8} roughness={0.3} />
              </mesh>
              <SignalBeam start={p} end={next} color="#9b6bff" radius={0.01} />
            </group>
          )
        })}
      </group>
    </group>
  )
}
