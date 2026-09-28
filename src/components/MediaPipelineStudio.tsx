import React, { useState } from 'react';
import { PILLAR_1_VR_CLIENT_CODE } from '../scaffolds/Pillar1_VRClient';
import { PILLAR_2_GLSL_SHADER_CODE } from '../scaffolds/Pillar2_GLSLShader.glsl';
import { PILLAR_3_ORCHESTRATOR_CODE } from '../scaffolds/Pillar3_Orchestrator';
import { Tv, Play, Check, Copy, Download, Code, Radio, Terminal, Clock, Cpu, Film, Server, Zap } from 'lucide-react';

export const MediaPipelineStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline_sim' | 'deliverable_1' | 'deliverable_2' | 'deliverable_3'>('pipeline_sim');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // Simulated Media Pipeline Job State
  const [isJobRunning, setIsJobRunning] = useState(false);
  const [jobProgress, setJobProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<string>('IDLE');
  const [logs, setLogs] = useState<string[]>([
    '[DWENS Media Engine] Ready for FluidmotionTV WebSocket telemetry sync.',
    '[Dragon 9 Clock] Temporal Dilation Configured: 26.66 Hours/Day • 54.0 Minutes/Hour.'
  ]);

  // Dragon 9 Temporal Calculator State
  const [earthMinutes, setEarthMinutes] = useState(60);
  const dragon9Hours = (earthMinutes / 54.0).toFixed(2);
  const dragon9Days = (earthMinutes / (26.66 * 54.0)).toFixed(4);

  const handleCopyCode = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadCode = (code: string, fileName: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runSimulatedRenderJob = () => {
    if (isJobRunning) return;

    setIsJobRunning(true);
    setJobProgress(0);
    setLogs([
      '[DWENS] Initiating automated rendering pipeline job for FluidmotionTV...',
      '[DWENS] Connecting WebSocket stream ws://localhost:8080/telemetry...'
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setJobProgress(step * 10);

      if (step === 2) {
        setCurrentStage('TELEMETRY_BUFFERING');
        setLogs((prev) => [...prev, '[DWENS] Buffering 3,600 spatial frames (XYZ, Rotation, 9D Morph state)...']);
      } else if (step === 4) {
        setCurrentStage('HEADLESS_WEBGL_EXTRACTION');
        setLogs((prev) => [...prev, '[Orchestrator] Headless WebGL context spawned. Extracting 60fps PNG frame sequence...']);
      } else if (step === 7) {
        setCurrentStage('432HZ_AUDIO_MIXING');
        setLogs((prev) => [...prev, '[Spatial Audio] Synthesizing 432Hz harmonic track with binaural theta frequency...']);
      } else if (step === 9) {
        setCurrentStage('FFMPEG_COMPILATION');
        setLogs((prev) => [...prev, '[FFmpeg] Executing: ffmpeg -r 60 -i frame_%05d.png -i audio.wav -c:v libx264 -b:v 15M output.mp4']);
      } else if (step >= 10) {
        clearInterval(interval);
        setIsJobRunning(false);
        setCurrentStage('BROADCAST_READY');
        setLogs((prev) => [
          ...prev,
          '[DWENS SUCCESS] Broadcast video compiled: renders/broadcast_mp4/fluidmotion_dragon9_job1728.mp4',
          '[FluidmotionTV Node] Stream injected into live broadcast queue.'
        ]);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <Tv className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-extrabold font-orbitron tracking-wide text-cyan-300 uppercase">
              DWENS Media Pipeline & Code Scaffolds Studio
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Real-time VR telemetry streaming, headless WebGL frame extraction, 432Hz audio synthesis, and automated FFmpeg broadcast compilation for FluidmotionTV under the Dragon 9 Temporal Physics Framework (26.66h day / 54m hour).
          </p>
        </div>

        <button
          onClick={runSimulatedRenderJob}
          disabled={isJobRunning}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-black font-extrabold font-orbitron text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/30 disabled:opacity-50 self-start md:self-auto"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isJobRunning ? 'Pipeline Rendering...' : 'Run Broadcast Pipeline Test'}</span>
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'pipeline_sim', label: 'FluidmotionTV Pipeline & Temporal Clock', icon: Server },
          { id: 'deliverable_1', label: 'Deliverable 1: VR Client Scaffold', icon: Code },
          { id: 'deliverable_2', label: 'Deliverable 2: 9D GLSL Shader Scaffold', icon: Cpu },
          { id: 'deliverable_3', label: 'Deliverable 3: Orchestrator.js Scaffold', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Live Simulated Pipeline & Dragon 9 Clock */}
      {activeTab === 'pipeline_sim' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dragon 9 Temporal Physics Calculator */}
          <div className="glass-panel rounded-2xl p-5 border border-purple-500/40 space-y-4">
            <div className="flex items-center space-x-2 border-b border-purple-500/20 pb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold font-orbitron text-purple-200">
                Dragon 9 Temporal Clock Physics
              </h3>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              The environment operates on 26.66-hour days with 54-minute hours. Flight velocity accelerates time dilation when crossing dimensional rifts.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">
                  EARTH TIME DURATION (MINUTES):
                </label>
                <input
                  type="number"
                  value={earthMinutes}
                  onChange={(e) => setEarthMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-purple-500/40 rounded-lg px-3 py-1.5 text-cyan-300 font-bold focus:outline-none"
                />
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-purple-500/20 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Dragon 9 Hours Elapsed:</span>
                  <span className="text-purple-300 font-bold">{dragon9Hours} D9 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dragon 9 Days Elapsed:</span>
                  <span className="text-cyan-300 font-bold">{dragon9Days} D9 Days</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Base Dilation Ratio:</span>
                  <span className="text-emerald-400 font-bold">1.1108x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Pipeline Execution & Progress */}
          <div className="md:col-span-2 glass-panel rounded-2xl p-5 border border-cyan-500/30 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3">
                <div className="flex items-center space-x-2">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold font-orbitron text-cyan-200">
                    FluidmotionTV DWENS Broadcast Orchestrator
                  </h3>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                  STAGE: {currentStage}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">PIPELINE RENDER PROGRESS</span>
                  <span className="text-cyan-300 font-bold">{jobProgress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-cyan-900">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${jobProgress}%` }}
                  />
                </div>
              </div>

              {/* Live Terminal Console Log */}
              <div className="w-full h-44 bg-slate-950 rounded-xl border border-slate-800 p-3 font-mono text-[11px] text-emerald-400 overflow-y-auto space-y-1">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex space-x-2">
                    <span className="text-slate-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <span>BROADCAST TARGET: <strong className="text-cyan-300">FluidmotionTV Node 1</strong></span>
              <span>OUTPUT RESOLUTION: <strong className="text-purple-300">3840x2160 @ 60fps</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Deliverable 1 Code Scaffold */}
      {activeTab === 'deliverable_1' && (
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                DELIVERABLE 1
              </span>
              <h3 className="text-base font-bold font-orbitron text-cyan-200 mt-1">
                Vite / React / Three.js VR Client & Dragon 9 Clock Scaffold
              </h3>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleCopyCode(PILLAR_1_VR_CLIENT_CODE, 'CyberDragonVRClient.tsx')}
                className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700 hover:bg-cyan-900 text-xs font-mono flex items-center space-x-1.5"
              >
                {copiedFile === 'CyberDragonVRClient.tsx' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile === 'CyberDragonVRClient.tsx' ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                onClick={() => handleDownloadCode(PILLAR_1_VR_CLIENT_CODE, 'CyberDragonVRClient.tsx')}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs font-mono flex items-center space-x-1.5 hover:bg-cyan-400"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .TSX</span>
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto max-h-[500px]">
            {PILLAR_1_VR_CLIENT_CODE}
          </pre>
        </div>
      )}

      {/* Tab 3: Deliverable 2 Code Scaffold */}
      {activeTab === 'deliverable_2' && (
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700">
                DELIVERABLE 2
              </span>
              <h3 className="text-base font-bold font-orbitron text-purple-200 mt-1">
                9-Dimensional GLSL Shader Logic (dragon_dimensional_morph.glsl)
              </h3>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleCopyCode(PILLAR_2_GLSL_SHADER_CODE, 'dragon_dimensional_morph.glsl')}
                className="px-3 py-1.5 rounded-lg bg-purple-950 text-purple-300 border border-purple-700 hover:bg-purple-900 text-xs font-mono flex items-center space-x-1.5"
              >
                {copiedFile === 'dragon_dimensional_morph.glsl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile === 'dragon_dimensional_morph.glsl' ? 'Copied!' : 'Copy GLSL'}</span>
              </button>
              <button
                onClick={() => handleDownloadCode(PILLAR_2_GLSL_SHADER_CODE, 'dragon_dimensional_morph.glsl')}
                className="px-3 py-1.5 rounded-lg bg-purple-500 text-white font-bold text-xs font-mono flex items-center space-x-1.5 hover:bg-purple-400"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .GLSL</span>
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-purple-200 overflow-x-auto max-h-[500px]">
            {PILLAR_2_GLSL_SHADER_CODE}
          </pre>
        </div>
      )}

      {/* Tab 4: Deliverable 3 Code Scaffold */}
      {activeTab === 'deliverable_3' && (
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">
                DELIVERABLE 3
              </span>
              <h3 className="text-base font-bold font-orbitron text-amber-200 mt-1">
                Node.js Orchestrator & FFmpeg Broadcast Pipeline (orchestrator.js)
              </h3>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleCopyCode(PILLAR_3_ORCHESTRATOR_CODE, 'orchestrator.js')}
                className="px-3 py-1.5 rounded-lg bg-amber-950 text-amber-300 border border-amber-700 hover:bg-amber-900 text-xs font-mono flex items-center space-x-1.5"
              >
                {copiedFile === 'orchestrator.js' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFile === 'orchestrator.js' ? 'Copied!' : 'Copy Node.js'}</span>
              </button>
              <button
                onClick={() => handleDownloadCode(PILLAR_3_ORCHESTRATOR_CODE, 'orchestrator.js')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs font-mono flex items-center space-x-1.5 hover:bg-amber-400"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .JS</span>
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-200 overflow-x-auto max-h-[500px]">
            {PILLAR_3_ORCHESTRATOR_CODE}
          </pre>
        </div>
      )}
    </div>
  );
};
