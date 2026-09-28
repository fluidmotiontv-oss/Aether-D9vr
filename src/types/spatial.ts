export interface DimensionalPlane {
  dimension: number;
  name: string;
  codeName: string;
  harmonicFreq: number; // Hz (432Hz base)
  solfeggioNote: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  glowHex: string;
  description: string;
  morphologyRules: {
    shaderType: 'wireframe' | 'planar' | 'biomechanical' | 'chrono' | 'quantum' | 'plasma' | 'tesseract' | 'singularity' | 'void';
    particleDensity: number;
    volumetricScale: number;
    distortionAmplitude: number;
    opacity: number;
    tailNodes: number;
    spineGlowIntensity: number;
  };
  physics: {
    gravityFactor: number; // relative to 1G
    timeDilationRatio: number; // relative to 1.0
    airViscosity: number; // wind resistance
    quantumJitter: number;
    lightRefractionIndex: number;
  };
}

export interface DragonFlightState {
  speed: number; // knots
  altitude: number; // meters
  pitch: number; // degrees -30 to 30
  yaw: number; // degrees
  roll: number; // degrees -45 to 45
  bankingAngle: number; // degrees
  wingFlapPhase: number; // 0 to 1
  kineticEnergy: number; // 0 to 100
  riftSync: number; // 0 to 100 %
  gForce: number; // Gs
  weightShift: { x: number; y: number }; // -1 to 1
  reinsTension: { left: number; right: number }; // 0 to 1
  currentDimension: number; // 1 to 9
  targetDimension: number; // 1 to 9
  isShifting: boolean;
  shiftProgress: number; // 0 to 1
  autoPilot: boolean;
  flightPattern: 'free' | 'spiral_rift' | 'supersonic_dive' | 'tesseract_orbit' | 'quantum_hover' | 'formation_infinity';
  infinityDualPhase?: {
    phaseOffsetRad: number; // e.g. Math.PI for counter-phase
    scaleRadius: number; // orbital Lemniscate scale
    syncHarmonicRatio: number; // 432Hz / 435.5Hz
    dualAvatarActive: boolean;
  };
}

export interface SpatialTelemetry {
  fps: number;
  frameTimeMs: number;
  gpuDrawCalls: number;
  pointCloudCount: number;
  spatialAudioLatencyMs: number;
  headsetTrackingState: 'OPTICAL_6DOF' | 'SIMULATED_VR' | 'HOLOGRAPHIC_3D' | 'XR_READY';
  ipdMm: number;
  fovDegrees: number;
  leftControllerBattery: number;
  rightControllerBattery: number;
  hapticIntensity: number;
}

