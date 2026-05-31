'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

type MunicipalityCardProps = {
  name: string;
  image?: string | null;
  href: string;
  description?: string | null;
  tags?: string[];
  featured?: boolean;
};

export default function MunicipalityCard({ name, image, href, description, tags = [], featured = false, }: MunicipalityCardProps) {
  const [src, setSrc] = useState(image || "/assets/images/placeholder.jpg");

  return (
    <Link href={href} className="group block max-w-7xl bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-accent transition-colors">
      <div className={`relative flex items-end ${featured ? "h-56 p-5" : "h-64 p-5"}`}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover group-hover:opacity-80 transition-opacity"
          unoptimized
          onError={() => setSrc("/assets/images/placeholder.jpg")}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative z-10 flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold bg-accent/60 text-white rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={featured ? "p-5" : "p-4"}>
        <div className="relative">
          <p className={`font-serif text-dark group-hover:text-primary font-bold mb-4 ${featured ? "text-3xl" : "text-2xl"} `}>
            {name}
          </p>
        </div>

        {description && (
          <p className="text-xs text-text/50 leading-relaxed mb-4">
            {description}
          </p>
        )}

        <p className="text-xs uppercase tracking-wide text-accent group-hover:text-secondary transition-colors">
          Bekijk dashboard →
        </p>
      </div>
    </Link>
  );
}