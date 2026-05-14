import { auth } from "@/auth";

import TitleSection from "@/components/TitleSection";

export default async function CmsPage() {
  const session = await auth();
  const userLabel =
  session?.user?.name?.trim() ||
  session?.user?.email ||
  "gebruiker";
  
  return (
    <>
      <TitleSection />
      <p className="text-muted-foreground mt-4">Welkom {userLabel} in het CMS van Urban Innovation!</p>
    </>
  );
}