import Link from 'next/link';

import { getAllPublications } from '@/lib/db/publications';
import { formatDateShort } from '@/utils/date';

import TitleSection from '@/components/Sections/TitleSection';
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


      {!publications.length ? (
  <p className="mt-6 text-sm text-red-900">
    Geen publicaties gevonden voor "{query}".
  </p>
) : (
  <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
    <div className="p-6 md:p-8 border-b border-stone-200">
            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Publicaties
            </span>
                  <div>
                    <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
                      Alle publicaties van het onderzoek
                    </h1>
        
                    <p className="max-w-7xl text-sm text-stone-500 leading-7">
                      Hier komt een korte introductie over hoe het onderzoek is
                      ontstaan, welke vraagstukken eraan ten grondslag liggen en
                      waarom het relevant is voor gemeenten en partners binnen
                      het netwerk.
                    </p>
                  </div>
                                            <SortBar
                            sortOptions={PUBLICATION_SORT_OPTIONS}
                            defaultSort="published_desc"
                            placeholder="Zoek publicatie..."
                          />
                </div>
    {publications.map((p, index) => {
      const alternate = index % 2 === 1;
      return (
        <Link
          key={p.id}
          href={`/onderzoek/publicaties/${p.id}`}
          className={`group block border-b border-stone-200 last:border-b-0 transition-colors ${
            alternate ? 'bg-white hover:bg-stone-100' :  'bg-primary/10 hover:bg-stone-100'
          }`}
        >
          <article className="p-8 lg:p-10">
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
                                  <div className="mt-auto pt-6">
                <span className="text-xs uppercase tracking-wide text-accent group-hover:text-secondary">
                  Bekijk publicatie →
                </span>
              </div>
                  </div>
                </div>
          </article>
        </Link>
      );
    })}
  </section>
)}
    </>
  );
}