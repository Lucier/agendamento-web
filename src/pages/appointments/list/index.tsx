/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LuCalendar,
  LuCheck,
  LuClock,
  LuPencil,
  LuPlus,
  LuStethoscope,
  LuTrash2,
  LuX,
} from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../../../api/api'
import { useAppointments } from '../../../hooks/useAppointments.hook'
import * as S from './style'

const statusLabel: Record<string, string> = {
  SCHEDULED: 'Agendado',
  CONFIRMED: 'Confirmado',
  DONE: 'Realizado',
  CANCELED: 'Cancelado',
}

export function AppointmentList() {
  const navigate = useNavigate()
  const { appointmentsQuery, deleteAppointmentMutation } = useAppointments()

  const handleEdit = (id: string) => navigate(`/appointments/${id}`)

  const handleDelete = async (id: string) => {
    // Dispara o alerta de confirmação de exclusão
    const result = await Swal.fire({
      title: 'Excluir agendamento?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Vermelho (padrão de exclusão do seu sistema)
      cancelButtonColor: '#94a3b8', // Cinza (Slate)
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: '#ffffff',
      color: '#1e293b',
    })

    // Se o usuário confirmou a exclusão
    if (result.isConfirmed) {
      try {
        // Mostra um estado de "Deletando..." no botão
        Swal.fire({
          title: 'Excluindo...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        await deleteAppointmentMutation(id)

        // Feedback de sucesso
        await Swal.fire({
          title: 'Excluído!',
          text: 'O agendamento foi removido com sucesso.',
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          timer: 2000, // Fecha sozinho após 1.5s
          showConfirmButton: false,
        })
      } catch (error) {
        console.error(error)

        // Feedback de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o agendamento.',
          icon: 'error',
          confirmButtonColor: '#3b82f6',
        })
      }
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status })
      appointmentsQuery.refetch()
    } catch (error) {
      alert('Erro ao atualizar status')
    }
  }

  if (appointmentsQuery.isLoading)
    return (
      <S.Container>
        <p>Carregando agendamentos...</p>
      </S.Container>
    )

  return (
    <S.Container>
      <S.Header>
        <h2>Gestão de Agendamentos</h2>
        <S.AddButton onClick={() => navigate('/appointments/new')}>
          <LuPlus size={20} /> Novo Agendamento
        </S.AddButton>
      </S.Header>

      <S.AppointmentGrid>
        {appointmentsQuery.data
          ?.slice()
          .sort((a, b) => {
            const dataA = new Date(a.dateTime).getTime()
            const dataB = new Date(b.dateTime).getTime()
            return dataB - dataA
          })
          .map((appointment: any) => (
            <S.Card key={appointment.id}>
              <S.CardHeader>
                <div className="patient-info">
                  <strong>{appointment.patient?.name}</strong>
                  <span>SUS: {appointment.patient?.sus_card}</span>
                </div>
                <S.StatusBadge status={appointment.status}>
                  {statusLabel[appointment.status] || appointment.status}
                </S.StatusBadge>
              </S.CardHeader>

              <S.InfoRow>
                <LuStethoscope size={18} />
                <span>
                  Profissional:{' '}
                  <strong>{appointment.professional?.name}</strong>
                </span>
              </S.InfoRow>

              <div style={{ display: 'flex', gap: '20px' }}>
                <S.InfoRow>
                  <LuCalendar size={18} />
                  <span>
                    {new Date(appointment.dateTime).toLocaleDateString()}
                  </span>
                </S.InfoRow>
                <S.InfoRow>
                  <LuClock size={18} />
                  <span>
                    {new Date(appointment.dateTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </S.InfoRow>
              </div>

              <S.ActionsWrapper>
                <button onClick={() => handleEdit(appointment.id)}>
                  <LuPencil size={14} /> Editar
                </button>

                {appointment.status !== 'CONFIRMED' &&
                  appointment.status !== 'DONE' && (
                    <button
                      className="btn-confirm"
                      onClick={() =>
                        handleUpdateStatus(appointment.id, 'CONFIRMED')
                      }
                    >
                      <LuCheck size={14} /> Confirmar
                    </button>
                  )}

                {appointment.status === 'CONFIRMED' && (
                  <button
                    className="btn-done"
                    onClick={() => handleUpdateStatus(appointment.id, 'DONE')}
                  >
                    <LuCheck size={14} /> Realizado
                  </button>
                )}

                {appointment.status !== 'CANCELED' && (
                  <button
                    style={{ color: '#f59e0b' }}
                    onClick={() =>
                      handleUpdateStatus(appointment.id, 'CANCELED')
                    }
                  >
                    <LuX size={14} /> Cancelar
                  </button>
                )}

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(appointment.id)}
                >
                  <LuTrash2 size={14} />
                </button>
              </S.ActionsWrapper>
            </S.Card>
          ))}
      </S.AppointmentGrid>

      {appointmentsQuery.data?.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '3rem', color: '#64748b' }}>
          Nenhum agendamento encontrado.
        </p>
      )}
    </S.Container>
  )
}
