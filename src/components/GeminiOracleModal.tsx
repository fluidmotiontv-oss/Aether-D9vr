import React, { useState } from 'react';
import { consultDimensionalOracle } from '../services/geminiOracle';
import { DimensionalPlane, DragonFlightState } from '../types/spatial';
import { Bot, Send, Sparkles, X, Loader2, Radio } from 'lucide-react';

interface GeminiOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDimension: DimensionalPlane;
  flightState: DragonFlightState;
}

export const GeminiOracleModal: React.FC<GeminiOracleModalProps> = ({
  isOpen,
  onClose,
  currentDimension,
  flightState
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    const oracleText = await consultDimensionalOracle(
      prompt,
      currentDimension.dimension,
      flightState.speed,
      flightState.altitude
    );

    setResponse(oracleText);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-purple border border-purple-500/40 p-6 space-y-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-base font-bold font-orbitron text-purple-200">
                AETHER-9 Tactical Spatial AI Oracle
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Powered by Gemini 2.5 Flash • Real-Time Spatial Computing & Flight Consultant
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Tactical Queries */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>RECOMMENDED ARCHITECTURAL QUERIES:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "How can we optimize WebXR shaders for sub-11ms frame time in 9D?",
              "Explain the acoustic resonance math behind the 432Hz theta binaural beats.",
              "What is the mathematical difference in spatial presence between 1D and 9D?",
              "Calculate optimal reins tension vector for a supersonic dimensional rift dive."
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(q)}
                className="text-left text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-purple-900/40 text-purple-300 border border-purple-500/30 transition-all"
              >
                • {q}
              </button>
            ))}
          </div>
        </div>

        {/* Response Box */}
        <div className="min-h-[160px] max-h-[260px] overflow-y-auto bg-slate-950 p-4 rounded-xl border border-purple-500/20 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-purple-400 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>SYNCHRONIZING TACTICAL ORACLE TELEMETRY...</span>
            </div>
          ) : response ? (
            response
          ) : (
            <span className="text-slate-500 italic">
              Ask any question about spatial computing architecture, 1:1 volumetric mapping, WebXR performance, 432Hz spatial audio, or 9D flight mechanics.
            </span>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask the Spatial AI Architect..."
            className="flex-1 bg-slate-900 border border-purple-500/40 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg shadow-purple-600/30"
          >
            <Send className="w-4 h-4" />
            <span>Consult</span>
          </button>
        </form>
      </div>
    </div>
  );
};
