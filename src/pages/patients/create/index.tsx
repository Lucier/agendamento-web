import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { api } from '../../../api/api'
import {
  createPatientSchema,
  type CreatePatientFormData,
} from '../../../schemas/patient.schema'

export function PatientForm() {
  const navigate = useNavigate()
  const { id } = useParams() // pega id da URL
  const isEditing = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePatientFormData>({
    resolver: zodResolver(createPatientSchema),
  })

  // Carrega dados do paciente se estivermos editando
  useEffect(() => {
    if (!id) return

    async function loadPatient() {
      try {
        const response = await api.get<CreatePatientFormData>(`/patients/${id}`)
        reset(response.data)
      } catch (error) {
        console.error('Erro ao carregar paciente:', error)
      }
    }

    loadPatient()
  }, [id, reset])

  async function handleSavePatient(data: CreatePatientFormData) {
    try {
      if (isEditing) {
        await api.patch(`/patients/${id}`, data)
        alert('Paciente atualizado com sucesso!')
      } else {
        await api.post('/patients/new', data)
        alert('Paciente criado com sucesso!')
      }

      navigate('/patients')
    } catch (error) {
      console.error('Erro ao salvar paciente:', error)
      alert('Erro ao salvar paciente. Verifique os dados e tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSavePatient)}>
      <h2>{isEditing ? 'Editar Paciente' : 'Novo Paciente'}</h2>

      <div>
        <label>Nome</label>
        <input placeholder="Nome do paciente" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>CPF</label>
        <input placeholder="CPF do paciente" {...register('sus_card')} />
        {errors.sus_card && (
          <p style={{ color: 'red' }}>{errors.sus_card.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )
}

export default PatientForm
