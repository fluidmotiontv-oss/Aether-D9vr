import React from 'react';
import { DimensionalPlane, NINE_DIMENSIONS } from '../types/spatial';
import { Layers, Sparkles, Clock, Globe, ShieldAlert, Cpu } from 'lucide-react';

interface DimensionSelectorProps {
  currentDimension: DimensionalPlane;
  onSelectDimension: (dimensionNumber: number) => void;
  isShifting: boolean;
}

export const DimensionSelector: React.FC<DimensionSelectorProps> = ({
  currentDimension,
  onSelectDimension,
  isShifting
}) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-cyan-500/20 pb-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold font-orbitron tracking-wide text-cyan-300 uppercase">
              The Nine Dimensional Forms (Morphology & Traversal Matrix)
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Shift volumetric avatar morphology across 9 physical and energy dimensional planes.
          </p>
        </div>

        {isShifting && (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/50 animate-pulse text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>DIMENSIONAL RIFT TRANSLATION IN PROGRESS...</span>
          </div>
        )}
      </div>

      {/* 9 Dimensions Selection Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 mb-4">
        {NINE_DIMENSIONS.map((dim) => {
          const isActive = currentDimension.dimension === dim.dimension;
          return (
            <button
              key={dim.dimension}
              onClick={() => onSelectDimension(dim.dimension)}
              disabled={isShifting}
              className={`relative p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between h-24 ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400 scale-105'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-500">DIM {dim.dimension}</div>
              <div className="font-bold font-orbitron text-base my-0.5" style={{ color: isActive ? dim.glowHex : undefined }}>
                {dim.dimension}D
              </div>
              <div className="text-[9px] font-mono truncate w-full text-slate-300">
                {dim.codeName}
              </div>
              <div className="text-[9px] font-mono text-cyan-400 font-semibold">
                {dim.harmonicFreq}Hz
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Dimensional Detail Inspection Card */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-xs font-bold font-orbitron bg-cyan-950 text-cyan-300 border border-cyan-700">
              {currentDimension.dimension}D FORM SPEC
            </span>
            <span className="text-xs font-mono text-cyan-400">{currentDimension.solfeggioNote}</span>
          </div>
          <h3 className="text-sm font-bold font-orbitron text-slate-100">
            {currentDimension.name}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {currentDimension.description}
          </p>
        </div>

        {/* Morphological Rules */}
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1.5 font-mono text-xs">
          <div className="text-cyan-400 font-bold text-[11px] flex items-center space-x-1 mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>MORPHOLOGY & SHADER RULES</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Shader Pipeline:</span>
            <span className="text-purple-300 font-semibold uppercase">{currentDimension.morphologyRules.shaderType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Particle Aura Density:</span>
            <span className="text-cyan-300 font-semibold">{currentDimension.morphologyRules.particleDensity} pts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Volumetric Scale:</span>
            <span className="text-amber-300 font-semibold">{currentDimension.morphologyRules.volumetricScale}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Spine Nodes:</span>
            <span className="text-emerald-300 font-semibold">{currentDimension.morphologyRules.tailNodes} Segments</span>
          </div>
        </div>

        {/* Physics Constraints */}
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-1.5 font-mono text-xs">
          <div className="text-amber-400 font-bold text-[11px] flex items-center space-x-1 mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>DIMENSIONAL PHYSICS LAWS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Gravity Vector:</span>
            <span className="text-amber-300 font-semibold">{currentDimension.physics.gravityFactor} G</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Time Dilation:</span>
            <span className="text-cyan-300 font-semibold">{currentDimension.physics.timeDilationRatio}x</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Air Viscosity (Drag):</span>
            <span className="text-purple-300 font-semibold">{currentDimension.physics.airViscosity} μ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Light Refraction Index:</span>
            <span className="text-emerald-300 font-semibold">{currentDimension.physics.lightRefractionIndex} η</span>
          </div>
        </div>
      </div>
    </div>
  );
};
