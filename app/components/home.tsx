// import React, { useRef, useMemo, useState, useEffect } from 'react';
// import {
//   Canvas,
//   useFrame,
//   useThree,
//   useLoader
// } from '@react-three/fiber';
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   Text,
//   useTexture,
//   Environment, 
//   useGLTF
// } from '@react-three/drei';
// import {
//   ModelLoader,
//   GLTFModel,
//   AutoScaledGLTFScene,
//   CompositeGLTFScene,
//   GLTFSceneWithLoader,
//   LoadingScreen
// } from './3D/Utilities/GLTFLoaders';

// import * as THREE from 'three';

// export function TestLogo3D() {
//   const meshRef = useRef();

//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta * 0.5;
//     }
//   });

//   return (
//     <group position={[0, 2.2, 0]}>
//       <mesh ref={meshRef}>
//         <boxGeometry args={[2, 2, 2]} />
//         <meshStandardMaterial color="orange" />
//       </mesh>
//     </group>
//   );
// }

// // Component to handle the animated model
// function AnimatedModel() {
//   const modelRef = useRef<THREE.Group>(null);
  

//   const modelPath = 'public/media/3dAssets/LOGO_NIKAI3D/GLTF/LOGO_NIKAI.gltf';

//   useEffect(() => {
//     console.log('Logo component mounted', modelPath);
//   }, []);

//   useFrame((state, delta) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += delta * 0.05; // Rotate around Y axis
//       // You can add more animations here:
//       // modelRef.current.rotation.x += delta * 0.2; // Rotate around X axis
//       modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05; // Bobbing motion
//     }
//   });

//   return (
//     <group ref={modelRef}>
//       <GLTFModel 
//         modelScale={0.4} 
//         modelPath={modelPath}
//         position={[0, 0, 0]} // Position the model
//         rotation={[0, 0, 0]} // Initial rotation
//       />

      
//     </group>
//   );
// }

// export default function Logo3D() {
//   return (
//     <group position={[0, 2.2, 0]}>
//         <AnimatedModel />
//     </group>
//   );
// }

import { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedModel() {
  const modelRef = useRef<THREE.Group>(null);

  console.log("Loading NIKAI logo...");
  const { scene } = useGLTF('/media/3dAssets/LOGO_NIKAI3D/GLFT/LOGO_NIKAI.gltf');

  useEffect(() => {
    console.log("✅ NIKAI logo loaded successfully!");
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.05;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={0.4} />
    </group>
  );
}

export default function Home() {
  return (
    <group position={[0, 0, 0]}>
      {/* Debug marker */}
      

      <Suspense fallback={
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      }>
        <AnimatedModel />
      </Suspense>
    </group>
  );
}
