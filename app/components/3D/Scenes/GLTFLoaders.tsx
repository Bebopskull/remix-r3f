import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, PresentationControls, Stage, Environment, ContactShadows } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

//basic modelloader:
export function ModelLoader({ modelPath = '/models/your-model.gltf' } ) {
  const { scene } = useGLTF(modelPath)
  return (
    <primitive
      object={scene}
      position={[2, 0, 0]}  // Position it in your scene
      scale={0.5}           // Adjust size as needed
    />
  )
}

// Basic GLTF loader component
export const GLTFModel = ({ 
  modelPath = '/models/your-model.gltf', 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  contactShadows = true
}) => {
  const group = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, group)
  
  // Play first animation if exists
  useEffect(() => {
    const firstAction = Object.values(actions)[0]
    if (firstAction) {
      firstAction.play()
    }
  }, [actions])
  
  // Apply shadows to all meshes in the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
        
        // Optional: Apply ChamacoCore style to materials
        if (child.material) {
          child.material.roughness = 0.7
          child.material.metalness = 0
        }
      }
    })
  }, [scene, castShadow, receiveShadow])
  
  return (
    <primitive 
      ref={group}
      object={scene} 
      position={position} 
      rotation={rotation} 
      scale={scale}
    />
  )
}

// Scene with automatic centering and scaling
export const AutoScaledGLTFScene = ({ modelPath = '/models/your-model.gltf' }) => {
  const modelRef = useRef()
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (scene) {
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      // Center the model
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z

      // Scale to fit
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 5 / maxDim // Adjust 5 to your preferred size
      scene.scale.setScalar(scale)

      // Apply shadows
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return (
    <>
      {/* Use Stage for automatic lighting and centering */}
      <Stage
        contactShadows={contactShadows}
        shadows
        adjustCamera
        intensity={0.5}
        environment="sunset"
        preset="rembrandt"
      >
        <primitive ref={modelRef} object={scene} />
      </Stage>
    </>
  )
}

// Example with multiple GLTF models composed into a scene
export const CompositeGLTFScene = () => {
  return (
    <>
      <ChamacoCoreGLTFScene modelPath="/models/main-model.gltf" />

      {/* Add additional models */}
      <GLTFModel
        url="/models/prop1.gltf"
        position={[5, 0, 0]}
        scale={0.5}
      />

      <GLTFModel
        url="/models/prop2.gltf"
        position={[-5, 0, 0]}
        scale={0.7}
        rotation={[0, Math.PI / 4, 0]}
      />

      {/* Add ChamacoCore elements */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.7} />
        </mesh>
      </Float>
    </>
  )
}

// Main component with loading state
export const GLTFSceneWithLoader = ({ modelPath = '/models/your-model.gltf' }) => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ChamacoCoreGLTFScene modelPath={modelPath} />
    </React.Suspense>
  )
}

// Simple loading screen
export const LoadingScreen = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#4ECDC4" wireframe />
    </mesh>
  )
}

export { ModelLoader, GLTFModel, AutoScaledGLTFScene, CompositeGLTFScene, GLTFSceneWithLoader, LoadingScreen } 