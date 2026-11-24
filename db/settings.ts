import { eq, sql } from "drizzle-orm";
import { DEFAULT_SITE_SETTINGS, sanitizeSiteSettings, validateSiteSettings, type SiteSettings } from "@/lib/site-settings";
import { getDb } from ".";
import { siteSettings } from "./schema";

const SETTINGS_ID = 1;

export async function readSiteSettings(): Promise<SiteSettings> {
  const db = await getDb();
  const [row] = await db
    .select({ config: siteSettings.config })
    .from(siteSettings)
    .where(eq(siteSettings.id, SETTINGS_ID))
    .limit(1);

  if (!row) return DEFAULT_SITE_SETTINGS;

  // Let the caller report corrupt storage instead of silently replacing it.
  const config: unknown = JSON.parse(row.config);
  const validated = validateSiteSettings(config);
  if (!validated.ok) throw new Error("Invalid stored settings");
  return validated.settings;
}

export async function writeSiteSettings(settings: SiteSettings, updatedBy: string) {
  // Refuse to overwrite unreadable existing data, including through direct API calls.
  await readSiteSettings();
  const sanitized = sanitizeSiteSettings(settings);
  const db = await getDb();
  await db
    .insert(siteSettings)
    .values({
      id: SETTINGS_ID,
      config: JSON.stringify(sanitized),
      updatedBy,
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        config: JSON.stringify(sanitized),
        updatedBy,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      },
    });

  return sanitized;
}
