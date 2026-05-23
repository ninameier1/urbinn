import { notFound } from 'next/navigation';
import { getPublication } from '@/lib/actions/publication-actions';

import TitleSection from '@/components/TitleSection';
import UpdatePublicationForm from '@components/CMS/UpdatePublicationForm';

export default async function EditPublicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) notFound();

  const publication = await getPublication(id);
  if (!publication) notFound();

  return (
    <>
      <TitleSection title={publication.title} />
      <UpdatePublicationForm publication={publication} />
    </>
  );
}