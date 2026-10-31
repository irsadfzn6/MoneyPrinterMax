/**
 * cartesia.js - Cartesia AI TTS Provider
 * High-speed, natural emotional AI voice synthesis.
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function generateCartesiaAudio({
  text,
  outputPath,
  apiKey = process.env.CARTESIA_API_KEY,
  voiceId = process.env.CARTESIA_VOICE_ID || "b2a6771c-0f34-432b-9cf2-fd22efd32e3b", // Default: Victor
  modelId = "sonic-multilingual",
  language = "id"
}) {
  if (!apiKey) {
    throw new Error("CARTESIA_API_KEY is required for Cartesia TTS. Set it in .env or pass as argument.");
  }

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const response = await axios({
    method: "POST",
    url: "https://api.cartesia.ai/tts/bytes",
    headers: {
      "X-API-Key": apiKey,
      "Cartesia-Version": "2024-06-10",
      "Content-Type": "application/json"
    },
    data: {
      model_id: modelId,
      transcript: text,
      voice: {
        mode: "id",
        id: voiceId
      },
      output_format: {
        container: "wav",
        encoding: "pcm_s16le",
        sample_rate: 44100
      },
      language: language
    },
    responseType: "arraybuffer",
    timeout: 30000
  });

  fs.writeFileSync(outputPath, Buffer.from(response.data));
  return {
    path: outputPath,
    provider: "cartesia",
    size: fs.statSync(outputPath).size
  };
}

module.exports = { generateCartesiaAudio };
