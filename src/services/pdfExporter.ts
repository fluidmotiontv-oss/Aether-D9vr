import { jsPDF } from 'jspdf';
import { INITIAL_27_SEATS } from '../components/FamilyTableDashboard';
import { NINE_DIMENSIONS } from '../types/spatial';

export function exportFrameworkPdfReport() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 280) {
      doc.addPage();
      y = 15;
    }
  };

  // Header Banner
  doc.setFillColor(8, 47, 73); // Cyan Dark
  doc.rect(10, y, pageWidth - 20, 22, 'F');

  doc.setTextColor(6, 182, 212); // Cyan Bright
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text("AETHER-9: VR & HOLOGRAPHIC SPATIAL COMPUTING MATRIX", 14, y + 9);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text("Executive Technical Framework, 27-Seat Family Table & DWENS Playout Report", 14, y + 16);

  y += 28;

  // Executive Summary Section
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("1. EXECUTIVE ARCHITECTURAL SUMMARY", 12, y);
  y += 6;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const summaryText = "AETHER-9 is an end-to-end spatial computing ecosystem bridging real-time WebXR flight mechanics with a headless Node.js media rendering pipeline (DWENS) for automated broadcasting on FluidmotionTV. Environment temporal physics are governed by the Dragon 9 framework (26.66-hour days, 54-minute hours), enabling time synchronization during dimensional shifts.";
  const splitSummary = doc.splitTextToSize(summaryText, pageWidth - 24);
  doc.text(splitSummary, 12, y);
  y += splitSummary.length * 4.5 + 4;

  // The Family Table (27 Seats Roster)
  checkPageBreak(50);
  doc.setTextColor(168, 85, 247); // Purple
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("2. THE FAMILY TABLE: 27 SPECIALIZED AGENT SEATS ROSTER", 12, y);
  y += 6;

  // Table Headers
  doc.setFillColor(15, 23, 42);
  doc.rect(12, y, pageWidth - 24, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text("SEAT", 14, y + 5);
  doc.text("AGENT NAME & ROLE", 28, y + 5);
  doc.text("PAYLOAD", 110, y + 5);
  doc.text("STATUS", 168, y + 5);
  y += 8;

  INITIAL_27_SEATS.forEach((seat) => {
    checkPageBreak(7);
    doc.setFillColor(seat.seatNumber % 2 === 0 ? 245 : 255, 245, 255);
    doc.rect(12, y, pageWidth - 24, 6, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text(`#${String(seat.seatNumber).padStart(2, '0')}`, 14, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.text(seat.agentName.substring(0, 38), 28, y + 4.5);
    doc.text(seat.currentPayload.substring(0, 32), 110, y + 4.5);

    doc.setTextColor( seat.status === 'ACTIVE' ? 16 : 180, seat.status === 'ACTIVE' ? 185 : 83, seat.status === 'ACTIVE' ? 129 : 9 );
    doc.setFont('helvetica', 'bold');
    doc.text(seat.status, 168, y + 4.5);

    y += 6.5;
  });

  y += 6;

  // Pillars & Technical Framework
  checkPageBreak(40);
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("3. THE THREE PILLARS & CODE SCAFFOLDS", 12, y);
  y += 6;

  const pillarDetails = [
    {
      title: "PILLAR 1: VR & Holographic Client (Vite / React / Three.js)",
      desc: "1:1 Volumetric mapping mapped to WebXR 6DOF telemetry. World-space glassmorphism wrist/cockpit HUD. Flight loop governed by 26.66h day / 54m hour Dragon 9 clock dynamics.",
      deliverable: "Deliverable 1 Code Scaffold: /src/scaffolds/Pillar1_VRClient.ts"
    },
    {
      title: "PILLAR 2: The 9 Dimensional Forms (WebGL Shaders & Morphology)",
      desc: "Mesh transitions across Physical Metallic (Forms 1-3), Emissive Wireframe Glitch (Forms 4-6), and Raymarched Volumetric Particle Ether (Forms 7-9) without reloading 9 models.",
      deliverable: "Deliverable 2 Code Scaffold: /src/scaffolds/Pillar2_GLSLShader.glsl.ts"
    },
    {
      title: "PILLAR 3: DWENS Media Pipeline Integration (Node.js / FFmpeg)",
      desc: "Client streams 60Hz spatial telemetry over WebSockets to orchestrator.js. Headless WebGL context extracts 60fps frames, mixes 432Hz spatial audio, and spawns FFmpeg for FluidmotionTV.",
      deliverable: "Deliverable 3 Code Scaffold: /src/scaffolds/Pillar3_Orchestrator.ts"
    }
  ];

  pillarDetails.forEach((p) => {
    checkPageBreak(20);
    doc.setFillColor(241, 245, 249);
    doc.rect(12, y, pageWidth - 24, 18, 'F');

    doc.setTextColor(8, 47, 73);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(p.title, 14, y + 5);

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const splitDesc = doc.splitTextToSize(p.desc, pageWidth - 28);
    doc.text(splitDesc, 14, y + 9);

    doc.setTextColor(168, 85, 247);
    doc.setFont('helvetica', 'bold');
    doc.text(p.deliverable, 14, y + 15);

    y += 21;
  });

  // Formation Infinity Dual Phase Section
  checkPageBreak(30);
  doc.setTextColor(245, 158, 11); // Amber
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("4. FORMATION INFINITY DUAL PHASE FLIGHT LOGIC", 12, y);
  y += 6;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const infinityText = "Primary lead dragon (Phase 1) and secondary escort avatar (Phase 2) fly along a 3D Lemniscate of Bernoulli figure-8 orbit centered at origin (0,0,0). Phase offset delta = PI guarantees continuous interweaving cross-overs through the central rift node without collision, producing binaural theta acoustic resonance (432Hz vs 435.5Hz) streamed to FluidmotionTV broadcast nodes.";
  const splitInfinity = doc.splitTextToSize(infinityText, pageWidth - 24);
  doc.text(splitInfinity, 12, y);
  y += splitInfinity.length * 4.5 + 6;

  // Streamlined MVP Roadmap
  checkPageBreak(35);
  doc.setTextColor(16, 185, 129); // Emerald
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("5. STREAMLINED MVP ROADMAP (5-WEEK DEPLOYMENT)", 12, y);
  y += 6;

  const roadmapSteps = [
    "Week 1: Three.js WebXR canvas setup, base GLTF cyber dragon loading, and sub-11ms frame budget.",
    "Week 2: Compile dragon_dimensional_morph.glsl shader matrix and map 1D-9D morph target uniforms.",
    "Week 3: Connect 60Hz WebSocket telemetry client stream to orchestrator.js backend endpoint.",
    "Week 4: Execute headless WebGL frame sequence extraction and 432Hz spatial audio track synthesis.",
    "Week 5: Execute FFmpeg 60fps MP4 compilation pipeline and inject streams into FluidmotionTV playout node."
  ];

  roadmapSteps.forEach((step, idx) => {
    checkPageBreak(8);
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`STEP ${idx + 1}:`, 14, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.text(step, 28, y + 4);
    y += 6;
  });

  // Footer Signature
  checkPageBreak(15);
  y += 6;
  doc.setDrawColor(203, 213, 225);
  doc.line(12, y, pageWidth - 12, y);
  y += 5;

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.text("AETHER-9 Master Production Runner • 27-Seat Family Table Ecosystem • FluidmotionTV Broadcast Node", 12, y);

  // Save PDF
  doc.save("AETHER9_Master_Framework_Executive_Report.pdf");
}
