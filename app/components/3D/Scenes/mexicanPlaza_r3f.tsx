import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

// Claymation-style Character Component
function ChamacoCharacter({ position = [0, 0, 0], scale = 1, color = "#FF6B6B", type = "round" }) {
  const groupRef = useRef();
  const [isWaving, setIsWaving] = useState(false);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing animation
      groupRef.current.scale.y = scale + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Slight bounce when idle
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      
      // Head turning animation
      groupRef.current.children[0].rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onClick={() => setIsWaving(!isWaving)}
    >
      {/* Head */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.25, 2.6, 0.6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.25, 2.6, 0.6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Eye whites */}
      <mesh position={[-0.25, 2.6, 0.65]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.25, 2.6, 0.65]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Mouth */}
      <mesh position={[0, 2.2, 0.6]} rotation={[0, 0, Math.PI]}>
        <cylinderGeometry args={[0.2, 0.15, 0.05, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.5, 16]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.9, 1.8, 0]} rotation={[0, 0, isWaving ? -0.5 : 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.9, 1.8, 0]} rotation={[0, 0, isWaving ? 0.5 : -0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-1.2, 1.4, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[1.2, 1.4, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.3, -0.2, 0.2]}>
        <boxGeometry args={[0.3, 0.2, 0.6]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.3, -0.2, 0.2]}>
        <boxGeometry args={[0.3, 0.2, 0.6]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Mexican-style Building Component
function MexicanBuilding({ position = [0, 0, 0], width = 4, height = 5, color = "#FF6B6B" }) {
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, height/2, 0]}>
        <boxGeometry args={[width, height, 2]} />
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, height + 0.3, 0]}>
        <coneGeometry args={[width * 0.7, 0.8, 4]} />
        <meshToonMaterial color="#CD853F" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 1, 1.05]}>
        <boxGeometry args={[0.8, 2, 0.1]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-width*0.25, height*0.6, 1.05]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshToonMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[width*0.25, height*0.6, 1.05]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshToonMaterial color="#87CEEB" />
      </mesh>
      
      {/* Window frames */}
      <mesh position={[-width*0.25, height*0.6, 1.1]}>
        <boxGeometry args={[0.7, 0.7, 0.05]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[width*0.25, height*0.6, 1.1]}>
        <boxGeometry args={[0.7, 0.7, 0.05]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

// Cactus Component
function MexicanCactus({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
        <meshToonMaterial color="#228B22" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.6, 2, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.2, 0.25, 1.2, 8]} />
        <meshToonMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.6, 1.5, 0]} rotation={[0, 0, -Math.PI/2]}>
        <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
        <meshToonMaterial color="#228B22" />
      </mesh>
      
      {/* Flowers */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshToonMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[-1.2, 2, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshToonMaterial color="#FFD700" />
      </mesh>
      <mesh position={[1.1, 1.5, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshToonMaterial color="#FF4500" />
      </mesh>
    </group>
  );
}

// Papel Picado (Mexican bunting) Component
function PapelPicado() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child.rotation) {
          child.rotation.z = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 6, 0]}>
      {Array.from({ length: 8 }, (_, i) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        return (
          <mesh key={i} position={[(i - 3.5) * 2, 0, 0]}>
            <boxGeometry args={[0.8, 1.2, 0.02]} />
            <meshToonMaterial color={colors[i]} transparent opacity={0.8} />
          </mesh>
        );
      })}
      
      {/* Rope */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.02, 0.02, 16, 8]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Fountain Component
function MexicanFountain({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2.5, 1, 16]} />
        <meshToonMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1, 8]} />
        <meshToonMaterial color="#4ECDC4" />
      </mesh>
      
      {/* Water effect */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 1.5,
          1 + Math.sin(Date.now() * 0.005 + i) * 0.2,
          Math.sin(i * Math.PI / 4) * 1.5
        ]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshToonMaterial color="#87CEEB" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Main Mexican Plaza Scene Export
export default function MexicanPlazaScene() {
  return (
    <group>
      {/* Ground - colorful tiles */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshToonMaterial color="#F4A460" />
      </mesh>
      
      {/* Colorful tile pattern */}
      {Array.from({ length: 5 }, (_, x) => 
        Array.from({ length: 5 }, (_, z) => {
          const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
          return (
            <mesh key={`${x}-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[(x-2)*2, 0.01, (z-2)*2]}>
              <planeGeometry args={[1.8, 1.8]} />
              <meshToonMaterial color={colors[(x + z) % colors.length]} />
            </mesh>
          );
        })
      )}
      
      {/* Buildings around the plaza */}
      <MexicanBuilding position={[-8, 0, -8]} width={3} height={4} color="#FF6B6B" />
      <MexicanBuilding position={[8, 0, -8]} width={4} height={5} color="#4ECDC4" />
      <MexicanBuilding position={[-8, 0, 8]} width={3.5} height={4.5} color="#96CEB4" />
      <MexicanBuilding position={[8, 0, 8]} width={3} height={4} color="#FFEAA7" />
      
      {/* Chamaco-style Characters */}
      <ChamacoCharacter position={[-3, 0, -2]} scale={1.2} color="#FF6B6B" />
      <ChamacoCharacter position={[2, 0, 1]} scale={1} color="#4ECDC4" />
      <ChamacoCharacter position={[0, 0, -4]} scale={0.8} color="#96CEB4" />
      <ChamacoCharacter position={[-1, 0, 3]} scale={1.1} color="#FFEAA7" />
      <ChamacoCharacter position={[4, 0, -1]} scale={0.9} color="#DDA0DD" />
      
      {/* Cacti */}
      <MexicanCactus position={[-6, 0, -2]} scale={1.2} />
      <MexicanCactus position={[6, 0, 2]} scale={0.8} />
      <MexicanCactus position={[0, 0, 6]} scale={1} />
      
      {/* Papel Picado */}
      <PapelPicado />
      
      {/* Central fountain */}
      <MexicanFountain position={[0, 0, 0]} />
      
      {/* Sky dome */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}