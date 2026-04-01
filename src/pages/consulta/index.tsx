/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { api } from '../../api/api'

import { motion } from 'framer-motion'
import { IoMdHelpCircle } from 'react-icons/io'
import {
  LuArrowLeft,
  LuCalendar,
  LuMapPin,
  LuSearch,
  LuX,
} from 'react-icons/lu'

import { useNavigate } from 'react-router-dom'
import { formatarData } from '../../helper/Utils'
import * as S from './style'

type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'DONE' | 'CANCELED'

const statusLabel: Record<AppointmentStatus, string> = {
  SCHEDULED: 'Agendado',
  CONFIRMED: 'Confirmado',
  DONE: 'Realizado',
  CANCELED: 'Cancelado',
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export function Consulta() {
  const [sus, setSus] = useState('')
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

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

  const handleClear = () => {
    setSus('')
    setAppointments([])
  }

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        background: 'inherit',
        minHeight: '100vh',
      }}
    >
      {/* App Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          background: '#f5f7f8',
          borderBottom: '1px solid rgba(0,92,173,0.1)',
        }}
      >
        <LuArrowLeft
          size={24}
          style={{ color: S.theme.colors.primary, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <h2
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '1.125rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Minhas Consultas
        </h2>
        <div style={{ width: 24 }} />
      </header>

      {/* BUSCA */}
      <div style={{ padding: '1.5rem 1rem', background: 'white' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#64748b',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          NÚMERO DO CARTÃO SUS
        </span>
        <S.SearchBar>
          <input
            type="text"
            inputMode="numeric"
            maxLength={15}
            placeholder="Digite o número do SUS"
            value={sus}
            onChange={(e) => setSus(e.target.value)}
          />
          {appointments.length === 0 ? (
            <button onClick={handleSearch} disabled={loading}>
              <LuSearch size={20} />
            </button>
          ) : (
            <button onClick={handleClear} type="button">
              <LuX size={20} />
            </button>
          )}
        </S.SearchBar>
      </div>

      {/* TABS */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '1rem',
          overflowX: 'auto',
        }}
      >
        <button
          style={{
            background: S.theme.colors.primary,
            color: 'white',
            padding: '0.5rem 1.25rem',
            borderRadius: '99px',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          Todos
        </button>

        {['Ativos', 'Histórico'].map((tab) => (
          <button
            key={tab}
            style={{
              background: 'white',
              color: '#64748b',
              padding: '0.5rem 1.25rem',
              borderRadius: '99px',
              border: '1px solid #e2e8f0',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
            onClick={() => console.log(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTEÚDO COM ANIMAÇÃO */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ padding: '0 1rem 5rem' }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1rem 0' }}>
          Agendamentos
        </h3>
        {loading && <p>⏳ Buscando...</p>}

        {!loading && appointments.length === 0 && (
          <p style={{ color: '#64748b' }}>Nenhum agendamento encontrado</p>
        )}

        {!loading &&
          appointments
            .slice()
            .sort((a, b) => {
              const dataA = new Date(a.dateTime).getTime()
              const dataB = new Date(b.dateTime).getTime()
              return dataB - dataA
            })
            .map((a) => (
              <S.AppointmentCard variants={itemVariants} active>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        color: '#94a3b8',
                        fontWeight: 700,
                      }}
                    >
                      PACIENTE
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>
                      {a.patient?.name.toUpperCase() || 'Desconhecido'}
                    </h4>
                  </div>
                  <S.StatusBadge variant="confirmado">
                    {statusLabel[a.status as AppointmentStatus]}
                  </S.StatusBadge>
                </div>

                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.875rem',
                      color: '#475569',
                    }}
                  >
                    <LuCalendar size={18} color={S.theme.colors.primary} />
                    <span>{formatarData(a.dateTime)}</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.875rem',
                      color: '#475569',
                    }}
                  >
                    <LuMapPin size={18} color={S.theme.colors.primary} />
                    <span>UBS José Williams</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJn0K1TU63_CDTKLigZwtzA3iaWZ2dbozIE6Ors_YYgnn_tdDrcmpP3Yyu-YZU27lZVjPV6znXvh08O4HNBVzbhr8T6t0qCfAZcwbxfjdR89PkJZH4SED17J1cV_PiBRKhpwSFMlT4IsyGIfc636_gk5P5Gss-IVfA8Do-4uAm8SZyCYzY6ic249xxkDE0gLcoAp9EDWpJ9c4e6hS4niiLCIEOCXEMg97SgRSd0Z_KruZHGuKSdjScuPlC-PWJm7OTOFaHEC74CUob"
                      style={{ width: 32, height: 32, borderRadius: '50%' }}
                      alt="Dr"
                    />
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>
                      Dr. {a.professional?.name || 'Desconhecido'}
                    </span>
                  </div>
                </div>
              </S.AppointmentCard>
            ))}
        <button
          style={{
            width: '100%',
            padding: '1rem',
            background: 'rgba(0, 92, 173, 0.05)',
            border: '2px dashed rgba(0, 92, 173, 0.2)',
            borderRadius: '1rem',
            color: S.theme.colors.primary,
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1rem',
          }}
        >
          <IoMdHelpCircle size={18} /> Não encontrou seu registro? Suporte
        </button>
      </motion.main>
    </div>
  )
}
