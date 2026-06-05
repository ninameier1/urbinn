"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: 'primary' | 'secondary' | 'small' | 'cancel' | 'delete' | 'accent' | 'logout';
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
  "inline-flex items-center justify-center gap-2  transition uppercase cursor-pointer";

  const variants = {
    accent:
      "bg-accent text-dark shadow-sm hover:bg-dark hover:text-white rounded-xl px-6 py-3",
    primary:
      "bg-primary text-dark shadow-sm hover:bg-main hover:text-white rounded-xl px-6 py-3",
    secondary:
      "bg-secondary text-white shadow-sm hover:bg-primary hover:text-dark rounded-xl px-6 py-3",
    small: 
      "bg-main text-white text-xs shadow-sm hover:bg-accent hover:text-dark rounded-lg px-4 py-2",
    cancel: 
      "bg-main/75 text-white text-xs shadow-sm hover:bg-accent hover:text-white rounded-lg px-4 py-2",
    delete: 
      "bg-red-800 text-white text-xs shadow-sm hover:bg-accent hover:text-white rounded-lg px-3 py-1.5",
    logout:
      "bg-main block text-sm text-center w-full text-white hover:bg-accent hover:text-text px-4 py-2",
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