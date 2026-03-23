import { z } from 'zod'

export const createPatientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),

  sus_card: z.string().min(8, 'Cartão deve ter no mínimo 8 caracteres'),
})

export type CreatePatientFormData = z.infer<typeof createPatientSchema>
