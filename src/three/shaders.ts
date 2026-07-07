// Reusable GLSL shader sources used across the 3D scenes.

// Classic 3D simplex noise (Ashima Arts) — shared chunk.
export const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p){
  float total = 0.0;
  float amp = 0.5;
  for(int i=0;i<5;i++){
    total += snoise(p) * amp;
    p *= 2.02;
    amp *= 0.5;
  }
  return total;
}
`

// ---------- NEBULA ----------
export const nebulaVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vPos;
void main(){
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const nebulaFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
varying vec2 vUv;
varying vec3 vPos;
${simplexNoise}
void main(){
  vec3 p = vPos * 0.18;
  float n = fbm(p + vec3(0.0, 0.0, uTime * 0.03));
  float n2 = fbm(p * 1.7 + vec3(uTime * 0.02, 0.0, 0.0));
  float clouds = smoothstep(-0.2, 0.9, n * 0.6 + n2 * 0.4);
  vec3 col = mix(uColorA, uColorB, clouds);
  float alpha = clouds * uOpacity * smoothstep(1.2, 0.1, length(vUv - 0.5) * 2.0);
  gl_FragColor = vec4(col, alpha);
}
`

// ---------- STARFIELD (points) ----------
export const starVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aScale;
attribute float aPhase;
varying float vTwinkle;
void main(){
  vec3 pos = position;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float tw = 0.5 + 0.5 * sin(uTime * 1.6 + aPhase);
  vTwinkle = tw;
  gl_PointSize = uSize * aScale * (tw * 0.7 + 0.3) * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const starFragment = /* glsl */ `
uniform vec3 uColor;
varying float vTwinkle;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float alpha = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColor, vec3(1.0), vTwinkle * 0.5);
  gl_FragColor = vec4(col, alpha * (0.35 + vTwinkle * 0.65));
}
`

// ---------- PLANET ATMOSPHERE (fresnel glow) ----------
export const atmosphereVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mvPosition.xyz);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const atmosphereFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uPower;
uniform float uIntensity;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), uPower);
  gl_FragColor = vec4(uColor, fres * uIntensity);
}
`

// ---------- PROCEDURAL PLANET SURFACE ----------
export const planetVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vPos;
void main(){
  vNormal = normalize(normalMatrix * normal);
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const planetFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorLow;
uniform vec3 uColorHigh;
uniform float uBands;
varying vec3 vNormal;
varying vec3 vPos;
${simplexNoise}
void main(){
  vec3 p = normalize(vPos);
  float n = fbm(p * 2.4 + vec3(uTime * 0.02, 0.0, 0.0));
  float bands = sin((p.y * uBands) + n * 1.5) * 0.5 + 0.5;
  float m = clamp(n * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(uColorLow, uColorHigh, m * 0.7 + bands * 0.3);
  float light = 0.35 + 0.65 * max(dot(vNormal, normalize(vec3(0.6, 0.4, 0.8))), 0.0);
  col *= light;
  gl_FragColor = vec4(col, 1.0);
}
`
