import Link from 'next/link';

import { getAllPublications } from '@/lib/db/publications';
import { formatDate } from '@/utils/date';

import Button from '@/components/Button';
import TitleSection from "@/components/TitleSection";

export const revalidate = 0;

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    query?: string;
  }>;
}) {
  const params = await searchParams;

  const sort = params?.sort ?? 'title';
  const query = params?.query ?? '';

  const publications = await getAllPublications(sort, query);

function SortHeader({
  label,
  column,
  currentSort,
}: {
  label: string;
  column: string;
  currentSort: string;
}) {
  const isAsc = currentSort === `${column}_asc`;
  const isDesc = currentSort === `${column}_desc`;

  const nextSort = isAsc
    ? `${column}_desc`
    : `${column}_asc`;

  return (
    <Link
      href={`?sort=${nextSort}`}
      className={`inline-flex items-center gap-1 text-xs font-medium tracking-widest uppercase cursor-pointer transition-colors ${
        isAsc || isDesc
          ? 'text-primary'
          : 'text-accent hover:text-primary'
      }`}
    >
      {label}

      <span className="text-[10px] opacity-60">
        {isAsc ? '↑' : isDesc ? '↓' : '↕'}
      </span>
    </Link>
  );
}

  if (!publications.length) return <h2>Geen publicaties gevonden</h2>;

  return (
    <>
      <TitleSection />

      <form className="mb-4 flex items-center gap-2">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Zoek publicatie..."
          className="border rounded px-3 py-2"
        />

        <input type="hidden" name="sort" value={sort} />

        <Button type="submit" variant="small" >
          Zoeken
        </Button>

        {query && (
          <Link
            href={`?sort=${sort}`}
            className="px-4 py-2 rounded border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
          >
            Wissen
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-stone-200">
              
              <th className="px-4 py-3 text-left">
                <SortHeader
                  label="Titel"
                  column="title"
                  currentSort={sort}
                />
              </th>

              <th className="px-4 py-3 text-left">
                <SortHeader
                  label="Aangemaakt op"
                  column="created"
                  currentSort={sort}
                />
              </th>

              <th className="px-4 py-3 text-left">
                <SortHeader
                  label="Aangepast op"
                  column="updated"
                  currentSort={sort}
                />
              </th>

              <th className="px-4 py-3 text-left">
                <SortHeader
                  label="Aangemaakt door"
                  column="creator"
                  currentSort={sort}
                />
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">
                Acties
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 bg-white">
            {publications.map((m) => (
              <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 font-medium uppercase text-primary">
                  {m.title}
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
                <td className="px-4 py-3">
                  <Link
                    href={`/cms/publications/${m.id}`}
                    className="inline-block rounded px-3 py-1.5 text-xs font-medium bg-primary text-white hover:bg-accent transition-colors"
                  >
                    Bewerken
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}