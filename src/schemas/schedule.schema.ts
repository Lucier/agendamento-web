import { z } from 'zod'

export const createScheduleSchema = z.object({
  professionalId: z.string(),
  date: z.string(),
  start: z.string(),
  end: z.string(),
})

export type CreateScheduleFormData = z.infer<typeof createScheduleSchema>
