import type { Metadata } from 'next'

import TitleSection from "@/components/Sections/TitleSection";
import PartnerOverviewSection from "@/components/Sections/PartnerOverviewSection";
import { getAllPartners } from '@/lib/db/partners';


export const metadata: Metadata = {
  title: "Consortium",
}

export const revalidate = 60;

export default async function ConsortiumPage() {
  const partners = await getAllPartners();
  return (
    <>
      <TitleSection />
      <PartnerOverviewSection partners={partners} />
    </>
  );
}