import Link from 'next/link';

type TagProps = {
  label: string;
  href?: string;
};

export default function Tag({ label, href }: TagProps) {
  const className = "inline-flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-accent border border-secondary rounded-full px-4 py-1 mb-4 transition-colors duration-200 hover:shadow-lg";

  if (href) {
    return <Link href={href} className={className}>{label}</Link>;
  }

  return <span className={className}>{label}</span>;
}