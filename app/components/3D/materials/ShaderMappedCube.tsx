// app/components/CubeMappedShader.tsx
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Color, Vector2, Mesh } from 'three'
import { Text } from '@react-three/drei'

// Convert your shader to React Three Fiber
const CubeMappedShaderMaterial = shaderMaterial(
  {
    u_color: new Color(0xff0000),
    u_time: 0.0,
    u_mouse: new Vector2(0.0, 0.0),
    u_resolution: new Vector2(0, 0),
  },
  // Your vertex shader - adding UV varying
  /*glsl*/ `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;  // Pass UV to fragment shader
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Your fragment shader adapted for cube mapping
  /*glsl*/ `
    uniform vec3 u_color;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    varying vec2 vUv;
    
    void main() {
      // Use UV coordinates instead of screen coordinates
      vec2 st = vUv;  // Already normalized 0-1
      
      // Adapt your mouse interaction for UV space
      vec2 m = (vec2(0.5) + u_mouse/100.0) + vec2(0.2);
      
      // Your original pattern adapted to UV coordinates
      vec4 color = vec4(tan(st.y/0.005) * m, m);
      
      gl_FragColor = color;
    }
  `
)

extend({ CubeMappedShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cubeMappedShaderMaterial: any
    }
  }
}

// Component that uses your shader
export function CubeMappedShader() {
  const materialRef = useRef<any>(null)
  const { size, mouse } = useThree()

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Update time (same as your original)
      materialRef.current.u_time += delta

      // Update mouse (converted to your coordinate system)
      materialRef.current.u_mouse.set(
        mouse.x * 50,  // Scale to match your original mouse sensitivity
        mouse.y * 50
      )

      // Update resolution (in case you want to use it)
      materialRef.current.u_resolution.set(size.width, size.height)
    }
  })

  return <cubeMappedShaderMaterial ref={materialRef} />
}

// Rotating cube with your shader
export function InteractiveCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <CubeMappedShader />
    </mesh>
  )
}

// Enhanced version with more control
export function EnhancedCubeMappedShader() {
  const materialRef = useRef<any>(null)
  const { size, mouse } = useThree()

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.u_time += delta

      // Enhanced mouse interaction with 3D consideration
      const mouseX = mouse.x * 100
      const mouseY = mouse.y * 100
      materialRef.current.u_mouse.set(mouseX, mouseY)

      materialRef.current.u_resolution.set(size.width, size.height)
    }
  })

  return <cubeMappedShaderMaterial ref={materialRef} />
}

// Version with your original pattern but enhanced for UV mapping
const EnhancedShaderMaterial = shaderMaterial(
  {
    u_color: new Color(0xff0000),
    u_time: 0.0,
    u_mouse: new Vector2(0.0, 0.0),
    u_resolution: new Vector2(0, 0),
    u_scale: 1.0,  // Additional control for pattern scale
  },
  /*glsl*/ `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /*glsl*/ `
    uniform vec3 u_color;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_scale;
    varying vec2 vUv;
    
    void main() {
      // UV coordinates already normalized
      vec2 st = vUv * u_scale;  // Scale the pattern
      
      // Your mouse calculation adapted
      vec2 m = (vec2(0.5) + u_mouse/100.0) + vec2(0.2);
      
      // Option 1: Your original pattern
      vec4 color1 = vec4(tan(st.y/0.005) * m, m);
      
      // Option 2: Enhanced version with time animation
      vec4 color2 = vec4(
        tan((st.y + u_time * 0.1)/0.005) * m,
        m
      );
      
      // Option 3: More dynamic version
      vec4 color3 = vec4(
        tan(st.y/0.005) * m * sin(u_time + st.x * 5.0),
        m * cos(u_time * 0.5)
      );
      
      // Use color2 for enhanced animation
      gl_FragColor = color2;
    }
  `
)

extend({ EnhancedShaderMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      enhancedShaderMaterial: any
    }
  }
}

export function EnhancedShaderCube() {
  const materialRef = useRef<any>(null)
  const meshRef = useRef<Mesh>(null)
  const { size, mouse } = useThree()

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.u_time += delta
      materialRef.current.u_mouse.set(mouse.x * 50, mouse.y * 50)
      materialRef.current.u_resolution.set(size.width, size.height)
      materialRef.current.u_scale = 1.0 + Math.sin(state.clock.elapsedTime) * 0.5
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <enhancedShaderMaterial ref={materialRef} />
    </mesh>
  )
}

export function RotatingCubes({ position = [0, 10, 0] }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Floating Platform */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 16]} />
        <meshPhongMaterial color="#444444" transparent opacity={0.8} />
      </mesh>

      {/* Main Cube */}
      <mesh
        ref={meshRef}
        scale={clicked ? 1.5 : hovered ? 1.2 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial
          color={hovered ? '#ff6b6b' : clicked ? '#4ecdc4' : '#45b7d1'}
        />
      </mesh>

      {/* Orbiting smaller cubes */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos((Date.now() * 0.001) + (i * Math.PI / 2)) * 3,
          0,
          Math.sin((Date.now() * 0.001) + (i * Math.PI / 2)) * 3
        ]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhongMaterial color={`hsl(${i * 90}, 70%, 60%)`} />
        </mesh>
      ))}

     
    </group>
  )
}