/**
 * WaterShaderMaterial.tsx
 * Animated water surface material for pool areas
 */
import React from 'react';
import BaseShaderMaterial from './basicShaderMaterial';
import { defaultVertexShader, waterFragmentShader } from './shaderLibrary';
import { createUniforms } from './shadersUniforms';

/**
 * WaterShaderMaterial Component
 * Animated water surface material for pool areas
 */
const WaterShaderMaterial = ({
  color = 'turquoise',
  waveSpeed = 2.0,
  waveAmplitude = 0.01,
  customUniforms = {},
  animate = true,
  ...props
}) => {
  // Create uniforms for water shader
  const uniforms = createUniforms('water', color, {
    uWaveSpeed: { value: waveSpeed },
    uWaveAmplitude: { value: waveAmplitude },
    ...customUniforms
  });
  
  return (
    <BaseShaderMaterial
      vertexShader={defaultVertexShader}
      fragmentShader={waterFragmentShader}
      uniforms={uniforms}
      transparent={true}
      animate={animate}
      {...props}
    />
  );
};

export default WaterShaderMaterial;