export const NINE_DIMENSIONS: DimensionalPlane[] = [
  {
    dimension: 1,
    name: "1D Monomorphic Filament",
    codeName: "MONO-FILAMENT",
    harmonicFreq: 432,
    solfeggioNote: "ROOT (432Hz)",
    primaryColor: "cyan",
    secondaryColor: "blue",
    accentColor: "sky",
    glowHex: "#00f0ff",
    description: "Single-axis linear energy thread. The dragon collapses into a zero-thickness vector beam of coherent light traversing a singular spatial line.",
    morphologyRules: {
      shaderType: 'wireframe',
      particleDensity: 200,
      volumetricScale: 0.2,
      distortionAmplitude: 0.05,
      opacity: 0.95,
      tailNodes: 3,
      spineGlowIntensity: 1.2
    },
    physics: {
      gravityFactor: 0.1,
      timeDilationRatio: 0.2,
      airViscosity: 0.02,
      quantumJitter: 0.0,
      lightRefractionIndex: 1.0
    }
  },
  {
    dimension: 2,
    name: "2D Planar Vector Lattice",
    codeName: "PLANAR-VECTOR",
    harmonicFreq: 528,
    solfeggioNote: "SACRAL (528Hz)",
    primaryColor: "emerald",
    secondaryColor: "teal",
    accentColor: "green",
    glowHex: "#10b981",
    description: "Flat geometric paper-thin topology. The dragon glides along 2D planar manifolds like a living origami shadow silhouette with zero depth thickness.",
    morphologyRules: {
      shaderType: 'planar',
      particleDensity: 400,
      volumetricScale: 0.5,
      distortionAmplitude: 0.1,
      opacity: 0.85,
      tailNodes: 5,
      spineGlowIntensity: 1.5
    },
    physics: {
      gravityFactor: 0.4,
      timeDilationRatio: 0.5,
      airViscosity: 0.1,
      quantumJitter: 0.02,
      lightRefractionIndex: 1.1
    }
  },
  {
    dimension: 3,
    name: "3D Biomechanical Kinetic",
    codeName: "BIOMECH-3D",
    harmonicFreq: 639,
    solfeggioNote: "SOLAR (639Hz)",
    primaryColor: "amber",
    secondaryColor: "orange",
    accentColor: "yellow",
    glowHex: "#f59e0b",
    description: "Standard physical universe. Muscular, scaled biomechanical apex dragon with physical mass, aerodynamic wing lift, and combustion breath engines.",
    morphologyRules: {
      shaderType: 'biomechanical',
      particleDensity: 800,
      volumetricScale: 1.0,
      distortionAmplitude: 0.15,
      opacity: 1.0,
      tailNodes: 9,
      spineGlowIntensity: 2.0
    },
    physics: {
      gravityFactor: 1.0,
      timeDilationRatio: 1.0,
      airViscosity: 1.0,
      quantumJitter: 0.05,
      lightRefractionIndex: 1.33
    }
  },
  {
    dimension: 4,
    name: "4D Chrono-Fold Fluid",
    codeName: "CHRONO-FOLD",
    harmonicFreq: 741,
    solfeggioNote: "HEART (741Hz)",
    primaryColor: "rose",
    secondaryColor: "pink",
    accentColor: "red",
    glowHex: "#f43f5e",
    description: "Temporal persistence corridor. The dragon leaves trailing temporal clones of its past flight vectors, creating a continuous motion ribbon across spacetime.",
    morphologyRules: {
      shaderType: 'chrono',
      particleDensity: 1200,
      volumetricScale: 1.2,
      distortionAmplitude: 0.3,
      opacity: 0.8,
      tailNodes: 12,
      spineGlowIntensity: 2.2
    },
    physics: {
      gravityFactor: 0.7,
      timeDilationRatio: 3.5,
      airViscosity: 0.4,
      quantumJitter: 0.1,
      lightRefractionIndex: 1.5
    }
  },
  {
    dimension: 5,
    name: "5D Quantum Probability Mesh",
    codeName: "QUANTUM-MESH",
    harmonicFreq: 852,
    solfeggioNote: "THROAT (852Hz)",
    primaryColor: "violet",
    secondaryColor: "purple",
    accentColor: "fuchsia",
    glowHex: "#8b5cf6",
    description: "Superposition cloud state. The dragon exists simultaneously in dozens of probable flight trajectories until flight controls collapse the wave function.",
    morphologyRules: {
      shaderType: 'quantum',
      particleDensity: 2000,
      volumetricScale: 1.5,
      distortionAmplitude: 0.5,
      opacity: 0.7,
      tailNodes: 15,
      spineGlowIntensity: 2.8
    },
    physics: {
      gravityFactor: 0.2,
      timeDilationRatio: 5.0,
      airViscosity: 0.05,
      quantumJitter: 0.8,
      lightRefractionIndex: 1.8
    }
  },
  {
    dimension: 6,
    name: "6D Plasma Resonance Wave",
    codeName: "PLASMA-WAVE",
    harmonicFreq: 963,
    solfeggioNote: "THIRD EYE (963Hz)",
    primaryColor: "indigo",
    secondaryColor: "cyan",
    accentColor: "blue",
    glowHex: "#06b6d4",
    description: "Ionized electromagnetic aura. The avatar transforms into high-energy magnetohydrodynamic plasma that flows through dimensional conduits at relativistic speeds.",
    morphologyRules: {
      shaderType: 'plasma',
      particleDensity: 2500,
      volumetricScale: 1.8,
      distortionAmplitude: 0.6,
      opacity: 0.85,
      tailNodes: 18,
      spineGlowIntensity: 3.2
    },
    physics: {
      gravityFactor: 0.05,
      timeDilationRatio: 8.0,
      airViscosity: 0.01,
      quantumJitter: 0.3,
      lightRefractionIndex: 2.1
    }
  },
  {
    dimension: 7,
    name: "7D Tesseract Crystalline Hypergrid",
    codeName: "TESSERACT-GRID",
    harmonicFreq: 1080,
    solfeggioNote: "CROWN (1080Hz)",
    primaryColor: "purple",
    secondaryColor: "violet",
    accentColor: "cyan",
    glowHex: "#a855f7",
    description: "4D hyper-cubic geometry projected into 3D holographic space. Rotating hyper-facets refract surrounding space into kaleidoscopic crystal matrices.",
    morphologyRules: {
      shaderType: 'tesseract',
      particleDensity: 3000,
      volumetricScale: 2.0,
      distortionAmplitude: 0.7,
      opacity: 0.75,
      tailNodes: 21,
      spineGlowIntensity: 3.8
    },
    physics: {
      gravityFactor: 0.0,
      timeDilationRatio: 12.0,
      airViscosity: 0.0,
      quantumJitter: 0.4,
      lightRefractionIndex: 2.8
    }
  },
  {
    dimension: 8,
    name: "8D Hyper-Gravitational Singularity",
    codeName: "GRAV-SINGULARITY",
    harmonicFreq: 1296,
    solfeggioNote: "COSMIC (1296Hz)",
    primaryColor: "fuchsia",
    secondaryColor: "pink",
    accentColor: "rose",
    glowHex: "#d946ef",
    description: "Black-hole core with event-horizon wings. Gravitational lensing warps background starlight into Einstein rings centered around the dragon's heart.",
    morphologyRules: {
      shaderType: 'singularity',
      particleDensity: 4000,
      volumetricScale: 2.2,
      distortionAmplitude: 0.9,
      opacity: 0.9,
      tailNodes: 24,
      spineGlowIntensity: 4.5
    },
    physics: {
      gravityFactor: -2.5, // anti-grav repulsion thrust
      timeDilationRatio: 25.0,
      airViscosity: -0.2, // negative drag vacuum
      quantumJitter: 0.6,
      lightRefractionIndex: 4.0
    }
  },
  {
    dimension: 9,
    name: "9D Celestial Void Ether / Omnipresent Light",
    codeName: "VOID-AETHER",
    harmonicFreq: 1728,
    solfeggioNote: "OMEGA (1728Hz)",
    primaryColor: "sky",
    secondaryColor: "white",
    accentColor: "amber",
    glowHex: "#ffffff",
    description: "Pure divine consciousness & transcendent holographic ether. The dragon is everywhere in the environment simultaneously, radiating pure volumetric light rays.",
    morphologyRules: {
      shaderType: 'void',
      particleDensity: 5000,
      volumetricScale: 2.8,
      distortionAmplitude: 1.0,
      opacity: 0.95,
      tailNodes: 30,
      spineGlowIntensity: 5.0
    },
    physics: {
      gravityFactor: 0.0,
      timeDilationRatio: 100.0,
      airViscosity: 0.0,
      quantumJitter: 1.0,
      lightRefractionIndex: 9.9
    }
  }
];
