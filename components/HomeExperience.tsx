"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
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
  serviceArea: string;
  aiName: string;
  aiWelcomeMessage: string;
  aiFallbackMessage: string;
  handoffEnabled: boolean;
  handoffUnknown: boolean;
  handoffSummary: boolean;
};

const answers: Record<string, string> = {
  "Wat kosten nieuwe ramen?":
    "De prijs hangt af van afmetingen, profiel, glas en plaatsing. Neem contact op met Windowprime voor een offerte op maat.",
  "Werken jullie in mijn regio?":
    "Neem contact op met Windowprime om jouw locatie en de beschikbaarheid te bespreken.",
  "Hoe snel kunnen jullie plaatsen?":
    "De planning hangt af van jouw project en de productie. Neem contact op met Windowprime voor een concrete termijn.",
};

const products = [
  {
    number: "01",
    title: "Aluminium ramen",
    text: "Slanke profielen, grote glaspartijen en een Uw-waarde tot 0,8 W/m²K. Thermisch onderbroken aluminium voor wie esthetiek en energieprestatie combineert.",
    className: "product-card--aluminium",
    href: "#aluminium-ramen",
  },
  {
    number: "02",
    title: "PVC ramen",
    text: "Uitstekende isolatie, onderhoudsarme profielen en een scherpe prijs-kwaliteitverhouding. De slimme keuze voor renovatie én nieuwbouw.",
    className: "product-card--pvc",
    href: "#pvc-ramen",
  },
  {
    number: "03",
    title: "Deuren op maat",
    text: "Van veilige voordeur tot strakke schuifwand: elke deur wordt op maat gemaakt en perfect afgestemd op de architectuur van uw woning.",
    className: "product-card--doors",
    href: "#deuren-op-maat",
  },
];

