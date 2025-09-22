import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 32px 20px;
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  max-width: 1300px;
  width: 100%;
  height: 760px;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 420px;
    min-height: auto;
  }
`;

export const LeftSection = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  padding: 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.05'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
  }

  @media (max-width: 768px) {
    padding: 40px 32px;
    text-align: center;
  }
`;

export const RightSection = styled.div`
  padding: 70px 64px; /* 가로 패딩 약간 증가 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* 내부 FormSection 가운데 정렬 */
  align-items: center;

  @media (max-width: 768px) {
    padding: 40px 32px;
  }
`;

/* 새롭게 추가: 실제 폼 콘텐츠 폭을 제한하여 좌우 여백 확보 */
export const FormSection = styled.div`
  width: 100%;
  max-width: 640px; /* 더 길게 확장 */
  display: flex;
  flex-direction: column;
  padding: 0 32px; /* 좌우 여백 확대 */

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0; /* 모바일은 여백 축소 */
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 16px;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  margin-bottom: 32px;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

export const FormLabel = styled.label`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
  letter-spacing: -0.01em;
`;

export const Input = styled.input`
  padding: 16px 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  font-weight: 400;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
  }
`;

export const Button = styled.button<{ variant?: 'secondary' }>`
  width: 100%;
  padding: 16px 24px;
  background: ${({ variant, theme }) =>
    variant === 'secondary' ? 'transparent' : theme.colors.primary};
  color: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.colors.primary : 'white'};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 10px;
  letter-spacing: -0.01em;

  &:hover {
    background: ${({ variant, theme }) =>
      variant === 'secondary' ? theme.colors.primary : theme.colors.secondary};
    color: white;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.button};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Toast = styled.div<{ type?: 'error' | 'success' }>`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  background: ${({ theme, type }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
  color: white;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  font-size: ${({ theme }) => theme.font.body};
  font-weight: 500;
  text-align: center;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ToggleText = styled.div`
  text-align: center;
  margin: 20px 0 16px 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 400;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 24px 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 1px;
    background: ${({ theme }) => theme.colors.background};
  }
`;
