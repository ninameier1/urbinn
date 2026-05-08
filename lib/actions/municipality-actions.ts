'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { MunicipalitySchema } from '@/lib/validations/zodSchemas'

// ------- MUNICIPALITY CRUD --------

// create
export async function createMunicipality(formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = MunicipalitySchema.safeParse({
    name: formData.get('name'),
  })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  await prisma.municipality.create({
    data: {
      name: parsed.data.name,
      created_by: userId,
    },
  })
}

// read
export async function getMunicipality(id: number) {
  await requireAuth()

  return await prisma.municipality.findUnique({ where: { id } })
}

// update
export async function updateMunicipality(id: number, formData: FormData) {
  await requireAuth()

  const parsed = MunicipalitySchema.safeParse({
    name: formData.get('name'),
  })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  await prisma.municipality.update({
    where: { id },
    data: { name: parsed.data.name },
  })
}

// delete
export async function deleteMunicipality(id: number) {
  await requireAuth()

  await prisma.municipality.delete({ where: { id } })
}
