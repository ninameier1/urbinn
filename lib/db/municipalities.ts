import { prisma } from "@/lib/prisma";

export async function getAllMunicipalities(
  sort: string,
  query: string
) {
  const orderMap = {
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },

    created_asc: { created_at: 'asc' },
    created_desc: { created_at: 'desc' },

    updated_asc: { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },

    creator_asc: { creator: { username: 'asc' } },
    creator_desc: { creator: { username: 'desc' } },
  } as const;

  return prisma.municipality.findMany({
    where: query
      ? {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              creator: {
                username: {
                  contains: query,
                },
              },
            },
          ],
        }
      : undefined,

    orderBy:
      orderMap[sort as keyof typeof orderMap] ?? {
        name: 'asc',
      },

    include: {
      creator: true,
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