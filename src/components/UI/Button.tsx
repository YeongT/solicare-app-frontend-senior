import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button || '12px'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s,
    color 0.2s;
  box-shadow: ${({ theme }) =>
    theme.boxShadow.button || '0 2px 8px rgba(0,0,0,0.08)'};
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background: ${props.theme.colors.secondary};
    `}
  ${(props) =>
    props.variant === 'danger' &&
    css`
      background: #dc3545;
    `}
  &:hover {
    filter: brightness(0.95);
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
  }
  &:active {
    filter: brightness(0.9);
  }
  &:disabled {
    background: #e0e0e0;
    color: #aaa;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
