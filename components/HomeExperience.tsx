"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toWhatsAppNumber } from "@/lib/site-settings";
import { Brand } from "./Brand";

type Message = {
  from: "agent" | "visitor";
  text: string;
};

type PublicSettings = {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  whatsappNumber: string;
  openingHours: string;
  address: string;
  aiName: string;
  aiWelcomeMessage: string;
  aiFallbackMessage: string;
  handoffEnabled: boolean;
  handoffSummary: boolean;
};

const answers: Record<string, string> = {
  "Wat kosten nieuwe ramen?":
    "De prijs hangt af van afmetingen, profiel, glas en plaatsing. Ik kan je in enkele vragen helpen met een eerste richtbudget.",
  "Werken jullie in mijn regio?":
    "We voeren projecten uit in heel Vlaanderen en Brussel. Deel je postcode, dan controleer ik meteen de planning voor jouw regio.",
  "Hoe snel kunnen jullie plaatsen?":
    "Na opmeting en bevestiging rekenen we doorgaans met een productietermijn. Voor een exacte timing laat ik onze planner je persoonlijk contacteren.",
};

const products = [
  {
    number: "01",
    title: "Aluminium ramen",
    text: "Slanke profielen, grote glaspartijen en maximale architecturale vrijheid.",
    className: "product-card--aluminium",
  },
  {
    number: "02",
    title: "PVC ramen",
    text: "Sterke isolatie, weinig onderhoud en een uitstekende prijs-kwaliteitverhouding.",
    className: "product-card--pvc",
  },
  {
    number: "03",
    title: "Deuren op maat",
    text: "Een veilige inkom met een uitstraling die perfect bij jouw woning past.",
    className: "product-card--doors",
  },
];

