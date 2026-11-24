import type { Metadata } from "next";
import Link from "next/link";
import { readSiteSettings } from "@/db/settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Hoe Windowprime omgaat met de chatdemo, contact via WhatsApp of e-mail en technische gegevens op deze website.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy | Windowprime",
    description: "Hoe Windowprime omgaat met de chatdemo, contact via WhatsApp of e-mail en technische gegevens op deze website.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy | Windowprime",
    description: "Hoe Windowprime omgaat met de chatdemo, contact via WhatsApp of e-mail en technische gegevens op deze website.",
  },
};

export default async function PrivacyPage() {
  const settings = await readSiteSettings().catch(() => DEFAULT_SITE_SETTINGS);
  return <main className="information-page">
    <Link href="/">← Terug naar {settings.companyName}</Link>
    <h1>Privacy op deze website</h1>
    <h2>Chatdemo</h2>
    <p>De chat geeft vaste antwoorden. Je berichten blijven tijdens het bezoek in het geheugen van de pagina. De website slaat deze berichten niet op in een database, cookies of browseropslag. Bij het herladen van de pagina verdwijnen ze.</p>
    <h2>Contact via WhatsApp of e-mail</h2>
    <p>Contactlinks openen een externe dienst of je e-mailprogramma. Bij WhatsApp kun je zelf kiezen om een chatfragment toe te voegen. Het bericht wordt pas verstuurd wanneer je dat in WhatsApp bevestigt. De verwerking door deze externe diensten valt onder hun eigen privacybeleid.</p>
    <h2>Beheer en technische gegevens</h2>
    <p>Voor toegelaten beheerders bewaart de website de bedrijfsinstellingen, het e-mailadres van de laatste bewerker en het tijdstip van de wijziging. De hosting- en aanmelddiensten kunnen daarnaast technische verzoekgegevens verwerken.</p>
    <h2>Vragen over je gegevens</h2>
    <p>Neem contact op met {settings.companyName} via <a href={`mailto:${settings.companyEmail}`}>{settings.companyEmail}</a>. Vermeld welke gegevens en welk contactmoment je bedoelt; stuur geen gevoelige gegevens mee die daarvoor niet nodig zijn.</p>
  </main>;
}
