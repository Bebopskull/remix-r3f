import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { 
  Environment, 
  ContactShadows, 
  Text,
  Float,
  Cloud,
  Sky,
  useTexture,
  Sphere
} from '@react-three/drei'
import { 
  EffectComposer, 
  SSAO, 
  Bloom, 
  DepthOfField, 
  Vignette,
  ChromaticAberration,
  ToneMapping
} from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'
import * as THREE from 'three'

const ChamacoCoreBeachScene = () => {
  // Manual soft shadows configuration
  const { gl } = useThree()
  
  useEffect(() => {
    // Configure renderer for soft shadows
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap // Soft shadows
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2
    
    // Shadow map types (from fastest to best quality):
    // THREE.BasicShadowMap - Very fast, hard shadows
    // THREE.PCFShadowMap - Default, medium quality
    // THREE.PCFSoftShadowMap - Soft shadows, good quality
    // THREE.VSMShadowMap - Variance shadows, softest but more expensive
  }, [gl])

  // Sophisticated color palette
  const colors = {
    soft_red: '#FF6B6B',
    turquoise: '#4ECDC4',
    sage_green: '#96CEB4',
    soft_yellow: '#FFEAA7',
    plum: '#DDA0DD',
    terracotta: '#D4856A',
    cream: '#FFF5E6',
    deep_blue: '#2C5F7C',
    sand: '#F4E4C1',
    ocean_blue: '#0077BE',
    coral: '#FF7F50',
    seafoam: '#93E5AB'
  }

  // Clay material helper with enhanced properties
  const createClayMaterial = (color, options = {}) => {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: 0.7,
      metalness: 0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.8,
      ...options
    })
  }

  // Beach character with swimming attire
  const BeachCharacter = ({ position, primaryColor, swimColor }) => {
    const groupRef = useRef()
    const floatOffset = useRef(Math.random() * Math.PI * 2)
    
    useFrame((state) => {
      if (groupRef.current) {
        // Gentle floating animation
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + floatOffset.current) * 0.05
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      }
    })

    const headGeometry = useMemo(() => {
      const geometry = new THREE.SphereGeometry(0.45, 32, 32)
      const positions = geometry.attributes.position
      
      // Clay-like imperfections
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = positions.getZ(i)
        
        const noise = (Math.sin(x * 5 + y * 3) * Math.cos(z * 4)) * 0.02
        positions.setXYZ(i, x + noise, y + noise * 0.5, z + noise)
      }
      
      geometry.computeVertexNormals()
      return geometry
    }, [])

    return (
      <group ref={groupRef} position={position}>
        {/* Head with sun hat */}
        <mesh position={[0, 1.2, 0]} geometry={headGeometry} castShadow>
          <meshPhysicalMaterial 
            color={primaryColor} 
            roughness={0.8}
            clearcoat={0.1}
          />
        </mesh>
        
        {/* Beach hat */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
          <meshPhysicalMaterial color={colors.soft_yellow} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.7, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 16]} />
          <meshPhysicalMaterial color={colors.soft_yellow} roughness={0.9} />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <capsuleGeometry args={[0.3, 0.7, 16, 32]} />
          <meshPhysicalMaterial color={primaryColor} roughness={0.8} />
        </mesh>
        
        {/* Swimming shorts */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.35, 0.4, 16]} />
          <meshPhysicalMaterial color={swimColor} roughness={0.6} />
        </mesh>
        
        {/* Eyes with depth */}
        {[-0.12, 0.12].map((x, i) => (
          <group key={i} position={[x, 1.25, 0.35]}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshPhysicalMaterial color={colors.cream} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshPhysicalMaterial color={colors.deep_blue} roughness={0.1} />
            </mesh>
          </group>
        ))}
        
        {/* Arms */}
        <mesh position={[0.28, 0.5, 0]} rotation={[0, 0, -0.4]} castShadow>
          <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
          <meshPhysicalMaterial color={primaryColor} roughness={0.8} />
        </mesh>
        <mesh position={[-0.28, 0.5, 0]} rotation={[0, 0, 0.4]} castShadow>
          <capsuleGeometry args={[0.07, 0.35, 8, 16]} />
          <meshPhysicalMaterial color={primaryColor} roughness={0.8} />
        </mesh>
      </group>
    )
  }

  // Detailed palm tree
  const PalmTree = ({ position, scale = 1 }) => {
    const trunkRef = useRef()
    
    useFrame((state) => {
      if (trunkRef.current) {
        trunkRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      }
    })

    const trunkGeometry = useMemo(() => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.1, 1, 0.05),
        new THREE.Vector3(0.2, 2, 0.1),
        new THREE.Vector3(0.15, 3, 0.05),
        new THREE.Vector3(0.1, 4, 0)
      ])
      
      return new THREE.TubeGeometry(curve, 20, 0.15, 8, false)
    }, [])

    return (
      <group position={position} scale={scale}>
        {/* Trunk */}
        <mesh ref={trunkRef} geometry={trunkGeometry} castShadow>
          <meshPhysicalMaterial 
            color={colors.terracotta} 
            roughness={0.9}
            map={null}
          />
        </mesh>
        
        {/* Palm fronds */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <group 
            key={i} 
            position={[0.1, 4, 0]} 
            rotation={[0, (angle * Math.PI) / 180, 0]}
          >
            <mesh 
              position={[0, 0, 1]} 
              rotation={[-0.3, 0, 0]}
              castShadow
            >
              <planeGeometry args={[0.5, 2, 1, 8]} />
              <meshPhysicalMaterial 
                color={colors.sage_green} 
                side={THREE.DoubleSide}
                roughness={0.7}
              />
            </mesh>
          </group>
        ))}
      </group>
    )
  }

  // Beach umbrella with fabric simulation
  const BeachUmbrella = ({ position }) => {
    const umbrellaRef = useRef()
    
    useFrame((state) => {
      if (umbrellaRef.current) {
        umbrellaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
      }
    })

    return (
      <group position={position}>
        {/* Pole */}
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <meshPhysicalMaterial color={colors.cream} roughness={0.8} />
        </mesh>
        
        {/* Umbrella top */}
        <group ref={umbrellaRef} position={[0, 1.5, 0]}>
          {[...Array(8)].map((_, i) => {
            const color = i % 2 === 0 ? colors.soft_red : colors.cream
            return (
              <mesh 
                key={i} 
                rotation={[0, (i * Math.PI) / 4, 0]}
                castShadow
              >
                <coneGeometry args={[1.5, 0.5, 4, 1, false, 0, Math.PI / 4]} />
                <meshPhysicalMaterial 
                  color={color} 
                  side={THREE.DoubleSide}
                  roughness={0.6}
                />
              </mesh>
            )
          })}
        </group>
      </group>
    )
  }

  // Detailed sandcastle
  const SandCastle = ({ position }) => {
    const castleRef = useRef()
    
    const sandMaterial = useMemo(() => createClayMaterial(colors.sand, {
      roughness: 0.95,
      clearcoat: 0,
    }), [])

    return (
      <group ref={castleRef} position={position}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[1, 1.2, 0.5, 8]} />
          <primitive object={sandMaterial} />
        </mesh>
        
        {/* Main tower */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1, 6]} />
          <primitive object={sandMaterial} />
        </mesh>
        
        {/* Tower top */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <coneGeometry args={[0.5, 0.4, 6]} />
          <primitive object={sandMaterial} />
        </mesh>
        
        {/* Small towers */}
        {[0, 90, 180, 270].map((angle, i) => (
          <group 
            key={i} 
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.8,
              0.5,
              Math.sin((angle * Math.PI) / 180) * 0.8
            ]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.2, 0.25, 0.7, 6]} />
              <primitive object={sandMaterial} />
            </mesh>
            <mesh position={[0, 0.4, 0]} castShadow>
              <coneGeometry args={[0.25, 0.2, 6]} />
              <primitive object={sandMaterial} />
            </mesh>
          </group>
        ))}
      </group>
    )
  }

  // Animated ocean waves
  const OceanWaves = () => {
    const oceanRef = useRef()
    
    useFrame((state) => {
      if (oceanRef.current) {
        oceanRef.current.material.uniforms.time.value = state.clock.elapsedTime
      }
    })

    const oceanShader = useMemo(() => ({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(colors.ocean_blue) },
        color2: { value: new THREE.Color(colors.turquoise) }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 2.0 + time) * 0.1;
          wave += sin(pos.z * 3.0 + time * 1.5) * 0.05;
          pos.y += wave;
          vWave = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          vec3 color = mix(color1, color2, vWave + 0.5);
          gl_FragColor = vec4(color, 0.9);
        }
      `,
      transparent: true
    }), [])

    return (
      <mesh 
        ref={oceanRef} 
        position={[0, -2, -10]} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 20, 100, 50]} />
        <shaderMaterial args={[oceanShader]} />
      </mesh>
    )
  }

  // Beach ball with realistic material
  const BeachBall = ({ position }) => {
    const ballRef = useRef()
    
    useFrame((state) => {
      if (ballRef.current) {
        ballRef.current.rotation.y += 0.01
        ballRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    })

    return (
      <group ref={ballRef} position={position}>
        {[...Array(6)].map((_, i) => {
          const color = [colors.soft_red, colors.cream, colors.turquoise][i % 3]
          return (
            <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]} castShadow>
              <sphereGeometry args={[0.5, 8, 16, 0, Math.PI / 3]} />
              <meshPhysicalMaterial 
                color={color} 
                roughness={0.3}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
              />
            </mesh>
          )
        })}
      </group>
    )
  }

  // Decorative seashells
  const Seashell = ({ position, rotation, scale = 1 }) => {
    const shellGeometry = useMemo(() => {
      const points = []
      for (let i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(
          Math.sin(i * 0.2) * 0.1 + 0.1,
          i * 0.05
        ))
      }
      return new THREE.LatheGeometry(points, 20)
    }, [])

    return (
      <mesh 
        position={position} 
        rotation={rotation} 
        scale={scale}
        castShadow
      >
        <primitive object={shellGeometry} />
        <meshPhysicalMaterial 
          color={colors.coral}
          roughness={0.4}
          metalness={0.1}
          iridescence={0.8}
          iridescenceIOR={1.4}
        />
      </mesh>
    )
  }

  return (
    <>
      {/* Scene content */}
      <group>
        {/* Sand ground with texture variation */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30, 100, 100]} />
          <meshPhysicalMaterial 
            color={colors.sand} 
            roughness={0.95}
            metalness={0}
          />
        </mesh>

        {/* Ocean waves */}
        <OceanWaves />

        {/* Beach characters */}
        <BeachCharacter 
          position={[-3, -1, 2]} 
          primaryColor={colors.soft_red} 
          swimColor={colors.deep_blue}
        />
        <BeachCharacter 
          position={[2, -1, 3]} 
          primaryColor={colors.plum} 
          swimColor={colors.turquoise}
        />
        <BeachCharacter 
          position={[0, -1, 0]} 
          primaryColor={colors.soft_yellow} 
          swimColor={colors.coral}
        />

        {/* Palm trees */}
        <PalmTree position={[-6, -2, -2]} scale={1.2} />
        <PalmTree position={[6, -2, -3]} scale={0.9} />
        <PalmTree position={[-4, -2, 5]} scale={1} />

        {/* Beach umbrellas */}
        <BeachUmbrella position={[-2, -2, -1]} />
        <BeachUmbrella position={[4, -2, 1]} />

        {/* Sandcastle */}
        <SandCastle position={[0, -1.7, 4]} />

        {/* Beach balls */}
        <BeachBall position={[-4, 0, 0]} />
        <BeachBall position={[3, 0, -2]} />

        {/* Seashells scattered */}
        <Seashell position={[-1, -1.95, 2]} rotation={[0.2, 0.5, 0]} scale={0.3} />
        <Seashell position={[2, -1.95, -1]} rotation={[-0.1, 1.2, 0]} scale={0.4} />
        <Seashell position={[-3, -1.95, -2]} rotation={[0.3, 2.1, 0]} scale={0.25} />
        <Seashell position={[1, -1.95, 1]} rotation={[-0.2, 0.8, 0]} scale={0.35} />

        {/* Floating text */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, 4, -5]}
            fontSize={1.5}
            color={colors.turquoise}
            anchorX="center"
            anchorY="middle"
            font="/fonts/bebas-neue-v9-latin-regular.woff"
          >
            Playa Chamaco
          </Text>
        </Float>

        {/* Decorative clouds */}
        <Cloud position={[-8, 8, -10]} speed={0.2} opacity={0.4} />
        <Cloud position={[8, 7, -12]} speed={0.1} opacity={0.3} />
        <Cloud position={[0, 9, -15]} speed={0.15} opacity={0.35} />
      </group>

      {/* Advanced lighting setup */}
      <Sky 
        distance={450000}
        sunPosition={[5, 5, 5]}
        inclination={0.6}
        azimuth={0.25}
      />
      
      <Environment preset="sunset" intensity={0.6} />
      
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
        shadow-normalBias={0.02}
        shadow-radius={4}
        shadow-blurSamples={25}
      />
      
      {/* Additional soft fill light */}
      <spotLight
        position={[-5, 6, 5]}
        intensity={0.5}
        angle={0.6}
        penumbra={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      
      <ambientLight intensity={0.4} color={colors.soft_yellow} />

      {/* Contact shadows for grounding */}
      <ContactShadows 
        position={[0, -1.99, 0]} 
        opacity={0.5} 
        scale={30} 
        blur={1.5} 
        far={10} 
        color={colors.deep_blue}
      />

      {/* Post-processing effects */}
      <EffectComposer multisampling={8}>
        <SSAO 
          samples={30} 
          radius={0.1} 
          intensity={20} 
          luminanceInfluence={0.1} 
          color="black"
        />
        <Bloom 
          intensity={0.4} 
          luminanceThreshold={0.8} 
          luminanceSmoothing={0.2} 
          mipmapBlur
        />
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.02} 
          bokehScale={2} 
          height={480} 
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0005]}
        />
        <Vignette 
          eskil={false} 
          offset={0.15} 
          darkness={0.3} 
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  )
}

export default ChamacoCoreBeachScene