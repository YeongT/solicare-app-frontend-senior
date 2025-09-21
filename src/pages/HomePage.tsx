import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MAX_WIDTH = 1000;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBar = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px 0 48px;
  background: transparent;

  @media (max-width: 1024px) {
    padding: 24px 32px 0 32px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px 16px 0 16px;
  }
`;

const Logo = styled.span`
  font-size: 2.2rem;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: 1px;
`;

const TopBtnGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 12px;
  }
`;

const TopBtn = styled.button`
  background: #2563eb;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  padding: 14px 36px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15);
  transition: all 0.2s;
  &:hover {
    background: #1746a0;
    transform: translateY(-1px);
  }
`;

const LogoutBtn = styled.button`
  background: #dc3545;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 16px;
  padding: 14px 36px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(220, 53, 69, 0.15);
  transition: all 0.2s;
  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`;

const UserWelcome = styled.span`
  font-size: 1.1rem;
  color: #2563eb;
  font-weight: 600;
  margin-right: 16px;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 8px;
    font-size: 1rem;
    text-align: center;
  }
`;

const MainBody = styled.div`
  width: 100vw;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const MainCard = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.08);
  padding: 48px 40px 36px 40px;
  text-align: center;
  margin: 36px 0 28px 0;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 36px 32px 28px 32px;
    margin: 28px 0 20px 0;
  }

  @media (max-width: 768px) {
    padding: 32px 24px 24px 24px;
    margin: 24px 0 20px 0;
  }
`;

const MainTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 20px;
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
`;

const MainDesc = styled.p`
  font-size: 1.18rem;
  color: #222;
  margin-bottom: 28px;
  line-height: 1.7;
  font-family:
    'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto',
    sans-serif;
`;

const DashboardBtn = styled.button`
  background: linear-gradient(135deg, #2563eb 0%, #1746a0 100%);
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  padding: 18px 48px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  transition: all 0.3s;
  margin-top: 12px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
  padding: 32px 24px;
  text-align: left;
  font-size: 1.15rem;
  color: #2563eb;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const InfoCardTitle = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1746a0;
`;

const InfoCardDesc = styled.span`
  color: #222;
  font-weight: 400;
  font-size: 1.05rem;
  margin-top: 12px;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/start');
  };

  return (
    <Wrapper>
      <TopBar>
        <Logo>Solicare 시니어 포탈</Logo>
        <TopBtnGroup>
          {isAuthenticated ? (
            <>
              <UserWelcome>👋 {user?.name}님 안녕하세요!</UserWelcome>
              <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
            </>
          ) : (
            <>
              <TopBtn onClick={() => navigate('/login')}>로그인</TopBtn>
              <TopBtn onClick={() => navigate('/login')}>회원가입</TopBtn>
            </>
          )}
        </TopBtnGroup>
      </TopBar>
      <MainBody>
        <MainCard>
          <MainTitle>건강한 일상을 위한 스마트한 관리</MainTitle>
          <MainDesc>
            <b>Solicare</b>와 함께 약물 복용, 식사 기록, 운동 관리, AI 상담을
            통해
            <br />
            체계적이고 지속적인 건강 관리를 시작하세요.
          </MainDesc>
          {isAuthenticated && (
            <DashboardBtn onClick={() => navigate('/dashboard')}>
              🚀 대시보드로 이동
            </DashboardBtn>
          )}
        </MainCard>
        <InfoSection>
          <InfoCard>
            <InfoCardTitle>💊 약물 복용 관리</InfoCardTitle>
            <InfoCardDesc>
              복용 시간 알림과 기록으로 안전하고 정확한 복약 관리
            </InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>🍽️ 식사 기록</InfoCardTitle>
            <InfoCardDesc>
              간편한 식사 기록으로 건강한 식습관 형성하기
            </InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>🚶‍♂️ 운동 관리</InfoCardTitle>
            <InfoCardDesc>
              걸음 수와 운동량 추적으로 활기찬 일상 만들기
            </InfoCardDesc>
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>🤖 AI 음성 상담</InfoCardTitle>
            <InfoCardDesc>
              건강 관련 궁금증을 AI와 대화로 쉽게 해결하기
            </InfoCardDesc>
          </InfoCard>
        </InfoSection>
      </MainBody>
    </Wrapper>
  );
};

export default HomePage;
