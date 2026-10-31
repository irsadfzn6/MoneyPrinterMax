/**
 * elevenlabs.js - ElevenLabs TTS Provider
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function generateElevenLabsAudio({
  text,
  outputPath,
  apiKey = process.env.ELEVENLABS_API_KEY,
  voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM", // Default: Rachel / custom
  modelId = "eleven_multilingual_v2"
}) {
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is required for ElevenLabs TTS. Set it in .env or pass as argument.");
  }

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const response = await axios({
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    data: {
      text: text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    },
    responseType: "arraybuffer",
    timeout: 30000
  });

  fs.writeFileSync(outputPath, Buffer.from(response.data));
  return {
    path: outputPath,
    provider: "elevenlabs",
    size: fs.statSync(outputPath).size
  };
}

module.exports = { generateElevenLabsAudio };
