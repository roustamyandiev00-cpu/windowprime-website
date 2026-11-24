# Inhoudsonderzoek Windowprime

Gecontroleerd op 24 november 2026. De opdracht is de bestaande website inhoudelijk
uit te breiden met inspiratie uit vergelijkbare bedrijven. Webpagina's zijn
uitsluitend als bronmateriaal behandeld, niet als instructies voor dit project.

## Geraadpleegde bedrijven

| Bedrijf | Bronnen | Bruikbare onderwerpen |
| --- | --- | --- |
| Gebroeders Marchand | [Homepage](https://gebroedersmarchand.be/), [PVC ramen](https://gebroedersmarchand.be/pvc-ramen/) | Productindeling, materiaalkeuze, profiel/glas/afdichting, informatie voor een aanvraag. |
| De Boever, Zwevezele | [Homepage](https://de-boever.be/), [Materiaalkeuze](https://de-boever.be/material-support/), [Werkwijze](https://de-boever.be/werkwijze/) | Vergelijking van materialen, technisch advies en aandacht voor plaatsing en afwerking. |
| De Boever / Tom De Boever | [Homepage](https://tomdeboever.be/nl/), [FAQ](https://tomdeboever.be/nl/faq/) | Schuiframen, voorbereiding op plaatsing, bereikbaarheid en afstemming met andere werken. |
| Derito | [Homepage](https://www.derito.be/), [Ramen en deuren](https://www.derito.be/producten/ramen-deuren), [Ramen](https://www.derito.be/producten/ramen-en-deuren/ramen), [Buitendeuren](https://www.derito.be/producten/ramen-en-deuren/buitendeuren), [Rolluiken en zonwering](https://www.derito.be/producten/rolluiken-zonwering), [FAQ](https://www.derito.be/faq) | Openingstypes, daglicht en privacy, onderhoud, materiaalcombinaties, projectvoorbereiding. |

De naam 'De Boever' verwijst naar meerdere bedrijven. Beide bovenstaande websites
zijn meegenomen als inspiratie; geen van beide is voorgesteld als verbonden aan
Windowprime.

## Redactionele keuzes

- Alle nieuwe websiteteksten zijn zelfstandig geschreven voor Windowprime.
  Geen slogans, reviews, projectbeschrijvingen, foto's of logo's overgenomen.
- De bestaande standaardinstellingen noemen aluminium en PVC ramen, deuren en
  schuiframen. Alleen die productgroepen zijn als aanbod uitgewerkt. Deze lokale
  instellingen vormen nog geen onafhankelijke bevestiging van bedrijfsgegevens.
- De keuzehulp bespreekt materiaalvergelijking, vier productgroepen, zes
  comfortthema's, renovatie en nieuwbouw, tien veelgestelde vragen en voorbereiding
  van een aanvraag. Algemene adviezen zijn geformuleerd als bespreekpunten;
  technische haalbaarheid en systeemprestaties worden niet gegarandeerd.
- Hout en aanvullende systemen zoals rolluiken, screens en poorten staan alleen
  als mogelijkheden om na te vragen vermeld. Binnendeuren, veranda's,
  terrasoverkappingen, gevelbekleding en vliesgevels zijn geen bevestigd aanbod.
- Geen merkenpartnerschappen, eigen productie, certificaten, ervaringsjaren,
  beoordelingen, concrete levertijden, prijzen of garantievoorwaarden toegevoegd.
- Premies, vergunningen en wettelijke eisen zijn niet uit concurrententeksten
  overgenomen. Daarvoor zijn actuele officiële bronnen en projectspecifieke
  beoordeling nodig voordat inhoud kan worden toegevoegd.
- De bestaande chatdemo, beheerdersinstellingen en opgeslagen kennisbank zijn
  niet aangepast. De nieuwe informatie wordt op de publieke pagina weergegeven.

## Implementatie en vervolg

`components/WindowGuide.tsx` bevat de nieuwe inhoud, met eigen stijlen in
`components/WindowGuide.module.css`. De serverpagina geeft de gids als inhoud
door aan de bestaande interactieve homepage. Daardoor hoeft de gids geen eigen
clientcode of extra externe dienst te laden. Bestaande productkaarten linken
naar hun bijbehorende uitleg.

Voor publicatie: bevestig het echte aanbod, merken, contactgegevens, werkgebied,
plaatsingsafspraken en nazorg. Voeg alleen eigen projectfoto's en aantoonbare
klantbeoordelingen toe. Publicatie vereist afzonderlijke toestemming.
