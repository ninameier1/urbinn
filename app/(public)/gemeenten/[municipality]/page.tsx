import Link from 'next/link';

import { prisma } from "@/lib/prisma";
import { getThemeForIndex } from '@utils/helpers';
import { slugify } from '@utils/helpers';

import Gear from '@/components/Gear/Gear';
import Image from "next/image";
import styles from './Municipality.module.css';

export const revalidate = 60;

interface MunicipalityProps {
  params: Promise<{ municipality: string }>;
}

export default async function MunicipalityDashboard({ params }: MunicipalityProps) {
  const { municipality } = await params;

  const municipalityData = await prisma.municipality.findFirst({
    where: { name: { equals: municipality } },
    include: {
      core_elements: {
        orderBy: { id: 'asc' },
      },
    },
  });

  if (!municipalityData) return <h2>Gemeente niet gevonden</h2>;

  const entries = municipalityData.core_elements;

  return (
    <div className="relative w-full h-[90vh]">
      <Image
        src="/assets/images/newbg.png"
        alt="Background"
        fill
        className="object-contain"
        unoptimized={true}
        priority
      />
      <div className="w-full h-auto min-h-full flex flex-col items-center bg-background rounded-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full drop-shadow-md">
          <div className={styles.logoSpin}>
            <Gear colour="#c6c6c6" teeth={36} variant="logo" />
          </div>
          <span className="absolute capitalize top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-semibold text-4xl pointer-events-none w-[90%]">
            {municipality}
          </span>
        </div>

        <div className={styles.dashboardButtons}>
          {entries.map((element, i) => {
            const angle = (360 / entries.length) * i - 90;
            const { mainColour } = getThemeForIndex(i, entries.length);

            return (
              <Link
                key={element.id}
                href={`/gemeenten/${municipality}/${slugify(element.title)}`}
                className={`${styles.circleButton} rounded-full flex items-center justify-center no-underline font-bold cursor-pointer`}
                style={{
                  ['--colour' as any]: mainColour,
                  ['--angle' as any]: `${angle}deg`,
                }}
              >
                <div className="relative w-full h-full">
                  <div className={styles.buttonSpin}>
                    <Gear teeth={18} colour={mainColour} variant="small" />
                  </div>
                  <span className={`${styles.buttonTitle} absolute top-1/2 left-1/2 text-black text-xs font-bold text-center leading-tight pointer-events-none w-[90%]`}>
                    {element.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}