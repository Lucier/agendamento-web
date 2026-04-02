/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft, LuSave, LuStethoscope } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'

import { api } from '../../../api/api'
import {
  createProfessionalSchema,
  type CreateProfessionalFormData,
} from '../../../schemas/professional.schema'

import * as S from './style'

type Specialty = {
  id: string
  name: string
}

export default function ProfessionalForm() {
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
        alert('Dados do médico atualizados! ✨')
      } else {
        await api.post('/professionals/new', data)
        alert('Médico cadastrado com sucesso! 👨‍⚕️')
      }
      navigate('/professionals')
    } catch (error) {
      alert('Erro ao salvar. Verifique se todos os campos estão preenchidos.')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <button onClick={() => navigate('/professionals')}>
          <LuArrowLeft size={18} />
          Voltar para listagem
        </button>
        <h2>{isEditing ? 'Editar Profissional' : 'Cadastrar Médico'}</h2>
        <p>Preencha as informações abaixo para gerenciar o corpo clínico.</p>
      </S.Header>

      <S.Card>
        <form onSubmit={handleSubmit(handleSaveProfessional)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '2rem',
              color: '#3b82f6',
            }}
          >
            <LuStethoscope size={24} />
            <span style={{ fontWeight: 800, color: '#1e293b' }}>
              Dados Profissionais
            </span>
          </div>

          <S.FormGroup>
            <label>Nome Completo</label>
            <input
              placeholder="Ex: Dr. Alberto Ferreira"
              {...register('name')}
            />
            {errors.name && (
              <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <label>Especialidade Médica</label>
            <select {...register('specialtyId')}>
              <option value="">Selecione uma especialidade</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.specialtyId && (
              <S.ErrorMessage>{errors.specialtyId.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.ActionArea>
            <S.Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/professionals')}
              disabled={isSubmitting}
            >
              Descartar
            </S.Button>
            <S.Button type="submit" disabled={isSubmitting}>
              <LuSave size={20} />
              {isSubmitting ? 'Gravando...' : 'Salvar Alterações'}
            </S.Button>
          </S.ActionArea>
        </form>
      </S.Card>
    </S.Container>
  )
}
