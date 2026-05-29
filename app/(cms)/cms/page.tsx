import { auth } from "@/auth";
import { getNewestMunicipalities } from "@db/municipalities";
import { getNewestPublications } from "@/lib/db/publications";
import TitleSection from "@/components/Sections/TitleSection";
import { formatDate } from "@/utils/date";
import Link from "next/link";

import { 
  Building2,
  Plus,
  User,
  UserPlus, 
  FileText
 } from "lucide-react";

 export const revalidate = 0;

export default async function CmsPage() {
  const session = await auth();
  const userLabel =
    session?.user?.name?.trim() ||
    session?.user?.email ||
    "gebruiker";

  const municipalities = await getNewestMunicipalities(10);
  const publications = await getNewestPublications(10);

  const baseItems = [
    ...municipalities.map((m) => ({
      id: `m-${m.id}`,
      title: m.name,
      href: `/cms/municipalities/${m.id}`,
      type: "Gemeente",
      created_at: m.created_at,
      updated_at: m.updated_at,
      icon: Building2,
    })),
    ...publications.map((p) => ({
      id: `p-${p.id}`,
      title: p.title,
      href: `/cms/publications/${p.id}`,
      type: "Publicatie",
      created_at: p.created_at,
      updated_at: p.updated_at,
      icon: FileText,
    })),
  ];

  const recentCreated = [...baseItems]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const recentUpdated = [...baseItems]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <TitleSection />

      <p className="text-muted-foreground">
        Welkom {userLabel} in het CMS van Urban Innovation!
      </p>

      {/* BUTTONS FOR THE LAZY */}
      <section className="bg-white border border-stone-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">Ik wil:</h2>

        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-2">
          {/* MUNICIPALITITY */}
          <a
            href="/cms/municipalities"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <Building2 className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Gemeenten beheren</p>
              <p className="text-xs text-stone-500">Bekijk en bewerk bestaande gemeenten</p>
            </div>
          </a>

          <a
            href="/cms/municipalities/new"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <Plus className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Nieuwe gemeente</p>
              <p className="text-xs text-stone-500">Maak een nieuwe gemeente aan</p>
            </div>
          </a>

        {/* PUBLICATIIO */}
          <a
            href="/cms/publications"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <FileText className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Publicaties beheren</p>
              <p className="text-xs text-stone-500">Bekijk en bewerk bestaande publicaties</p>
            </div>
          </a>

          <a
            href="/cms/publications/new"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <Plus className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Nieuwe publicatie</p>
              <p className="text-xs text-stone-500">Maak een nieuwe publicatie aan</p>
            </div>
          </a>

              {/* ACCOUNT */}
          <a
            href="/cms/account"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <User className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Mijn account</p>
              <p className="text-xs text-stone-500">Beheer je profiel en instellingen</p>
            </div>
          </a>

          <a
            href="/cms/account/invite"
            className="group flex items-center gap-4 p-5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-sm transition"
          >
            <div className="p-3 rounded-lg bg-stone-100 group-hover:bg-primary/10 transition">
              <UserPlus className="w-5 h-5 text-stone-600 group-hover:text-primary" />
            </div>

            <div>
              <p className="font-medium text-stone-900">Admin uitnodigen</p>
              <p className="text-xs text-stone-500">Geef iemand toegang tot het CMS</p>
            </div>
          </a>
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECENTLY CREATED */}
          <div>
            <h3 className="text-sm font-semibold text-stone-600 mb-3">
              Recent Aangemaakt
            </h3>

            <div className="flex flex-col divide-y divide-stone-100">
              {recentCreated.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                    <div className="flex gap-2">
                      <Icon className="w-4 h-4 text-stone-500 mt-1" />

                      <div>
                        <Link href={item.href} className="text-sm font-medium">
                          {item.title}
                        </Link>
                        <p className="text-xs text-stone-400">
                          {item.type} · {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECENTLY UPDATED */}
          <div>
            <h3 className="text-sm font-semibold text-stone-600 mb-3">
              Recent Aangepast
            </h3>

            <div className="flex flex-col divide-y divide-stone-100">
              {recentUpdated.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                    <div className="flex gap-2">
                      <Icon className="w-4 h-4 text-stone-500 mt-1" />

                      <div>
                        <Link href={item.href} className="text-sm font-medium">
                          {item.title}
                        </Link>
                        <p className="text-xs text-stone-400">
                          {item.type} · {formatDate(item.updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}