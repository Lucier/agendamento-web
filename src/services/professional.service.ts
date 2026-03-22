import { api } from '../api/api'
import type { Professional } from '../types'

export const professionalService = {
  async findAll(): Promise<Professional[]> {
    const { data } = await api.get('/professionals')

    return data
  },
}
