import Link from 'next/link';

import { getAllMunicipalities } from '@db/municipalities';
import { formatDate } from '@/utils/date';

import TitleSection from "@/components/TitleSection";

export default async function MunicipalitiesPage() {
  const municipalities = await getAllMunicipalities();

  if (!municipalities.length) return <h2>Geen gemeenten gevonden</h2>;

  return (
    <>
      <TitleSection />
      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-stone-200">
              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">Naam</th>
              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">Aangemaakt op</th>
              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">Aangepast op</th>
              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">Aangemaakt door</th>
              <th className="px-4 py-3 text-left text-xs font-medium tracking-widest uppercase text-accent">Acties</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 bg-white">
            {municipalities.map((m) => (
              <tr key={m.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 font-medium uppercase text-primary">{m.name}</td>
                <td className="px-4 py-3 text-stone-500">{formatDate(m.created_at)}</td>
                <td className="px-4 py-3 text-stone-500">{formatDate(m.updated_at)}</td>
                <td className="px-4 py-3 text-stone-500">{m.creator.username}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/cms/municipalities/${m.id}`}
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