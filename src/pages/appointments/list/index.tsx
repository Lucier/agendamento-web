import { useNavigate } from 'react-router-dom'
import { api } from '../../../api/api'
import { useAppointments } from '../../../hooks/useAppointments.hook'

export function AppointmentList() {
  const navigate = useNavigate()
  const { appointmentsQuery, deleteAppointmentMutation } = useAppointments()

  const handleEdit = (id: string) => {
    navigate(`/appointments/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseja realmente excluir este agendamento?')) return

    try {
      await deleteAppointmentMutation(id)
    } catch (error) {
      console.error(error)
      alert('Erro ao excluir')
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status })
      appointmentsQuery.refetch()
    } catch (error) {
      console.error(error)
      alert('Erro ao atualizar status')
    }
  }

  if (appointmentsQuery.isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h2>Agendamentos</h2>

      <button onClick={() => navigate('/appointments/new')}>
        Novo Agendamento
      </button>

      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>SUS</th>
            <th>Profissional</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {appointmentsQuery.data?.map((appointment: any) => (
            <tr key={appointment.id}>
              <td>{appointment.patient?.name}</td>
              <td>{appointment.patient?.sus_card}</td>
              <td>{appointment.professional?.name}</td>

              <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>

              <td>
                {new Date(appointment.dateTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>

              <td>{appointment.status}</td>

              <td>
                <button onClick={() => handleEdit(appointment.id)}>
                  Editar
                </button>

                <button
                  onClick={() =>
                    handleUpdateStatus(appointment.id, 'CONFIRMED')
                  }
                >
                  Confirmar
                </button>

                <button
                  onClick={() => handleUpdateStatus(appointment.id, 'DONE')}
                >
                  Realizado
                </button>

                <button
                  onClick={() => handleUpdateStatus(appointment.id, 'CANCELED')}
                  style={{ color: 'orange' }}
                >
                  Cancelar
                </button>

                <button
                  onClick={() => handleDelete(appointment.id)}
                  style={{ marginLeft: 8, color: 'red' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
