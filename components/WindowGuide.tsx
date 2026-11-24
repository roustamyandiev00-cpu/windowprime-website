import styles from "./WindowGuide.module.css";

const solutions = [
  {
    id: "aluminium-ramen",
    number: "01",
    title: "Aluminium ramen",
    subtitle: "Een rustig lijnenspel. Meer ruimte voor licht.",
    description: "Aluminium past bij wie houdt van fijne kaders en een open zicht. Het materiaal leent zich voor hedendaagse gevels, maar kan ook een bestaande woning een nieuw karakter geven. De juiste profielreeks bepaalt mee welke afmetingen en raamindelingen mogelijk zijn.",
    points: ["Bespreek de verhouding tussen vaste en opengaande delen.", "Stem kleur, oppervlaktestructuur en handgrepen op elkaar af.", "Bekijk het volledige raamsysteem: profiel, glas en aansluitingen."],
    question: "Veel glas aan de tuinzijde? Neem ook schaduw, privacy en dagelijks gebruik mee in je ontwerp.",
  },
  {
    id: "pvc-ramen",
    number: "02",
    title: "PVC ramen",
    subtitle: "Comfort dat bij het dagelijks leven past.",
    description: "PVC is een veelzijdige keuze voor wie isolatie en onderhoudsgemak belangrijk vindt. Met een passende kleur en profielvorm sluit het aan bij uiteenlopende woningstijlen. Vergelijk uitvoeringen op dezelfde afmetingen en met dezelfde beglazing: alleen zo krijg je een bruikbaar beeld van de verschillen.",
    points: ["Kies de raamindeling per kamer en niet alleen per gevel.", "Bespreek de beschikbare kleuren en afwerkingen per systeem.", "Laat de haalbaarheid van brede of hoge elementen beoordelen."],
    question: "Renoveer je in fases? Leg kleur en profielkeuze vast, zodat latere ramen bij het geheel passen.",
  },
  {
    id: "deuren-op-maat",
    number: "03",
    title: "Deuren op maat",
    subtitle: "Een inkom die klopt, tot aan de deurkruk.",
    description: "Je voordeur bepaalt hoe je thuiskomt. Denk naast het uitzicht aan de draairichting, de vrije doorgang, het sluitwerk en de aansluiting op de vloer. Een gesloten paneel geeft een ander gevoel dan een deur met glas of een zijlicht. De beste combinatie past bij je gevel én je manier van wonen.",
    points: ["Stem de deurkleur af op ramen, gevel en eventuele dorpel.", "Weeg daglicht en inkijk af bij een glasvulling of zijlicht.", "Bespreek handgreep, cilinder en sluiting als één geheel."],
    question: "Neem een foto van de volledige inkom mee. Zo worden details zoals buitenverlichting en de bel meteen zichtbaar.",
  },
  {
    id: "schuiframen",
    number: "04",
    title: "Schuiframen",
    subtitle: "Maak van de tuin een deel van je leefruimte.",
    description: "Een schuifraam verbindt binnen en buiten zonder een naar binnen draaiende vleugel. De indeling bepaalt hoeveel er werkelijk open kan. Bekijk daarom niet alleen de totale breedte, maar ook de vrije doorgang en de plaats waar de schuivende delen terechtkomen.",
    points: ["Vergelijk bediening en verdeling van vaste en schuivende delen.", "Bespreek de dorpel samen met vloerpeil en terrasafwerking.", "Voorzie ruimte voor gordijnen en eventuele zonwering."],
    question: "Een lage drempel vraagt een doordacht aansluitdetail. Laat bereikbaarheid, afwatering en afdichting samen bekijken.",
  },
];

