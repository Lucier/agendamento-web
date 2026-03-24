import { useEffect, useState } from 'react'
import { api } from '../../api/api'

type DashboardData = {
  appointments: number
  professionals: number
  patients: number
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    appointments: 0,
    professionals: 0,
    patients: 0,
  })

  useEffect(() => {
    async function loadData() {
      try {
        const [appointments, professionals, patients] = await Promise.all([
          api.get('/appointments'),
          api.get('/professionals'),
          api.get('/patients'),
        ])

        setData({
          appointments: appointments.data.length,
          professionals: professionals.data.length,
          patients: patients.data.length,
        })
      } catch (error) {
        console.error('Erro ao carregar dashboard', error)
      }
    }

    loadData()
  }, [])

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>

      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Agendamentos</h3>
          <strong>{data.appointments}</strong>
        </div>

        <div style={styles.card}>
          <h3>Profissionais</h3>
          <strong>{data.professionals}</strong>
        </div>

        <div style={styles.card}>
          <h3>Pacientes</h3>
          <strong>{data.patients}</strong>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
  },
  cards: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    background: '#f3f4f6',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '200px',
  },
}
