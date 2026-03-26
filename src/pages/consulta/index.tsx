import { useState } from 'react'
import { api } from '../../api/api'

type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'DONE' | 'CANCELED'

const statusLabel: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Agendado',
  CONFIRMED: 'Confirmado',
  DONE: 'Realizado',
  CANCELED: 'Cancelado',
}

export function Consulta() {
  const [sus, setSus] = useState('')
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    try {
      setLoading(true)

      const { data } = await api.get(`/appointments/sus/${sus}`)
      setAppointments(data)
    } catch (error) {
      alert('Nenhum agendamento encontrado')
      setAppointments([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Consultar Agendamento</h1>

      <input
        placeholder="Digite o número do SUS"
        value={sus}
        onChange={(e) => setSus(e.target.value)}
      />

      <button onClick={handleSearch}>Buscar</button>

      {loading && <p>Buscando...</p>}

      {appointments.length > 0 && (
        <table style={{ marginTop: 20, width: '100%' }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Profissional</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{new Date(a.dateTime).toLocaleDateString()}</td>

                <td>
                  {new Date(a.dateTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>

                <td>{a.professional?.name}</td>

                <td>{statusLabel[a.status as AppointmentStatus]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
