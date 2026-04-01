import { motion } from 'framer-motion'
import styled from 'styled-components'

export const theme = {
  colors: {
    primary: '#005cad',
    primaryHover: '#004a8b',
    success: '#22c55e',
    error: '#dc2626',
    warning: '#f59e0b',

    // Escala de Cinzas (Slate)
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    background: {
      light: '#f5f7f8',
      dark: '#0f1a23',
      paperLight: '#ffffff',
      paperDark: '#1e293b',
    },

    sus: {
      blueLight: '#E3F2FD',
      blueSoft: 'rgba(0, 92, 173, 0.08)',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
}

export const SearchBar = styled.div`
  display: flex;
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid ${theme.colors.slate[200]};
  overflow: hidden;
  background: white;
  transition: all 0.2s;

  &:focus-within {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 92, 173, 0.1);
  }

  input {
    flex: 1;
    border: none;
    padding: 0 1rem;
    height: 3.5rem;
    outline: none;
    font-size: 1rem;
    background: transparent;
    letter-spacing: 0.2em;
  }

  button {
    background: ${theme.colors.primary};
    color: white;
    border: none;
    padding: 0 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    &:hover {
      background: #004a8b;
    }
  }
`

export const StatusBadge = styled.span<{
  variant: 'confirmado' | 'realizado' | 'cancelado'
}>`
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.025em;

  ${({ variant }) => {
    switch (variant) {
      case 'confirmado':
        return `background: rgba(0, 92, 173, 0.1); color: ${theme.colors.primary}; border: 1px solid rgba(0, 92, 173, 0.2);`
      case 'realizado':
        return `background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0;`
      case 'cancelado':
        return `background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2;`
    }
  }}
`

export const AppointmentCard = styled(motion.div)<{ active?: boolean }>`
  margin: 0.8rem 0;
  background: white;
  padding: 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: ${({ active }) =>
    active ? `4px solid ${theme.colors.primary}` : '1px solid #e2e8f0'};
`
