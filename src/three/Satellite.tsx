import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Satellite({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const panelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#15306b',
        metalness: 0.7,
        roughness: 0.25,
        emissive: new THREE.Color('#1b4cff'),
        emissiveIntensity: 0.25,
      }),
    [],
  )
  const bodyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#dfe6f2', metalness: 0.85, roughness: 0.3 }),
    [],
  )
  const goldMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffd479', metalness: 1, roughness: 0.35 }),
    [],
  )

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.3
  })

  return (
    <group ref={group}>
      {/* Body */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[1.1, 1.4, 1.1]} />
      </mesh>
      {/* Gold foil band */}
      <mesh material={goldMat} position={[0, 0, 0]}>
        <boxGeometry args={[1.14, 0.4, 1.14]} />
      </mesh>
      {/* Solar panels */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 1.4, 0, 0]}>
          <mesh material={panelMat} position={[s * 1.3, 0, 0]} castShadow>
            <boxGeometry args={[2.4, 1.1, 0.06]} />
          </mesh>
          <mesh material={bodyMat} position={[s * 0.3, 0, 0]}>
            <boxGeometry args={[0.5, 0.18, 0.18]} />
          </mesh>
        </group>
      ))}
      {/* Antenna dish */}
      <mesh material={bodyMat} position={[0, 1.0, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.05, 0.4, 24, 1, true]} />
      </mesh>
      <mesh material={goldMat} position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
      </mesh>
    </group>
  )
}
