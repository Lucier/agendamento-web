import {
  LuCalendarPlus,
  LuCalendarSearch,
  LuInfo,
  LuMapPin,
} from 'react-icons/lu'
import { MdOutlineAdminPanelSettings } from 'react-icons/md' // Pacote Material
import { useNavigate } from 'react-router-dom'
import { SpecialtyCard } from './specialtyCard'
import * as S from './style'

export function Home() {
  const especialidades = [
    { id: 1, title: 'Fazer Agendamento', icon: LuCalendarPlus },
    { id: 2, title: 'Meus Agendamentos', icon: LuCalendarSearch },
  ]

  const navigate = useNavigate()

  const handleOptionClick = (id: number) => {
    if (id === 1) {
      navigate('/appointments/new')
    } else if (id === 2) {
      navigate('/consulta')
    }
  }

  return (
    <>
      <S.GlobalStyle />
      <S.LayoutWrapper>
        <S.Header>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>
                Agendamento SUS
              </h1>
              <MdOutlineAdminPanelSettings
                size={25}
                onClick={() => navigate('/login')}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: 0.9,
              }}
            >
              <LuMapPin size={16} />
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                UBS José Wiliams
              </p>
            </div>
          </div>
        </S.Header>

        <S.MainContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Escolha um serviço
            </h2>
          </div>

          <S.SpecialtyGrid>
            {especialidades.map((esp) => (
              <SpecialtyCard
                key={esp.id}
                icon={esp.icon}
                title={esp.title}
                onClick={() => handleOptionClick(esp.id)}
              />
            ))}
          </S.SpecialtyGrid>

          <S.InfoBanner>
            <LuInfo size={24} style={{ flexShrink: 0 }} />
            <p>
              As vagas são atualizadas diariamente às <strong>07:00</strong>.
              Tente novamente neste horário caso não encontre sua vaga.
            </p>
          </S.InfoBanner>
        </S.MainContent>
      </S.LayoutWrapper>
    </>
  )
}
