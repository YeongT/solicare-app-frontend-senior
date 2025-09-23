import React, { useEffect, useState } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useTodayMeals } from '../hooks/useTodayMeals';
import {
  NotificationsRenderer,
  TodayMealsList,
} from '../components/DashboardComponents';
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
  // Get data and handlers from custom hooks
  const {
    profile,
    generateAllNotifications,
    handleNavigateToPage,
    handleGoHome,
    handleLogout,
    getTodayExerciseStats,
    getTodayMedicationStats,
  } = useDashboard();

  const { getMealStatusDisplay } = useTodayMeals();

  // State for responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get data for display
  const exerciseStats = getTodayExerciseStats();
  const medicationStats = getTodayMedicationStats();
  const allNotifications = generateAllNotifications();
  const mealsList = getMealStatusDisplay();

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

          {/* Diet Card */}
          <DashboardCard>
            <CardTitle>🍽️ 오늘의 식단</CardTitle>
            <TodayMealsList mealsList={mealsList} />
            <CardButton onClick={() => handleNavigateToPage('/diet')}>
              식단 관리하기
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
