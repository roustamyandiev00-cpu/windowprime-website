# Windowprime website

Publieke website en beheerprototype voor Windowprime ramen & deuren.

## Inhoud

- responsieve landingspagina met diensten, werkwijze en contact;
- interactieve AI-chatdemo met werkende doorklik en chatsamenvatting naar WhatsApp;
- beveiligde beheeromgeving op `/admin` voor gesprekken, SEO, AI-kennis en instellingen;
- blijvende database-instellingen voor bedrijfsprofiel, WhatsApp, AI, overdracht, meldingen en privacy;
- eigen hero- en socialmedia-afbeeldingen in `public/`;
- server-renderingtests voor de publieke en beheerpagina.

## Lokaal starten

Node.js `>=22.13.0` is vereist.

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000` en `http://localhost:3000/admin`.

## Controle

```bash
npm run lint
npm test
```

## Productiekoppelingen

De WhatsApp-doorklik gebruikt het nummer uit de beheeromgeving. Gewone
instellingen worden in de database bewaard en `/admin` vereist aanmelding.
Geheime OpenAI- en WhatsApp-tokens worden bewust niet via browserformulieren
opgeslagen; die horen in de beveiligde hostingomgeving. De verbindingsstatus
ervan is wel zichtbaar in het dashboard.
