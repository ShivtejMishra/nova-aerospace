import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function AmbientScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (reducedMotion) return
    if (a.current) a.current.rotation.z += d * 0.3
    if (b.current) b.current.rotation.z -= d * 0.2
  })
  return (
    <group position={[isMobile ? 0 : 1.8, 0, 0]}>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 12, 140]} />
        <meshBasicMaterial color="#4d7cff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.9, 0.4, 0]}>
        <torusGeometry args={[4.1, 0.015, 12, 140]} />
        <meshBasicMaterial color="#9b6bff" transparent opacity={0.4} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#0a1030" emissive="#45e9ff" emissiveIntensity={1.1} metalness={1} roughness={0.1} />
      </mesh>
      <pointLight color="#45e9ff" intensity={3} distance={14} />
      <Particles count={isMobile ? 120 : 240} radius={7} color="#9fc4ff" size={0.04} />
    </group>
  )
}
