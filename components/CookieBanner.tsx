"use client";

import { useState, useSyncExternalStore } from "react";

const CONSENT_KEY = "windowprime-cookie-consent";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function hasStoredConsent() {
  return Boolean(localStorage.getItem(CONSENT_KEY));
}

function serverConsentSnapshot() {
  return true;
}

export function CookieBanner() {
  const hasConsent = useSyncExternalStore(
    subscribeToConsent,
    hasStoredConsent,
    serverConsentSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = !hasConsent && !dismissed;

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setDismissed(true);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setDismissed(true);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookiemelding">
      <p>
        Deze website gebruikt alleen technisch noodzakelijke cookies. We plaatsen
        geen tracking- of advertentiecookies.{" "}
        <a href="/privacy">Meer informatie</a>
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={accept}>
          Begrepen
        </button>
        <button className="cookie-decline" onClick={decline}>
          Weigeren
        </button>
      </div>
    </div>
  );
}
