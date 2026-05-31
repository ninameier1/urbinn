import Image from "next/image";
import Link from "next/link";

import { getNewestMunicipalities } from "@db/municipalities";
import { getNewestPublication } from "@/lib/db/publications";
import { getAllPartners } from "@/lib/db/partners";
import { formatDateShort } from '@/utils/date';
import { slugify } from "@/utils/helpers";
import { HouseHeart, Leaf, Users, Heart, Building2, HeartHandshake, Microscope, NotebookPen, Cog } from "lucide-react";

import Button from "@/components/Button";
import Tag from "@/components/Tag";
import MunicipalityCard from "@/components/MunicipalityCard";


export const revalidate = 60;

const themes = [
  { icon: HouseHeart, label: "Wonen", description: "Betaalbaar, toegankelijk en divers" },
  { icon: Leaf, label: "Duurzaamheid", description: "Energie, groen en klimaatadaptatie" },
  { icon: HeartHandshake, label: "Inclusiviteit", description: "Kansen en participatie voor iedereen" },
  { icon: Heart, label: "Welzijn", description: "Gezondheid, veiligheid en cohesie" },
];

const stats = [
  { icon: Building2, label: "Gemeenten geanalyseerd", value: "5 gemeenten" },
  { icon: Cog, label: "Kernelementen onderzocht", value: "40+ kernelementen" },
  { icon: Users, label: "Betrokken partners", value: "4 organisaties" },
];

