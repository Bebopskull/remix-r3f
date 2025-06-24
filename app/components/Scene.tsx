// Scene.tsx - Main 3D scene with a rotating cube using a custom stripes material

// Imports
import { Canvas } from '@react-three/fiber'
import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import CornellBoxGallery from './3D/Scenes/cornell-box-gallery'
import Logo from './home'


// Main scene wrapper
export default function CornellBoxSimulation({children}: {children: React.ReactNode}) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 9] }}>

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
     
        <CornellBoxGallery/>
        <Logo/>
      
      </Canvas>
    </div>
  )
}
