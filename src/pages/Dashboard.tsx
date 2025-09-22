import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useTodayMeals } from '../hooks/useTodayMeals';
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
  NotificationItem,
  NotificationMessage,
  NotificationScrollContainer,
  NotificationTime,
  NotificationTitle,
  WelcomeText,
} from '../styles/pages/Dashboard.styles';

const TodayMealsList: React.FC = () => {
  const { getMealStatusDisplay } = useTodayMeals();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '8px 0',
      }}
    >
      {getMealStatusDisplay().map((meal) => (
        <div
          key={meal.timeSlot}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 0',
            fontSize: '14px',
          }}
        >
          <span style={{ fontWeight: '600', color: '#495057' }}>
            {meal.timeSlot}:
          </span>
          <span
            style={{
              color: meal.hasRecord ? '#28a745' : '#6c757d',
              fontSize: '13px',
            }}
          >
            {meal.statusText}
          </span>
        </div>
      ))}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const {
    profile,
    generateAllNotifications,
    handleNavigateToPage,
    handleGoHome,
    handleLogout,
    getTodayExerciseStats,
    getTodayMedicationStats,
  } = useDashboard();

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
        <NotificationCard>
          <CardTitle style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
            📢 오늘의 알림
          </CardTitle>
          <NotificationScrollContainer>
            {allNotifications.map((notification) => (
              <NotificationItem key={notification.id}>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>
                  {notification.message}
                </NotificationMessage>
                <NotificationTime>{notification.time}</NotificationTime>
              </NotificationItem>
            ))}
          </NotificationScrollContainer>
        </NotificationCard>
        <GridContainer>
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
          <DashboardCard>
            <CardTitle>🍽️ 오늘의 식단</CardTitle>
            <TodayMealsList />
            <CardButton onClick={() => handleNavigateToPage('/diet')}>
              식단 관리하기
            </CardButton>
          </DashboardCard>
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
