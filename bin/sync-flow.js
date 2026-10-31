#!/usr/bin/env node

/**
 * sync-flow.js - Sync Google Flow Automation Engine from Upstream
 * Fetches latest updates (models, DOM selectors, upscalers) from irsadfzn6/google-flow-automation
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("==================================================");
console.log(" 🔄 MoneyPrinterMax - Google Flow Engine Sync");
console.log("==================================================\n");

const rootDir = path.resolve(__dirname, "..");
const localFlowDir = path.resolve(rootDir, "..", "google-flow-automation");
const engineFlowDir = path.join(rootDir, "engine", "flow");

let syncedFrom = null;

// 1. Try local sibling directory sync first (fastest & preserves local dev tweaks)
if (fs.existsSync(localFlowDir) && fs.existsSync(path.join(localFlowDir, "src", "client.js"))) {
  console.log(`[Sync] Terdeteksi folder lokal: ${localFlowDir}`);
  console.log("[Sync] Menyinkronkan file engine dari folder lokal...");

  const filesToCopy = [
    { src: path.join(localFlowDir, "src", "client.js"), dest: path.join(engineFlowDir, "client.js") },
    { src: path.join(localFlowDir, "src", "dom.js"), dest: path.join(engineFlowDir, "dom.js") },
    { src: path.join(localFlowDir, "src", "config.js"), dest: path.join(engineFlowDir, "config.js") },
    { src: path.join(localFlowDir, "generate-youtube-batch.js"), dest: path.join(engineFlowDir, "batch.js") }
  ];

  for (const f of filesToCopy) {
    if (fs.existsSync(f.src)) {
      fs.copyFileSync(f.src, f.dest);
      console.log(`  ✓ ${path.basename(f.src)} -> ${path.relative(rootDir, f.dest)}`);
    }
  }
  syncedFrom = "folder lokal (sibling directory)";
} else {
  // 2. Fallback to git upstream remote
  console.log("[Sync] Mengambil pembaruan dari Git upstream (https://github.com/irsadfzn6/google-flow-automation)...");
  try {
    execSync("git fetch upstream main", { cwd: rootDir, stdio: "inherit" });
    
    // Checkout specific files from upstream/main to engine/flow
    const upstreamFiles = [
      { upstream: "src/client.js", local: "engine/flow/client.js" },
      { upstream: "src/dom.js", local: "engine/flow/dom.js" },
      { upstream: "src/config.js", local: "engine/flow/config.js" },
      { upstream: "generate-youtube-batch.js", local: "engine/flow/batch.js" }
    ];

    for (const f of upstreamFiles) {
      try {
        const content = execSync(`git show upstream/main:${f.upstream}`, { cwd: rootDir, encoding: "utf-8" });
        fs.writeFileSync(path.join(rootDir, f.local), content, "utf-8");
        console.log(`  ✓ upstream/main:${f.upstream} -> ${f.local}`);
      } catch (err) {
        console.warn(`  ! Gagal sinkronisasi ${f.upstream}: ${err.message}`);
      }
    }
    syncedFrom = "upstream/main (GitHub)";
  } catch (err) {
    console.error(`[ERROR] Gagal melakukan git fetch upstream:`, err.message);
    process.exit(1);
  }
}

console.log(`\n[SUKSES] Engine Google Flow berhasil diperbarui dari ${syncedFrom}!`);
console.log("Semua pembaruan model, DOM, dan auto-upscale telah disinkronkan ke MoneyPrinterMax.\n");
