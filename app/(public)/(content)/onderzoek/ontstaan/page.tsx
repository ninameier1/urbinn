import Image from "next/image";
import Link from "next/link";

import { getMunicipalityByName } from "@db/municipalities";

import MunicipalityCard from "@/components/MunicipalityCard";
import Button from "@/components/Button";

export const revalidate = 60;

export default async function OriginPage() {
  const municipality = await getMunicipalityByName("Zwolle");
  if (!municipality) return null;

  return (
    <>
      <section className="bg-white border border-stone-200 rounded-lg mt-8 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Ontstaan
            </span>
            <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
              De oorsprong van het onderzoek
            </h1>

            <p className="max-w-3xl text-sm text-stone-500 leading-7">
              De roots van GLOW-XL liggen in Zwolle. Sinds 2010 werkt de gemeente Zwolle samen met lokale en landelijke partners aan 'Zwolle Gezonde Stad': een integrale wijkgerichte aanpak gericht op bewoners met gezondheidsachterstanden in wijken als Diezerpoort, Holtenbroek en Aa-landen. Bewoners in deze wijken kampen naast gezondheidsproblemen ook vaker met werkloosheid en armoede. De aanpak bewees zijn waarde: eerdere onderzoeken toonden aan dat het bijdroeg aan een gezondere omgeving, gezonder gedrag en het verkleinen van sociaal-economische gezondheidsverschillen.
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
                  src="/assets/images/zwolle1.jpg"
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

              <p className="text-sm leading-7 text-stone-600">
                Tussen 2018 en 2022 deed het lectoraat Gezonde Samenleving, met subsidie van ZonMw, vervolgonderzoek naar twaalf jaar Zwolle Gezonde Stad. Dit onderzoek keek zowel terug als vooruit: wat was er concreet gedaan op het niveau van organisatie en implementatie dat bijdroeg aan het succes, en hoe kon de samenwerking met de doelgroepen (ouders, kinderen en senioren) worden verbeterd? De leerpunten waren bedoeld om te delen met andere gemeenten en onderwijsinstellingen.
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
                  src="/assets/images/zwoll2.jpg"
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

              <p className="text-sm leading-7 text-stone-600">
                Die inzichten vormden het vertrekpunt voor GLOW-XL. Wat werkte in Zwolle moest breder worden onderzocht en toegepast, niet als projectmatig initiatief, maar als structureel verankerd preventie-ecosysteem. GLOW-XL bouwt voort op deze werkzame elementen en vertaalt ze naar een bestuurs- en implementatiekader dat gemeenten in heel Flevoland, en uiteindelijk heel Nederland, in staat stelt om geïntegreerde preventie duurzaam te implementeren en op te schalen.
              </p>
            </div>
          </div>
        </div>


        
      </section>
              <div className="flex gap-3 mt-8 justify-center flex-wrap">

                      <Button href="https://www.windesheim.nl/onderzoek/onderzoeksprojecten/urban-innovation/12-jaar-gezonde-stad" variant="primary">
                          Lees het gehele onderzoek
                      </Button>
                      <Button href="/gemeenten/zwolle" variant="secondary">
                          Bekijk het dashboard van Zwolle →
                      </Button>
        </div>
    </>
  );
}