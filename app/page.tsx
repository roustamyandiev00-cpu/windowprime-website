import type { Metadata } from "next";
import { HomeExperience } from "@/components/HomeExperience";
import { readSiteSettings } from "@/db/settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";

async function getPublicSettings() {
  try {
    return await readSiteSettings();
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSettings();
  return {
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    keywords: settings.seoKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
  };
}

export default async function Home() {
  const settings = await getPublicSettings();
  return (
    <HomeExperience
      settings={{
        companyName: settings.companyName,
        companyEmail: settings.companyEmail,
        phoneNumber: settings.phoneNumber,
        whatsappNumber: settings.whatsappNumber,
        openingHours: settings.openingHours,
        address: settings.address,
        aiName: settings.aiName,
        aiWelcomeMessage: settings.aiWelcomeMessage,
        aiFallbackMessage: settings.aiFallbackMessage,
        handoffEnabled: settings.handoffEnabled,
        handoffSummary: settings.handoffSummary,
      }}
    />
  );
}
