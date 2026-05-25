import { prisma } from "@/lib/prisma";

export async function getAllMunicipalitiesCMS(
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

    const yearMatch = query.match(/\b(20\d{2})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : null;

  return prisma.municipality.findMany({
    where: query
      ? { OR: [
            { name: { contains: query }},
            { creator: { username: { contains: query }}},
            ...(year
            ? [
                {
                  updated_at: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year + 1}-01-01`),
                  },
                },
                {
                  created_at: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year + 1}-01-01`),
                  },
                },
              ]
            : []),
          ],
        }
      : undefined,

    orderBy:
      orderMap[sort as keyof typeof orderMap] ?? {
        name: 'asc',
      },

    include: { creator: true },
  });
}

export async function getAllMunicipalities(sort: string, query: string) {
  const orderMap = {
    name_asc:     { name: 'asc' },
    name_desc:    { name: 'desc' },
    created_asc:  { created_at: 'asc' },
    created_desc: { created_at: 'desc' },
    updated_asc:  { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },
  } as const;

  return prisma.municipality.findMany({
    where: query
      ? { name: { contains: query } }
      : undefined,
    orderBy: orderMap[sort as keyof typeof orderMap] ?? { name: 'asc' },
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