import { api } from '../api/api'
import type { UpdateAppointmentDTO } from '../schemas/appointment.schema'
import type { Appointment } from '../types'

export type CreateAppointmentPayload = {
  patientId: string
  professionalId: string
  timeSlotId: string
  date: string
}

export const appointmentService = {
  findAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get('/appointments')
    return data
  },

  getSpecialties: async () => {
    const { data } = await api.get('/specialties')
    return data
  },

  getProfessionalsBySpecialty: async (specialtyId: string) => {
    const { data } = await api.get(`/appointments/professionals/${specialtyId}`)
    return data
  },

  getAvailableSlots: async (professionalId: string, date: string) => {
    const { data } = await api.get<{ id: string; time: string }[]>(
      `/appointments/slots/${professionalId}?date=${date}`,
    )
    return data
  },

  create(data: CreateAppointmentPayload) {
    console.log('SERVICE CREATE', data)
    return api.post('/appointments/new', data)
  },

  update: async (id: string, appointment: UpdateAppointmentDTO) => {
    const { data } = await api.put(`/appointments/edit/${id}`, appointment)
    return data
  },

  delete: async (id: string) => {
    await api.delete(`/appointments/${id}`)
  },
}
