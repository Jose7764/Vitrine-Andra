import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const hasTinaCloudConfig =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

const tinaBin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tinacms.cmd" : "tinacms"
);

const args = ["build", "--skip-cloud-checks", "--noTelemetry"];

if (hasTinaCloudConfig) {
  args.push("--content=local");
} else {
  args.push("--local");
  console.warn(
    "TinaCloud credentials were not found. Building TinaCMS in local mode. Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN for production editing."
  );
}

const result = spawnSync(tinaBin, args, {
  cwd: projectRoot,
  stdio: "inherit",
  shell: process.platform === "win32"
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
