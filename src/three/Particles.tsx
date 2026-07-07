import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Slow-drifting volumetric dust / floating particles that add depth and life to
 * a scene. Cheap: a single Points object with additive blending.
 */
export function Particles({
  count = 400,
  radius = 12,
  color = '#9fc4ff',
  size = 0.06,
  speed = 0.04,
}: {
  count?: number
  radius?: number
  color?: string
  size?: number
  speed?: number
}) {
  const ref = useRef<THREE.Points>(null)

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * (0.3 + Math.random() * 0.7)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return new THREE.Points(geo, mat)
  }, [count, radius, color, size])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed
      ref.current.rotation.x += delta * speed * 0.3
    }
  })

  return <primitive object={points} ref={ref} />
}
