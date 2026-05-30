import { prisma } from "@/lib/prisma";
import { slugify } from "@/utils/helpers";

export async function getAllPartnersCMS(sort: string, query: string) {
  const orderMap = {
    name_asc:     { name: 'asc' },
    name_desc:    { name: 'desc' },
    created_asc:  { created_at: 'asc' },
    created_desc: { created_at: 'desc' },
    updated_asc:  { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },
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

export async function getAllPartnersSort(sort: string, query: string) {
  const orderMap = {
    name_asc:     { name: 'asc' },
    name_desc:    { name: 'desc' },
    created_asc:  { created_at: 'asc' },
    created_desc: { created_at: 'desc' },
    updated_asc:  { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },
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

export async function getAllPartners() {
  return prisma.partner.findMany({
    orderBy: { name: 'asc' },
    include: { creator: true },
  });
}

export async function getPartner(slug: string) {
  const partners = await prisma.partner.findMany();

  return partners.find(
    (partner) => slugify(partner.name) === slug
  );
}

