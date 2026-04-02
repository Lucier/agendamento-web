/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LuCalendar,
  LuClock,
  LuPencil,
  LuPlus,
  LuStethoscope,
  LuTrash2,
} from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { useSchedules } from '../../../hooks/useSchedule.hook'
import * as S from './style'

export default function ScheduleList() {
  const { data, refetch } = useSchedules()
  const navigate = useNavigate()

  async function handleDelete(scheduleId: string) {
    if (!window.confirm('Deseja realmente excluir esta agenda?')) return

    try {
      await api.delete(`/schedules/${scheduleId}`)
      refetch()
    } catch (error) {
      alert('Erro ao excluir agendamento')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <h1>Agendas de Trabalho</h1>
        <S.AddButton onClick={() => navigate('/schedules/new')}>
          <LuPlus size={20} />
          Nova Agenda
        </S.AddButton>
      </S.Header>

      <S.ScheduleGrid>
        {data?.map((schedule) => (
          <S.Card key={schedule.id}>
            <S.CardHeader>
              <div className="icon">
                <LuStethoscope size={24} />
              </div>
              <div className="title-area">
                <strong>{schedule.professional?.name}</strong>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '2px',
                  }}
                >
                  <LuCalendar size={14} color="#3b82f6" />
                  <span>
                    {new Date(schedule.date).toLocaleDateString('pt-BR', {
                      timeZone: 'UTC',
                    })}
                  </span>
                </div>
              </div>
            </S.CardHeader>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#64748b',
              }}
            >
              <LuClock size={16} />
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Horários Disponíveis:
              </span>
            </div>

            <S.SlotsContainer>
              {schedule.timeSlots?.length > 0 ? (
                schedule.timeSlots.map((slot: any) => (
                  <div key={slot.id} className="slot-badge">
                    {slot.time}
                  </div>
                ))
              ) : (
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    fontStyle: 'italic',
                  }}
                >
                  Nenhum horário cadastrado.
                </span>
              )}
            </S.SlotsContainer>

            <S.ActionArea>
              <button
                className="edit-btn"
                onClick={() => navigate(`/schedules/edit/${schedule}`)}
              >
                <LuPencil size={16} /> Editar
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(schedule.id)}
              >
                <LuTrash2 size={16} /> Excluir
              </button>
            </S.ActionArea>
          </S.Card>
        ))}
      </S.ScheduleGrid>

      {data?.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
          <LuCalendar
            size={48}
            style={{ opacity: 0.2, marginBottom: '1rem' }}
          />
          <p>Nenhuma agenda configurada no momento.</p>
        </div>
      )}
    </S.Container>
  )
}
