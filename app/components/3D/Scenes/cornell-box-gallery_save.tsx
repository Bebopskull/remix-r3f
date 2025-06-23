import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Text,
  useTexture,
  Environment
} from '@react-three/drei';
import { ModelLoader, 
  GLTFModel, 
  AutoScaledGLTFScene, 
  CompositeGLTFScene, 
  GLTFSceneWithLoader, 
  LoadingScreen 
} from '../Utilities/GLTFLoaders';
import * as THREE from 'three';

// Cornell Box Container
const CornellBox = () => {
  const boxRef = useRef();
  
  // Create box geometry with interior walls
  const geometry = useMemo(() => {
    const group = new THREE.Group();
    
    // Box dimensions
    const width = 30.0;
    const height = 18.0; 
    const depth = 28.0;
    const thickness = 0.5;
    const cornerRadius = 0.5;
    
    // Create walls as separate planes for better material control
    const wallGeometry = new THREE.PlaneGeometry(width, height);
    const floorGeometry = new THREE.PlaneGeometry(width, depth);
    const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
    
    // Wall materials - subtle variations
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: '#F8F8F2',
      roughness: 0.85,
      metalness: 0.0,
    });
    
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#FAFAFA',
      roughness: 0.7,
      metalness: 0.0,
    });
    
    // Back wall
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 0, -depth/2);
    group.add(backWall);
    
    // Left wall  
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-width/2, 0, 0);
    group.add(leftWall);
    
    // Right wall
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(width/2, 0, 0);
    group.add(rightWall);
    
    // Floor
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -height/2, 0);
    floor.receiveShadow = true;
    group.add(floor);
    
    // Ceiling
    const ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, height/2, 0);
    group.add(ceiling);
    
    return group;
  }, []);
  
  return <primitive object={geometry} ref={boxRef} />;
};

// Central Morphing Object
const CentralObject = ({ projectIndex = 0 }) => {
  const meshRef = useRef();
  const [currentProject] = useState(projectIndex);
  
  // Project shapes - each represents a different portfolio piece
  const projectShapes = [
    'sphere',      // Default/Intro
    'torus',       // Web Projects  
    'octahedron',  // 3D Work
    'cylinder',    // Design Work
    'dodecahedron' // Interactive Projects
  ];
  
  const currentShape = projectShapes[currentProject % projectShapes.length];
  
  // Create geometry based on current project
  const geometry = useMemo(() => {
    switch(currentShape) {
      case 'sphere':
        return new THREE.SphereGeometry(0.4*10, 32, 32);
      case 'torus':
        return new THREE.TorusGeometry(0.3*10, 0.15*10, 16, 32);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.4*10, 2);
      case 'cylinder':
        return new THREE.CylinderGeometry(0.3*10, 0.3*10, 0.6*10, 16);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(0.35*10, 0);
      default:
        return new THREE.SphereGeometry(0.4*10, 32, 32);
    }
  }, [currentShape]);
  
  // Ceramic-like material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#E8E8E8',
      roughness: 0.6,
      metalness: 0.0,
      transparent: true,
      opacity: 0.95,
    });
  }, []);
  
  // Breathing animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Breathing scale animation
      const breathingScale = 1 + Math.sin(time * (Math.PI / 3)) * 0.04; // 6 second cycle
      meshRef.current.scale.setScalar(breathingScale);
      
      // Gentle floating
      meshRef.current.position.y = 0.3 + Math.sin(time * (Math.PI / 4)) * 0.03;
      
      // Very slow rotation
      meshRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={material}
      position={[0, 0.3, 0]}
      castShadow
      receiveShadow
    />
  );
};

// Gallery Lighting System
const GalleryLighting = () => {
  return (
    <>
      {/* Main area light from above */}
      <rectAreaLight
        position={[0, 2.2*10, 0]}
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
    </>
  );
};

// Project Information Display
const ProjectInfo = ({ visible, projectIndex = 0 }) => {
  const projects = [
    { title: "Portfolio Introduction", description: "Welcome to the gallery" },
    { title: "Web Development", description: "Interactive web experiences" },
    { title: "3D Visualization", description: "Three-dimensional artworks" },
    { title: "Design Systems", description: "Visual identity projects" },
    { title: "Interactive Media", description: "Experimental interfaces" }
  ];
  
  const currentProject = projects[projectIndex % projects.length];
  
  if (!visible) return null;
  
  return (
    <group position={[0, -1, 1]}>
      <Text
        fontSize={0.12}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
      >
        {currentProject.title}
      </Text>
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.08}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Light.woff"
      >
        {currentProject.description}
      </Text>
    </group>
  );
};

// Interaction Handler
const InteractionHandler = ({ onProjectChange }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch(event.key) {
        case ' ': // Space to toggle info
          setShowInfo(!showInfo);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          const nextProject = (currentProject + 1) % 5;
          setCurrentProject(nextProject);
          onProjectChange(nextProject);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          const prevProject = (currentProject - 1 + 5) % 5;
          setCurrentProject(prevProject);
          onProjectChange(prevProject);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showInfo, currentProject, onProjectChange]);
  
  return <ProjectInfo visible={showInfo} projectIndex={currentProject} />;
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
      <CentralObject projectIndex={projectIndex} />
      {/* Gallery Lighting */}
      <GalleryLighting />
      {/* Interaction System - only if onProjectChange is provided */}
      {onProjectChange && <InteractionHandler onProjectChange={onProjectChange} />}
      {/* Camera Controls are handled by parent Canvas */}
      {/* UI Instructions: To add overlay UI, use <Html> from drei or handle in parent */}
    </group>
  );
};

export default CornellBoxGallery;