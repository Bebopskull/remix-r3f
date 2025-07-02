import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, 
  useFrame, 
  useThree, 
  useLoader,
} from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Text,
  useTexture,
  Environment,
  useGLTF
} from '@react-three/drei';
import { ModelLoader,
  SceneLoader,
  GLTFModel, 
  AutoScaledGLTFScene, 
  CompositeGLTFScene, 
  GLTFSceneWithLoader, 
  LoadingScreen 
} from '../Utilities/GLTFLoaders';

import { NikaiBasicFragmentShaderFixed, nikaiVertexShader, nikaiFragmentShader } from './CornellBoxWithNikaiShader';

import * as THREE from 'three';


// Cornell Box Container //carga el cornellBoxTest_fromFBXtoGLTF.gltf
const CornellBox = () => {
  const {scene, materials, nodes, animations} = useGLTF('/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf');
  // const { scene, materials, nodes, animations } = useGLTF('/models/GLTF_Normals/CornellBoxTest_BigLevel.gltf');
  // const {scene, materials, nodes, animations} = useGLTF('models/GLTF_Normals/CornellBoxTest_Level.gltf');
  console.log('imported nodes =>', nodes);
  const { size, pointer } = useThree();

  // Define uniforms
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

  // const testMaterial = new THREE.ShaderMaterial({
  //   uniforms: uniforms,
  //   vertexShader: nikaiVertexShader,
  //   fragmentShader: nikaiFragmentShader,
  //   transparent: false,
  //   // side: THREE.DoubleSide
  // });

  const testMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: nikaiVertexShader,
      fragmentShader: nikaiFragmentShader,
      // side: THREE.DoubleSide,
      transparent: false
    });
  }, [uniforms]);

  

  //accessing full scene
  const fullScene = scene;
  // console.log(fullScene);

  //accesing specific elements
  const box = nodes.cornellBoxTestFBX; 
  const floor= nodes.cornellBoxTestFBX_1;  
  console.log('box =>', box);

  var boxMaterial = materials.MI_PaintedWall_CornellBoxText;
  const nikaiMaterial = NikaiBasicFragmentShaderFixed({
    vertexShader: nikaiVertexShader,
    fragmentShader: nikaiFragmentShader,
    uniforms: uniforms,
  });


  // Update uniforms
  useFrame((state) => {
    if (testMaterial) {
      testMaterial.uniforms.u_time.value = state.clock.elapsedTime;
      testMaterial.uniforms.u_mouse.value.set(
        pointer.x * size.width,
        pointer.y * size.height
      );
      testMaterial.uniforms.u_resolution.value.set(size.width, size.height);
    }

    // Also update test material
    if (testMaterial.uniforms.u_time) {
      testMaterial.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  // boxMaterial.color.set(0xff0000);
  // boxMaterial.color.set(nikaiMaterial.nikaiFragmentShader.gl_FragColor);
  console.log('nikaiMaterial =>', nikaiMaterial);
  console.log('testMaterial =>', testMaterial);
  // boxMaterial = nikaiMaterial;

  return (
    <group>
      {/* <mesh  object={fullScene} scale={0.1}/>  */}
      {/* <mesh geometry={floor.geometry} material={materials.Material_2} scale={0.1}/>  */}
      <mesh geometry={box.geometry} 
      scale={0.1} 
      material={testMaterial} 
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      /> 
         {/* <NikaiBasicFragmentShaderFixed
          vertexShader={nikaiVertexShader}
          fragmentShader={nikaiFragmentShader}
          uniforms={nikaiMaterial.uniforms}
         /> */}
      <mesh/>
      <mesh position={[5, 0, 0]} material={testMaterial}>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>
      <mesh geometry={floor.geometry} scale={0.01} material={boxMaterial}/> 
    </group>
  );
};

//accessing fullgltf scene

//   return (
//     <group>
//       <mesh>
//         <primitive object={fullScene} scale={0.1} material={nikaiMaterial}/>;
//         {/* <boxGeometry args={[1, 1, 1]} />*/}
        
//       </mesh>
//       {/* <GLTFModel modelPath="/models/GLTF_exports/cornellBoxTest_fromFBXtoGLTF.gltf" modelScale={0.1} /> */}
//     </group>
//   )
// }

// Gallery Lighting System
const GalleryLighting = () => {
  return (
    <group>
      {/* Main area light from above */}
      <rectAreaLight
        position={[0, 9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={1.2*10}
        height={1.2*10}
        intensity={3.5}
        color="#FFFAF0" // Warm white
      />
      
      {/* Fill lights for even illumination */}
      <pointLight 
        position={[-2*10, 1*10, 0]} 
        intensity={0.4} 
        color="#FFFFF0"
        castShadow={false}
      />
      <pointLight 
        position={[2*10, 1*10, 0]} 
        intensity={0.4} 
        color="#FFFFF0"
        castShadow={false}
      />
      <pointLight 
        position={[0, 1*10, -2*10]} 
        intensity={0.3} 
        color="#F0F8FF"
        castShadow={false}
      />
      
      {/* Ambient light for overall fill */}
      <ambientLight intensity={0.2} color="#F8F8FF" />
    </group>
  );
};


// Main Gallery Component
const CornellBoxGallery = ({ projectIndex = 0, onProjectChange }: { projectIndex?: number, onProjectChange?: (idx: number) => void }) => {
  // Remove useState for currentProject, expect it as a prop for controlled usage
  // Remove outer <div> and <Canvas>, return a <group> instead
  return (
    <group>
      {/* CameraController is not needed, camera is controlled by parent Canvas */}
      {/* Cornell Box Structure */}
      <CornellBox />
      {/* Central Morphing Object */}
      {/* <CentralObject projectIndex={projectIndex} /> */}
      {/* Gallery Lighting */}
      <GalleryLighting />
      {/* Interaction System - only if onProjectChange is provided */}
      {/* {onProjectChange && <InteractionHandler onProjectChange={onProjectChange} />} */}
      {/* Camera Controls are handled by parent Canvas */}
      {/* UI Instructions: To add overlay UI, use <Html> from drei or handle in parent */}
    </group>
  );
};

export default CornellBoxGallery;