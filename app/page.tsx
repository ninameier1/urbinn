import Image from "next/image";

import { prisma } from "@/lib/prisma";

import Button from "@/components/Button"
import Tag from "@/components/Tag"
import MunicipalityCard from "@/components/MunicipalityCard";

export const revalidate = 60;

export default async function HomePage() {
  const municipalities = await prisma.municipality.findMany({
    orderBy: { created_at: "desc" },
    take: 3,
  });

  return (
    <>
      <div className="relative h-[55vh] min-h-[400px] -mt-12">
        <Image
          src="/assets/images/header.jpg"
          alt="Urban Innovation"
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized={true}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute inset-0 z-10">
          <Image
            src="/assets/images/urbinntextw.png"
            alt="Overlay"
            fill
            sizes="100vw"
            className="object-contain z-20"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="py-20 bg-primary">
        <div className="mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">

          <div className="md:col-span-2 bg-background rounded-2xl p-8 shadow-lg">
            <Tag label="Over ons" href="/over-ons" />
            <h3 className="text-xl font-semibold mb-4 leading-snug">
              Wie zijn wij?
            </h3>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
          </div>

          <div className="md:col-span-2 bg-background rounded-2xl p-8 shadow-lg">
            <Tag label="Urban Innovation" href="/urban-innovation" />
            <h3 className="text-xl font-semibold mb-4 leading-snug">
              Wat doen wij?
            </h3>
            <p className="leading-relaxed">
              Onderzoek naar inclusieve, veilige en duurzame steden in Flevoland. 
            </p>
          </div>

        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="max-w-full">
          
          <div className="flex flex-col items-center mb-12 gap-3">
            <Tag label="Gemeenten" href="/gemeenten" />
            <h2 className="text-3xl font-semibold text-center">
              Uitgelichte Gemeenten
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              Bekijk de meest recente dashboards van deelnemende gemeenten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            {municipalities.map((municipality) => (
              <MunicipalityCard
                key={municipality.id}
                name={municipality.name}
                image={municipality.image ?? ""}
                href={`/gemeenten/${municipality.name.toLowerCase()}`}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/gemeenten" variant="primary">
              Bekijk alle gemeenten →
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}