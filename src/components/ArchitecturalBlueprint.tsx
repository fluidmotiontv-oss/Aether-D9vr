import React, { useState } from 'react';
import { NINE_DIMENSIONS } from '../types/spatial';
import { FileText, Copy, Download, Check, Layers, Cpu, Radio, Shield, Zap, Sparkles, Code, Terminal } from 'lucide-react';

export const ArchitecturalBlueprint: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'rendering' | 'dimensions' | 'flight' | 'audio' | 'roadmap' | '1d_vs_9d'>('overview');

  const fullMarkdownDoc = `# AETHER-9: VR & HOLOGRAPHIC SPATIAL COMPUTING GAME FRAMEWORK
## Technical Architecture, 9-Dimensional Flight Dynamics & DWENS Media Rendering Pipeline for FluidmotionTV

---

### EXECUTIVE ARCHITECTURAL SUMMARY
AETHER-9 is a complete spatial computing ecosystem designed for Virtual Reality (WebXR/OpenXR) and Volumetric Holographic Displays (e.g., Looking Glass, Spatial Reality displays). The platform bridges real-time WebXR flight mechanics with a headless Node.js media rendering pipeline for automated broadcasting on **FluidmotionTV**.

The temporal physics of the environment are governed by the **Dragon 9 framework (26.66-hour days, 54-minute hours)**, enabling time synchronization during dimensional shifts.

---

### PILLAR 1: THE VR & HOLOGRAPHIC CLIENT (Vite / React / Three.js)

#### 1.1 Holographic Avatar & Diegetic HUD
- **1:1 Volumetric Mapping Pipeline**: Dual-pass volumetric mesh raymarching combined with WebGL/WebGPU instanced point clouds and signed distance fields (SDFs).
- **Diegetic HUD Integration**: Projected UI components rendered in 3D spatial world space attached to the player's wrist/cockpit with glassmorphic transparency (\`backdrop-filter: blur(16px)\`), emitting real-time telemetry (G-force, pitch, roll, kinetic energy, rift synchronization).

#### 1.2 Flight Physics Loop & Dragon 9 Clock Dynamics
- **Dragon 9 Temporal Mechanics**: 26.66-hour days = 95,976s; 54-minute hours = 3,240s. High-speed flight acceleration scales temporal dilation up to 100x.
- **Kinetic Weight-Shifting**: 6DOF VR motion controller rein tension and headset pitch/roll translation into aerodynamic wing lift.

#### DELIVERABLE 1 CODE SCAFFOLD: Vite/Three.js WebXR Client & Flight Loop
See \`src/scaffolds/Pillar1_VRClient.ts\` for full TypeScript boilerplate loading base GLTF cyber dragon, initializing WebXR canvas, establishing \`useFrame\` flight loop, and broadcasting 60Hz telemetry via WebSockets.

---

### PILLAR 2: THE 9 DIMENSIONAL FORMS (WebGL Shaders & Morphology)

The dragon shifts through 9 distinct planes across 3 macro shader stages:
- **Forms 1-3 (Physical State)**: Metallic PBR shader with specularity & specular reflections.
- **Forms 4-6 (Cyber/Energy State)**: Emissive wireframe glitch shader with scanline noise.
- **Forms 7-9 (Ethereal/Time State)**: Raymarched volumetric particle & omnipresent radiant light ether.

| Dim | Code Name | Harmonic Freq | Morphology Type | Physics & Environmental Rules |
| :--- | :--- | :--- | :--- | :--- |
| **1D** | MONO-FILAMENT | 432 Hz | Wireframe Vector | 0.1G Gravity, 0.02 Drag, zero-thickness linear light thread |
| **2D** | PLANAR-VECTOR | 528 Hz | Planar Polygon | 0.4G Gravity, zero-depth flat paper shadow topology |
| **3D** | BIOMECH-3D | 639 Hz | Biomechanical Solid | 1.0G Earth Gravity, 1.0 Air Viscosity, muscular scaled dragon |
| **4D** | CHRONO-FOLD | 741 Hz | Temporal Trail | 0.7G Gravity, 3.5x Time Dilation, persistent temporal clones |
| **5D** | QUANTUM-MESH | 852 Hz | Superposition Cloud | 0.2G Gravity, 0.8 Quantum Jitter, multi-trajectory probability field |
| **6D** | PLASMA-WAVE | 963 Hz | Ionized Plasma | 0.05G Gravity, MHD electromagnetic plasma fluid |
| **7D** | TESSERACT-GRID | 1080 Hz | Hyper-Cubic Crystal | 0.0G Gravity, 12x Time Dilation, rotating 4D hypercube projections |
| **8D** | GRAV-SINGULARITY| 1296 Hz | Black-Hole Core | -2.5G Anti-Gravity Thrust, 25x Time Dilation, gravitational lensing |
| **9D** | VOID-AETHER | 1728 Hz | Omnipresent Ether | 0.0G Gravity, 100x Time Dilation, infinite volumetric radiant light |

#### DELIVERABLE 2 CODE SCAFFOLD: WebGL Dimensional Morph Shader
See \`src/scaffolds/Pillar2_GLSLShader.glsl.ts\` for complete Vertex and Fragment GLSL shader logic (\`dragon_dimensional_morph.glsl\`) morphing mesh geometries across the 3 macro-stages without reloading models.

---

### PILLAR 3: DWENS MEDIA PIPELINE INTEGRATION (Node.js / FFmpeg)

#### 3.1 Telemetry Sync & Headless Rendering Orchestration
- **WebSocket Telemetry Streaming**: Client streams 60Hz spatial telemetry (XYZ coordinates, pitch/roll/yaw, dimensional state) to \`orchestrator.js\`.
- **Headless Context**: \`orchestrator.js\` and \`fluidmotion-companion.js\` launch headless WebGL canvas context to replay telemetry and extract 60fps image sequences.

#### 3.2 Audio & Video Playout for FluidmotionTV
- **432Hz Spatial Audio Synth**: Synthesizes 432Hz harmonic audio track with binaural theta wave offset mapped to flight speed.
- **FFmpeg Broadcast Compilation**: Spawns FFmpeg to compile frame sequence + audio into 4K 60fps broadcast MP4 video streams for FluidmotionTV playout nodes.

#### DELIVERABLE 3 CODE SCAFFOLD: Node.js Orchestrator & FFmpeg Pipeline
See \`src/scaffolds/Pillar3_Orchestrator.ts\` for complete \`orchestrator.js\` Node.js production script receiving WebSocket telemetry, orchestrating headless frame extraction, mixing audio, and executing FFmpeg.

---

### STREAMLINED MVP ROADMAP

1. **Step 1: Front-End VR & WebXR Canvas Setup (Week 1)**
   - Deploy Three.js WebXR boilerplate and load base GLTF cyber dragon model.
2. **Step 2: Shader Transition Matrix Implementation (Week 2)**
   - Compile \`dragon_dimensional_morph.glsl\` and map morph uniforms to 1D-9D controls.
3. **Step 3: WebSocket Telemetry Streaming Integration (Week 3)**
   - Connect client WebSocket stream to Node.js \`orchestrator.js\` endpoint.
4. **Step 4: Headless Frame Extraction & 432Hz Audio Mixing (Week 4)**
   - Execute headless WebGL frame sequence playback and 432Hz spatial audio track synthesis.
5. **Step 5: FFmpeg Broadcast Compilation & FluidmotionTV Playout (Week 5)**
   - Run FFmpeg compilation pipeline to output 60fps MP4 streams and verify broadcast node injection.
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullMarkdownDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([fullMarkdownDoc], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AETHER9_Spatial_Game_Framework_Blueprint.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyan-500/30 space-y-6">
      {/* Header & Export Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-extrabold font-orbitron tracking-wide text-cyan-300 uppercase">
              Technical Architectural Blueprint & Game Framework
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Complete technical specification for 1:1 Volumetric Holographic Mapping, 9-Dimensional Forms, Flight Aerodynamics, and 432Hz Spatial Audio.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="px-3.5 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-700 hover:bg-cyan-900 text-xs font-mono flex items-center space-x-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Spec Document'}</span>
          </button>

          <button
            onClick={downloadFile}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-xs font-mono flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/30"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD Spec</span>
          </button>
        </div>
      </div>

      {/* Blueprint Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Overview & Stack', icon: Cpu },
          { id: 'rendering', label: '1:1 Volumetric Pipeline', icon: Layers },
          { id: 'dimensions', label: '9 Dimensional Forms', icon: Sparkles },
          { id: '1d_vs_9d', label: '1D vs 9D Holographic Comparison', icon: Code },
          { id: 'flight', label: 'Flight Aerodynamics', icon: Zap },
          { id: 'audio', label: '432Hz Spatial Audio', icon: Radio },
          { id: 'roadmap', label: 'MVP Dev Roadmap', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="bg-slate-950/90 rounded-2xl p-5 border border-cyan-500/20 font-sans leading-relaxed">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              System Architecture & Technology Stack
            </h3>
            <p className="text-sm text-slate-300">
              AETHER-9 provides an ultra-low-latency spatial computing engine capable of multi-view volumetric projection and immersive WebXR VR execution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold">FRONTEND SPATIAL ENGINE</div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Three.js WebXR Engine + Custom GLSL Shaders</li>
                  <li>Glassmorphism Glass Tank Shader (Chromatic Aberration + Diffraction)</li>
                  <li>React 19 + TypeScript + Tailwind CSS</li>
                  <li>Web Audio API 432Hz Spatial Panner</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-purple-400 font-bold">NETWORKING & BACKEND</div>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Node.js WebSocket Spatial Orchestration Server</li>
                  <li>60Hz Client Pose Sync & Peer Mesh Networking</li>
                  <li>Gemini 2.5 Flash AI Tactical Oracle Integration</li>
                  <li>WebGPU Compute Shader Fallback</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rendering' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              Holographic Avatar System & 1:1 Volumetric Mapping Pipeline
            </h3>
            <p className="text-sm text-slate-300">
              The avatar rendering engine blends dual-pass raymarching with instanced point cloud particles to produce true 1:1 volumetric depth maps.
            </p>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-200 overflow-x-auto">
              <pre>{`
