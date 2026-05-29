import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import TitleSection from "@/components/Sections/TitleSection";
import BreadcrumbOverride from "@/components/BreadcrumbOverride";
import UpdatePartnerForm from "@/components/CMS/UpdatePartnerForm";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }>;}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) notFound();
const partner = await prisma.partner.findUnique({
  where: { id },
  include: {
    creator: true,
  },
});
  if (!partner) notFound();

  return (
    <>
      <BreadcrumbOverride label={partner.name} />
      <TitleSection title={partner.name} />
      <UpdatePartnerForm partner={partner} />
    </>
  );
}