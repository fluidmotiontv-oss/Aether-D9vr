import React, { useState, useEffect } from 'react';
import { DimensionalPlane, DragonFlightState, NINE_DIMENSIONS, SpatialTelemetry } from './types/spatial';
import { spatialAudio } from './services/spatialAudio';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HolographicCanvas } from './components/HolographicCanvas';
import { DiegeticHUD } from './components/DiegeticHUD';
import { DimensionSelector } from './components/DimensionSelector';
import { FlightControlDeck } from './components/FlightControlDeck';
import { ArchitecturalBlueprint } from './components/ArchitecturalBlueprint';
import { DimensionalComparisonView } from './components/DimensionalComparisonView';
import { MediaPipelineStudio } from './components/MediaPipelineStudio';
import { FamilyTableDashboard } from './components/FamilyTableDashboard';
import { GeminiOracleModal } from './components/GeminiOracleModal';

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'blueprint' | 'comparison' | 'pipeline' | 'runner'>('simulator');
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState<number>(2); // Default to 3D Biomechanical
  const [isShifting, setIsShifting] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isOracleOpen, setIsOracleOpen] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<'hologram_tank' | 'full_xr' | 'first_person'>('hologram_tank');

  // Active Flight State
  const [flightState, setFlightState] = useState<DragonFlightState>({
    speed: 450,
    altitude: 2400,
    pitch: 0,
    yaw: 0,
    roll: 0,
    bankingAngle: 0,
    wingFlapPhase: 0,
    kineticEnergy: 85,
    riftSync: 98,
    gForce: 1.0,
    weightShift: { x: 0, y: 0 },
    reinsTension: { left: 0.5, right: 0.5 },
    currentDimension: 3,
    targetDimension: 3,
    isShifting: false,
    shiftProgress: 0,
    autoPilot: false,
    flightPattern: 'free'
  });

  // Spatial Telemetry
  const [telemetry, setTelemetry] = useState<SpatialTelemetry>({
    fps: 90,
    frameTimeMs: 11.1,
    gpuDrawCalls: 42,
    pointCloudCount: 800,
    spatialAudioLatencyMs: 12,
    headsetTrackingState: 'HOLOGRAPHIC_3D',
    ipdMm: 64,
    fovDegrees: 90,
    leftControllerBattery: 92,
    rightControllerBattery: 88,
    hapticIntensity: 45
  });

  const currentDimension: DimensionalPlane = NINE_DIMENSIONS[currentDimensionIndex];

  // Initialize Spatial Audio on user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      spatialAudio.init();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, []);

  // Handle Dimension Shifting
  const handleSelectDimension = (dimensionNumber: number) => {
    if (isShifting || dimensionNumber === currentDimension.dimension) return;

    setIsShifting(true);
    const targetDim = NINE_DIMENSIONS.find((d) => d.dimension === dimensionNumber) || NINE_DIMENSIONS[0];

    // Trigger audio frequency transition
    spatialAudio.updateDimension(dimensionNumber, targetDim.harmonicFreq);

    // Update flight state for rift shift
    setFlightState((prev) => ({
      ...prev,
      targetDimension: dimensionNumber,
      isShifting: true,
      riftSync: 100
    }));

    setTimeout(() => {
      setCurrentDimensionIndex(dimensionNumber - 1);
      setIsShifting(false);
      setFlightState((prev) => ({
        ...prev,
        currentDimension: dimensionNumber,
        isShifting: false
      }));
    }, 800);
  };

  // Toggle Mute Audio
  const handleToggleMute = () => {
    const muted = spatialAudio.toggleMute();
    setIsMuted(muted);
  };

  // Trigger Wing Flap Audio
  const handleTriggerWingFlap = () => {
    spatialAudio.triggerWingFlap();
  };

  // Flight Physics Animation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightState((prev) => {
        let newPitch = prev.pitch;
        let newRoll = prev.roll;
        let newYaw = prev.yaw;
        let newSpeed = prev.speed;

        // Auto Pilot Flight Pattern Executions
        if (prev.autoPilot) {
          const t = Date.now() / 1000;
          if (prev.flightPattern === 'formation_infinity') {
            newPitch = Math.sin(t * 2) * 12;
            newRoll = Math.sin(t) * 28;
            newYaw = (prev.yaw + 0.8) % 360;
            newSpeed = 960;
          } else if (prev.flightPattern === 'spiral_rift') {
            newPitch = Math.sin(t * 2) * 15;
            newRoll = Math.cos(t * 1.5) * 30;
            newYaw = (prev.yaw + 1) % 360;
            newSpeed = 1200;
          } else if (prev.flightPattern === 'supersonic_dive') {
            newPitch = -25;
            newRoll = 0;
            newSpeed = Math.min(prev.speed + 20, 2200);
          } else if (prev.flightPattern === 'tesseract_orbit') {
            newPitch = Math.cos(t) * 10;
            newRoll = Math.sin(t * 2) * 25;
            newYaw = (prev.yaw + 2) % 360;
            newSpeed = 800;
          } else if (prev.flightPattern === 'quantum_hover') {
            newPitch = Math.sin(t) * 4;
            newRoll = Math.cos(t) * 4;
            newSpeed = 200;
          }
        }

        // Calculate G-force based on roll & speed
        const gForce = 1.0 + (Math.abs(newRoll) / 45) * 1.5 + (newSpeed / 1000) * 0.5;

        // Update spatial audio Doppler position
        spatialAudio.updateFlightAudio(newSpeed, newRoll, newPitch);

        return {
          ...prev,
          pitch: newPitch,
          roll: newRoll,
          yaw: newYaw,
          speed: newSpeed,
          gForce: parseFloat(gForce.toFixed(2)),
          altitude: Math.max(100, prev.altitude + (newPitch > 0 ? 5 : -5))
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header Bar */}
      <HeaderNavbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentDimension={currentDimension}
        onOpenOracle={() => setIsOracleOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeView === 'simulator' && (
          <>
            {/* 3D WebGL / WebXR Holographic Canvas */}
            <HolographicCanvas
              currentDimension={currentDimension}
              flightState={flightState}
              onTelemetryUpdate={setTelemetry}
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />

            {/* Diegetic Glassmorphism HUD */}
            <DiegeticHUD
              currentDimension={currentDimension}
              flightState={flightState}
              telemetry={telemetry}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onTriggerWingFlap={handleTriggerWingFlap}
            />

            {/* 9-Dimensional Morphology Selector */}
            <DimensionSelector
              currentDimension={currentDimension}
              onSelectDimension={handleSelectDimension}
              isShifting={isShifting}
            />

            {/* Reins & Flight Controls Deck */}
            <FlightControlDeck
              flightState={flightState}
              onUpdateFlightState={(partial) => setFlightState((prev) => ({ ...prev, ...partial }))}
            />
          </>
        )}

        {activeView === 'runner' && <FamilyTableDashboard />}

        {activeView === 'blueprint' && <ArchitecturalBlueprint />}

        {activeView === 'pipeline' && <MediaPipelineStudio />}

        {activeView === 'comparison' && (
          <DimensionalComparisonView
            onSelectDimension={(dim) => {
              handleSelectDimension(dim);
              setActiveView('simulator');
            }}
          />
        )}
      </main>

      {/* Gemini AI Tactical Oracle Modal */}
      <GeminiOracleModal
        isOpen={isOracleOpen}
        onClose={() => setIsOracleOpen(false)}
        currentDimension={currentDimension}
        flightState={flightState}
      />

      {/* Footer */}
      <footer className="border-t border-cyan-500/10 py-4 px-6 text-center text-xs font-mono text-slate-500 bg-slate-950/60 backdrop-blur-md">
        <span>AETHER-9 Spatial Computing Matrix • 1:1 Volumetric Holographic Renderer • 432Hz Harmonic Tuning</span>
      </footer>
    </div>
  );
}
