/**
 * edge_tts.js - Microsoft Edge TTS Provider (100% FREE, Zero API Key required)
 * Uses high quality neural voices including natural Indonesian voices.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function generateEdgeAudio({
  text,
  outputPath,
  voice = process.env.EDGE_TTS_VOICE || "id-ID-ArdiNeural", // Default: id-ID-ArdiNeural (Natural Indonesian Male)
  rate = "+0%",
  pitch = "+0Hz"
}) {
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Escape text for shell or write to temporary file to avoid command-line quoting issues
  const tempTextFile = path.join(outDir, `_temp_tts_${Date.now()}.txt`);
  fs.writeFileSync(tempTextFile, text, "utf-8");

  try {
    const cmd = `python -m edge_tts --voice "${voice}" --rate "${rate}" --pitch "${pitch}" -f "${tempTextFile}" --write-media "${outputPath}"`;
    execSync(cmd, { stdio: "pipe", timeout: 30000 });

    if (fs.existsSync(tempTextFile)) fs.unlinkSync(tempTextFile);

    return {
      path: outputPath,
      provider: "edge-tts",
      voice: voice,
      size: fs.statSync(outputPath).size
    };
  } catch (err) {
    if (fs.existsSync(tempTextFile)) fs.unlinkSync(tempTextFile);
    throw new Error(`Edge TTS generation failed: ${err.message}`);
  }
}

module.exports = { generateEdgeAudio };
