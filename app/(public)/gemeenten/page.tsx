import { getAllMunicipalities } from '@db/municipalities';

import MunicipalityCard from '@/components/MunicipalityCard';
import TitleSection from '@/components/TitleSection';

export const revalidate = 60;

export default async function MunicipalitiesPage() {
const municipalities = await getAllMunicipalities();
if (!municipalities.length) return <h2>Geen gemeenten gevonden</h2>;

  return (
    <div className="py-12 mb-12 relative w-full min-h-[90vh]">
      <div className="container mx-auto px-4">
        <TitleSection />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
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