import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "node_modules", "tinymce");
const publicDir = join(root, "public");
const dest = join(publicDir, "tinymce");

if (!existsSync(src)) {
  console.warn("[copy-tinymce] node_modules/tinymce not found, skipping.");
  process.exit(0);
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true });
}
mkdirSync(publicDir, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[copy-tinymce] Copied node_modules/tinymce -> public/tinymce");
