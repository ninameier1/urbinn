import { auth } from "@/auth";

export default async function CmsPage() {
  const session = await auth();
  const userLabel =
  session?.user?.name?.trim() ||
  session?.user?.email ||
  "gebruiker";
  
  return (
    <div className="py-12 mb-12 relative w-full min-h-[90vh]">
      <div className="container mx-auto px-4">
        <div className="pb-6 border-b border-stone-200">
          <h1 className="text-3xl font-semibold tracking-tight">
            Content Management System
          </h1>
        </div>
        <p className="text-muted-foreground mt-4">Welkom {userLabel} in het CMS van Urban Innovation!</p>
      </div>
    </div>
  );
}