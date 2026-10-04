# Windowprime website

Publieke website en beheerprototype voor Windowprime ramen & deuren.

## Inhoud

- responsieve landingspagina met diensten, werkwijze en contact;
- interactieve AI-chatdemo met werkende doorklik en chatsamenvatting naar WhatsApp;
- beheeromgeving op `/admin` voor gesprekken, SEO, AI-kennis en instellingen;
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

De WhatsApp-doorklik gebruikt het ingestelde bedrijfsnummer. De beheeromgeving
en AI-chat zijn verder een functioneel visueel prototype. Voor productie moeten
authenticatie, databaseopslag, het AI-model en de officiële WhatsApp Business
API nog veilig worden gekoppeld. Die stappen vereisen eigen accounts,
toegangsregels en goedgekeurde configuratie.
