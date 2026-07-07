import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Starfield } from './Starfield'
import { Nebula } from './Nebula'
import { Planet } from './Planet'
import { getPalette } from './themePresets'
import { useStore } from '../store/useStore'
import { getScroll } from '../store/scroll'

function CameraRig() {
  const { camera } = useThree()
  const { reducedMotion } = useStore()
  const target = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const p = getScroll()
    const y = reducedMotion ? 0 : THREE.MathUtils.lerp(0, 8, p)
    const z = THREE.MathUtils.lerp(20, 34, p)
    camera.position.x += (Math.sin(p * Math.PI) * 2 - camera.position.x) * 0.05
    camera.position.y += (y - camera.position.y) * 0.05
    camera.position.z += (z - camera.position.z) * 0.05
    target.current.set(0, y * 0.3, 0)
    camera.lookAt(target.current)
  })
  return null
}

export function BackgroundScene() {
  const { theme, quality } = useStore()
  const palette = getPalette(theme)
  return (
    <>
      <color attach="background" args={[palette.background.getHex()]} />
      <fog attach="fog" args={[palette.fog.getHex(), 30, 110]} />
      <Starfield count={quality === 'low' ? 3000 : 6500} radius={140} />
      <Nebula radius={130} />
      <Planet
        position={[18, 6, -40]}
        radius={9}
        colorLow="#101a3d"
        colorHigh="#3a6bff"
        atmosphereColor="#45e9ff"
        rotationSpeed={0.02}
        bands={4}
      />
      <Planet
        position={[-26, -10, -55]}
        radius={6}
        colorLow="#2a1530"
        colorHigh="#9b6bff"
        atmosphereColor="#ff5cc8"
        rotationSpeed={0.03}
        bands={7}
      />
      <CameraRig />
    </>
  )
}
