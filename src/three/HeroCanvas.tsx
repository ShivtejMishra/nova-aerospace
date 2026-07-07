import { Canvas } from '@react-three/fiber'
import { HeroScene } from './HeroScene'
import { useStore } from '../store/useStore'

export default function HeroCanvas() {
  const { quality, reducedMotion, paused } = useStore()
  return (
    <Canvas
      dpr={[1, quality === 'high' ? 2 : 1.4]}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance', alpha: false }}
      camera={{ position: [0, 0, 9], fov: 42 }}
      frameloop={paused ? 'never' : reducedMotion ? 'demand' : 'always'}
    >
      <HeroScene />
    </Canvas>
  )
}
