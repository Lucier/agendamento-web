import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpecialties } from '../../../hooks/useSpecialties'

export default function SpecialtyList() {
  const { data, isLoading, deleteSpecialty } = useSpecialties()

  const [searchName, setSearchName] = useState('')
  const navigate = useNavigate()

  const filteredSpecielties = data?.filter((specialty) => {
    return specialty.name.toLowerCase().includes(searchName.toLowerCase())
  })

  async function handleDelete(id: string) {
    if (!confirm('Deseja excluir esta especialidade?')) return

    try {
      await deleteSpecialty(id)
      alert('Especialidade excluída com sucesso!')
    } catch (error) {
      alert('Não é possível excluir especialidade vinculada a profissionais.')
    }
    await deleteSpecialty(id)
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Especialidades</h1>

      <button onClick={() => navigate('/specialties/new')}>
        Nova especialidade
      </button>

      <div>
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
          {filteredSpecielties?.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>
                <>
                  <button onClick={() => navigate(`/specialties/${item.id}`)}>
                    Editar
                  </button>

                  <button onClick={() => handleDelete(item.id)}>Excluir</button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
