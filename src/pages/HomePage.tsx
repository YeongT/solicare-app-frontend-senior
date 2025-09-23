import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AuthButton,
  AuthButtons,
  CTAButton,
  FeatureCard,
  FeatureContent,
  FeatureDescription,
  FeatureGrid,
  FeatureIcon,
  FeaturesSection,
  FeatureTitle,
  Header,
  HeroContent,
  HeroDescription,
  HeroSection,
  HeroTitle,
  HeroVisual,
  Logo,
  LogoutButton,
  Nav,
  PageWrapper,
  UserGreeting,
  UserSection,
} from '../styles/pages/HomePage.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/start');
  };

  const features = [
    {
      icon: '💊',
      title: '약물 복용 관리',
      description: '복용 시간 알림과 기록으로 안전하고 정확한 복약 관리',
    },
    {
      icon: '🍽️',
      title: '식사 기록',
      description: '간편한 식사 기록으로 건강한 식습관 형성하기',
    },
    {
      icon: '🚶‍♂️',
      title: '운동 관리',
      description: '걸음 수와 운동량 추적으로 활기찬 일상 만들기',
    },
    {
      icon: '🤖',
      title: 'AI 음성 상담',
      description: '건강 관련 궁금증을 AI와 대화로 쉽게 해결하기',
    },
  ];

  return (
    <PageWrapper>
      <Header>
        <Nav>
          <Logo onClick={() => navigate('/start')}>
            Solicare 시니어 대시보드
          </Logo>
          <UserSection>
            {isAuthenticated ? (
              <>
                <UserGreeting>안녕하세요, {profile?.name}님! 👋</UserGreeting>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              </>
            ) : (
              <AuthButtons>
                <AuthButton
                  variant="secondary"
                  onClick={() => navigate('/login')}
                >
                  로그인
                </AuthButton>
                <AuthButton
                  variant="primary"
                  onClick={() => navigate('/register')}
                >
                  회원가입
                </AuthButton>
              </AuthButtons>
            )}
          </UserSection>
        </Nav>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>건강한 일상을 위한 솔루션</HeroTitle>
          <HeroDescription>모든 건강 관리를 하나의 앱에서</HeroDescription>
          {isAuthenticated ? (
            <AuthButton
              variant="primary"
              onClick={() => navigate('/dashboard')}
            >
              대시보드로 이동
            </AuthButton>
          ) : window.innerWidth <= 600 ? (
            <AuthButtons
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                maxWidth: '280px',
                marginTop: '20px',
              }}
            >
              <AuthButton
                variant="secondary"
                onClick={() => navigate('/login')}
                style={{ width: '100%' }}
              >
                로그인
              </AuthButton>
              <AuthButton
                variant="primary"
                onClick={() => navigate('/register')}
                style={{ width: '100%' }}
              >
                회원가입
              </AuthButton>
            </AuthButtons>
          ) : (
            <CTAButton onClick={() => navigate('/register')}>
              시작하기
            </CTAButton>
          )}
        </HeroContent>
        <HeroVisual>
          <div>📱</div>
        </HeroVisual>
      </HeroSection>

      <FeaturesSection>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>
    </PageWrapper>
  );
};

export default HomePage;
