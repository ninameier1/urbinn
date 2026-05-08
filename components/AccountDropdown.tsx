"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import Button from "./Button";
import { logout } from "@/lib/actions/account-actions";

type AccountDropdownProps = {
  username: string;
};

export default function AccountDropdown({ username }: AccountDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isActive =
    pathname === "/cms/account" ||
    pathname.startsWith("/cms/account/");

  return (
    <div className="relative flex h-full items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}>
      
        <button type="button" 
            className={`relative px-4 h-full flex items-center text-sm uppercase font-medium
            ${isActive 
              ? "text-white" 
              : "text-text hover:text-white"}
        `}>
            <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-accent transition-all duration-200
              ${isActive 
                ? "opacity-100" 
                : "opacity-0 scale-x-0 hover:opacity-100 hover:scale-x-100"}
            `}/>
                {username}
        </button>

      <div className={`absolute top-full right-0 z-50 w-56 overflow-hidden border border-white/10 bg-secondary shadow-xl 
          ${isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"}
      `}>

        <Link href="/cms/account" className="block px-4 py-3 text-sm text-center text-white hover:text-text hover:bg-accent">
          Instellingen
        </Link>

        <Link href="/cms/account/invite" className="block px-4 py-3 text-sm text-center text-white hover:text-text hover:bg-accent">
          Uitnodigen
        </Link>


        <Button variant="logout" action={logout}>
            Logout
        </Button>

      </div>
    </div>
  );
}