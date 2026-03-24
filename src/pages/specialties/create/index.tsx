import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../api/api'
import {
  createSpecialtySchema,
  type CreateSpecialtyFormData,
} from '../../../schemas/specialty.schema'

export function SpecialtyForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const isEditing = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSpecialtyFormData>({
    resolver: zodResolver(createSpecialtySchema),
  })

  useEffect(() => {
    async function loadSpecialty() {
      if (!id) return

      try {
        const response = await api.get(`/specialties/${id}`)
        reset(response.data)
      } catch (error) {
        console.error('Erro ao carregar especialidade', error)
      }
    }

    loadSpecialty()
  }, [id, reset])

  async function handleSaveSpecialty(data: CreateSpecialtyFormData) {
    try {
      if (isEditing) {
        await api.patch(`/specialties/${id}`, data)
      } else {
        await api.post('/specialties', data)
      }

      navigate('/specialties')
    } catch (error) {
      console.error('Erro ao salvar especialidade:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSaveSpecialty)}>
      <h2>{isEditing ? 'Editar Especialidade' : 'Nova Especialidade'}</h2>

      <input placeholder="Nome da especialidade" {...register('name')} />

      {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}

export default SpecialtyForm
