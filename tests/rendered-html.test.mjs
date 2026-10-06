import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/", headers = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", ...headers },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the public Windowprime website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="nl">/i);
  assert.match(html, /Windowprime \| Ramen &amp; deuren op maat/i);
  assert.match(html, /Meer licht\./i);
  assert.match(html, /Vraag het aan/i);
  assert.match(html, /Nova/i);
  assert.match(html, /Start jouw project/i);
  assert.match(html, /wa\.me\/32491970195/i);
  assert.doesNotMatch(html, /codex-preview|Building your site/i);
});

test("renders the authenticated administration dashboard without search indexing", async () => {
  const response = await render("/admin", {
    "oai-authenticated-user-email": "admin@windowprime.be",
  });
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Windowprime/i);
  assert.match(html, /beheer/i);
  assert.match(html, /SEO &amp; content/i);
  assert.match(html, /Nieuwe gesprekken/i);
  assert.match(html, /Beveiligde beheeromgeving/i);
  assert.match(html, /WhatsApp/i);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
});

test("protects the settings API from anonymous requests", async () => {
  const response = await render("/api/admin/settings");
  assert.equal(response.status, 401);
});
