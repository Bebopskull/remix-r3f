import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { Group } from 'three'

const ChamacoCoreCartoonPlaza = () => {
  // Ultra vibrant cartoon palette
  const colors = {
    hot_pink: '#FF1493',
    electric_blue: '#00BFFF',
    lime_green: '#32CD32',
    sunshine_yellow: '#FFD700',
    purple_pop: '#9370DB',
    coral_blast: '#FF6347',
    mint_fresh: '#00FA9A',
    orange_zest: '#FF8C00'
  }

  // Bouncy animated character component
  const BouncyCharacter = ({ position, color, delay = 0 }) => {
    const groupRef = useRef()
    const [hovered, setHovered] = useState(false)
    
    useFrame((state) => {
      if (groupRef.current) {
        // Constant bouncy idle animation
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.15
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1
        
        // Extra bounce on hover
        if (hovered) {
          groupRef.current.scale.x = groupRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1
        }
      }
    })

    return (
      <group 
        ref={groupRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Super oversized head */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshToonMaterial color={color} />
        </mesh>
        
        {/* Tiny body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.8, 8]} />
          <meshToonMaterial color={color} />
        </mesh>
        
        {/* Cartoon eyes - huge! */}
        <mesh position={[0.25, 0.9, 0.6]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-0.25, 0.9, 0.6]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
        
        {/* Pupils that follow cursor */}
        <mesh position={[0.25, 0.9, 0.72]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.25, 0.9, 0.72]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="black" />
        </mesh>
        
        {/* Giant smile */}
        <mesh position={[0, 0.7, 0.65]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.25, 0.05, 8, 16, Math.PI]} />
          <meshBasicMaterial color="#FF1493" />
        </mesh>
        
        {/* Comically small arms */}
        <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
          <meshToonMaterial color={color} />
        </mesh>
        <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 6]} />
          <meshToonMaterial color={color} />
        </mesh>
      </group>
    )
  }

  // Wobbly cactus component
  const WobblyCactus = ({ position, scale = 1 }) => {
    const cactusRef = useRef()
    
    useFrame((state) => {
      if (cactusRef.current) {
        cactusRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
        cactusRef.current.scale.y = scale + Math.sin(state.clock.elapsedTime * 3) * 0.05
      }
    })

    return (
      <group ref={cactusRef} position={position} scale={scale}>
        {/* Main body - bulbous! */}
        <mesh castShadow>
          <sphereGeometry args={[0.8, 8, 6]} />
          <meshToonMaterial color={colors.lime_green} />
        </mesh>
        
        {/* Cartoon arms */}
        <mesh position={[0.6, 0.3, 0]} rotation={[0, 0, -0.7]}>
          <sphereGeometry args={[0.4, 6, 6]} />
          <meshToonMaterial color={colors.lime_green} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0]} rotation={[0, 0, 0.7]}>
          <sphereGeometry args={[0.4, 6, 6]} />
          <meshToonMaterial color={colors.lime_green} />
        </mesh>
        
        {/* Cute flower on top */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshToonMaterial color={colors.hot_pink} />
        </mesh>
        
        {/* Happy face */}
        <mesh position={[0.15, 0.1, 0.7]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[-0.15, 0.1, 0.7]}>
          <sphereGeometry args={[0.1, 6, 6]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh position={[0, -0.1, 0.75]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.15, 0.03, 6, 8, Math.PI]} />
          <meshBasicMaterial color="black" />
        </mesh>
      </group>
    )
  }

  // Dancing papel picado
  const DancingPapelPicado = () => {
    const papelRef = useRef()
    
    useFrame((state) => {
      if (papelRef.current) {
        papelRef.current.children.forEach((flag, i) => {
          flag.rotation.z = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2
          flag.position.y = 4 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.2
        })
      }
    })

    return (
      <group ref={papelRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[-6 + i * 2, 4, 0]} castShadow>
            <planeGeometry args={[1.5, 1, 1, 1]} />
            <meshToonMaterial 
              color={Object.values(colors)[i % Object.values(colors).length]} 
              side={THREE.DoubleSide}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>
    )
  }

  // Bouncy colorful building
  const CartoonBuilding = ({ position, color, height = 3 }) => {
    const buildingRef = useRef()
    
    useFrame((state) => {
      if (buildingRef.current) {
        buildingRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02
      }
    })

    return (
      <group ref={buildingRef} position={position}>
        {/* Chunky base */}
        <mesh castShadow>
          <boxGeometry args={[3, height, 3]} />
          <meshToonMaterial color={color} />
        </mesh>
        
        {/* Wobbly roof */}
        <mesh position={[0, height/2 + 0.5, 0]} castShadow>
          <coneGeometry args={[2.2, 1.5, 4]} />
          <meshToonMaterial color={colors.coral_blast} />
        </mesh>
        
        {/* Cartoon windows */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[1.51, height/2 - 1 - i * 0.8, 0]}>
            <boxGeometry args={[0.1, 0.5, 0.5]} />
            <meshToonMaterial color={colors.electric_blue} />
          </mesh>
        ))}
        
        {/* Big cartoon door */}
        <mesh position={[1.51, -height/2 + 0.8, 0]}>
          <boxGeometry args={[0.1, 1.5, 1]} />
          <meshToonMaterial color={colors.purple_pop} />
        </mesh>
      </group>
    )
  }

  // Spinning fountain with bouncing water
  const CartoonFountain = () => {
    const fountainRef = useRef()
    const waterRef = useRef()
    
    useFrame((state) => {
      if (fountainRef.current) {
        fountainRef.current.rotation.y += 0.01
      }
      if (waterRef.current) {
        waterRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.3
        waterRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 5) * 0.2
      }
    })

    return (
      <group position={[0, 0, 0]}>
        {/* Base - extra chunky */}
        <mesh ref={fountainRef} castShadow>
          <cylinderGeometry args={[2.5, 3, 0.8, 8]} />
          <meshToonMaterial color={colors.orange_zest} />
        </mesh>
        
        {/* Cartoon water spout */}
        <mesh ref={waterRef} position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 1, 2, 6]} />
          <meshToonMaterial color={colors.electric_blue} transparent opacity={0.7} />
        </mesh>
        
        {/* Water droplets */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 3) * 1.5,
            0.3,
            Math.sin(i * Math.PI / 3) * 1.5
          ]}>
            <sphereGeometry args={[0.2, 6, 6]} />
            <meshToonMaterial color={colors.electric_blue} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    )
  }

  /* // Musical notes floating around
  const FloatingMusicNotes = () => {
    const notesRef = useRef<Group>(null)
    
    useFrame((state) => {
      if (notesRef.current) {
        notesRef.current.children.forEach((note, i) => {
          note.position.y = 3 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
          note.position.x = Math.sin(state.clock.elapsedTime + i * 2) * 5
          note.rotation.z = Math.sin(state.clock.elapsedTime * 3 + i) * 0.3
        })
      }
    })

    return (
      <group ref={notesRef}>
        {[...Array(5)].map((_, i) => (
          <Text
            key={i}
            position={[0, 3, -2]}
            fontSize={0.8}
            color={Object.values(colors)[i % Object.values(colors).length]}
            anchorX="center"
            anchorY="middle"
          >
            ♪
          </Text>
        ))}
      </group>
    )
  } */

  return (
    <group>
      {/* Checkered ground - super bright! */}
      {[...Array(10)].map((_, i) => 
        [...Array(10)].map((_, j) => (
          <mesh 
            key={`${i}-${j}`} 
            position={[-9 + i * 2, -2, -9 + j * 2]} 
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[2, 2]} />
            <meshToonMaterial 
              color={(i + j) % 2 === 0 ? colors.hot_pink : colors.sunshine_yellow} 
            />
          </mesh>
        ))
      )}

      {/* Cartoon buildings */}
      <CartoonBuilding position={[-6, 0, -6]} color={colors.purple_pop} height={4} />
      <CartoonBuilding position={[6, 0, -6]} color={colors.mint_fresh} height={3.5} />
      <CartoonBuilding position={[-6, 0, 6]} color={colors.electric_blue} height={3} />
      <CartoonBuilding position={[6, 0, 6]} color={colors.orange_zest} height={4.5} />

      {/* Central fountain */}
      <CartoonFountain />

      {/* Bouncy characters everywhere! */}
      <BouncyCharacter position={[-3, -1.2, 2]} color={colors.coral_blast} delay={0} />
      <BouncyCharacter position={[3, -1.2, 2]} color={colors.lime_green} delay={1} />
      <BouncyCharacter position={[0, -1.2, 4]} color={colors.purple_pop} delay={2} />
      <BouncyCharacter position={[-2, -1.2, -3]} color={colors.electric_blue} delay={3} />
      <BouncyCharacter position={[2, -1.2, -3]} color={colors.hot_pink} delay={4} />

      {/* Happy cacti */}
      <WobblyCactus position={[-5, -1, 0]} scale={1.2} />
      <WobblyCactus position={[5, -1, 0]} scale={0.8} />
      <WobblyCactus position={[0, -1, -5]} scale={1} />

      {/* Dancing papel picado */}
      <DancingPapelPicado />

      {/* Floating music notes */}
      {/* <FloatingMusicNotes /> */}

      {/* Giant "FIESTA!" text */}
      {/* <Text
        position={[0, 6, -8]}
        fontSize={2}
        color={colors.hot_pink}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor={colors.purple_pop}
      >
        ¡FIESTA!
      </Text> */}

      {/* Cartoon sun */}
      <mesh position={[8, 8, -8]}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshToonMaterial color={colors.sunshine_yellow} emissive={colors.orange_zest} emissiveIntensity={0.5} />
      </mesh>

      {/* Decorative piñatas */}
      <mesh position={[-4, 5, 2]} rotation={[0.3, 0.5, 0.2]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshToonMaterial color={colors.hot_pink} />
      </mesh>
      <mesh position={[4, 5.5, -2]} rotation={[-0.3, 0.2, 0.5]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshToonMaterial color={colors.lime_green} />
      </mesh>
    </group>
  )
}

export default ChamacoCoreCartoonPlaza