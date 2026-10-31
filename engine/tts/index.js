/**
 * index.js - Unified TTS Engine (Cartesia AI & ElevenLabs)
 * Wajib menggunakan API Key dan Voice ID.
 */

const fs = require("fs");
const path = require("path");
const { generateCartesiaAudio } = require("./cartesia");
const { generateElevenLabsAudio } = require("./elevenlabs");

async function generateSpeech({
  text,
  outputPath,
  provider = process.env.TTS_PROVIDER || "cartesia",
  voiceId = null,
  apiKey = null
}) {
  const chosenProvider = provider.toLowerCase();

  if (chosenProvider === "cartesia" || chosenProvider === "auto") {
    const key = apiKey || process.env.CARTESIA_API_KEY;
    const vId = voiceId || process.env.CARTESIA_VOICE_ID;
    if (!key) {
      throw new Error(
        "CARTESIA_API_KEY wajib diisi! Masukkan API key Cartesia Anda di file .env atau parameter fungsi."
      );
    }
    if (!vId) {
      throw new Error(
        "CARTESIA_VOICE_ID wajib diisi! Masukkan Voice ID Cartesia Anda di file .env atau parameter fungsi."
      );
    }
    return await generateCartesiaAudio({ text, outputPath, apiKey: key, voiceId: vId });
  }

  if (chosenProvider === "elevenlabs") {
    const key = apiKey || process.env.ELEVENLABS_API_KEY;
    const vId = voiceId || process.env.ELEVENLABS_VOICE_ID;
    if (!key) {
      throw new Error(
        "ELEVENLABS_API_KEY wajib diisi! Masukkan API key ElevenLabs Anda di file .env atau parameter fungsi."
      );
    }
    if (!vId) {
      throw new Error(
        "ELEVENLABS_VOICE_ID wajib diisi! Masukkan Voice ID ElevenLabs Anda di file .env atau parameter fungsi."
      );
    }
    return await generateElevenLabsAudio({ text, outputPath, apiKey: key, voiceId: vId });
  }

  throw new Error(
    `Unsupported TTS provider: "${provider}". Gunakan "cartesia" (default) atau "elevenlabs" dengan menyertakan API Key dan Voice ID.`
  );
}

module.exports = {
  generateSpeech,
  generateCartesiaAudio,
  generateElevenLabsAudio
};
