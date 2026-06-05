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
    href === "/cms" || href === "/cms/municipalities"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`relative px-4 h-full flex items-center text-sm uppercase font-medium
      ${isActive ? "text-dark" : "text-white hover:text-dark"}
    `}>
          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-accent transition-all duration-200
              ${isActive ? "opacity-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}
            `}
          />
      {children}
    </Link>
  );
}