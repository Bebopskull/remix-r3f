// Scene.tsx - Main 3D scene with a rotating cube using a custom stripes material

// Imports
import { Canvas } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { StripesMaterial } from './3D/StripesMaterial'
import { GradientMaterial } from './3D/GreadientMaterial'

// Rotating cube component
function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      // meshRef.current.rotation.y += delta * 0.5 // Uncomment for 2-axis rotation
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {/* <StripesMaterial stripes={15} colorA="#0066ff" colorB="#ffffff" /> */}
      <GradientMaterial colorA="#ff6b35" colorB="#4ecdc4" speed={5.}/>
    </mesh>
  )
}

// Main scene wrapper
export default function Scene() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Basic lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Mouse controls */}
        <OrbitControls />
        {/* 3D content */}
        <RotatingCube />
      </Canvas>
    </div>
  )
}