+-----------------------------------------------------------------------+
|                       1:1 VOLUMETRIC RENDERING PIPELINE               |
+-----------------------------------------------------------------------+
  [ 6DOF Headset Tracking ] ──► [ Joint Inverse Kinematics ]
                                         │
  [ Volumetric Mesh Matrix ] ◄───────────┴──────────► [ Instanced Point Clouds ]
             │                                                  │
             ├───────────────────────┬──────────────────────────┘
             ▼                       ▼
  [ GLSL SDF Raymarcher ]   [ Diegetic Glass HUD ]
             │                       │
             └───────────┬───────────┘
                         ▼
  [ Chromatic Hologram Tank Output (Looking Glass / WebXR) ]
`}</pre>
            </div>
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              The Nine Dimensional Forms (Morphology & Environmental Traversal)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-cyan-500/30 text-cyan-400">
                    <th className="p-2">DIM</th>
                    <th className="p-2">FORM NAME</th>
                    <th className="p-2">FREQ</th>
                    <th className="p-2">MORPHOLOGY TYPE</th>
                    <th className="p-2">PHYSICS / TIME DILATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {NINE_DIMENSIONS.map((d) => (
                    <tr key={d.dimension} className="hover:bg-slate-900/60">
                      <td className="p-2 font-bold text-cyan-300">{d.dimension}D</td>
                      <td className="p-2">{d.name}</td>
                      <td className="p-2 text-emerald-400 font-bold">{d.harmonicFreq}Hz</td>
                      <td className="p-2 text-purple-300">{d.morphologyRules.shaderType}</td>
                      <td className="p-2">{d.physics.gravityFactor}G / {d.physics.timeDilationRatio}x Time</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === '1d_vs_9d' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-orbitron text-cyan-300">
                Visual & Shader Comparison: First Dimension (1D) vs. Ninth Dimension (9D)
              </h3>
            </div>
            <p className="text-sm text-slate-300">
              Detailed comparative architectural specs between the most basic collapsed form (1D Filament) and the ultimate transcendent form (9D Celestial Void Ether).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {/* 1D Monomorphic Filament Specs */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/40 space-y-3">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                  <span className="text-cyan-300 font-bold font-orbitron text-sm">1D MONOMORPHIC FILAMENT</span>
                  <span className="text-cyan-400 font-semibold">432 Hz</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div><strong>Visual Representation:</strong> Single zero-thickness coherent light filament running along a singular vector line. No volumetric thickness or wings.</div>
                  <div><strong>GLSL Shader Technique:</strong> Pure 1D line geometry rendering with additive alpha blending and pulsing 432Hz sine displacement.</div>
                  <div><strong>Particle Density:</strong> Low (200 point field) forming a linear streak.</div>
                  <div><strong>Color Palette:</strong> Coherent Cyan (#00f0ff) with zero shadow casting.</div>
                  <div><strong>Spatial Presence:</strong> Hyper-focused, knife-like precision cutting through space along one motion axis.</div>
                </div>
              </div>

              {/* 9D Celestial Void Ether Specs */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-amber-500/40 space-y-3">
                <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
                  <span className="text-amber-300 font-bold font-orbitron text-sm">9D CELESTIAL VOID ETHER</span>
                  <span className="text-amber-400 font-semibold">1728 Hz</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div><strong>Visual Representation:</strong> Transcendent omnipresent radiant volumetric entity occupying the entire room/display simultaneously.</div>
                  <div><strong>GLSL Shader Technique:</strong> Volumetric 3D Noise Raymarching with refractive god rays, chromatic bloom, and 100x time dilation refraction.</div>
                  <div><strong>Particle Density:</strong> Maximum (5,000+ points) forming an atmospheric stellar aura.</div>
                  <div><strong>Color Palette:</strong> Prismatic White-Gold (#ffffff / #f59e0b) with volumetric light shafts.</div>
                  <div><strong>Spatial Presence:</strong> Omnipresent light entity existing everywhere in the holographic volume at once.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flight' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              Flight Aerodynamics, Reins Telemetry & Time Synchronization
            </h3>
            <p className="text-sm text-slate-300">
              Aerodynamic lift equations, 6DOF motion controller rein dynamics, and time dilation rift mechanics.
            </p>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
              <div className="text-cyan-300 font-bold">AERODYNAMIC DYNAMICS FORMULAS</div>
              <div>Lift Force = 0.5 * AirViscosity * (Velocity^2) * WingArea * Sin(PitchAngle)</div>
              <div>Banking G-Force = 1 / Cos(RollAngle)</div>
              <div>Time Dilation Factor = BaseTime * DimensionDilationRatio * (RiftSyncPercent / 100)</div>
            </div>
          </div>
        )}

        {activeTab === 'audio' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              432Hz Spatial Audio Framework Architecture
            </h3>
            <p className="text-sm text-slate-300">
              Real-time Web Audio API synthesizer with Solfeggio tuning, HRTF 3D spatialization, and Doppler pitch shifting.
            </p>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
              <div><strong>Base Tuning:</strong> A = 432 Hz (Natural harmonic resonance)</div>
              <div><strong>Binaural Offset:</strong> +3.5 Hz theta wave generator for cognitive immersion</div>
              <div><strong>Spatial Model:</strong> Head-Related Transfer Function (HRTF) with 3D listener orientation</div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-cyan-300">
              Discrete Step-by-Step Development Roadmap for MVP
            </h3>
            <div className="space-y-3 text-xs font-mono">
              {[
                { phase: 'PHASE 1', title: 'WebXR & Holographic Renderer Core', desc: 'Initialize Three.js dual-camera holographic shader tank and WebXR session entry.' },
                { phase: 'PHASE 2', title: '9-Dimensional Morphology Shaders', desc: 'Construct GLSL vertex/fragment shaders for 1D to 9D dragon transformations.' },
                { phase: 'PHASE 3', title: 'Aerodynamic Flight & Reins Mechanics', desc: 'Integrate WebXR 6DOF controller hand poses and weight-shifting physics.' },
                { phase: 'PHASE 4', title: '432Hz Spatial Audio Engine & Diegetic HUD', desc: 'Implement Web Audio API synth and glassmorphic spatial wrist HUD.' },
                { phase: 'PHASE 5', title: 'Multiplayer Mesh Sync & WebGPU Optimization', desc: 'Deploy WebSocket pose sync server and validate sub-11ms frame times.' }
              ].map((p, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-cyan-500/20 flex space-x-3 items-start">
                  <span className="px-2 py-1 bg-cyan-950 text-cyan-300 rounded font-bold">{p.phase}</span>
                  <div>
                    <div className="text-slate-200 font-bold">{p.title}</div>
                    <div className="text-slate-400 mt-0.5">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
