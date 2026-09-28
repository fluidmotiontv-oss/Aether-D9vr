import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DimensionalPlane, DragonFlightState, NINE_DIMENSIONS, SpatialTelemetry } from '../types/spatial';
import { Maximize2, RefreshCw, Eye, Move, Smartphone } from 'lucide-react';

interface HolographicCanvasProps {
  currentDimension: DimensionalPlane;
  flightState: DragonFlightState;
  onTelemetryUpdate: (telemetry: SpatialTelemetry) => void;
  displayMode: 'hologram_tank' | 'full_xr' | 'first_person';
  setDisplayMode: (mode: 'hologram_tank' | 'full_xr' | 'first_person') => void;
}

export const HolographicCanvas: React.FC<HolographicCanvasProps> = ({
  currentDimension,
  flightState,
  onTelemetryUpdate,
  displayMode,
  setDisplayMode
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVrSupported, setIsVrSupported] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dragonGroupRef = useRef<THREE.Group | null>(null);
  const escortDragonGroupRef = useRef<THREE.Group | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const gridMeshRef = useRef<THREE.GridHelper | null>(null);
  const riftRingGroupRef = useRef<THREE.Group | null>(null);

  // Animation & Materials State
  const wingLeftRef = useRef<THREE.Mesh | null>(null);
  const wingRightRef = useRef<THREE.Mesh | null>(null);
  const dragonBodyRef = useRef<THREE.Mesh | null>(null);
  const dragonMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const particleMaterialRef = useRef<THREE.PointsMaterial | null>(null);

  // Check WebXR support
  useEffect(() => {
    if ('xr' in navigator && (navigator as unknown as { xr: { isSessionSupported: (mode: string) => Promise<boolean> } }).xr) {
      (navigator as unknown as { xr: { isSessionSupported: (mode: string) => Promise<boolean> } }).xr
        .isSessionSupported('immersive-vr')
        .then((supported) => setIsVrSupported(supported))
        .catch(() => setIsVrSupported(false));
    }
  }, []);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x020617, 0.02);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 3, 12);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.xr.enabled = true; // WebXR enablement
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    mainLight.position.set(5, 12, 8);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const secondaryLight = new THREE.PointLight(0xa855f7, 3, 30);
    secondaryLight.position.set(-8, -4, -5);
    scene.add(secondaryLight);

    // 5. Holographic Spatial Grid Floor
    const gridHelper = new THREE.GridHelper(40, 40, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -4;
    scene.add(gridHelper);
    gridMeshRef.current = gridHelper;

    // 6. Holographic Base Beam Projection Emitter
    const emitterGeo = new THREE.CylinderGeometry(6, 7, 0.5, 32);
    const emitterMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const emitterMesh = new THREE.Mesh(emitterGeo, emitterMat);
    emitterMesh.position.y = -4.2;
    scene.add(emitterMesh);

    // 7. Procedural Volumetric Holographic Dragon Construction
    const dragonGroup = new THREE.Group();
    scene.add(dragonGroup);
    dragonGroupRef.current = dragonGroup;

    // Wings Shape & Geometry
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(4, 1.5);
    wingShape.lineTo(3.2, -1.8);
    wingShape.lineTo(1.5, -1.2);
    wingShape.closePath();
    const wingGeo = new THREE.ShapeGeometry(wingShape);

    // Escort Secondary Dragon Group for Formation Infinity Dual Phase
    const escortDragonGroup = new THREE.Group();
    escortDragonGroup.visible = false; // toggled on when pattern is formation_infinity
    scene.add(escortDragonGroup);
    escortDragonGroupRef.current = escortDragonGroup;

    // Secondary Escort Dragon Material (Phase 2 Shifted Color)
    const escortMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.2,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });

    const escortBodyGeo = new THREE.ConeGeometry(0.7, 3.5, 8);
    escortBodyGeo.rotateX(Math.PI / 2);
    const escortBody = new THREE.Mesh(escortBodyGeo, escortMat);
    escortDragonGroup.add(escortBody);

    // Escort Wings
    const escortWing = new THREE.Mesh(wingGeo, escortMat);
    escortWing.position.set(0.3, 0.2, 0.5);
    escortDragonGroup.add(escortWing);

    // Dragon Material
    const dragonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentDimension.glowHex),
      emissive: new THREE.Color(currentDimension.glowHex),
      emissiveIntensity: currentDimension.morphologyRules.spineGlowIntensity * 0.4,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: currentDimension.morphologyRules.shaderType === 'wireframe' || currentDimension.morphologyRules.shaderType === 'tesseract',
      transparent: true,
      opacity: currentDimension.morphologyRules.opacity
    });
    dragonMaterialRef.current = dragonMat;

    // Dragon Body (Spine segments)
    const bodyGeo = new THREE.ConeGeometry(0.8, 4, 8);
    bodyGeo.rotateX(Math.PI / 2);
    const dragonBody = new THREE.Mesh(bodyGeo, dragonMat);
    dragonGroup.add(dragonBody);
    dragonBodyRef.current = dragonBody;

    // Dragon Head Node
    const headGeo = new THREE.DodecahedronGeometry(0.7);
    const headMesh = new THREE.Mesh(headGeo, dragonMat);
    headMesh.position.set(0, 0.3, 2.3);
    headMesh.name = "Quantum Core / Head";
    dragonGroup.add(headMesh);

    // Spine Glowing Resonance Crystals
    for (let i = 0; i < currentDimension.morphologyRules.tailNodes; i++) {
      const crystalGeo = new THREE.OctahedronGeometry(0.2 + (i * 0.01));
      const crystalMesh = new THREE.Mesh(crystalGeo, dragonMat);
      crystalMesh.position.set(0, 0.4 - (i * 0.05), 1.5 - (i * 0.35));
      dragonGroup.add(crystalMesh);
    }

    // Left Wing
    const leftWing = new THREE.Mesh(wingGeo, dragonMat);
    leftWing.position.set(0.4, 0.2, 0.5);
    leftWing.rotation.y = -Math.PI / 6;
    dragonGroup.add(leftWing);
    wingLeftRef.current = leftWing;

    // Right Wing
    const rightWing = new THREE.Mesh(wingGeo, dragonMat);
    rightWing.position.set(-0.4, 0.2, 0.5);
    rightWing.rotation.y = Math.PI + Math.PI / 6;
    rightWing.scale.set(-1, 1, 1);
    dragonGroup.add(rightWing);
    wingRightRef.current = rightWing;

    // 8. Dimensional Rift Rings Environment
    const riftGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(8 + i * 4, 0.08, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(currentDimension.glowHex),
        wireframe: true,
        transparent: true,
        opacity: 0.4 - i * 0.06
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = -20 - i * 15;
      riftGroup.add(ringMesh);
    }
    scene.add(riftGroup);
    riftRingGroupRef.current = riftGroup;

    // 9. Particle Aura / Volumetric Quantum Field
    const particleCount = currentDimension.morphologyRules.particleDensity;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(currentDimension.glowHex);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 40;

      colors[i] = baseColor.r;
      colors[i + 1] = baseColor.g;
      colors[i + 2] = baseColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    particleMaterialRef.current = particleMat;

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particlesMeshRef.current = particleSystem;

    // 10. Frame Loop & Animation
    let lastTime = performance.now();
    let frameCount = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Wing flap animation
      const flapSpeed = 4 + (flightState.speed / 200);
      const wingAngle = Math.sin(elapsedTime * flapSpeed) * 0.45;
      if (wingLeftRef.current) {
        wingLeftRef.current.rotation.z = wingAngle;
      }
      if (wingRightRef.current) {
        wingRightRef.current.rotation.z = -wingAngle;
      }

      // Dragon attitude & banking
      if (dragonGroupRef.current) {
        if (flightState.flightPattern === 'formation_infinity') {
          // Formation Infinity Dual Phase Lemniscate of Bernoulli
          const scaleA = 6.0;
          const t = elapsedTime * 0.8;

          // Primary Lead Dragon Position (Phase 1)
          const denom1 = 1 + Math.sin(t) * Math.sin(t);
          const x1 = (scaleA * Math.cos(t)) / denom1;
          const z1 = (scaleA * Math.sin(t) * Math.cos(t)) / denom1;
          const y1 = Math.sin(2 * t) * 1.5;

          dragonGroupRef.current.position.set(x1, y1, z1);
          dragonGroupRef.current.rotation.y = -t + Math.PI / 2;
          dragonGroupRef.current.rotation.z = Math.sin(t) * 0.4;

          // Secondary Escort Dragon Position (Phase 2 - Counter-Phase t + PI)
          if (escortDragonGroupRef.current) {
            escortDragonGroupRef.current.visible = true;
            const t2 = t + Math.PI;
            const denom2 = 1 + Math.sin(t2) * Math.sin(t2);
            const x2 = (scaleA * Math.cos(t2)) / denom2;
            const z2 = (scaleA * Math.sin(t2) * Math.cos(t2)) / denom2;
            const y2 = Math.sin(2 * t2) * 1.5;

            escortDragonGroupRef.current.position.set(x2, y2, z2);
            escortDragonGroupRef.current.rotation.y = -t2 + Math.PI / 2;
            escortDragonGroupRef.current.rotation.z = Math.sin(t2) * 0.4;
          }
        } else {
          if (escortDragonGroupRef.current) escortDragonGroupRef.current.visible = false;

          const pitchRad = (flightState.pitch * Math.PI) / 180;
          const rollRad = (flightState.roll * Math.PI) / 180;
          const yawRad = (flightState.yaw * Math.PI) / 180;

          dragonGroupRef.current.rotation.x = pitchRad + Math.sin(elapsedTime * 1.5) * 0.05;
          dragonGroupRef.current.rotation.z = -rollRad + Math.cos(elapsedTime * 1.2) * 0.05;
          dragonGroupRef.current.rotation.y = yawRad;

          // Weight shift translation offset
          dragonGroupRef.current.position.x = flightState.weightShift.x * 1.5;
          dragonGroupRef.current.position.y = flightState.weightShift.y * 1.5 + Math.sin(elapsedTime * 2) * 0.2;
          dragonGroupRef.current.position.z = 0;
        }
      }

      // Rotate Dimensional Rift Rings
      if (riftRingGroupRef.current) {
        riftRingGroupRef.current.children.forEach((ring, idx) => {
          ring.rotation.z += 0.005 * (idx + 1);
          ring.position.z += (flightState.speed / 100) * 0.2;
          if (ring.position.z > 10) {
            ring.position.z = -80;
          }
        });
      }

      // Particle movement
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = elapsedTime * 0.05;
      }

      // Camera positioning based on Display Mode
      if (cameraRef.current) {
        if (displayMode === 'first_person') {
          // Inside Dragon Cockpit
          cameraRef.current.position.set(0, 0.8, 2.1);
          cameraRef.current.lookAt(0, 0, 20);
        } else if (displayMode === 'full_xr') {
          // Dynamic Spatial Orbit
          cameraRef.current.position.x = Math.sin(elapsedTime * 0.2) * 14;
          cameraRef.current.position.z = Math.cos(elapsedTime * 0.2) * 14;
          cameraRef.current.position.y = 4 + Math.sin(elapsedTime * 0.5) * 2;
          cameraRef.current.lookAt(0, 0, 0);
        } else {
          // Hologram Tank Mode (front fixed isometric glass view)
          cameraRef.current.position.set(0, 2.5, 11);
          cameraRef.current.lookAt(0, 0, 0);
        }
      }

      // Telemetry calculation
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        onTelemetryUpdate({
          fps,
          frameTimeMs: parseFloat((1000 / Math.max(fps, 1)).toFixed(1)),
          gpuDrawCalls: renderer.info.render.calls,
          pointCloudCount: currentDimension.morphologyRules.particleDensity,
          spatialAudioLatencyMs: 12,
          headsetTrackingState: displayMode === 'full_xr' ? 'OPTICAL_6DOF' : 'HOLOGRAPHIC_3D',
          ipdMm: 64,
          fovDegrees: displayMode === 'full_xr' ? 110 : 90,
          leftControllerBattery: 92,
          rightControllerBattery: 88,
          hapticIntensity: flightState.isShifting ? 100 : Math.round(flightState.speed / 10)
        });
        frameCount = 0;
        lastTime = now;
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.setAnimationLoop(null);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Synchronize 3D dragon materials and particle field when active dimension changes
  useEffect(() => {
    if (dragonMaterialRef.current) {
      const colorHex = new THREE.Color(currentDimension.glowHex);
      dragonMaterialRef.current.color = colorHex;
      dragonMaterialRef.current.emissive = colorHex;
      dragonMaterialRef.current.emissiveIntensity = currentDimension.morphologyRules.spineGlowIntensity * 0.4;
      dragonMaterialRef.current.wireframe = currentDimension.morphologyRules.shaderType === 'wireframe' || currentDimension.morphologyRules.shaderType === 'tesseract';
      dragonMaterialRef.current.opacity = currentDimension.morphologyRules.opacity;
    }

    // Morph Scale based on Volumetric scale
    if (dragonGroupRef.current) {
      const s = currentDimension.morphologyRules.volumetricScale;
      dragonGroupRef.current.scale.set(s, s, s);
    }

    if (particleMaterialRef.current) {
      particleMaterialRef.current.color = new THREE.Color(currentDimension.glowHex);
    }
  }, [currentDimension]);

  // Request WebXR VR session
  const enterVrSession = async () => {
    if (!rendererRef.current) return;
    try {
      const xr = (navigator as unknown as { xr: { requestSession: (mode: string) => Promise<XRSession> } }).xr;
      if (xr) {
        const session = await xr.requestSession('immersive-vr');
        await rendererRef.current.xr.setSession(session);
        setDisplayMode('full_xr');
      }
    } catch (e) {
      alert("WebXR VR session launch attempted: " + (e instanceof Error ? e.message : 'Ensure a VR headset is connected. Simulator fallback active.'));
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[600px] rounded-2xl overflow-hidden glass-panel-cyan border border-cyan-500/30 flex flex-col justify-between">
      {/* Top Controls Overlay */}
      <div className="relative z-10 p-4 flex flex-wrap items-center justify-between gap-2 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <h2 className="text-sm font-bold tracking-wider text-cyan-300 font-orbitron uppercase">
              Volumetric Holographic Tank (1:1 Projection)
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Dimension: {currentDimension.dimension}D — {currentDimension.codeName}
            </p>
          </div>
        </div>

        {/* Display Mode Toggles */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDisplayMode('hologram_tank')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              displayMode === 'hologram_tank'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Hologram Glass</span>
          </button>

          <button
            onClick={() => setDisplayMode('first_person')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              displayMode === 'first_person'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>Cockpit View</span>
          </button>

          <button
            onClick={enterVrSession}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
              displayMode === 'full_xr'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40'
                : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{isVrSupported ? 'Enter WebXR VR' : 'WebXR Simulator'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        {/* Hologram Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none hologram-scanline opacity-30 z-10" />

        {/* Glassmorphic Projector Beams Effect */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/20 via-cyan-500/5 to-transparent pointer-events-none z-10" />

        {/* Three.js canvas mount */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Anatomical Node Inspection Overlay */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
          {['Quantum Core', 'Wing Hinge Matrix', 'Spine Resonator', 'Breath Vent'].map((node) => (
            <button
              key={node}
              onClick={() => setSelectedNode(node)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono border backdrop-blur-md transition-all ${
                selectedNode === node
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              • {node}
            </button>
          ))}
        </div>

        {/* Selected Node Details Tooltip */}
        {selectedNode && (
          <div className="absolute bottom-14 left-4 z-30 p-3 rounded-lg glass-panel max-w-xs border border-cyan-400/40 text-xs">
            <div className="flex items-center justify-between font-bold text-cyan-300 font-orbitron mb-1">
              <span>{selectedNode} Spec</span>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-slate-300 text-[11px]">
              {selectedNode === 'Quantum Core' && 'Volumetric 1:1 focal node holding the dragon dimensional anchor frequency (432Hz - 1728Hz).'}
              {selectedNode === 'Wing Hinge Matrix' && 'Dynamic kinematic bone joints translating VR motion controller grip tension into aerodynamic lift.'}
              {selectedNode === 'Spine Resonator' && 'Torus crystal string array emitting binaural acoustic shockwaves across dimensional rifts.'}
              {selectedNode === 'Breath Vent' && 'Plasma combustion manifold generating rift propulsion and time synchronization bursts.'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 py-2 bg-slate-950/80 backdrop-blur-md border-t border-cyan-500/20 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400">PITCH: {flightState.pitch.toFixed(1)}°</span>
          <span className="text-purple-400">ROLL: {flightState.roll.toFixed(1)}°</span>
          <span className="text-amber-400">SPEED: {flightState.speed.toFixed(0)} KTS</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>HARMONIC: <strong className="text-cyan-300 font-semibold">{currentDimension.harmonicFreq}Hz</strong></span>
          <span className="text-emerald-400">RIFT SYNC: {flightState.riftSync.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};
