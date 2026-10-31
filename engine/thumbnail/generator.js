/**
 * generator.js - AI Thumbnail Generator (Nano Banana 2.1 in Google Flow)
 * Directly generates YouTube thumbnails with embedded title typography from the prompt.
 */

const fs = require("fs");
const path = require("path");
const FlowClient = require("../flow/client");

async function generateThumbnail({
  titleText = "MATAHARI PADAM?!",
  conceptPrompt,
  outputPath,
  charRef = null,
  projectDir = null,
  port = 9222
}) {
  const client = new FlowClient({ port });
  const page = await client.connect();

  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Format prompt with embedded text typography instruction
  const finalPrompt = `2D flat minimalist vector YouTube thumbnail illustration in Kurzgesagt and Kok Bisa style. Featuring bold comic vector title typography reading "${titleText}" rendered in giant prominent bright yellow text with solid black outlines. ${conceptPrompt}. High contrast, ultra clean vector art, vibrant eye-catching composition, 16:9 widescreen format, highly readable on mobile screens.`;

  let ingredients = [];
  if (charRef && projectDir) {
    const charPath = path.join(projectDir, "visual", "karakter", charRef.endsWith(".png") ? charRef : `${charRef}.png`);
    if (fs.existsSync(charPath)) ingredients.push(charPath);
  }

  console.log(`[Thumbnail AI] Generating thumbnail with Nano Banana 2.1...`);
  console.log(`- Title Typography: "${titleText}"`);
  console.log(`- Target File: ${outputPath}`);

  const res = await client.runScene({
    mediaType: "image",
    model: "Nano Banana 2.1",
    aspect: "16:9",
    ingredients: ingredients,
    clearIngredients: true,
    prompt: finalPrompt,
    generate: true,
    wait: true,
    timeout: 120,
    output: outputPath,
    upscale: true
  });

  await client.disconnect();
  return {
    path: outputPath,
    model: "Nano Banana 2.1",
    titleText: titleText
  };
}

module.exports = { generateThumbnail };
