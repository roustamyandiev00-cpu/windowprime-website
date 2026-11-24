"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function OfferteForm({ companyEmail }: { companyEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState<"renovatie" | "nieuwbouw" | "">("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || state === "sending") return;

    setState("sending");
    try {
      const response = await fetch("/api/offerte", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, phone, project, message }),
      });
      if (!response.ok) throw new Error("Verzenden mislukt");
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="offerte-success">
        <span className="offerte-check">✓</span>
        <h3>Bedankt voor je aanvraag!</h3>
        <p>
          We nemen zo snel mogelijk contact met je op. Je kunt ons ook direct
          bereiken via e-mail of WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form className="offerte-form" onSubmit={handleSubmit} noValidate>
      <h3>Vraag een vrijblijvende offerte aan</h3>
      <p className="offerte-intro">
        Vul onderstaand formulier in en we nemen contact met je op voor een
        persoonlijk adviesgesprek.
      </p>

      <div className="offerte-grid">
        <label className="field-group">
          <span>
            Naam <abbr title="verplicht">*</abbr>
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Je volledige naam"
            maxLength={100}
          />
        </label>

        <label className="field-group">
          <span>
            E-mailadres <abbr title="verplicht">*</abbr>
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="je@email.be"
            maxLength={254}
          />
        </label>

        <label className="field-group">
          <span>Telefoonnummer</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0491 12 34 56"
            maxLength={40}
          />
        </label>

        <label className="field-group">
          <span>Type project</span>
          <select
            value={project}
            onChange={(e) =>
              setProject(e.target.value as "renovatie" | "nieuwbouw" | "")
            }
          >
            <option value="">Selecteer...</option>
            <option value="renovatie">Renovatie</option>
            <option value="nieuwbouw">Nieuwbouw</option>
          </select>
        </label>
      </div>

      <label className="field-group">
        <span>
          Beschrijf je project <abbr title="verplicht">*</abbr>
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Welke ramen of deuren zoek je? Hoeveel stuks? Zijn er plannen of foto's beschikbaar?"
          maxLength={2000}
        />
      </label>

      <label className="offerte-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Ik ga akkoord met het verwerken van mijn gegevens voor deze
          offerteaanvraag.{" "}
          <a href="/privacy" target="_blank" rel="noreferrer">
            Privacybeleid
          </a>
        </span>
      </label>

      {state === "error" && (
        <p className="offerte-error" role="alert">
          Er is iets misgegaan. Probeer opnieuw of neem contact op via{" "}
          <a href={`mailto:${companyEmail}`}>{companyEmail}</a>.
        </p>
      )}

      <button
        className="button button--primary offerte-submit"
        type="submit"
        disabled={!consent || state === "sending" || !name.trim() || !email.trim() || !message.trim()}
      >
        {state === "sending" ? "Verzenden..." : "Offerte aanvragen"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
