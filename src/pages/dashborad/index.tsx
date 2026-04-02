/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <div
      style={{
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
          Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
          Visão geral do sistema de saúde
        </p>
      </header>

      {/* GRID DE STATS - 2 colunas no mobile, 4 no desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Card
          title="Total Consultas"
          value={stats.appointments}
          icon="📅"
          color="#3b82f6"
        />
        <Card
          title="Profissionais"
          value={stats.professionals}
          icon="👨‍⚕️"
          color="#10b981"
        />
        <Card
          title="Pacientes"
          value={stats.patients}
          icon="👥"
          color="#8b5cf6"
        />
        <Card
          title="Hoje"
          value={todayAppointments.length}
          icon="🔔"
          color="#f59e0b"
        />
      </div>

      {/* ALERTA DE HORÁRIOS LIVRES */}
      {todayAppointments.length < 5 && (
        <div
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            background: '#fffbeb',
            border: '1px solid #fef3c7',
            borderRadius: '12px',
            color: '#92400e',
            fontSize: '0.875rem',
          }}
        >
          <span>⚠️</span> <strong>Atenção:</strong> Muitos horários livres hoje.
          Considere abrir novos encaixes.
        </div>
      )}

      {/* SEÇÕES LADO A LADO NO DESKTOP */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        <Section title="Consultas de Hoje">
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {todayAppointments.length === 0 ? (
              <p
                style={{
                  textAlign: 'center',
                  color: '#94a3b8',
                  padding: '2rem',
                }}
              >
                Sem agendamentos para hoje.
              </p>
            ) : (
              <MobileTable data={todayAppointments} />
            )}
          </div>
        </Section>

        <Section title="Estatística Semanal">
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '200px',
            }}
          >
            {Object.entries(weekStats).map(([day, value]) => (
              <div
                key={day}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    height: `${Math.max(value * 15, 5)}px`, // Altura mínima de 5px
                    width: '60%',
                    maxWidth: '30px',
                    background:
                      day === 'Dom' || day === 'Sáb' ? '#cbd5e1' : '#3b82f6',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: '#64748b',
                  }}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Próximos Atendimentos">
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflowX: 'auto',
          }}
        >
          <Table data={nextAppointments} />
        </div>
      </Section>
    </div>
  )
}

function Card({ title, value, icon, color }: any) {
  return (
    <div
      style={{
        background: 'white',
        padding: '1.25rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
          }}
        />
      </div>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#64748b',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </span>
      <strong style={{ fontSize: '1.5rem', color: '#1e293b' }}>{value}</strong>
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
    <div style={{ overflowX: 'auto' }}>
      <table
        width="100%"
        style={{ borderCollapse: 'collapse', textAlign: 'left' }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
            <th
              style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}
            >
              DATA/HORA
            </th>
            <th
              style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}
            >
              PACIENTE
            </th>
            <th
              style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}
            >
              PROFISSIONAL
            </th>
            <th
              style={{ padding: '12px', fontSize: '0.8rem', color: '#64748b' }}
            >
              STATUS
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((appointment: any) => (
            <tr
              key={appointment.id}
              style={{ borderBottom: '1px solid #f8fafc' }}
            >
              <td style={{ padding: '12px', fontSize: '0.875rem' }}>
                <strong>
                  {new Date(appointment.dateTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </strong>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {new Date(appointment.dateTime).toLocaleDateString('pt-BR')}
                </div>
              </td>
              <td
                style={{
                  padding: '12px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                {appointment.patient?.name}
              </td>
              <td
                style={{
                  padding: '12px',
                  fontSize: '0.875rem',
                  color: '#475569',
                }}
              >
                {appointment.professional?.name}
              </td>
              <td style={{ padding: '12px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    fontWeight: 600,
                  }}
                >
                  {statusLabel[appointment.status as AppointmentStatus]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MobileTable({ data }: { data: Appointment[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {data.map((appt: any) => (
        <div
          key={appt.id}
          style={{
            padding: '10px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              {appt.patient?.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {appt.professional?.name} •{' '}
              {new Date(appt.dateTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              padding: '4px 8px',
              borderRadius: '99px',
              background: appt.status === 'CONFIRMED' ? '#dcfce7' : '#f1f5f9',
              color: appt.status === 'CONFIRMED' ? '#166534' : '#475569',
              fontWeight: 700,
            }}
          >
            {statusLabel[appt.status as AppointmentStatus]}
          </span>
        </div>
      ))}
    </div>
  )
}
