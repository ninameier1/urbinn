import Image from "next/image";

import { getNewestMunicipalities } from "@db/municipalities";

import Button from "@/components/Button";
import Tag from "@/components/Tag";
import MunicipalityCard from "@/components/MunicipalityCard";

export const revalidate = 60;

export default async function HomePage() {
  const municipalities = await getNewestMunicipalities();

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
        <div className="flex flex-col justify-center px-12 py-20 lg:px-20 bg-background">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-8">
            Windesheim · Vrije Universiteit · ROC Flevoland
          </span>

          <h1 className="font-serif text-[clamp(3rem,6vw,6rem)] leading-[1.05] font-bold text-foreground mb-8">
            Gezonde
            <br />
            <em className="not-italic text-primary">Leef&shy;omgeving</em>
          </h1>

          <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-10">
            Inclusieve en duurzame stadsontwikkeling in Flevoland.
            Onderzoekers werken samen met gemeenten, bedrijven en inwoners
            aan praktijkgerichte vraagstukken.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button href="/gemeenten" variant="primary">
              Bekijk gemeenten
            </Button>
            <Button href="/onderzoeken" variant="secondary">
              Onderzoeken →
            </Button>
          </div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full">
          <Image
            src="/assets/images/header.jpg"
            alt="Urban Innovation"
            fill
            sizes="50vw"
            className="object-cover"
            priority
            unoptimized
          />

          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />


          <div className="absolute bottom-10 left-8 bg-background/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Deelnemende gemeenten
            </p>
            <p className="text-3xl font-bold text-primary">
              {municipalities.length}+
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-10 px-6 lg:px-20">
        <p className="max-w-5xl mx-auto text-center text-base lg:text-lg text-muted-foreground leading-relaxed">
          In de stad en de stedelijke regio liggen de grote uitdagingen van de toekomst.
          Er spelen economische en sociale vraagstukken en tegelijkertijd staan steden voor
          grote opgaven op het gebied van bouwen en duurzaamheid. Met een participatieve en
          ontwerpgerichte aanpak worden innovatieve toepassingen direct in de praktijk getest.
        </p>
      </section>

      <section className="py-20 bg-background overflow-hidden">
        <div className="flex items-end justify-between px-6 lg:px-20 mb-10">
          <div>
            <Tag label="Gemeenten" href="/gemeenten" />
            <h2 className="text-3xl font-bold mt-2">Uitgelichte Gemeenten</h2>
          </div>
          <Button href="/gemeenten" variant="secondary" className="hidden md:inline-flex">
            Alle gemeenten →
          </Button>
        </div>

        <div className="flex gap-6 px-6 lg:px-20 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {municipalities.map((municipality) => (
            <div
              key={municipality.id}
              className="flex-none w-[320px] snap-start"
            >
              <MunicipalityCard
                name={municipality.name}
                image={municipality.image ?? "/placeholder.jpg"}
                href={`/gemeenten/${municipality.name.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button href="/gemeenten" variant="primary">
            Alle gemeenten →
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 min-h-[420px]">
        <div className="relative lg:col-span-3 min-h-[280px]">
          <Image
            src="/assets/images/header.jpg"
            alt="Urban Innovation tree"
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <Tag label="Over ons" href="/over-ons" />
            <h3 className="text-3xl font-bold text-white mt-3 mb-3">
              Wie zijn wij?
            </h3>
            <p className="text-white/80 max-w-md leading-relaxed">
              Het lectoraat Urban Innovation richt zich op inclusieve, veilige en
              duurzame steden — en werkt daarvoor samen met studenten, bedrijven
              en bewoners in Flevoland.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-primary flex flex-col justify-center p-10 lg:p-14">
          <Tag label="Urban Innovation" href="/urban-innovation" />
          <h3 className="text-3xl font-bold text-white mt-3 mb-4">
            Wat doen wij?
          </h3>
          <p className="text-white/75 leading-relaxed mb-8">
            Onderzoek naar inclusieve, veilige en duurzame steden in Flevoland.
            Samen met partners en studenten worden innovatieve oplossingen
            direct in de praktijk getest.
          </p>
          <Button href="/onderzoeken" variant="secondary">
            Meer over ons onderzoek →
          </Button>
        </div>
      </section>
    </>
  );
}