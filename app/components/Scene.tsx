// Scene.tsx - Main 3D scene with a rotating cube using a custom stripes material

// Imports
import { Canvas } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { StripesMaterial } from './3D/materials/StripesMaterial'
import { GradientMaterial } from './3D/materials/GradientMaterial'
import {
  InteractiveCube,
  EnhancedShaderCube,
  EnhancedCubeMappedShader,
  CubeMappedShader,
  RotatingCubes,
} from './3D/materials/ShaderMappedCube'

import Logo3D from './home'






// Rotating cube component
function RotatingCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      // meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta * 0.5 // Uncomment for 2-axis rotation
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 5, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <StripesMaterial stripes={15} colorA="#0066ff" colorB="#ffffff" /> */}
      {/* <GradientMaterial /> */}
      {/* <EnhancedShaderCube /> */}
      <CubeMappedShader />
    </mesh>
  )
}

// Main scene wrapper
export default function Scene() {
  return (
    <group>
      <group>

      {/* <Canvas camera={{ position: [0, 15, 15], fov: 30}} shadows> */}
        {/* Lighting for both scenes */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* Basic lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Mouse controls */}
        <OrbitControls target={[0, 3, 0]} 
        enableZoom={false}
        // horizontal rotation
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-  Math.PI / 4}
        // vertical rotation
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        enablePan={false}
        />
        {/* 3D content */}
        {/* <RotatingCube position={[0, 0, 0]} /> */}
        {/* <CornellBoxScene/> */}
        <Logo3D/>
        {/* <BeachScene /> */}
        {/* <MexicanPlazaScene /> */}
        {/* <ChamacoCoreComplexMesh /> */}
        {/* <ChamacoPlazaCartoon /> */}
        {/* <ChamacoCoreRef /> */}
        {/* <ChamacoCoreBeach /> */}
      </group>
    </group>
  )
}
