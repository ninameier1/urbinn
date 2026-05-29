import TitleSection from "@/components/Sections/TitleSection";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Onderzoek",
}

export const revalidate = 60;

export default async function ResearchPage() {
  return (
    <>
      <TitleSection />
      <p className="text-muted-foreground mt-4">Binnenkort beschikbaar.</p>
    </>
  );
}