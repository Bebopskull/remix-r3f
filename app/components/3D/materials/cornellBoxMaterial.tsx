import React, { useMemo } from 'react';
import * as THREE from 'three';



// **
//  * ParametricMaterial Component
//   * Creates a THREE.js material following ChamacoCore aesthetic guidelines
//     */
const cornellBoxMaterial = ({
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
export {  };
