"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${isActive
          ? "bg-white/20 text-secondary"
          : "text-white hover:text-secondary hover:bg-white/20"
        }`}
    >
      {children}
    </Link>
  );
}