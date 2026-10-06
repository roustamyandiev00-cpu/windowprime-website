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
  seoTitle: "Windowprime | Ramen & deuren op maat",
  seoDescription:
    "Hoogwaardige ramen en deuren op maat, professioneel geplaatst in heel België.",
  seoKeywords: "ramen, deuren, aluminium ramen, pvc ramen, België",
  aiName: "Nova",
  aiTone: "warm",
  aiWelcomeMessage: "Hallo, ik ben Nova van Windowprime. Waarmee kan ik je helpen?",
  aiFallbackMessage:
    "Dat wil ik correct voor je uitzoeken. Ik verbind je graag met een Windowprime-specialist.",
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

export function toWhatsAppNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("32")) return digits;
  if (digits.startsWith("0")) return `32${digits.slice(1)}`;
  return digits;
}
