"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSettings } from "@/lib/site-settings";
import { Brand } from "./Brand";

type Tab = "overview" | "chats" | "seo" | "knowledge" | "settings";
type SettingsTab = "company" | "whatsapp" | "ai" | "handoff" | "notifications";
type SaveState = "idle" | "saving" | "saved" | "error";
type Connections = { openai: boolean; whatsapp: boolean };

const conversations = [
  { initials: "TV", name: "Tom Vermeulen", text: "Prijs voor aluminium schuifraam...", time: "2 min", urgent: true },
  { initials: "SD", name: "Sarah De Smet", text: "AI heeft 4 vragen beantwoord", time: "18 min", urgent: false },
  { initials: "JV", name: "Jan Vercammen", text: "Offerte-aanvraag ontvangen", time: "1 u", urgent: false },
  { initials: "MK", name: "Mieke Claes", text: "Vraagt naar planning regio Leuven", time: "3 u", urgent: true },
];

export function AdminDashboard({
  initialSettings,
  initialConnections,
  adminName,
  adminEmail,
}: {
  initialSettings: SiteSettings;
  initialConnections: Connections;
  adminName: string;
  adminEmail: string;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [settings, setSettings] = useState(initialSettings);
  const [connections, setConnections] = useState(initialConnections);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [score, setScore] = useState(78);

  function updateSetting<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaveState("idle");
  }

  async function saveSettings() {
    setSaveState("saving");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!response.ok) throw new Error("save failed");
      const result = await response.json() as { settings: SiteSettings; connections: Connections };
      setSettings(result.settings);
      setConnections(result.connections);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  function improveSeo() {
    updateSetting("seoTitle", "Ramen en deuren op maat | Windowprime België");
    updateSetting("seoDescription", "Ontdek energiezuinige aluminium en pvc ramen en deuren op maat. Persoonlijk advies, vakkundige plaatsing en 10 jaar garantie.");
    setScore(92);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Brand compact />
        <nav className="admin-nav" aria-label="Beheernavigatie">
          <NavButton number="01" active={tab === "overview"} onClick={() => setTab("overview")}>Overzicht</NavButton>
          <NavButton number="02" active={tab === "chats"} onClick={() => setTab("chats")}>Gesprekken</NavButton>
          <NavButton number="03" active={tab === "seo"} onClick={() => setTab("seo")}>SEO & content</NavButton>
          <NavButton number="04" active={tab === "knowledge"} onClick={() => setTab("knowledge")}>AI-kennis</NavButton>
          <NavButton number="05" active={tab === "settings"} onClick={() => setTab("settings")}>Instellingen</NavButton>
        </nav>
        <div className="admin-user">
          <div className="admin-user-avatar">{adminName.slice(0, 2).toUpperCase()}</div>
          <div><strong>{adminName}</strong><small>{adminEmail}</small></div>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div><h1>{settings.companyName} beheer</h1><span className="status-pill">Website online</span></div>
          <div className="topbar-actions"><Link className="topbar-link" href="/">Bekijk website ↗</Link><a className="topbar-link" href="/signout-with-chatgpt?return_to=/">Afmelden</a></div>
        </header>

        <div className="admin-content">
          <div className="secure-banner"><span>✓</span><div><strong>Beveiligde beheeromgeving</strong><small>Ingelogd als {adminEmail}. Instellingen worden veilig op de server opgeslagen.</small></div></div>
          {tab === "overview" && <Overview score={score} onOpenChats={() => setTab("chats")} onOpenSeo={() => setTab("seo")} />}
          {tab === "chats" && <Chats />}
          {tab === "seo" && <SeoEditor settings={settings} score={score} onChange={updateSetting} onImprove={improveSeo} onSave={saveSettings} saveState={saveState} />}
          {tab === "knowledge" && <Knowledge settings={settings} onChange={updateSetting} onSave={saveSettings} saveState={saveState} />}
          {tab === "settings" && <SettingsPanel settings={settings} connections={connections} onChange={updateSetting} onSave={saveSettings} saveState={saveState} />}
        </div>
      </section>
    </main>
  );
}

