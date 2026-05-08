"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const labels: Record<string, string> = {
  gemeenten: "Gemeenten",
  "over-ons": "Over ons",
  onderzoeken: "Onderzoeken",
  "urban-innovation": "Urban Innovation",
  cms: "CMS",
  municipalities: "Alle Gemeenten",
  new: "Nieuwe Gemeente",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [overrides, setOverrides] = useState<Record<string, string>>({});

useEffect(() => {
  const read = () => {
    const result: Record<string, string> = {};
    segments.forEach((segment) => {
      const stored = sessionStorage.getItem(`breadcrumb_${segment}`);
      if (stored) result[segment] = stored;
    });
    setOverrides(result);
  };

  read(); // read immediately in case it's already written, duh
  window.addEventListener("breadcrumb-updated", read);
  return () => window.removeEventListener("breadcrumb-updated", read);
}, [pathname]);

  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = overrides[segment] ?? labels[segment] ??
      segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
<nav className="w-full h-8 bg-white/30 backdrop-blur-sm border-b border-white/10">
  <div className="mx-auto h-full px-6 flex items-center gap-2 text-xs text-white">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        {crumbs.map(({ href, label, isLast }) => (
          <span key={href} className="flex items-center gap-2">
            <span>/</span>
            {isLast ? (
              <span className="text-text font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-accent transition-colors">
                {label}
              </Link>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}