// app/root.tsx - Preload Cornell Box to prevent black transitions
import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation
} from "@remix-run/react"
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { OverlayedGUI } from 'app/components/GUI/overlayedGUI.jsx'  
import CornellBoxGallery from '~/components/3D/Scenes/cornell-box-gallery'
import ContentManager from '~/components/3D/contentManager'


export const links: LinksFunction = () => [
 
  { rel: "stylesheet", href: "/styles/nikaiCSS.css" }
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />

        {/* Prevent flash of white */}
        <style dangerouslySetInnerHTML={{
          __html: `html, body { background: #000; margin: 0; padding: 0; overflow: hidden; }`
        }} />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden', background: '#000' }}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas
            camera={{ position: [0, 5, 9], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
            gl={{ preserveDrawingBuffer: true }}
          >
            {/* Always present lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Always present controls */}
            <OrbitControls
              target={[0, 3, 0]}
              enableZoom={false}
              maxAzimuthAngle={Math.PI / 4}
              minAzimuthAngle={-Math.PI / 4}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 2.2}
              enablePan={false}
            />

            {/* Cornell Box - always visible */}
            <CornellBoxGallery />

            {/* Content Manager - handles all route content */}
            <ContentManager />

            {/* Preload assets */}
            <Preload all />
          </Canvas>

          <OverlayedGUI />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

/////OLD CODE/////

// // Always-visible Cornell Box that stays during navigation
// const PersistentCornellBox = () => {
//   return (
//     <group>
//       <CornellBoxGallery />
//     </group>
//   )
// }

// // Route content container
// const RouteContent = ({ children }) => {
//   const navigation = useNavigation()
//   const isNavigating = navigation.state === "loading"

//   return (
//     <group name="route-content" position={[0, 2.5, 0]}>
//       {/* Show loading indicator during navigation */}
//       {isNavigating && (
//         <mesh position={[0, 0, 0]}>
//           <sphereGeometry args={[0.2, 16, 16]} />
//           <meshStandardMaterial 
//             color="#4ECDC4" 
//             wireframe 
//             transparent 
//             opacity={0.8} 
//           />
//         </mesh>
//       )}
      
//       {/* Route content */}
//       <Suspense fallback={
//         <mesh position={[0, 0, 0]}>
//           <sphereGeometry args={[0.15, 12, 12]} />
//           <meshStandardMaterial 
//             color="#96CEB4" 
//             wireframe 
//             transparent 
//             opacity={0.6} 
//           />
//         </mesh>
//       }>
//         <Outlet />
//         {children}
//       </Suspense>
//     </group>
//   )
// }

// export default function App() {
//   const [sceneReady, setSceneReady] = useState(false)

//   useEffect(() => {
//     // Mark scene as ready after initial load
//     const timer = setTimeout(() => setSceneReady(true), 100)
//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <html lang="en">
//       <head>
//         <Meta />
//         <Links />
//       </head>
//       <body style={{ margin: 0, padding: 0, overflow: 'hidden', background: 'black' }}>
//         <div style={{ width: '100vw', height: '100vh' }}>
//           <Canvas
//             camera={{ position: [0, 5, 9], fov: 75 }}
//             style={{ width: '100%', height: '100%' }}
//             // Prevent canvas from unmounting
//             gl={{ preserveDrawingBuffer: true }}
//           >
//             {/* Basic lighting always present */}
//             <ambientLight intensity={0.8} />
//             <directionalLight position={[10, 10, 5]} intensity={1} />
            
//             {/* Controls always present */}
//             <OrbitControls 
//               target={[0, 3, 0]} 
//               enableZoom={false}
//               maxAzimuthAngle={Math.PI / 4}
//               minAzimuthAngle={-Math.PI / 4}
//               maxPolarAngle={Math.PI / 2.2}
//               minPolarAngle={Math.PI / 2.2}
//               enablePan={false}
//             />
            
//             {/* Cornell Box always visible - no Suspense wrapper */}
//             <PersistentCornellBox />
            
//             {/* Only route content uses Suspense */}
//             <RouteContent>
//               <Outlet />
//             </RouteContent>

//             {/* Preload all assets */}
//             <Preload all />
            
            
//             {/* Preload all assets */}
//             <Preload all />
//           </Canvas>

//           <OverlayedGUI />
//         </div>

//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   )
// }