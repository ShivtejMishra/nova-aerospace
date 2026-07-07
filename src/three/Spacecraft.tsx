import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export interface SpacecraftProps {
  position?: [number, number, number]
  scale?: number
  spinSpeed?: number
  reducedMotion?: boolean
}

/**
 * A fully procedural, physically-styled spacecraft built from primitives.
 * Includes a glowing engine plume and slowly self-rotates for the hero.
 */
export function Spacecraft({
  position = [0, 0, 0],
  scale = 1,
  spinSpeed = 0.18,
  reducedMotion = false,
}: SpacecraftProps) {
  const group = useRef<THREE.Group>(null)
  const plume = useRef<THREE.Mesh>(null)
  const flameMat = useRef<THREE.MeshBasicMaterial>(null)

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8edf7',
        metalness: 0.9,
        roughness: 0.25,
      }),
    [],
  )
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#45e9ff',
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color('#1b6cff'),
        emissiveIntensity: 0.4,
      }),
    [],
  )
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#11162b', metalness: 0.8, roughness: 0.4 }),
    [],
  )
  const glassMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a1030',
        metalness: 1,
        roughness: 0.05,
        emissive: new THREE.Color('#45e9ff'),
        emissiveIntensity: 0.6,
      }),
    [],
  )
  const flameMaterial = useMemo(
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
    if (group.current && !reducedMotion) {
      group.current.rotation.y += delta * spinSpeed
    }
    if (plume.current && !reducedMotion) {
      const t = state.clock.elapsedTime
      const s = 0.85 + Math.sin(t * 30) * 0.15
      plume.current.scale.set(s, 1 + Math.sin(t * 22) * 0.2, s)
      if (flameMat.current) flameMat.current.opacity = 0.7 + Math.sin(t * 26) * 0.25
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Main fuselage */}
      <mesh material={bodyMat} castShadow>
        <cylinderGeometry args={[0.55, 0.62, 3.2, 48]} />
      </mesh>
      {/* Nose cone */}
      <mesh material={bodyMat} position={[0, 2.0, 0]} castShadow>
        <coneGeometry args={[0.55, 1.3, 48]} />
      </mesh>
      {/* Accent bands */}
      <mesh material={accentMat} position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.28, 48]} />
      </mesh>
      <mesh material={accentMat} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.18, 48]} />
      </mesh>
      {/* Cockpit window */}
      <mesh material={glassMat} position={[0, 1.1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
      </mesh>
      {/* Fins */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          material={darkMat}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 0.62,
            -1.2,
            Math.sin((i / 3) * Math.PI * 2) * 0.62,
          ]}
          rotation={[0, (i / 3) * Math.PI * 2, 0.5]}
          castShadow
        >
          <boxGeometry args={[0.12, 1.1, 0.5]} />
        </mesh>
      ))}
      {/* Engine nozzles */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} material={darkMat} position={[x, -1.75, 0]}>
          <cylinderGeometry args={[0.18, 0.26, 0.5, 24]} />
        </mesh>
      ))}
      {/* Engine plume */}
      <mesh
        ref={plume}
        material={flameMaterial}
        position={[0, -2.25, 0]}
      >
        <coneGeometry args={[0.32, 1.6, 24]} />
      </mesh>
      {/* Plume glow core */}
      <pointLight position={[0, -2.2, 0]} color="#ffb347" intensity={6} distance={6} />
    </group>
  )
}
