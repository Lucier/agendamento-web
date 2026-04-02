import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem 1rem;
  max-width: 1000px;
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

export const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr auto;
  }

  input {
    height: 42px;
    padding: 0 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9rem;
    outline: none;

    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
`

export const AddButton = styled.button`
  height: 42px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead {
    background: #f1f5f9;
    @media (max-width: 640px) {
      display: none; // Esconde cabeçalho no mobile
    }
  }

  th {
    padding: 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #64748b;
    font-weight: 700;
  }

  tr {
    border-bottom: 1px solid #f1f5f9;
    @media (max-width: 640px) {
      display: block;
      padding: 1rem;
    }
  }

  td {
    padding: 1rem;
    font-size: 0.9rem;
    color: #1e293b;

    @media (max-width: 640px) {
      display: block;
      padding: 0.25rem 0;
      &:before {
        content: attr(data-label);
        font-weight: 700;
        color: #64748b;
        margin-right: 0.5rem;
      }
    }
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 640px) {
    margin-top: 1rem;
    justify-content: flex-end;
  }

  button {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .edit {
    background: #f8fafc;
    color: #3b82f6;
    &:hover {
      background: #eff6ff;
    }
  }

  .delete {
    background: #fff1f2;
    color: #e11d48;
    border-color: #fecdd3;
    &:hover {
      background: #ffe4e6;
    }
  }
`
