/**
 * PILLAR 2 DELIVERABLE: The 9 Dimensional Forms Shader Scaffold
 * Language: GLSL (WebGL / Three.js CustomShaderMaterial)
 * Features: Dynamic morphing across 3 macro-states:
 *   - Forms 1-3: Physical Metallic PBR Shader
 *   - Forms 4-6: Emissive Cyber Wireframe Glitch Shader
 *   - Forms 7-9: Raymarched Volumetric Particle & Ether Shader
 */

export const PILLAR_2_GLSL_SHADER_CODE = `// ============================================================================
// DRAGON DIMENSIONAL MORPH SHADER (dragon_dimensional_morph.glsl)
// ============================================================================

// --- VERTEX SHADER ---
attribute vec3 aMorphPositionStage2; // Emissive Glitch Mesh Target
attribute vec3 aMorphPositionStage3; // Volumetric Raymarched Particle Target

uniform float uDimension;        // Active Dimension (1.0 to 9.0)
uniform float uTime;             // Time in seconds
uniform float uTemporalDilation; // Dragon 9 Clock Dilation Ratio

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying float vDimensionalWeight;

// Simplex Noise Generator for Quantum Glitch Waves
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vDimensionalWeight = clamp((uDimension - 1.0) / 8.0, 0.0, 1.0);

  vec3 morphedPosition = position;

  // --- STAGE MORPH LOGIC (Forms 1-3 -> 4-6 -> 7-9) ---
  if (uDimension <= 3.0) {
    // Stage 1: Physical Metallic PBR State (Forms 1-3)
    // Minor vertex wave displacement based on Dragon 9 clock
    morphedPosition += normal * sin(uTime * uTemporalDilation + position.y) * 0.05;
  } 
  else if (uDimension <= 6.0) {
    // Stage 2: Emissive Wireframe Glitch State (Forms 4-6)
    float glitchFactor = (uDimension - 3.0) / 3.0;
    float noiseWave = snoise(uv * 10.0 + uTime * 2.0);
    vec3 glitchOffset = vec3(
      sin(uTime * 15.0 + position.y) * 0.15 * noiseWave,
      0.0,
      cos(uTime * 15.0 + position.x) * 0.15 * noiseWave
    );
    morphedPosition = mix(position, aMorphPositionStage2 + glitchOffset, glitchFactor);
  } 
  else {
    // Stage 3: Raymarched Volumetric Particle Ether (Forms 7-9)
    float etherFactor = (uDimension - 6.0) / 3.0;
    float quantumDispersal = snoise(position.xy * 2.0 + uTime * uTemporalDilation);
    vec3 etherExpanded = position + normal * (quantumDispersal * 1.5 * etherFactor);
    morphedPosition = mix(aMorphPositionStage2, etherExpanded, etherFactor);
  }

  vec4 worldPosition = modelMatrix * vec4(morphedPosition, 1.0);
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}


// --- FRAGMENT SHADER ---
uniform float uDimension;
uniform float uTime;
uniform vec3 uPrimaryColor;   // Hex RGB
uniform vec3 uAccentColor;    // Hex RGB

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying float vDimensionalWeight;

void main() {
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  vec3 finalColor = vec3(0.0);
  float alpha = 1.0;

  if (uDimension <= 3.0) {
    // Forms 1-3: Metallic PBR Specular Reflection
    vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
    float diff = max(dot(vNormal, lightDir), 0.2);
    vec3 metallicBase = mix(vec3(0.1, 0.15, 0.2), uPrimaryColor, diff);
    finalColor = metallicBase + vec3(fresnel * 0.8);
  } 
  else if (uDimension <= 6.0) {
    // Forms 4-6: Emissive Wireframe Glitch & Digital Scanlines
    float scanline = sin(vWorldPosition.y * 50.0 + uTime * 10.0) * 0.5 + 0.5;
    vec3 emissiveGlow = mix(uPrimaryColor, uAccentColor, scanline);
    finalColor = emissiveGlow + vec3(fresnel * 2.0);
    alpha = 0.85;
  } 
  else {
    // Forms 7-9: Volumetric Particle Raymarched Omnipresent Light
    float pulse = sin(uTime * 3.0) * 0.5 + 0.5;
    vec3 etherRadiance = mix(vec3(1.0), uPrimaryColor, fresnel);
    finalColor = etherRadiance * (1.5 + pulse);
    alpha = clamp(fresnel + 0.4, 0.2, 0.95);
  }

  gl_FragColor = vec4(finalColor, alpha);
}
`;
