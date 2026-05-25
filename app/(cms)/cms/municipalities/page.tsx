import Link from 'next/link';

import { getAllMunicipalitiesCMS } from '@db/municipalities';
import { formatDate } from '@/utils/date';

import TitleSection from '@/components/TitleSection';
import SortBar from '@/components/SortBar';

export const revalidate = 0;

export default async function MunicipalitiesPage({ searchParams }: {
  searchParams: { sort?: string; query?: string };
}) {
  const { sort = 'updated_desc', query = '' } = await searchParams;

  const municipalities = await getAllMunicipalitiesCMS(sort, query);

  const MUNICIPALITY_SORT_OPTIONS = [
    { value: 'updated_desc', label: 'Recentst bijgewerkt' },
    { value: 'created_desc', label: 'Nieuwste eerst' },
    { value: 'created_asc',  label: 'Oudste eerst' },
    { value: 'name_asc',     label: 'Naam A–Z' },
    { value: 'name_desc',    label: 'Naam Z–A' },
    { value: 'creator_asc',  label: 'Aangemaakt door A–Z' },
    { value: 'creator_desc', label: 'Aangemaakt door Z–A' },
  ];

  return (
    <>
      <TitleSection />

      <SortBar 
      sortOptions={MUNICIPALITY_SORT_OPTIONS}
      defaultSort="published_desc" 
      placeholder="Zoek gemeente..." 
      />

      {!municipalities.length ? (
          <p className="mt-6 text-sm text-red-900">
            Geen gemeenten gevonden voor "{query}".
          </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-stone-200">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Naam
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Aangemaakt op
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Aangepast op
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Aangemaakt door
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 bg-white">
              {municipalities.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium uppercase">
                    <Link
                      href={`/cms/municipalities/${m.id}`}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      {m.name}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(m.created_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(m.updated_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {m.creator.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}