import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { atmosphereVertex, atmosphereFragment, planetVertex, planetFragment } from './shaders'

export interface PlanetProps {
  position?: [number, number, number]
  radius?: number
  colorLow?: string
  colorHigh?: string
  atmosphereColor?: string
  rotationSpeed?: number
  bands?: number
  spin?: number
}

export function Planet({
  position = [0, 0, 0],
  radius = 3,
  colorLow = '#1b2a5b',
  colorHigh = '#4d7cff',
  atmosphereColor = '#45e9ff',
  rotationSpeed = 0.05,
  bands = 6,
}: PlanetProps) {
  const group = useRef<THREE.Group>(null)

  const surfaceMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorLow: { value: new THREE.Color(colorLow) },
          uColorHigh: { value: new THREE.Color(colorHigh) },
          uBands: { value: bands },
        },
        vertexShader: planetVertex,
        fragmentShader: planetFragment,
      }),
    [colorLow, colorHigh, bands],
  )

  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(atmosphereColor) },
          uPower: { value: 3.0 },
          uIntensity: { value: 1.1 },
        },
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [atmosphereColor],
  )

  const surfRef = useRef(surfaceMat)
  const surface = useMemo(() => new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), surfaceMat), [radius, surfaceMat])
  const atmo = useMemo(
    () => new THREE.Mesh(new THREE.SphereGeometry(radius * 1.18, 48, 48), atmoMat),
    [radius, atmoMat],
  )

  useFrame((_, delta) => {
    surfRef.current.uniforms.uTime.value += delta
    if (group.current) group.current.rotation.y += delta * rotationSpeed
  })

  return (
    <group ref={group} position={position}>
      <primitive object={surface} />
      <primitive object={atmo} />
    </group>
  )
}
