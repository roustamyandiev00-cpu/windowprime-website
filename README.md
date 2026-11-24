# Windowprime website

Website voor Windowprime ramen en deuren, met een chatdemo en afgeschermd beheer.
Dit project is lokaal verder uitgewerkt; de productiehosting en echte bedrijfsinhoud
moeten nog worden gecontroleerd. Zie [WERKPLAN.md](WERKPLAN.md).

## Wat werkt

- Publieke website met diensten, werkwijze, inspiratiebeeld en directe contactlinks.
- Chatdemo met vaste antwoorden, invoerlimieten en optionele overdracht naar WhatsApp.
  Een chatfragment wordt alleen toegevoegd na aanvinken; de bezoeker verstuurt zelf.
- Privacy-informatie op `/privacy` over het huidige gedrag van de website.
- Bedrijfs- en SEO-instellingen opslaan en terugladen via Neon Postgres.
- Beheerpagina en instellingen-API gebruiken dezelfde beheerderscontrole.
- Databasefouten blokkeren bewerken; ongeldige invoer overschrijft geen instellingen.

## Lokaal starten

Gebruik Node.js `>=22.13.0` en de bestaande npm-lockfile.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Zonder ingerichte aanmeldgateway blijft `/admin`
afgeschermd. De publieke pagina gebruikt standaardinstellingen als `DATABASE_URL`
ontbreekt. Er worden geen tabellen tijdens gewone verzoeken aangemaakt.

## Controles

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` bouwt de website en start tijdelijk een lokale Next.js-server. De test
controleert de publieke pagina, privacy-informatie, afscherming van de beheer-API
en validatie van een onvolledige offerteaanvraag. Hij start zonder `DATABASE_URL`
en raakt dus geen externe database.

## Configuratie en beheerrechten

Voor blijvende instellingen is `DATABASE_URL` nodig: een server-side Neon Postgres
connection string. Laat deze variabele weg voor een lokale, publieke demo zonder
opslag. Bewaar ze uitsluitend in de beveiligde hostingomgeving.

Beheer is standaard gesloten. Stel `ADMIN_EMAILS` in met bevestigde
beheerdersadressen en kies één aanmeldroute:

1. `AUTH_PROVIDER=sites` werkt alleen achter een vertrouwde Sites-dispatchlaag,
   die de identiteitheaders zelf controleert en injecteert.
2. Een eigen gateway gebruikt `AUTH_PROXY_SECRET` van minstens 32 tekens. Die
   gateway moet identiteit- en secretheaders van bezoekers verwijderen, de
   gebruiker aanmelden en pas daarna de gecontroleerde headers toevoegen.

Geef geen geheimen aan de browser. Ontbrekende configuratie of een lege
beheerderslijst geeft geen toegang.

De beheer-API accepteert wijzigingen alleen met JSON, een volledige geldige
instellingenset en een `Origin` die overeenkomt met de website. Reacties van de
instellingen-API mogen niet worden gecachet.

## Wat nog niet is aangesloten

- Echte AI-antwoorden, verwerking van de kennisbank en model-/taal-/zekerheidsinstellingen.
- WhatsApp Business API, opgeslagen gesprekken en echte bezoekers-/offertestatistieken.
- Automatische meldingen, bewaartermijnen en overdracht buiten openingsuren.

Deze opties zijn voorbereiding. Een ingestelde sleutel betekent niet dat een
verbinding getest of operationeel is. De huidige chat vraagt geen externe AI-dienst aan.

## Publicatie

`npm run deploy` publiceert via Vercel naar productie. Dit is niet uitgevoerd.
Controleer vóór publicatie de Vercel-omgeving, `DATABASE_URL`, de gekozen
aanmeldroute, `ADMIN_EMAILS` en de definitieve domeinnaam.
