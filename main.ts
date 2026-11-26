import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destinationPath = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, destinationPath);

console.log(`Copied ${sourcePath} -> ${destinationPath}`);
