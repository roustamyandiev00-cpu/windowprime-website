import { eq, sql } from "drizzle-orm";
import { DEFAULT_SITE_SETTINGS, sanitizeSiteSettings, type SiteSettings } from "@/lib/site-settings";
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

  try {
    return sanitizeSiteSettings(JSON.parse(row.config));
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function writeSiteSettings(settings: SiteSettings, updatedBy: string) {
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
