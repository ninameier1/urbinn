'use client';

import Image from 'next/image';
import Link from 'next/link';

type Partner = {
  name: string;
  logo: string;
  website: string;
  description: string;
};

type PartnersOverviewProps = {
  partners: Partner[];
};

export default function PartnersOverview({ partners }: PartnersOverviewProps) {
  return (
    <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
    <div className="p-6 md:p-8 border-b border-stone-200 flex items-center justify-between gap-8">
        <div>
            <h1 className="text-3xl font-semibold text-dark mb-4">
            Ons netwerk van partners
            </h1>
            <p className="max-w-3xl text-sm text-stone-500 leading-7">
            Het onderzoek wordt uitgevoerd in samenwerking met partners uit
            onderwijs, overheid en praktijk. Iedere partner brengt eigen
            expertise, ervaring en perspectieven in die bijdragen aan het
            ontwikkelen, toetsen en toepassen van nieuwe inzichten.
            </p>
        </div>

        <div className="relative h-56 w-56 shrink-0">
            <Image
            src={"/assets/images/logo.png"}
            alt="Let's GLOW Flevoland logo"
            fill
            sizes="800px"
            className="object-contain"
            />
        </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[260px] gap-px bg-stone-200">
        {partners.map((partner, index) => {
        const large = index % 4 === 0;
        const tall = index % 4 === 1;

          return (
            <Link
              key={partner.name}
              href={`/consortium/${partner.name.toLowerCase()}`}
                className={`
                group
                bg-white p-6
                flex flex-col
                hover:bg-stone-200
                cursor-pointer
                transition-colors
                ${large ? 'md:col-span-4 md:row-span-1' : 'md:col-span-2'}
                ${tall ? 'md:row-span-2' : ''}
                `}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                    Partner
                  </span>

                  <h2 className="text-xl font-semibold text-primary mt-2 group-hover:text-secondary">
                    {partner.name}
                  </h2>
                </div>

                <div className="relative w-28 h-28 shrink-0">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-6 line-clamp-4">
                {partner.description}
              </p>

              <div className="mt-auto pt-6">
                <span className="text-xs uppercase tracking-wide text-accent">
                  Bekijk partner →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}