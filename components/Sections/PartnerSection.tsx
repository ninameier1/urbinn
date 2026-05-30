'use client';

import Image from 'next/image';
import Link from 'next/link';

type PartnerProps = {
  name: string;
  logo: string;
  website: string;
  description: string;
  partnerInfo: string;
  researchRole: string;
  images?: {
    src: string;
    alt?: string;
  }[];
};

export default function PartnerSection({ name, logo, website, images = [], description, partnerInfo, researchRole }: PartnerProps) {
  return (
    <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-stone-200">
        <h1 className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Partner
        </h1>
        <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">
              {name}
            </h2>
            <p className="text-sm text-stone-500 max-w-2xl">
              {description}
            </p>
          </div>
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-28 h-28 shrink-0 bg-stone-50 border border-stone-200 rounded-lg overflow-hidden hover:opacity-70 transition-opacity"
          >
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain p-2"
            />
          </Link>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-stone-200">
          {images.map((image, index) => (
            <div key={index} className="relative h-[250px] bg-stone-100">
              <Image
                src={image.src}
                alt={image.alt || `${name} image ${index + 1}`}
                fill
                sizes="448px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
            Over deze partner
          </span>
          <p className="text-sm leading-7 text-stone-600">{partnerInfo}</p>
        </div>
        <div>
          <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
            Onderzoeksrol
          </span>
          <p className="text-sm leading-7 text-stone-600">{researchRole}</p>
        </div>
      </div>
    </section>
  );
}