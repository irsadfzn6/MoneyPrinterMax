#!/usr/bin/env node

/**
 * cli.js - MoneyPrinterMax CLI Entrypoint
 */

const path = require("path");
const fs = require("fs");

console.log("==================================================");
console.log(" 🎬 MoneyPrinterMax Studio - Video AI Engine");
console.log("==================================================\n");

const args = process.argv.slice(2);
const command = args[0] || "help";

if (command === "help" || command === "--help" || command === "-h") {
  console.log("Penggunaan:");
  console.log("  moneyprintermax flow:batch --project-dir <path> [--adegan <num>] [--shots <range>]");
  console.log("  moneyprintermax render:long [options]");
  console.log("  moneyprintermax render:shorts [options]");
  console.log("  moneyprintermax tts --text <text> --output <path> [--provider cartesia|edge-tts]");
  console.log("\nAtau gunakan Antigravity Slash Commands langsung di chat:");
  console.log("  /makevideolong   - Jalankan workflow video panjang (16:9, ~5-10 menit)");
  console.log("  /makevideoshorts - Jalankan workflow video shorts (9:16, 30-60 detik)");
  process.exit(0);
}

if (command === "flow:batch") {
  require("../engine/flow/batch");
} else if (command === "render:long") {
  process.argv[2] = "long";
  require("../engine/remotion/render_all");
} else if (command === "render:shorts") {
  process.argv[2] = "shorts";
  require("../engine/remotion/render_all");
} else {
  console.error(`Perintah tidak dikenal: ${command}. Jalankan 'moneyprintermax help' untuk bantuan.`);
  process.exit(1);
}
