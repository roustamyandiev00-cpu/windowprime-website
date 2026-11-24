#!/usr/bin/env node
// deploy.mjs — bouwt het project en deployt naar Vercel

import { execFileSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

console.log("Deploying naar Vercel...");
execFileSync("vercel", ["--prod"], { cwd: root, stdio: "inherit" });

console.log("\nKlaar! Site live op https://www.windowprime.be");
