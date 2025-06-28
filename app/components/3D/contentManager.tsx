// app/components/3D/ContentManager.tsx
import { useLocation } from '@remix-run/react';
import { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

// Import your 3D components
import Home from '../home';
import BeachScene from './Scenes/beachScene';
import MexicanPlazaScene from './Scenes/mexicanPlaza_r3f';
import ChamacoCoreComplexMesh from './Scenes/chamacocore-complex-mesh';
import ChamacoPlazaCartoon from './Scenes/chamaco-plaza-cartoon';
import ChamacoCoreRef from './Scenes/chamacocore-refined-clay';

// Define content mapping
const contentMap = {
  // Home/Default
  '/': () => <Home />,
  
  // Products
  '/products': () => <ProductsOverview />,
  '/products/time-machine': () => <TimeMachineContent />,
  '/products/luv': () => <LuvContent />,
    '/products/luv/elections-ontario': () => <ElectionsOntarioContent />,
    '/products/luv/camp-kazoo': () => <CampKazooContent />,
    '/products/luv/aquazette': () => <AquazetteContent />,
    '/products/luv/morgane-et-ses-organes': () => <MorganeContent />,
  '/products/the-self': () => <TheSelfContent />,
  '/products/shiny-talking-people': () => <ShinyTalkingPeopleContent />,
  '/products/exos': () => <ExosContent />,
  '/products/invitame-a-la-playa': () => <InvitameContent />,
  
  // Lab
  '/lab': () => <LabContent />,
  
  // About
  '/about': () => <AboutContent />,
  '/about/team': () => <TeamContent />,
    '/about/team/bea': () => <BeaContent />,
    '/about/team/ed': () => <EdContent />,
};

// Individual content components
const ProductsOverview = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4ECDC4" />
    </mesh>
    {/* Add floating text or other indicators */}
  </group>
);

const TimeMachineContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial color="#FF6B6B" />
    </mesh>
    {/* Time machine specific 3D content */}
  </group>
);

const LuvContent = () => (
  <group>
    <BeachScene />
  </group>
);

const ElectionsOntarioContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 1.5, 16]} />
      <meshStandardMaterial color="#FFEAA7" />
    </mesh>
  </group>
);

const CampKazooContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#DDA0DD" />
    </mesh>
  </group>
);

const AquazetteContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#87CEEB" />
    </mesh>
  </group>
);

const MorganeContent = () => (
  <group>
    <ChamacoCoreRef />
  </group>
);

const TheSelfContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <octahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color="#96CEB4" />
    </mesh>
  </group>
);

const ShinyTalkingPeopleContent = () => (
  <group>
    <ChamacoPlazaCartoon />
  </group>
);

const ExosContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#F7DC6F" />
    </mesh>
  </group>
);

const InvitameContent = () => (
  <group>
    <MexicanPlazaScene />
  </group>
);

const LabContent = () => (
  <group>
    <ChamacoCoreComplexMesh />
  </group>
);

const AboutContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#F7DC6F" />
    </mesh>
  </group>
);

const TeamContent = () => (
  <group>
    {/* Two spheres representing team members */}
    <mesh position={[-1, 0, 0]}>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshStandardMaterial color="#FF6B6B" />
    </mesh>
    <mesh position={[1, 0, 0]}>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshStandardMaterial color="#4ECDC4" />
    </mesh>
  </group>
);

const BeaContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#FF6B6B" />
    </mesh>
    {/* Add floating text or bio elements */}
  </group>
);

const EdContent = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4ECDC4" />
    </mesh>
    {/* Add floating text or bio elements */}
  </group>
);

// Loading fallback for content transitions
const ContentFallback = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color="#4ECDC4" 
        wireframe 
        transparent 
        opacity={0.6} 
      />
    </mesh>
  );
};

// Main Content Manager Component
const ContentManager = () => {
  const location = useLocation();
  
  // Get the content component for current route
  const ContentComponent = contentMap[location.pathname] || contentMap['/'];
  
  return (
    <group name="route-content" position={[0, 0, 0]}>
      <Suspense fallback={<ContentFallback />}>
        <ContentComponent />
      </Suspense>
    </group>
  );
};

export default ContentManager;