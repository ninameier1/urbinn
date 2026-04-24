import { prisma } from "@/lib/prisma";
import MunicipalityCard from '@/components/MunicipalityCard';

export const revalidate = 60;

export default async function MunicipalitiesPage() {
    const municipalities = await prisma.municipality.findMany({
      orderBy: { name: "asc" },
    });

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mb-6">Gemeenten</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {municipalities.map((municipality) => (
            <MunicipalityCard
              key={municipality.id}
              name={municipality.name}
              image={municipality.image}
              href={`/gemeenten/${municipality.name.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}