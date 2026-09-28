import React, { useState } from 'react';
import { Layers, Zap, Server, HardDrive, CheckCircle2, RefreshCw, Send, ArrowRight, Radio, Cpu, Shield, FolderDown } from 'lucide-react';
import { PdfExportButton } from './PdfExportButton';

export interface FamilySeat {
  seatNumber: number;
  agentName: string;
  roleDescription: string;
  status: 'ACTIVE' | 'ROUTING' | 'STANDBY' | 'COMPLETED' | 'SYNCING';
  currentPayload: string;
  destinationRoute: string;
  seatCategory: 'VR_CLIENT' | 'SHADER_GEOMETRY' | 'DWENS_PIPELINE' | 'BROADCAST_AUDIO' | 'LOGISTICS_STORAGE';
}

export const INITIAL_27_SEATS: FamilySeat[] = [
  { seatNumber: 1, agentName: "Master Spatial Architect", roleDescription: "WebXR 6DOF Flight & Scene Orchestrator", status: "ACTIVE", currentPayload: "CyberDragonVRClient.tsx (v2.4)", destinationRoute: "/src/scaffolds/Pillar1_VRClient.ts", seatCategory: "VR_CLIENT" },
  { seatNumber: 2, agentName: "GLSL Shader Synthesizer", roleDescription: "1D-9D Morph & Glitch Shader Logic", status: "COMPLETED", currentPayload: "dragon_dimensional_morph.glsl", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 3, agentName: "DWENS WebSocket Gateway", roleDescription: "60Hz Spatial Telemetry Receiver & Buffer", status: "ACTIVE", currentPayload: "telemetry_stream_60hz.json", destinationRoute: "ws://localhost:8080/telemetry", seatCategory: "DWENS_PIPELINE" },
  { seatNumber: 4, agentName: "Headless Frame Extractor", roleDescription: "fluidmotion-companion.js 60fps Rendering", status: "ROUTING", currentPayload: "frame_00000.png - frame_03600.png", destinationRoute: "/renders/frames/job_1728/", seatCategory: "DWENS_PIPELINE" },
  { seatNumber: 5, agentName: "432Hz Audio Synthesizer", roleDescription: "Binaural Theta Beat Spatial Oscillator", status: "ACTIVE", currentPayload: "spatial_audio_432hz_theta.wav", destinationRoute: "/renders/audio/job_1728.wav", seatCategory: "BROADCAST_AUDIO" },
  { seatNumber: 6, agentName: "FFmpeg Broadcast Compiler", roleDescription: "4K 60fps H.264 Video Muxing Engine", status: "ROUTING", currentPayload: "fluidmotion_dragon9_job1728.mp4", destinationRoute: "/renders/broadcast_mp4/", seatCategory: "DWENS_PIPELINE" },
  { seatNumber: 7, agentName: "Dragon 9 Temporal Engine", roleDescription: "26.66h Day / 54m Hour Dilation Calculations", status: "ACTIVE", currentPayload: "D9_Dilation_Factor_1.1108x", destinationRoute: "/src/types/spatial.ts", seatCategory: "VR_CLIENT" },
  { seatNumber: 8, agentName: "Infinity Flight Director", roleDescription: "Lemniscate of Bernoulli Counter-Phase Loop", status: "ACTIVE", currentPayload: "Formation_Infinity_Dual_Phase_Matrix", destinationRoute: "/src/components/HolographicCanvas.tsx", seatCategory: "VR_CLIENT" },
  { seatNumber: 9, agentName: "FluidmotionTV Broadcast Node", roleDescription: "Playout Queue & Live Stream Injection", status: "SYNCING", currentPayload: "fluidmotion_dragon9_stream.mp4", destinationRoute: "rtmp://broadcast.fluidmotion.tv/live", seatCategory: "DWENS_PIPELINE" },
  { seatNumber: 10, agentName: "Gemini AI Tactical Oracle", roleDescription: "Real-Time Spatial Computing Advisor", status: "ACTIVE", currentPayload: "Gemini 2.5 Flash Telemetry Context", destinationRoute: "/src/services/geminiOracle.ts", seatCategory: "VR_CLIENT" },
  { seatNumber: 11, agentName: "1:1 Volumetric Avatar Mapper", roleDescription: "Dual-Pass SDF & Point Cloud Generator", status: "COMPLETED", currentPayload: "Volumetric_Mesh_Depth_Map_v2", destinationRoute: "/src/components/HolographicCanvas.tsx", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 12, agentName: "Diegetic Glassmorphism Engineer", roleDescription: "Wrist & Cockpit Spatial UI Renderer", status: "COMPLETED", currentPayload: "DiegeticHUD_Wrist_Display.tsx", destinationRoute: "/src/components/DiegeticHUD.tsx", seatCategory: "VR_CLIENT" },
  { seatNumber: 13, agentName: "Kinematic Reins & Telemetry Rig", roleDescription: "Left/Right Hand Controller Tension Logic", status: "ACTIVE", currentPayload: "Reins_Tension_Tensors_{L:0.5, R:0.5}", destinationRoute: "/src/components/FlightControlDeck.tsx", seatCategory: "VR_CLIENT" },
  { seatNumber: 14, agentName: "Quantum Probability Mesh Agent", roleDescription: "5D Superposition Wave Function Collapse", status: "STANDBY", currentPayload: "Quantum_Jitter_Uniform_0.8", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 15, agentName: "Plasma Wave Generator", roleDescription: "6D Magnetohydrodynamic Ionized Fluid", status: "STANDBY", currentPayload: "MHD_Plasma_Resonance_963Hz", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 16, agentName: "Tesseract Hypercube Agent", roleDescription: "7D Hyper-Cubic Geometric Rotator", status: "STANDBY", currentPayload: "4D_Facet_Projection_Matrix", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 17, agentName: "Gravitational Lensing Engine", roleDescription: "8D Black Hole Event Horizon Distortion", status: "STANDBY", currentPayload: "Einstein_Ring_Refraction_Index_4.0", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 18, agentName: "Void Ether Light Raymarcher", roleDescription: "9D Celestial Volumetric God-Ray Shader", status: "STANDBY", currentPayload: "Omnipresent_Aether_Light_Array", destinationRoute: "/src/scaffolds/Pillar2_GLSLShader.glsl.ts", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 19, agentName: "Haptic Feedback Trigger Agent", roleDescription: "Controller Vibration Pulse Dispatcher", status: "ACTIVE", currentPayload: "VR_Haptic_Pulse_100ms", destinationRoute: "WebXR_Gamepad_Haptics_API", seatCategory: "VR_CLIENT" },
  { seatNumber: 20, agentName: "WebGPU Acceleration Dispatcher", roleDescription: "Compute Shader Fallback Manager", status: "ACTIVE", currentPayload: "WebGPU_Pipeline_State_Valid", destinationRoute: "WebGPU_Device_Context", seatCategory: "SHADER_GEOMETRY" },
  { seatNumber: 21, agentName: "Node.js Orchestrator Monitor", roleDescription: "DWENS Server Status & Health Check", status: "ACTIVE", currentPayload: "orchestrator.js (Port 8080)", destinationRoute: "/src/scaffolds/Pillar3_Orchestrator.ts", seatCategory: "DWENS_PIPELINE" },
  { seatNumber: 22, agentName: "Spatial Audio Doppler Panner", roleDescription: "HRTF 3D Listener Orientation Unit", status: "ACTIVE", currentPayload: "PannerNode_HRTF_3D_Vector", destinationRoute: "/src/services/spatialAudio.ts", seatCategory: "BROADCAST_AUDIO" },
  { seatNumber: 23, agentName: "MP4 Playout Queue Manager", roleDescription: "FluidmotionTV Automated Broadcast Loop", status: "SYNCING", currentPayload: "Broadcast_Playout_Queue_Job1728", destinationRoute: "/renders/broadcast_mp4/", seatCategory: "LOGISTICS_STORAGE" },
  { seatNumber: 24, agentName: "Asset Vault & Packaging Officer", roleDescription: "ZIP & Manifest Packaging Authority", status: "ACTIVE", currentPayload: "AETHER9_Complete_Codebase_Manifest.json", destinationRoute: "/renders/vault/", seatCategory: "LOGISTICS_STORAGE" },
  { seatNumber: 25, agentName: "Cold Archive Sync Engine", roleDescription: "Historical Flight Session Backup System", status: "SYNCING", currentPayload: "dragon9_session_backup_1728.tar.gz", destinationRoute: "/renders/archive/", seatCategory: "LOGISTICS_STORAGE" },
  { seatNumber: 26, agentName: "Performance Latency Validator", roleDescription: "Frame Budget Sub-11ms Enforcement", status: "ACTIVE", currentPayload: "90FPS_11.1ms_FrameTime_PASS", destinationRoute: "/src/types/spatial.ts", seatCategory: "VR_CLIENT" },
  { seatNumber: 27, agentName: "Master Production Runner", roleDescription: "Logistical Powerhouse & Ecosystem Dispatcher", status: "ACTIVE", currentPayload: "Family_Table_27_Seats_Routing_Active", destinationRoute: "ALL_SYSTEM_NODES", seatCategory: "LOGISTICS_STORAGE" }
];

