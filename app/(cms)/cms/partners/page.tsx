import Link from 'next/link';

import { getAllPartnersCMS } from '@/lib/db/partners';
import { formatDate } from '@/utils/date';

import TitleSection from '@/components/Sections/TitleSection';
import SortBar from '@/components/SortBar';

export const revalidate = 0;

export default async function PartnersCMSPage({ searchParams }: { searchParams: Promise<{ sort?: string; query?: string; }>; }) {
    const { sort, query = '' } = await searchParams;
  const activeSort = sort ?? (query ? 'title_asc' : 'created_desc');
  const partners = await getAllPartnersCMS(activeSort, query);

  const PARTNER_SORT_OPTIONS = [
    { value: 'updated_desc', label: 'Recentst bijgewerkt' },
    { value: 'created_desc', label: 'Nieuwste aangemaakt' },
    { value: 'created_asc',  label: 'Oudste aangemaakt' },
    { value: 'name_asc',     label: 'Naam A–Z' },
    { value: 'name_desc',    label: 'Naam Z–A' },
    { value: 'creator_asc',  label: 'Aangemaakt door A–Z' },
    { value: 'creator_desc', label: 'Aangemaakt door Z–A' },
  ];

  return (
    <>
      <TitleSection />

      <SortBar
        sortOptions={PARTNER_SORT_OPTIONS}
        defaultSort={activeSort}
        placeholder="Zoek partner..."
      />

      {!partners.length ? (
        <p className="mt-6 text-sm text-red-900">
          Geen partners gevonden voor "{query}".
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
                  Website
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
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href={`/cms/partners/${p.id}`}
                      className="text-secondary hover:text-accent transition-colors"
                    >
                      {p.name}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {p.website}
                    </a>
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(p.created_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(p.updated_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {p.creator.deletedAt
                      ? `${p.creator.username} (verwijderd)`
                      : p.creator.username}
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