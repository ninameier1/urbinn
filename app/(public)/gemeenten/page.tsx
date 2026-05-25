import { getAllMunicipalities } from '@db/municipalities';

import MunicipalityCard from '@/components/MunicipalityCard';
import TitleSection from '@/components/TitleSection';
import SortBar from '@/components/SortBar';

export const revalidate = 60;

export default async function MunicipalitiesPage({ searchParams }: { searchParams: { sort?: string; query?: string }; }) {
  const { sort = 'name_asc', query = '' } = await searchParams;
  const municipalities = await getAllMunicipalities(sort, query);

  const MUNICIPALITY_SORT_OPTIONS = [
  { value: 'name_asc',     label: 'Naam A–Z' },
  { value: 'name_desc',    label: 'Naam Z–A' },
  { value: 'created_desc', label: 'Nieuwste eerst' },
  { value: 'created_asc',  label: 'Oudste eerst' },
  { value: 'updated_desc', label: 'Recentst bijgewerkt' },
  ];

  return (
    <div className="py-12 mb-12 relative w-full min-h-[90vh]">
      <div className="container mx-auto px-4">
        <TitleSection />
        <SortBar sortOptions={MUNICIPALITY_SORT_OPTIONS} placeholder="Zoek gemeente..." />

        {!municipalities.length ? (
          <p className="mt-6 text-sm text-red-900">
            Geen gemeenten gevonden voor "{query}".
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {municipalities.map((municipality) => (
              <MunicipalityCard
                key={municipality.id}
                name={municipality.name}
                description={municipality.description}
                image={municipality.image ?? '/placeholder.jpg'}
                href={`/gemeenten/${municipality.name.toLowerCase()}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}