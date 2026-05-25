import { createServer } from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const host = "127.0.0.1";
const port = Number(process.env.PORT || "8081");
const nodeBin = process.execPath;
const pythonBin = process.env.PYTHON_BIN || "python3";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

let isSyncing = false;

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function safePathname(url) {
  const pathname = new URL(url, `http://${host}:${port}`).pathname;
  const normalized = pathname === "/" ? "/index.html" : pathname;
  const resolved = path.resolve(projectRoot, `.${normalized}`);

  if (!resolved.startsWith(projectRoot)) {
    return null;
  }

  return resolved;
}

async function serveStatic(request, response) {
  const filePath = safePathname(request.url || "/");
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    const targetPath = stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    const extension = path.extname(targetPath).toLowerCase();
    const file = await fs.readFile(targetPath);

    response.writeHead(200, {
      "Cache-Control": extension === ".json" ? "no-store" : "no-cache",
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(new Error(stderr || stdout || `Command failed with exit code ${code}`));
    });
  });
}

async function handleSync(response) {
  if (isSyncing) {
    sendJson(response, 409, {
      ok: false,
      message: "Sync is already running.",
    });
    return;
  }

  isSyncing = true;

  try {
    await runCommand(nodeBin, ["scripts/sync-sheet.mjs"]);
    await runCommand(pythonBin, ["scripts/sync-sales-sheet.py"]);

    sendJson(response, 200, {
      ok: true,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      message: error instanceof Error ? error.message : "Sync failed.",
    });
  } finally {
    isSyncing = false;
  }
}

const server = createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/sync") {
    await handleSync(response);
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response);
    return;
  }

  response.writeHead(405);
  response.end("Method not allowed");
});

server.listen(port, host, () => {
  console.log(`Report GSJ local server running at http://${host}:${port}`);
});
