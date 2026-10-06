import { getChatGPTUser } from "@/app/chatgpt-auth";
import { readSiteSettings, writeSiteSettings } from "@/db/settings";
import { sanitizeSiteSettings } from "@/lib/site-settings";
import { readConnectionStatus, readRuntimeEnvironment } from "@/lib/runtime-env";

async function authorizeAdmin() {
  const user = await getChatGPTUser();
  if (!user) return { error: Response.json({ error: "Aanmelding vereist" }, { status: 401 }) };

  const runtime = await readRuntimeEnvironment();
  const configuredAdmins = runtime.ADMIN_EMAILS
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean) ?? [];

  if (configuredAdmins.length > 0 && !configuredAdmins.includes(user.email.toLowerCase())) {
    return { error: Response.json({ error: "Geen beheerrechten" }, { status: 403 }) };
  }

  return { user };
}

export async function GET() {
  const auth = await authorizeAdmin();
  if ("error" in auth) return auth.error;

  try {
    return Response.json({ settings: await readSiteSettings(), connections: await readConnectionStatus() });
  } catch {
    return Response.json({ error: "Instellingen konden niet worden geladen" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const auth = await authorizeAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json() as { settings?: unknown };
    const settings = sanitizeSiteSettings(body.settings);
    const saved = await writeSiteSettings(settings, auth.user.email);
    return Response.json({ settings: saved, connections: await readConnectionStatus() });
  } catch {
    return Response.json({ error: "Instellingen konden niet worden opgeslagen" }, { status: 500 });
  }
}
