import { api } from '../api/api'
import type { Professional } from '../types'

export const professionalService = {
  async findAll(): Promise<Professional[]> {
    const { data } = await api.get('/professionals')

    return data
  },

  async create(name: string) {
    return api.post('/professionals', { name })
  },

  async update(id: string, name: string) {
    return api.patch(`/professionals/${id}`, { name })
  },

  async delete(id: string) {
    return api.delete(`/professionals/${id}`)
  },
}
