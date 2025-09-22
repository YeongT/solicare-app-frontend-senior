import styled from 'styled-components';

const MAX_WIDTH = 1400;

export const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
  display: block;
  margin: 0;
  padding: 20px 0;
  box-sizing: border-box;
`;

export const DashboardBody = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 0 24px 32px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 0 16px 24px 16px;
    gap: 20px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 0 auto 24px auto;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='20' cy='20' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
  }

  @media (max-width: 768px) {
    margin: 0 auto 20px auto;
    border-radius: 16px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 32px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 20px 24px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

export const WelcomeText = styled.h1`
  font-size: 1.8rem;
  color: white;
  margin: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '👋';
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    text-align: center;
    justify-content: center;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const HeaderButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:last-child {
    border-color: white;
    color: white;

    &:hover {
      background: white;
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const DashboardCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: 32px 24px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  min-width: 0;
  width: 100%;
  min-height: 280px;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 24px 16px;
    min-height: 240px;
    border-radius: 16px;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

export const CardValue = styled.p<{ color?: string }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.color || props.theme.colors.primary};
  margin: 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

export const CardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${(props) =>
    props.variant === 'secondary' ? '#6c757d' : props.theme.colors.primary};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary' ? '#5a6268' : '#1746a0'};
  }
`;

export const NotificationCard = styled(DashboardCard)`
  text-align: left;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 16px;
    padding: 16px;
  }
`;

export const NotificationScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 8px 0 12px 0;
  margin-top: 16px;
  width: 100%;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const NotificationItem = styled.div`
  min-width: 280px;
  flex-shrink: 0;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const NotificationTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #343a40;
`;

export const NotificationMessage = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.4;
`;

export const NotificationTime = styled.span`
  font-size: 12px;
  color: #adb5bd;
  font-weight: 500;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
`;
