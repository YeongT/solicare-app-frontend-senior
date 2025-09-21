import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  mockExerciseData,
  mockMedications,
  mockNotifications,
} from '../data/mockData';
import styled from 'styled-components';
import { GridContainer, NavButton } from '../components/StyledComponents';

interface MealRecord {
  id: number;
  name: string;
  time: string;
  date: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
}

interface Medication {
  id: number;
  name: string;
  description: string;
  dailyDosage: string;
  memo: string;
  daysOfWeek: string[];
  timeSlots: string[];
  taken: boolean;
  time?: string;
  dosage?: string;
}

const MAX_WIDTH = 1400;

const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f7f9fb;
  font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
  display: block;
  margin: 0;
  padding: 20px 0;
  box-sizing: border-box;
`;

const DashboardBody = styled.div`
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

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 0 auto 24px auto;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0 auto 20px auto;
    border-radius: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 32px 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 20px;
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const WelcomeText = styled.h1`
  font-size: 2.2rem;
  color: #2563eb;
  margin: 0;
  font-weight: 800;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    white-space: normal;
    text-align: center;
  }
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 6px 24px rgba(37, 99, 235, 0.08);
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

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #2563eb;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
`;

const CardValue = styled.p<{ color?: string }>`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.color || '#007bff'};
  margin: 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

const CardButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  background-color: ${(props) =>
    props.variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary' ? '#5a6268' : '#0056b3'};
  }
`;

const NotificationCard = styled(DashboardCard)`
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

const NotificationScrollContainer = styled.div`
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

const NotificationItem = styled.div`
  min-width: 280px;
  flex-shrink: 0;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #343a40;
`;

const NotificationMessage = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #6c757d;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: 12px;
  color: #adb5bd;
  font-weight: 500;
