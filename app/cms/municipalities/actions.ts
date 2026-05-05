'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

async function requireAuth() { // handler so I don't type this 100 times
  const session = await auth()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  return session as typeof session & {
    user: {
      id: string
    }
  }
}

// ------- MUNICIPALITY CRUD --------

// create
export async function createMunicipality(formData: FormData) {
  const session = await requireAuth()
  const name = formData.get('name') as string
  const userId = Number(session.user?.id)

  await prisma.municipality.create({
    data: {
      name,
      created_by: userId
    }
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
  const name = formData.get('name') as string

  await prisma.municipality.update({
    where: { id },
    data: { name }
  })
}

// detele
export async function deleteMunicipality(id: number) {
  await requireAuth()

  await prisma.municipality.delete({ where: { id } })
}

// ------- CORE ELEMENT CRUD --------

// create
export async function createCoreElement(municipalityId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user?.id)

  await prisma.coreElement.create({
    data: {
      municipality_id: municipalityId,
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      created_by: userId,
    }
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
    where: { municipality_id: municipalityId }
  })
}

// update
export async function updateCoreElement(id: number, formData: FormData) {
  await requireAuth()

  await prisma.coreElement.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
    }
  })
}

// delete
export async function deleteCoreElement(id: number) {
  await requireAuth()

  await prisma.coreElement.delete({ where: { id } })
}

// ------- MECHANISM CRUD --------

// create
export async function createMechanism(coreElementId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user?.id)

  await prisma.mechanism.create({
    data: {
      core_element_id: coreElementId,
      label: formData.get('label') as string,
      text: formData.get('text') as string,
      created_by: userId
    }
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
    where: { core_element_id: coreElementId }
  })
}

// update
export async function updateMechanism(id: number, formData: FormData) {
  await requireAuth()

  await prisma.mechanism.update({
    where: { id },
    data: {
      label: formData.get('label') as string,
      text: formData.get('text') as string,
    }
  })
}

// delete
export async function deleteMechanism(id: number) {
  await requireAuth()

  await prisma.mechanism.delete({ where: { id } })
}

// ------- FACTOR CRUD --------

// create
export async function createFactor(coreElementId: number, formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user?.id)

  await prisma.factor.create({
    data: {
      core_element_id: coreElementId,
      label: formData.get('label') as string,
      text: formData.get('text') as string,
      type: formData.get('type') as 'plus' | 'min',
      created_by: userId
    }
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
    where: { core_element_id: coreElementId }
  })
}

// update
export async function updateFactor(id: number, formData: FormData) {
  await requireAuth()

  await prisma.factor.update({
    where: { id },
    data: {
      label: formData.get('label') as string,
      text: formData.get('text') as string,
      type: formData.get('type') as 'plus' | 'min',
    }
  })
}

// delete
export async function deleteFactor(id: number) {
  await requireAuth()

  await prisma.factor.delete({ where: { id } })
}
