import { authorizeAdmin } from "@/app/admin-access";
import { readSiteSettings, writeSiteSettings } from "@/db/settings";
import { validateSiteSettings } from "@/lib/site-settings";
import { readConnectionStatus } from "@/lib/runtime-env";

const privateHeaders = { "cache-control": "no-store" };

export async function GET() {
  const auth = await authorizeAdmin();
  if ("error" in auth) return Response.json({ error: auth.error }, { status: auth.status, headers: privateHeaders });

  try {
    return Response.json({ settings: await readSiteSettings(), connections: await readConnectionStatus() }, { headers: privateHeaders });
  } catch {
    return Response.json({ error: "Instellingen konden niet worden geladen" }, { status: 500, headers: privateHeaders });
  }
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdmin();
  if ("error" in auth) return Response.json({ error: auth.error }, { status: auth.status, headers: privateHeaders });

  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ error: "Ongeldige herkomst" }, { status: 403, headers: privateHeaders });
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return Response.json({ error: "JSON vereist" }, { status: 415, headers: privateHeaders });
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    const decoder = new TextDecoder();
    let size = 0;
    let raw = "";
    if (reader) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 131072) {
            await reader.cancel();
            return Response.json({ error: "Verzoek te groot" }, { status: 413, headers: privateHeaders });
          }
          raw += decoder.decode(value, { stream: true });
        }
        raw += decoder.decode();
      } finally {
        reader.releaseLock();
      }
    }
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Ongeldige JSON" }, { status: 400, headers: privateHeaders });
  }
  const validation = validateSiteSettings(typeof body === "object" && body !== null && "settings" in body ? body.settings : undefined);
  if (!validation.ok) return Response.json({ error: validation.error }, { status: 400, headers: privateHeaders });

  try {
    const saved = await writeSiteSettings(validation.settings, auth.user.email);
    return Response.json({ settings: saved, connections: await readConnectionStatus() }, { headers: privateHeaders });
  } catch {
    return Response.json({ error: "Instellingen konden niet worden opgeslagen" }, { status: 500, headers: privateHeaders });
  }
}
