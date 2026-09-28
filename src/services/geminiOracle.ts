import { GoogleGenAI } from '@google/genai';

export interface TacticalAnalysis {
  dimensionName: string;
  dimensionalStabilityIndex: number;
  quantumCoherenceRating: string;
  recommendedFlightVector: string;
  acousticResonanceAdvice: string;
  architecturalInsight: string;
}

export async function consultDimensionalOracle(
  promptText: string,
  currentDimension: number,
  flightSpeed: number,
  altitude: number
): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
    
    // Initialize GoogleGenAI SDK
    const ai = new GoogleGenAI({ apiKey: apiKey || undefined });

    const systemContext = `
You are the Lead Spatial Computing Architect and Tactical Rift Oracle for AETHER-9, a 9-Dimensional Holographic Dragon Flight Simulator and VR Game Engine.
Current Flight Telemetry:
- Current Dimension: ${currentDimension} of 9
- Speed: ${flightSpeed} knots
- Altitude: ${altitude} meters

Provide authoritative, highly technical, spatial-computing, and VR architecture focused responses. Your advice covers WebXR rendering pipelines, volumetric 1:1 holographic mapping, Web Audio 432Hz spatial acoustic tuning, 6DOF controller rein mechanics, and multidimensional geometry.
Keep responses concise, technical, structured, and immersive.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemContext}\n\nUser Tactical Query: ${promptText}`,
    });

    return response.text || "Dimensional Oracle channel established. Telemetry synchronized.";
  } catch (err: unknown) {
    console.error("Gemini Oracle error:", err);
    return `[AETHER-9 ORACLE TELEMETRY OFFLINE]: ${err instanceof Error ? err.message : 'API connection failed. Please verify API configuration.'}`;
  }
}
