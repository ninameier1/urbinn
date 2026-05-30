import { notFound } from 'next/navigation';
import { getPublication } from '@/lib/db/publications';
import { getAllMunicipalities } from "@/lib/db/municipalities";

import TitleSection from '@/components/Sections/TitleSection';
import PublicationCard from '@/components/PublicationCard';

export default async function PublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) notFound();

  const publication = await getPublication(id);
  if (!publication) notFound();

  const municipalities = await getAllMunicipalities("name_asc", "");

  return (
    <>
      <TitleSection title={publication.title} />
            <PublicationCard
            publication={{
            title: publication.title,
            author: publication.author,
            description: publication.description,
            url: publication.url,
            published_at: publication.published_at,
            municipality: publication.municipality?.name,
            }}
      />
    </>
  );
}