import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distRoot = path.join(projectRoot, "dist");
const bundleRoot = path.join(distRoot, "report-gsj-share");

const filesToCopy = [
  "index.html",
  "styles.css",
  "app.js",
  "data/marketing-report.js",
  "data/marketing-report.json",
  "assets/logo-gsj-05.png",
];

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function copyFile(relativePath) {
  const source = path.join(projectRoot, relativePath);
  const target = path.join(bundleRoot, relativePath);
  await ensureParentDir(target);
  await fs.copyFile(source, target);
}

async function writeGuide() {
  const guide = `# Report GSJ Share Bundle

Day la ban chia se tinh cua dashboard Report GSJ.

## Cach mo

1. Giai nen thu muc nay.
2. Mo file \`index.html\` bang trinh duyet.

## Cach gui cho nguoi khac

- Cach nhanh nhat: nen zip ca thu muc \`report-gsj-share\` roi gui.
- Neu muon xem online: dua thu muc nay len Netlify, Vercel hoac GitHub Pages.

## Nguon du lieu

Du lieu da duoc dong bo san vao:

- \`data/marketing-report.js\`
- \`data/marketing-report.json\`
`;

  await fs.writeFile(path.join(bundleRoot, "README-SHARE.md"), guide, "utf8");
}

async function main() {
  await fs.rm(bundleRoot, { recursive: true, force: true });
  await fs.mkdir(bundleRoot, { recursive: true });

  for (const relativePath of filesToCopy) {
    await copyFile(relativePath);
  }

  await writeGuide();

  console.log(`Da tao ban chia se tai ${bundleRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
