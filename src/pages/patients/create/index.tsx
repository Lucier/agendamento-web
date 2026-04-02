/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft, LuSave, LuUser } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'

import { api } from '../../../api/api'
import {
  createPatientSchema,
  type CreatePatientFormData,
} from '../../../schemas/patient.schema'

import * as S from './style' // Importando os estilos

export default function PatientForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePatientFormData>({
    resolver: zodResolver(createPatientSchema),
  })

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
        alert('Paciente atualizado com sucesso! ✏️')
      } else {
        await api.post('/patients/new', data)
        alert('Paciente criado com sucesso! ✅')
      }
      navigate('/patients')
    } catch (error) {
      alert('Erro ao salvar paciente. Verifique os dados.')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#3b82f6',
          }}
          onClick={() => navigate('/patients')}
        >
          <LuArrowLeft size={20} />
          <span style={{ fontWeight: 600 }}>Voltar</span>
        </div>
        <h2>{isEditing ? 'Editar Cadastro' : 'Novo Paciente'}</h2>
        <p>
          Preencha os dados do paciente para {isEditing ? 'atualizar' : 'gerar'}{' '}
          o registro no sistema.
        </p>
      </S.Header>
      <S.Card>
        <form onSubmit={handleSubmit(handleSavePatient)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1.5rem',
              color: '#1e293b',
            }}
          >
            <LuUser size={24} />
            <span style={{ fontWeight: 700 }}>Informações Pessoais</span>
          </div>

          <S.FormGroup>
            <label>Nome Completo</label>
            <input
              placeholder="Ex: João da Silva"
              {...register('name')}
              autoComplete="off"
            />
            {errors.name && (
              <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Cartão SUS / CPF</label>
            <input
              placeholder="000.000.000-00"
              {...register('sus_card')}
              inputMode="numeric"
            />
            {errors.sus_card && (
              <S.ErrorMessage>{errors.sus_card.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.ActionArea>
            <S.Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/patients')}
              disabled={isSubmitting}
            >
              Cancelar
            </S.Button>
            <S.Button type="submit" disabled={isSubmitting}>
              <LuSave size={20} style={{ marginRight: '8px' }} />
              {isSubmitting ? 'Salvando...' : 'Salvar Paciente'}
            </S.Button>
          </S.ActionArea>
        </form>
      </S.Card>
    </S.Container>
  )
}
