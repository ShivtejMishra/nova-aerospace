import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getPalette } from './themePresets'
import { useTheme } from '../store/useStore'
import { starVertex, starFragment } from './shaders'

interface StarfieldProps {
  count?: number
  radius?: number
}

export function Starfield({ count = 6000, radius = 120 }: StarfieldProps) {
  const { theme } = useTheme()
  const palette = useMemo(() => getPalette(theme), [theme])

  const { points, material } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = radius * (0.35 + Math.random() * 0.65)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      scales[i] = 0.4 + Math.random() * 1.6
      phases[i] = Math.random() * Math.PI * 2
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1.1 },
        uColor: { value: palette.star.clone() },
      },
      vertexShader: starVertex,
      fragmentShader: starFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const pts = new THREE.Points(geo, mat)
    pts.frustumCulled = false
    return { points: pts, material: mat }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, radius])

  // Update uniform color when theme palette changes
  useMemo(() => {
    material.uniforms.uColor.value = palette.star.clone()
  }, [palette, material])

  const ref = useRef(points)
  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
    ref.current.rotation.y += delta * 0.006
  })

  return <primitive object={points} ref={ref} />
}
