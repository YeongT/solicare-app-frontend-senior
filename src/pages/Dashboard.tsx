import React, { useEffect, useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { NotificationsRenderer } from '../components/DashboardComponents';
import {
  CardButton,
  CardDescription,
  CardTitle,
  CardValue,
  DashboardBody,
  DashboardCard,
  DashboardWrapper,
  GridContainer,
  Header,
  HeaderButton,
  HeaderButtons,
  HeaderWrapper,
  NotificationCard,
  WelcomeText,
} from '../styles/pages/Dashboard.styles';

const Dashboard: React.FC = () => {
  const {
    profile,
    mealStatus,
    generateAllNotifications,
    handleNavigateToPage,
    handleGoHome,
    handleLogout,
    getTodayExerciseStats,
    getTodayMedicationStats,
  } = useDashboard();

  // State for responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const exerciseStats = getTodayExerciseStats();
  const medicationStats = getTodayMedicationStats();
  const allNotifications = generateAllNotifications();

  return (
    <DashboardWrapper>
      <HeaderWrapper>
        <Header>
          <WelcomeText>안녕하세요, {profile?.name || '사용자'}님!</WelcomeText>
          <HeaderButtons>
            <HeaderButton onClick={handleGoHome}>홈으로</HeaderButton>
            <HeaderButton onClick={handleLogout}>로그아웃</HeaderButton>
          </HeaderButtons>
        </Header>
      </HeaderWrapper>

      <DashboardBody>
        {/* Notifications Section */}
        <NotificationCard>
          <CardTitle style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
            📢 오늘의 알림
          </CardTitle>
          <NotificationsRenderer
            notifications={allNotifications}
            isMobile={isMobile}
          />
        </NotificationCard>

        {/* Dashboard Cards Grid */}
        <GridContainer>
          {/* Medication Card */}
          <DashboardCard>
            <CardTitle>💊 복용 현황</CardTitle>
            <CardValue color="#17a2b8">
              {medicationStats.taken}/{medicationStats.total}
            </CardValue>
            <CardDescription>
              오늘 복용률: {medicationStats.percentage}%
            </CardDescription>
            <CardButton onClick={() => handleNavigateToPage('/medication')}>
              약물 관리하기
            </CardButton>
          </DashboardCard>

          {/* Meal Status Card */}
          <DashboardCard>
            <CardTitle>🍽️ 오늘의 식사 기록 현황</CardTitle>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                margin: '16px 0 32px 0',
              }}
            >
              {mealStatus.map((m) => (
                <div
                  key={m.type}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '0px 0',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      minWidth: 50,
                      fontSize: '16px',
                    }}
                  >
                    {m.type}
                  </span>
                  {m.recorded ? (
                    <span
                      style={{
                        color: '#2ecc40',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      기록됨 ({m.time})
                    </span>
                  ) : (
                    <span
                      style={{
                        color: '#e57373',
                        fontWeight: 500,
                        fontSize: '14px',
                      }}
                    >
                      미기록
                    </span>
                  )}
                </div>
              ))}
            </div>
            <CardButton onClick={() => handleNavigateToPage('/diet')}>
              식사 기록 관리하기
            </CardButton>
          </DashboardCard>

          {/* Exercise Card */}
          <DashboardCard>
            <CardTitle>🏃‍♂️ 운동 기록</CardTitle>
            <CardValue color="#28a745">{exerciseStats.count}회</CardValue>
            <CardDescription>
              총 운동시간: {exerciseStats.duration}분
            </CardDescription>
            <CardButton onClick={() => handleNavigateToPage('/exercise')}>
              운동 기록하기
            </CardButton>
          </DashboardCard>

          {/* Chat Card */}
          <DashboardCard>
            <CardTitle>💬 AI 상담</CardTitle>
            <CardValue color="#6f42c1">24/7</CardValue>
            <CardDescription>언제든지 건강 상담을 받아보세요</CardDescription>
            <CardButton onClick={() => handleNavigateToPage('/chat')}>
              상담 시작하기
            </CardButton>
          </DashboardCard>
        </GridContainer>
      </DashboardBody>
    </DashboardWrapper>
  );
};

export default Dashboard;
