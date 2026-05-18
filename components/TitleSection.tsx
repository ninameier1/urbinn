"use client";

import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/lib/breadcrumb/breadcrumbs";

export default function TitleSection() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  const title = crumbs.at(-1)?.label ?? "Page";

  return (
    <div className="pb-4 border-b border-stone-200 mb-4">
      <h1 className="text-3xl font-serif text-dark font-semibold tracking-tight">
        {title}
      </h1>
    </div>
  );
}