`;

// 오늘 식사 목록 컴포넌트
const TodayMealsList: React.FC = () => {
  const [todayMeals, setTodayMeals] = useState<MealRecord[]>([]);

  useEffect(() => {
    const loadTodayMeals = () => {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const meals = JSON.parse(savedMeals);
        const today = new Date().toISOString().split('T')[0];
        const todayMealsList = meals.filter(
          (meal: MealRecord) => meal.date === today
        );
        setTodayMeals(todayMealsList);
      }
    };

    loadTodayMeals();

    // storage 이벤트 리스너로 실시간 업데이트
    const handleStorageChange = () => {
      loadTodayMeals();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadTodayMeals);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadTodayMeals);
    };
  }, []);

  // 시간대별 식사 기록 상태 생성
  const getMealStatusDisplay = () => {
    const timeSlots = [
      { name: '아침', startHour: 6, endHour: 12 },
      { name: '점심', startHour: 12, endHour: 17 },
      { name: '저녁', startHour: 17, endHour: 23 },
    ];

    return timeSlots.map((timeSlot) => {
      // 일반 식사 시간대
      const mealsInTimeSlot = todayMeals.filter((meal) => {
        const mealHour = parseInt(meal.time.split(':')[0]);
        return mealHour >= timeSlot.startHour && mealHour < timeSlot.endHour;
      });

      const recordCount = mealsInTimeSlot.length;
      let statusText;

      if (recordCount === 0) {
        statusText = '기록되지 않음';
      } else {
        // 가장 최근 기록된 시간 사용
        const latestMeal = mealsInTimeSlot[mealsInTimeSlot.length - 1];
        statusText = `${latestMeal.time}에 기록됨`;
      }

      return (
        <div
          key={timeSlot.name}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 0',
            fontSize: '14px',
          }}
        >
          <span style={{ fontWeight: '600', color: '#495057' }}>
            {timeSlot.name}:
          </span>
          <span
            style={{
              color: recordCount > 0 ? '#28a745' : '#6c757d',
              fontSize: '13px',
            }}
          >
            {statusText}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: '8px 0',
      }}
    >
      {getMealStatusDisplay()}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // localStorage에서 약물 데이터 읽어오기
  const [medications, setMedications] = useState(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : mockMedications;
  });

  // 실제 약물 기반 알림과 기존 알림 통합
  const generateAllNotifications = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const medicationNotifications: NotificationItem[] = [];

    // 실제 약물 데이터 기반 알림 생성
    medications.forEach((med: Medication) => {
      if (med.timeSlots && med.timeSlots.length > 0) {
        med.timeSlots.forEach((timeSlot) => {
          const [hour] = timeSlot.split(':').map(Number);

          // 복용 시간이 지났지만 아직 복용하지 않은 경우
          if (currentHour >= hour && !med.taken) {
            medicationNotifications.push({
              id: `med-${med.id}-${timeSlot}`,
              title: `💊 ${med.name} 복용 시간`,
              message: `${timeSlot}에 복용 예정이었습니다. 놓치지 마세요!`,
              time: `${Math.abs(currentHour - hour)}시간 전`,
              type: 'medication-overdue',
            });
          }
          // 복용 시간이 1시간 이내로 다가온 경우
          else if (hour - currentHour <= 1 && hour - currentHour > 0) {
            medicationNotifications.push({
              id: `med-${med.id}-${timeSlot}`,
              title: `⏰ ${med.name} 복용 예정`,
              message: `${timeSlot}에 복용 예정입니다. 준비해주세요.`,
              time: `${hour - currentHour}시간 후`,
              type: 'medication-upcoming',
            });
          }
        });
      }
    });

    // 기존 일반 알림들 (약 관련 제외)
    const generalNotifications = mockNotifications.filter(
      (notification) => notification.type !== 'medication'
    );

    // 약물이 등록되어 있고 실제 약물 알림이 있으면 약물 알림 + 일반 알림
    // 약물이 등록되어 있지만 알림이 없거나, 약물이 없으면 일반 알림만 표시
    return medications.length > 0 && medicationNotifications.length > 0
      ? [...medicationNotifications, ...generalNotifications]
      : generalNotifications;
  };

  // medications 변경 감지를 위한 useEffect
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMedications = localStorage.getItem('medications');
      if (savedMedications) {
        setMedications(JSON.parse(savedMedications));
      }
    };

    // storage 이벤트 리스너 추가
    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트가 focus될 때마다 데이터 새로고침
    const handleFocus = () => {
      const savedMedications = localStorage.getItem('medications');
      if (savedMedications) {
        setMedications(JSON.parse(savedMedications));
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const takenMedications = medications.filter(
    (med: Medication) => med.taken
  ).length;
  const totalMedications = medications.length;

  return (
    <DashboardWrapper>
      <HeaderWrapper>
        <Header>
          <WelcomeText>안녕하세요, 사용자님!</WelcomeText>
          <div style={{ display: 'flex', gap: '12px' }}>
            <NavButton onClick={() => navigate('/')}>홈으로</NavButton>
            <NavButton onClick={logout}>로그아웃</NavButton>
          </div>
        </Header>
      </HeaderWrapper>

      <DashboardBody>
        {/* 오늘의 알림 - 그리드 위에 단독 배치 */}
        <NotificationCard>
          <div
            style={{
              fontSize: '16px',
              color: '#6c757d',
              marginBottom: '8px',
              fontWeight: 500,
            }}
          >
            {today}
          </div>
          <CardTitle>🔔 오늘의 알림</CardTitle>

          <NotificationScrollContainer>
            {generateAllNotifications().map((notification) => (
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
          {/* 약물 복용 현황 */}
          <DashboardCard>
            <CardTitle>💊 오늘의 약 복용</CardTitle>
            <CardValue color="#007bff">
              {takenMedications} / {totalMedications}
            </CardValue>
            <CardDescription>복용 완료</CardDescription>

            {/* 복용 기록 섹션 추가 */}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#2563eb',
                }}
              >
                📈 건강 관리 현황
              </div>
              <div
                style={{
                  margin: '8px 0',
                  fontSize: '14px',
                  color: '#007bff',
                  fontWeight: 600,
                }}
              >
                꾸준한 관리로 건강을 지켜나가고 있어요
              </div>
              <div
                style={{
                  margin: '4px 0 12px 0',
                  fontSize: '12px',
                  color: '#ff6b35',
                  fontWeight: 500,
                  lineHeight: '1.3',
                }}
              >
                💪 오늘도 건강한 하루 보내세요! ✨
              </div>
            </div>

            <CardButton
              onClick={() => navigate('/medication')}
              style={{ marginTop: '16px' }}
            >
              약 복용 확인하기
            </CardButton>
          </DashboardCard>

          {/* 식사 기록 */}
          <DashboardCard>
            <CardTitle>🍽️ 식사 기록</CardTitle>
            <CardDescription style={{ marginBottom: '20px' }}>
              간편하게 식사를 기록하고
              <br />
              건강한 식습관을 만들어보세요
            </CardDescription>

            {/* 오늘의 식사 목록 섹션 */}
            <div
              style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#495057',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                📝 오늘 식사 목록
              </div>
              <TodayMealsList />
            </div>

            <CardButton onClick={() => navigate('/diet')}>
              식사 기록하기
            </CardButton>
          </DashboardCard>

          {/* 운동 현황 */}
          <DashboardCard>
            <CardTitle>🚶‍♂️ 오늘의 운동</CardTitle>
            <CardValue color="#28a745">
              {mockExerciseData.today.steps.toLocaleString()}보
            </CardValue>
            <CardDescription>
              {mockExerciseData.today.distance} •{' '}
              {mockExerciseData.today.duration}
            </CardDescription>

            {/* 이웃 비교 섹션 추가 */}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#28a745',
                }}
              >
                👥 이웃과 비교
              </div>
              <div
                style={{
                  margin: '8px 0',
                  fontSize: '14px',
                  color: '#28a745',
                  fontWeight: 600,
                }}
              >
                이웃 평균:{' '}
                <span style={{ color: '#6c757d', fontWeight: 500 }}>
                  {mockExerciseData.neighborComparison.neighborAverage.toLocaleString()}
                  보
                </span>
              </div>
              <div
                style={{
                  margin: '4px 0 12px 0',
                  fontSize: '12px',
                  color: '#ff9800',
                  fontWeight: 500,
                }}
              >
                🏆 {mockExerciseData.neighborComparison.ranking}로 우수해요!
              </div>
            </div>

            <CardButton
              onClick={() => navigate('/exercise')}
              style={{ marginTop: '16px' }}
            >
              운동 기록 보기
            </CardButton>
          </DashboardCard>

          {/* AI 음성 채팅 */}
          <DashboardCard>
            <CardTitle>🤖 AI 음성 상담</CardTitle>
            <CardDescription style={{ marginBottom: '40px' }}>
              건강 관련 질문이나
              <br />
              궁금한 점을 물어보세요
            </CardDescription>
            <CardButton onClick={() => navigate('/chat')}>
              AI와 대화하기
            </CardButton>
          </DashboardCard>
        </GridContainer>
      </DashboardBody>
    </DashboardWrapper>
  );
};

export default Dashboard;
