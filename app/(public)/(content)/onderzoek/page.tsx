import type { Metadata } from 'next'

import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLOW",
}

export const revalidate = 60;

export default async function GLOWPage() {
  return (
    <>
      <section className="bg-white border border-stone-200 rounded-lg mt-8 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              GLOW
            </span>
            <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
              Gezonde Leefomgeving op Wijkniveau
            </h1>

            <p className="max-w-3xl text-sm text-stone-500 leading-7">
              Hier komt een korte introductie over hoe het onderzoek is
              ontstaan, welke vraagstukken eraan ten grondslag liggen en
              waarom het relevant is voor gemeenten en partners binnen
              het netwerk.
            </p>
          </div>

          <div className="relative h-56 w-56 shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Let's GLOW Flevoland logo"
              fill
              sizes="300px"
              className="object-contain"
            />
          </div>
        </div>

         {/* BBLOOCK 1 */}
        <div className="border-b border-stone-200 bg-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 items-center">
            <div className="lg:col-span-4">
              <div className="relative h-64 rounded-lg overflow-hidden border border-stone-200">
                <Image
                  src="/assets/images/origin-1.jpg"
                  alt="Oorsprong van het onderzoek"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                Achtergrond
              </span>

              <h2 className="text-2xl font-semibold text-primary mt-3 mb-4">
                Hoe het onderzoek begon
              </h2>

              <p className="text-sm leading-7 text-stone-600">
                Beschrijf hier de aanleiding van het onderzoek. Welke
                ontwikkelingen, uitdagingen of kansen vormden de basis
                voor het project? Wat maakte dat deze onderzoeksvraag
                relevant werd?
              </p>
            </div>
          </div>
        </div>

        {/* BLOCK 2 */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-10 items-center">
            <div className="lg:order-2 lg:col-span-4">
              <div className="relative h-64 rounded-lg overflow-hidden border border-stone-200">
                <Image
                  src="/assets/images/origin-2.jpg"
                  alt="Onderzoeksontwikkeling"
                  fill
                  sizes="500px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:order-1 lg:col-span-8">
              <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                Ontwikkeling
              </span>

              <h2 className="text-2xl font-semibold text-primary mt-3 mb-4">
                Van idee naar onderzoeksprogramma
              </h2>

              <p className="text-sm leading-7 text-stone-600">
                Leg hier uit hoe het oorspronkelijke idee verder werd
                uitgewerkt. Welke organisaties waren betrokken? Welke
                stappen hebben geleid tot het huidige onderzoek?
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}