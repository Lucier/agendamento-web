import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    primary: '#005cad',
    bgLight: '#f5f7f8',
    bgDark: '#0f1a23',
    slate: {
      100: '#f1f5f9',
      200: '#e2e8f0',
      700: '#334155',
      800: '#1e293b',
    },
  },
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  },
}

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: ${theme.colors.bgLight};
  }
`

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: 2.5rem 2rem;
  }
`

export const Header = styled.header`
  background-color: ${theme.colors.primary};
  color: white;
  padding: 2rem 1rem 1.5rem;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  @media (min-width: ${theme.breakpoints.desktop}) {
    border-radius: 0;
    padding: 3rem 2rem;
  }
`

export const SpecialtyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr); // Base Mobile
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`

export const CardButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid ${theme.colors.slate[100]};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }

  .icon-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: rgba(0, 92, 173, 0.1);
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.75rem;
  }

  span.label {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.colors.slate[700]};
  }

  /* @media (prefers-color-scheme: dark) {
    background: ${theme.colors.slate[800]};
    border-color: ${theme.colors.slate[700]};
    span.label {
      color: ${theme.colors.slate[200]};
    }
  } */
`

export const SearchWrapper = styled.div`
  display: flex;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 92, 173, 0.1);
  height: 3.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  .icon-area {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    color: ${theme.colors.primary};
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    color: ${theme.colors.slate[800]};
  }
`

export const StatusBadge = styled.span`
  color: ${theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  background: rgba(0, 92, 173, 0.08);
  padding: 4px 12px;
  border-radius: 999px;
`

export const InfoBanner = styled.div`
  margin-top: 3rem;
  padding: 1.25rem;
  background: rgba(0, 92, 173, 0.05);
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  border: 1px solid rgba(0, 92, 173, 0.1);
  color: ${theme.colors.primary};

  p {
    margin: 0;
    font-size: 0.875rem;
    color: ${theme.colors.slate[700]};
    line-height: 1.6;
  }
`
