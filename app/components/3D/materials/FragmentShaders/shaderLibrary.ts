/**
 * shaderLibrary.ts
 * Base Shader Library for ChamacoCore materials
 * Contains vertex and fragment shaders as TypeScript string exports
 */

// Default Vertex Shader - handles basic transformations
export const defaultVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vUv = uv;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Clay Fragment Shader - ChamacoCore clay aesthetic
export const clayFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseIntensity;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  // Simple noise function for clay texture
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    // Base color
    vec3 color = uColor;
    
    // Add clay-like surface noise
    vec2 noiseUv = vUv * uNoiseScale;
    float surfaceNoise = noise(noiseUv) * uNoiseIntensity;
    
    // Modify color with noise for clay texture
    color = mix(color, color * 0.8, surfaceNoise);
    
    // Simple lighting calculation
    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
    float NdotL = max(dot(vNormal, lightDir), 0.0);
    
    // Basic ambient + diffuse lighting
    vec3 ambient = color * 0.3;
    vec3 diffuse = color * NdotL * 0.7;
    
    gl_FragColor = vec4(ambient + diffuse, 1.0);
  }
`;

// Water Fragment Shader - for pool/water surfaces
export const waterFragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uWaveSpeed;
  uniform float uWaveAmplitude;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    // Animated water surface
    vec2 waveUv = vUv + sin(vUv * 10.0 + uTime * uWaveSpeed) * uWaveAmplitude;
    
    // Water color with depth variation
    vec3 color = mix(uColor, uColor * 0.5, length(waveUv - 0.5));
    
    // Simple fresnel effect for water reflection
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
    
    color = mix(color, vec3(1.0), fresnel * 0.3);
    
    gl_FragColor = vec4(color, 0.8);
  }
`;

// Simple gradient shader
export const gradientFragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uColor2;
  uniform float uDirection;
  
  varying vec2 vUv;
  
  void main() {
    float gradient = mix(vUv.x, vUv.y, uDirection);
    vec3 color = mix(uColor, uColor2, gradient);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;