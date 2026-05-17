import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

import TitleSection from '@/components/TitleSection';
import MunicipalityForm from '@components/CMS/MunicipalityForm';

export default async function EditMunicipalityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) notFound();

  const municipality = await prisma.municipality.findUnique({
    where: { id },
    include: {
      core_elements: {
        include: {
          mechanisms: true,
          factors: true,
        },
      },
    },
  });

  if (!municipality) notFound();

  return (
    <>
      <TitleSection />
      <MunicipalityForm municipality={municipality} />
    </>
  );
}