import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { useAppointments } from '../../../hooks/useAppointments.hook'
import {
  type CreateAppointmentDTO,
  createAppointmentSchema,
} from '../../../schemas/appointment.schema'

export function AppointmentForm() {
  const navigate = useNavigate()
  const { id: appointmentId } = useParams<{ id: string }>()
  const {
    createAppointmentMutation,
    specialtiesQuery,
    getProfessionals,
    getSlots,
  } = useAppointments()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAppointmentDTO>({
    resolver: zodResolver(createAppointmentSchema),
    mode: 'onSubmit',
  })

  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  // hooks SEMPRE no topo
  const professionalsQuery = getProfessionals(selectedSpecialty)
  const slotsQuery = getSlots(selectedProfessional, selectedDate)

  // 🔹 Carregar dados se estiver editando
  useEffect(() => {
    if (!appointmentId) return

    async function loadAppointment() {
      try {
        const res = await api.get(`/appointments/${appointmentId}`)
        const appt = res.data

        // campos do form
        setValue('name', appt.patient?.name || '')
        setValue('sus_card', appt.patient?.sus_card || '')

        // selects dependentes
        setSelectedSpecialty(appt.professional?.specialtyId || '')
        setSelectedProfessional(appt.professionalId || '')

        // data
        const date = new Date(appt.dateTime).toISOString().split('T')[0]
        setSelectedDate(date)

        // slot
        setValue('timeSlotId', appt.timeSlotId || '')
      } catch (error) {
        console.error('Erro ao carregar appointment', error)
      }
    }

    loadAppointment()
  }, [appointmentId, setValue])

  useEffect(() => {
    if (!appointmentId) return
    if (!slotsQuery.data) return

    api.get(`/appointments/${appointmentId}`).then((res) => {
      const appt = res.data
      setValue('timeSlotId', appt.timeSlotId)
    })
  }, [slotsQuery.data, appointmentId, setValue])

  const onSubmit = async (data: CreateAppointmentDTO) => {
    try {
      const payload = {
        name: data.name,
        sus_card: data.sus_card,
        professionalId: selectedProfessional,
        timeSlotId: data.timeSlotId,
      }

      if (appointmentId) {
        await api.put(`/appointments/${appointmentId}`, payload)

        alert('Agendamento atualizado com sucesso! ✏️')
      } else {
        await createAppointmentMutation.mutateAsync(payload)
        alert('Agendamento criado com sucesso! ✅')
      }

      reset()

      navigate('/appointments')
    } catch (error: any) {
      console.error(error?.response?.data)
      alert('Erro ao salvar agendamento')
    }
  }

  const handleDeleteAppointment = async () => {
    if (!appointmentId) return
    if (!window.confirm('Deseja realmente excluir este agendamento?')) return
    try {
      await api.delete(`/appointments/${appointmentId}`)
      alert('Agendamento excluído!')
      navigate('/appointments')
    } catch (err) {
      console.error(err)
      alert('Erro ao excluir agendamento')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{appointmentId ? 'Editar Consulta' : 'Nova Consulta'}</h2>

      <input placeholder="Nome do paciente" {...register('name')} />
      {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

      <input placeholder="Cartão do SUS" {...register('sus_card')} />
      {errors.sus_card && (
        <p style={{ color: 'red' }}>{errors.sus_card.message}</p>
      )}

      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
      >
        <option value="">Selecione a especialidade</option>
        {specialtiesQuery.data?.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        {...register('professionalId')}
        value={selectedProfessional}
        onChange={(e) => setSelectedProfessional(e.target.value)}
        disabled={!selectedSpecialty}
      >
        <option value="">Selecione o profissional</option>
        {professionalsQuery.data?.map((professional) => (
          <option key={professional.id} value={professional.id}>
            {professional.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        disabled={!selectedProfessional}
      />

      <select {...register('timeSlotId')} disabled={!selectedDate}>
        <option value="">Selecione o horário</option>
        {slotsQuery.data?.map((slot) => (
          <option key={slot.id} value={slot.id}>
            {slot.time}
          </option>
        ))}
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Agendar Consulta'}
      </button>

      {appointmentId && (
        <button
          type="button"
          onClick={handleDeleteAppointment}
          style={{ marginLeft: 10, backgroundColor: 'red', color: 'white' }}
        >
          Excluir
        </button>
      )}
    </form>
  )
}
