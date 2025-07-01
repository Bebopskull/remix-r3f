import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Import your NikaiBasicFragmentShader component
// import NikaiBasicFragmentShader from './nikaiBasicFragmentShader';

// Fixed NikaiBasicFragmentShader component (with proper TypeScript)
const NikaiBasicFragmentShaderFixed = ({
  vertexShader = '',
  fragmentShader = '',
  uniforms = {},
  transparent = false,
  side = THREE.FrontSide,
  animate = true,
  ...props
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create the shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent,
      side,
      ...props
    });
  }, [vertexShader, fragmentShader, uniforms, transparent, side]);

  // Animation loop for time-based effects
  useFrame((state) => {
    if (materialRef.current && animate) {
      // Update time uniform if it exists
      if (materialRef.current.uniforms.u_time) {
        materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      }
      // Update mouse position if it exists
      if (materialRef.current.uniforms.u_mouse) {
        materialRef.current.uniforms.u_mouse.value.x = state.mouse.x * state.size.width;
        materialRef.current.uniforms.u_mouse.value.y = state.mouse.y * state.size.height;
      }
    }
  });

  return <primitive object={material} attach="material" ref={materialRef} />;
};

// Your shaders
const nikaiVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }

//old code///
  // varying vec2 vUv;
  // varying vec3 vPosition;

  // void main() {
  //   vPosition = position;
  //   vUv = uv;
  //   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // }
`;

// Fixed fragment shader (removed 'null' and added proper output)
// const nikaiFragmentShader = `
//   uniform vec3 u_color;
//   uniform vec2 u_resolution;
//   uniform vec2 u_mouse;
//   uniform float u_time;

//   #define PI 3.141592653589
//   #define PI2 6.28318530718

//   uniform sampler2D u_tex;
//   uniform sampler2D v_tex;

//   uniform vec3 u_LightColor;
//   uniform vec3 u_DarkColor;
//   uniform float u_Frequency;
//   uniform float u_NoiseScale;
//   uniform float u_RingScale;
//   uniform float u_Contrast;

//   uniform float index2;

//   varying vec3 vPosition;
//   varying vec2 vUv;

//   // Simple noise function (since THREE doesn't include noise by default)
//   float snoise(vec3 p) {
//     return fract(sin(dot(p, vec3(12.9898, 78.233, 543.21))) * 43758.5453);
//   }

//   vec2 rotate(vec2 pt, float teta) {
//     float c = cos(teta);
//     float s = sin(teta);
//     mat2 mat = mat2(c, s, -s, c);
//     return mat * pt;
//   }

//   float random(vec3 vPos) {
//     const float a = 1122.9898;
//     const float b = 78.233;
//     const float c = 43758.543123;
//     return fract(sin(dot(vPos.xy * (u_time / 20.0), vec2(a, b))) * c);
//   }

//   void main(void) {
//     // Tree/wood effect
//     float i_Frequency = u_time * 20.0;
//     float i_Scale = u_time / 20.0;

//     float n = snoise((vPosition) * (u_time / 200.0));
    
//     float ring = fract(i_Frequency * (vPosition.z) + (i_Scale) * fract(n * 20.0));
//     ring *= u_Contrast * (1.8 - ring);

//     float lerp = pow(ring, u_RingScale) + (n * sin(u_time));
//     vec3 wood = mix(u_DarkColor, u_LightColor, lerp);

//     vec3 grain = random(vPosition) * vec3(1.0, 1.0, 1.0);

//     vec2 center = vec2(0.5, 0.5);
//     vec2 st = rotate(vPosition.xy - center, PI / 2.0) + center;

//     vec3 color = vec3(1.0 * vPosition.x, 1.0 * vPosition.y, vPosition.z);

//     // Base texture effect
//     vec2 st1 = gl_FragCoord.xy / (u_resolution * 2.0);
//     vec2 m = ((vec2(-0.1 * u_mouse.x, u_mouse.y + 1.0) * 0.0005 + 0.5));
    
