import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Animated communication beam between two points (e.g. satellite → Earth).
 * A thin additive cylinder with a travelling pulse of light.
 */
export function SignalBeam({
  start,
  end,
  color = '#45e9ff',
  radius = 0.02,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  radius?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const mesh = useMemo(() => {
    const a = new THREE.Vector3(...start)
    const b = new THREE.Vector3(...end)
    const len = a.distanceTo(b)
    const geo = new THREE.CylinderGeometry(radius, radius, len, 8, 1, true)
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const m = new THREE.Mesh(geo, mat)
    const mid = a.clone().add(b).multiplyScalar(0.5)
    m.position.copy(mid)
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize())
    return m
  }, [start, end, color, radius])

  useFrame((state) => {
    const mat = meshRef.current?.material as THREE.MeshBasicMaterial | undefined
    if (mat) mat.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 3) * 0.25
  })

  return <primitive object={mesh} ref={meshRef} />
}
