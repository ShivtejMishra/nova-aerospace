import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Asteroids({
  count = 28,
  radius = 26,
  reducedMotion = false,
}: {
  count?: number
  radius?: number
  reducedMotion?: boolean
}) {
  const group = useRef<THREE.Group>(null)

  const rocks = useMemo(() => {
    const items: {
      mesh: THREE.Mesh
      speed: number
      axis: THREE.Vector3
      spin: number
    }[] = []
    const mat = new THREE.MeshStandardMaterial({
      color: '#6a7290',
      metalness: 0.1,
      roughness: 0.95,
      flatShading: true,
    })
    for (let i = 0; i < count; i++) {
      const r = 0.3 + Math.random() * 1.1
      const geo = new THREE.IcosahedronGeometry(r, 0)
      const mesh = new THREE.Mesh(geo, mat)
      const a = Math.random() * Math.PI * 2
      const b = Math.acos(2 * Math.random() - 1)
      const dist = radius * (0.5 + Math.random() * 0.6)
      mesh.position.set(
        dist * Math.sin(b) * Math.cos(a),
        (Math.random() - 0.5) * 14,
        dist * Math.sin(b) * Math.sin(a),
      )
      mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6)
      items.push({
        mesh,
        speed: 0.02 + Math.random() * 0.05,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        spin: (Math.random() - 0.5) * 0.4,
      })
    }
    return items
  }, [count, radius])

  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return
    rocks.forEach((r) => {
      r.mesh.rotateOnAxis(r.axis, r.spin * delta)
      r.mesh.position.y += Math.sin(performance.now() * 0.0005 + r.speed * 100) * 0.002
    })
    group.current.rotation.y += delta * 0.01
  })

  return (
    <group ref={group}>
      {rocks.map((r, i) => (
        <primitive key={i} object={r.mesh} />
      ))}
    </group>
  )
}
