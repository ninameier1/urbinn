'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth/auth-guard'
import { MunicipalitySchema } from '@validations/zodSchemas'
import { FactorType } from "@/components/CMS/CreateFactorSection";

// ------- MUNICIPALITY CRUD --------

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export interface CreateCoreElementInput {
  title: string;
  factors: { text: string; type: FactorType }[];
  mechanisms: { text: string }[];
}

export async function createMunicipality(
  formData: FormData,
  coreElements: CreateCoreElementInput[] = []
) {
  const session = await requireAuth();
  const userId = Number(session.user.id);

  const parsed = MunicipalitySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    image: formData.get('image'),
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const municipalityId = await prisma.$transaction(async (tx) => {
    const municipality = await tx.municipality.create({
      data: { ...parsed.data, created_by: userId },
    });

    for (const ce of coreElements) {
      const coreElement = await tx.coreElement.create({
        data: {
          municipality_id: municipality.id,
          title: ce.title,
          slug: toSlug(ce.title),
          created_by: userId,
        },
      });

      for (const factor of ce.factors) {
        await tx.factor.create({
          data: {
            core_element_id: coreElement.id,
            text: factor.text,
            type: factor.type,
            created_by: userId,
          },
        });
      }

      for (const mechanism of ce.mechanisms) {
        await tx.mechanism.create({
          data: {
            core_element_id: coreElement.id,
            text: mechanism.text,
            created_by: userId,
          },
        });
      }
    }

    return municipality.id;
  });

  return municipalityId;
}

// read
export async function getMunicipality(id: number) {
  await requireAuth()

  return await prisma.municipality.findUnique({ where: { id } })
}

// update
export async function updateMunicipality(id: number, formData: FormData) {
  await requireAuth();

  const parsed = MunicipalitySchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    image: formData.get('image'),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await prisma.municipality.update({
    where: { id },
    data: {
      ...parsed.data,
    },
  });
}

// delete
export async function deleteMunicipality(id: number) {
  await requireAuth()

  await prisma.municipality.delete({ where: { id } })
}