export default async function HomePage() {
  const municipalities = await getNewestMunicipalities();
  const publication = await getNewestPublication();
  const partners = await getAllPartners();
  const [featured, ...rest] = municipalities;

return (
  <>
    <section className="relative overflow-hidden -mt-8">
      <div className="absolute inset-0 z-0">
                  <Image
                      src="/assets/images/headernw.png"
                      alt="Gezonde Stad"
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover"

                  />
        <div className="absolute inset-0 bg-white/60" />
     </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative h-[850px] w-[500px] left-0 top-1/2 -translate-y-1/2 opacity-50 absolute">
          <Image
            src="/assets/images/glowgears.png"
            alt=""
            fill
            sizes="500px"
            className="object-contain"
          />
        </div>
      </div>

    <div className="relative z-10 px-6 lg:px-16 pt-16 pb-16 max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[.18em] uppercase text-primary mb-5">
            Consortium-XL · Flevoland
            </p>

            <div className="relative leading-none select-none min-h-[18rem] flex items-center justify-center mb-6 mt-4">
              <span className="absolute top-0 left-0 font-serif text-[clamp(4rem,7vw,7rem)] font-bold tracking-tight text-dark">
                Let's
              </span>

              <h1 className="font-serif text-[clamp(8rem,16vw,18rem)] font-bold tracking-tight text-primary text-center py-16">
                <em className="not-italic">GLOW</em>
              </h1>

              <span className="absolute bottom-0 right-0 font-serif text-[clamp(4rem,7vw,7rem)] font-bold tracking-tight text-dark">
                Flevoland
              </span>
            </div>

            <p className="text-base text-text/60 leading-relaxed max-w-md mx-auto mb-10">
            Een samenwerking tussen Windesheim, de VU, ROC Flevoland en Flever.
            Samen onderzoeken we hoe steden in Flevoland inclusiever, veiliger
            en duurzamer worden.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
            <Button href="/onderzoek" variant="primary">
                Ontdek het onderzoek
            </Button>

            <Button href="/gemeenten" variant="secondary">
                Bekijk gemeenten →
            </Button>
            </div>
        </div>
      </section>

      <div className="bg-white border-y border-text/10 py-6 px-6 lg:px-16 text-center">
        <Tag label="Consortiumpartners" href="/consortium" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {partners.map((p) => (
            <Link
              key={p.name}
              href={`/partner/${slugify(p.name)}`}
              // href={p.website ?? '#'}
              className="relative bg-background border border-text/10 hover:opacity-60 transition rounded-xl h-20 flex items-center justify-center hover:border-accent transition-colors"
            >
              <Image
                src={p.logo}
                alt={p.name}
                fill
                sizes="200px"
                className="object-contain p-2"
              />
            </Link>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-text/10">
        <div className="px-6 lg:px-12 py-14 lg:border-r border-text/10">
        <Tag label="Over Ons" href="/over-ons" />
          <h2 className="font-serif text-2xl font-bold text-dark leading-snug mb-5">
            Praktijkgericht onderzoek in Flevolandse steden
          </h2>
          <p className="text-sm text-text/58 leading-relaxed">
            In de stad en de stedelijke regio liggen de grote uitdagingen van de toekomst.
            Er spelen economische en sociale vraagstukken en tegelijkertijd staan steden voor
            grote opgaven op het gebied van bouwen en duurzaamheid. Met een participatieve en
            ontwerpgerichte aanpak worden innovatieve toepassingen direct in de praktijk getest.
        
            Gezonde Stad brengt onderzoekers, studenten, gemeenten en bewoners
            samen om te werken aan concrete vraagstukken: betaalbaar wonen,
            sociale inclusie, duurzaamheid en welzijn. De resultaten worden
            direct teruggekoppeld aan beleidsmakers en inwoners.
          </p>
        </div>

        <div className="px-6 lg:px-12 py-14 flex justify-center gap-4 items-center">
          <div className="w-40 h-28 rounded-2xl bg-primary/80 -rotate-2 overflow-hidden">
            <Image src="/assets/images/header.jpg" alt="" fill className="object-cover opacity-60" unoptimized />
          </div>
          <div className="relative w-52 h-36 rounded-2xl bg-dark overflow-hidden z-10">
            <Image src="/assets/images/header.jpg" alt="Stedelijke inclusiviteit" fill className="object-cover opacity-40" unoptimized />
            <div className="absolute bottom-3 left-3 right-3 bg-white/10 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-background/70 uppercase tracking-widest">Almere · 2026</p>
              <p className="text-sm font-semibold text-background mt-0.5">Stedelijke inclusiviteit</p>
            </div>
          </div>
          <div className="w-40 h-28 rounded-2xl bg-accent/70 rotate-2 overflow-hidden">
            <Image src="/assets/images/header.jpg" alt="" fill className="object-cover opacity-50" unoptimized />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-14">
        <div className="flex justify-between items-end mb-7">
          <div>
            <Tag label="Gemeenten" href="/gemeenten" />
            <h2 className="font-serif text-3xl font-bold text-dark">Flevoland in beeld</h2>
          </div>
          <Button variant="primary" href="/gemeenten">
            Alle gemeenten →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-4 items-stretch">
          {featured && (
            <MunicipalityCard
              name={featured.name}
              image={featured.image}
              href={`/gemeenten/${featured.name.toLowerCase()}`}
              featured
              tags={["Wonen", "Inclusiviteit", "Welzijn"]}
              description={featured.description}
            />
          )}

          {rest.map((municipality, i) => (
            <MunicipalityCard
              key={municipality.id}
              name={municipality.name}
              image={municipality.image}
              href={`/gemeenten/${municipality.name.toLowerCase()}`}
              tags={["Veiligheid", "Duurzaamheid"]}
            />
          ))}
        </div>
      </section>

      <hr className="border-text/10" />

      <section className="px-6 lg:px-16 py-14">
        <div className="flex justify-between items-end mb-7">
          <div>
            <Tag label="Onderzoeksthema's" href="/onderzoek/themas" />
            <h2 className="font-serif text-3xl font-bold text-dark">Wat we onderzoeken</h2>
          </div>
          <Button variant="primary" href="/onderzoek/themas">
            Alle Onderzoeksthema's →
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((theme) => {
          const Icon = theme.icon;
            return (
                    <div key={theme.label} className="bg-white border border-text/8 rounded-2xl p-5 hover:border-text/20 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
                        <Icon />
                      </div>
                      <p className="font-bold text-sm text-text mb-1.5">{theme.label}</p>
                      <p className="text-xs text-text/50 leading-relaxed">{theme.description}</p>
                    </div>
            );
          })}
        </div>
      </section>

      <hr className="border-text/10" />


      <section className="px-6 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {publication && (
        <div className="flex flex-col items-start">
        <Tag label="Publicaties" href="/onderzoek/publicaties" />
          <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold tracking-wide uppercase rounded px-2.5 py-1 mb-5">
            Nieuw rapport · {publication.published_at ? formatDateShort(publication.published_at) : new Date().getFullYear()}
          </span>
          <h2 className="font-serif text-[1.75rem] font-bold text-dark leading-snug mb-4">
            {publication.title ?? 'Flevoland in Beeld: wonen, welzijn en duurzaamheid in cijfers'}
          </h2>
          <p className="text-sm text-text/60 leading-relaxed mb-7">
            {publication.description ?? 'De professors, lectoren en onderzoekers van het Consortium-XL publiceren met regelmaat over hun onderzoek. Hun publicaties zijn van grote waarde voor de maatschappelijke, economische ontwikkeling van Nederland. Publicaties worden met regelmaat gepubliceerd op basis van open access. Dit geeft vrije toegang tot alle resultaten van en handvatten uit ons praktijkgericht onderzoek. Iedereen kan die informatie (her)gebruiken.'}
          </p>
          <Button href="/onderzoek/publicaties" variant="secondary">
            Bekijk alle Publicaties →
          </Button>
        </div>
        )}

        <div className="bg-dark rounded-2xl p-7 flex flex-col gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="flex gap-4 items-center bg-background/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0">
                  <Icon />
                </div>

                <div>
                  <p className="text-[11px] text-background/50 mb-0.5">
                    {stat.label}
                  </p>

                  <p className="text-base font-bold text-background">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <hr className="border-text/10" />

      <section className="px-6 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="bg-white border border-text/8 rounded-2xl p-7">
          <div className="flex justify-between">
            <Tag label="Het Consortium" href="/consortium" />
            <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
              <NotebookPen />
            </div>
          </div>
          <h3 className="font-serif text-xl font-bold text-dark mb-3">Wie zijn wij?</h3>
          <p className="text-sm text-text/60 leading-relaxed">
            Consortium-XL verzamelt en initieert innovatievoorbeelden en -verhalen uit de nieuwe stad. 
            Met praktijkgericht onderzoek kunnen we leren, begrijpen en delen wat er gebeurt. 
            Zo dragen we bij aan welbevinden, welzijn en welvaart voor iedereen.
          </p>
        </div>
        <div className="bg-white border border-text/8 rounded-2xl p-7">
          <div className="flex justify-between">
            <Tag label="Het Onderzoek" href="/onderzoek" />
            <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
              <Microscope />
            </div>
          </div>
          <h3 className="font-serif text-xl font-bold text-dark mb-3">Wat doen wij?</h3>
          <p className="text-sm text-text/60 leading-relaxed">
            Pionieren, vernieuwen, vooruitgaan. Steden in Flevoland doen het dagelijks, samen met het lectoraat Urban Innovation. 
            Projecten van het lectoraat zijn circulair, gezond en nabij.
          </p>
        </div>
      </section>

      <hr className="border-text/10" />
    </>
  );
}