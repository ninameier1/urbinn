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

export default function AccountDropdown({
  userLabel,
}: AccountDropdownProps) {
  const pathname = usePathname();

  const isActive =
    pathname === "/cms/account" ||
    pathname.startsWith("/cms/account/");

  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <DropdownMenu
      trigger={
        <button
          type="button"
          className={`
            relative flex h-full items-center px-4
            text-sm font-medium uppercase cursor-pointer
            ${isActive ? "text-white" : "text-text hover:text-white"}
          `}
        >
          <span
            className={`
              absolute bottom-0 left-0 h-[2px] w-full bg-accent
              transition-all duration-200
              ${
                isActive
                  ? "opacity-100"
                  : "opacity-0 scale-x-0 hover:opacity-100 hover:scale-x-100"
              }
            `}
          />

          {userLabel}
        </button>
      }
    >
      <Link
        href="/cms/account"
        className="block px-4 py-3 text-sm text-center text-white hover:bg-accent hover:text-text"
      >
        Instellingen
      </Link>

      <Link
        href="/cms/account/invite"
        className="block px-4 py-3 text-sm text-center text-white hover:bg-accent hover:text-text"
      >
        Uitnodigen
      </Link>

      <Button
        variant="logout"
        onClick={handleLogout}
        loading={isPending}
      >
        Logout
      </Button>
    </DropdownMenu>
  );
}