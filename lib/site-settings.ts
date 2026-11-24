export type SiteSettings = {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  address: string;
  serviceArea: string;
  openingHours: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  aiName: string;
  aiTone: "professioneel" | "warm" | "direct";
  aiWelcomeMessage: string;
  aiFallbackMessage: string;
  aiSystemPrompt: string;
  aiLanguages: string;
  openaiModel: string;
  knowledgeText: string;
  confidenceThreshold: number;
  handoffEnabled: boolean;
  handoffUnknown: boolean;
  handoffOutsideHours: boolean;
  handoffSummary: boolean;
  whatsappBusinessAccountId: string;
  whatsappPhoneNumberId: string;
  notificationEmail: string;
  notifyNewLead: boolean;
  notifyHandoff: boolean;
  privacyRetentionDays: number;
  privacyConsentRequired: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "Windowprime",
  companyEmail: "info@windowprime.be",
  phoneNumber: "0491 97 01 95",
  whatsappNumber: "0491 97 01 95",
  address: "België",
  serviceArea: "Vlaanderen en Brussel",
  openingHours: "Ma–Vr · 08:00–18:00",
  seoTitle: "Ramen en deuren op maat in Vlaanderen | Windowprime",
  seoDescription:
    "Aluminium en PVC ramen, deuren en schuiframen op maat in Vlaanderen en Brussel. Advies voor renovatie en nieuwbouw. Vraag vrijblijvend een offerte.",
  seoKeywords:
    "ramen, deuren, ramen op maat, deuren op maat, aluminium ramen, pvc ramen, schuiframen, ramen Vlaanderen, ramen Brussel, ramen en deuren, renovatie ramen, nieuwbouw ramen, Windowprime",
  aiName: "Nova",
  aiTone: "warm",
  aiWelcomeMessage: "Hallo, ik ben Nova van Windowprime. Waarmee kan ik je helpen?",
  aiFallbackMessage:
    "Neem hiervoor contact op met een Windowprime-specialist via e-mail of WhatsApp.",
  aiSystemPrompt:
    "Antwoord helder, eerlijk en behulpzaam. Doe geen prijs- of planningbeloftes die niet in de kennisbank staan.",
  aiLanguages: "Nederlands, Frans, Engels",
  openaiModel: "gpt-5-mini",
  knowledgeText:
    "Windowprime levert aluminium en pvc ramen, deuren en schuiframen op maat in Vlaanderen en Brussel. Advies en offerte zijn vrijblijvend.",
  confidenceThreshold: 72,
  handoffEnabled: true,
  handoffUnknown: true,
  handoffOutsideHours: true,
  handoffSummary: true,
  whatsappBusinessAccountId: "",
  whatsappPhoneNumberId: "",
  notificationEmail: "info@windowprime.be",
  notifyNewLead: true,
  notifyHandoff: true,
  privacyRetentionDays: 90,
  privacyConsentRequired: true,
};

const stringLimits: Record<keyof SiteSettings, number> = {
  companyName: 100,
  companyEmail: 254,
  phoneNumber: 40,
  whatsappNumber: 40,
  address: 240,
  serviceArea: 240,
  openingHours: 160,
  seoTitle: 80,
  seoDescription: 220,
  seoKeywords: 500,
  aiName: 60,
  aiTone: 20,
  aiWelcomeMessage: 500,
  aiFallbackMessage: 500,
  aiSystemPrompt: 4000,
  aiLanguages: 240,
  openaiModel: 100,
  knowledgeText: 12000,
  confidenceThreshold: 3,
  handoffEnabled: 1,
  handoffUnknown: 1,
  handoffOutsideHours: 1,
  handoffSummary: 1,
  whatsappBusinessAccountId: 160,
  whatsappPhoneNumberId: 160,
  notificationEmail: 254,
  notifyNewLead: 1,
  notifyHandoff: 1,
  privacyRetentionDays: 4,
  privacyConsentRequired: 1,
};

export function sanitizeSiteSettings(input: unknown): SiteSettings {
  const source = typeof input === "object" && input !== null ? input as Record<string, unknown> : {};
  const settings = { ...DEFAULT_SITE_SETTINGS };

  for (const key of Object.keys(settings) as Array<keyof SiteSettings>) {
    const current = settings[key];
    const incoming = source[key];

    if (typeof current === "string" && typeof incoming === "string") {
      if (key === "aiTone") {
        settings.aiTone = ["professioneel", "warm", "direct"].includes(incoming)
          ? incoming as SiteSettings["aiTone"]
          : DEFAULT_SITE_SETTINGS.aiTone;
      } else {
        (settings as Record<string, unknown>)[key] = incoming.trim().slice(0, stringLimits[key]);
      }
    } else if (typeof current === "boolean" && typeof incoming === "boolean") {
      (settings as Record<string, unknown>)[key] = incoming;
    } else if (typeof current === "number" && typeof incoming === "number" && Number.isFinite(incoming)) {
      if (key === "confidenceThreshold") settings.confidenceThreshold = Math.min(100, Math.max(0, Math.round(incoming)));
      if (key === "privacyRetentionDays") settings.privacyRetentionDays = Math.min(730, Math.max(1, Math.round(incoming)));
    }
  }

  return settings;
}

// Writes require a complete, valid snapshot; malformed requests must never reset
// existing company settings to defaults.
export function validateSiteSettings(input: unknown):
  { ok: true; settings: SiteSettings } | { ok: false; error: string } {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, error: "Instellingen ontbreken" };
  }
  const source = input as Record<string, unknown>;
  for (const key of Object.keys(DEFAULT_SITE_SETTINGS) as Array<keyof SiteSettings>) {
    const value = source[key];
    if (typeof value !== typeof DEFAULT_SITE_SETTINGS[key]) return { ok: false, error: `Ongeldige instelling: ${key}` };
    if (typeof value === "string" && value.length > stringLimits[key]) return { ok: false, error: `Te lange instelling: ${key}` };
  }
  for (const key of ["companyName", "aiName", "seoTitle", "seoDescription"]) {
    if (!(source[key] as string).trim()) return { ok: false, error: `Vul ${key} in` };
  }
  for (const key of ["companyEmail", "notificationEmail"]) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((source[key] as string).trim())) return { ok: false, error: `Ongeldig e-mailadres: ${key}` };
  }
  for (const key of ["phoneNumber", "whatsappNumber"]) {
    const value = (source[key] as string).trim();
    const digits = toWhatsAppNumber(value);
    if (!/^\+?[\d\s().-]+$/.test(value) || !/^[1-9]\d{7,14}$/.test(digits)) return { ok: false, error: `Ongeldig telefoonnummer: ${key}` };
  }
  if (!["professioneel", "warm", "direct"].includes(source.aiTone as string)) return { ok: false, error: "Ongeldige gesprekstoon" };
  for (const [key, min, max] of [["confidenceThreshold", 0, 100], ["privacyRetentionDays", 1, 730]] as const) {
    const value = source[key] as number;
    if (!Number.isInteger(value) || value < min || value > max) return { ok: false, error: `Ongeldige waarde: ${key}` };
  }
  return { ok: true, settings: sanitizeSiteSettings(source) };
}

export function seoKeywordList(value: string): string[] {
  return value.split(",").map((keyword) => keyword.trim()).filter(Boolean);
}

export function toWhatsAppNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("32")) return digits;
  if (digits.startsWith("0")) return `32${digits.slice(1)}`;
  return digits;
}
