import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfessionals } from '../../../hooks/useProfessional.hook'

export default function ProfessionalList() {
  const { data, isLoading, deleteProfessional } = useProfessionals()
  const [searchName, setSearchName] = useState('')
  const navigate = useNavigate()

  // Filtra médicos pelo nome
  const filteredProfessionals = data?.filter((professional) =>
    professional.name.toLowerCase().includes(searchName.toLowerCase()),
  )

  // Excluir profissional
  async function handleDelete(id: string) {
    if (!confirm('Deseja excluir este médico?')) return

    try {
      await deleteProfessional(id)
      alert('Médico excluído com sucesso!')
    } catch (error) {
      alert(
        'Não é possível excluir este médico. Ele pode estar vinculado a outros registros.',
      )
      console.error(error)
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Médicos</h1>

      <button onClick={() => navigate('/professionals/new')}>
        Novo médico
      </button>

      <div style={{ margin: '10px 0' }}>
        <input
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {filteredProfessionals?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button onClick={() => navigate(`/professionals/${item.id}`)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
