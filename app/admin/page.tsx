import type { Metadata } from "next";
import Link from "next/link";
import { authorizeAdmin } from "@/app/admin-access";
import { chatGPTSignInPath } from "@/app/chatgpt-auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { readSiteSettings } from "@/db/settings";
import { listQuoteRequests } from "@/db/leads";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import { readConnectionStatus, readRuntimeEnvironment } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Beheeromgeving",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const auth = await authorizeAdmin();
  if ("error" in auth) {
    const runtime = await readRuntimeEnvironment();
    return <main className="access-message"><h1>Beheer afgeschermd</h1><p>Deze pagina is alleen beschikbaar voor toegelaten beheerders via de beveiligde aanmeldomgeving.</p>{auth.status === 401 && runtime.AUTH_PROVIDER === "sites" ? <p><a href={chatGPTSignInPath("/admin")} target="_top">Aanmelden met ChatGPT</a></p> : <p>Neem contact op met de websitebeheerder om toegang in te stellen.</p>}<Link href="/">Terug naar de website →</Link></main>;
  }
  const { user } = auth;

  let settings = DEFAULT_SITE_SETTINGS;
  let storageAvailable = true;
  let leads: Array<{ id: number; name: string; email: string; phone: string; project: string; message: string; createdAt: string }> = [];
  try {
    settings = await readSiteSettings();
  } catch {
    storageAvailable = false;
  }
  if (storageAvailable) {
    try {
      leads = (await listQuoteRequests()).map((lead) => ({
        ...lead,
        createdAt: lead.createdAt.toISOString(),
      }));
    } catch {
      leads = [];
    }
  }
  const connections = await readConnectionStatus();

  return (
    <AdminDashboard
      initialSettings={settings}
      adminName={user.displayName}
      adminEmail={user.email}
      initialConnections={connections}
      storageAvailable={storageAvailable}
      initialLeads={leads}
    />
  );
}
