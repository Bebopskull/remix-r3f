import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

const WaterShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uWaterColor: new Color("#4A90E2"),
    uWaveSpeed: 1.0,
    uWaveHeight: 0.1,
    uWaveFrequency: 10.0,
    uTransparency: 0.8,
    uReflectionStrength: 0.5,
  },
  // Vertex shader
  /*glsl*/ `
    uniform float uTime;
    uniform float uWaveHeight;
    uniform float uWaveFrequency;
    uniform float uWaveSpeed;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Wave function
    float wave(vec2 pos, float frequency, float amplitude, float speed) {
      return sin(pos.x * frequency + uTime * speed) * 
             sin(pos.z * frequency + uTime * speed) * amplitude;
    }
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Create wave displacement
      vec3 newPosition = position;
      float wave1 = wave(position.xz, uWaveFrequency, uWaveHeight, uWaveSpeed);
      float wave2 = wave(position.xz, uWaveFrequency * 2.0, uWaveHeight * 0.5, uWaveSpeed * 1.5);
      float wave3 = wave(position.xz, uWaveFrequency * 0.5, uWaveHeight * 0.25, uWaveSpeed * 0.5);
      
      newPosition.y += wave1 + wave2 + wave3;
      
      // Calculate normal for waves
      vec3 tangent = vec3(1.0, 0.0, 0.0);
      vec3 bitangent = vec3(0.0, 0.0, 1.0);
      
      float dx = cos(position.x * uWaveFrequency + uTime * uWaveSpeed) * 
                 sin(position.z * uWaveFrequency + uTime * uWaveSpeed) * 
                 uWaveHeight * uWaveFrequency;
      float dz = sin(position.x * uWaveFrequency + uTime * uWaveSpeed) * 
                 cos(position.z * uWaveFrequency + uTime * uWaveSpeed) * 
                 uWaveHeight * uWaveFrequency;
      
      tangent.y = dx;
      bitangent.y = dz;
      
      vNormal = normalize(cross(bitangent, tangent));
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uWaterColor;
    uniform float uTransparency;
    uniform float uReflectionStrength;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    // Noise function for water surface detail
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
    
    // Fractal noise for water surface
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
    
    void main() {
      // Base water color
      vec3 color = uWaterColor;
      
      // Add surface detail with noise
      float surfaceNoise = fractalNoise(vUv * 20.0 + uTime * 0.5);
      color += surfaceNoise * 0.1;
      
      // Add depth variation
      float depth = 1.0 - vUv.y;
      color *= 0.7 + depth * 0.6;
      
      // Add reflection based on normal
      float reflection = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
      color += reflection * uReflectionStrength;
      
      // Add some blue tint for water
      color = mix(color, vec3(0.2, 0.4, 0.8), 0.3);
      
      // Ensure color stays in reasonable range
      color = clamp(color, 0.0, 1.0);
      
      // Set transparency
      float alpha = uTransparency;
      
      gl_FragColor = vec4(color, alpha);
    }
  `
)

extend({ WaterShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterShaderMaterial: any
    }
  }
}

interface WaterMaterialProps {
  waterColor?: string
  waveSpeed?: number
  waveHeight?: number
  waveFrequency?: number
  transparency?: number
  reflectionStrength?: number
}

export function WaterMaterial({
  waterColor = "#4A90E2",
  waveSpeed = 1.0,
  waveHeight = 0.1,
  waveFrequency = 10.0,
  transparency = 0.8,
  reflectionStrength = 0.5
}: WaterMaterialProps) {
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
      materialRef.current.uWaterColor = new Color(waterColor)
      materialRef.current.uWaveSpeed = waveSpeed
      materialRef.current.uWaveHeight = waveHeight
      materialRef.current.uWaveFrequency = waveFrequency
      materialRef.current.uTransparency = transparency
      materialRef.current.uReflectionStrength = reflectionStrength
    }
  })

  return <waterShaderMaterial ref={materialRef} transparent />
} 