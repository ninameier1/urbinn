"use client";

import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition";

  const variants = {
    primary: "bg-primary text-secondary shadow-sm hover:bg-secondary hover:text-accent",
    secondary: "bg-secondary text-primary shadow-sm hover:bg-accent hover:text-secondary",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const styles = `
    ${base}
    ${variants[variant]}
    ${isDisabled ? disabledStyles : ""}
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
        href={isDisabled ? "#" : href}
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
    <button type={type} className={styles} disabled={isDisabled}>
      {content}
    </button>
  );
}