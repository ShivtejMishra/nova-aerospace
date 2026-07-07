import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function RocketModel({
  reducedMotion = false,
  launch = false,
}: {
  reducedMotion?: boolean
  launch?: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const flame = useRef<THREE.Mesh>(null)

  const body = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f2f5fc', metalness: 0.9, roughness: 0.25 }),
    [],
  )
  const accent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ff5cc8',
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color('#ff2fa8'),
        emissiveIntensity: 0.4,
      }),
    [],
  )
  const dark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#11162b', metalness: 0.8, roughness: 0.4 }),
    [],
  )
  const flameMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffd479',
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (group.current && launch && !reducedMotion) {
      group.current.position.y += delta * 0.8
    }
    if (flame.current && !reducedMotion) {
      const t = state.clock.elapsedTime
      flame.current.scale.set(0.85 + Math.sin(t * 28) * 0.15, 1 + Math.sin(t * 20) * 0.25, 0.85 + Math.sin(t * 28) * 0.15)
    }
  })

  return (
    <group ref={group}>
      <mesh material={body} position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.66, 4, 48]} />
      </mesh>
      <mesh material={body} position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.6, 1.4, 48]} />
      </mesh>
      <mesh material={accent} position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.2, 48]} />
      </mesh>
      <mesh material={accent} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.16, 48]} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          material={dark}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.62,
            -1.4,
            Math.sin((i / 4) * Math.PI * 2) * 0.62,
          ]}
          rotation={[0, (i / 4) * Math.PI * 2, 0.45]}
          castShadow
        >
          <boxGeometry args={[0.14, 1.4, 0.6]} />
        </mesh>
      ))}
      <mesh ref={flame} material={flameMat} position={[0, -2.6, 0]}>
        <coneGeometry args={[0.4, 2, 24]} />
      </mesh>
      <pointLight position={[0, -2.4, 0]} color="#ffb347" intensity={5} distance={7} />
    </group>
  )
}
