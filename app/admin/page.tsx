import type { Metadata } from "next";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { readSiteSettings } from "@/db/settings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/site-settings";
import { readConnectionStatus } from "@/lib/runtime-env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Beheeromgeving",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");

  let settings = DEFAULT_SITE_SETTINGS;
  try {
    settings = await readSiteSettings();
  } catch {
    // The default configuration keeps the first render usable before the first migration.
  }
  const connections = await readConnectionStatus();

  return (
    <AdminDashboard
      initialSettings={settings}
      adminName={user.displayName}
      adminEmail={user.email}
      initialConnections={connections}
    />
  );
}
