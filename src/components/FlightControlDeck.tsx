import React from 'react';
import { DragonFlightState } from '../types/spatial';
import { Gamepad2, Compass, Sliders, Play, RotateCcw, Crosshair } from 'lucide-react';

interface FlightControlDeckProps {
  flightState: DragonFlightState;
  onUpdateFlightState: (partial: Partial<DragonFlightState>) => void;
}

export const FlightControlDeck: React.FC<FlightControlDeckProps> = ({
  flightState,
  onUpdateFlightState
}) => {
  const handleJoystickMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // -1 to 1

    const roll = x * 35; // degrees
    const pitch = y * 25; // degrees

    onUpdateFlightState({
      weightShift: { x, y },
      roll,
      pitch,
      bankingAngle: roll
    });
  };

  const handleResetControls = () => {
    onUpdateFlightState({
      pitch: 0,
      roll: 0,
      yaw: 0,
      weightShift: { x: 0, y: 0 },
      reinsTension: { left: 0.5, right: 0.5 },
      autoPilot: false,
      flightPattern: 'free'
    });
  };

  return (
    <div className="glass-panel-cyan rounded-2xl p-5 border border-cyan-500/30 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold font-orbitron tracking-wide text-cyan-300 uppercase">
              VR Motion Controller & Reins Flight Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Translate 6DOF headset/controller hand movement into weight-shifting dragon aerodynamics.
          </p>
        </div>

        <button
          onClick={handleResetControls}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-mono flex items-center space-x-1.5 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Flight Trim</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Joystick / Weight Shift Pad */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="flex items-center space-x-1">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              <span>WEIGHT SHIFT JOYSTICK</span>
            </span>
            <span className="text-cyan-400 font-bold">
              X:{flightState.weightShift.x.toFixed(2)} Y:{flightState.weightShift.y.toFixed(2)}
            </span>
          </div>

          <div
            onClick={handleJoystickMove}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleJoystickMove(e);
            }}
            className="relative w-44 h-44 rounded-full bg-slate-900 border-2 border-cyan-500/40 flex items-center justify-center cursor-crosshair shadow-inner shadow-cyan-950"
          >
            {/* Target Reticle Grid */}
            <div className="absolute inset-x-0 h-0.5 bg-cyan-500/20 pointer-events-none" />
            <div className="absolute inset-y-0 w-0.5 bg-cyan-500/20 pointer-events-none" />
            <div className="w-28 h-28 rounded-full border border-cyan-500/20 pointer-events-none" />

            {/* Joystick Knob */}
            <div
              className="absolute w-7 h-7 rounded-full bg-cyan-400 border-2 border-white shadow-lg shadow-cyan-400 transition-all duration-75 pointer-events-none"
              style={{
                transform: `translate(${flightState.weightShift.x * 70}px, ${-flightState.weightShift.y * 70}px)`
              }}
            />
          </div>

          <div className="text-[10px] font-mono text-slate-500 mt-2 text-center">
            Click or drag inside pad to pitch & roll dragon body
          </div>
        </div>

        {/* Throttle & Speed Control */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-3">
          <div className="text-xs font-mono text-slate-300 flex justify-between items-center">
            <span className="flex items-center space-x-1">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>FLIGHT SPEED THROTTLE</span>
            </span>
            <span className="text-amber-400 font-bold font-orbitron">{flightState.speed} KTS</span>
          </div>

          <input
            type="range"
            min="100"
            max="2500"
            step="50"
            value={flightState.speed}
            onChange={(e) => onUpdateFlightState({ speed: parseFloat(e.target.value) })}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-900 rounded-lg"
          />

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">LEFT REIN TENSION</span>
              <span className="text-purple-300">{(flightState.reinsTension.left * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={flightState.reinsTension.left}
              onChange={(e) => onUpdateFlightState({ reinsTension: { ...flightState.reinsTension, left: parseFloat(e.target.value) } })}
              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
            />

            <div className="flex justify-between text-xs font-mono pt-1">
              <span className="text-slate-400">RIGHT REIN TENSION</span>
              <span className="text-purple-300">{(flightState.reinsTension.right * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={flightState.reinsTension.right}
              onChange={(e) => onUpdateFlightState({ reinsTension: { ...flightState.reinsTension, right: parseFloat(e.target.value) } })}
              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
            />
          </div>
        </div>

        {/* Autonomous Flight Pattern Selector */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-2">
          <div className="text-xs font-mono text-slate-300 flex items-center space-x-1">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>AUTONOMOUS FLIGHT SEQUENCES</span>
          </div>

          <div className="space-y-1.5">
            {[
              { id: 'free', label: 'Free Flight (Manual 6DOF)' },
              { id: 'formation_infinity', label: 'Formation Infinity (Dual Phase ∞ Loop)' },
              { id: 'spiral_rift', label: 'Spiral Rift Portal Entry' },
              { id: 'supersonic_dive', label: 'Supersonic Gravitational Dive' },
              { id: 'tesseract_orbit', label: 'Tesseract Hypercube Orbit' },
              { id: 'quantum_hover', label: 'Quantum Zero-G Hover' }
            ].map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => {
                  const isAuto = pattern.id !== 'free';
                  onUpdateFlightState({
                    flightPattern: pattern.id as DragonFlightState['flightPattern'],
                    autoPilot: isAuto
                  });
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between border ${
                  flightState.flightPattern === pattern.id
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>{pattern.label}</span>
                {flightState.flightPattern === pattern.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