export function HomeExperience({ settings }: { settings: PublicSettings }) {
  const whatsappNumber = toWhatsAppNumber(settings.whatsappNumber);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "agent",
      text: settings.aiWelcomeMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [handoff, setHandoff] = useState(false);

  function ask(question: string) {
    setMessages((current) => [
      ...current,
      { from: "visitor", text: question },
      {
        from: "agent",
        text:
          answers[question] ??
          settings.aiFallbackMessage,
      },
    ]);
    if (!answers[question] && settings.handoffEnabled) setHandoff(true);
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setInput("");
    ask(question);
  }

  const whatsappSummary = settings.handoffSummary ? messages
    .map((message) => `${message.from === "visitor" ? "Klant" : settings.aiName}: ${message.text}`)
    .join("\n") : "";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hallo ${settings.companyName}, ik wil graag verder praten met een specialist.${whatsappSummary ? `\n\nSamenvatting van mijn chat:\n${whatsappSummary}` : ""}`,
  )}`;

  return (
    <main className="public-site">
      <header className="site-header">
        <Brand compact />
        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Hoofdnavigatie">
          <a href="#oplossingen" onClick={() => setMenuOpen(false)}>Oplossingen</a>
          <a href="#werkwijze" onClick={() => setMenuOpen(false)}>Werkwijze</a>
          <a href="#realisaties" onClick={() => setMenuOpen(false)}>Realisaties</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Vraag je offerte <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Menu openen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/images/windowprime-hero.png"
          alt="Moderne woning met zwarte aluminium ramen en deur bij zonsondergang"
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Ramen & deuren zonder compromissen</p>
          <h1 id="hero-title">
            Meer licht.<br />
            <em>Meer karakter.</em>
          </h1>
          <p className="hero-copy">
            Belgisch vakmanschap, technisch sterk en tot op de millimeter op maat van jouw woning.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#contact">
              Start jouw project <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#realisaties">
              Bekijk onze realisaties <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Klantbeoordeling">
          <div className="proof-score">4.9</div>
          <div><span className="stars">★★★★★</span><small>Tevreden klanten</small></div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>04</span></div>
      </section>

      <section className="intro section-shell">
        <div>
          <p className="section-label">Waarom Windowprime</p>
          <h2>Een andere kijk<br />op ramen en deuren.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Wij combineren helder advies, sterke profielen en zorgvuldige plaatsing in één transparant traject.
          </p>
          <div className="stats-grid">
            <div><strong>15+</strong><span>jaar ervaring</span></div>
            <div><strong>10</strong><span>jaar garantie</span></div>
            <div><strong>100%</strong><span>maatwerk</span></div>
          </div>
        </div>
      </section>

      <section className="solutions section-shell" id="oplossingen">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Onze oplossingen</p>
            <h2>Gemaakt om<br /><em>te blijven.</em></h2>
          </div>
          <p>Van eerste schets tot perfecte afwerking: ieder detail krijgt onze volle aandacht.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className={`product-card ${product.className}`} key={product.number}>
              <span className="product-number">{product.number}</span>
              <div className="frame-art" aria-hidden="true"><span /></div>
              <div className="product-content">
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <a href="#contact" aria-label={`Meer over ${product.title}`}>Ontdek meer <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process" id="werkwijze">
        <div className="section-shell process-inner">
          <div className="process-intro">
            <p className="section-label section-label--light">Van idee tot plaatsing</p>
            <h2>Vier stappen.<br /><em>Eén sterk resultaat.</em></h2>
            <p>Je weet altijd waar je staat. Eén aanspreekpunt begeleidt je van advies tot oplevering.</p>
          </div>
          <ol className="steps">
            <li><span>01</span><div><h3>Persoonlijk advies</h3><p>We luisteren, denken mee en bekijken wat technisch én esthetisch past.</p></div></li>
            <li><span>02</span><div><h3>Exacte opmeting</h3><p>Onze expert meet ter plaatse alles nauwkeurig op.</p></div></li>
            <li><span>03</span><div><h3>Productie op maat</h3><p>Jouw ramen en deuren worden volgens afspraak geproduceerd.</p></div></li>
            <li><span>04</span><div><h3>Zorgeloze plaatsing</h3><p>Vakkundig gemonteerd en netjes afgewerkt.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="projects section-shell" id="realisaties">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Recente realisaties</p>
            <h2>Vakwerk dat<br /><em>je kan zien.</em></h2>
          </div>
          <a className="outline-link" href="#contact">Bespreek jouw idee <span>↗</span></a>
        </div>
        <div className="project-feature">
          <Image
            src="/images/windowprime-hero.png"
            alt="Realisatie met aluminium schrijnwerk in een moderne woning"
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 72vw"
          />
          <div className="project-caption">
            <span>Woning D.</span>
            <strong>Aluminium totaalrenovatie</strong>
            <small>Antwerpen · 2026</small>
          </div>
          <div className="project-badge">01 / 03</div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">“</div>
        <blockquote>
          Vanaf het eerste gesprek voelden we dat er echt werd meegedacht. De afwerking is gewoon perfect.
        </blockquote>
        <p>— Sarah & Jonas, Mechelen</p>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-pattern" aria-hidden="true" />
        <div className="section-shell contact-inner">
          <p className="section-label section-label--light">Klaar voor de volgende stap?</p>
          <h2>Vertel ons over<br /><em>jouw project.</em></h2>
          <p>Ontvang persoonlijk advies en een vrijblijvende offerte op maat.</p>
          <a className="button button--light" href={`mailto:${settings.companyEmail}`}>
            Plan een gesprek <span>↗</span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main section-shell">
          <Brand />
          <div><strong>Navigatie</strong><a href="#oplossingen">Oplossingen</a><a href="#werkwijze">Werkwijze</a><a href="#realisaties">Realisaties</a></div>
          <div><strong>Contact</strong><a href={`mailto:${settings.companyEmail}`}>{settings.companyEmail}</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">{settings.phoneNumber}</a><span>{settings.openingHours}</span><span>{settings.address}</span></div>
          <div><strong>Volg ons</strong><a href="#contact">Instagram ↗</a><a href="#contact">Facebook ↗</a><a href="#contact">LinkedIn ↗</a></div>
        </div>
        <div className="footer-bottom section-shell">
          <span>© 2026 Windowprime</span>
          <span>Privacy · Cookies · Voorwaarden</span>
          <Link href="/admin">Admin demo</Link>
        </div>
      </footer>

      <button
        className="chat-launcher"
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Chat sluiten" : "Chat openen"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? "×" : <><span className="chat-spark">✦</span><span>Vraag het aan {settings.aiName}</span></>}
      </button>

      {chatOpen && (
        <aside className="chat-panel" aria-label="Windowprime AI-chat">
          <header className="chat-header">
            <div className="agent-avatar">N</div>
            <div><strong>{settings.aiName}</strong><span><i /> {settings.companyName} assistent</span></div>
            <button onClick={() => setChatOpen(false)} aria-label="Chat sluiten">×</button>
          </header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`message message--${message.from}`} key={`${message.text}-${index}`}>
                {message.text}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="quick-questions">
                {Object.keys(answers).map((question) => (
                  <button key={question} onClick={() => ask(question)}>{question}</button>
                ))}
                <button onClick={() => ask("Ik heb een andere vraag.")}>Andere vraag</button>
              </div>
            )}
            {handoff && (
              <div className="handoff-card">
                <span>WhatsApp-overdracht</span>
                <strong>Een specialist neemt het over.</strong>
                <small>Je chatsamenvatting wordt klaargezet voor Windowprime. Je beslist zelf wanneer je die verstuurt.</small>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">Ga verder via WhatsApp ↗</a>
              </div>
            )}
          </div>
          <form className="chat-form" onSubmit={submitMessage}>
            <label className="sr-only" htmlFor="chat-input">Typ je vraag</label>
            <input id="chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Typ je vraag..." />
            <button type="submit" aria-label="Bericht versturen">↑</button>
          </form>
          <p className="chat-note">AI kan fouten maken. Persoonlijke hulp is altijd beschikbaar.</p>
        </aside>
      )}
    </main>
  );
}
