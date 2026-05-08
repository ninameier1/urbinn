import { z } from 'zod'

export const MunicipalitySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
})

export const CoreElementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100).regex(/^[a-z0-9-]+$/, 'Slug may only contain lowercase letters, numbers, and hyphens'),
})

export const MechanismSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100),
  text: z.string().min(1, 'Text is required'),
})

export const FactorSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100),
  text: z.string().min(1, 'Text is required'),
  type: z.enum(['plus', 'min']),
})