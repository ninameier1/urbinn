import type { Metadata } from 'next'

import Image from 'next/image';
import Link from 'next/link';
import { getAllPartners } from '@/lib/db/partners';

import TitleSection from "@/components/Sections/TitleSection";


export const metadata: Metadata = {
  title: "Consortium",
}

export const revalidate = 60;

export default async function ConsortiumPage() {
  const partners = await getAllPartners();
  return (
    <>
      {/* <TitleSection /> */}
  <section className="bg-white border border-stone-200 rounded-lg mt-8 overflow-hidden">
    <div className="p-6 md:p-8 border-b border-stone-200 flex items-center justify-between gap-8">
        <div>
        <h1 className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Consortium 
        </h1>
            <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
            Gezond Samenleven in Flevoland
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

      <div>
        {partners.map((partner, index) => {
          const alternate = index % 2 === 1;

          return (
            <Link
              key={partner.name}
              href={`/consortium/${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`group block border-b border-stone-200 last:border-b-0 transition-colors ${
            alternate ? 'bg-white hover:bg-stone-100'  : 'bg-primary/10 hover:bg-stone-100' 
          }`}
            >
              <div
                className={`
                  grid grid-cols-1 lg:grid-cols-12 gap-8
                  p-8 lg:p-10
                  items-center
                `}
              >
                <div
                  className={`
                    ${alternate ? 'lg:order-2 lg:col-span-4' : 'lg:col-span-4'}
                  `}
                >
                  <div className="relative h-48 shrink-0 bg-stone-50 border border-stone-200 rounded-lg hover:opacity-70 transition-opacity">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        sizes="400px"
                        className="object-contain"
                      />
                    ):(
                      <div
                        title={partner.name}
                        className="text-3xl font-serif text-dark p-3 text-center flex items-center justify-center w-full h-full overflow-hidden"
                      >
                        <span className="line-clamp-2 break-words">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`
                    ${
                      alternate
                        ? 'lg:order-1 lg:col-span-8'
                        : 'lg:col-span-8'
                    }
                  `}
                >
                  <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                    Partner
                  </span>

                  <h2 className="text-2xl font-semibold text-main mt-3 mb-4 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h2>

                  <p className="text-sm leading-7 text-stone-600 max-w-2xl">
                    {partner.description}
                  </p>

                  <div className="mt-6">
                    <span className="text-xs uppercase tracking-wide text-accent group-hover:text-secondary transition-colors">
                      Bekijk partner →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
    </>
  );
}