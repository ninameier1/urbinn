'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { MechanismSchema } from '@validations/zodSchemas'

// ------- MECHANISM CRUD --------

// create
export async function createMechanism(coreElementId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = MechanismSchema.safeParse({
    label: formData.get('label'),
    text: formData.get('text'),
  })
  
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  await prisma.mechanism.create({
    data: {
      core_element_id: coreElementId,
      ...parsed.data,
      created_by: userId,
    },
  })
}

// read
export async function getMechanism(id: number) {
  await requireAuth()

  return await prisma.mechanism.findUnique({ where: { id } })
}

// read all by core element
export async function getMechanismsByCoreElement(coreElementId: number) {
  await requireAuth()

  return await prisma.mechanism.findMany({
    where: { core_element_id: coreElementId },
  })
}

// update
export async function updateMechanism(id: number, formData: FormData) {
  await requireAuth()

  const parsed = MechanismSchema.safeParse({
    label: formData.get('label'),
    text: formData.get('text'),
  })
  
  if (!parsed.success) 
  throw new Error(parsed.error.issues[0].message)

  await prisma.mechanism.update({
    where: { id },
    data: {
      ...parsed.data,
    },
  })
}

// delete
export async function deleteMechanism(id: number) {
  await requireAuth()

  await prisma.mechanism.delete({ where: { id } })
}
