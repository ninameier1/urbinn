"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBreadcrumbs } from "@/lib/breadcrumb/breadcrumbs";

export default function Breadcrumb() {
  const pathname = usePathname();
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const read = () => {
      const result: Record<string, string> = {};
      segments.forEach((_, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const stored = sessionStorage.getItem(`breadcrumb_${href}`);
        if (stored) result[href] = stored;
      });
      setOverrides(result);
    };
    read(); // read immediately in case it's already written, duh
    window.addEventListener("breadcrumb-updated", read);
    return () => window.removeEventListener("breadcrumb-updated", read);
  }, [pathname]);

  const crumbs = getBreadcrumbs(pathname, overrides);
  if (crumbs.length === 0) return null;

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