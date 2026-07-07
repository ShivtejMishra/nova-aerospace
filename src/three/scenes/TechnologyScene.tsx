import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HoloCore } from '../HoloCore'
import { Particles } from '../Particles'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function HudPanel({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null)
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#45e9ff',
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    [],
  )
  useFrame((s) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 1.2 + position[0]) * 0.12
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh material={mat}>
        <planeGeometry args={[1.1, 0.7]} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.18, 0.78]} />
        <meshBasicMaterial color="#0a1030" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export function TechnologyScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const ring = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)

  useFrame((_, d) => {
    if (reducedMotion) return
    if (ring.current) ring.current.rotation.z += d * 0.4
    if (wire.current) {
      wire.current.rotation.y += d * 0.08
      wire.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.3
    }
  })

  const wireMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#4d7cff', wireframe: true, transparent: true, opacity: 0.35 }),
    [],
  )

  return (
    <group position={[isMobile ? 0 : 1.4, 0, 0]}>
      <HoloCore reducedMotion={reducedMotion} />
      <mesh ref={wire} material={wireMat} position={[0, 0, 0]} scale={3.2}>
        <sphereGeometry args={[1, 24, 24]} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[3.4, 0.02, 12, 120]} />
        <meshBasicMaterial color="#9b6bff" />
      </mesh>
      <HudPanel position={[-2.6, 1.4, 0.5]} scale={isMobile ? 0.7 : 1} />
      <HudPanel position={[2.8, -1.2, 0.4]} scale={isMobile ? 0.7 : 1} />
      <HudPanel position={[1.4, 1.8, -0.6]} scale={isMobile ? 0.6 : 0.9} />
      <Particles count={isMobile ? 120 : 240} radius={7} color="#7fb0ff" size={0.04} />
    </group>
  )
}
