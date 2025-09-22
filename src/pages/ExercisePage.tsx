import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockExerciseData } from '../data/mockData';
import {
  CardTitle,
  ExerciseWrapper,
  ExerciseHeader,
  PageTitle,
  ToggleViewButton,
  SectionTitle,
  SummaryGrid,
  ExerciseCard,
  CardIcon,
  CardValue,
  CardUnit,
  ProgressWrapper,
  ProgressBarContainer,
  ProgressBar,
  ProgressText,
  TipCard,
  TipItem,
  WeeklySummaryCard,
  WeeklySummaryItem,
  WeeklySummaryLabel,
  WeeklySummaryValue,
  DailyRecordCard,
  DailyRecordItem,
  DayInfo,
  DayText,
  DurationText,
  StepsInfo,
  StepsText,
  StepsPercentage,
  GoalProgressCard,
  GoalProgressBarWithText,
} from '../styles/pages/ExercisePage.styles';
import { NavButton } from '../components/StyledComponents';

const ExercisePage: React.FC = () => {
  const navigate = useNavigate();
  const [showWeekly, setShowWeekly] = useState(false);

  const today = mockExerciseData.today;
  const weekly = mockExerciseData.weekly;

  const getStepGoal = () => 5000;
  const getStepPercentage = () => (today.steps / getStepGoal()) * 100;

  return (
    <ExerciseWrapper>
      <ExerciseHeader>
        <PageTitle>🚶‍♂️ 운동 기록</PageTitle>
        <div>
          <ToggleViewButton onClick={() => setShowWeekly(!showWeekly)}>
            {showWeekly ? '오늘' : '주간'}
          </ToggleViewButton>
          <NavButton onClick={() => navigate('/dashboard')}>
            대시보드 메인
          </NavButton>
        </div>
      </ExerciseHeader>

      {!showWeekly ? (
        <>
          <SectionTitle>오늘의 운동</SectionTitle>

          <SummaryGrid>
            <ExerciseCard>
              <CardIcon>👟</CardIcon>
              <CardValue color="#28a745">
                {today.steps.toLocaleString()}
              </CardValue>
              <CardUnit>보</CardUnit>
              <ProgressWrapper>
                <ProgressBarContainer>
                  <ProgressBar
                    percentage={Math.min(getStepPercentage(), 100)}
                  />
                </ProgressBarContainer>
                <ProgressText>
                  목표: {getStepGoal().toLocaleString()}보 (
                  {Math.round(getStepPercentage())}%)
                </ProgressText>
              </ProgressWrapper>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>📏</CardIcon>
              <CardValue color="#007bff">{today.distance}</CardValue>
              <CardUnit>이동 거리</CardUnit>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>⏱️</CardIcon>
              <CardValue color="#ffc107">{today.duration}</CardValue>
              <CardUnit>총 운동 시간</CardUnit>
            </ExerciseCard>

            <ExerciseCard>
              <CardIcon>🔥</CardIcon>
              <CardValue color="#dc3545">{today.calories}</CardValue>
              <CardUnit>kcal</CardUnit>
            </ExerciseCard>
          </SummaryGrid>

          <TipCard style={{ marginTop: '32px', padding: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <SectionTitle
                style={{ marginTop: 0, fontSize: '24px', marginBottom: '24px' }}
              >
                🏆 이웃과 활동량 비교
              </SectionTitle>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '60px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    권장 걸음 수
                  </div>
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#9c27b0',
                      marginBottom: '16px',
                    }}
                  >
                    6,000보
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    동네 평균 걸음 수
                  </div>
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#007bff',
                      marginBottom: '16px',
                    }}
                  >
                    4,200보
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '8px',
                    }}
                  >
                    내 걸음 수
                  </div>
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#28a745',
                      marginBottom: '16px',
                    }}
                  >
                    {today.steps.toLocaleString()}보
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: '24px',
                  padding: '16px',
                  backgroundColor: '#fff3cd',
                  borderRadius: '8px',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#856404',
                }}
              >
                🎉 상위 35%입니다! 정말 잘하고 계세요! 👏
              </div>
            </div>
          </TipCard>

          <TipCard style={{ marginTop: '32px', padding: '40px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <div style={{ flex: '1', textAlign: 'center' }}>
                <SectionTitle
                  style={{
                    marginTop: 0,
                    fontSize: '24px',
                    marginBottom: '24px',
                    textAlign: 'center',
                  }}
                >
                  💡 오늘의 운동 팁
                </SectionTitle>
                <TipItem
                  style={{
                    fontSize: '18px',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    textAlign: 'center',
                  }}
                >
                  • <strong>아침 스트레칭:</strong> 아침에 10분씩 가벼운
                  스트레칭을 하면 관절이 부드러워지고 하루 종일 활력이 넘칩니다.
                  목, 어깨, 허리를 천천히 풀어주세요.
                </TipItem>
                <TipItem
                  style={{
                    fontSize: '18px',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    textAlign: 'center',
                  }}
                >
                  • <strong>계단 운동:</strong> 엘리베이터 대신 계단을 이용하면
                  다리 근육 강화와 심폐기능 향상에 도움이 됩니다. 무릎에 무리가
                  가지 않도록 천천히 올라가세요.
                </TipItem>
                <TipItem
                  style={{
                    fontSize: '18px',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    textAlign: 'center',
                  }}
                >
                  • <strong>수분 섭취:</strong> 운동 전후로 충분한 물을 마셔
                  탈수를 예방하고, 근육 경련을 방지하세요. 하루 8잔 이상의 물을
                  마시는 것이 좋습니다.
                </TipItem>
                <TipItem
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    textAlign: 'center',
                  }}
                >
                  • <strong>걷기 운동:</strong> 매일 30분씩 꾸준히 걷기만 해도
                  혈압 조절, 당뇨 예방, 체중 관리에 탁월한 효과가 있습니다.
                  공원이나 산책로를 이용해보세요.
                </TipItem>
              </div>
            </div>
          </TipCard>
        </>
      ) : (
        <>
          <SectionTitle>주간 운동 기록</SectionTitle>

          <WeeklySummaryCard>
            <CardTitle>이번 주 운동 요약</CardTitle>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>총 걸음수</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {weekly
                  .reduce((sum, day) => sum + day.steps, 0)
                  .toLocaleString()}
                보
              </WeeklySummaryValue>
            </WeeklySummaryItem>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>평균 걸음수</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {Math.round(
                  weekly.reduce((sum, day) => sum + day.steps, 0) / 7
                ).toLocaleString()}
                보
              </WeeklySummaryValue>
            </WeeklySummaryItem>
            <WeeklySummaryItem>
              <WeeklySummaryLabel>총 운동 시간</WeeklySummaryLabel>
              <WeeklySummaryValue>
                {weekly.reduce((sum, day) => sum + parseInt(day.duration), 0)}분
              </WeeklySummaryValue>
            </WeeklySummaryItem>
          </WeeklySummaryCard>

          <DailyRecordCard>
            <CardTitle>일별 운동 기록</CardTitle>
            {weekly.map((day, index) => (
              <DailyRecordItem key={day.day} isToday={index === 6}>
                <DayInfo>
                  <DayText>{day.day}요일</DayText>
                  <DurationText>{day.duration} 운동</DurationText>
                </DayInfo>
                <StepsInfo>
                  <StepsText>{day.steps.toLocaleString()}보</StepsText>
                  <StepsPercentage>
                    {Math.round((day.steps / getStepGoal()) * 100)}%
                  </StepsPercentage>
                </StepsInfo>
              </DailyRecordItem>
            ))}
          </DailyRecordCard>

          <GoalProgressCard>
            <CardTitle>주간 목표 달성률</CardTitle>
            <GoalProgressBarWithText percentage={85}>
              <div />
            </GoalProgressBarWithText>
            <ProgressText>이번 주 목표 달성률</ProgressText>
          </GoalProgressCard>
        </>
      )}
    </ExerciseWrapper>
  );
};

export default ExercisePage;
