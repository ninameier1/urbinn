export const dynamic = 'force-dynamic';
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

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Naam</th>
              <th className="border px-4 py-2 text-left">Aangemaakt op</th>
              <th className="border px-4 py-2 text-left">Aangepast op</th>
              <th className="border px-4 py-2 text-left">Aangemaakt door</th>
              <th className="border px-4 py-2 text-left">Acties</th>
            </tr>
          </thead>

          <tbody>
            {municipalities.map((m) => (
              <tr key={m.id}>
                <td className="border px-4 py-2">{m.name}</td>
                <td className="border px-4 py-2">{formatDate(m.created_at)}</td>
                <td className="border px-4 py-2">{formatDate(m.updated_at)}</td>
                <td className="border px-4 py-2">{m.creator.username}</td>
                <td className="border px-4 py-2">
                  <Link
                    href={`/cms/municipalities/${m.id}`}
                    className="inline-block rounded px-4 py-2 text-sm bg-primary text-white hover:bg-accent transition-colors">
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