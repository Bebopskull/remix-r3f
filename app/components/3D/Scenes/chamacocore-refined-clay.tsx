import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const ChamacoCoreRefinedPlaza = () => {
  // Original sophisticated palette
  const colors = {
    soft_red: '#FF6B6B',
    turquoise: '#4ECDC4',
    sage_green: '#96CEB4',
    soft_yellow: '#FFEAA7',
    plum: '#DDA0DD',
    terracotta: '#D4856A',
    cream: '#FFF5E6',
    deep_blue: '#2C5F7C'
  }

  // Clay material with subtle noise texture
  const createClayMaterial = (color) => {
    return new THREE.MeshToonMaterial({
      color: color,
      roughness: 0.8,
      metalness: 0,
    })
  }

  // Detailed character with clay aesthetic
  const ClayCharacter = ({ position, primaryColor, accentColor }) => {
    const groupRef = useRef()
    const noiseTime = useRef(0)
    
    useFrame((state, delta) => {
      if (groupRef.current) {
        noiseTime.current += delta
        // Subtle breathing animation
        groupRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
        groupRef.current.scale.x = 1 - Math.sin(state.clock.elapsedTime * 2) * 0.01
        groupRef.current.scale.z = 1 - Math.sin(state.clock.elapsedTime * 2) * 0.01
      }
    })

    // Create custom geometry with more detail
    const headGeometry = useMemo(() => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const positions = geometry.attributes.position
      
      // Add subtle clay-like imperfections
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)
        
        const noise = (Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4)) * 0.02
        positions.setXYZ(i, x + noise, y + noise, z + noise)
      }
      
      geometry.computeVertexNormals()
      return geometry
    }, [])

    return (
      <group ref={groupRef} position={position}>
        {/* Detailed head with clay texture */}
        <mesh position={[0, 1.2, 0]} geometry={headGeometry} castShadow>
          <meshToonMaterial color={primaryColor} />
        </mesh>
        
        {/* Body with subtle curves */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <capsuleGeometry args={[0.35, 0.8, 16, 32]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        
        {/* Detailed eyes with depth */}
        <group position={[0.15, 1.25, 0.4]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshToonMaterial color={colors.cream} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshToonMaterial color={colors.deep_blue} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
        <group position={[-0.15, 1.25, 0.4]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshToonMaterial color={colors.cream} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshToonMaterial color={colors.deep_blue} />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="black" />
          </mesh>
        </group>
        
        {/* Sculpted nose */}
        <mesh position={[0, 1.15, 0.48]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        
        {/* Arms with realistic proportions */}
        <mesh position={[0.3, 0.6, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        
        {/* Legs */}
        <mesh position={[0.15, -0.2, 0]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        <mesh position={[-0.15, -0.2, 0]}>
          <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
          <meshToonMaterial color={primaryColor} />
        </mesh>
        
        {/* Traditional Mexican hat */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshToonMaterial color={accentColor} />
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.3, 16]} />
          <meshToonMaterial color={accentColor} />
        </mesh>
      </group>
    )
  }

  // Detailed cactus with organic shape
  const OrganicCactus = ({ position, scale = 1 }) => {
    const cactusRef = useRef()
    
    const cactusGeometry = useMemo(() => {
      const geometry = new THREE.CylinderGeometry(0.4, 0.5, 2, 12, 8)
      const positions = geometry.attributes.position
      
      // Create organic bulges
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i)
        const angle = Math.atan2(positions.getZ(i), positions.getX(i))
        
        const bulge = Math.sin(y * 2) * 0.1 + Math.sin(angle * 6) * 0.05
        const x = positions.getX(i) * (1 + bulge)
        const z = positions.getZ(i) * (1 + bulge)
        
        positions.setXYZ(i, x, y, z)
      }
      
      geometry.computeVertexNormals()
      return geometry
    }, [])
    
    useFrame((state) => {
      if (cactusRef.current) {
        cactusRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      }
    })

    return (
      <group ref={cactusRef} position={position} scale={scale}>
        {/* Main trunk with organic shape */}
        <mesh geometry={cactusGeometry} castShadow>
          <meshToonMaterial color={colors.sage_green} />
        </mesh>
        
        {/* Detailed arms */}
        <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
          <meshToonMaterial color={colors.sage_green} />
        </mesh>
        <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
          <meshToonMaterial color={colors.sage_green} />
        </mesh>
        
        {/* Cactus flower with petals */}
        <group position={[0, 1.1, 0]}>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} rotation={[0, (i * Math.PI) / 4, 0]} position={[0.15, 0, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color={colors.soft_red} />
            </mesh>
          ))}
          <mesh>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshToonMaterial color={colors.soft_yellow} />
          </mesh>
        </group>
        
        {/* Subtle spines */}
        {[...Array(20)].map((_, i) => {
          const y = -0.8 + (i % 5) * 0.4
          const angle = (i / 20) * Math.PI * 2
          return (
            <mesh 
              key={i} 
              position={[Math.cos(angle) * 0.5, y, Math.sin(angle) * 0.5]}
              rotation={[0, angle, 0]}
            >
              <coneGeometry args={[0.02, 0.1, 4]} />
              <meshToonMaterial color={colors.terracotta} />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Architectural building with clay details
  const ClayBuilding = ({ position, color, width = 3, height = 3, depth = 3 }) => {
    const buildingRef = useRef()
    
    const wallGeometry = useMemo(() => {
      const geometry = new THREE.BoxGeometry(width, height, depth, 10, 10, 10)
      const positions = geometry.attributes.position
      
      // Add subtle clay-like surface variation
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)
        
        const noise = Math.sin(x * 2) * Math.cos(y * 2) * 0.03
        positions.setXYZ(i, x + noise, y, z + noise)
      }
      
      geometry.computeVertexNormals()
      return geometry
    }, [width, height, depth])

    return (
      <group ref={buildingRef} position={position}>
        {/* Main structure with texture */}
        <mesh geometry={wallGeometry} castShadow receiveShadow>
          <meshToonMaterial color={color} />
        </mesh>
        
        {/* Detailed tile roof */}
        <group position={[0, height/2 + 0.3, 0]}>
          {[...Array(5)].map((_, i) => (
            <mesh key={i} position={[0, i * 0.1, 0]}>
              <cylinderGeometry args={[width * 0.8 - i * 0.1, width * 0.8 - i * 0.1, 0.1, 8]} />
              <meshToonMaterial color={colors.terracotta} />
            </mesh>
          ))}
        </group>
        
        {/* Arched doorway */}
        <group position={[width/2 + 0.01, -height/2 + 1, 0]}>
          <mesh>
            <boxGeometry args={[0.1, 1.5, 0.8]} />
            <meshToonMaterial color={colors.deep_blue} />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 16, 1, false, 0, Math.PI]} />
            <meshToonMaterial color={colors.deep_blue} />
          </mesh>
        </group>
        
        {/* Window details */}
        {[...Array(2)].map((_, i) => (
          <group key={i} position={[width/2 + 0.01, height/4 - i * 1.2, 0]}>
            <mesh>
              <boxGeometry args={[0.1, 0.6, 0.6]} />
              <meshToonMaterial color={colors.deep_blue} />
            </mesh>
            {/* Window frame */}
            <mesh position={[0.02, 0, 0]}>
              <boxGeometry args={[0.05, 0.65, 0.65]} />
              <meshToonMaterial color={colors.cream} />
            </mesh>
          </group>
        ))}
      </group>
    )
  }

  // Detailed fountain with water animation
  const DetailedFountain = () => {
    const waterRef = useRef()
    
    useFrame((state) => {
      if (waterRef.current) {
        waterRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      }
    })

    return (
      <group position={[0, -1.5, 0]}>
        {/* Multi-tiered base */}
        <mesh castShadow>
          <cylinderGeometry args={[2.5, 3, 0.3, 32]} />
          <meshToonMaterial color={colors.terracotta} />
        </mesh>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[2, 2.3, 0.3, 24]} />
          <meshToonMaterial color={colors.terracotta} />
        </mesh>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.8, 0.3, 20]} />
          <meshToonMaterial color={colors.terracotta} />
        </mesh>
        
        {/* Central column */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 1.2, 12]} />
          <meshToonMaterial color={colors.cream} />
        </mesh>
        
        {/* Water effect */}
        <mesh ref={waterRef} position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.1, 1.5, 0.8, 16, 1, true]} />
          <meshToonMaterial color={colors.turquoise} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )
  }

  // Elegant papel picado
  const ElegantPapelPicado = () => {
    const papelRef = useRef()
    
    useFrame((state) => {
      if (papelRef.current) {
        papelRef.current.children.forEach((flag, i) => {
          flag.rotation.z = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.05
          flag.position.y = 4 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.05
        })
      }
    })

    return (
      <group ref={papelRef}>
        {[...Array(6)].map((_, i) => (
          <group key={i} position={[-5 + i * 2, 4, 0]}>
            <mesh castShadow>
              <planeGeometry args={[1.5, 1.2, 10, 10]} />
              <meshToonMaterial 
                color={Object.values(colors)[i % 5]} 
                side={THREE.DoubleSide}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Cut-out pattern */}
            {[...Array(4)].map((_, j) => (
              <mesh key={j} position={[0, -0.3 + j * 0.2, 0.01]}>
                <circleGeometry args={[0.08, 16]} />
                <meshBasicMaterial color="black" opacity={0} transparent />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    )
  }

  return (
    <group>
      {/* Textured ground with subtle patterns */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20, 50, 50]} />
        <meshToonMaterial color={colors.cream} />
      </mesh>
      
      {/* Decorative tile patterns */}
      {[...Array(7)].map((_, i) => 
        [...Array(7)].map((_, j) => (
          <mesh 
            key={`${i}-${j}`} 
            position={[-6 + i * 2, -1.98, -6 + j * 2]} 
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <ringGeometry args={[0.8, 0.9, 8]} />
            <meshToonMaterial color={colors.turquoise} />
          </mesh>
        ))
      )}

      {/* Clay buildings with varied architecture */}
      <ClayBuilding position={[-6, 0, -6]} color={colors.soft_yellow} height={3.5} />
      <ClayBuilding position={[6, 0, -6]} color={colors.plum} width={3.5} height={3} />
      <ClayBuilding position={[-6, 0, 6]} color={colors.soft_red} depth={3.5} />
      <ClayBuilding position={[6, 0, 6]} color={colors.turquoise} height={4} />

      {/* Central fountain */}
      <DetailedFountain />

      {/* Clay characters with personality */}
      <ClayCharacter position={[-3, -0.5, 2]} primaryColor={colors.soft_red} accentColor={colors.terracotta} />
      <ClayCharacter position={[3, -0.5, 2]} primaryColor={colors.turquoise} accentColor={colors.deep_blue} />
      <ClayCharacter position={[0, -0.5, 4]} primaryColor={colors.plum} accentColor={colors.soft_yellow} />

      {/* Organic cacti */}
      <OrganicCactus position={[-4, -0.5, -2]} scale={1.2} />
      <OrganicCactus position={[4, -0.5, -2]} scale={0.9} />
      <OrganicCactus position={[-2, -0.5, -4]} scale={1.1} />

      {/* Elegant papel picado */}
      <ElegantPapelPicado />

      {/* Subtle ambient elements */}
      <mesh position={[7, 6, -7]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshToonMaterial color={colors.soft_yellow} emissive={colors.soft_yellow} emissiveIntensity={0.3} />
      </mesh>

      {/* Decorative pottery */}
      <mesh position={[-3, -1.5, -3]} castShadow>
        <latheGeometry args={[
          [new THREE.Vector2(0.3, 0), new THREE.Vector2(0.5, 0.2), new THREE.Vector2(0.4, 0.6), new THREE.Vector2(0.2, 0.8)],
          32
        ]} />
        <meshToonMaterial color={colors.terracotta} />
      </mesh>
      <mesh position={[3, -1.5, -3]} castShadow>
        <latheGeometry args={[
          [new THREE.Vector2(0.2, 0), new THREE.Vector2(0.4, 0.3), new THREE.Vector2(0.3, 0.7), new THREE.Vector2(0.15, 0.9)],
          32
        ]} />
        <meshToonMaterial color={colors.deep_blue} />
      </mesh>
    </group>
  )
}

export default ChamacoCoreRefinedPlaza