"use client";

import Link from "next/link";
import { useState } from "react";
import { Brand } from "./Brand";

type Tab = "overview" | "chats" | "seo" | "knowledge" | "settings";

const conversations = [
  { initials: "TV", name: "Tom Vermeulen", text: "Prijs voor aluminium schuifraam...", time: "2 min", urgent: true },
  { initials: "SD", name: "Sarah De Smet", text: "Nova heeft 4 vragen beantwoord", time: "18 min", urgent: false },
  { initials: "JV", name: "Jan Vercammen", text: "Offerte-aanvraag ontvangen", time: "1 u", urgent: false },
  { initials: "MK", name: "Mieke Claes", text: "Vraagt naar planning regio Leuven", time: "3 u", urgent: true },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [score, setScore] = useState(78);
  const [improved, setImproved] = useState(false);

  function improveSeo() {
    setImproved(true);
    setScore(92);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Brand compact />
        <nav className="admin-nav" aria-label="Beheernavigatie">
          <button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}><span>01</span>Overzicht</button>
          <button className={tab === "chats" ? "active" : ""} onClick={() => setTab("chats")}><span>02</span>Gesprekken</button>
          <button className={tab === "seo" ? "active" : ""} onClick={() => setTab("seo")}><span>03</span>SEO & content</button>
          <button className={tab === "knowledge" ? "active" : ""} onClick={() => setTab("knowledge")}><span>04</span>AI-kennis</button>
          <button className={tab === "settings" ? "active" : ""} onClick={() => setTab("settings")}><span>05</span>Instellingen</button>
        </nav>
        <div className="admin-user">
          <div className="admin-user-avatar">WP</div>
          <div><strong>Windowprime Admin</strong><small>Beheerder</small></div>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div><h1>Windowprime beheer</h1><span className="status-pill">Website online</span></div>
          <Link className="topbar-link" href="/">Bekijk website ↗</Link>
        </header>

        <div className="admin-content">
          <div className="prototype-banner">
            Demo-omgeving — WhatsApp-doorklik is actief. Echte login, gegevensopslag en automatische WhatsApp Business-gesprekken volgen na veilige configuratie.
          </div>
          {tab === "overview" && <Overview score={score} onOpenChats={() => setTab("chats")} onOpenSeo={() => setTab("seo")} />}
          {tab === "chats" && <Chats />}
          {tab === "seo" && <SeoEditor score={score} improved={improved} onImprove={improveSeo} />}
          {tab === "knowledge" && <Knowledge />}
          {tab === "settings" && <Settings />}
        </div>
      </section>
    </main>
  );
}

