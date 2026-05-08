'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { CoreElementSchema } from '@validations/zodSchemas'

// ------- CORE ELEMENT CRUD --------

// create
export async function createCoreElement(municipalityId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = CoreElementSchema.safeParse({
    title: formData.get('title'),
    slug: formData.get('slug'),
  })

  if (!parsed.success) {
  throw new Error(parsed.error.issues[0].message)
  }

  await prisma.coreElement.create({
    data: {
      municipality_id: municipalityId,
      title: parsed.data.title,
      slug: parsed.data.slug,
      created_by: userId,
    },
  })
}

// read
export async function getCoreElement(id: number) {
  await requireAuth()

  return await prisma.coreElement.findUnique({ where: { id } })
}

// read all by municipality
export async function getCoreElementsByMunicipality(municipalityId: number) {
  await requireAuth()

  return await prisma.coreElement.findMany({
    where: { municipality_id: municipalityId },
  })
}

// update
export async function updateCoreElement(id: number, formData: FormData) {
  await requireAuth()

  const parsed = CoreElementSchema.pick({ title: true }).safeParse({
    title: formData.get('title'),
  })
  
  if (!parsed.success) {
  throw new Error(parsed.error.issues[0].message)
  }

  await prisma.coreElement.update({
    where: { id },
    data: { title: parsed.data.title },
  })
}

// delete
export async function deleteCoreElement(id: number) {
  await requireAuth()

  await prisma.coreElement.delete({ where: { id } })
}
