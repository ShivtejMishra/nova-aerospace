import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getPalette } from './themePresets'
import { useTheme } from '../store/useStore'
import { nebulaVertex, nebulaFragment } from './shaders'

export function Nebula({ radius = 95 }: { radius?: number }) {
  const { theme } = useTheme()
  const palette = useMemo(() => getPalette(theme), [theme])

  const { mesh, material } = useMemo(() => {
    const geo = new THREE.SphereGeometry(radius, 32, 32)
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: palette.nebulaA.clone() },
        uColorB: { value: palette.nebulaB.clone() },
        uOpacity: { value: palette.nebulaOpacity },
      },
      vertexShader: nebulaVertex,
      fragmentShader: nebulaFragment,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    })
    const m = new THREE.Mesh(geo, mat)
    m.frustumCulled = false
    return { mesh: m, material: mat }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius])

  useMemo(() => {
    material.uniforms.uColorA.value = palette.nebulaA.clone()
    material.uniforms.uColorB.value = palette.nebulaB.clone()
    material.uniforms.uOpacity.value = palette.nebulaOpacity
  }, [palette, material])

  const ref = useRef(mesh)
  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
    ref.current.rotation.y += delta * 0.004
  })

  return <primitive object={mesh} ref={ref} />
}
