import styled from 'styled-components';

// 페이지 전체 래퍼
export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

// 헤더
export const Header = styled.header`
  background: #f8f9fa;
  padding: 2rem 0 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const Nav = styled.nav`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 0 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-align: left;
  width: auto;
  margin-bottom: 0;
  letter-spacing: 1px;

  span {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
    margin-bottom: 24px;
    font-size: 2.1rem;
    font-weight: 900;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

export const UserGreeting = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const AuthButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.85rem 2rem;
  border-radius: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  font-size: 1.05rem;

  ${({ variant, theme }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary};
        color: white;
        &:hover {
          background: ${theme.colors.secondary};
        }
      `
      : `
        background: white;
        color: ${theme.colors.primary};
        border: 2px solid ${theme.colors.primary};
        &:hover {
          background: ${theme.colors.primary};
          color: white;
        }
      `}
`;

export const LogoutButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d32f2f;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

export const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: 0.6rem;
`;

export const CTAButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const HeroVisual = styled.div`
  display: none;
`;

// Features Section
export const FeaturesSection = styled.section`
  background: #f8f9fa;
  padding: 3rem 2rem;
`;

export const FeatureGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
`;
