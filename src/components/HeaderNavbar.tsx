import React from 'react';
import { DimensionalPlane } from '../types/spatial';
import { Eye, FileText, Sparkles, Tv, Bot, Layers, Shield } from 'lucide-react';
import { PdfExportButton } from './PdfExportButton';

interface HeaderNavbarProps {
  activeView: 'simulator' | 'blueprint' | 'comparison' | 'pipeline' | 'runner';
  setActiveView: (view: 'simulator' | 'blueprint' | 'comparison' | 'pipeline' | 'runner') => void;
  currentDimension: DimensionalPlane;
  onOpenOracle: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeView,
  setActiveView,
  currentDimension,
  onOpenOracle,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base md:text-lg font-black font-orbitron tracking-wider text-cyan-300">
                AETHER-9
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                VR / SPATIAL v2.4
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-400">
              Holographic Volumetric Simulator & Architectural Game Framework
            </p>
          </div>
        </div>

        {/* View Switchers, PDF Export & AI Oracle Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* PDF Export Button */}
          <PdfExportButton variant="compact" />

          <button
            onClick={() => setActiveView('simulator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
              activeView === 'simulator'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Simulator</span>
          </button>

          <button
            onClick={() => setActiveView('runner')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
              activeView === 'runner'
                ? 'bg-gradient-to-r from-cyan-500 to-amber-400 text-black font-bold shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>The Family Table (27 Seats)</span>
          </button>

          <button
            onClick={() => setActiveView('pipeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
              activeView === 'pipeline'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>FluidmotionTV Media Studio</span>
          </button>

          <button
            onClick={() => setActiveView('blueprint')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
              activeView === 'blueprint'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Architectural Blueprint</span>
          </button>

          <button
            onClick={() => setActiveView('comparison')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-1.5 ${
              activeView === 'comparison'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>1D vs 9D Matrix</span>
          </button>

          {/* Consult Gemini AI Oracle */}
          <button
            onClick={onOpenOracle}
            className="px-3 py-1.5 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/50 hover:bg-purple-900 text-xs font-mono font-semibold flex items-center space-x-1.5 transition-all shadow-md shadow-purple-950"
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Tactical Oracle</span>
          </button>
        </div>
      </div>
    </header>
  );
};
