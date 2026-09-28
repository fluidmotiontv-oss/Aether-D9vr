/**
 * PILLAR 1 DELIVERABLE: The VR & Holographic Client Scaffold
 * Tech Stack: Vite / React / Three.js / WebXR
 * Features: Base GLTF Cyber Dragon Loader, WebXR Canvas Initialization,
 *           useFrame Flight Loop, and Dragon 9 Temporal Clock Mechanics (26.66h day / 54m hour).
 */

export const PILLAR_1_VR_CLIENT_CODE = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

/**
 * DRAGON 9 TEMPORAL PHYSICS CONSTANTS
 * Standard Earth Day: 24.00 hours = 86,400 seconds
 * Dragon 9 Day: 26.66 hours = 95,976 seconds
 * Dragon 9 Hour: 54.00 minutes = 3,240 seconds (26.66 * 54 = 1,439.64 min/day)
 */
export const DRAGON9_TEMPORAL_CONFIG = {
  HOURS_PER_DAY: 26.66,
  MINUTES_PER_HOUR: 54.0,
  SECONDS_PER_HOUR: 3240.0,
  BASE_TEMPORAL_DILATION: 1.11083, // 95976s / 86400s
};

export interface CyberDragonFlightProps {
  wsUrl?: string; // WebSocket Telemetry Sync URL
  onTelemetryEmit?: (telemetryData: any) => void;
}

export const CyberDragonVRClient: React.FC<CyberDragonFlightProps> = ({
  wsUrl = 'ws://localhost:8080/telemetry',
  onTelemetryEmit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Initialize Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.xr.enabled = true; // WebXR 6DOF Enablement
    containerRef.current.appendChild(renderer.domElement);

    // Append WebXR VR Button
    document.body.appendChild(VRButton.createButton(renderer));

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // 3. Cyber Dragon Model & Rig Hierarchy
    const dragonGroup = new THREE.Group();
    scene.add(dragonGroup);

    // GLTF Model Loading
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/cyber_dragon_base.gltf',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1.5, 1.5, 1.5);
        dragonGroup.add(model);
      },
      undefined,
      (error) => {
        console.warn('GLTF base model fallback activated:', error);
        // Fallback procedural mesh scaffold
        const fallbackGeo = new THREE.ConeGeometry(1, 4, 8);
        fallbackGeo.rotateX(Math.PI / 2);
        const fallbackMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          wireframe: true,
          emissive: 0x00f0ff,
          emissiveIntensity: 0.5,
        });
        const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
        dragonGroup.add(fallbackMesh);
      }
    );

    // 4. Connect WebSocket Telemetry Stream (Pillar 3 Sync)
    try {
      socketRef.current = new WebSocket(wsUrl);
      socketRef.current.onopen = () => console.log('DWENS Telemetry WebSocket Connected');
    } catch {
      console.warn('WebSocket connection deferred.');
    }

    // 5. Dragon 9 Flight Physics & Temporal Loop (useFrame equivalent)
    const clock = new THREE.Clock();
    let flightSpeed = 450; // knots
    let activeDimension = 3; // Forms 1-9

    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Dragon 9 Time Dilation Calculation
      // 54-minute hour clock accelerates time dilation during high-speed flight
      const speedFactor = flightSpeed / 500;
      const dragon9HourProgress = (elapsedTime / DRAGON9_TEMPORAL_CONFIG.SECONDS_PER_HOUR) % 1.0;
      const temporalDilation = DRAGON9_TEMPORAL_CONFIG.BASE_TEMPORAL_DILATION * (1.0 + speedFactor * 0.5);

      // Kinetic weight-shifting aerodynamics
      const pitch = Math.sin(elapsedTime * 1.5) * 0.2;
      const roll = Math.cos(elapsedTime * 1.2) * 0.3;
      const yaw = elapsedTime * 0.1;

      dragonGroup.rotation.x = pitch;
      dragonGroup.rotation.z = -roll;
      dragonGroup.rotation.y = yaw;
      dragonGroup.position.y = Math.sin(elapsedTime * 2.0) * 0.2;

      // Stream 60Hz Spatial Telemetry to DWENS Orchestrator
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const telemetryPayload = {
          timestamp: Date.now(),
          dragon9Hour: (dragon9HourProgress * DRAGON9_TEMPORAL_CONFIG.HOURS_PER_DAY).toFixed(2),
          temporalDilation: temporalDilation.toFixed(4),
          position: { x: dragonGroup.position.x, y: dragonGroup.position.y, z: dragonGroup.position.z },
          rotation: { pitch, roll, yaw },
          speedKnots: flightSpeed,
          dimension: activeDimension,
        };
        socketRef.current.send(JSON.stringify(telemetryPayload));
        if (onTelemetryEmit) onTelemetryEmit(telemetryPayload);
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(renderLoop);

    // Cleanup
    return () => {
      renderer.setAnimationLoop(null);
      if (socketRef.current) socketRef.current.close();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [wsUrl]);

  return <div ref={containerRef} className="w-full h-full relative" />;
};
`;
