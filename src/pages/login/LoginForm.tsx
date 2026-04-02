import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/api'

import { useState } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import * as S from './style'

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>()

  async function handleLogin(data: LoginFormData) {
    try {
      const response = await api.post('/users/login', data)

      const { access_token } = response.data

      // salva token
      localStorage.setItem('token', access_token)

      // redireciona para schedules
      navigate('/dashboard')
    } catch {
      alert('Email ou senha inválidos')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <S.LoginWrapper>
          <S.LoginCard>
            {/* Header */}
            <div
              style={{
                padding: '2rem',
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <S.IconCircle>
                <MdOutlineAdminPanelSettings size={48} />
              </S.IconCircle>
              <h1
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                Acesso Administrativo
              </h1>
              <p
                style={{
                  color: '#64748b',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                }}
              >
                Identifique-se para acessar o painel de gestão do sistema de
                saúde.
              </p>
            </div>

            {/* Form */}
            <div
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <S.InputGroup>
                <S.Label>E-mail ou Usuário</S.Label>
                <S.Input
                  placeholder="exemplo@saude.gov.br"
                  type="text"
                  {...register('email')}
                  required
                />
              </S.InputGroup>

              <S.InputGroup>
                <S.Label>Senha</S.Label>
                <div style={{ position: 'relative' }}>
                  <S.Input
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94a3b8',
                    }}
                  >
                    {showPassword ? (
                      <LuEyeOff size={20} />
                    ) : (
                      <LuEye size={20} />
                    )}
                  </button>
                </div>
              </S.InputGroup>

              <div style={{ textAlign: 'right' }}>
                <a
                  href="#"
                  style={{
                    color: S.theme.colors.primary,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Recuperar acesso?
                </a>
              </div>

              <S.SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Acessando...' : 'Acessar Sistema'}
              </S.SubmitButton>
            </div>

            {/* Footer */}
            <div
              style={{
                background: 'rgba(248, 250, 252, 0.5)',
                padding: '1.5rem',
                borderTop: '1px solid #f1f5f9',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: 0.6,
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    color: S.theme.colors.primary,
                  }}
                >
                  SUS
                </div>
                <div
                  style={{
                    width: '1px',
                    height: '20px',
                    background: '#cbd5e1',
                  }}
                />
                <div
                  style={{
                    fontSize: '9px',
                    textAlign: 'left',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Ministério da
                  <br />
                  Saúde
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                © 2026 Acesso restrito a usuários autorizados.
              </p>
            </div>
          </S.LoginCard>
        </S.LoginWrapper>
      </form>
    </>
  )
}
