import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpaceStation({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ring = useRef<THREE.Group>(null)
  const hub = useRef<THREE.Mesh>(null)

  const hull = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cfd8ea', metalness: 0.85, roughness: 0.3 }),
    [],
  )
  const panel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#15306b',
        metalness: 0.7,
        roughness: 0.25,
        emissive: new THREE.Color('#1b4cff'),
        emissiveIntensity: 0.3,
      }),
    [],
  )

  useFrame((_, delta) => {
    if (ring.current && !reducedMotion) ring.current.rotation.z += delta * 0.15
    if (hub.current && !reducedMotion) hub.current.rotation.y += delta * 0.2
  })

  return (
    <group>
      {/* Central hub */}
      <mesh ref={hub} material={hull}>
        <cylinderGeometry args={[0.6, 0.6, 1.6, 32]} />
      </mesh>
      {/* Rotating ring habitat */}
      <group ref={ring} rotation={[Math.PI / 2.3, 0, 0]}>
        <mesh material={hull}>
          <torusGeometry args={[3, 0.35, 20, 80]} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2
          return (
            <mesh key={i} material={hull} position={[Math.cos(a) * 3, Math.sin(a) * 3, 0]}>
              <boxGeometry args={[0.8, 0.6, 0.8]} />
            </mesh>
          )
        })}
      </group>
      {/* Solar trusses */}
      {[-1, 1].map((s) => (
        <mesh key={s} material={panel} position={[s * 3.2, -1.6, 0]}>
          <boxGeometry args={[3.4, 1.2, 0.05]} />
        </mesh>
      ))}
      <pointLight color="#4d7cff" intensity={2.5} distance={14} position={[0, 0, 4]} />
    </group>
  )
}
