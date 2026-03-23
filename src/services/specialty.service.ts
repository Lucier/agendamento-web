import { api } from '../api/api'
import type { Specialty } from '../types'

export const specialtyService = {
  async findAll(): Promise<Specialty[]> {
    const { data } = await api.get('/specialties')

    return data
  },

  async create(name: string) {
    return api.post('/specialties', { name })
  },

  async update(id: string, name: string) {
    return api.patch(`/specialties/${id}`, { name })
  },

  async delete(id: string) {
    return api.delete(`/specialties/${id}`)
  },
}
