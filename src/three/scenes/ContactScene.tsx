import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function Display({ position, scale = 1, color = '#45e9ff' }: { position: [number, number, number]; scale?: number; color?: string }) {
  const ref = useRef<THREE.Group>(null)
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, side: THREE.DoubleSide }),
    [color],
  )
  useFrame((s) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.4 + position[2]) * 0.14
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <planeGeometry args={[1.3, 0.85]} />
        <meshBasicMaterial color="#081020" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh material={mat}>
        <planeGeometry args={[1.16, 0.7]} />
      </mesh>
    </group>
  )
}

export function ContactScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const globe = useRef<THREE.Group>(null)
  const wireMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#45e9ff', wireframe: true, transparent: true, opacity: 0.4 }),
    [],
  )

  useFrame((_, d) => {
    if (!reducedMotion && globe.current) globe.current.rotation.y += d * 0.18
  })

  return (
    <group position={[isMobile ? 0 : 1.4, 0, 0]}>
      <group ref={globe} scale={2.6}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#0a1030" emissive="#1b4cff" emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh material={wireMat} scale={1.01}>
          <sphereGeometry args={[1, 24, 24]} />
        </mesh>
      </group>
      <Display position={[-2.8, 1.3, 0.6]} scale={isMobile ? 0.8 : 1} />
      <Display position={[2.9, -1.1, 0.5]} scale={isMobile ? 0.8 : 1} color="#9b6bff" />
      <Display position={[1.6, 1.7, -0.6]} scale={isMobile ? 0.7 : 0.95} color="#ffd479" />
      <Particles count={isMobile ? 120 : 260} radius={7} color="#9fc4ff" size={0.04} />
      <pointLight position={[0, 0, 3]} color="#45e9ff" intensity={2.5} distance={16} />
      <pointLight position={[-4, -2, -3]} color="#9b6bff" intensity={2} distance={16} />
    </group>
  )
}