function Overview({ score, onOpenChats, onOpenSeo }: { score: number; onOpenChats: () => void; onOpenSeo: () => void }) {
  return (
    <div className="admin-section">
      <div className="admin-welcome">
        <div><h2>Goedemorgen.</h2><p>Dit gebeurde er vandaag op je website.</p></div>
        <span className="date-box">04 oktober 2026</span>
      </div>
      <div className="metric-row">
        <Metric label="Websitebezoekers" value="248" trend="+18% deze week" />
        <Metric label="Nieuwe gesprekken" value="14" trend="+4 sinds gisteren" />
        <Metric label="Offerte-aanvragen" value="6" trend="+2 deze week" />
        <Metric label="AI opgelost" value="86%" trend="12 van 14 gesprekken" />
      </div>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-header"><h3>Recente gesprekken</h3><button onClick={onOpenChats}>Alles bekijken →</button></div>
          <div className="conversation-list">
            {conversations.slice(0, 3).map((chat) => <Conversation key={chat.name} {...chat} />)}
          </div>
        </div>
        <div className="admin-card seo-card">
          <div className="admin-card-header"><h3>SEO-gezondheid</h3><button onClick={onOpenSeo}>Open SEO →</button></div>
          <div className="seo-score"><div className="score-ring" style={{ "--score": score } as React.CSSProperties}><strong>{score}</strong></div></div>
          <p>{score > 90 ? "Sterk. Je belangrijkste pagina’s zijn geoptimaliseerd." : "Goed op weg. AI vond nog 5 verbeterpunten."}</p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return <article className="metric-card"><span>{label}</span><strong>{value}</strong><small>{trend}</small></article>;
}

function Conversation({ initials, name, text, time, urgent }: (typeof conversations)[number]) {
  return (
    <div className="conversation">
      <div className="conversation-avatar">{initials}</div>
      <div><strong>{name} {urgent && <b className="tag tag--urgent">mens nodig</b>}</strong><small>{text}</small></div>
      <span>{time}</span>
    </div>
  );
}

function Chats() {
  return (
    <div className="admin-section">
      <div className="admin-section-head"><h2>AI-gesprekken</h2><p>Volg vragen, antwoorden en overdrachten naar WhatsApp.</p></div>
      <table className="data-table">
        <thead><tr><th>Klant</th><th>Laatste bericht</th><th>Status</th><th>Moment</th></tr></thead>
        <tbody>
          {conversations.map((chat) => (
            <tr key={chat.name}><td><strong>{chat.name}</strong></td><td>{chat.text}</td><td><span className={chat.urgent ? "tag tag--urgent" : "tag"}>{chat.urgent ? "WhatsApp nodig" : "AI afgehandeld"}</span></td><td>{chat.time}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SeoEditor({ score, improved, onImprove }: { score: number; improved: boolean; onImprove: () => void }) {
  return (
    <div className="admin-section">
      <div className="admin-section-head"><h2>SEO & content</h2><p>Pas teksten zelf aan of laat AI gerichte verbeteringen voorstellen.</p></div>
      <div className="seo-editor">
        <div className="admin-card">
          <div className="field-group"><label htmlFor="seo-title">Paginatitel</label><input id="seo-title" defaultValue={improved ? "Ramen en deuren op maat | Windowprime België" : "Windowprime | Ramen & deuren op maat"} /><small>53 van 60 aanbevolen tekens</small></div>
          <div className="field-group"><label htmlFor="seo-description">Meta-omschrijving</label><textarea id="seo-description" rows={4} defaultValue={improved ? "Ontdek energiezuinige aluminium en pvc ramen en deuren op maat. Persoonlijk advies, vakkundige plaatsing en 10 jaar garantie." : "Hoogwaardige ramen en deuren op maat, professioneel geplaatst in heel België."} /><small>Schrijf duidelijk, concreet en relevant voor jouw regio.</small></div>
          {improved && <div className="suggestion"><strong>AI-voorstel toegepast.</strong><br />Het hoofdzoekwoord, je regio en belangrijkste klantvoordelen staan nu in de omschrijving.</div>}
        </div>
        <div className="admin-card seo-card">
          <div className="admin-card-header"><h3>SEO-score</h3><span className="tag">Homepagina</span></div>
          <div className="seo-score"><div className="score-ring" style={{ "--score": score } as React.CSSProperties}><strong>{score}</strong></div></div>
          <p>{improved ? "Klaar voor menselijke controle en publicatie." : "AI kan de titel, omschrijving en zoekwoorddekking verbeteren."}</p>
          <button className="ai-button" onClick={onImprove}>{improved ? "Verbetering voltooid ✓" : "✦ Verbeter met AI"}</button>
        </div>
      </div>
    </div>
  );
}

function Knowledge() {
  const items = [
    ["01", "Producten & profielen", "Aluminium, pvc, beglazing, kleuren en technische eigenschappen."],
    ["02", "Prijzen & offertes", "Richtprijzen, meetregels en wanneer Nova een specialist inschakelt."],
    ["03", "Werkgebied & planning", "Regio’s, levertermijnen en beschikbare plaatsingsmomenten."],
    ["04", "Garantie & nazorg", "Garantievoorwaarden, onderhoud en service na plaatsing."],
    ["05", "Gesprekstonen", "Vriendelijk, helder en deskundig — altijd in de taal van de klant."],
    ["06", "WhatsApp-overdracht", "Regels voor escalatie en de samenvatting voor de beheerder."],
  ];
  return (
    <div className="admin-section">
      <div className="admin-section-head"><h2>Kennis van Nova</h2><p>Beheer welke informatie de assistent gebruikt om klanten te antwoorden.</p></div>
      <div className="knowledge-grid">
        {items.map(([number, title, text]) => <article className="knowledge-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="admin-section">
      <div className="admin-section-head"><h2>Instellingen</h2><p>Verbindingen en bedrijfsgegevens voor de definitieve versie.</p></div>
      <div className="admin-card">
        <div className="field-group"><label htmlFor="company-email">Bedrijfse-mail</label><input id="company-email" defaultValue="info@windowprime.be" /></div>
        <div className="field-group"><label htmlFor="whatsapp">WhatsApp Business-nummer</label><input id="whatsapp" value="0491 97 01 95" readOnly /><small>Doorklik actief. Automatische ontvangst en antwoorden in dit dashboard vereisen later de officiële WhatsApp Business API.</small></div>
        <div className="field-group"><label htmlFor="ai-status">AI-assistent</label><input id="ai-status" value="Demo actief — productiekoppeling nog niet ingesteld" readOnly /></div>
      </div>
    </div>
  );
}
