import { notFound } from 'next/navigation';
import { getPublication } from '@/lib/actions/publication-actions';
import { getAllMunicipalities } from "@/lib/db/municipalities";

import TitleSection from '@/components/TitleSection';
import UpdatePublicationForm from '@components/CMS/UpdatePublicationForm';
import BreadcrumbOverride from '@/components/BreadcrumbOverride';

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) notFound();

  const publication = await getPublication(id);
  if (!publication) notFound();

  const municipalities = await getAllMunicipalities("name_asc", "");

  return (
    <>
      <BreadcrumbOverride label={publication.title} />
      <TitleSection title={publication.title} />
      <UpdatePublicationForm publication={publication} municipalities={municipalities} />
    </>
  );
}