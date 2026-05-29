import { z } from 'zod'

export const MunicipalitySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
})

export const CoreElementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
})

export const MechanismSchema = z.object({
  text: z.string().min(1, 'Text is required'),
})

export const FactorSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  type: z.enum(['plus', 'min']),
})

export const PublicationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'At least one author is required').max(100),
  description: z.string().min(1, 'Description is required'),
  url: z.string().optional().nullable(),
  published_at: z.coerce.date().optional().nullable(),
  municipality_id: z.number().optional().nullable(),
})

export const PartnerSchema = z.object({
  name: z.string().min(1, 'Partner name is required').max(100),
  logo: z.string().min(1, 'A logo is required'),
  website: z.string().min(1, 'Website is required').max(100),
  description: z.string().min(1, 'Description is required'),
  partnerInfo: z.string().min(1, 'Partner Info is required'),
  researchRole: z.string().min(1, 'Research role is required'),

  image1: z.string().optional().nullable(),
  image2: z.string().optional().nullable(),
  image3: z.string().optional().nullable(),
});