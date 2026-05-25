import { prisma } from "@/lib/prisma";

export async function getAllPublicationsCMS(
  sort: string,
  query: string
) {
  const orderMap = {
    title_asc: { title: 'asc' },
    title_desc: { title: 'desc' },

    published_asc: { published_at: 'asc' },
    published_desc: { published_at: 'desc' },

    author_asc:   { author: 'asc' },
    author_desc:  {author: 'desc'},

    created_asc: { created_at: 'asc' },
    created_desc: { created_at: 'desc' },

    updated_asc: { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },

    creator_asc: { creator: { username: 'asc' } },
    creator_desc: { creator: { username: 'desc' } },
  } as const;

  return prisma.publication.findMany({
    where: query
      ? {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
          { creator: { username: { contains: query } } },
        ]
        }
      : undefined,

    orderBy:
      orderMap[sort as keyof typeof orderMap] ?? {
        title: 'asc',
      },

    include: {
      creator: true,
    },
  });
}

export async function getAllPublications(sort: string, query: string) {
  const orderMap = {
    title_asc:     { title: 'asc' },
    title_desc:    { title: 'desc' },

    published_asc: { published_at: 'asc' },
    published_desc: { published_at: 'desc' },

    created_asc:  { created_at: 'asc' },
    created_desc: { created_at: 'desc' },

    updated_asc:  { updated_at: 'asc' },
    updated_desc: { updated_at: 'desc' },
  } as const;

  return prisma.publication.findMany({
    where: query
      ? { title: { contains: query } }
      : undefined,
    orderBy: orderMap[sort as keyof typeof orderMap] ?? { title: 'asc' },
  });
}

export function getPublicationsByMunicipality(municipalityId: number) {
  return prisma.publication.findMany({
    where: { municipality_id: municipalityId },
    orderBy: { published_at: "desc" },
  });
}

export async function getNewestPublication() {
  return prisma.publication.findFirst({ orderBy: { published_at: 'desc' } });
}