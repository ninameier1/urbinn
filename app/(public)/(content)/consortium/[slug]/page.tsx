import Image from 'next/image';
import Link from 'next/link';

import { notFound } from "next/navigation";
import { getPartner } from "@/lib/db/partners";

import TitleSection from "@/components/Sections/TitleSection";

export const revalidate = 60;

type PartnerProps = {
  params: Promise<{ slug: string }>;
};

export default async function PartnerPage({ params }: PartnerProps) {
  const { slug } = await params;
  
const partner = await getPartner(slug);
if (!partner) notFound();

const images = [
  { src: partner.image1?.trim() || '/assets/images/lectoraat2.jpg' },
  { src: partner.image2?.trim() || '/assets/images/lectoraat.jpg' },
  { src: partner.image3?.trim() || '/assets/images/lectoraat3.jpg' },
];

  return (
    <>
      {/* <TitleSection /> */}
    <section className="bg-white border border-stone-200 mt-8 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-stone-200">
        <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Partner
        </span>
        <div className="flex items-start justify-between gap-6 flex-col sm:flex-row">
          <div>
            <h2 className="text-3xl font-serif font-semibold text-dark mb-2">
              {partner.name}
            </h2>
            <p className="text-sm text-stone-500 max-w-2xl">
              {partner.description}
            </p>
          </div>
          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-28 h-28 shrink-0 bg-stone-50 border border-stone-200 rounded-lg overflow-hidden hover:opacity-70 transition-opacity"
          >
            {partner.logo && (
              <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              fill
              sizes="112px"
              className="object-contain p-2"
            />)}
          </Link>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-stone-200">
          {images.map((image, index) => (
            <div key={index} className="relative h-[250px] bg-stone-100">
              <Image
                src={image.src}
                alt={`${partner.name} image ${index + 1}`}
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
          <p className="text-sm leading-7 text-stone-600">{partner.partnerInfo}</p>
        </div>
        <div>
          <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
            Onderzoeksrol
          </span>
          <p className="text-sm leading-7 text-stone-600">{partner.researchRole}</p>
        </div>
      </div>
    </section>
    </>
  );
}