'use server'

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth/auth-guard';
import { PartnerSchema } from '../validations/zodSchemas';

// ------- PARTNER CRUD --------

// create
export async function createPartner(formData: FormData) {
  const session = await requireAuth()
  const userId = Number(session.user.id)

  const parsed = PartnerSchema.safeParse({
    name:         formData.get('name'),
    logo:         formData.get('logo'),
    website:      formData.get('website'),
    description:  formData.get('description'),
    partnerInfo:  formData.get('partnerInfo'),
    researchRole: formData.get('researchRole'),
    image1:       formData.get('image1') || undefined,
    image2:       formData.get('image2') || undefined,
    image3:       formData.get('image3') || undefined,
  })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  await prisma.partner.create({
    data: {
      ...parsed.data,
      created_by: userId,
    },
  })
}

// read
export async function getPartner(id: number) {
  await requireAuth()
  return await prisma.partner.findUnique({ where: { id } })
}

// update
export async function updatePartner(id: number, formData: FormData) {
  await requireAuth()

  const parsed = PartnerSchema.safeParse({
    name:         formData.get('name'),
    logo:         formData.get('logo'),
    website:      formData.get('website'),
    description:  formData.get('description'),
    partnerInfo:  formData.get('partnerInfo'),
    researchRole: formData.get('researchRole'),
    image1:       formData.get('image1') || undefined,
    image2:       formData.get('image2') || undefined,
    image3:       formData.get('image3') || undefined,
  })
  if (!parsed.success) throw new Error(parsed.error.issues[0].message)

  await prisma.partner.update({
    where: { id },
    data: parsed.data,
  })
}

// delete
export async function deletePartner(id: number) {
  await requireAuth()
  await prisma.partner.delete({ where: { id } })
}