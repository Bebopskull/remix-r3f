import { useFrame } from '@react-three/fiber'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

// Custom Organic Blob Character
function OrganicBlobCharacter({ position = [0, 0, 0], scale = 1, color = "#FF6B6B" }) {
  const groupRef = useRef();
  const [isWaving, setIsWaving] = useState(false);
  
  // Create custom organic body geometry
  const organicBodyGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const normals = [];
    
    // Create blob-like body using mathematical function
    const segments = 16;
    const rings = 12;
    
    for (let ring = 0; ring <= rings; ring++) {
      const y = (ring / rings) * 2 - 1; // -1 to 1
      const radiusAtY = Math.sin(Math.PI * ring / rings) * 0.8 + 0.4; // Blob shape
      
      for (let segment = 0; segment <= segments; segment++) {
        const theta = (segment / segments) * Math.PI * 2;
        
        // Add some organic variation
        const noiseX = Math.sin(theta * 3) * 0.1;
        const noiseZ = Math.cos(theta * 2) * 0.1;
        
        const x = Math.cos(theta) * radiusAtY + noiseX;
        const z = Math.sin(theta) * radiusAtY + noiseZ;
        
        vertices.push(x, y, z);
        
        // Calculate normals
        const normal = new THREE.Vector3(x, 0, z).normalize();
        normals.push(normal.x, normal.y, normal.z);
        
        // Create triangles
        if (ring < rings && segment < segments) {
          const current = ring * (segments + 1) + segment;
          const next = current + segments + 1;
          
          indices.push(current, next, current + 1);
          indices.push(next, next + 1, current + 1);
        }
      }
    }
    
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);

  // Custom head geometry - more organic sphere
  const organicHeadGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.8, 16, 16);
    const positions = geometry.attributes.position;
    
    // Add organic deformation
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positions, i);
      
      // Add some character to the head shape
      const noise = Math.sin(vertex.x * 3) * Math.cos(vertex.y * 2) * Math.sin(vertex.z * 4) * 0.1;
      vertex.multiplyScalar(1 + noise);
      
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Organic breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.setScalar(scale + breathe);
      
      // Slight wobble
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      scale={scale}
      onClick={() => setIsWaving(!isWaving)}
    >
      {/* Organic Head */}
      <mesh position={[0, 2.5, 0]} geometry={organicHeadGeometry}>
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Eyes with custom geometry */}
      <mesh position={[-0.25, 2.6, 0.6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.25, 2.6, 0.6]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Organic Body */}
      <mesh position={[0, 1.2, 0]} geometry={organicBodyGeometry}>
        <meshToonMaterial color={color} />
      </mesh>
      
      {/* Organic Arms */}
      <mesh position={[-0.9, 1.8, 0]} rotation={[0, 0, isWaving ? -0.5 : 0.2]}>
        <capsuleGeometry args={[0.15, 0.8, 4, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
      <mesh position={[0.9, 1.8, 0]} rotation={[0, 0, isWaving ? 0.5 : -0.2]}>
        <capsuleGeometry args={[0.15, 0.8, 4, 8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  );
}

// Custom Flowing Architecture
function FlowingBuilding({ position = [0, 0, 0], color = "#4ECDC4" }) {
  const flowingGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    
    // Create flowing, wave-like building structure
    const width = 4;
    const height = 6;
    const depth = 3;
    const segments = 20;
    
    for (let y = 0; y <= segments; y++) {
      for (let x = 0; x <= segments; x++) {
        const u = x / segments;
        const v = y / segments;
        
        // Create flowing surface with sine waves
        const waveX = Math.sin(v * Math.PI * 2) * 0.3;
        const waveZ = Math.cos(u * Math.PI * 2) * 0.2;
        
        // Front face
        vertices.push(
          (u - 0.5) * width + waveX,
          v * height,
          depth / 2 + waveZ
        );
        
        // Back face
        vertices.push(
          (u - 0.5) * width + waveX,
          v * height,
          -depth / 2 + waveZ
        );
        
        // Create triangles
        if (y < segments && x < segments) {
          const current = y * (segments + 1) + x;
          const next = current + segments + 1;
          
          // Front face triangles
          indices.push(current * 2, next * 2, (current + 1) * 2);
          indices.push(next * 2, (next + 1) * 2, (current + 1) * 2);
          
          // Back face triangles  
          indices.push(current * 2 + 1, (current + 1) * 2 + 1, next * 2 + 1);
          indices.push(next * 2 + 1, (current + 1) * 2 + 1, (next + 1) * 2 + 1);
        }
      }
    }
    
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);

  return (
    <group position={position}>
      <mesh geometry={flowingGeometry}>
        <meshToonMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Custom windows that follow the flow */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI / 2) * 1.5,
          2 + i * 0.8,
          Math.cos(i * Math.PI / 2) * 1.2
        ]}>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshToonMaterial color="#87CEEB" />
        </mesh>
      ))}
    </group>
  );
}

