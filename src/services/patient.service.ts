import { api } from '../api/api'
import type { Patient } from '../types'

export type CreatePatientDTO = {
  name: string
  cpf: string
}

export type UpdatePatientDTO = {
  id: string
  name: string
  cpf: string
}

export const patientService = {
  async findAll(): Promise<Patient[]> {
    const { data } = await api.get<Patient[]>('/patients')
    return data
  },

  async create(data: CreatePatientDTO) {
    return api.post<Patient>('/patients', data)
  },

  async update({ id, name, cpf }: UpdatePatientDTO) {
    return api.patch<Patient>(`/patients/${id}`, { name, cpf })
  },

  async delete(id: string) {
    return api.delete(`/patients/${id}`)
  },
}
