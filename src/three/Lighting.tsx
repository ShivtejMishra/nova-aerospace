import { useMemo } from 'react'
import { getPalette } from './themePresets'
import { useTheme } from '../store/useStore'

export function Lighting() {
  const { theme } = useTheme()
  const palette = useMemo(() => getPalette(theme), [theme])
  return (
    <>
      <ambientLight color={palette.ambient} intensity={palette.ambientIntensity} />
      <directionalLight
        color={palette.sun}
        intensity={palette.sunIntensity}
        position={[8, 6, 6]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color={palette.nebulaB} intensity={1.2} position={[-12, -4, -8]} distance={60} />
    </>
  )
}
