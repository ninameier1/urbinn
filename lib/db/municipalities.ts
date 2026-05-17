import { prisma } from "@/lib/prisma";

export function getAllMunicipalities() {
  return prisma.municipality.findMany({
    orderBy: { name: "asc" },
    include: {
      creator: {
        select: { username: true },
      },
    },
  });
}

export function getMunicipalityByName(name: string) {
  return prisma.municipality.findFirst({
    where: {
      name: { equals: name },
    },
    include: {
      core_elements: {
        orderBy: { id: "asc" },
      },
    },
  });
}

export function getNewestMunicipalities(take: number = 3) {
  return prisma.municipality.findMany({
    orderBy: { created_at: "desc" },
    take,
  });
}