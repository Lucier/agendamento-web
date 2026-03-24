import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import {
  createProfessionalSchema,
  type CreateProfessionalFormData,
} from '../../../schemas/professional.schema'

type Specialty = {
  id: string
  name: string
}

export function ProfessionalForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [specialties, setSpecialties] = useState<Specialty[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProfessionalFormData>({
    resolver: zodResolver(createProfessionalSchema),
  })

  // Carregar lista de especialidades para o select
  useEffect(() => {
    async function loadSpecialties() {
      try {
        const response = await api.get<Specialty[]>('/specialties')
        setSpecialties(response.data)
      } catch (error) {
        console.error('Erro ao carregar especialidades:', error)
      }
    }

    loadSpecialties()
  }, [])

  // Carregar dados do profissional se estivermos editando
  useEffect(() => {
    if (!id) return

    async function loadProfessional() {
      try {
        const response = await api.get<CreateProfessionalFormData>(
          `/professionals/${id}`,
        )
        reset(response.data)
      } catch (error) {
        console.error('Erro ao carregar profissional:', error)
      }
    }

    loadProfessional()
  }, [id, reset])

  async function handleSaveProfessional(data: CreateProfessionalFormData) {
    try {
      if (isEditing) {
        await api.patch(`/professionals/${id}`, data)
        alert('Médico atualizado com sucesso!')
      } else {
        await api.post('/professionals/new', data)
        alert('Médico criado com sucesso!')
      }

      navigate('/professionals')
    } catch (error) {
      console.error('Erro ao salvar profissional:', error)
      alert('Erro ao salvar. Verifique os dados e tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveProfessional)}>
      <h2>{isEditing ? 'Editar Médico' : 'Novo Médico'}</h2>

      <div>
        <label>Nome do médico</label>
        <input placeholder="Nome" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Especialidade</label>
        <select {...register('specialtyId')}>
          <option value="">Selecione uma especialidade</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.specialtyId && (
          <p style={{ color: 'red' }}>{errors.specialtyId.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}

export default ProfessionalForm
