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
    <div className="block rounded-xl bg-main overflow-hidden shadow bg-secondary text-primary hover:bg-accent hover:shadow-lg hover:text-secondary transition-shadow">
      <Link href={href}>
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
        <div className="p-4">
          <h2 className="text-2xl text-center">{name}</h2>
        </div>
      </Link>
    </div>
  );
}