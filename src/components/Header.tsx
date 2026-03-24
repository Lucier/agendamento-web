import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../api/api'

export function Header() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      // ignora erro
    }

    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <NavLink to="/dashboard" style={styles.link}>
          Dashboard
        </NavLink>

        <NavLink to="/patients" style={styles.link}>
          Patients
        </NavLink>

        <NavLink to="/professionals" style={styles.link}>
          Professionals
        </NavLink>

        <NavLink to="/appointments" style={styles.link}>
          Appointments
        </NavLink>

        <NavLink to="/schedules" style={styles.link}>
          Schedules
        </NavLink>
      </nav>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    background: '#1f2937',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
  },
  logout: {
    background: '#ef4444',
    border: 'none',
    color: '#fff',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
}
