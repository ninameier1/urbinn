import { prisma } from "@/lib/prisma";

export function getCoreElementBySlug(slug: string, municipalityName: string) {
  return prisma.coreElement.findFirst({
    where: {
      slug,
      municipality: {
        name: {
          equals: municipalityName.charAt(0).toUpperCase() + municipalityName.slice(1).toLowerCase()
        }
      },
    },
    include: { mechanisms: true, factors: true, municipality: true },
  });
}

export function getCoreElementsByMunicipalityId(municipalityId: number) {
  return prisma.coreElement.findMany({
    where: { municipality_id: municipalityId },
    select: { id: true, title: true, slug: true },
    orderBy: { id: "asc" },
  });
}