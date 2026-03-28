import styled, { css, keyframes } from 'styled-components'

export const Container = styled.button<{ block: boolean }>`
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 10px 24px;
  border-radius: ${(props) => props.theme.radius};
  border: none;
  cursor: pointer;
  margin-top: 20px;
  color: ${(props) => props.theme.colors.white};
  transition: 0.3s;

  ${(props) =>
    props.block &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &.dark {
    background-color: ${(props) => props.theme.colors.dark};

    &:hover:not(:disabled),
    &:focus {
      background-color: ${(props) => props.theme.colors.dark_hover};
    }
  }

  &.light {
    background-color: ${(props) => props.theme.colors.light};
    color: ${(props) => props.theme.colors.dark};

    &:hover:not(:disabled),
    &:focus {
      background-color: ${(props) => props.theme.colors.light_hover};
    }
  }

  &.primary {
    background-color: ${(props) => props.theme.colors.primary};

    &:hover:not(:disabled),
    &:focus {
      background-color: ${(props) => props.theme.colors.primary_hover};
    }
  }

  &.secondary {
    background-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.dark};

    &:hover:not(:disabled),
    &:focus {
      background-color: ${(props) => props.theme.colors.secondary_hover};
    }
  }

  &.danger {
    background-color: ${(props) => props.theme.colors.error};

    &:hover:not(:disabled),
    &:focus {
      background-color: ${(props) => props.theme.colors.error_dark};
    }
  }
`

const loadEffect = keyframes`
  0, 100% {
    opacity: 0
  }

  50% {
    opacity: .6
  }
`

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  &.dark > span,
  &.primary > span {
    background: ${(props) => props.theme.colors.white};
  }

  &.secondary > span {
    background: ${(props) => props.theme.colors.primary};
  }

  &.light > span {
    background: ${(props) => props.theme.colors.dark};
  }

  span {
    display: inline-block;
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    animation: ${loadEffect} 1.5s linear infinite;

    &.second {
      animation-delay: 0.5s;
    }

    &.third {
      animation-delay: 1s;
    }

    & + span {
      margin-left: 0.3rem;
    }
  }
`
