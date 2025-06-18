// Create: app/components/3d/materials/GradientMaterial.tsx
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

const GradientShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new Color("#ff6b35"),
    uColorB: new Color("#4ecdc4"),
  },
  // Vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    
    void main() {
      float mixValue = sin(vUv.x * 3.14159 + uTime) * 0.5 + 0.5;
      vec3 color = mix(uColorA, uColorB, mixValue);
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ GradientShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientShaderMaterial: any
    }
  }
}

interface GradientMaterialProps {
  colorA?: string
  colorB?: string
  speed?: number
}

export function GradientMaterial({
  colorA = "#ff6b35",
  colorB = "#4ecdc4",
  speed = 1
}: GradientMaterialProps) {
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime * speed
      materialRef.current.uColorA = new Color(colorA)
      materialRef.current.uColorB = new Color(colorB)
    }
  })

  return <gradientShaderMaterial ref={materialRef} />
}