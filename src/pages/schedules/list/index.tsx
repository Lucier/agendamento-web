import { useNavigate } from 'react-router-dom'
import { useSchedules } from '../../../hooks/schedule.hook'
import { api } from '../../../api/api'

export default function ScheduleList() {
  const { data, refetch } = useSchedules() // refetch para atualizar após exclusão
  const navigate = useNavigate()

  async function handleDelete(scheduleId: string) {
    const confirmDelete = window.confirm(
      'Deseja realmente excluir este agendamento?',
    )
    if (!confirmDelete) return

    try {
      await api.delete(`/schedules/${scheduleId}`)
      alert('Agendamento excluído!')
      refetch() // atualiza a lista
    } catch (error) {
      console.error('Erro ao excluir horário', error)
      alert('Erro ao excluir agendamento')
    }
  }

  function handleEdit(scheduleId: string) {
    navigate(`/schedules/edit/${scheduleId}`)
  }

  function handleCreate() {
    navigate('/schedules/new')
  }

  return (
    <div>
      <h1>Schedules</h1>
      <button onClick={handleCreate} style={{ marginBottom: 10 }}>
        Novo Agendamento
      </button>

      <table>
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.professional?.name}</td>
              <td>
                {new Date(schedule.date).toLocaleDateString('pt-BR', {
                  timeZone: 'UTC',
                })}
              </td>
              <td>
                {schedule.timeSlots?.map((slot) => slot.time).join(' | ')}
              </td>
              <td>
                <button onClick={() => handleEdit(schedule.id)}>Editar</button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  style={{
                    marginLeft: 5,
                    backgroundColor: 'red',
                    color: 'white',
                  }}
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
