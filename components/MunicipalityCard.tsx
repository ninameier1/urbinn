'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type __MunicipalityCardProps__ = {
  name: string;
  image: string;
  href: string;
};

export default function MunicipalityCard({ name, image, href }: __MunicipalityCardProps__) {
  const [src, setSrc] = useState(image || "/assets/images/placeholder.jpg");

  return (
    <Link href={href} className="block rounded-xl bg-primary overflow-hidden text-text shadow hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48">
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          onError={() => setSrc("/assets/images/placeholder.jpg")}
        />
      </div>
      <div className="p-4 bg-primary">
        <h2 className="text-xl font-bold text-text">{name}</h2>
      </div>
    </Link>
  );
}