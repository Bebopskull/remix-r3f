import React from 'react';
import NikaiBasicFragmentShader from './FragmentShaders/nikaiBasicFragmentShader';
import { defaultVertexShader, clayFragmentShader } from './shaderLibrary';
import { createUniforms } from './tools/shaderUniforms';

/**
 * ClayShaderMaterial Component
 * Specialized clay material following ChamacoCore aesthetic
 */
const ClayShaderMaterial = ({
  color = 'soft_red',
  noiseScale = 8.0,
  noiseIntensity = 0.3,
  customUniforms = {},
  animate = true,
  ...props
}) => {
  // Create uniforms for clay shader
  const uniforms = createUniforms('clay', color, {
    uNoiseScale: { value: noiseScale },
    uNoiseIntensity: { value: noiseIntensity },
    ...customUniforms
  });
  
  return (
    <NikaiBasicFragmentShader
      vertexShader={defaultVertexShader}
      fragmentShader={clayFragmentShader}
      uniforms={uniforms}
      animate={animate}
      {...props}
    />
  );
};

export default ClayShaderMaterial;