import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { useProfessionals } from '../../../hooks/useProfessional.hook'
import {
  createScheduleSchema,
  type CreateScheduleFormData,
} from '../../../schemas/schedule.schema'

export function ScheduleForm() {
  const navigate = useNavigate()
  const { id: scheduleId } = useParams<{ id: string }>() // obtém o id da rota, se houver

  const { data: professionals } = useProfessionals()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(createScheduleSchema),
  })

  // Carregar dados do schedule se estiver editando
  useEffect(() => {
    if (scheduleId) {
      api.get(`/schedules/${scheduleId}`).then((res) => {
        const schedule = res.data
        // Preenche o formulário com os dados existentes
        setValue('professionalId', schedule.professionalId)
        setValue('date', new Date(schedule.date).toISOString().split('T')[0])
        setValue('start', schedule.timeSlots?.[0]?.time || '')
        setValue('end', schedule.timeSlots?.[1]?.time || '')
      })
    }
  }, [scheduleId, setValue])

  async function handleSaveSchedule(data: CreateScheduleFormData) {
    try {
      if (scheduleId) {
        // Atualiza schedule existente
        await api.put(`/schedules/${scheduleId}`, data)
        alert('Agendamento atualizado!')
      } else {
        // Cria novo schedule
        await api.post('/schedules/new', data)
        alert('Agendamento criado!')
      }

      reset()
      navigate('/schedules')
    } catch (error) {
      console.error('Erro ao salvar horário', error)
    }
  }

  async function handleDeleteSchedule() {
    if (!scheduleId) return

    const confirmDelete = window.confirm(
      'Deseja realmente excluir este agendamento?',
    )
    if (!confirmDelete) return

    try {
      await api.delete(`/schedules/${scheduleId}`)
      alert('Agendamento excluído!')
      navigate('/schedules')
    } catch (error) {
      console.error('Erro ao excluir horário', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveSchedule)}>
      <h2>{scheduleId ? 'Editar horário' : 'Novo horário'}</h2>

      <select {...register('professionalId')}>
        <option value="">Selecione o profissional...</option>
        {professionals?.map((professional) => (
          <option key={professional.id} value={professional.id}>
            {professional.name}
          </option>
        ))}
      </select>
      {errors.professionalId && (
        <p style={{ color: 'red' }}>{errors.professionalId.message}</p>
      )}

      <input type="date" {...register('date')} />
      {errors.date && <p style={{ color: 'red' }}>{errors.date.message}</p>}

      <input type="time" {...register('start')} />
      <input type="time" {...register('end')} />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>

      {/* Mostrar botão de excluir apenas se estiver editando */}
      {scheduleId && (
        <button
          type="button"
          onClick={handleDeleteSchedule}
          style={{ marginLeft: 10, backgroundColor: 'red', color: 'white' }}
        >
          Excluir
        </button>
      )}
    </form>
  )
}
