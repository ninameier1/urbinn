import { getAllMunicipalities } from '@db/municipalities';

import MunicipalityCard from '@/components/MunicipalityCard';

export const revalidate = 60;

export default async function MunicipalitiesPage() {
const municipalities = await getAllMunicipalities();
if (!municipalities.length) return <h2>Geen gemeenten gevonden</h2>;

  return (
    <div className="py-20 mb-12">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mb-12">Gemeenten</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {municipalities.map((municipality) => (
            <MunicipalityCard
              key={municipality.id}
              name={municipality.name}
              image={municipality.image ?? "/placeholder.jpg"}
              href={`/gemeenten/${municipality.name.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}