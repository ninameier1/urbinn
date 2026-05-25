import Link from 'next/link';

import { getAllPublications } from '@/lib/db/publications';
import { formatDate, formatDateShort } from '@/utils/date';

import TitleSection from '@/components/TitleSection';
import SortBar from '@/components/SortBar';

export const revalidate = 60;

export default async function PublicationsPage({ searchParams }: {
  searchParams: Promise<{
    sort?: string;
    query?: string;
  }>;
}) {
  const { sort = 'title_asc', query = '' } = await searchParams;

  const publications = await getAllPublications(sort, query);
  
  const PUBLICATION_SORT_OPTIONS = [
    { value: 'title_asc',    label: 'Titel A–Z' },
    { value: 'title_desc',   label: 'Titel Z–A' },
    { value: 'created_desc', label: 'Nieuwste aangemaakt' },
    { value: 'created_asc',  label: 'Oudste aangemaakt' },
    { value: 'published_desc', label: 'Nieuwste publicatiedatum' },
    { value: 'published_asc',  label: 'Oudste publicatiedatum' },
    { value: 'updated_desc', label: 'Recentst bijgewerkt' },
  ];

  return (
    <>
      <TitleSection />
      <SortBar sortOptions={PUBLICATION_SORT_OPTIONS} defaultSort="title_asc" placeholder="Zoek publicatie..." />

      {!publications.length ? (
          <p className="mt-6 text-sm text-red-900">
            Geen publicaties gevonden voor "{query}".
          </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-stone-200">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Titel
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Auteur(s)
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Publicatiedatum
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Aangemaakt op
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                  Aangepast op
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 bg-white">
              {publications.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href={`/onderzoek/publicaties/${p.id}`}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      {p.title}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {p.author}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDateShort(p.published_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(p.created_at)}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {formatDate(p.updated_at)}
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