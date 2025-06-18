import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

// Stripes shader material definition
const StripesShaderMaterial = shaderMaterial(
  {
    uStripes: 10.0,
    uColorA: new Color(0x0066ff), // blue
    uColorB: new Color(0xffffff), // white
  },
  // Vertex shader
  /*glsl*/`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  /*glsl*/`
    uniform float uStripes;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    void main() {
      float stripe = step(0.5, fract(vUv.y * uStripes));
      vec3 color = mix(uColorA, uColorB, stripe);
      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ StripesShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      stripesShaderMaterial: any
    }
  }
}

interface StripesMaterialProps {
  stripes?: number
  colorA?: string
  colorB?: string
}

export function StripesMaterial({
  stripes = 10,
  colorA = '#0066ff',
  colorB = '#ffffff',
}: StripesMaterialProps) {
  const materialRef = useRef<any>(null)

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uStripes = stripes
      materialRef.current.uColorA = new Color(colorA)
      materialRef.current.uColorB = new Color(colorB)
    }
  })

  return <stripesShaderMaterial ref={materialRef} />
} 