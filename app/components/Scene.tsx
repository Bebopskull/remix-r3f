import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

// Simple rotating cube component
function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  // This runs on every frame (60fps)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      {/* Geometry defines the shape */}
      <boxGeometry args={[1, 1, 1]} />
      {/* Material defines how it looks */}
      <meshStandardMaterial color="orange" />
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

        {/* Our 3D content */}
        <RotatingCube />
      </Canvas>
    </div>
  )
}