//     // vec4 base = vec4(st1.y * 3.0, sin((st1.y / 0.005) / (m * 0.05)), step(cos(st1.y) / m, m, 1.0));
//     vec3 baseColor = vec3(st.x, st.y, 0.5 + 0.5 * sin(u_time))

//     // Combine effects
//     // vec3 finalColor = wood + grain + baseColor * 0.3;

//     // gl_FragColor = finalColor;
//     // gl_FragColor = vec4(.5, 0.0, 1.0, 1.0);
//     gl_FragColor = vec4(baseColor, 1.0);
//   }
// `;
///new code///
const nikaiFragmentShader = `
  uniform vec3 u_color;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  #define PI 3.141592653589
  #define PI2 6.28318530718

  uniform sampler2D u_tex;
  uniform sampler2D v_tex;

  uniform vec3 u_LightColor;
  uniform vec3 u_DarkColor;
  uniform float u_Frequency;
  uniform float u_NoiseScale;
  uniform float u_RingScale;
  uniform float u_Contrast;

  uniform float index2;

  varying vec3 vPosition;
  varying vec2 vUv;

  // Simple noise function (since THREE doesn't include noise by default)
  float snoise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 543.21))) * 43758.5453);
  }

  vec2 rotate(vec2 pt, float teta) {
    float c = cos(teta);
    float s = sin(teta);
    mat2 mat = mat2(c, s, -s, c);
    return mat * pt;
  }

  float random(vec3 vPos) {
    const float a = 1122.9898;
    const float b = 78.233;
    const float c = 43758.543123;
    return fract(sin(dot(vPos.xy * (u_time / 20.0), vec2(a, b))) * c);
  }

  void main(void) {
    // Tree/wood effect
    float i_Frequency = u_time * 20.0;
    float i_Scale = u_time / 20.0;

    float n = snoise((vPosition) * (u_time / 200.0));
        
    float ring = fract(i_Frequency * (vPosition.z) + (i_Scale) * fract(n * 20.0));
    ring *= u_Contrast * (1.8 - ring);

    float lerp = pow(ring, u_RingScale) + (n * sin(u_time));
    vec3 wood = mix(u_DarkColor, u_LightColor, lerp);

    vec3 grain = random(vPosition) * vec3(1.0, 1.0, 1.0);

    vec2 center = vec2(0.5, 0.5);
    vec2 st = rotate(vPosition.xy - center, PI / 2.0) + center;

    vec3 color = vec3(1.0 * vPosition.x, 1.0 * vPosition.y, vPosition.z);

    // Base texture effect - FIXED VERSION
    vec2 st1 = gl_FragCoord.xy / (u_resolution * 2.0);
    vec2 m = ((vec2(-0.1 * u_mouse.x, u_mouse.y + 1.0) * 0.0005 + 0.5));
    
    // Prevent division by zero/very small numbers
    m = max(m, vec2(0.001));
    
    // Simplified and safer calculation
    float r = st1.y * 3.0;
    float g = sin((st1.y / 0.005) / (m.x * 0.05));
    float b = step(cos(st1.y) / m.x, m.y);
    
    vec4 base = vec4(r, g, b, 1.0); // Added alpha component
    
    // Alternative safer version:
    // vec4 base = vec4(
    //   clamp(st1.y * 3.0, 0.0, 1.0),
    //   clamp(sin(st1.y * 200.0 / max(m.x, 0.001)), 0.0, 1.0),
    //   step(0.5, mod(st1.x + st1.y, 0.2)),
    //   1.0
    // );

    gl_FragColor = base;
  }
`;

