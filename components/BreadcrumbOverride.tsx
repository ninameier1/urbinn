"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BreadcrumbOverride({ label }: { label: string }) {
  const pathname = usePathname();

  useEffect(() => {
    sessionStorage.setItem(`breadcrumb_${pathname}`, label);
    window.dispatchEvent(new Event("breadcrumb-updated"));
  }, [pathname, label]);

  return null;
}