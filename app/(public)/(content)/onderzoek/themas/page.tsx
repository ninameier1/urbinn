import TitleSection from "@/components/Sections/TitleSection";

import { HouseHeart, Leaf, Users, Heart, Building2, HeartHandshake, Microscope, NotebookPen, Cog } from "lucide-react";

const themes = [
  { icon: HouseHeart, label: "Wonen", description: "Betaalbaar, toegankelijk en divers" },
  { icon: Leaf, label: "Duurzaamheid", description: "Energie, groen en klimaatadaptatie" },
  { icon: HeartHandshake, label: "Inclusiviteit", description: "Kansen en participatie voor iedereen" },
  { icon: Heart, label: "Welzijn", description: "Gezondheid, veiligheid en cohesie" },
  { icon: Users, label: "Samenwerking", description: "...", },
  { icon: NotebookPen, label: "Aanpak en Beleid", description: "...",},
];

export const revalidate = 60;

export default async function ThemesPage() {
  return (
    <>
      {/* <TitleSection /> */}
      <section className="bg-white border border-stone-200 mt-8 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200 gap-8">
          <span className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
            Thema's
          </span>
                  <div>
                    <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
                      De thema's van het onderzoek
                    </h1>
        
                    <p className="max-w-7xl text-sm text-stone-500 leading-7">
                      Hier komt een korte introductie over hoe het onderzoek is
                      ontstaan, welke vraagstukken eraan ten grondslag liggen en
                      waarom het relevant is voor gemeenten en partners binnen
                      het netwerk.
                    </p>
                  </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[260px] gap-px bg-stone-200">
        {themes.map((theme, index) => {
        const Icon = theme.icon;
        const large = index % 6 === 0;
        const tall = index % 6 === 1;
        const large2 = index % 6 === 5;

          return (
            <div
              key={theme.label}
                className={`bg-white p-6 flex flex-col
                  ${large ? 'md:col-span-4' : ''}
  ${tall ? 'md:col-span-2 md:row-span-2' : ''}
  ${large2 ? 'md:col-span-4' : ''}
  ${!large && !tall && !large2 ? 'md:col-span-2' : ''}
                `}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                    Thema
                  </span>

                  <h2 className="text-xl font-semibold text-primary mt-2">
                    {theme.label}
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
                    <Icon />
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-6 line-clamp-4">
                {theme.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
    </>
  );
}