export const FamilyTableDashboard: React.FC = () => {
  const [seats, setSeats] = useState<FamilySeat[]>(INITIAL_27_SEATS);
  const [isRoutingActive, setIsRoutingActive] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [dispatchLog, setDispatchLog] = useState<string[]>([
    "[Master Production Runner] System Initialized. All 27 seats active at The Family Table.",
    "[Logistics] Storage Vaults, Dev Directories, and FluidmotionTV Broadcast Node synchronized."
  ]);

  const triggerPipelineDispatch = () => {
    setIsRoutingActive(true);
    setDispatchLog((prev) => [
      `[COMMAND ACKNOWLEDGED] Master Production Runner activating 27 seats at The Family Table.`,
      `[LOGISTICS DISPATCH] Packaging assets: WebXR Client, GLSL Shaders, DWENS WebSocket Telemetry, 432Hz Audio & FFmpeg .mp4...`
    ]);

    setTimeout(() => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => ({
          ...seat,
          status: seat.seatNumber % 2 === 0 ? 'COMPLETED' : 'ROUTING'
        }))
      );
      setDispatchLog((prev) => [
        ...prev,
        `[ROUTING IN PROGRESS] Assets packaged and moving to /src/scaffolds/ and /renders/broadcast_mp4/...`
      ]);
    }, 800);

    setTimeout(() => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => ({
          ...seat,
          status: 'ACTIVE'
        }))
      );
      setIsRoutingActive(false);
      setDispatchLog((prev) => [
        ...prev,
        `[ROUTING COMPLETE] Zero friction asset delivery confirmed across all 27 seats! FluidmotionTV ready for playout.`
      ]);
    }, 1800);
  };

  const filteredSeats = filterCategory === 'ALL'
    ? seats
    : seats.filter((s) => s.seatCategory === filterCategory);

  return (
    <div className="space-y-6">
      {/* Runner Status Banner */}
      <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-extrabold font-orbitron tracking-wide text-cyan-300 uppercase">
              The Family Table: 27 Seats Master Production Runner
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Logistical Powerhouse & Central Nervous System managing exactly 27 specialized AI agent seats for real-time WebXR flight, 9D shader geometry, and DWENS media pipeline broadcasting on FluidmotionTV.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          <PdfExportButton variant="gradient" />

          <button
            onClick={triggerPipelineDispatch}
            disabled={isRoutingActive}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-black font-extrabold font-orbitron text-xs flex items-center space-x-2 transition-all shadow-xl shadow-cyan-500/30 disabled:opacity-50"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>{isRoutingActive ? 'Dispatching 27 Seats...' : 'DISPATCH 27-SEAT ASSET ROUTING'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Dispatch Log */}
      <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 space-y-2">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 text-xs font-mono">
          <span className="text-cyan-300 font-bold font-orbitron flex items-center space-x-1.5">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>MASTER PRODUCTION RUNNER TELEMETRY LOG</span>
          </span>
          <span className="text-emerald-400 font-bold">ZERO FRICTION PIPELINE: ONLINE</span>
        </div>

        <div className="w-full h-28 bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-[11px] text-cyan-300 overflow-y-auto space-y-1">
          {dispatchLog.map((log, idx) => (
            <div key={idx} className="flex space-x-2">
              <span className="text-amber-400">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'ALL', label: 'All 27 Seats' },
          { id: 'VR_CLIENT', label: 'VR & Holographic Client' },
          { id: 'SHADER_GEOMETRY', label: '9D Shader Morphology' },
          { id: 'DWENS_PIPELINE', label: 'DWENS Media Pipeline' },
          { id: 'BROADCAST_AUDIO', label: '432Hz Spatial Audio' },
          { id: 'LOGISTICS_STORAGE', label: 'Storage & Logistics' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              filterCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 27 Seats Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeats.map((seat) => (
          <div
            key={seat.seatNumber}
            className="bg-slate-950/80 rounded-2xl p-4 border border-cyan-500/30 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-cyan-400/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold font-orbitron text-xs flex items-center justify-center">
                    {String(seat.seatNumber).padStart(2, '0')}
                  </span>
                  <h3 className="text-xs font-bold font-orbitron text-slate-100 truncate max-w-[160px]">
                    {seat.agentName}
                  </h3>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                    seat.status === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : seat.status === 'ROUTING'
                      ? 'bg-amber-950 text-amber-300 border-amber-800 animate-pulse'
                      : seat.status === 'SYNCING'
                      ? 'bg-purple-950 text-purple-300 border-purple-800 animate-pulse'
                      : seat.status === 'COMPLETED'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  {seat.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-sans leading-tight mb-2">
                {seat.roleDescription}
              </p>

              {/* Current Payload */}
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 space-y-1 font-mono text-[10px]">
                <div className="text-slate-500 flex items-center justify-between">
                  <span>PAYLOAD:</span>
                  <span className="text-cyan-400 truncate max-w-[140px] font-semibold">{seat.currentPayload}</span>
                </div>
                <div className="text-slate-500 flex items-center justify-between">
                  <span>ROUTE:</span>
                  <span className="text-purple-300 truncate max-w-[140px]">{seat.destinationRoute}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
