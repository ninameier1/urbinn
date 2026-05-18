'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { FactorSchema } from '@validations/zodSchemas'

// ------- FACTOR CRUD --------

// create
export async function createFactor(coreElementId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = FactorSchema.safeParse({
    label: formData.get('label'),
    text: formData.get('text'),
    type: formData.get('type'),
  })
  
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  await prisma.factor.create({
    data: {
      core_element_id: coreElementId,
      ...parsed.data,
      created_by: userId,
    },
  })
}

// read
export async function getFactor(id: number) {
  await requireAuth()

  return await prisma.factor.findUnique({ where: { id } })
}

// read all by core element
export async function getFactorsByCoreElement(coreElementId: number) {
  await requireAuth()

  return await prisma.factor.findMany({
    where: { core_element_id: coreElementId },
  })
}

// update
export async function updateFactor(id: number, formData: FormData) {
  await requireAuth()

  const parsed = FactorSchema.safeParse({
    label: formData.get('label'),
    text: formData.get('text'),
    type: formData.get('type'),
  })

  if (!parsed.success) {
  throw new Error(parsed.error.issues[0].message)
  }

  await prisma.factor.update({
    where: { id },
    data: {
      ...parsed.data,
    },
  })
}

// delete
export async function deleteFactor(id: number) {
  await requireAuth()

  await prisma.factor.delete({ where: { id } })
}