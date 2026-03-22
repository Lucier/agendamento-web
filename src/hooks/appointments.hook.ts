import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateAppointmentDTO } from '../schemas/appointment.schema'
import { appointmentService } from '../services/appointment.service'

type Specialty = {
  id: string
  name: string
}

export function useAppointments() {
  const queryClient = useQueryClient()

  // Lista de agendamentos
  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.findAll,
  })

  // Criar agendamento
  const createAppointmentMutation = useMutation({
    mutationFn: (data: CreateAppointmentDTO) => appointmentService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  })

  // Especialidades
  const specialtiesQuery = useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: appointmentService.getSpecialties,
  })

  // Profissionais por especialidade
  const getProfessionals = (specialtyId: string) => {
    return useQuery<{ id: string; name: string }[]>({
      queryKey: ['professionals', specialtyId],
      queryFn: () =>
        appointmentService.getProfessionalsBySpecialty(specialtyId),
      enabled: !!specialtyId,
    })
  }

  // Horários disponíveis
  const getSlots = (professionalId: string, date: string) => {
    return useQuery<{ id: string; time: string }[]>({
      queryKey: ['slots', professionalId, date],
      queryFn: () => appointmentService.getAvailableSlots(professionalId, date),
      enabled: !!professionalId && !!date,
    })
  }

  const deleteAppointmentMutation = useMutation({
    mutationFn: (id: string) => appointmentService.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  })

  return {
    appointmentsQuery,
    createAppointment: createAppointmentMutation.mutateAsync,
    createAppointmentMutation,
    specialtiesQuery,
    getProfessionals,
    getSlots,
    deleteAppointmentMutation: deleteAppointmentMutation.mutateAsync,
  }
}
