import TitleSection from "@/components/TitleSection";

export const revalidate = 60;

export default async function ResearchPage() {
  return (
    <>
      <TitleSection />
      <p className="text-muted-foreground mt-4">Binnenkort beschikbaar.</p>
    </>
  );
}