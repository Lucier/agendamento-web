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
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
  }
`

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
`

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
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
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }
`

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.4rem;
  font-weight: 500;
`

export const ActionArea = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`

export const Button = styled.button<{ variant?: 'danger' | 'secondary' }>`
  height: 48px;
  padding: 0 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  transition: all 0.2s;

  background: ${(props) => {
    if (props.variant === 'danger') return '#fff1f2'
    if (props.variant === 'secondary') return '#f1f5f9'
    return '#3b82f6'
  }};

  color: ${(props) => {
    if (props.variant === 'danger') return '#e11d48'
    if (props.variant === 'secondary') return '#475569'
    return '#fff'
  }};

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
