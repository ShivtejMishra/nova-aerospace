import { useMemo } from 'react'
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  SMAA,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import { useStore } from '../store/useStore'

/**
 * Postprocessing stack. Quality-gated: low quality skips the composer entirely
 * to keep the frame budget on weak devices.
 */
export function Effects() {
  const { quality, reducedMotion } = useStore()
  const offset = useMemo(
    () => new Vector2(reducedMotion ? 0 : 0.0006, reducedMotion ? 0 : 0.0009),
    [reducedMotion],
  )

  if (quality === 'low') return null

  const effects = [
    <Bloom
      key="bloom"
      intensity={quality === 'high' ? 0.9 : 0.6}
      luminanceThreshold={0.2}
      luminanceSmoothing={0.9}
      mipmapBlur
      radius={0.7}
    />,
    <ChromaticAberration
      key="ca"
      blendFunction={BlendFunction.NORMAL}
      offset={offset}
      radialModulation={false}
      modulationOffset={0}
    />,
    <Vignette key="vig" eskil={false} offset={0.25} darkness={0.75} />,
  ]
  if (quality === 'high') effects.push(<SMAA key="smaa" />)

  return (
    <EffectComposer multisampling={quality === 'high' ? 4 : 0}>{effects}</EffectComposer>
  )
}
