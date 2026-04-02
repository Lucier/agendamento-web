/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft, LuClock, LuSave, LuTrash2 } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import { useProfessionals } from '../../../hooks/useProfessional.hook'
import {
  createScheduleSchema,
  type CreateScheduleFormData,
} from '../../../schemas/schedule.schema'

import * as S from './style'

export function ScheduleForm() {
  const navigate = useNavigate()
  const { id: scheduleId } = useParams<{ id: string }>()
  const { data: professionals } = useProfessionals()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateScheduleFormData>({
    resolver: zodResolver(createScheduleSchema),
  })

  useEffect(() => {
    if (scheduleId) {
      api.get(`/schedules/${scheduleId}`).then((res) => {
        const schedule = res.data
        setValue('professionalId', schedule.professionalId)
        setValue('date', new Date(schedule.date).toISOString().split('T')[0])
        setValue('start', schedule.timeSlots?.[0]?.time || '')
        setValue(
          'end',
          schedule.timeSlots?.[schedule.timeSlots.length - 1]?.time || '',
        )
      })
    }
  }, [scheduleId, setValue])

  async function handleSaveSchedule(data: CreateScheduleFormData) {
    try {
      if (scheduleId) {
        await api.put(`/schedules/${scheduleId}`, data)
        alert('Horário atualizado com sucesso!')
      } else {
        await api.post('/schedules/new', data)
        alert('Novo horário criado!')
      }
      navigate('/schedules')
    } catch (error) {
      alert('Erro ao salvar horário.')
    }
  }

  async function handleDeleteSchedule() {
    if (!window.confirm('Deseja realmente excluir este agendamento?')) return
    try {
      await api.delete(`/schedules/${scheduleId}`)
      navigate('/schedules')
    } catch (error) {
      alert('Erro ao excluir.')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <button onClick={() => navigate('/schedules')}>
          <LuArrowLeft size={20} /> Voltar
        </button>
        <h2>{scheduleId ? 'Editar Horário' : 'Novo Horário'}</h2>
      </S.Header>

      <S.Card>
        <form onSubmit={handleSubmit(handleSaveSchedule)}>
          <S.FormGroup>
            <label>Profissional</label>
            <select {...register('professionalId')}>
              <option value="">Selecione o médico...</option>
              {professionals?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.professionalId && (
              <S.ErrorMessage>{errors.professionalId.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Data da Agenda</label>
            <input type="date" {...register('date')} />
            {errors.date && (
              <S.ErrorMessage>{errors.date.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#64748b',
              marginBottom: '0.5rem',
            }}
          >
            <LuClock size={16} />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Intervalo de Atendimento
            </span>
          </div>

          <S.TimeGrid>
            <S.FormGroup>
              <label>Início</label>
              <input type="time" {...register('start')} />
            </S.FormGroup>
            <S.FormGroup>
              <label>Término</label>
              <input type="time" {...register('end')} />
            </S.FormGroup>
          </S.TimeGrid>

          <S.ActionArea>
            {scheduleId && (
              <S.Button
                type="button"
                variant="danger"
                onClick={handleDeleteSchedule}
                style={{ marginRight: 'auto' }}
              >
                <LuTrash2 size={18} /> Excluir
              </S.Button>
            )}

            <S.Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/schedules')}
            >
              Cancelar
            </S.Button>

            <S.Button type="submit" disabled={isSubmitting}>
              <LuSave size={18} />
              {isSubmitting ? 'Salvando...' : 'Salvar Agenda'}
            </S.Button>
          </S.ActionArea>
        </form>
      </S.Card>
    </S.Container>
  )
}
