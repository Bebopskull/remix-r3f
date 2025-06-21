import { Canvas,useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import { Mesh, PlaneGeometry, MeshLambertMaterial, MeshPhongMaterial } from 'three'
import * as THREE from 'three'

// Palm Tree Component
function PalmTree({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 4, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>

      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.1;
        const z = Math.sin(angle) * 0.1;

        return (
          <group key={i} position={[x, 4, z]} rotation={[0, angle, 0]}>
            <mesh position={[0, 0, 1]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.1, 0.05, 2]} />
              <meshLambertMaterial color="#228B22" />
            </mesh>
            <mesh position={[0.3, 0, 1.5]} rotation={[0.2, 0.2, 0]}>
              <boxGeometry args={[0.08, 0.04, 1]} />
              <meshLambertMaterial color="#32CD32" />
            </mesh>
            <mesh position={[-0.3, 0, 1.5]} rotation={[0.2, -0.2, 0]}>
              <boxGeometry args={[0.08, 0.04, 1]} />
              <meshLambertMaterial color="#32CD32" />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0.2, 3.8, 0.1]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Ocean Component
function Ocean() {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 50, 64, 64);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time * 0.5) * 0.2;
        positions.setZ(i, wave);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 10]} geometry={geometry}>
      <meshPhongMaterial
        color="#006994"
        transparent
        opacity={0.8}
        shininess={100}
      />
    </mesh>
  );
}

// Beach Component
export default function BeachScene() {
  return (

    <group>

      
      {/* Beach ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshLambertMaterial color="#F4A460" />
      </mesh>

      {/* Palm Trees */}
      <PalmTree position={[-5, 0, -3]} scale={1.2} />
      <PalmTree position={[3, 0, -5]} scale={0.9} />
      <PalmTree position={[-8, 0, -1]} scale={1.1} />
      <PalmTree position={[7, 0, -2]} scale={0.8} />

      {/* Beach Props */}
      <mesh position={[2, 0.3, 2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshLambertMaterial color="#FF6B6B" />
      </mesh>

      <mesh position={[-2, 0.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.15, 5, 5]} />
        <meshLambertMaterial color="#FF7F50" />
      </mesh>
      <Ocean />
      {/* Sky */}
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

// Scene Controller Component
function SceneController() {
  const [activeScene, setActiveScene] = useState('both');

  return (
    <>
      {/* UI Controls */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Scene Controls</h3>
        <button onClick={() => setActiveScene('both')}
          style={{
            margin: '2px', padding: '5px', fontSize: '12px',
            background: activeScene === 'both' ? '#4ecdc4' : '#666'
          }}>
          Both Scenes
        </button>
        <button onClick={() => setActiveScene('cube')}
          style={{
            margin: '2px', padding: '5px', fontSize: '12px',
            background: activeScene === 'cube' ? '#4ecdc4' : '#666'
          }}>
          Cube Only
        </button>
        <button onClick={() => setActiveScene('beach')}
          style={{
            margin: '2px', padding: '5px', fontSize: '12px',
            background: activeScene === 'beach' ? '#4ecdc4' : '#666'
          }}>
          Beach Only
        </button>
      </div>

      {/* Conditional Scene Rendering */}
      {(activeScene === 'both' || activeScene === 'cube') && (
        <CubeScene position={[0, 8, -5]} />
      )}

      {(activeScene === 'both' || activeScene === 'beach') && (
        <>
          <BeachScene />
          <Ocean />
        </>
      )}
    </>
  );
}


// // NewScene component
// export default function BeachScene() {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <Canvas camera={{ position: [0, 0, 5] }}>
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 10, 7]} intensity={1} />
//         <OrbitControls />
//         <BeachBox />
//       </Canvas>
//     </div>
//   )
// }
