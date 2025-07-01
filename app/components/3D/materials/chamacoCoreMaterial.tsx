import React, { useMemo } from 'react';
import * as THREE from 'three';

// ChamacoCore Color Palette
const chamacoCoreColors = {
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

// Material Type Configurations
const materialTypes = {
  clay: {
    roughness: 0.7,
    metalness: 0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.8
  },
  smooth: {
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1
  },
  matte: {
    roughness: 0.9,
    metalness: 0,
    clearcoat: 0,
    clearcoatRoughness: 1
  },
  glossy: {
    roughness: 0.1,
    metalness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.05
  }
};

/**
 * ParametricMaterial Component
 * Creates a THREE.js material following ChamacoCore aesthetic guidelines
 */
const ParametricMaterial = ({
  // Color properties
  color = 'white',
  customColor = null,
  
  // Material type
  type = 'clay',
  
  // Surface properties
  roughness = 1,
  metalness = 1,
  
  // Advanced properties
  emissive = false,
  emissiveIntensity = 0.1,
  opacity = 1,
  transparent = false,
  
  // Additional options
  side = THREE.FrontSide,
  ...props
}) => {
  const material = useMemo(() => {
    // Get base configuration
    const baseConfig = materialTypes[type] || materialTypes.clay;
    
    // Resolve color
    const finalColor = customColor || chamacoCoreColors[color] || chamacoCoreColors.white;
    
    // Create material
    const mat = new THREE.MeshPhysicalMaterial({
      color: finalColor,
      roughness: baseConfig.roughness * roughness,
      metalness: baseConfig.metalness * metalness,
      clearcoat: baseConfig.clearcoat,
      clearcoatRoughness: baseConfig.clearcoatRoughness,
      opacity: opacity,
      transparent: transparent || opacity < 1,
      side: side,
      ...props
    });
    
    // Add emissive properties
    if (emissive) {
      mat.emissive = new THREE.Color(finalColor);
      mat.emissiveIntensity = emissiveIntensity;
    }
    
    return mat;
  }, [color, customColor, type, roughness, metalness, emissive, emissiveIntensity, opacity, transparent, side, props]);
  
  return <meshPhysicalMaterial attach="material" {...material} />;
};

export default ParametricMaterial;
export { chamacoCoreColors, materialTypes };