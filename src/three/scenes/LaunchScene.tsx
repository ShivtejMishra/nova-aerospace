import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RocketModel } from '../RocketModel'
import { useStore } from '../../store/useStore'
import { useMediaQuery } from '../../hooks/useMediaQuery'

function Smoke({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * 0.5
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = Math.random() * 0.4
      positions[i * 3 + 2] = Math.sin(a) * r
      seeds[i] = Math.random()
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color('#c9d4e6'),
      size: 1.6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    })
    return new THREE.Points(geo, mat)
  }, [count])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const pos = points.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + 0.01 + (1 - pos.getY(i) * 0.3) * 0.01
      if (y > 6) y = 0
      pos.setY(i, y)
      const spread = 0.4 + y * 0.5
      const seed = points.geometry.getAttribute('aSeed').getX(i)
      pos.setX(i, Math.cos(seed * 6.28 + t) * spread * 0.3)
      pos.setZ(i, Math.sin(seed * 6.28 + t) * spread * 0.3)
    }
    pos.needsUpdate = true
    if (ref.current) ref.current.rotation.y = t * 0.1
  })

  return <primitive object={points} ref={ref} />
}

function Gantry() {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#aeb8cc', metalness: 0.7, roughness: 0.5 }),
    [],
  )
  const blink = useRef<THREE.MeshBasicMaterial>(null)
  useFrame((s) => {
    if (blink.current) blink.current.opacity = 0.4 + Math.sin(s.clock.elapsedTime * 6) * 0.4
  })
  return (
    <group position={[1.1, 0, 0]}>
      <mesh material={mat} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.18, 5, 0.18]} />
      </mesh>
      <mesh material={mat} position={[0, 2.6, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
      </mesh>
      <mesh material={mat} position={[-0.5, 2.4, 0]}>
        <boxGeometry args={[1, 0.12, 0.12]} />
      </mesh>
      <mesh position={[-0.9, 1.8, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial ref={blink} color="#ff5cc8" transparent />
      </mesh>
    </group>
  )
}

export function LaunchScene() {
  const { reducedMotion } = useStore()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const rocket = useRef<THREE.Group>(null)

  useFrame((s) => {
    if (rocket.current && !reducedMotion) {
      const t = s.clock.elapsedTime
      // gentle pre-launch vibration
      rocket.current.position.x = Math.sin(t * 30) * 0.012
      rocket.current.position.z = Math.cos(t * 27) * 0.012
    }
  })

  return (
    <group position={[isMobile ? 0.2 : 1.6, -1.4, 0]}>
      {/* Pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color="#0c1124" metalness={0.5} roughness={0.7} />
      </mesh>
      <Gantry />
      <group ref={rocket} position={[-0.4, 0.2, 0]}>
        <RocketModel reducedMotion={reducedMotion} />
      </group>
      <Smoke />
      <pointLight position={[0, 0.2, 1]} color="#ffb347" intensity={3} distance={8} />
    </group>
  )
}
