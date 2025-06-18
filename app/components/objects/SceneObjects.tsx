import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { WoodMaterial } from '../shaders/WoodMaterial'
import { MetalMaterial } from '../shaders/MetalMaterial'
import { WaterMaterial } from '../shaders/WaterMaterial'

// Rotating cube with wood material
function WoodCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[-2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <WoodMaterial 
        woodColor="#8B4513" 
        ringColor="#654321" 
        ringScale={30.0}
        speed={0.5}
      />
    </mesh>
  )
}

// Rotating sphere with metal material
function MetalSphere() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4
      meshRef.current.rotation.z += delta * 0.6
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <MetalMaterial 
        metalColor="#C0C0C0" 
        roughness={0.2}
        scratchIntensity={0.05}
        speed={1.0}
      />
    </mesh>
  )
}

// Animated plane with water material
function WaterPlane() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[2, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <WaterMaterial 
        waterColor="#4A90E2"
        waveSpeed={2.0}
        waveHeight={0.05}
        waveFrequency={15.0}
        transparency={0.7}
      />
    </mesh>
  )
}

// Torus with wood material
function WoodTorus() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.7
    }
  })

  return (
    <mesh ref={meshRef} position={[-2, 2, 0]}>
      <torusGeometry args={[0.5, 0.2, 16, 32]} />
      <WoodMaterial 
        woodColor="#A0522D" 
        ringColor="#8B4513" 
        ringScale={40.0}
        ringWidth={0.15}
        speed={0.8}
      />
    </mesh>
  )
}

// Cylinder with metal material
function MetalCylinder() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 2, 0]}>
      <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
      <MetalMaterial 
        metalColor="#B8860B" 
        roughness={0.1}
        metallic={1.0}
        scratchScale={30.0}
        speed={1.2}
      />
    </mesh>
  )
}

// Octahedron with water material
function WaterOctahedron() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.z += delta * 0.8
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 2, 0]}>
      <octahedronGeometry args={[0.6]} />
      <WaterMaterial 
        waterColor="#20B2AA"
        waveSpeed={3.0}
        waveHeight={0.03}
        waveFrequency={20.0}
        transparency={0.6}
        reflectionStrength={0.7}
      />
    </mesh>
  )
}

// Main SceneObjects component
export function SceneObjects() {
  return (
    <group>
      <WoodCube />
      <MetalSphere />
      <WaterPlane />
      <WoodTorus />
      <MetalCylinder />
      <WaterOctahedron />
    </group>
  )
} 