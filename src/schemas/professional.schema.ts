import { z } from 'zod'

export const createProfessionalSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  specialtyId: z.string().min(1, 'Especialidade é obrigatória'),
})

export type CreateProfessionalFormData = z.infer<
  typeof createProfessionalSchema
>
