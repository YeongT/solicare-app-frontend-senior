import React from 'react';
import styled from 'styled-components';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${({ theme }) => theme.colors.border || '#e0e0e0'};
  border-radius: ${({ theme }) => theme.borderRadius.input || '8px'};
  font-size: 1rem;
  background: #f9fafb;
  transition:
    border 0.2s,
    box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    background: #fff;
  }
`;

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
