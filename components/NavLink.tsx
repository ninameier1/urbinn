"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-2 text-background border-b-2  ${
        isActive ? "font-semibold border-secondary" : "border-transparent hover:text-secondary hover:border-accent"
      }`}
    >
      {children}
    </Link>
  );
}