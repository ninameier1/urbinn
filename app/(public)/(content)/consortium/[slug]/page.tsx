import { notFound } from "next/navigation";
import { getPartner } from "@/lib/db/partners";

import TitleSection from "@/components/Sections/TitleSection";
import PartnerSection from "@/components/Sections/PartnerSection";

export const revalidate = 60;

type PartnerProps = {
  params: Promise<{ slug: string }>;
};

export default async function PartnerPage({ params }: PartnerProps) {
  const { slug } = await params;
  
const partner = await getPartner(slug);
if (!partner) notFound();

  return (
    <>
      <TitleSection />
      <div>
        <PartnerSection
          name={partner.name}
          logo={partner.logo}
          website={partner.website}
          description={partner.description}
          partnerInfo={partner.partnerInfo}
          researchRole={partner.researchRole}
          images={[
            { src: partner.image1 ?? '/assets/images/lectoraat2.jpg', alt: partner.name },
            { src: partner.image2 ?? '/assets/images/lectoraat.jpg', alt: partner.name },
            { src: partner.image3 ?? '/assets/images/lectoraat3.jpg', alt: partner.name },
          ]}
        />
      </div>
    </>
  );
}