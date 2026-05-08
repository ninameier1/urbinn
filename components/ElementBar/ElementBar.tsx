'use client';

import Link from "next/link";
import { getThemeForIndex } from "@/utils/helpers";

import Gear from '@/components/Gear/Gear';
import styles from "./ElementBar.module.css";

type EleProps = {
  eleIds: string[];
  municipality: string | string[];
  data: Record<string, { title?: string }>;
  activeId: string;
};

export default function ElementBar({ eleIds, municipality, data, activeId }: EleProps) {
  return (
    <div className={styles.elementBar}>
      {eleIds.map((eleId) => {
        const eleDetail = data[eleId] || {};
        const title = eleDetail.title || "Geen titel beschikbaar";
        const index = eleIds.indexOf(eleId);
        const { mainColour } = getThemeForIndex(index, eleIds.length);

        return (
          <Link
            key={eleId}
            href={`/gemeenten/${municipality}/${eleId}`}
            className={`${styles.smallButton} ${
              eleId === activeId ? styles.active : ""
            }`}
          >
            <div className={styles.eleContent}>
              <Gear
                teeth={18}
                colour={mainColour}
                variant="small"
                active={eleId === activeId}
              />
              <span className={styles.eleTitle}>
                {title}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}