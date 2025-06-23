import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations, PresentationControls, Stage, Environment, ContactShadows } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Helper to recursively find the first mesh in an Object3D hierarchy
function findFirstMesh(object: THREE.Object3D): THREE.Mesh | null {
  if (object instanceof THREE.Mesh) return object;
  for (const child of object.children) {
    const mesh = findFirstMesh(child);
    if (mesh) return mesh;
  }
  return null;
}

function ModelLoader({ modelPath, ...props }: { modelPath: string, props: any }) {
  const gltf = useLoader(GLTFLoader, modelPath);

  // Traverse all meshes and smooth their geometry
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.geometry) {
      // If geometry is not a BufferGeometry, convert it
      if (!child.geometry.isBufferGeometry && (child.geometry as any).toBufferGeometry) {
        child.geometry = (child.geometry as any).toBufferGeometry();
      }
      child.geometry.computeVertexNormals();
      if (child.material) {
        (child.material as any).flatShading = false; // Ensure smooth shading
        (child.material as any).needsUpdate = true;
      }
    }
  });

  return <primitive object={gltf.scene} {...props} />;
}

function SceneLoader({ scenePath, ...props }: { scenePath: string, props: any }) {
  const gltf = useLoader(GLTFLoader, scenePath);

  // Traverse all meshes and smooth their geometry
  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.geometry) {
      // If geometry is not a BufferGeometry, convert it
      if (!child.geometry.isBufferGeometry && (child.geometry as any).toBufferGeometry) {
        child.geometry = (child.geometry as any).toBufferGeometry();
      }
      child.geometry.computeVertexNormals();
      if (child.material) {
        (child.material as any).flatShading = false; // Ensure smooth shading
        (child.material as any).needsUpdate = true;
      }
    }
  });

  return <primitive object={gltf.scene} {...props} />;
}
/* function ModelLoader({ modelPath = '/models/your-model.gltf' } ) {
  const { scene } = useGLTF(modelPath)
  return (
    <primitive
      object={scene}
      position={[2, 0, 0]}  // Position it in your scene
      scale={0.5}           // Adjust size as needed
    />
  )
} */

// Basic GLTF loader component
const GLTFModel = ({ 
  modelPath = '', 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  modelScale = 1,
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
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
        
        // Optional: Apply ChamacoCore style to materials
        if (child.material) {
          (child.material as any).roughness = 0.7;
          (child.material as any).metalness = 0;
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
      scale={modelScale}
    />
  )
}

// Scene with automatic centering and scaling
const AutoScaledGLTFScene = ({ modelPath = '/models/your-model.gltf' }) => {
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
      if (maxDim > 0 && scene.scale && typeof scene.scale.setScalar === 'function') {
        const fitScaleValue = 1 / maxDim; // Adjust 5 to your preferred size
        (scene.scale as THREE.Vector3).setScalar(fitScaleValue);
      }

      // Apply shadows
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
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
const CompositeGLTFScene = () => {
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
const GLTFSceneWithLoader = ({ modelPath = '/models/your-model.gltf' }) => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ChamacoCoreGLTFScene modelPath={modelPath} />
    </React.Suspense>
  )
}

// Simple loading screen
const LoadingScreen = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#4ECDC4" wireframe />
    </mesh>
  )
}

export { ModelLoader, GLTFModel, AutoScaledGLTFScene, CompositeGLTFScene, GLTFSceneWithLoader, LoadingScreen } 