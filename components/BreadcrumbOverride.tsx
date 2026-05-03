"use client";
import { useEffect } from "react";

export default function BreadcrumbOverride({ segment, label }: {
  segment: string;
  label: string;
}) {
  useEffect(() => {
    sessionStorage.setItem(`breadcrumb_${segment}`, label);
    // breadcrumb is dumb and needs to know it has been overwritten
    window.dispatchEvent(new Event("breadcrumb-updated"));
  }, [segment, label]);

  return null;
}