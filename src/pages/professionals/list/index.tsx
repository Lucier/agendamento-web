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
import Swal from 'sweetalert2'
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
    // 1. Alerta de Confirmação
    const result = await Swal.fire({
      title: 'Excluir este médico?',
      text: 'Esta ação removerá o profissional do sistema e não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Vermelho para perigo
      cancelButtonColor: '#94a3b8', // Cinza para cancelar
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: '#ffffff',
      color: '#1e293b',
    })

    // Se o usuário desistir, interrompe a função
    if (!result.isConfirmed) return

    try {
      // 2. Feedback de carregamento durante a deleção
      Swal.fire({
        title: 'Removendo profissional...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      await deleteProfessional(id)

      // 3. Feedback de Sucesso (fecha sozinho em 2s)
      await Swal.fire({
        title: 'Médico excluído!',
        text: 'O registro foi removido com sucesso. ✨',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error('Erro ao excluir médico', error)

      // 4. Feedback de Erro
      Swal.fire({
        title: 'Não foi possível excluir',
        text: 'Verifique se este médico possui consultas ou agendas vinculadas antes de tentar novamente.',
        icon: 'error',
        confirmButtonColor: '#3b82f6',
      })
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
