import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HoloCore({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  const coreMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a1030',
        metalness: 1,
        roughness: 0.1,
        emissive: new THREE.Color('#45e9ff'),
        emissiveIntensity: 0.8,
      }),
    [],
  )
  const wireMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#4d7cff', wireframe: true, transparent: true, opacity: 0.6 }),
    [],
  )
  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9b6bff',
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color('#9b6bff'),
        emissiveIntensity: 0.5,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y += delta * 0.25
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    if (core.current) core.current.rotation.y -= delta * 0.5
    if (ring.current) ring.current.rotation.z += delta * 0.6
  })

  return (
    <group ref={group}>
      <mesh ref={core} material={coreMat}>
        <icosahedronGeometry args={[1.4, 1]} />
      </mesh>
      <mesh material={wireMat} scale={1.02}>
        <icosahedronGeometry args={[1.4, 1]} />
      </mesh>
      <mesh ref={ring} material={ringMat} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.4, 0.06, 16, 100]} />
      </mesh>
      <mesh material={ringMat} rotation={[Math.PI / 1.8, Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, 0.04, 16, 100]} />
      </mesh>
      <pointLight color="#45e9ff" intensity={3} distance={10} />
    </group>
  )
}