export function HomeExperience({ settings, children }: { settings: PublicSettings; children?: ReactNode }) {
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
  const [includeTranscript, setIncludeTranscript] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!chatOpen) return;
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
  }, [messages, chatOpen]);

  useEffect(() => {
    if (!chatOpen && !menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatOpen(false);
        setMenuOpen(false);
        (menuOpen ? menuButtonRef : launcherRef).current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [chatOpen, menuOpen]);

  function ask(question: string) {
    if (messages.length >= 41) return;
    question = question.slice(0, 1000);
    const answer = Object.hasOwn(answers, question) ? answers[question] : undefined;
    setMessages((current) => [
      ...current,
      { from: "visitor", text: question },
      {
        from: "agent",
        text:
          (question === "Werken jullie in mijn regio?" ? `Ons werkgebied: ${settings.serviceArea}. Neem contact op om de beschikbaarheid op jouw locatie te bespreken.` : answer) ??
          settings.aiFallbackMessage,
      },
    ]);
    if (!answer && settings.handoffEnabled && settings.handoffUnknown) setHandoff(true);
  }

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setInput("");
    ask(question);
  }

  const whatsappSummary = settings.handoffSummary && includeTranscript ? messages
    .map((message) => `${message.from === "visitor" ? "Klant" : settings.aiName}: ${message.text}`)
    .join("\n").slice(-4000) : "";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hallo ${settings.companyName}, ik wil graag verder praten met een specialist.${whatsappSummary ? `\n\nChatfragment (maximaal 4.000 tekens):\n${whatsappSummary}` : ""}`,
  )}`;

  return (
    <main className="public-site">
      <header className="site-header">
        <Brand compact />
        <nav id="main-navigation" className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Hoofdnavigatie">
          <a href="#oplossingen" onClick={() => setMenuOpen(false)}>Oplossingen</a>
          <a href="#keuzehulp" onClick={() => setMenuOpen(false)}>Keuzehulp</a>
          <a href="#werkwijze" onClick={() => setMenuOpen(false)}>Werkwijze</a>
          <a href="#realisaties" onClick={() => setMenuOpen(false)}>Inspiratie</a>
          <a href="#offerte" onClick={() => setMenuOpen(false)}>Offerte</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact">
          Vraag je offerte <span aria-hidden="true">↗</span>
        </a>
        <button
          className="menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-controls="main-navigation"
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
          <p className="eyebrow"><span /> Aluminium & PVC ramen en deuren op maat</p>
          <h1 id="hero-title">
            Meer licht.<br />
            <em>Meer karakter.</em>
          </h1>
          <p className="hero-copy">
            Windowprime plaatst aluminium en PVC ramen, deuren en schuifwanden op maat in Vlaanderen en Brussel — van advies tot oplevering in één transparant traject.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#contact">
              Start jouw project <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#realisaties">
              Bekijk de inspiratie <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Ramen en deuren op maat">
          <div><strong>Op maat</strong><small>van jouw woning</small></div>
        </div>
        <div className="hero-index"><span>01</span><i /><span>04</span></div>
      </section>

      <section className="intro section-shell">
        <div>
          <p className="section-label">Waarom Windowprime</p>
          <h2>Vakmanschap dat<br />het verschil maakt.</h2>
        </div>
        <div className="intro-copy">
          <p>
            Van eerste adviesgesprek tot vakkundige plaatsing: Windowprime begeleidt u volledig. Wij combineren kwaliteitsprofielen, thermische prestaties en een strakke afwerking in één helder traject — zonder verrassingen achteraf.
          </p>
          <div className="stats-grid">
            <div><strong>Op maat</strong><span>tot op de millimeter</span></div>
            <div><strong>Energiezuinig</strong><span>betere isolatie, lagere factuur</span></div>
            <div><strong>Vlaamse service</strong><span>Vlaanderen & Brussel</span></div>
          </div>
        </div>
      </section>

      <section className="solutions section-shell" id="oplossingen">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Onze oplossingen</p>
            <h2>Gemaakt om<br /><em>te blijven.</em></h2>
          </div>
          <p>Aluminium of PVC, raam of deur — elk product wordt op maat geproduceerd en met zorg geplaatst. Van renovatie tot nieuwbouw, voor elke woning een passende oplossing.</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className={`product-card ${product.className}`} key={product.number}>
              <span className="product-number">{product.number}</span>
              <div className="frame-art" aria-hidden="true"><span /></div>
              <div className="product-content">
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <a href={product.href} aria-label={`Meer over ${product.title}`}>Ontdek meer <span>↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {children}

      <section className="process" id="werkwijze">
        <div className="section-shell process-inner">
          <div className="process-intro">
            <p className="section-label section-label--light">Van idee tot plaatsing</p>
            <h2>Vier stappen.<br /><em>Eén sterk resultaat.</em></h2>
            <p>U weet altijd waar u staat. Één aanspreekpunt begeleidt u van het eerste advies tot de definitieve oplevering — helder, efficiënt en zonder zorgen.</p>
          </div>
          <ol className="steps">
            <li><span>01</span><div><h3>Persoonlijk advies</h3><p>We luisteren naar uw wensen, bespreken de mogelijkheden en adviseren welk profiel, glas en afwerking het best bij uw woning past.</p></div></li>
            <li><span>02</span><div><h3>Exacte opmeting</h3><p>Onze expert komt ter plaatse en meet alles nauwkeurig op. Zo garanderen we een perfecte passing bij de plaatsing.</p></div></li>
            <li><span>03</span><div><h3>Productie op maat</h3><p>Uw ramen en deuren worden op maat geproduceerd volgens de afgesproken specificaties — kwaliteit die zichtbaar is in elk detail.</p></div></li>
            <li><span>04</span><div><h3>Vakkundige plaatsing</h3><p>Onze monteurs plaatsen alles netjes en efficiënt. Strak afgewerkt, kitnaden inbegrepen, volledig gebruiksklaar opgeleverd.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="projects section-shell" id="realisaties">
        <div className="section-heading-row">
          <div>
            <p className="section-label">Inspiratie voor jouw woning</p>
            <h2>Een blik op<br /><em>de mogelijkheden.</em></h2>
          </div>
          <a className="outline-link" href="#contact">Bespreek jouw idee <span>↗</span></a>
        </div>
        <div className="project-feature">
          <Image
            src="/images/windowprime-hero.png"
            alt="Sfeerbeeld van een moderne woning met aluminium schrijnwerk"
            fill
            unoptimized
            sizes="(max-width: 900px) 100vw, 72vw"
          />
          <div className="project-caption">
            <span>Inspiratiebeeld</span>
            <strong>Aluminium ramen en deuren</strong>
            <small>Illustratie van de mogelijkheden</small>
          </div>

        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">“</div>
        <blockquote>
          Een goed resultaat begint bij een helder gesprek over jouw woning, wensen en mogelijkheden.
        </blockquote>
        <p>Onze aanpak</p>
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
          <div><strong>Navigatie</strong><a href="#oplossingen">Oplossingen</a><a href="#keuzehulp">Keuzehulp</a><a href="#veelgestelde-vragen">Veelgestelde vragen</a><a href="#werkwijze">Werkwijze</a><a href="#realisaties">Inspiratie</a></div>
          <div><strong>Contact</strong><a href={`mailto:${settings.companyEmail}`}>{settings.companyEmail}</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">{settings.phoneNumber}</a><span>{settings.openingHours}</span><span>{settings.address}</span></div>
          <div><strong>Direct contact</strong><a href={`tel:${settings.phoneNumber.replace(/[^+\d]/g, "")}`}>Bel ons</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={`mailto:${settings.companyEmail}`}>Stuur een e-mail</a></div>
        </div>
        <div className="footer-bottom section-shell">
          <span>© 2026 Windowprime</span>
          <Link href="/privacy">Privacy</Link>
          <Link href="/admin" prefetch={false}>Beheer</Link>
        </div>
      </footer>

      <button
        className="chat-launcher"
        ref={launcherRef}
        aria-controls="windowprime-chat"
        type="button"
        onClick={() => setChatOpen((open) => !open)}
        aria-label={chatOpen ? "Chat sluiten" : "Chat openen"}
        aria-expanded={chatOpen}
      >
        {chatOpen ? "×" : <><span className="chat-spark">✦</span><span>Vraag het aan {settings.aiName}</span></>}
      </button>

      {chatOpen && (
        <aside id="windowprime-chat" className="chat-panel" aria-label="Windowprime chatdemo">
          <header className="chat-header">
            <div className="agent-avatar">{settings.aiName.slice(0, 1)}</div>
            <div><strong>{settings.aiName}</strong><span><i /> {settings.companyName} · chatdemo</span></div>
            <button onClick={() => setChatOpen(false)} aria-label="Chat sluiten">×</button>
          </header>
          <div className="chat-messages" ref={messagesRef} role="log" aria-label="Chatberichten" aria-live="polite">
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
                <strong>Neem contact op met een specialist.</strong>
                <small>Je opent WhatsApp en verstuurt het bericht zelf. Er wordt nog niets automatisch doorgestuurd.</small>
                {settings.handoffSummary && <label className="chat-consent"><input type="checkbox" checked={includeTranscript} onChange={(event) => setIncludeTranscript(event.target.checked)} /> Chatfragment toevoegen aan mijn WhatsApp-bericht</label>}
                <a href={whatsappUrl} target="_blank" rel="noreferrer">Ga verder via WhatsApp ↗</a>
              </div>
            )}
          </div>
          <form className="chat-form" onSubmit={submitMessage}>
            <label className="sr-only" htmlFor="chat-input">Typ je vraag</label>
            <input maxLength={1000} disabled={messages.length >= 41} id="chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Typ je vraag..." />
            <button type="submit" disabled={messages.length >= 41 || !input.trim()} aria-label="Bericht versturen">↑</button>
          </form>
          <p className="chat-note">{messages.length >= 41 ? "De chatlimiet is bereikt. Neem contact op via e-mail of WhatsApp." : "Demo met vaste antwoorden. Berichten worden hier niet opgeslagen. Deel geen gevoelige gegevens."} <Link href="/privacy">Privacy</Link></p>
        </aside>
      )}
    </main>
  );
}
