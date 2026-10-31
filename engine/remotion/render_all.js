/**
 * render_all.js - Multi-Scene Remotion Batch Renderer & Video Merger
 * MoneyPrinterMax Studio Pipeline
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const mode = (process.argv[2] || "long").toLowerCase(); // "long" (16:9) or "shorts" (9:16)
const isShorts = mode.includes("short");

const rootDir = path.resolve(__dirname);
const outDir = path.join(rootDir, "out");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log(`=== MEMULAI RENDER VIDEO: ${isShorts ? "SHORTS (9:16)" : "LONG (16:9)"} ===\n`);

// Discover available scenes
const dataDir = path.join(rootDir, "src", "data");
const sceneFiles = fs.existsSync(dataDir)
  ? fs.readdirSync(dataDir).filter((f) => f.startsWith("adegan") && f.endsWith(".json"))
  : [];

if (sceneFiles.length === 0) {
  console.error("[ERROR] Tidak ada file adegan ditemukan di src/data/. Jalankan build_scene.py terlebih dahulu!");
  process.exit(1);
}

const sceneCount = sceneFiles.length;
console.log(`Ditemukan ${sceneCount} adegan yang siap di-render.\n`);

const renderedList = [];

for (let i = 1; i <= sceneCount; i++) {
  const compName = isShorts ? `ShortsAdegan${i}` : `Adegan${i}`;
  const targetMp4 = path.join(outDir, `${compName.toLowerCase()}.mp4`);

  if (fs.existsSync(targetMp4) && fs.statSync(targetMp4).size > 500000) {
    console.log(`[${i}/${sceneCount}] ${compName} sudah ada (${(fs.statSync(targetMp4).size / 1024 / 1024).toFixed(1)} MB), melewati...`);
    renderedList.push(path.basename(targetMp4));
    continue;
  }

  console.log("------------------------------------------------------------");
  console.log(`[${i}/${sceneCount}] Rendering ${compName}...`);
  const cmd = `npx remotion render src/index.ts ${compName} out/${path.basename(targetMp4)}`;
  try {
    execSync(cmd, { cwd: rootDir, stdio: "inherit" });
    console.log(`[SUKSES] ${compName} selesai di-render!\n`);
    renderedList.push(path.basename(targetMp4));
  } catch (err) {
    console.error(`[ERROR] Gagal merender ${compName}:`, err.message);
    process.exit(1);
  }
}

// Concatenate all rendered scenes using ffmpeg
console.log("------------------------------------------------------------");
const finalOutputName = isShorts ? "final_video_shorts.mp4" : "final_video_long.mp4";
const finalOutputPath = path.join(outDir, finalOutputName);
console.log(`Menggabungkan ${renderedList.length} adegan menjadi ${finalOutputName}...`);

const concatListPath = path.join(outDir, `concat_${mode}.txt`);
const listContent = renderedList.map((f) => `file '${f}'`).join("\n") + "\n";
fs.writeFileSync(concatListPath, listContent, "ascii");

const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${finalOutputPath}"`;
try {
  execSync(ffmpegCmd, { cwd: outDir, stdio: "inherit" });
  console.log(`\n[SUKSES LENGKAP] Video final berhasil digabungkan: ${finalOutputPath}`);
  if (fs.existsSync(finalOutputPath)) {
    console.log(`Ukuran file: ${(fs.statSync(finalOutputPath).size / 1024 / 1024).toFixed(1)} MB`);
  }
} catch (err) {
  console.error("[ERROR] Gagal menggabungkan video via ffmpeg:", err.message);
  process.exit(1);
}
