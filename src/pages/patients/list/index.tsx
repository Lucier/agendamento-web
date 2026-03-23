import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatients } from '../../../hooks/usePatients'

export default function PatientList() {
  const { data, isLoading, deletePatient } = usePatients()
  const [searchName, setSearchName] = useState('')
  const [searchSus_Card, setSearchSus_Card] = useState('')
  const navigate = useNavigate()

  // Filtra pacientes por nome e CPF
  const filteredPatients = data?.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchName.toLowerCase()) &&
      patient.sus_card.includes(searchSus_Card),
  )

  // Excluir paciente
  async function handleDelete(id: string) {
    if (!confirm('Deseja excluir este paciente?')) return

    try {
      await deletePatient(id)
      alert('Paciente excluído com sucesso!')
    } catch (error) {
      alert(
        'Não é possível excluir este paciente. Ele pode estar vinculado a outros registros.',
      )
      console.error(error)
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <h1>Pacientes</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          placeholder="Buscar por CPF"
          value={searchSus_Card}
          onChange={(e) => setSearchSus_Card(e.target.value)}
        />
        <button type="button" onClick={() => navigate('/patients/new')}>
          Novo paciente
        </button>
      </div>

      <form>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CArtão SUS</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sus_card}</td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => navigate(`/patients/${item.id}`)}
                  >
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(item.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </>
  )
}
