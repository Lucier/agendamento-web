import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { api } from '../../../api/api'
import { useAppointments } from '../../../hooks/useAppointments.hook'
import {
  type CreateAppointmentDTO,
  createAppointmentSchema,
} from '../../../schemas/appointment.schema'
import * as S from './style'

export function AppointmentForm() {
  const navigate = useNavigate()
  const { id: appointmentId } = useParams<{ id: string }>()
  const {
    createAppointmentMutation,
    specialtiesQuery,
    getProfessionals,
    getSlots,
  } = useAppointments()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateAppointmentDTO>({
    resolver: zodResolver(createAppointmentSchema),
    mode: 'onSubmit',
  })

  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  // hooks SEMPRE no topo
  const professionalsQuery = getProfessionals(selectedSpecialty)
  const slotsQuery = getSlots(selectedProfessional, selectedDate)

  // 🔹 Carregar dados se estiver editando
  useEffect(() => {
    if (!appointmentId) return

    async function loadAppointment() {
      try {
        const res = await api.get(`/appointments/${appointmentId}`)
        const appt = res.data

        // campos do form
        setValue('name', appt.patient?.name || '')
        setValue('sus_card', appt.patient?.sus_card || '')

        // selects dependentes
        setSelectedSpecialty(appt.professional?.specialtyId || '')
        setSelectedProfessional(appt.professionalId || '')

        // data
        const date = new Date(appt.dateTime).toISOString().split('T')[0]
        setSelectedDate(date)

        // slot
        setValue('timeSlotId', appt.timeSlotId || '')
      } catch (error) {
        console.error('Erro ao carregar appointment', error)
      }
    }

    loadAppointment()
  }, [appointmentId, setValue])

  useEffect(() => {
    if (!appointmentId) return
    if (!slotsQuery.data) return

    api.get(`/appointments/${appointmentId}`).then((res) => {
      const appt = res.data
      setValue('timeSlotId', appt.timeSlotId)
    })
  }, [slotsQuery.data, appointmentId, setValue])

  const onSubmit = async (data: CreateAppointmentDTO) => {
    try {
      let patientId: string | undefined

      // tenta buscar paciente
      try {
        const { data: patient } = await api.get(
          `/patients/sus/${data.sus_card}`,
        )

        if (patient?.id) {
          patientId = patient.id
        }
      } catch {
        // segue para criação
      }

      // cria paciente se não existir
      if (!patientId) {
        const { data: newPatient } = await api.post('/patients/new', {
          name: data.name,
          sus_card: data.sus_card,
        })

        patientId = newPatient.id
      }

      if (!patientId) {
        alert('Erro ao obter paciente')
        return
      }

      const payload = {
        patientId,
        professionalId: selectedProfessional,
        timeSlotId: data.timeSlotId,
        date: data.date,
      }

      console.log('PAYLOAD', payload)

      if (appointmentId) {
        await api.put(`/appointments/${appointmentId}`, payload)
        alert('Agendamento atualizado com sucesso! ✏️')
      } else {
        await createAppointmentMutation.mutateAsync(payload)
        alert('Agendamento criado com sucesso! ✅')
      }

      reset()
      navigate('/')
    } catch (error) {
      console.error('ERRO COMPLETO', error)
      alert('Erro ao salvar agendamento')
    }
  }

  // Transforma as especialidades para o formato do Select
  const specialtyOptions =
    specialtiesQuery.data?.map((s) => ({
      value: s.id,
      label: s.name,
    })) || []

  // Transforma os profissionais para o formato do Select
  const professionalOptions =
    professionalsQuery.data?.map((p) => ({
      value: p.id,
      label: p.name,
    })) || []

  // Transforma os horários para o formato do Select
  const slotOptions =
    slotsQuery.data?.map((s) => ({
      value: s.id,
      label: s.time,
    })) || []

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log('ERROS DO FORM', errors)
      })}
      style={{
        minHeight: '100vh',
        background: 'white',
      }}
    >
      {/* App Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          background: '#f5f7f8',
          borderBottom: '1px solid rgba(0,92,173,0.1)',
        }}
      >
        <LuArrowLeft
          size={24}
          style={{ color: S.theme.colors.primary, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <h2
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '1.125rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          Nova Consulta
        </h2>
        <div style={{ width: 24 }} />
      </header>

      {/* DADOS PACIENTE */}
      <div style={{ padding: ' 1rem', background: 'white' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#64748b',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          NOME DO PACIENTE
        </span>
        <S.SearchBar>
          <input
            type="text"
            placeholder="Nome do paciente"
            inputMode="text"
            maxLength={100}
            {...register('name')}
            required
          />
        </S.SearchBar>
      </div>

      <div style={{ padding: '0 1rem', background: 'white' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#64748b',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          NÚMERO DO CARTÃO SUS
        </span>
        <S.SearchBar>
          <input
            type="text"
            placeholder="000 0000 0000 0000"
            inputMode="numeric"
            maxLength={15}
            {...register('sus_card')}
            required
          />
        </S.SearchBar>
      </div>

      {/* SELECT DE ESPECIALIDADES */}
      <div
        style={{
          padding: '1rem',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#64748b',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            ESPECIALIDADE
          </span>
          <Select
            options={specialtyOptions}
            placeholder="Selecione a especialidade"
            isLoading={specialtiesQuery.isLoading}
            value={specialtyOptions.find(
              (opt) => opt.value === selectedSpecialty,
            )}
            onChange={(newValue) => {
              const val = newValue?.value || ''

              // 1. Atualiza a especialidade
              setSelectedSpecialty(val)

              // 2. LIMPA O PROFISSIONAL (Estado e Form)
              setSelectedProfessional('')
              setValue('professionalId', '')

              // 3. LIMPA A DATA E HORÁRIO (Para evitar agendamentos inválidos)
              setSelectedDate('')
              setValue('date', '')
              setValue('timeSlotId', '')
            }}
          />
        </div>

        {/* SELECT DE PROFISSIONAIS */}
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#64748b',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            PROFISSIONAL
          </span>
          <Select
            options={professionalOptions}
            placeholder="Selecione o profissional"
            isLoading={professionalsQuery.isFetching}
            isDisabled={!selectedSpecialty}
            value={
              professionalOptions.find(
                (opt) => opt.value === selectedProfessional,
              ) || null
            }
            onChange={(newValue) => {
              const val = newValue?.value || ''
              setSelectedProfessional(val)
              setValue('professionalId', val) // Atualiza o valor no react-hook-form
            }}
          />
        </div>
      </div>

      {/* DATA E HORARIO */}
      <div
        style={{
          padding: '1rem',
          background: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}
      >
        {/* DATA */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#64748b',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            DATA DA CONSULTA
          </label>
          <input
            type="date"
            disabled={!selectedProfessional}
            style={{
              width: '100%',
              height: '2.7rem',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
            value={selectedDate}
            onChange={(e) => {
              const val = e.target.value || ''

              // 1. Atualiza o estado da data para carregar os novos slots
              setSelectedDate(val)
              setValue('date', val)

              // 2. LIMPA O HORÁRIO (Visual e no Formulário)
              // Como o horário depende da data, se a data muda, o horário anterior é inválido.
              setValue('timeSlotId', '')
            }}
          />
        </div>

        {/* HORÁRIO  */}
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#64748b',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            HORÁRIO DISPONÍVEL
          </label>
          <Select
            options={slotOptions}
            placeholder="Escolha um horário"
            isDisabled={!selectedDate || slotsQuery.isLoading}
            isLoading={slotsQuery.isFetching}
            // Dica: para simplificar o 'value' do slot na edição, use o valor direto do form:
            value={
              slotOptions.find((opt) => opt.value === watch('timeSlotId')) ||
              null
            }
            onChange={(newValue) => {
              setValue('timeSlotId', newValue?.value || '')
            }}
          />
        </div>
      </div>

      <div style={{ padding: '1rem', background: 'white' }}>
        <button
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.875rem',
            borderRadius: '0.5rem',
            background: S.theme.colors.primary,
            color: 'white',
            border: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Agendar Consulta'}
        </button>
      </div>
    </form>
  )
}
