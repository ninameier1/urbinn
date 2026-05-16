import Image from "next/image";

import { getNewestMunicipalities } from "@db/municipalities";

import Button from "@/components/Button";
import Tag from "@/components/Tag";
import MunicipalityCard from "@/components/MunicipalityCard";

export const revalidate = 60;

const partners = [
  "Windesheim",
  "Vrije Universiteit Amsterdam",
  "ROC Flevoland",
  "Flever",
];

export default async function HomePage() {
  const municipalities = await getNewestMunicipalities();

  return (
    <main className="bg-background overflow-hidden">
      <section className="relative min-h-screen flex items-center">
        
        <div className="absolute inset-0">
          <Image
            src="/assets/images/header.jpg"
            alt="Gezonde Stad"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="absolute top-32 left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-24 right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
          
          <div className="max-w-4xl">
            <Tag label="Gezonde Stad Flevoland" href="/urban-innovation" />

            <h1 className="mt-8 text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]">
              De stad
              <br />
              van morgen
              <br />
              begint hier.
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/75 leading-relaxed">
              Urban Innovation onderzoekt samen met onderwijsinstellingen,
              gemeenten en maatschappelijke partners hoe steden in Flevoland
              inclusiever, gezonder en duurzamer kunnen worden ingericht.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/gemeenten" variant="primary">
                Bekijk dashboards
              </Button>

              <Button href="/urban-innovation" variant="secondary">
                Over het onderzoek
              </Button>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-4">
                Samenwerking
              </p>

              <p className="text-white text-xl leading-relaxed font-medium">
                Onderwijs, onderzoek en praktijk werken samen aan stedelijke innovatie.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-4">
                Flevoland
              </p>

              <p className="text-white text-xl leading-relaxed font-medium">
                Praktijkgericht onderzoek binnen meerdere gemeenten en regio’s.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-4">
                Gezonde Stad
              </p>

              <p className="text-white text-xl leading-relaxed font-medium">
                Focus op leefbaarheid, inclusiviteit, duurzaamheid en gezondheid.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="relative py-24 bg-primary text-white overflow-hidden">
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 right-0 h-96 w-96 rounded-full border border-white" />
          <div className="absolute bottom-0 left-20 h-64 w-64 rounded-full border border-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center justify-between">
            
            <div className="max-w-2xl">
              <Tag label="Partners" href="/over-ons" />

              <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
                Een regionaal netwerk
                <br />
                voor stedelijke innovatie
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[320px]">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-8 text-center font-medium"
                >
                  {partner}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
            
            <div className="max-w-2xl">
              <Tag label="Gemeenten" href="/gemeenten" />

              <h2 className="mt-6 text-5xl font-bold tracking-tight leading-tight">
                Lokale inzichten.
                <br />
                Regionale impact.
              </h2>
            </div>

            <p className="max-w-xl text-muted-foreground text-lg leading-relaxed">
              Binnen deelnemende gemeenten worden dashboards en onderzoeken
              gebruikt om inzicht te krijgen in leefbaarheid, gezondheid en
              stedelijke ontwikkeling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {municipalities.map((municipality) => (
              <MunicipalityCard
                key={municipality.id}
                name={municipality.name}
                image={municipality.image ?? "/placeholder.jpg"}
                href={`/gemeenten/${municipality.name.toLowerCase()}`}
              />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button href="/gemeenten" variant="primary">
              Alle gemeenten →
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-36 bg-secondary text-white overflow-hidden">
        
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/assets/images/tree.png"
            alt="Tree"
            fill
            className="object-contain object-right"
            unoptimized
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          
          <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-6">
            Urban Innovation
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-[1] tracking-tight">
            Onderzoek dat niet
            <br />
            in rapporten blijft,
            <br />
            maar zichtbaar wordt
            <br />
            in de stad.
          </h2>

          <div className="mt-12">
            <Button href="/urban-innovation" variant="secondary">
              Lees meer
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}