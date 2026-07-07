import * as THREE from 'three'
import type { ThemeMode } from '../store/useStore'

export interface SpacePalette {
  background: THREE.Color
  fog: THREE.Color
  sun: THREE.Color
  sunIntensity: number
  ambient: THREE.Color
  ambientIntensity: number
  star: THREE.Color
  nebulaA: THREE.Color
  nebulaB: THREE.Color
  nebulaOpacity: number
  planetLight: THREE.Color
  grid: THREE.Color
}

const DARK: SpacePalette = {
  background: new THREE.Color('#03040a'),
  fog: new THREE.Color('#04060f'),
  sun: new THREE.Color('#bfe0ff'),
  sunIntensity: 2.1,
  ambient: new THREE.Color('#2a3a7a'),
  ambientIntensity: 0.55,
  star: new THREE.Color('#cfe4ff'),
  nebulaA: new THREE.Color('#4d7cff'),
  nebulaB: new THREE.Color('#9b6bff'),
  nebulaOpacity: 0.55,
  planetLight: new THREE.Color('#cfe4ff'),
  grid: new THREE.Color('#1f2a5c'),
}

const LIGHT: SpacePalette = {
  background: new THREE.Color('#e9eefb'),
  fog: new THREE.Color('#dbe3f7'),
  sun: new THREE.Color('#fff4d6'),
  sunIntensity: 2.6,
  ambient: new THREE.Color('#ffffff'),
  ambientIntensity: 0.95,
  star: new THREE.Color('#5d6f9e'),
  nebulaA: new THREE.Color('#7aa0ff'),
  nebulaB: new THREE.Color('#c79bff'),
  nebulaOpacity: 0.28,
  planetLight: new THREE.Color('#ffffff'),
  grid: new THREE.Color('#9fb2e6'),
}

export function getPalette(mode: ThemeMode): SpacePalette {
  return mode === 'light' ? LIGHT : DARK
}