const details = [
  { title: "Beglazing", text: "Glas bepaalt mee hoe een ruimte aanvoelt. Bekijk warmte-isolatie, lichtinval, geluid en veiligheid in samenhang. Vraag bij een vergelijking naar de prestaties van de gekozen combinatie, met de juiste afmetingen en glasopbouw." },
  { title: "Ventilatie", text: "Nieuwe ramen maken deel uit van het binnenklimaat. Bespreek hoe verse lucht wordt aangevoerd en hoe je ventilatievoorzieningen met de raamindeling combineert. Neem een bestaand of gepland ventilatiesysteem mee in het gesprek." },
  { title: "Geluid van buiten", text: "Aan een drukke straat zijn andere keuzes relevant dan aan een rustige tuin. Beschrijf wanneer en waar je geluid hoort. Laat vervolgens bekijken welke beglazing en aansluitingen bij die situatie passen." },
  { title: "Veiligheid en sluitwerk", text: "Denk aan bereikbare ramen, de achterdeur en glas naast de inkom. Vraag welke combinatie van beslag, sluiting en beglazing voorzien is. Een veiligheidsclaim hoort bij een specifieke uitvoering en kan niet uit het materiaal alleen worden afgeleid." },
  { title: "Kleur en uitstraling", text: "Bekijk een kleurstaal naast je gevelmateriaal en bij daglicht. Let ook op de binnenzijde: ramen vormen het kader van elke kamer. Vraag welke combinaties en structuren voor het gekozen systeem beschikbaar zijn." },
  { title: "Aansluitingen en afwerking", text: "Een raam staat nooit los van de muur eromheen. Bespreek de aansluiting op dorpels, gevel en binnenafwerking. Leg vast welke werkzaamheden inbegrepen zijn en welke voorbereiding of afwerking afzonderlijk moet worden geregeld." },
];

const questions = [
  { question: "Kies ik beter PVC of aluminium?", answer: "Begin bij wat je woning nodig heeft: raamafmetingen, uitstraling, onderhoud en het beschikbare budget. PVC en aluminium kunnen beide passen bij renovatie en nieuwbouw. Vergelijk concrete uitvoeringen, inclusief glas en plaatsing, in plaats van alleen een materiaalnaam." },
  { question: "Kan ik materialen combineren?", answer: "Dat kan een interessante ontwerpkeuze zijn, bijvoorbeeld een andere uitvoering aan de straat- en tuinzijde. Bespreek hoe kleuren, profielbreedtes en aansluitingen op elkaar worden afgestemd. De technische mogelijkheden worden per project bekeken." },
  { question: "Welk openingstype past bij mijn kamer?", answer: "Teken eerst meubels en looproutes in. Een vast deel, draaikiepraam of schuifraam heeft telkens een andere invloed op het gebruik van de ruimte. Denk ook aan bereikbaarheid voor reiniging en de manier waarop je wilt verluchten." },
  { question: "Moet ik alle ramen tegelijk vervangen?", answer: "Een renovatie kan als geheel of per fase worden besproken. Maak vooraf een overzicht per gevel en kamer. Noteer welke elementen blijven, hoe de afwerking op elkaar aansluit en welke keuzes later opnieuw beschikbaar moeten zijn." },
  { question: "Kan alleen het glas worden vervangen?", answer: "Dat moet ter plaatse worden beoordeeld. De staat van het bestaande kader, de dichtingen en de geschiktheid voor ander glas spelen mee. Alleen nieuw glas lost problemen met slecht sluitende of beschadigde raamkaders niet vanzelf op." },
  { question: "Welke gegevens helpen bij een eerste aanvraag?", answer: "Vermeld je gemeente, het type woning en of je bouwt of renoveert. Voeg een overzicht van de gewenste ramen en deuren toe, met foto's of plannen als je die hebt. Geschatte maten helpen bij het gesprek; definitieve productiematen vragen een technische opmeting." },
  { question: "Wat bepaalt de uitvoering en planning?", answer: "Onder meer het aantal elementen, de afmetingen, profielkeuze, beglazing en bereikbaarheid van de woning. Ook voorbereidingswerken kunnen invloed hebben. Vraag Windowprime om een concrete planning zodra de technische keuzes en de omvang van het project duidelijk zijn." },
  { question: "Hoe bereid ik mijn woning voor op plaatsing?", answer: "Bespreek vooraf welke ruimtes en toegangen vrij moeten zijn. Denk aan meubels, raamdecoratie, parkeerplek en huisdieren. Maak ook afspraken over de bescherming van vloeren, het afvoeren van oude elementen en de afwerking na de montage." },
  { question: "Hoe onderhoud ik PVC en aluminium?", answer: "Volg de onderhoudsinstructies van het geleverde systeem. Gebruik geschikte, milde reinigingsmiddelen en vermijd schurende producten. Houd afwateringsopeningen vrij en laat slecht sluitende ramen of beschadigde dichtingen tijdig nakijken." },
  { question: "Zijn hout, rolluiken, screens of poorten ook mogelijk?", answer: "Deze oplossingen kunnen deel uitmaken van een ruimer woningproject. Geef je wensen door bij je aanvraag. Windowprime bevestigt welke producten en combinaties daadwerkelijk geleverd kunnen worden; ze zijn hier niet als vast aanbod opgenomen." },
];

