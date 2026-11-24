# Verder werken aan Windowprime

## Uitgevoerd op 24 november 2026

- TypeScript-configuratie afgestemd op de bestaande Next.js-imports.
- Gedeelde beheerderscontrole voor pagina en API; standaard geen toegang.
- Identiteitscontrole afgestemd op de gekozen hosting: Sites-dispatch of een eigen beveiligde proxy.
- Validatie van volledige instellingen, JSON, verzoekgrootte en herkomst.
- Beveiligde API-reacties niet laten cachen.
- Opslaan/terugladen voorbereid voor Neon Postgres, inclusief controle op bewerker en wijzigingsmoment.
- Databasefouten zichtbaar gemaakt en overschrijven van beschadigde opslag geblokkeerd.
- Verzonnen voorbeeldgesprekken en onbewezen statistieken verwijderd uit de weergave.
- Onbevestigde reviews, aantallen ervaringsjaren en garantieclaims vervangen.
- Inspiratiebeeld als illustratie aangeduid; defecte sociallinks vervangen door contactlinks.
- Privacy-informatie toegevoegd over de daadwerkelijke chat en contactlinks.
- Chatdemo herkenbaar gemaakt, invoer begrensd en expliciete keuze voor delen van een chatfragment toegevoegd.
- Mobiel menu, toetsenbordfocus en leesbaarheid van de chat verbeterd.
- Domeinpatronen en commandoaanroep in het bestaande deployscript hersteld; niet uitgevoerd.

## Eerst nodig voor echt beheer

1. Kies de productiehosting en de bijbehorende aanmeldroute.
2. Configureer een Neon Postgres `DATABASE_URL` in die hostingomgeving.
3. Kies welke e-mailadressen beheerrechten krijgen en stel `ADMIN_EMAILS` in.
4. Controleer de bestaande migratiestatus, maak een herstelplan en test instellingen op de gekozen hosting.

Tot die tijd is beheer bewust afgeschermd. De publieke website blijft beschikbaar.

## Bedrijfsinhoud bevestigen

- Bedrijfsnaam, contactadres, telefoon, WhatsApp, openingsuren en werkgebied.
- Officiële bedrijfsgegevens en contactpersoon voor privacyvragen.
- Echte foto's en projecten met toestemming om ze te publiceren.
- Aantoonbare reviews, garanties en eventuele keurmerken voordat deze worden toegevoegd.
- Definitieve domeinnaam en bijbehorende metadata.
- Aanvullende privacy-informatie over de uiteindelijk gebruikte hosting en diensten.

## Daarna: echte aanvragen en AI

Begin met een complete route van bezoeker naar e-mail of WhatsApp en bevestig wie
opvolgt. Voeg daarna pas echte AI toe, met gecontroleerde bedrijfskennis en een
veilige serverkoppeling. Daarvoor zijn providerconfiguratie, budgetkeuzes en een
beveiligd ingestelde API-sleutel nodig. Voeg gespreksopslag, toestemming,
bewaartermijnen en meldingen samen met hun daadwerkelijke werking en tests toe.

## Publicatie afronden

Test na de hostingkeuze de echte login, opslag na herstart, mobiele interactie,
contactlinks en foutmeldingen. Publiceer pas na expliciete toestemming. Deze
lokale wijzigingsronde heeft geen accountinstellingen, secrets of productiegegevens aangepast.

## Hostingstatus

De broncode is ingesteld voor Next.js op Vercel met Neon Postgres. De lokale
verbeteringen zijn niet gepubliceerd. Controleer de gekozen hosting, database,
aanmeldroute en domeinen opnieuw vlak vóór publicatie.
