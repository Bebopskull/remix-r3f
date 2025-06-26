import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
  useLoader
} from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  useTexture,
  Environment
} from '@react-three/drei';
import {
  ModelLoader,
  GLTFModel,
  AutoScaledGLTFScene,
  CompositeGLTFScene,
  GLTFSceneWithLoader,
  LoadingScreen
} from './3D/Utilities/GLTFLoaders';

import * as THREE from 'three';

// Component to handle the animated model
function AnimatedModel() {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.05; // Rotate around Y axis
      // You can add more animations here:
      // modelRef.current.rotation.x += delta * 0.2; // Rotate around X axis
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05; // Bobbing motion
    }
  });

  return (
    <group ref={modelRef}>
      <GLTFModel 
        modelScale={0.4} 
        modelPath='/media/3dAssets/LOGO_NIKAI3D/GLFT/LOGO_NIKAI.gltf'
        position={[0, 0, 0]} // Position the model
        rotation={[0, 0, 0]} // Initial rotation
      />
    </group>
  );
}

export default function Logo3D() {
  return (
    <group position={[0, 2.2, 0]}>
        <AnimatedModel />
    </group>
  );
}


