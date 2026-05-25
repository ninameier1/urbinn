import Link from 'next/link';

import { getAllPublications } from '@/lib/db/publications';
import { formatDateShort } from '@/utils/date';

import TitleSection from '@/components/TitleSection';
import SortBar from '@/components/SortBar';

export const revalidate = 60;

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    query?: string;
  }>;
}) {
  const { sort = 'title_asc', query = '' } = await searchParams;

  const publications = await getAllPublications(sort, query);

  const PUBLICATION_SORT_OPTIONS = [
    { value: 'published_desc', label: 'Nieuwste publicatiedatum' },
    { value: 'published_asc', label: 'Oudste publicatiedatum' },
    { value: 'title_asc', label: 'Titel A–Z' },
    { value: 'title_desc', label: 'Titel Z–A' },
    { value: 'author_asc', label: 'Auteur A–Z' },
    { value: 'author_desc', label: 'Auteur Z–A' },
  ];

  return (
    <>
      <TitleSection />

      <SortBar
        sortOptions={PUBLICATION_SORT_OPTIONS}
        defaultSort="published_desc"
        placeholder="Zoek publicatie..."
      />

      {!publications.length ? (
        <p className="mt-6 text-sm text-red-900">
          Geen publicaties gevonden voor "{query}".
        </p>
      ) : (
        <div className="mt-8 grid gap-6">
          {publications.map((p) => (
            <Link
              key={p.id}
              href={`/onderzoek/publicaties/${p.id}`}
              className="group block"
            >
              <article className="rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:border-accent hover:shadow-md">
                
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  
                  {/* LEFT */}
                  <div className="min-w-0 flex-1">
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                      Publicatie
                    </p>

                    <h2 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                      {p.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-stone-600 line-clamp-3">
                      {p.description || 'Geen beschrijving beschikbaar.'}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <div className="rounded-full bg-secondary/40 px-3 py-1 text-xs text-stone-700">
                        {p.author || 'Onbekende auteur'}
                      </div>

                      {p.municipality && (
                        <div className="rounded-full bg-accent/40 px-3 py-1 text-xs text-stone-700">
                          {p.municipality.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex shrink-0 flex-row gap-6 lg:flex-col lg:items-end">
                    <div>
                      <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold tracking-wide uppercase rounded px-2.5 py-1 mb-5">
                        {formatDateShort(p.published_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}