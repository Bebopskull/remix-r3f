/**
 * shaderUniforms.ts
 * Shader Uniforms Configuration for ChamacoCore
 */
import * as THREE from 'three';

// ChamacoCore Color Palette
export const chamacoCoreColors = {
  // Primary Colors
  soft_red: '#FF6B6B',
  turquoise: '#4ECDC4',
  sage_green: '#96CEB4',
  soft_yellow: '#FFEAA7',
  plum: '#DDA0DD',
  
  // Supporting Colors
  terracotta: '#D4856A',
  cream: '#FFF5E6',
  deep_blue: '#2C5F7C',
  sand: '#F4E4C1',
  ocean_blue: '#0077BE',
  coral: '#FF7F50',
  seafoam: '#93E5AB',
  
  // Neutrals
  white: '#F8F8F8',
  light_gray: '#E8E8E8',
  medium_gray: '#B0B0B0',
  dark_gray: '#404040'
};

// Default uniform configurations for each shader type
export const uniformConfigs = {
  clay: {
    uColor: { value: new THREE.Color('#FF6B6B') },
    uTime: { value: 0 },
    uNoiseScale: { value: 8.0 },
    uNoiseIntensity: { value: 0.3 }
  },
  
  water: {
    uColor: { value: new THREE.Color('#4ECDC4') },
    uTime: { value: 0 },
    uWaveSpeed: { value: 2.0 },
    uWaveAmplitude: { value: 0.01 }
  },
  
  gradient: {
    uColor: { value: new THREE.Color('#FF6B6B') },
    uColor2: { value: new THREE.Color('#4ECDC4') },
    uDirection: { value: 0.0 } // 0 = horizontal, 1 = vertical
  }
};

// Helper function to create uniforms with color
export const createUniforms = (type, colorName = 'soft_red', customUniforms = {}) => {
  const baseUniforms = uniformConfigs[type] || uniformConfigs.clay;
  const color = chamacoCoreColors[colorName] || chamacoCoreColors.soft_red;
  
  // Clone base uniforms
  const uniforms = {};
  Object.keys(baseUniforms).forEach(key => {
    uniforms[key] = { value: baseUniforms[key].value.clone ? baseUniforms[key].value.clone() : baseUniforms[key].value };
  });
  
  // Update color
  if (uniforms.uColor) {
    uniforms.uColor.value = new THREE.Color(color);
  }
  
  // Merge custom uniforms
  Object.keys(customUniforms).forEach(key => {
    uniforms[key] = customUniforms[key];
  });
  
  return uniforms;
};