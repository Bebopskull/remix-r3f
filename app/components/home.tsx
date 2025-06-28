
// import { useRef, useEffect, Suspense } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';

// function AnimatedModel() {
//   const modelRef = useRef<THREE.Group>(null);

//   console.log("Loading NIKAI logo...");
//   const { scene } = useGLTF('/media/3dAssets/LOGO_NIKAI3D/GLFT/LOGO_NIKAI.gltf');

//   useEffect(() => {
//     console.log("✅ NIKAI logo loaded successfully!");
//   }, [scene]);

//   useFrame((state, delta) => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += delta * 0.05;
//       modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
//     }
//   });

//   return (
//     <group ref={modelRef}>
//       <primitive object={scene} scale={0.4} />
//     </group>
//   );
// }

// export default function Home() {
//   return (
//     <group position={[0, 0, 0]}>
//       {/* Debug marker */}
      

//       <Suspense fallback={
//         <mesh>
//           <boxGeometry args={[1, 1, 1]} />
//           <meshBasicMaterial color="yellow" />
//         </mesh>
//       }>
//         <AnimatedModel />
//       </Suspense>
//     </group>
//   );
// }
// app/components/home.tsx - Using Cornell Box as fallback context
import { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedModel() {
  const modelRef = useRef<THREE.Group>(null);

  console.log("Loading NIKAI logo...");
  const { scene } = useGLTF('/media/3dAssets/LOGO_NIKAI3D/GLFT/LOGO_NIKAI.gltf');

  useEffect(() => {
    console.log("✅ NIKAI logo loaded successfully!");
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.05;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={0.4} />
    </group>
  );
}

// Minimal fallback since Cornell Box is already showing
const MinimalFallback = () => {
  return (
    <group>
      {/* Very subtle loading indicator or completely invisible */}
      <mesh position={[0, 0, 0]} visible={false}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}

export default function Home() {
  return (
    <group position={[0, 2.2, 0]}>
      {/* Since Cornell Box is already the main fallback, 
          we can use a minimal or no fallback here */}
      <Suspense fallback={<MinimalFallback />}>
        <AnimatedModel />
      </Suspense>
    </group>
  );
}