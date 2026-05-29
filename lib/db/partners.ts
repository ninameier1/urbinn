import { prisma } from "@/lib/prisma";

export async function getAllPartnersCMS(sort: string, query: string) {
  const orderMap = {
    name_asc:     { name: 'asc' },
    name_desc:    { name: 'desc' },
    created_asc:  { createdAt: 'asc' },
    created_desc: { createdAt: 'desc' },
    updated_asc:  { updatedAt: 'asc' },
    updated_desc: { updatedAt: 'desc' },
    creator_asc:  { creator: { username: 'asc' } },
    creator_desc: { creator: { username: 'desc' } },
  } as const;

  return prisma.partner.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { creator: { username: { contains: query } } },
          ],
        }
      : undefined,
    orderBy: orderMap[sort as keyof typeof orderMap] ?? { name: 'asc' },
    include: { creator: true },
  });
}

export async function getAllPartners(sort: string, query: string) {
  const orderMap = {
    name_asc:     { name: 'asc' },
    name_desc:    { name: 'desc' },
    created_asc:  { createdAt: 'asc' },
    created_desc: { createdAt: 'desc' },
    updated_asc:  { updatedAt: 'asc' },
    updated_desc: { updatedAt: 'desc' },
  } as const;

  return prisma.partner.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
          ],
        }
      : undefined,
    orderBy: orderMap[sort as keyof typeof orderMap] ?? { name: 'asc' },
  });
}

export async function getPartner(id: number) {
  return prisma.partner.findUnique({ where: { id } });
}

