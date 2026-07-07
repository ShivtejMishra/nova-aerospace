import { Canvas } from '@react-three/fiber'
import { BackgroundScene } from './BackgroundScene'
import { useStore } from '../store/useStore'

export default function BackgroundCanvas() {
  const { quality, reducedMotion, paused } = useStore()
  return (
    <Canvas
      dpr={[1, quality === 'high' ? 1.6 : 1.2]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 0, 20], fov: 55 }}
      frameloop={paused ? 'never' : reducedMotion ? 'demand' : 'always'}
    >
      <BackgroundScene />
    </Canvas>
  )
}
