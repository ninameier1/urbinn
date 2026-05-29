import { getMunicipalityByName } from '@db/municipalities';
import TitleSection from "@/components/Sections/TitleSection";
import MunicipalityCard from "@/components/MunicipalityCard";

export const revalidate = 60;

export default async function OriginPage() {
  const municipality = await getMunicipalityByName('Zwolle');
  if (!municipality) return null;

  return (
    <>
      <TitleSection />
      <div>
        <MunicipalityCard
          name={municipality.name}
          description={municipality.description}
          image={municipality.image ?? '/placeholder.jpg'}
          href={`/gemeenten/${municipality.name.toLowerCase()}`}
        />
      </div>
    </>
  );
}