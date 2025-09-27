import styled from 'styled-components';
import { NavButton } from '../../components/StyledComponents';

export const CardTitle = styled.h3`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  font-weight: 600;
`;

export const ExerciseWrapper = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 24px 35px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PageTitle = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 700;
`;

export const ToggleViewButton = styled(NavButton)`
  margin-left: 15px;
`;

export const SectionTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 40px;
  margin-bottom: 25px;
  font-weight: 600;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin: 40px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ExerciseCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 35px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardIcon = styled.span`
  font-size: 48px;
  margin-bottom: 20px;
`;

export const CardValue = styled.p<{ color?: string }>`
  font-size: 42px;
  font-weight: bold;
  color: ${(props) => props.color || props.theme.colors.text};
  margin: 0;
`;

export const CardUnit = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-top: 8px;
`;

export const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: #28a745;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
`;

export const ProgressText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

export const TipCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 30px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  margin-top: 30px;
`;

export const CompareRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }
`;

export const TipItem = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin: 10px 0;
  line-height: 1.5;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const WeeklySummaryCard = styled(TipCard)`
  margin-bottom: 30px;
`;

export const WeeklySummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const WeeklySummaryLabel = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0;
`;

export const WeeklySummaryValue = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const DailyRecordCard = styled(TipCard)`
  margin-bottom: 30px;
`;

export const DailyRecordItem = styled.div<{ isToday: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${(props) => (props.isToday ? '#e3f2fd' : '#f8f9fa')};
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DayInfo = styled.div`
  text-align: left;
`;

export const DayText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const DurationText = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 5px 0 0 0;
`;

export const StepsInfo = styled.div`
  text-align: right;
`;

export const StepsText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const StepsPercentage = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin: 5px 0 0 0;
`;

export const GoalProgressCard = styled(TipCard)`
  text-align: center;
`;

export const GoalProgressBarWithText = styled.div<{ percentage: number }>`
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 15px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '${(props) => props.percentage}%';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    z-index: 2;
  }

  & > div {
    height: 100%;
    width: ${(props) => props.percentage}%;
    background-color: #28a745;
    border-radius: 15px;
    transition: width 0.5s ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
`;
