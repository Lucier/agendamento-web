import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/api'

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
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
    } catch (error) {
      alert('Email ou senha inválidos')
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <input placeholder="Login" type="email" {...register('email')} />

        <input placeholder="senha" type="password" {...register('password')} />

        <button type="submit" disabled={isSubmitting}>
          Entrar
        </button>
      </form>
    </div>
  )
}
