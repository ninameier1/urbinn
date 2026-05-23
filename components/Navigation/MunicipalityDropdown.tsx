"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DropdownMenu from "@/components/Navigation/DropdownMenu";

const links = [
  { href: "/cms/municipalities", label: "Alle gemeenten" },
  { href: "/cms/municipalities/new", label: "Nieuwe gemeente" },
];

export default function MunicipalityDropdown() {
  const pathname = usePathname();
  const isActive = links.some(({ href }) =>
    href === "/cms/municipalities"
      ? pathname === href || pathname.startsWith(href + "/")
      : pathname === href
  );

  return (
    <DropdownMenu
      align="left"
      trigger={
        <Link
          href="/cms/municipalities"
          className={`relative px-4 h-full flex items-center gap-1 text-sm uppercase font-medium
            ${isActive ? "text-white" : "text-text hover:text-white"}`}
        >
          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-accent transition-all duration-200
              ${isActive ? "opacity-100" : "opacity-0 scale-x-0"}`}
          />
          Gemeenten
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      }
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="block px-4 py-3 text-sm text-center text-white hover:bg-accent hover:text-text"
        >
          {label}
        </Link>
      ))}
    </DropdownMenu>
  );
}