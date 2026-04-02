/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import {
  LuCalendar,
  LuClock,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuStethoscope,
  LuUsers,
  LuX,
} from 'react-icons/lu'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../api/api'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()

  // Monitora o redimensionamento da tela para alternar entre mobile e desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setIsMenuOpen(false) // Fecha o menu se expandir a tela
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function handleLogout() {
    // Dispara o alerta de confirmação
    const result = await Swal.fire({
      title: 'Sair do sistema?',
      text: 'Você precisará fazer login novamente para acessar os dados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6', // Azul (padrão do seu sistema)
      cancelButtonColor: '#94a3b8', // Slate/Cinza
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      reverseButtons: true, // Coloca o "Cancelar" na esquerda no Desktop
      background: '#ffffff',
      color: '#1e293b',
    })

    // Se o usuário confirmou
    if (result.isConfirmed) {
      try {
        // Mostra um carregamento enquanto a API responde
        Swal.showLoading()

        await api.post('/auth/logout')
      } catch (error) {
        // ignora erro de rede
      } finally {
        localStorage.removeItem('token')

        // Fecha o alerta e navega
        Swal.close()
        navigate('/')
      }
    }
  }

  const navItems = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LuLayoutDashboard size={18} />,
    },
    { to: '/patients', label: 'Pacientes', icon: <LuUsers size={18} /> },
    {
      to: '/professionals',
      label: 'Profissionais',
      icon: <LuStethoscope size={18} />,
    },
    { to: '/appointments', label: 'Consultas', icon: <LuCalendar size={18} /> },
    { to: '/schedules', label: 'Horários', icon: <LuClock size={18} /> },
  ]

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* LOGO */}
        <div style={styles.logoArea}>
          <div style={styles.logoBadge}>SUS</div>
          <span style={styles.logoText}>Gestão Saúde</span>
        </div>

        {/* MENU DESKTOP */}
        {!isMobile && (
          <nav style={styles.navDesktop}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  ...styles.link,
                  ...(isActive ? styles.linkActive : {}),
                })}
              >
                {item.label}
              </NavLink>
            ))}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Sair
            </button>
          </nav>
        )}

        {/* BOTÃO HAMBURGUER (Apenas Mobile) */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
          >
            {isMenuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
          </button>
        )}
      </div>

      {/* MENU MOBILE (Overlay) */}
      {isMobile && isMenuOpen && (
        <div style={styles.mobileOverlay}>
          <nav style={styles.navMobile}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                style={({ isActive }) => ({
                  ...styles.mobileLink,
                  ...(isActive ? styles.mobileLinkActive : {}),
                })}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
            <hr style={styles.divider} />
            <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
              <LuLogOut size={20} />
              Sair do Sistema
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: '#1e293b', // Slate 800
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.25rem',
    height: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoBadge: {
    background: '#3b82f6',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontWeight: 900,
    fontSize: '0.75rem',
  },
  logoText: {
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.5px',
  },
  navDesktop: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  link: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  linkActive: {
    color: '#fff',
    fontWeight: 700,
  },
  logoutBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileOverlay: {
    position: 'fixed',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
    background: '#1e293b',
    zIndex: 999,
    padding: '1.5rem',
  },
  navMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '12px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.03)',
  },
  mobileLinkActive: {
    color: '#fff',
    background: 'rgba(59, 130, 246, 0.2)',
    fontWeight: 700,
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #334155',
    margin: '1rem 0',
  },
  mobileLogoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '1rem',
  },
}
