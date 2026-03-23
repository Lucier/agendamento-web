import { z } from 'zod'

export const createSpecialtySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

export type CreateSpecialtyFormData = z.infer<typeof createSpecialtySchema>
