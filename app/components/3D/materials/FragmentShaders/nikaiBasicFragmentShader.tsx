import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * BaseShaderMaterial Component
 * Pure shader material component - handles vertex + fragment shader creation
 */
const NikaiBasicFragmentShader = ({
  vertexShader = '',
  fragmentShader = '',
  uniforms = {},
  transparent = false,
  side = THREE.FrontSide,
  animate = true,
  ...props
}) => {
  const materialRef = useRef<ShaderMaterial | null>(null);

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
  }, [vertexShader, fragmentShader, uniforms, transparent, side, props]);

  // Animation loop for time-based effects
  useFrame((state) => {
    if (materialRef.current && animate) {
      // Update time uniform if it exists
      if (materialRef.current.uniforms.uTime) {
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  return <shaderMaterial ref={materialRef} attach="material" {...material} />;
};

export default NikaiBasicFragmentShader;