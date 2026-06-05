import type { Metadata } from 'next'

import Image from "next/image";

export const metadata: Metadata = {
  title: "GLOW",
}

export const revalidate = 60;

export default async function GLOWPage() {
  return (
    <div className="space-y-8 mt-8">

      {/* Intro */}
      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4 block">
              Onderzoek
            </span>
            <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
              Gezonde Leefomgeving op Wijkniveau
            </h1>
            <p className="max-w-3xl text-sm text-stone-500 leading-7">
              Het doel van GLOW-XL is het ontwikkelen en empirisch testen van een bestuurs- en implementatiekader dat gemeenten en praktijkpartners in staat stelt om op duurzame wijze wetenschappelijk onderbouwde geïntegreerde preventiestrategieën te implementeren en op te schalen.
            </p>
          </div>
          <div className="relative h-56 w-56 shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Let's GLOW Flevoland logo"
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="border-b border-stone-200 bg-primary/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 items-center">
                          <div className="lg:col-span-4">
                            <div className="relative h-64 rounded-lg overflow-hidden border border-stone-200">
                              <Image
                                src="/assets/images/onderzoek3.jpg"
                                alt="Betrokkenheid"
                                fill
                                sizes="500px"
                                className="object-cover"
                              />
                            </div>
                          </div>
              
                          <div className="lg:col-span-8">
                            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                              Samenhang
                            </span>
              
                            <p className="text-sm leading-7 text-stone-600">
                              Het project draagt bij aan de wetenschappelijke kennis door gezondheidspreventie te conceptualiseren als een integrale en gelaagde systeemaanpak in plaats van een reeks geïsoleerde interventies. Het project integreert inzichten uit de implementatiewetenschap, gedragswetenschap, openbaar bestuur en participatief actieonderzoek. Deze interdisciplinaire aanpak stelt het project in staat te analyseren hoe gedragsmechanismen, leefomgeving, sociale dynamiek en institutioneel bestuur op elkaar inwerken in complexe lokale systemen.   
                            </p>
                          </div>
                        </div>
                        </div>
        
                        <div>
                                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 items-center">
                                    <div className="lg:order-2 lg:col-span-4">
                                      <div className="relative h-64 rounded-lg overflow-hidden border border-stone-200">
                                        <Image
                                          src="/assets/images/onderzoek1.jpg"
                                          alt="Samenwerking"
                                          fill
                                          sizes="500px"
                                          className="object-cover"
                                        />
                                      </div>
                                    </div>
                        
                                    <div className="lg:order-1 lg:col-span-8">
                                      <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                                        Methode
                                      </span>
                        
                                      <p className="text-sm leading-7 text-stone-600">
                                        Methodologisch gezien hanteert het project een mixed-methods onderzoeksopzet die participatief onderzoek combineert met implementatie-evaluatie. Gegevens worden verzameld op de drie niveaus via kwalitatieve en kwantitatieve methoden. Interviews, focusgroepen en participatieve workshops met burgers, professionals en beleidsmakers leggen ervaringen, samenwerkingsdynamiek en gedragsmechanismen vast die van invloed zijn op preventieve actie. Praktijkgericht onderzoek en monitoringindicatoren bieden inzicht in implementatieresultaten zoals bereik, acceptatie, naleving, effectiviteit, impact en duurzaamheid.   
                                      </p>
                                  </div>
                                </div>
                                </div>
                                      <div className="border-b border-stone-200 bg-primary/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 items-center">
                          <div className="lg:col-span-4">
                            <div className="relative h-64 rounded-lg overflow-hidden border border-stone-200">
                              <Image
                                src="/assets/images/onderzoek2.jpg"
                                alt="Impact"
                                fill
                                sizes="500px"
                                className="object-cover"
                              />
                            </div>
                          </div>
              
                          <div className="lg:col-span-8">
                            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                              Evaluatie
                            </span>
                            <p className="text-sm leading-7 text-stone-600">
                              Om de systemische effecten van de interventies te analyseren, past het project realistisch geïnspireerde evaluatiemethoden toe. Deze aanpak richt zich op het identificeren van context-mechanisme-uitkomst-configuraties die verklaren waarom preventiestrategieën verschillend werken in verschillende gemeenten en buurten. Daarnaast wordt rimpel-effectmapping gebruikt om bredere beoogde en onbedoelde effecten te identificeren die voortkomen uit interventies in complexe systemen.  
                            </p>
                          </div>
                        </div>
                        </div>
      </section>

      {/* Onderzoeksvraag */}
      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-4">
            Onderzoeksvraag
          </span>
          <h2 className="text-2xl font-serif font-semibold text-dark mb-4">
            Hoe kunnen gemeenten in samenwerking met (publiek-private) praktijkpartners op duurzame wijze geïntegreerde preventiestrategieën implementeren en opschalen op het niveau van burgers, buurten en organisaties?   
          </h2>
          <p className="text-sm text-stone-500 leading-7 max-w-3xl">
            Deze vraag wordt beantwoord aan de hand van drie onderling samenhangende onderzoeksvragen.
          </p>
        </div>
        <div className="divide-y divide-stone-200">
          {[
            {
              nr: "01",
              question: "Welke contextuele factoren en generatieve mechanismen maken geïntegreerde preventie mogelijk of belemmeren deze op micro-, meso- en macroniveau?",
            },
            {
              nr: "02",
              question: "Hoe kunnen bestuursinstrumenten de integrale en transdisciplinaire afstemming tussen de 3 niveaus ondersteunen?",
            },
            {
              nr: "03",
              question: "Onder welke voorwaarden kunnen gemeenten en praktijkpartners zelfstandig geïntegreerde preventiebenaderingen opschalen en in stand houden?",
            },
          ].map((item) => (
            <div key={item.nr} className="p-6 md:p-8 flex gap-6 items-start">
              <span className="text-3xl font-serif font-bold text-primary shrink-0 leading-none">
                {item.nr}
              </span>
              <p className="text-sm text-stone-600 leading-7 pt-1">{item.question}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-4">
            Impact
          </span>
          <h2 className="text-2xl font-serif font-semibold text-dark">
            Maatschappelijke impact op drie niveaus
          </h2>
          <p className="text-sm text-stone-500 leading-7 max-w-7xl">
            Het project conceptualiseert preventie als een systeeminterventie op meerdere niveaus die gelijktijdig in samenhang opereert op drie onderling verbonden niveaus: burgers en gemeenschappen (microniveau),  leefomgeving,  buurtnetwerken en professionele samenwerking (mesoniveau) en organisatorische en beleidssystemen (macroniveau).   
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {[
            {
              level: "Micro",
              sub: "Burgers & gemeenschappen",
              text: "Inclusieve participatie in preventie versterken door co-creatieprocessen te verankeren in het wijkbestuur. Dit vergroot het vertrouwen, de collectieve effectiviteit en de responsiviteit op lokale behoeften, met name in gemeenschappen die te maken hebben met gezondheidsongelijkheden. ",
            },
            {
              level: "Meso",
              sub: "Wijk- & professioneel netwerk",
              text: "Samenwerking tussen actoren in de sociale, volksgezondheids- en ruimtelijke ordening verbeteren. Door operationele praktijken af te stemmen op gedeelde preventiedoelen kunnen gemeenten samen met publieke en private praktijkorganisaties de samenhang en effectiviteit van interventies in de lokale leefomgeving vergroten.    ",
            },
            {
              level: "Macro",
              sub: "Organisatie- & beleidsniveau",
              text: "Duurzame cross-institutionele verankering van samenwerking voor preventie. Door bestuurslokale mechanismen, contextuele omstandigheden en implementatiedynamiek expliciet te maken, kunnen gemeenten en praktijkorganisaties verder gaan dan tijdelijke pilotprojecten en preventie structureel integreren in beleidscycli, organisatorische routines en interdepartementale en intersectorale samenwerking.   ",
            },
          ].map((item) => (
            <div key={item.level} className="p-6 md:p-8">
              <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-3">
                {item.level}
              </span>
              <h3 className="text-base font-semibold text-dark mb-3">{item.sub}</h3>
              <p className="text-sm text-stone-500 leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aanpak */}
      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-4">
            Aanpak
          </span>
          <h2 className="text-2xl font-serif font-semibold text-dark mb-4">
            Vijf werkpakketten
          </h2>
          <p className="text-sm text-stone-500 leading-7 max-w-3xl">
            Het onderzoek is georganiseerd in vijf onderling verbonden werkpakketten, verspreid over zes jaar.
          </p>
        </div>
        <div className="divide-y divide-stone-200">
          {[
            {
              wp: "WP1",
              period: "Jaar 1–2",
              title: "Conceptueel kader en voorbereiding",
              text: "Bestaande kennis uit geïntegreerde preventie-initiatieven wordt samengevat en vertaald naar een eerste implementatiekader en onderzoeksopzet. Gemeenten en praktijkpartners analyseren hun lokale  context en  bestuursstructuren en identificeren relevante stakeholders in verschillende sectoren.",
            },
            {
              wp: "WP2",
              period: "Jaar 2–3",
              title: "Versterking van integraal preventiebeleid en aanpak",
              text: "Gemeentelijke leernetwerken analyseren institutionele belemmeringen en kansen voor samenwerking tussen verschillende domeinen en sectoren. Innovaties op het gebied van bestuur en organisatorische aanpassingen worden ontwikkeld en in de praktijk getest.",
            },
            {
              wp: "WP3",
              period: "Jaar 3–6",
              title: "Participatieve implementatie in de buurt",
              text: "Participatieve benaderingen worden geïmplementeerd in geselecteerde buurten. Inwoners, professionals en lokale organisaties werken samen om preventieve acties te identificeren en te implementeren die zijn afgestemd op de lokale context.",
            },
            {
              wp: "WP4",
              period: "Jaar 2–6",
              title: "Evaluatie van implementatieprocessen",
              text: "Implementatieprocessen en -resultaten worden geanalyseerd met behulp van op het realisme gebaseerde evaluatiemethoden. Gegevens uit interviews, monitoringindicatoren en leernetwerken worden geïntegreerd om mechanismen te identificeren die het succes of falen van implementatiestrategieën verklaren. ",
            },
            {
              wp: "WP5",
              period: "Jaar 6",
              title: "Integratie, opschaling en kennisoverdracht",
              text: "Inzichten uit het onderzoek worden vertaald naar een adaptief ‘overall’ implementatiedashboard, richtlijnen voor governance en trainingsmodules. Verspreiding vindt plaats via intergemeentelijke leernetwerken, bijeenkomsten van experts en nationale kennisplatforms.",
            },
          ].map((item) => (
            <div key={item.wp} className="p-6 md:p-8 flex gap-6 items-start bg-white odd:bg-primary/5">
              <div className="shrink-0 text-center w-12">
                <span className="text-xs font-bold text-primary block">{item.wp}</span>
                <span className="text-xs text-stone-400 block mt-1">{item.period}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-7">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}