import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const destinationPath = join(outputDir, "entry.png");

if (!existsSync(sourcePath)) {
  throw new Error(`entry.png not found beside main.ts: ${sourcePath}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, destinationPath);

const sourceBytes = statSync(sourcePath).size;
const copiedBytes = statSync(destinationPath).size;
if (copiedBytes !== sourceBytes) {
  throw new Error(
    `copy size mismatch: source ${sourceBytes} bytes, destination ${copiedBytes} bytes`,
  );
}

console.log(`Copied ${sourcePath} -> ${destinationPath} (${copiedBytes} bytes)`);
