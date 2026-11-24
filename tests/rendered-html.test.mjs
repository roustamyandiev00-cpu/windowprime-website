import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";

let server;
let baseUrl;

async function availablePort() {
  const listener = createServer();
  listener.listen(0, "127.0.0.1");
  await once(listener, "listening");
  const address = listener.address();
  assert.equal(typeof address, "object");
  const { port } = address;
  listener.close();
  await once(listener, "close");
  return port;
}

async function waitForServer(url) {
  let lastError;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw lastError ?? new Error("De lokale Next.js-server startte niet.");
}

before(async () => {
  const port = await availablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATABASE_URL: "",
        ADMIN_EMAILS: "",
        AUTH_PROXY_SECRET: "",
        AUTH_PROVIDER: "",
      },
      stdio: "ignore",
    },
  );
  await waitForServer(baseUrl);
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await once(server, "exit");
});

async function request(path, options) {
  return fetch(`${baseUrl}${path}`, options);
}

test("publieke pagina bevat de keuzehulp en veilige contactlinks", async () => {
  const response = await request("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="nl(?:-BE)?">/i);
  assert.match(html, /Meer licht\./i);
  assert.match(html, /Goed kiezen begint met begrijpen/i);
  assert.match(html, /id="offerte"/i);
  assert.match(html, /href="\/privacy"/i);
  assert.match(html, /wa\.me\/32491970195/i);
  assert.doesNotMatch(html, /jaar garantie|15\+|proof-score">4\.9|Admin demo/i);
});

test("privacy-informatie is publiek beschikbaar", async () => {
  const response = await request("/privacy");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /De chat geeft vaste antwoorden/);
});

test("beheer-API blijft zonder configuratie afgeschermd", async () => {
  const response = await request("/api/admin/settings");
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("offerte-API weigert een onvolledige aanvraag", async () => {
  const response = await request("/api/offerte", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /Naam is verplicht/);
});

test("offerte-API meldt duidelijk wanneer opslag niet beschikbaar is", async () => {
  const response = await request("/api/offerte", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Testpersoon",
      email: "test@example.com",
      phone: "",
      project: "renovatie",
      message: "Ik wil graag informatie over ramen.",
    }),
  });
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /niet beschikbaar|niet worden opgeslagen/);
});
