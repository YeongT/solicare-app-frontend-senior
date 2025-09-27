import React from 'react';
import styled from 'styled-components';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.card || '#fff'};
  border-radius: ${({ theme }) => theme.borderRadius.card || '20px'};
  box-shadow: ${({ theme }) =>
    theme.boxShadow.card || '0 4px 16px rgba(0,0,0,0.08)'};
  padding: 32px 24px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;
