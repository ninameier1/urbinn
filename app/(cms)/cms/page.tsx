import { auth } from "@/auth";

import TitleSection from "@/components/TitleSection";

export default async function CmsPage() {
  const session = await auth();
  const userLabel =
  session?.user?.name?.trim() ||
  session?.user?.email ||
  "gebruiker";
  
  return (
    <div className="flex flex-col gap-6">
      <TitleSection />
      <p className="text-muted-foreground mt-4">Welkom {userLabel} in het CMS van Urban Innovation!</p>

      <section className="bg-white border border-stone-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">
          Ik wil:
        </h2>
      <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2 text-center text-lg">
        <a href="/cms/municipalities" className="p-6 border border-stone-300 rounded-lg bg-primary/50 hover:bg-accent hover:text-white">
          Gemeenten beheren
        </a>
        <a href="/cms/municipalities/new" className="p-6 border border-stone-300 rounded-lg bg-primary/50   hover:bg-accent hover:text-white">
          Nieuwe gemeente
        </a>
        <a href="/cms/account" className="p-6 border border-stone-300 rounded-lg bg-primary/50  hover:bg-accent hover:text-white">
          Mijn account beheren
        </a>
        <a href="/cms/account/invite" className="p-6 border border-stone-300 rounded-lg bg-primary/50  hover:bg-accent hover:text-white">
          Admin uitnodigen
        </a>
      </div>
      </section>

      <section className="bg-white border border-stone-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">
          Recente activiteit
        </h2>
        <p className="text-muted-foreground mt-2">
          Nog geen activiteit om te tonen.
        </p>
      </section>
    </div>
  );
}