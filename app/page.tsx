import type { Metadata } from "next";
import { HomeExperience } from "@/components/HomeExperience";
import { WindowGuide } from "@/components/WindowGuide";
import { OfferteForm } from "@/components/OfferteForm";
import { readSiteSettings } from "@/db/settings";
import { DEFAULT_SITE_SETTINGS, seoKeywordList, toWhatsAppNumber } from "@/lib/site-settings";

async function getPublicSettings() {
  try {
    return await readSiteSettings();
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSettings();
  const keywords = seoKeywordList(settings.seoKeywords);
  return {
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    keywords,
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "/",
      siteName: settings.companyName,
      locale: "nl_BE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
    },
  };
}

function structuredData(settings: typeof DEFAULT_SITE_SETTINGS) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.companyName,
    description: settings.seoDescription,
    email: settings.companyEmail,
    telephone: `+${toWhatsAppNumber(settings.phoneNumber)}`,
    areaServed: settings.serviceArea,
    image: "https://www.windowprime.be/images/windowprime-hero.png",
    url: "https://www.windowprime.be",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BE",
      addressRegion: settings.serviceArea,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "$$",
    sameAs: [],
  };
}

export default async function Home() {
  const settings = await getPublicSettings();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(settings)).replaceAll("<", "\\u003c") }}
      />
      <HomeExperience
        settings={{
          companyName: settings.companyName,
          companyEmail: settings.companyEmail,
          phoneNumber: settings.phoneNumber,
          whatsappNumber: settings.whatsappNumber,
          openingHours: settings.openingHours,
          address: settings.address,
          serviceArea: settings.serviceArea,
          aiName: settings.aiName,
          aiWelcomeMessage: settings.aiWelcomeMessage,
          aiFallbackMessage: settings.aiFallbackMessage,
          handoffEnabled: settings.handoffEnabled,
          handoffUnknown: settings.handoffUnknown,
          handoffSummary: settings.handoffSummary,
        }}
      >
        <WindowGuide />
        <section className="offerte-section section-shell" id="offerte" aria-labelledby="offerte-title">
          <p className="section-label">Klaar om te beginnen?</p>
          <h2 id="offerte-title" style={{ margin: "0 0 32px", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 760, letterSpacing: "-.05em", lineHeight: 1.04 }}>Vraag je <em>offerte</em> aan.</h2>
          <OfferteForm companyEmail={settings.companyEmail} />
        </section>
      </HomeExperience>
    </>
  );
}
