"use client";

import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "@/lib/breadcrumb/breadcrumbs";

type TitleSectionProps = {
  title?: string;
};

export default function TitleSection({ title }: TitleSectionProps) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  const fallbackTitle = crumbs.at(-1)?.label ?? 'Page';

  return (
    <div className="pb-4 border-b border-stone-200 mb-4">
      <h1 className="text-3xl font-serif text-dark font-semibold tracking-tight">
        {title ?? fallbackTitle}
      </h1>
    </div>
  );
}