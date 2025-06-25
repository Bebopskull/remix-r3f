// ==========================================
// app/root.tsx - ROOT LAYOUT
// ==========================================

import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { useNavigate, useLocation } from "@remix-run/react"
import CornellBoxGallery from '~/components/3D/Scenes/cornell-box-gallery'




export const meta: MetaFunction = () => ([{
  charset: "utf-8",
  title: "Your Studio",
  viewport: "width=device-width,initial-scale=1",
}])

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/styles/tailwind.css" },
]

// ==========================================
// CornellBoxContainer - Wrapper for your existing component
// ==========================================


const CornellBoxContainer = ({ children }) => {
  return (
    <group>
      {/* Your existing Cornell Box Gallery */}
      <CornellBoxGallery />

      {/* Dynamic content area - positioned inside the Cornell Box */}
      <group name="route-content" position={[0, 0, 0]}>
        {children}
      </group>
    </group>
  )
}


// ==========================================
// LoadingFallback - Simple loading component
// ==========================================

const LoadingFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial wireframe color="#4ecdc4" />
    </mesh>
  )
}

// ==========================================
// NavigationOverlay - Tailwind styled navigation
// ==========================================



const NavigationOverlay = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed top-5 left-5 z-50 flex flex-col gap-2">
      <p className="text-white text-xs bg-black bg-opacity-50 px-3 py-1 rounded">
        Current: {location.pathname}
      </p>

      <button
        className={`px-4 py-2 text-white border-none rounded text-sm cursor-pointer transition-colors ${location.pathname === '/'
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-400 hover:bg-teal-500'
          }`}
        onClick={() => navigate('/')}
      >
        Home
      </button>

      <button
        className={`px-4 py-2 text-white border-none rounded text-sm cursor-pointer transition-colors ${location.pathname === '/products'
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-400 hover:bg-teal-500'
          }`}
        onClick={() => navigate('/products')}
      >
        Products
      </button>

      <button
        className={`px-4 py-2 text-white border-none rounded text-sm cursor-pointer transition-colors ${location.pathname === '/lab'
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-400 hover:bg-teal-500'
          }`}
        onClick={() => navigate('/lab')}
      >
        Lab
      </button>

      <button
        className={`px-4 py-2 text-white border-none rounded text-sm cursor-pointer transition-colors ${location.pathname === '/about/team/bea'
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-400 hover:bg-teal-500'
          }`}
        onClick={() => navigate('/about/team/bea')}
      >
        Béa
      </button>

      <button
        className={`px-4 py-2 text-white border-none rounded text-sm cursor-pointer transition-colors ${location.pathname === '/about/team/ed'
          ? 'bg-red-400 hover:bg-red-500'
          : 'bg-teal-400 hover:bg-teal-500'
          }`}
        onClick={() => navigate('/about/team/ed')}
      >
        Ed
      </button>
    </nav>
  )
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="m-0 p-0 overflow-hidden bg-gray-900 font-sans">
        <div className="fixed inset-0 w-screen h-screen">
          {/* Your existing Scene setup */}
          <Canvas 
          camera={{ position: [0, 0, 9] }}
          //for now hard code the style of the canvas
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          >
            {/* Your existing lighting setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 15, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Your existing OrbitControls */}
            <OrbitControls
              target={[0, 3, 0]}
              enableZoom={false}
              maxAzimuthAngle={Math.PI / 4}
              minAzimuthAngle={-Math.PI / 4}
              maxPolarAngle={Math.PI / 2.2}
              minPolarAngle={Math.PI / 2.2}
              enablePan={false}
            />

            {/* Cornell Box - Always Present */}
            <Suspense fallback={<LoadingFallback />}>
              <CornellBoxContainer>
                {/* Dynamic content based on route */}
                <Outlet />
              </CornellBoxContainer>
            </Suspense>
          </Canvas>

          {/* Navigation Overlay */}
          <NavigationOverlay />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}


