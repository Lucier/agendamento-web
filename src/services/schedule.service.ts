import { api } from '../api/api'
import type { Schedule } from '../types'

export type CreateScheduleDTO = {
  date: string
  professionalId: string
}

export const scheduleService = {
  async findAll(): Promise<Schedule[]> {
    const { data } = await api.get('/schedules')

    return data
  },

  async create(data: CreateScheduleDTO) {
    return api.post('/schedules/new', data)
  },
}
