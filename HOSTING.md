# Windowprime hosting

Gecontroleerd op 24 november 2026, zonder externe wijzigingen.

## Bestaande website

- Platform: Sites; huidig account is eigenaar.
- Live: https://windowprime.windowpro-begmail-com.chatgpt.site
- Status: actief, publiek, versie 4.
- Database: D1-binding `DB`; tabel `site_settings` bestaat.
- Runtime-instellingen: geen ingesteld.
- De lokale verbeteringen zijn nog niet gepubliceerd.

Gebruik voor deze website de bestaande Sites-publicatieroute. Het script
`npm run deploy` publiceert rechtstreeks naar Cloudflare en is een andere route;
voer het niet uit om deze Sites-website bij te werken.

## Beheertoegang voorbereiden

De lokale code ondersteunt de bestaande Sites-login. Voor ingebruikname moeten
`AUTH_PROVIDER=sites` en een door de eigenaar bevestigde `ADMIN_EMAILS` op Sites
worden ingesteld. De aanmeldsessie komt van Sites, beheerrechten van de expliciete
lijst. Er is in deze controle geen beheerder toegevoegd en geen runtimewaarde gewijzigd.

De live versie bevat nog de oude toegangscontrole. De ontbrekende beheerderslijst
moet samen met publicatie van de herstelde code worden aangepakt. Een anonieme
bezoeker werd bij de controle naar aanmelding verwezen; toegang na echte aanmelding
is nog niet gecontroleerd.

## Eigen domeinen

Beide domeinen staan in Sites op `pending`; het certificaat staat op
`pending_validation`. DNS-opvragingen leverden voor beide namen `ENOTFOUND` op.
Dit bewijst niet of het domein geregistreerd is. Toegang tot de DNS-beheerder is
nodig om onderstaande records te controleren en zo nodig in te stellen.
Bestaande e-mailrecords mogen daarbij niet worden verwijderd.

De Sites-koppeling geeft deze waarden terug:

| Naam | Type | Waarde |
| --- | --- | --- |
| windowprime.be | A | 162.159.143.30 |
| windowprime.be | A | 172.66.3.26 |
| www.windowprime.be | CNAME | custom-domains.chatgpt.site. |
| _openai-site-verification.windowprime.be | TXT | openai-site-verification=4r5xQMfvLZBEXaF5PaI2vbSI_-Au8VlMJGITRdbDdQU |
| _cf-custom-hostname.windowprime.be | TXT | 3b9cdb21-2abc-451c-93b2-a92ebb8886f9 |
| _openai-site-verification.www.windowprime.be | TXT | openai-site-verification=bDYzSLLHADUkphRVvLido5K-oAbjzibmPy8cC0i9uDk |
| _cf-custom-hostname.www.windowprime.be | TXT | af3b8760-f94f-4586-bfa0-9db56977af78 |

Dit zijn DNS-verificatiewaarden, geen wachtwoorden. Controleer de actuele waarden
opnieuw vlak vóór een wijziging. Sommige DNS-beheerders voegen de domeinnaam
automatisch toe; voer dan alleen het relatieve recordlabel in.

## Nog nodig

1. Bevestig het e-mailadres waarmee de eigenaar inlogt bij ChatGPT.
2. Stel de twee runtimewaarden in en publiceer de gecontroleerde broncode na toestemming.
3. Test echte aanmelding, weigering van andere accounts en instellingenopslag.
4. Controleer de DNS-records bij de domeinbeheerder; valideer daarna domeinen en certificaten.
5. Voeg echte AI pas toe nadat de benodigde providerconfiguratie en sleutel veilig zijn ingesteld.
