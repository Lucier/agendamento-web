/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import {
  LuPencil,
  LuPlus,
  LuSearch,
  LuStethoscope,
  LuTrash2,
  LuUser,
} from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { useProfessionals } from '../../../hooks/useProfessional.hook'
import * as S from './style'

export default function ProfessionalList() {
  const { data, isLoading, deleteProfessional } = useProfessionals()
  const [searchName, setSearchName] = useState('')

  const navigate = useNavigate()

  const filteredProfessionals = data?.filter((professional) =>
    professional.name.toLowerCase().includes(searchName.toLowerCase()),
  )

  async function handleDelete(id: string) {
    if (!confirm('Deseja excluir este médico?')) return

    try {
      await deleteProfessional(id)
      alert('Médico excluído com sucesso! ✨')
    } catch (error) {
      alert('Não é possível excluir este médico. Verifique vínculos ativos.')
    }
  }

  if (isLoading) {
    return (
      <S.Container>
        <p style={{ color: '#64748b' }}>Carregando profissionais...</p>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LuStethoscope size={28} color="#3b82f6" />
          <h1>Corpo Clínico</h1>
        </div>
        <S.AddButton onClick={() => navigate('/professionals/new')}>
          <LuPlus size={20} />
          Novo Médico
        </S.AddButton>
      </S.Header>

      <S.SearchSection>
        <div className="input-wrapper">
          <LuSearch
            style={{
              position: 'absolute',
              left: '12px',
              top: '13px',
              color: '#94a3b8',
            }}
            size={18}
          />
          <input
            placeholder="Buscar médico pelo nome..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </S.SearchSection>

      <S.ListContainer>
        {filteredProfessionals?.map((item) => (
          <S.ProfessionalCard key={item.id}>
            <div className="info">
              <div className="avatar">
                <LuUser size={20} />
              </div>
              <div>
                <strong>{item.name}</strong>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.specialty?.name || 'Profissional de Saúde'}
                </div>
              </div>
            </div>

            <S.ActionGroup>
              <button
                className="edit"
                onClick={() => navigate(`/professionals/${item.id}`)}
              >
                <LuPencil size={14} /> Editar
              </button>
              <button className="delete" onClick={() => handleDelete(item.id)}>
                <LuTrash2 size={14} /> Excluir
              </button>
            </S.ActionGroup>
          </S.ProfessionalCard>
        ))}

        {filteredProfessionals?.length === 0 && (
          <div
            style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}
          >
            Nenhum médico encontrado com o nome "{searchName}".
          </div>
        )}
      </S.ListContainer>
    </S.Container>
  )
}
