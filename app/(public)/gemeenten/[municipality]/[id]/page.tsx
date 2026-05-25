import { notFound } from 'next/navigation';
import { getCoreElementBySlug, getCoreElementsByMunicipalityId } from '@db/core-elements';
import { getThemeForIndex } from '@utils/helpers';
import type { Metadata } from 'next'

import Mechanism from '@components/Mechanism/Mechanism';
import Factor from '@/components/Factor/Factor';
import Gear from '@/components/Gear/Gear';
import ElementBar from '@/components/ElementBar/ElementBar';
import BreadcrumbOverride from '@/components/BreadcrumbOverride';
import styles from './CoreElement.module.css';

export const metadata: Metadata = {
  title: "Kernelement",
}

export const revalidate = 60;

interface CoreElementProps {
  params: Promise<{ 
    municipality: string; 
    id: string 
  }>;
}

export default async function CoreElementPage({ params }: CoreElementProps) {
  const { municipality, id } = await params;

  const element = await getCoreElementBySlug(id, municipality);
  if (!element) notFound();

  const allElements = await getCoreElementsByMunicipalityId(element.municipality_id);

  const index = allElements.findIndex((e) => e.slug === id);
  const { mainColour, subColour } = getThemeForIndex(index, allElements.length);

  const mechanisms = element.mechanisms;
  const factors = element.factors;

  return (
    <div className="relative w-full h-[90vh]">

      <BreadcrumbOverride label={element.title} />
      <div className="relative w-full h-screen">
        <div className={`${styles.bigGearWrapper} flex-shrink-0`}>
          <Gear colour={mainColour} teeth={18} variant="big" />
          <h1 className={`${styles.bigGearTitle} w-[90%] text-2xl leading-snug font-semibold text-center pointer-events-none m-0 p-0`}>
            {element.title}
          </h1>
        </div>

        <div className={styles.elementBar}>
          <ElementBar
            eleIds={allElements.map((e) => e.slug)}
            municipality={municipality}
            data={Object.fromEntries(allElements.map((e) => [e.slug, { title: e.title }]))}
            activeId={id}
          />
        </div>

        <div className={`${styles.mechanismsWrapper} rounded-full text-sm text-center`}>
          {mechanisms.map((m, i) => {
            const angle = (360 / mechanisms.length) * i - 90;
            return (
              <Mechanism
                key={m.id}
                text={m.text}
                mechcolour={subColour}
                angle={angle}
              />
            );
          })}
        </div>

        <div className={`${styles.factorsWrapper} flex`}>
          <div className="flex flex-col flex-1 flex-wrap gap-5 content-start">
            {factors
              .filter((f) => f.type === 'plus')
              .map((f) => (
                <Factor key={f.id} text={f.text} fcolour={subColour} type={f.type} />
              ))}
          </div>
          <div className="flex flex-col flex-1 flex-wrap gap-5 content-end">
            {factors
              .filter((f) => f.type === 'min')
              .map((f) => (
                <Factor key={f.id} text={f.text} fcolour={subColour} type={f.type} />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}