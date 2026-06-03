"use client";

import Link from "next/link";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/account-actions";

import DropdownMenu from "./DropdownMenu";
import Button from "../Button";

type AccountDropdownProps = {
  userLabel?: string | null;
};

export default function AccountDropdown({ userLabel }: AccountDropdownProps) {
  const pathname = usePathname();

  const links = [
    { href: "/cms/account", label: "Instellingen" },
    { href: "/cms/account/invite", label: "Uitnodigen" },
  ];

  const isActive = links.some(({ href }) =>
    pathname === href || pathname.startsWith(href + "/")
  );

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <DropdownMenu
      trigger={
        <Link
          href="/cms/account"
          className={`relative px-4 h-full flex items-center gap-1 text-sm uppercase font-medium
            ${isActive ? "text-white" : "text-text hover:text-white"}`}
        >
          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-accent transition-all duration-200
              ${isActive ? "opacity-100" : "opacity-0 scale-x-0"}`}
          />
          {userLabel}
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
      <Button variant="logout" onClick={handleLogout} loading={isPending}>
        Logout
      </Button>
    </DropdownMenu>
  );
}