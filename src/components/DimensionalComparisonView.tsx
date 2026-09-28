import React from 'react';
import { NINE_DIMENSIONS } from '../types/spatial';
import { Sparkles, ArrowRight, Radio, Layers, Eye, Shield, Cpu, Globe } from 'lucide-react';

interface DimensionalComparisonViewProps {
  onSelectDimension: (dim: number) => void;
}

export const DimensionalComparisonView: React.FC<DimensionalComparisonViewProps> = ({
  onSelectDimension
}) => {
  const dim1D = NINE_DIMENSIONS[0]; // 1D Monomorphic Filament
  const dim9D = NINE_DIMENSIONS[8]; // 9D Celestial Void Ether

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/30">
        <div className="flex items-center space-x-3 mb-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-extrabold font-orbitron tracking-wide text-cyan-300 uppercase">
            Holographic Space Spectrum: First Dimension (1D) vs Ninth Dimension (9D)
          </h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
          Visualizing the extreme ends of the multidimensional spectrum in true holographic volume.
          1D represents total geometric compression into a zero-thickness singular light vector, while 9D represents omnipresent radiant consciousness expanding across the entire room.
        </p>
      </div>

      {/* Side-by-Side Dimensional Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1D Monomorphic Filament Card */}
        <div className="glass-panel rounded-2xl p-6 border border-cyan-500/40 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div>
              <span className="px-2.5 py-1 rounded text-xs font-bold font-orbitron bg-cyan-950 text-cyan-300 border border-cyan-700">
                FIRST DIMENSION (1D)
              </span>
              <h3 className="text-lg font-bold font-orbitron text-cyan-200 mt-2">
                {dim1D.name}
              </h3>
            </div>
            <div className="text-right font-mono">
              <div className="text-cyan-400 font-bold text-lg">{dim1D.harmonicFreq} Hz</div>
              <div className="text-[11px] text-slate-400">{dim1D.solfeggioNote}</div>
            </div>
          </div>

          {/* Visual Hologram Representation Mock */}
          <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-cyan-500/30 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 hologram-scanline opacity-30 pointer-events-none" />
            {/* 1D Laser Filament Line */}
            <div className="w-full h-1 bg-cyan-400 shadow-[0_0_20px_#00f0ff] animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_25px_#00f0ff] animate-ping" />
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-800">
              1D MONOMORPHIC VECTOR BEAM
            </div>
          </div>

          {/* Key Architectural Traits */}
          <div className="space-y-2 font-mono text-xs">
            <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>SHADER & VOLUMETRIC GEOMETRY</span>
              </div>
              <p className="text-slate-300 font-sans">
                Single zero-thickness linear ray. All volumetric mass collapses into a single focused light filament.
              </p>
            </div>

            <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5" />
                <span>PHYSICS & TRAVERSAL</span>
              </div>
              <p className="text-slate-300 font-sans">
                Zero drag, near-zero gravity (0.1G), enabling razor-sharp speed along a single motion line.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectDimension(1)}
            className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs hover:bg-cyan-400 flex items-center justify-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>Engage 1D Monomorphic Flight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 9D Celestial Void Ether Card */}
        <div className="glass-panel rounded-2xl p-6 border border-amber-500/40 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div>
              <span className="px-2.5 py-1 rounded text-xs font-bold font-orbitron bg-amber-950 text-amber-300 border border-amber-700">
                NINTH DIMENSION (9D)
              </span>
              <h3 className="text-lg font-bold font-orbitron text-amber-200 mt-2">
                {dim9D.name}
              </h3>
            </div>
            <div className="text-right font-mono">
              <div className="text-amber-400 font-bold text-lg">{dim9D.harmonicFreq} Hz</div>
              <div className="text-[11px] text-slate-400">{dim9D.solfeggioNote}</div>
            </div>
          </div>

          {/* Visual Hologram Representation Mock */}
          <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-amber-500/30 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 hologram-scanline opacity-30 pointer-events-none" />
            {/* 9D Omnipresent Radiant Cloud */}
            <div className="absolute inset-2 bg-gradient-to-r from-amber-500/30 via-purple-500/20 to-cyan-500/30 rounded-full blur-xl animate-pulse" />
            <div className="relative z-10 font-orbitron text-center space-y-1">
              <div className="text-amber-200 font-bold text-sm tracking-wider">OMNIPRESENT LIGHT ETHER</div>
              <div className="text-[10px] font-mono text-amber-400">100x Time Dilation • 5,000+ Particles</div>
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded border border-amber-800">
              VOLUMETRIC RADIANT AETHER
            </div>
          </div>

          {/* Key Architectural Traits */}
          <div className="space-y-2 font-mono text-xs">
            <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-purple-400 font-bold flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>SHADER & VOLUMETRIC GEOMETRY</span>
              </div>
              <p className="text-slate-300 font-sans">
                Transcendent volumetric raymarching. The dragon exists in all coordinates simultaneously as radiant light.
              </p>
            </div>

            <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-emerald-400 font-bold flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5" />
                <span>PHYSICS & TRAVERSAL</span>
              </div>
              <p className="text-slate-300 font-sans">
                Zero gravity, 100x time dilation, allowing instantaneous spatial presence across the entire holographic volume.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectDimension(9)}
            className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold font-mono text-xs hover:bg-amber-400 flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <span>Engage 9D Celestial Ether Flight</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quantitative Technical Matrix */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-base font-bold font-orbitron text-cyan-300 mb-4 uppercase">
          Full Spectral Matrix (1D through 9D Comparison)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-cyan-500/30 text-cyan-400">
                <th className="pb-3 p-2">PARAMETER</th>
                <th className="pb-3 p-2">1D MONO-FILAMENT</th>
                <th className="pb-3 p-2 text-purple-400">5D QUANTUM MESH</th>
                <th className="pb-3 p-2 text-amber-400">9D VOID AETHER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-2.5 font-bold text-slate-400">Harmonic Frequency</td>
                <td className="p-2.5 text-cyan-300">432 Hz (Root)</td>
                <td className="p-2.5 text-purple-300">852 Hz (Throat)</td>
                <td className="p-2.5 text-amber-300">1728 Hz (Omega)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-400">Visual Topology</td>
                <td className="p-2.5">1D Line Segment</td>
                <td className="p-2.5">Superposition Cloud</td>
                <td className="p-2.5">Omnipresent Volume Light</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-400">Particle Aura Density</td>
                <td className="p-2.5">200 points</td>
                <td className="p-2.5">2,000 points</td>
                <td className="p-2.5">5,000+ points</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-400">Time Dilation Ratio</td>
                <td className="p-2.5">0.2x Real Time</td>
                <td className="p-2.5">5.0x Dilation</td>
                <td className="p-2.5">100.0x Transcendent Dilation</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-400">Air Drag Viscosity</td>
                <td className="p-2.5">0.02 (Hyper-Slick)</td>
                <td className="p-2.5">0.05 (Quantum Void)</td>
                <td className="p-2.5">0.00 (Zero Resistance)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