function NavButton({ number, active, onClick, children }: { number: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button className={active ? "active" : ""} onClick={onClick}><span>{number}</span>{children}</button>;
}

function Overview({ score, onOpenChats, onOpenSeo }: { score: number; onOpenChats: () => void; onOpenSeo: () => void }) {
  return (
    <div className="admin-section">
      <div className="admin-welcome"><div><h2>Goedemorgen.</h2><p>Beheer je website, AI en klantgesprekken vanuit één plek.</p></div><span className="date-box">Windowprime control center</span></div>
      <div className="metric-row">
        <Metric label="Websitebezoekers" value="248" trend="+18% deze week" />
        <Metric label="Nieuwe gesprekken" value="14" trend="+4 sinds gisteren" />
        <Metric label="Offerte-aanvragen" value="6" trend="+2 deze week" />
        <Metric label="AI opgelost" value="86%" trend="12 van 14 gesprekken" />
      </div>
      <div className="admin-grid">
        <div className="admin-card"><div className="admin-card-header"><h3>Recente gesprekken</h3><button onClick={onOpenChats}>Alles bekijken →</button></div><div className="conversation-list">{conversations.slice(0, 3).map((chat) => <Conversation key={chat.name} {...chat} />)}</div></div>
        <div className="admin-card seo-card"><div className="admin-card-header"><h3>SEO-gezondheid</h3><button onClick={onOpenSeo}>Open SEO →</button></div><div className="seo-score"><div className="score-ring" style={{ "--score": score } as React.CSSProperties}><strong>{score}</strong></div></div><p>{score > 90 ? "Sterk. Je belangrijkste pagina’s zijn geoptimaliseerd." : "Goed op weg. AI vond nog 5 verbeterpunten."}</p></div>
      </div>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return <article className="metric-card"><span>{label}</span><strong>{value}</strong><small>{trend}</small></article>;
}

function Conversation({ initials, name, text, time, urgent }: (typeof conversations)[number]) {
  return <div className="conversation"><div className="conversation-avatar">{initials}</div><div><strong>{name} {urgent && <b className="tag tag--urgent">mens nodig</b>}</strong><small>{text}</small></div><span>{time}</span></div>;
}

function Chats() {
  return (
    <div className="admin-section">
      <div className="admin-section-head"><h2>AI-gesprekken</h2><p>Volg vragen, antwoorden en overdrachten naar WhatsApp.</p></div>
      <table className="data-table"><thead><tr><th>Klant</th><th>Laatste bericht</th><th>Status</th><th>Moment</th></tr></thead><tbody>{conversations.map((chat) => <tr key={chat.name}><td><strong>{chat.name}</strong></td><td>{chat.text}</td><td><span className={chat.urgent ? "tag tag--urgent" : "tag"}>{chat.urgent ? "WhatsApp nodig" : "AI afgehandeld"}</span></td><td>{chat.time}</td></tr>)}</tbody></table>
    </div>
  );
}

function SeoEditor({ settings, score, onChange, onImprove, onSave, saveState }: SettingsEditorProps & { score: number; onImprove: () => void }) {
  return (
    <div className="admin-section">
      <SectionHead title="SEO & content" text="Pas zoekresultaten zelf aan of laat AI een voorstel maken." onSave={onSave} saveState={saveState} />
      <div className="seo-editor">
        <div className="admin-card">
          <Field label="Paginatitel" hint={`${settings.seoTitle.length} van 60 aanbevolen tekens`}><input value={settings.seoTitle} onChange={(event) => onChange("seoTitle", event.target.value)} /></Field>
          <Field label="Meta-omschrijving" hint={`${settings.seoDescription.length} van 160 aanbevolen tekens`}><textarea rows={4} value={settings.seoDescription} onChange={(event) => onChange("seoDescription", event.target.value)} /></Field>
          <Field label="Zoekwoorden" hint="Komma-gescheiden, alleen relevante termen"><textarea rows={3} value={settings.seoKeywords} onChange={(event) => onChange("seoKeywords", event.target.value)} /></Field>
        </div>
        <div className="admin-card seo-card"><div className="admin-card-header"><h3>SEO-score</h3><span className="tag">Homepagina</span></div><div className="seo-score"><div className="score-ring" style={{ "--score": score } as React.CSSProperties}><strong>{score}</strong></div></div><p>{score > 90 ? "Klaar voor controle en publicatie." : "AI kan titel en omschrijving verbeteren."}</p><button className="ai-button" onClick={onImprove}>✦ Verbeter met AI</button></div>
      </div>
    </div>
  );
}

function Knowledge({ settings, onChange, onSave, saveState }: SettingsEditorProps) {
  return (
    <div className="admin-section">
      <SectionHead title={`Kennis van ${settings.aiName}`} text="Deze informatie bepaalt wat de assistent betrouwbaar kan antwoorden." onSave={onSave} saveState={saveState} />
      <div className="admin-card knowledge-editor">
        <Field label="Bedrijfskennis" hint="Producten, materialen, werkgebied, werkwijze, garanties en vaak gestelde vragen."><textarea rows={16} value={settings.knowledgeText} onChange={(event) => onChange("knowledgeText", event.target.value)} /></Field>
        <div className="knowledge-tips"><strong>Goede kennis bevat:</strong><span>Producten en profielen</span><span>Prijs- en offertebeleid</span><span>Werkgebied en planning</span><span>Garantie en nazorg</span></div>
      </div>
    </div>
  );
}

type SettingsEditorProps = {
  settings: SiteSettings;
  onChange: <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => void;
  onSave: () => Promise<void>;
  saveState: SaveState;
};

function SettingsPanel({ settings, connections, onChange, onSave, saveState }: SettingsEditorProps & { connections: Connections }) {
  const [section, setSection] = useState<SettingsTab>("company");
  return (
    <div className="admin-section">
      <SectionHead title="Instellingen" text="Beheer bedrijf, kanalen, AI en privacy vanuit één centrale plek." onSave={onSave} saveState={saveState} />
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Instellingencategorieën">
          <button className={section === "company" ? "active" : ""} onClick={() => setSection("company")}>Bedrijfsprofiel</button>
          <button className={section === "whatsapp" ? "active" : ""} onClick={() => setSection("whatsapp")}>WhatsApp</button>
          <button className={section === "ai" ? "active" : ""} onClick={() => setSection("ai")}>AI-agent</button>
          <button className={section === "handoff" ? "active" : ""} onClick={() => setSection("handoff")}>Overdracht</button>
          <button className={section === "notifications" ? "active" : ""} onClick={() => setSection("notifications")}>Meldingen & privacy</button>
        </nav>
        <div className="admin-card settings-card">
          {section === "company" && <CompanySettings settings={settings} onChange={onChange} />}
          {section === "whatsapp" && <WhatsAppSettings settings={settings} connections={connections} onChange={onChange} />}
          {section === "ai" && <AiSettings settings={settings} connections={connections} onChange={onChange} />}
          {section === "handoff" && <HandoffSettings settings={settings} onChange={onChange} />}
          {section === "notifications" && <NotificationSettings settings={settings} onChange={onChange} />}
        </div>
      </div>
    </div>
  );
}

function CompanySettings({ settings, onChange }: Pick<SettingsEditorProps, "settings" | "onChange">) {
  return <><SettingsTitle title="Bedrijfsprofiel" text="Deze gegevens verschijnen op de website en in klantberichten." /><div className="form-grid"><Field label="Bedrijfsnaam"><input value={settings.companyName} onChange={(e) => onChange("companyName", e.target.value)} /></Field><Field label="E-mailadres"><input type="email" value={settings.companyEmail} onChange={(e) => onChange("companyEmail", e.target.value)} /></Field><Field label="Telefoonnummer"><input value={settings.phoneNumber} onChange={(e) => onChange("phoneNumber", e.target.value)} /></Field><Field label="Adres"><input value={settings.address} onChange={(e) => onChange("address", e.target.value)} /></Field><Field label="Werkgebied"><input value={settings.serviceArea} onChange={(e) => onChange("serviceArea", e.target.value)} /></Field><Field label="Openingsuren"><input value={settings.openingHours} onChange={(e) => onChange("openingHours", e.target.value)} /></Field></div></>;
}

function WhatsAppSettings({ settings, connections, onChange }: Pick<SettingsEditorProps, "settings" | "onChange"> & { connections: Connections }) {
  return <><SettingsTitle title="WhatsApp" text="Stel de directe doorklik in en bereid de officiële Business API voor." /><Connection name="WhatsApp Business API" connected={connections.whatsapp} /><Field label="WhatsApp-nummer" hint="Belgisch formaat of internationaal formaat"><input value={settings.whatsappNumber} onChange={(e) => onChange("whatsappNumber", e.target.value)} /></Field><div className="form-grid"><Field label="Business Account ID" hint="Niet geheim"><input value={settings.whatsappBusinessAccountId} onChange={(e) => onChange("whatsappBusinessAccountId", e.target.value)} placeholder="Bijvoorbeeld 123456789" /></Field><Field label="Phone Number ID" hint="Niet geheim"><input value={settings.whatsappPhoneNumberId} onChange={(e) => onChange("whatsappPhoneNumberId", e.target.value)} placeholder="Bijvoorbeeld 987654321" /></Field></div><SecretNotice provider="WhatsApp" configured={connections.whatsapp} /></>;
}

function AiSettings({ settings, connections, onChange }: Pick<SettingsEditorProps, "settings" | "onChange"> & { connections: Connections }) {
  return <><SettingsTitle title="AI-agent" text="Bepaal identiteit, toon, talen en veiligheidsgrenzen van je assistent." /><Connection name="OpenAI" connected={connections.openai} /><div className="form-grid"><Field label="Naam assistent"><input value={settings.aiName} onChange={(e) => onChange("aiName", e.target.value)} /></Field><Field label="Model"><input value={settings.openaiModel} onChange={(e) => onChange("openaiModel", e.target.value)} /></Field><Field label="Gesprekstoon"><select value={settings.aiTone} onChange={(e) => onChange("aiTone", e.target.value as SiteSettings["aiTone"])}><option value="warm">Warm & persoonlijk</option><option value="professioneel">Professioneel</option><option value="direct">Kort & direct</option></select></Field><Field label="Talen"><input value={settings.aiLanguages} onChange={(e) => onChange("aiLanguages", e.target.value)} /></Field></div><Field label="Welkomstbericht"><textarea rows={3} value={settings.aiWelcomeMessage} onChange={(e) => onChange("aiWelcomeMessage", e.target.value)} /></Field><Field label="Instructies voor de agent" hint="Geen wachtwoorden, tokens of andere secrets invullen."><textarea rows={6} value={settings.aiSystemPrompt} onChange={(e) => onChange("aiSystemPrompt", e.target.value)} /></Field><Field label={`Minimumzekerheid: ${settings.confidenceThreshold}%`}><input type="range" min="0" max="100" value={settings.confidenceThreshold} onChange={(e) => onChange("confidenceThreshold", Number(e.target.value))} /></Field><SecretNotice provider="OpenAI" configured={connections.openai} /></>;
}

function HandoffSettings({ settings, onChange }: Pick<SettingsEditorProps, "settings" | "onChange">) {
  return <><SettingsTitle title="Overdracht naar een medewerker" text="Kies wanneer de AI stopt en WhatsApp aanbiedt." /><Toggle label="Overdracht inschakelen" text="Toon WhatsApp wanneer menselijke hulp nodig is." checked={settings.handoffEnabled} onChange={(value) => onChange("handoffEnabled", value)} /><Toggle label="Bij onbekend antwoord" text="Draag over wanneer de kennisbank onvoldoende zekerheid geeft." checked={settings.handoffUnknown} onChange={(value) => onChange("handoffUnknown", value)} /><Toggle label="Buiten openingsuren" text="Bied WhatsApp aan wanneer het team niet beschikbaar is." checked={settings.handoffOutsideHours} onChange={(value) => onChange("handoffOutsideHours", value)} /><Toggle label="Chatsamenvatting meesturen" text="De klant ziet en bevestigt de samenvatting vóór verzending." checked={settings.handoffSummary} onChange={(value) => onChange("handoffSummary", value)} /><Field label="Bericht bij overdracht"><textarea rows={3} value={settings.aiFallbackMessage} onChange={(e) => onChange("aiFallbackMessage", e.target.value)} /></Field></>;
}

function NotificationSettings({ settings, onChange }: Pick<SettingsEditorProps, "settings" | "onChange">) {
  return <><SettingsTitle title="Meldingen & privacy" text="Bepaal wie meldingen krijgt en hoe lang klantgegevens bewaard blijven." /><Field label="E-mailadres voor meldingen"><input type="email" value={settings.notificationEmail} onChange={(e) => onChange("notificationEmail", e.target.value)} /></Field><Toggle label="Nieuwe lead" text="Stuur een melding bij een nieuwe offerteaanvraag." checked={settings.notifyNewLead} onChange={(value) => onChange("notifyNewLead", value)} /><Toggle label="Menselijke overdracht" text="Stuur een melding wanneer de AI hulp vraagt." checked={settings.notifyHandoff} onChange={(value) => onChange("notifyHandoff", value)} /><Toggle label="Toestemming vragen" text="Vraag toestemming voordat contactgegevens worden verwerkt." checked={settings.privacyConsentRequired} onChange={(value) => onChange("privacyConsentRequired", value)} /><Field label="Bewaartermijn gesprekken (dagen)" hint="Tussen 1 en 730 dagen"><input type="number" min="1" max="730" value={settings.privacyRetentionDays} onChange={(e) => onChange("privacyRetentionDays", Number(e.target.value))} /></Field></>;
}

function SectionHead({ title, text, onSave, saveState }: { title: string; text: string; onSave: () => Promise<void>; saveState: SaveState }) {
  return <div className="admin-section-head admin-section-head--actions"><div><h2>{title}</h2><p>{text}</p></div><button className="save-button" onClick={onSave} disabled={saveState === "saving"}>{saveState === "saving" ? "Opslaan..." : saveState === "saved" ? "Opgeslagen ✓" : saveState === "error" ? "Opnieuw proberen" : "Wijzigingen opslaan"}</button></div>;
}

function SettingsTitle({ title, text }: { title: string; text: string }) {
  return <div className="settings-title"><h3>{title}</h3><p>{text}</p></div>;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="field-group"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function Toggle({ label, text, checked, onChange }: { label: string; text: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="toggle-row"><span><strong>{label}</strong><small>{text}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}

function Connection({ name, connected }: { name: string; connected: boolean }) {
  return <div className={`connection-row ${connected ? "connection-row--connected" : ""}`}><span><i />{name}</span><strong>{connected ? "Verbonden" : "Nog niet verbonden"}</strong></div>;
}

function SecretNotice({ provider, configured }: { provider: string; configured: boolean }) {
  return <div className="secret-notice"><strong>{configured ? "Beveiligde sleutel actief" : `${provider}-sleutel nog nodig`}</strong><p>API-sleutels worden nooit in dit dashboard of de database getoond. Ze worden eenmalig toegevoegd aan de beveiligde hostingomgeving.</p></div>;
}
