import { z } from 'zod'

export const createAppointmentSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  sus_card: z.string().min(6, 'Cartão inválido'),
  professionalId: z.string().uuid(),
  timeSlotId: z.string().uuid(),
  date: z.string(),
})

export type CreateAppointmentDTO = z.infer<typeof createAppointmentSchema>

// Update: todos campos opcionais
export const updateAppointmentSchema = createAppointmentSchema.partial()
export type UpdateAppointmentDTO = z.infer<typeof updateAppointmentSchema>
