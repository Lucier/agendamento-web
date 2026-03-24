import { Link } from 'react-router-dom'

export function Dashborad() {
  return (
    <nav>
      <Link to="/admin/patients">Pacientes</Link>
      <Link to="/professionals">Profissionais</Link>
      <Link to="/specialties">Especialidades</Link>
    </nav>
  )
}
