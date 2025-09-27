import React from 'react';
import styled, { css } from 'styled-components';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
}

const StyledBadge = styled.span<BadgeProps>`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  background: #e0e0e0;
  color: #333;
  ${(props) =>
    props.status === 'success' &&
    css`
      background: #e8f5e8;
      color: #219653;
    `}
  ${(props) =>
    props.status === 'warning' &&
    css`
      background: #fff3e0;
      color: #ff9800;
    `}
  ${(props) =>
    props.status === 'error' &&
    css`
      background: #ffebee;
      color: #dc3545;
    `}
  ${(props) =>
    props.status === 'info' &&
    css`
      background: #e3f2fd;
      color: #1976d2;
    `}
`;

const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  return <StyledBadge {...rest}>{children}</StyledBadge>;
};

export default Badge;
