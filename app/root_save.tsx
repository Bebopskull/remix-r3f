// ==========================================
// app/root.tsx - ROOT LAYOUT
// ==========================================

import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLocation
} from "@remix-run/react"
import { Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { OverlayedGUI } from 'app/components/GUI/overlayedGUI.jsx'  
import CornellBoxGallery from '~/components/3D/Scenes/cornell-box-gallery'
// import Logo3D from "./components/home"
import { useEffect } from 'react'




export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/styles/site.css" },
  { rel: "stylesheet", href: "/styles/estilocontinuo.css" },
  { rel: "stylesheet", href: "/styles/webgl.css" },
  { rel: "stylesheet", href: "/styles/GLSL.css" },
  { rel: "stylesheet", href: "/styles/nikaiCSS.css" }
]


// ==========================================
// CornellBoxContainer - Wrapper for your existing component
// ==========================================

const CornellBoxContainer = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("=== ROUTE DEBUG ===");
    console.log("Current route:", location.pathname);
    console.log("Outlet should render content for this route");
  }, [location.pathname]);

  return (
    <group>
      <CornellBoxGallery />

      <group name="route-content" position={[0, 2.5, 0]}>
        {/* Debug indicator - should always be visible */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="yellow" />
        </mesh>

        {/* The outlet content */}
        <Outlet />
        {children}
      </group>
    </group>
  )
}

// const CornellBoxContainer = ({ children }) => {
//   return (
//     <group>
//       {/* Your existing Cornell Box Gallery */}
//       <CornellBoxGallery />

//       {/* Dynamic content area - positioned inside the Cornell Box */}
//       <group name="route-content" position={[0, 0, 0]}>
//         {children}
//       </group>
//     </group>
//   )
// }


// ==========================================
// LoadingFallback - Simple loading component
// ==========================================

const CornellBoxFallback = () => {
  return (
    <group>
      {/* Just the Cornell Box structure without any content */}
      <CornellBoxGallery />

      {/* Optional: subtle loading indicator in the center */}
      <group position={[0, 2.5, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#4ECDC4"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  )
}

// ==========================================
// App - Main application component
// ==========================================

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', background: 'black' }}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas
            camera={{ position: [0, 5, 9], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            {/* <OrbitControls enableZoom={true} enablePan={true} /> */}
            {/* Mouse controls */}
            <OrbitControls target={[0, 3, 0]} 
              enableZoom={false}
              // horizontal rotation
              maxAzimuthAngle={Math.PI / 4}
              minAzimuthAngle={-  Math.PI / 4}
              // vertical rotation
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 2.2}
              enablePan={false}
            />
            {/* Your Logo */}
            <Suspense fallback={<CornellBoxFallback />}>
              <CornellBoxContainer>
                {/* <Logo3D /> */}
                <Outlet />
              </CornellBoxContainer>


            </Suspense>
          </Canvas>

          {/* Re-enable your GUI when ready */}
          <OverlayedGUI />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}