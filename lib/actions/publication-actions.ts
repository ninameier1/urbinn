'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { PublicationSchema } from '@validations/zodSchemas'

// ------- PUBLICATION CRUD --------

// create
export async function createPublication(formData: FormData) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  const rawMunicipalityId = formData.get("municipality_id");
  const rawPublishedAt = formData.get("published_at");

  const parsed = PublicationSchema.safeParse({
    title: formData.get("title")?.toString().trim(),
    author: formData.get("author")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
    url: formData.get("url")?.toString().trim(),

    municipality_id: !rawMunicipalityId
      ? null
      : Number(rawMunicipalityId),

    published_at: !rawPublishedAt
      ? null
      : new Date(rawPublishedAt as string),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const publication = await prisma.publication.create({
    data: {
      ...parsed.data,
      created_by: userId,
    },
  });

  return publication.id;
}

// read
export async function getPublication(id: number) {
  await requireAuth()
  return await prisma.publication.findUnique({
    where: { id },
    include: {
      creator: true,
      municipality: true,
    },
  })
}

// read all
export async function getAllPublications() {
  await requireAuth()
  return await prisma.publication.findMany()
}

// read all by municipality
export async function getPublicationsByMunicipality(municipalityId: number) {
  await requireAuth()

  return await prisma.publication.findMany({
    where: { municipality_id: municipalityId },
  })
}

// update
export async function updatePublication(id: number, formData: FormData) {
  await requireAuth()

  const rawMunicipalityId = formData.get("municipality_id");
  const rawPublishedAt = formData.get("published_at");

  const parsed = PublicationSchema.safeParse({
    title: formData.get("title")?.toString().trim(),
    author: formData.get("author")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
    url: formData.get("url")?.toString().trim(),

    municipality_id: !rawMunicipalityId
      ? null
      : Number(rawMunicipalityId),

    published_at: !rawPublishedAt
      ? null
      : new Date(rawPublishedAt as string),
  });
  
  if (!parsed.success) {
  throw new Error(parsed.error.issues[0].message)
  }

  await prisma.publication.update({
    where: { id },
    data: { 
      ...parsed.data, 
    },
  })
}

// delete
export async function deletePublication(id: number) {
  await requireAuth()

  await prisma.publication.delete({ where: { id } })
}
