"use client";

import { useState, ReactNode } from "react";

type DropdownMenuProps = { trigger: ReactNode; children: ReactNode; width?: string; align?: "left" | "right"; };

export default function DropdownMenu({ trigger, children, width = "w-56", align = "right", }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative flex h-full items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}

      <div
        className={`
          absolute top-full z-50 overflow-hidden
          border border-white/10 bg-secondary shadow-xl
          transition-all duration-200
          ${width}
          ${align === "right" ? "right-0" : "left-0"}
          ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}