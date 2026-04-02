import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 1rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: calc(100vh - 64px);
  background: #f8fafc;
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

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  .input-wrapper {
    position: relative;
    flex: 1;
  }

  input {
    width: 100%;
    height: 45px;
    padding: 0 1rem 0 2.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.95rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`

export const AddButton = styled.button`
  height: 45px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0 1.5rem;
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

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const ProfessionalCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 40px;
      height: 40px;
      background: #eff6ff;
      color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    strong {
      color: #1e293b;
      font-size: 1rem;
    }
  }
`

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    border-top: 1px solid #f1f5f9;
    padding-top: 0.75rem;
    justify-content: flex-end;
  }

  button {
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .edit {
    background: #f1f5f9;
    color: #475569;
    &:hover {
      background: #e2e8f0;
    }
  }

  .delete {
    background: #fff1f2;
    color: #e11d48;
    &:hover {
      background: #fecdd3;
      border-color: #fda4af;
    }
  }
`
