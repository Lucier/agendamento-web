/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { LuPencil, LuPlus, LuSearch, LuTrash2, LuUser } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { usePatients } from '../../../hooks/usePatients.hook'
import * as S from './style'

export default function PatientList() {
  const { data, isLoading, deletePatient } = usePatients()
  const [searchName, setSearchName] = useState('')
  const [searchSus_Card, setSearchSus_Card] = useState('')
  const navigate = useNavigate()

  const filteredPatients = data?.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchName.toLowerCase()) &&
      patient.sus_card.includes(searchSus_Card),
  )
  async function handleDelete(id: string) {
    // 1. Alerta de Confirmação
    const result = await Swal.fire({
      title: 'Excluir este paciente?',
      text: 'Esta ação não poderá ser desfeita e os dados do paciente serão removidos.',
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
        title: 'Excluindo paciente...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      await deletePatient(id)

      // 3. Feedback de Sucesso
      await Swal.fire({
        title: 'Paciente excluído!',
        text: 'O registro foi removido com sucesso.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error('Erro ao excluir paciente', error)

      // 4. Feedback de Erro
      Swal.fire({
        title: 'Não foi possível excluir',
        text: 'Erro ao excluir. O paciente pode ter vínculos ativos ou problemas de conexão.',
        icon: 'error',
        confirmButtonColor: '#3b82f6',
      })
    }
  }

  if (isLoading)
    return (
      <S.Container>
        <p>Carregando pacientes...</p>
      </S.Container>
    )

  return (
    <S.Container>
      <S.Header>
        <h1>Pacientes</h1>
        <S.AddButton onClick={() => navigate('/patients/new')}>
          <LuPlus size={20} />
          Novo Paciente
        </S.AddButton>
      </S.Header>

      <S.SearchBar>
        <div style={{ position: 'relative' }}>
          <LuSearch
            style={{
              position: 'absolute',
              left: 12,
              top: 13,
              color: '#94a3b8',
            }}
            size={16}
          />
          <input
            style={{ paddingLeft: '36px', width: '100%' }}
            placeholder="Buscar por nome..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <input
          placeholder="Buscar por CPF / SUS"
          value={searchSus_Card}
          onChange={(e) => setSearchSus_Card(e.target.value)}
        />
      </S.SearchBar>

      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cartão SUS</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients?.map((item) => (
              <tr key={item.id}>
                <td data-label="Nome">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <LuUser size={16} color="#3b82f6" />
                    <strong>{item.name}</strong>
                  </div>
                </td>
                <td data-label="SUS">{item.sus_card}</td>
                <td>
                  <S.ActionButtons>
                    <button
                      className="edit"
                      onClick={() => navigate(`/patients/${item.id}`)}
                    >
                      <LuPencil size={14} /> Editar
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <LuTrash2 size={14} /> Excluir
                    </button>
                  </S.ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </S.Table>

        {filteredPatients?.length === 0 && (
          <div
            style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}
          >
            Nenhum paciente encontrado com esses filtros.
          </div>
        )}
      </S.TableContainer>
    </S.Container>
  )
}
