import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { atmosphereVertex, atmosphereFragment, planetVertex, planetFragment, simplexNoise } from './shaders'

/**
 * Procedural Earth: fbm continents, a translucent cloud shell, and a fresnel
 * atmosphere. Fully self-contained (no textures) but reads as a believable,
 * premium planet. Rotates slowly; clouds drift independently.
 */
export function Earth({
  position = [0, 0, 0],
  radius = 3,
  rotationSpeed = 0.05,
}: {
  position?: [number, number, number]
  radius?: number
  rotationSpeed?: number
}) {
  const group = useRef<THREE.Group>(null)
  const clouds = useRef<THREE.Mesh>(null)

  const surfaceMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorLow: { value: new THREE.Color('#0a3b8c') },
          uColorHigh: { value: new THREE.Color('#2f9e4a') },
          uBands: { value: 0.0 },
        },
        vertexShader: planetVertex,
        fragmentShader: planetFragment,
      }),
    [],
  )

  const cloudMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: planetVertex,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPos;
          ${simplexNoise}
          void main(){
            vec3 p = normalize(vPos);
            float n = fbm(p * 2.2 + vec3(uTime * 0.01, 0.0, 0.0));
            float c = smoothstep(0.15, 0.6, n);
            float light = 0.4 + 0.6 * max(dot(vNormal, normalize(vec3(0.6,0.4,0.8))), 0.0);
            gl_FragColor = vec4(vec3(1.0) * light, c * 0.6);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [],
  )

  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color('#5fa8ff') },
          uPower: { value: 3.2 },
          uIntensity: { value: 1.2 },
        },
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  const surfRef = useRef(surfaceMat)
  const cloudRef = useRef(cloudMat)
  const surface = useMemo(
    () => new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 96), surfaceMat),
    [radius, surfaceMat],
  )
  const cloudMesh = useMemo(
    () => new THREE.Mesh(new THREE.SphereGeometry(radius * 1.02, 64, 64), cloudMat),
    [radius, cloudMat],
  )
  const atmo = useMemo(
    () => new THREE.Mesh(new THREE.SphereGeometry(radius * 1.16, 64, 64), atmoMat),
    [radius, atmoMat],
  )

  useFrame((_, delta) => {
    surfRef.current.uniforms.uTime.value += delta
    cloudRef.current.uniforms.uTime.value += delta
    if (group.current) group.current.rotation.y += delta * rotationSpeed
    if (clouds.current) clouds.current.rotation.y += delta * rotationSpeed * 1.4
  })

  return (
    <group ref={group} position={position}>
      <primitive object={surface} />
      <primitive object={cloudMesh} ref={clouds} />
      <primitive object={atmo} />
    </group>
  )
}
