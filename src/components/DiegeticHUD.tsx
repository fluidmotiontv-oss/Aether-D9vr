import React from 'react';
import { DimensionalPlane, DragonFlightState, SpatialTelemetry } from '../types/spatial';
import { Volume2, VolumeX, Shield, Activity, Radio, Cpu, Zap, Wind, Navigation } from 'lucide-react';
import { spatialAudio } from '../services/spatialAudio';

interface DiegeticHUDProps {
  currentDimension: DimensionalPlane;
  flightState: DragonFlightState;
  telemetry: SpatialTelemetry;
  isMuted: boolean;
  onToggleMute: () => void;
  onTriggerWingFlap: () => void;
}

export const DiegeticHUD: React.FC<DiegeticHUDProps> = ({
  currentDimension,
  flightState,
  telemetry,
  isMuted,
  onToggleMute,
  onTriggerWingFlap
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* HUD Panel 1: Flight Telemetry & Artificial Horizon */}
      <div className="glass-panel-cyan rounded-2xl p-4 border border-cyan-500/30 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold font-orbitron tracking-wider text-cyan-300 uppercase">
              Diegetic Flight Horizon
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
            {flightState.autoPilot ? 'AUTOPILOT' : 'MANUAL 6DOF'}
          </span>
        </div>

        {/* Artificial Horizon Pitch/Roll Gauge */}
        <div className="relative w-full h-28 bg-slate-950/80 rounded-xl border border-cyan-500/30 overflow-hidden flex items-center justify-center mb-3">
          {/* Pitch Lines */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-100 pointer-events-none"
            style={{
              transform: `rotate(${-flightState.roll}deg) translateY(${flightState.pitch * 1.2}px)`
            }}
          >
            <div className="w-24 h-0.5 bg-cyan-400 shadow-lg shadow-cyan-400" />
            <div className="w-16 h-0.5 bg-cyan-500/60 my-2" />
            <div className="w-10 h-0.5 bg-cyan-500/40" />
          </div>
          {/* Center Crosshair */}
          <div className="w-4 h-4 border-2 border-amber-400 rounded-full z-10 pointer-events-none flex items-center justify-center">
            <div className="w-1 h-1 bg-amber-400 rounded-full" />
          </div>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400">
            PITCH: <span className="text-cyan-300">{flightState.pitch.toFixed(1)}°</span>
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400">
            ROLL: <span className="text-purple-300">{flightState.roll.toFixed(1)}°</span>
          </div>
        </div>

        {/* Altitude & Speed Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px]">ALTITUDE</div>
            <div className="text-amber-400 font-bold font-orbitron text-sm">
              {flightState.altitude.toLocaleString()} M
            </div>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px]">VELOCITY</div>
            <div className="text-cyan-400 font-bold font-orbitron text-sm">
              {flightState.speed} KTS
            </div>
          </div>
        </div>
      </div>

      {/* HUD Panel 2: Reins & Kinematics Control */}
      <div className="glass-panel-purple rounded-2xl p-4 border border-purple-500/30 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold font-orbitron tracking-wider text-purple-300 uppercase">
              Reins & Kinetic Gauge
            </span>
          </div>
          <button
            onClick={onTriggerWingFlap}
            className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/40 flex items-center space-x-1 transition-all"
          >
            <Wind className="w-3 h-3 text-purple-300" />
            <span>WING FLAP</span>
          </button>
        </div>

        {/* Reins Tension Meters */}
        <div className="space-y-3 mb-3 font-mono text-xs">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">LEFT REIN TENSION (VR HAND)</span>
              <span className="text-purple-300 font-bold">{(flightState.reinsTension.left * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-purple-900">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150"
                style={{ width: `${flightState.reinsTension.left * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">RIGHT REIN TENSION (VR HAND)</span>
              <span className="text-purple-300 font-bold">{(flightState.reinsTension.right * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-purple-900">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-150"
                style={{ width: `${flightState.reinsTension.right * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* G-Force & Kinetic Energy */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px]">G-FORCE LOAD</div>
            <div className="text-purple-400 font-bold font-orbitron text-sm">
              {flightState.gForce.toFixed(2)} G
            </div>
          </div>
          <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
            <div className="text-slate-400 text-[10px]">KINETIC STORE</div>
            <div className="text-emerald-400 font-bold font-orbitron text-sm">
              {flightState.kineticEnergy.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* HUD Panel 3: Spatial Audio & Volumetric Telemetry */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-700/60 relative overflow-hidden flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-slate-700/40 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold font-orbitron tracking-wider text-emerald-300 uppercase">
                432Hz Spatial Audio & System
              </span>
            </div>
            <button
              onClick={onToggleMute}
              className={`p-1.5 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-400'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Harmonic Resonance Monitor */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/20 mb-3 font-mono">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">HARMONIC RESONANCE:</span>
              <span className="text-emerald-400 font-bold">{currentDimension.harmonicFreq} Hz</span>
            </div>
            <div className="text-[11px] text-cyan-300 font-semibold mb-2">
              NOTE: {currentDimension.solfeggioNote}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>BINAURAL OFFSET: +3.5Hz THETA</span>
              <span>AUDIO LATENCY: {telemetry.spatialAudioLatencyMs}ms</span>
            </div>
          </div>
        </div>

        {/* Volumetric Performance Telemetry */}
        <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px] text-center">
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
            <div className="text-[9px] text-slate-500">FRAME RATE</div>
            <div className="text-cyan-300 font-bold">{telemetry.fps} FPS</div>
          </div>
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
            <div className="text-[9px] text-slate-500">DRAW CALLS</div>
            <div className="text-purple-300 font-bold">{telemetry.gpuDrawCalls}</div>
          </div>
          <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
            <div className="text-[9px] text-slate-500">PARTICLES</div>
            <div className="text-amber-300 font-bold">{telemetry.pointCloudCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
