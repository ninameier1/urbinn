import TitleSection from "@/components/Sections/TitleSection";

export const revalidate = 60;

export default async function ThemesPage() {
  return (
    <>
      <TitleSection />
      <p className="text-muted-foreground mt-4">Binnenkort beschikbaar.</p>
    </>
  );
}