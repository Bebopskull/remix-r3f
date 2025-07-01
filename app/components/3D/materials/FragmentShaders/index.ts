/**
 * app/components/3D/Materials/index.ts
 * Barrel exports for ChamacoCore shader materials
 */

// Base components
export { default as BaseShaderMaterial } from './basicShaderMaterial';

// Specialized materials
export { default as ClayShaderMaterial } from './clayShaderMaterial';
export { default as WaterShaderMaterial } from './WaterShaderMaterial';

// Utilities and configurations
export { 
  defaultVertexShader, 
  clayFragmentShader, 
  waterFragmentShader,
  gradientFragmentShader 
} from './shaderLibrary';

export { 
  chamacoCoreColors, 
  uniformConfigs, 
  createUniforms, 
} from './shadersUniforms';

export { default as NikaiBasicFragmentShader } from './nikaiBasicFragmentShader';