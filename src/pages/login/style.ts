import styled from "styled-components";

export const theme = {
  colors: {
    primary: "#005cad",
    background: {
      light: "#f5f7f8",
      dark: "#0f1a23",
      paperLight: "#ffffff",
      paperDark: "#0f172a",
    },
    slate: {
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
  },
};

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${theme.colors.background.light};

  /* @media (prefers-color-scheme: dark) {
    background-color: ${theme.colors.background.dark};
  } */
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: ${theme.colors.background.paperLight};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.slate[200]};
  overflow: hidden;

  /* @media (prefers-color-scheme: dark) {
    background: ${theme.colors.background.paperDark};
    border-color: ${theme.colors.slate[800]};
  } */
`;

export const IconCircle = styled.div`
  width: 96px;
  height: 96px;
  background: rgba(0, 92, 173, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${theme.colors.primary};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.slate[700]};

  /* @media (prefers-color-scheme: dark) {
    color: ${theme.colors.slate[300]};
  } */
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.slate[300]};
  background: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(0, 92, 173, 0.1);
  }

  /* @media (prefers-color-scheme: dark) {
    background: ${theme.colors.slate[800]};
    border-color: ${theme.colors.slate[700]};
    color: white;
  } */
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: ${theme.colors.primary};
  color: white;
  font-weight: 700;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition:
    transform 0.1s,
    opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    transform: scale(0.98);
  }
`;
