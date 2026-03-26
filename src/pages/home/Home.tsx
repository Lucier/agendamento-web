import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>SISTEMA DE AGENDAMENTO DE CONSULTAS</h1>

      <h2>Visualize o status do seu agendamento</h2>

      <div style={{ marginTop: 30 }}>
        <Link to="/consulta">
          <button>Consulte o status do seu Agendamento</button>
        </Link>
      </div>

      <div style={{ marginTop: 10 }}>
        <Link to="/login">
          <button>Login do Sistema</button>
        </Link>
      </div>
    </div>
  )
}
