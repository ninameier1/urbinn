import { auth } from "@/auth";

export default async function CmsPage() {
  const session = await auth();
  return (
    <main className="container mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold">CMS Dashboard</h1>
      <p className="text-muted-foreground mt-4">Welkom {session?.user?.name ?? ""} in het Content Management System van Urban Innovation!</p>
    </main>
  );
}