export function WindowGuide() {
  return (
    <div className={styles.guide}>
      <section className="section-shell" id="keuzehulp" aria-labelledby="guide-title">
        <div className={styles.heading}>
          <div>
            <p className="section-label">Goed kiezen begint met begrijpen</p>
            <h2 id="guide-title">Jouw woning.<br /><em>Jouw keuzes.</em></h2>
          </div>
          <p>Nieuwe ramen en deuren kies je voor elke dag. Ontdek wat belangrijk is voor jouw comfort, de uitstraling van je woning en een goed voorbereid project.</p>
        </div>
        <nav className={styles.topics} aria-label="Onderwerpen in de keuzehulp">
          <a href="#materialen">Materialen vergelijken <span aria-hidden="true">↓</span></a>
          <a href="#raamoplossingen">Ramen & deuren <span aria-hidden="true">↓</span></a>
          <a href="#comfort">Glas & comfort <span aria-hidden="true">↓</span></a>
          <a href="#renovatie-nieuwbouw">Jouw project <span aria-hidden="true">↓</span></a>
          <a href="#veelgestelde-vragen">Veelgestelde vragen <span aria-hidden="true">↓</span></a>
        </nav>

        <section className={styles.block} id="materialen" aria-labelledby="materials-title">
          <p className="section-label">Materiaalkeuze</p>
          <h3 id="materials-title">Wat past bij de manier waarop jij woont?</h3>
          <p className={styles.lead}>De uitstraling is het begin. Neem ook de gewenste raamformaten, het onderhoud en de technische uitwerking mee in je vergelijking.</p>
          <div className={styles.tableWrap} role="region" aria-label="Vergelijking PVC en aluminium, horizontaal schuifbaar" tabIndex={0}>
            <table>
              <caption>PVC en aluminium: aandachtspunten voor je keuze</caption>
              <thead><tr><th scope="col">Jouw keuze</th><th scope="col">PVC</th><th scope="col">Aluminium</th></tr></thead>
              <tbody>
                <tr><th scope="row">Uitstraling</th><td>Veelzijdig, met verschillende profielvormen en afwerkingen.</td><td>Fijne lijnen en een uitgesproken architecturaal karakter.</td></tr>
                <tr><th scope="row">Onderhoud</th><td>Regelmatig reinigen volgens de systeeminstructies.</td><td>Profielen en afwerking reinigen volgens de systeeminstructies.</td></tr>
                <tr><th scope="row">Afmetingen</th><td>Laat formaat en raamindeling technisch controleren.</td><td>Interessant bij grote glaspartijen; mogelijkheden verschillen per systeem.</td></tr>
                <tr><th scope="row">Comfort</th><td>Vergelijk het volledige raam, inclusief glas en plaatsing.</td><td>Vergelijk het volledige raam, inclusief glas en plaatsing.</td></tr>
                <tr><th scope="row">Afwerking</th><td>Vraag welke kleuren en structuren beschikbaar zijn.</td><td>Bespreek kleur, glansgraad en oppervlaktestructuur.</td></tr>
              </tbody>
            </table>
          </div>
          <aside className={styles.note}><strong>Ook hout aan het overwegen?</strong><p>Hout geeft een natuurlijke uitstraling en vraagt een onderhoudsaanpak die bij de houtsoort en afwerking past. Vraag bij je aanvraag na of deze uitvoering binnen jouw Windowprime-project mogelijk is.</p></aside>
        </section>

        <section className={styles.block} id="raamoplossingen" aria-labelledby="solutions-title">
          <p className="section-label">Van gevel tot tuin</p>
          <h3 id="solutions-title">Elk element heeft zijn eigen rol.</h3>
          <div className={styles.solutionGrid}>
            {solutions.map((solution) => (
              <article className={styles.solution} id={solution.id} key={solution.id}>
                <span className={styles.number} aria-hidden="true">{solution.number}</span>
                <h4>{solution.title}</h4>
                <p className={styles.subtitle}>{solution.subtitle}</p>
                <p>{solution.description}</p>
                <ul>{solution.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <p className={styles.tip}>{solution.question}</p>
                <a className={styles.link} href="#contact">Bespreek {solution.title.toLowerCase()} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className={styles.comfort} id="comfort" aria-labelledby="comfort-title">
        <div className="section-shell">
          <p className="section-label">Meer dan een mooi profiel</p>
          <h2 id="comfort-title">Het verschil zit<br /><em>in het geheel.</em></h2>
          <p className={styles.lead}>Een goed raam is een samenspel van onderdelen. Neem deze zes punten mee wanneer je jouw plannen bespreekt.</p>
          <div className={styles.detailGrid}>
            {details.map((detail) => <article key={detail.title}><h3>{detail.title}</h3><p>{detail.text}</p></article>)}
          </div>
        </div>
      </section>

      <div className="section-shell">
        <section className={styles.block} id="renovatie-nieuwbouw" aria-labelledby="project-title">
          <p className="section-label">Een plan dat bij je woning past</p>
          <h2 id="project-title">Vernieuwen of bouwen.<br /><em>Begin bij jouw situatie.</em></h2>
          <div className={styles.projectGrid}>
            <article><span className={styles.tag}>Renovatie</span><h3>Nieuw comfort in een vertrouwde woning.</h3><p>Bij vervanging telt wat er al is: de raamopeningen, dorpels, rolluikkasten en binnenafwerking. Breng in kaart wat behouden moet blijven en welke problemen je wilt aanpakken. Foto&apos;s van binnen en buiten maken een eerste bespreking concreter.</p><ul><li>Noteer tocht, moeilijk sluitende ramen of storend geluid.</li><li>Bespreek uitbreken, afvoer en herstel van de afwerking.</li><li>Stem de werkzaamheden af op andere renovatieplannen.</li></ul></article>
            <article><span className={styles.tag}>Nieuwbouw</span><h3>Geef licht en ruimte vanaf de start een plek.</h3><p>Met een bouwplan kun je ramen, doorgangen en zichtlijnen samen bekijken. Stem raamindeling, vloerpeilen en technische aansluitingen tijdig af met je architect en de andere uitvoerders. Zo worden keuzes onderdeel van één ontwerp.</p><ul><li>Bekijk de oriëntatie van grote glaspartijen.</li><li>Bespreek ventilatie, schaduw en privacy per kamer.</li><li>Leg de gewenste dorpels en binnenafwerking vast.</li></ul></article>
          </div>
          <aside className={styles.note}><strong>Denk vooruit over zonwering en rolluiken.</strong><p>Wil je later screens of rolluiken toevoegen? Bespreek de benodigde ruimte, bevestiging en elektrische voorzieningen voordat de ramen worden besteld. De levering van aanvullende systemen wordt afzonderlijk bevestigd.</p></aside>
        </section>

        <section className={styles.faq} id="veelgestelde-vragen" aria-labelledby="faq-title">
          <div className={styles.heading}>
            <div><p className="section-label">Heldere antwoorden</p><h2 id="faq-title">Goed voorbereid.<br /><em>Gerust gekozen.</em></h2></div>
            <p>Van het eerste idee tot de plaatsing: dit zijn vragen die helpen om je plannen scherp te krijgen.</p>
          </div>
          {questions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </section>

        <aside className={styles.prepare} aria-labelledby="prepare-title">
          <div><p className="section-label">Van lezen naar jouw project</p><h2 id="prepare-title">Leg je ideeën op tafel.</h2><p>Je hoeft nog niet alle antwoorden te kennen. Met je wensen, enkele foto&apos;s en een overzicht van de gewenste ramen en deuren kan het gesprek beginnen.</p></div>
          <a className="button button--primary" href="#contact">Bespreek jouw plannen <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </div>
  );
}
