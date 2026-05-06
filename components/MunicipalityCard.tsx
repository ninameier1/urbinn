'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

type __MunicipalityCardProps__ = {
  name: string;
  image: string;
  href: string;
};

export default function MunicipalityCard({ name, image, href }: __MunicipalityCardProps__) {
  const [src, setSrc] = useState(image || "/assets/images/placeholder.jpg");

  return (
    <Link href={href} className="block rounded-xl bg-main overflow-hidden shadow-md hover:bg-accent hover:shadow-lg transition-all transform hover:scale-105 transition-all duration-300">
        <div className="relative w-full h-56">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            onError={() => setSrc("/assets/images/placeholder.jpg")}
          />
       
       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 backdrop-blur-sm px-4 py-3">
            <h2 className="text-2xl text-center text-white/80 hover:text-white">
            {name}
            </h2>
          </div>
        </div>
      </Link>

  );
}