// Sculptural Organic Cactus
function SculpturalCactus({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  
  const organicCactusGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    
    // Create organic cactus using noise-based generation
    const segments = 12;
    const rings = 20;
    
    for (let ring = 0; ring <= rings; ring++) {
      const y = (ring / rings) * 3;
      const baseRadius = 0.3;
      
      // Add organic variation to radius
      const radiusVariation = Math.sin(y * 2) * 0.1 + Math.cos(y * 3) * 0.05;
      const radius = baseRadius + radiusVariation;
      
      for (let segment = 0; segment <= segments; segment++) {
        const theta = (segment / segments) * Math.PI * 2;
        
        // Add ridges typical of cacti
        const ridgeNoise = Math.sin(theta * 8) * 0.05;
        const finalRadius = radius + ridgeNoise;
        
        const x = Math.cos(theta) * finalRadius;
        const z = Math.sin(theta) * finalRadius;
        
        vertices.push(x, y, z);
        
        // Create triangles
        if (ring < rings && segment < segments) {
          const current = ring * (segments + 1) + segment;
          const next = current + segments + 1;
          
          indices.push(current, next, current + 1);
          indices.push(next, next + 1, current + 1);
        }
      }
    }
    
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={organicCactusGeometry}>
        <meshToonMaterial color="#228B22" />
      </mesh>
      
      {/* Organic flower blooms */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI * 0.7) * 0.4,
          2.5 + i * 0.3,
          Math.cos(i * Math.PI * 0.7) * 0.4
        ]}>
          <icosahedronGeometry args={[0.15, 1]} />
          <meshToonMaterial color={i === 0 ? "#FF69B4" : i === 1 ? "#FFD700" : "#FF4500"} />
        </mesh>
      ))}
    </group>
  );
}

// Custom Organic Terrain
function OrganicTerrain() {
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(30, 30, 32, 32);
    const positions = geometry.attributes.position;
    
    // Create organic rolling hills
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positions, i);
      
      // Generate organic terrain height
      const height = 
        Math.sin(vertex.x * 0.1) * Math.cos(vertex.y * 0.1) * 0.3 +
        Math.sin(vertex.x * 0.3) * Math.cos(vertex.y * 0.2) * 0.1 +
        Math.sin(vertex.x * 0.05) * Math.cos(vertex.y * 0.05) * 0.5;
      
      positions.setZ(i, height);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} geometry={terrainGeometry}>
      <meshToonMaterial color="#F4A460" />
    </mesh>
  );
}

// Flowing Papel Picado with Custom Cloth Geometry
function FlowingPapelPicado() {
  const groupRef = useRef();
  
  const clothGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(0.8, 1.2, 8, 10);
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child.geometry && child.geometry.attributes.position) {
          const positions = child.geometry.attributes.position;
          const time = state.clock.elapsedTime;
          
          // Simulate cloth movement
          for (let j = 0; j < positions.count; j++) {
            const vertex = new THREE.Vector3();
            vertex.fromBufferAttribute(positions, j);
            
            const wave = Math.sin(vertex.y * 2 + time * 3 + i) * 0.1;
            positions.setX(j, vertex.x + wave);
          }
          positions.needsUpdate = true;
          child.geometry.computeVertexNormals();
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 6, 0]}>
      {Array.from({ length: 6 }, (_, i) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
        return (
          <mesh key={i} position={[(i - 2.5) * 2.5, 0, 0]} geometry={clothGeometry.clone()}>
            <meshToonMaterial color={colors[i]} transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        );
      })}
      
      {/* Organic rope */}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI/2]}>
        <torusGeometry args={[8, 0.03, 4, 32]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

// Main ChamacoCore Complex Mesh Scene Export
export default function ChamacoCoreComplexMesh() {
  return (
    <group>
      {/* Organic Terrain */}
      <OrganicTerrain />
      
      {/* Colorful organic tile accents */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 8;
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        
        return (
          <mesh key={i} position={[
            Math.cos(angle) * radius,
            0.1,
            Math.sin(angle) * radius
          ]} rotation={[-Math.PI / 2, 0, angle]}>
            <ringGeometry args={[0.5, 1, 6]} />
            <meshToonMaterial color={colors[i]} />
          </mesh>
        );
      })}
      
      {/* Flowing Buildings */}
      <FlowingBuilding position={[-10, 0, -8]} color="#FF6B6B" />
      <FlowingBuilding position={[10, 0, -8]} color="#4ECDC4" />
      <FlowingBuilding position={[-10, 0, 8]} color="#96CEB4" />
      <FlowingBuilding position={[10, 0, 8]} color="#FFEAA7" />
      
      {/* Organic Blob Characters */}
      <OrganicBlobCharacter position={[-3, 0, -2]} scale={1.2} color="#FF6B6B" />
      <OrganicBlobCharacter position={[3, 0, 1]} scale={1} color="#4ECDC4" />
      <OrganicBlobCharacter position={[0, 0, -4]} scale={0.9} color="#96CEB4" />
      <OrganicBlobCharacter position={[-2, 0, 3]} scale={1.1} color="#FFEAA7" />
      <OrganicBlobCharacter position={[5, 0, -1]} scale={0.8} color="#DDA0DD" />
      
      {/* Sculptural Cacti */}
      <SculpturalCactus position={[-6, 0, -2]} scale={1.2} />
      <SculpturalCactus position={[6, 0, 2]} scale={0.9} />
      <SculpturalCactus position={[0, 0, 6]} scale={1.1} />
      
      {/* Flowing Papel Picado */}
      <FlowingPapelPicado />
      
      {/* Central organic fountain structure */}
      <group position={[0, 0, 0]}>
        <mesh>
          <octahedronGeometry args={[2, 2]} />
          <meshToonMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <dodecahedronGeometry args={[0.8, 1]} />
          <meshToonMaterial color="#4ECDC4" />
        </mesh>
        
        {/* Organic water particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <mesh key={i} position={[
            Math.cos(i * Math.PI / 6) * (1.5 + Math.sin(i * 0.5) * 0.5),
            1 + Math.sin(Date.now() * 0.005 + i) * 0.3,
            Math.sin(i * Math.PI / 6) * (1.5 + Math.cos(i * 0.5) * 0.5)
          ]}>
            <icosahedronGeometry args={[0.08, 0]} />
            <meshToonMaterial color="#87CEEB" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
      
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