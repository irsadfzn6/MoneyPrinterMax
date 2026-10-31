/**
 * index.js - Unified Multi-TTS Engine
 * Supports: Cartesia AI, ElevenLabs, Edge-TTS (Free), or local audio files.
 */

const fs = require("fs");
const path = require("path");
const { generateCartesiaAudio } = require("./cartesia");
const { generateEdgeAudio } = require("./edge_tts");
const { generateElevenLabsAudio } = require("./elevenlabs");

async function generateSpeech({
  text,
  outputPath,
  provider = process.env.TTS_PROVIDER || "auto",
  voiceId = null,
  apiKey = null
}) {
  const chosenProvider = provider.toLowerCase();

  // Auto-detection logic:
  // If provider is 'auto', pick Cartesia if key exists, then ElevenLabs, else fallback to free Edge-TTS!
  if (chosenProvider === "auto") {
    if (process.env.CARTESIA_API_KEY || (apiKey && apiKey.startsWith("sk_car_"))) {
      return await generateCartesiaAudio({ text, outputPath, apiKey, voiceId });
    }
    if (process.env.ELEVENLABS_API_KEY) {
      return await generateElevenLabsAudio({ text, outputPath, apiKey, voiceId });
    }
    console.log("[TTS] No paid API key detected. Using high-quality Edge-TTS (FREE)...");
    return await generateEdgeAudio({ text, outputPath, voice: voiceId || undefined });
  }

  if (chosenProvider === "cartesia") {
    return await generateCartesiaAudio({ text, outputPath, apiKey, voiceId });
  }

  if (chosenProvider === "elevenlabs") {
    return await generateElevenLabsAudio({ text, outputPath, apiKey, voiceId });
  }

  if (chosenProvider === "edge" || chosenProvider === "edge-tts" || chosenProvider === "free") {
    return await generateEdgeAudio({ text, outputPath, voice: voiceId || undefined });
  }

  throw new Error(`Unsupported TTS provider: "${provider}". Use "cartesia", "elevenlabs", "edge-tts", or "auto".`);
}

module.exports = {
  generateSpeech,
  generateCartesiaAudio,
  generateEdgeAudio,
  generateElevenLabsAudio
};
