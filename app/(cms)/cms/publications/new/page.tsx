import TitleSection from "@/components/TitleSection";
import CreatePublicationForm from '@components/CMS/CreatePublicationForm';

import { getAllMunicipalities } from "@/lib/db/municipalities";

export default async function NewPublicationPage() {
  const municipalities = await getAllMunicipalities("name_asc", "");
  return (
    <>
      <TitleSection />
      <CreatePublicationForm municipalities={municipalities} />
    </>
  );
}
