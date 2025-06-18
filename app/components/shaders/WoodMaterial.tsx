import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

const WoodShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uWoodColor: new Color("#8B4513"),
    uRingColor: new Color("#654321"),
    uRingScale: 50.0,
    uRingWidth: 0.1,
    uNoiseScale: 10.0,
  },
  // Vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uWoodColor;
    uniform vec3 uRingColor;
    uniform float uRingScale;
    uniform float uRingWidth;
    uniform float uNoiseScale;
    
    varying vec2 vUv;
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
    
    // Fractal noise
    float fractalNoise(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      return value;
    }
    
    void main() {
      // Create wood grain pattern
      vec2 pos = vUv * uRingScale;
      float distance = length(pos);
      
      // Add some variation to the rings
      float ringVariation = fractalNoise(pos * uNoiseScale + uTime * 0.1);
      distance += ringVariation * 0.1;
      
      // Create ring pattern
      float ring = fract(distance);
      float ringMask = smoothstep(0.0, uRingWidth, ring) * smoothstep(1.0, 1.0 - uRingWidth, ring);
      
      // Mix wood colors
      vec3 color = mix(uWoodColor, uRingColor, ringMask);
      
      // Add some noise for texture
      float noiseValue = fractalNoise(vUv * 20.0 + uTime * 0.05);
      color += noiseValue * 0.1;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ WoodShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      woodShaderMaterial: any
    }
  }
}

interface WoodMaterialProps {
  woodColor?: string
  ringColor?: string
  ringScale?: number
  ringWidth?: number
  noiseScale?: number
  speed?: number
}

export function WoodMaterial({
  woodColor = "#8B4513",
  ringColor = "#654321",
  ringScale = 50.0,
  ringWidth = 0.1,
  noiseScale = 10.0,
  speed = 1
}: WoodMaterialProps) {
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime * speed
      materialRef.current.uWoodColor = new Color(woodColor)
      materialRef.current.uRingColor = new Color(ringColor)
      materialRef.current.uRingScale = ringScale
      materialRef.current.uRingWidth = ringWidth
      materialRef.current.uNoiseScale = noiseScale
    }
  })

  return <woodShaderMaterial ref={materialRef} />
} 