// Cornell Box with Nikai Shader
const CornellBoxWithNikaiShader = () => {
  const { scene } = useGLTF('/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf');
  const { size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>();

  // Define uniforms
  // const uniforms = useMemo(() => ({
  //   u_time: { value: 0 },
  //   u_resolution: { value: new THREE.Vector2(size.width, size.height) },
  //   u_mouse: { value: new THREE.Vector2(0, 0) },
  //   u_color: { value: new THREE.Color(0xffa000) },
  //   u_tex: { value: null }, // Add texture if needed
  //   v_tex: { value: null },
  //   u_LightColor: { value: new THREE.Color(0xffffff) },
  //   u_DarkColor: { value: new THREE.Color(0x654321) },
  //   u_Frequency: { value: 1.0 },
  //   u_NoiseScale: { value: 1.0 },
  //   u_RingScale: { value: 1.0 },
  //   u_Contrast: { value: 1.0 },
  //   index2: { value: 0 }
  // }), [size]);

  const uniforms = useMemo(() => ({
    u_time: { value: 0.0 },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
    u_mouse: { value: new THREE.Vector2(0, 0) }, // Add this
    u_LightColor: { value: new THREE.Color(0xbb905d) },
    u_DarkColor: { value: new THREE.Color(0x7d490b) },
    u_Frequency: { value: 6.0 },
    u_NoiseScale: { value: 12.0 },
    u_RingScale: { value: 0.6 },
    u_Contrast: { value: 4.0 }
  }), [size]);

  

  // Clone scene to avoid modifying cached version
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Apply shader material to all meshes
  useEffect(() => {
    if (materialRef.current) {
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = materialRef.current;
        }
      });
    }
  }, [clonedScene]);

  return (
    <group>
      {/* Create a mesh with the shader material */}
      <mesh visible={false}>
        <boxGeometry args={[1, 1, 1]} />
        <NikaiBasicFragmentShaderFixed
          ref={materialRef}
          vertexShader={nikaiVertexShader}
          fragmentShader={nikaiFragmentShader}
          uniforms={uniforms}
          transparent={false}
          side={THREE.FrontSide}
          animate={true}
        />
      </mesh>
      
      {/* Render the cloned scene */}
      <primitive object={clonedScene} scale={0.1} />
    </group>
  );
};

// Alternative: Direct implementation without the component
const CornellBoxDirectShader = () => {
  const { scene } = useGLTF('/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf');
  const { size, mouse } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>();

  // Create shader material directly
  useEffect(() => {
    const material = new THREE.ShaderMaterial({
      vertexShader: vshader,
      fragmentShader: fshader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_color: { value: new THREE.Color(0xff0000) },
        u_tex: { value: null },
        v_tex: { value: null },
        u_LightColor: { value: new THREE.Color(0xffffff) },
        u_DarkColor: { value: new THREE.Color(0x654321) },
        u_Frequency: { value: 1.0 },
        u_NoiseScale: { value: 1.0 },
        u_RingScale: { value: 1.0 },
        u_Contrast: { value: 1.0 },
        index2: { value: 0 }
      },
      side: THREE.DoubleSide
    });

    materialRef.current = material;

    // Apply to all meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
  }, [scene, size]);

  // Update uniforms
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.u_mouse.value.x = mouse.x * size.width;
      materialRef.current.uniforms.u_mouse.value.y = mouse.y * size.height;
    }
  });

  return <primitive object={scene} scale={0.1} />;
};

// Simple example with basic shader for testing
const CornellBoxSimpleTest = () => {
  const { scene } = useGLTF('/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf');
  
  // Simple test shader
  const simpleVert = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const simpleFrag = `
    uniform float u_time;
    varying vec2 vUv;
    void main() {
      vec3 color = vec3(vUv.x, vUv.y, sin(u_time) * 0.5 + 0.5);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    u_time: { value: 0 }
  }), []);

  return (
    <group>
      <mesh>
        <boxGeometry />
        <primitive object={scene} scale={0.1} />
        <NikaiBasicFragmentShaderFixed
          vertexShader={simpleVert}
          fragmentShader={simpleFrag}
          uniforms={uniforms}
          animate={true}
        />
      </mesh>
    </group>
  );
};

export { CornellBoxWithNikaiShader, 
  CornellBoxDirectShader, 
  CornellBoxSimpleTest, 
  NikaiBasicFragmentShaderFixed, 
  nikaiVertexShader, 
  nikaiFragmentShader,
  NikaiBasicFragmentShader
};
export default CornellBoxWithNikaiShader;