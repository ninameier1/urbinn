"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
  href === "/cms"
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`px-4 h-full flex items-center text-sm uppercase font-medium transition-all duration-50
        ${isActive
          ? "bg-white/20 text-text"
          : "text-white hover:text-text hover:bg-white/20"
        }`}
    >
      {children}
    </Link>
  );
}