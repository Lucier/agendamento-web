import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

export function Header() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // mesmo com erro, continua logout
    }

    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header>
      <h2>Sistema de Agendamento</h2>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}
