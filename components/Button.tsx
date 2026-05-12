"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "logout";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 transition uppercase cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white shadow-sm hover:bg-secondary hover:text-text rounded-xl",
    secondary:
      "bg-accent text-white shadow-sm hover:bg-secondary hover:text-text rounded-xl",
    logout:
      "bg-primary block px-4 py-3 text-sm text-center w-full text-white hover:bg-accent hover:text-text",
  };

  const styles = `
    ${base}
    ${variants[variant]}
    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  const content = (
    <>
      {loading && (
        <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        aria-disabled={isDisabled}
        onClick={(e) => {
          if (isDisabled) e.preventDefault();
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      disabled={isDisabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}