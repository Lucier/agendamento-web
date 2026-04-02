import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
  min-height: calc(100vh - 64px);
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0;
  }
`

export const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`

export const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
`

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;

  .patient-info {
    strong {
      display: block;
      font-size: 1.1rem;
      color: #1e293b;
    }
    span {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
    }
  }
`

export const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 99px;
  text-transform: uppercase;

  ${({ status }) => {
    switch (status) {
      case 'CONFIRMED':
        return 'background: #dcfce7; color: #166534;'
      case 'DONE':
        return 'background: #eff6ff; color: #1e40af;'
      case 'CANCELED':
        return 'background: #fee2e2; color: #991b1b;'
      default:
        return 'background: #fef3c7; color: #92400e;' // SCHEDULED
    }
  }}
`

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #475569;

  svg {
    color: #3b82f6;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;

  button {
    flex: 1;
    min-width: 100px;
    padding: 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid #e2e8f0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    transition: all 0.2s;

    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
  }

  .btn-delete {
    color: #ef4444;
    &:hover {
      background: #fef2f2;
    }
  }
  .btn-confirm {
    color: #16a34a;
    &:hover {
      background: #f0fdf4;
    }
  }
  .btn-done {
    color: #2563eb;
    &:hover {
      background: #eff6ff;
    }
  }
`
