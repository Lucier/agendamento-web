import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 1rem;
  max-width: 1000px;
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

  h1 {
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
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
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

export const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
`

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;

  .icon {
    background: #eff6ff;
    color: #3b82f6;
    padding: 10px;
    border-radius: 12px;
    display: flex;
  }

  .title-area {
    strong {
      display: block;
      color: #1e293b;
      font-size: 1.05rem;
    }
    span {
      color: #64748b;
      font-size: 0.85rem;
      font-weight: 600;
    }
  }
`

export const SlotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 1rem 0;

  .slot-badge {
    background: #f1f5f9;
    color: #475569;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    border: 1px solid #e2e8f0;
  }
`

export const ActionArea = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 1rem;

  button {
    flex: 1;
    height: 38px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
    border: 1px solid #e2e8f0;
  }

  .edit-btn {
    background: #f8fafc;
    color: #334155;
    &:hover {
      background: #f1f5f9;
    }
  }

  .delete-btn {
    background: #fff1f2;
    color: #e11d48;
    border-color: #fecdd3;
    &:hover {
      background: #ffe4e6;
    }
  }
`
