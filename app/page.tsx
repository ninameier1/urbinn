import Link from 'next/link';
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import MunicipalityCard from "@/components/MunicipalityCard";

export const revalidate = 60;

export default async function HomePage() {
  const municipalities = await prisma.municipality.findMany({
    orderBy: { created_at: "desc" },
    take: 3,
  });

  return (
    <>
      <div className="relative h-[40vh]">
        <Image
          src="/assets/images/header.jpg"
          alt="Urban Innovation"
          fill
          sizes="100vw"
          className="object-cover z-0"
          unoptimized={true}
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10">
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

      <div className="py-16 bg-primary">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Wat is Urban Innovation?</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Onze onderzoeken</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-100 bg-background">
        <div className="max-w-full">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            Uitgelichte gemeenten
          </h2>
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
            <Link
              href="/gemeenten"
              className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Bekijk alle gemeenten →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}