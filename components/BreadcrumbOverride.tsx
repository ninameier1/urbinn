"use client";

import { useEffect } from "react";

export default function BreadcrumbOverride({ segment, label }: { 
  segment: string; 
  label: string 
}) {
  useEffect(() => {
    sessionStorage.setItem(`breadcrumb_${segment}`, label);
  }, [segment, label]);
  return null;
}