import { useEffect, useState } from 'react'
import { api } from '../../api/api'
import type { Appointment } from '../../types'

type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'DONE' | 'CANCELED'

const statusLabel: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Agendado',
  CONFIRMED: 'Confirmado',
  DONE: 'Realizado',
  CANCELED: 'Cancelado',
}

export function Dashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    professionals: 0,
    patients: 0,
  })

  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [nextAppointments, setNextAppointments] = useState<Appointment[]>([])
  const [weekStats, setWeekStats] = useState<Record<string, number>>({})

  useEffect(() => {
    async function loadData() {
      try {
        const [appointmentsRes, professionalsRes, patientsRes] =
          await Promise.all([
            api.get('/appointments'),
            api.get('/professionals'),
            api.get('/patients'),
          ])

        const appointments = appointmentsRes.data

        // HOJE (corrigido timezone)
        const todayDate = new Date()
        todayDate.setHours(0, 0, 0, 0)
        const today = todayDate.toLocaleDateString('sv-SE')

        const todayList = appointments.filter((a: Appointment) => {
          const d = new Date(a.dateTime)
          return d.toLocaleDateString('sv-SE') === today
        })

        // PRÓXIMOS 5
        const now = new Date()
        const next = appointments
          .filter((a: Appointment) => {
            const d = new Date(a.dateTime)
            return d.getTime() > now.getTime()
          })
          .sort(
            (a: Appointment, b: Appointment) =>
              new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
          )
          .slice(0, 5)

        // ESTATÍSTICA SEMANAL
        const week: Record<string, number> = {
          Dom: 0,
          Seg: 0,
          Ter: 0,
          Qua: 0,
          Qui: 0,
          Sex: 0,
          Sáb: 0,
        }

        const start = new Date()
        start.setHours(0, 0, 0, 0)
        start.setDate(start.getDate() - start.getDay())

        const end = new Date(start)
        end.setDate(end.getDate() + 7)

        appointments.forEach((a: Appointment) => {
          const d = new Date(a.dateTime)

          if (d >= start && d < end) {
            const day = d.getDay()
            const map = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
            week[map[day]]++
          }
        })

        setStats({
          appointments: appointments.length,
          professionals: professionalsRes.data.length,
          patients: patientsRes.data.length,
        })

        setTodayAppointments(todayList)
        setNextAppointments(next)
        setWeekStats(week)
      } catch (error) {
        console.error('Erro dashboard', error)
      }
    }

    loadData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <div style={{ display: 'flex', gap: 20 }}>
        <Card title="Agendamentos" value={stats.appointments} />
        <Card title="Profissionais" value={stats.professionals} />
        <Card title="Pacientes" value={stats.patients} />
        <Card title="Hoje" value={todayAppointments.length} />
      </div>

      <Section title="Agendamentos de Hoje">
        {todayAppointments.length === 0 ? (
          <p>Sem agendamentos hoje</p>
        ) : (
          <Table data={todayAppointments} />
        )}
      </Section>

      <Section title="Próximos 5 atendimentos">
        <Table data={nextAppointments} />
      </Section>

      <Section title="Agendamentos da semana">
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(weekStats).map(([day, value]) => (
            <div key={day}>
              <div
                style={{
                  height: value * 10,
                  width: 30,
                  background: '#3b82f6',
                }}
              />
              <small>{day}</small>
            </div>
          ))}
        </div>
      </Section>

      {todayAppointments.length < 5 && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: '#fef3c7',
            borderRadius: 6,
          }}
        >
          ⚠️ Muitos horários livres hoje
        </div>
      )}
    </div>
  )
}

function Card({ title, value }: any) {
  return (
    <div
      style={{
        background: '#f3f4f6',
        padding: 20,
        borderRadius: 8,
        minWidth: 150,
      }}
    >
      <h4>{title}</h4>
      <strong style={{ fontSize: 24 }}>{value}</strong>
    </div>
  )
}

function Section({ title, children }: any) {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

function Table({ data }: { data: Appointment[] }) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Hora</th>
          <th>Paciente</th>
          <th>Profissional</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map((appointment: any) => (
          <tr key={appointment.id}>
            <td>
              {new Date(appointment.dateTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </td>

            <td>{appointment.patient?.name}</td>

            <td>{appointment.professional?.name}</td>

            <td>{statusLabel[appointment.status as AppointmentStatus]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
