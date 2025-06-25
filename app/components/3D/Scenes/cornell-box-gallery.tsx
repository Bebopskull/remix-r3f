import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, 
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
import { ModelLoader,
  SceneLoader,
  GLTFModel, 
  AutoScaledGLTFScene, 
  CompositeGLTFScene, 
  GLTFSceneWithLoader, 
  LoadingScreen 
} from '../Utilities/GLTFLoaders';

import * as THREE from 'three';

// Cornell Box Container //carga el cornellBoxTest_fromFBXtoGLTF.gltf
const CornellBox = () => {
  return (
    <group>
      {/* <ModelLoader modelPath="./public/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf" /> */}
      <GLTFModel modelPath="./public/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf" modelScale={0.1}/>
      {/* <GLTFModel modelPath='./public/models/GLTF_normals/cornellBox_FBXtoGLTF_normal.gltf' modelScale={0.1}/> */}
    </group>
  )
}

// Gallery Lighting System
const GalleryLighting = () => {
  return (
    <group>
      {/* Main area light from above */}
      <rectAreaLight
        position={[0, 9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={1.2*10}
        height={1.2*10}
        intensity={3.5}
        color="#FFFAF0" // Warm white
      />
      
      {/* Fill lights for even illumination */}
      <pointLight 
        position={[-2*10, 1*10, 0]} 
        intensity={0.4} 
        color="#FFFFF0"
        castShadow={false}
      />
      <pointLight 
        position={[2*10, 1*10, 0]} 
        intensity={0.4} 
        color="#FFFFF0"
        castShadow={false}
      />
      <pointLight 
        position={[0, 1*10, -2*10]} 
        intensity={0.3} 
        color="#F0F8FF"
        castShadow={false}
      />
      
      {/* Ambient light for overall fill */}
      <ambientLight intensity={0.2} color="#F8F8FF" />
    </group>
  );
};


// Main Gallery Component
const CornellBoxGallery = ({ projectIndex = 0, onProjectChange }: { projectIndex?: number, onProjectChange?: (idx: number) => void }) => {
  // Remove useState for currentProject, expect it as a prop for controlled usage
  // Remove outer <div> and <Canvas>, return a <group> instead
  return (
    <group>
      {/* CameraController is not needed, camera is controlled by parent Canvas */}
      {/* Cornell Box Structure */}
      <CornellBox />
      {/* Central Morphing Object */}
      {/* <CentralObject projectIndex={projectIndex} /> */}
      {/* Gallery Lighting */}
      <GalleryLighting />
      {/* Interaction System - only if onProjectChange is provided */}
      {/* {onProjectChange && <InteractionHandler onProjectChange={onProjectChange} />} */}
      {/* Camera Controls are handled by parent Canvas */}
      {/* UI Instructions: To add overlay UI, use <Html> from drei or handle in parent */}
    </group>
  );
};

export default CornellBoxGallery;