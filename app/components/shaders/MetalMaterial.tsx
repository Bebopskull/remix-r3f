import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

const MetalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uMetalColor: new Color("#C0C0C0"),
    uRoughness: 0.3,
    uMetallic: 1.0,
    uNoiseScale: 20.0,
    uScratchScale: 50.0,
    uScratchIntensity: 0.1,
  },
  // Vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uMetalColor;
    uniform float uRoughness;
    uniform float uMetallic;
    uniform float uNoiseScale;
    uniform float uScratchScale;
    uniform float uScratchIntensity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }
    
    // Fractal noise for surface imperfections
    float fractalNoise(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 3; i++) {
        value += amplitude * smoothNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      return value;
    }
    
    // Simulate scratches
    float scratches(vec2 uv) {
      float scratch = 0.0;
      for(int i = 0; i < 5; i++) {
        float angle = float(i) * 3.14159 * 0.4;
        vec2 dir = vec2(cos(angle), sin(angle));
        float dist = dot(uv - 0.5, dir);
        float scratchLine = smoothstep(0.0, 0.01, abs(dist)) * smoothstep(1.0, 0.99, abs(dist));
        scratch += scratchLine * 0.2;
      }
      return scratch;
    }
    
    void main() {
      // Base metal color
      vec3 color = uMetalColor;
      
      // Add surface noise for roughness
      float surfaceNoise = fractalNoise(vUv * uNoiseScale + uTime * 0.1);
      color += surfaceNoise * uRoughness * 0.3;
      
      // Add scratches
      float scratchPattern = scratches(vUv * uScratchScale);
      color -= scratchPattern * uScratchIntensity;
      
      // Add some variation based on normal
      float normalVariation = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
      color *= 0.8 + normalVariation * 0.4;
      
      // Add metallic sheen
      float metallicSheen = pow(1.0 - uRoughness, 2.0);
      color += metallicSheen * 0.2;
      
      // Ensure color stays in reasonable range
      color = clamp(color, 0.0, 1.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ MetalShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      metalShaderMaterial: any
    }
  }
}

interface MetalMaterialProps {
  metalColor?: string
  roughness?: number
  metallic?: number
  noiseScale?: number
  scratchScale?: number
  scratchIntensity?: number
  speed?: number
}

export function MetalMaterial({
  metalColor = "#C0C0C0",
  roughness = 0.3,
  metallic = 1.0,
  noiseScale = 20.0,
  scratchScale = 50.0,
  scratchIntensity = 0.1,
  speed = 1
}: MetalMaterialProps) {
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime * speed
      materialRef.current.uMetalColor = new Color(metalColor)
      materialRef.current.uRoughness = roughness
      materialRef.current.uMetallic = metallic
      materialRef.current.uNoiseScale = noiseScale
      materialRef.current.uScratchScale = scratchScale
      materialRef.current.uScratchIntensity = scratchIntensity
    }
  })

  return <metalShaderMaterial ref={materialRef} />
} 