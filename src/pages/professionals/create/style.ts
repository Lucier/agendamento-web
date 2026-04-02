import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  min-height: calc(100vh - 64px);
  background: #f8fafc;
`

export const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #3b82f6;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-bottom: 0.5rem;
    width: fit-content;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
  }

  p {
    color: #64748b;
    font-size: 0.875rem;
  }
`

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
`

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    letter-spacing: 0.05em;
  }

  input,
  select {
    width: 100%;
    height: 45px;
    padding: 0 1rem;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.95rem;
    color: #1e293b;
    transition: all 0.2s ease;
    box-sizing: border-box;
    appearance: none; /* Remove seta padrão do select no mobile */

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='C19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.2rem;
    padding-right: 2.5rem;
  }
`

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  display: block;
  font-weight: 500;
`

export const ActionArea = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Button = styled.button<{ variant?: 'secondary' }>`
  height: 48px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;

  background: ${(props) =>
    props.variant === 'secondary' ? '#f1f5f9' : '#3b82f6'};
  color: ${(props) => (props.variant === 'secondary' ? '#475569' : 'white')};

  &:hover {
    filter: brightness(0.95);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
