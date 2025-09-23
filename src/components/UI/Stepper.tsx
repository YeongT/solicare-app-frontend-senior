import React from 'react';
import styled, { css } from 'styled-components';

interface Step {
  label: string;
  status: 'active' | 'completed' | 'error' | 'incomplete' | 'warning';
}

interface StepperProps {
  steps: Step[];
  onStepClick?: (stepIndex: number) => void;
}

const StepperContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0;
  margin-bottom: 32px;
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  z-index: 2;
`;

const StepCircle = styled.div<{ status: Step['status']; clickable?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
  background: #f3f4f6;
  border: 2px solid #d1d5db;
  color: #9ca3af;
  transition: all 0.2s;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  position: relative;
  z-index: 3;

  ${({ clickable }) =>
    clickable &&
    css`
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
    `}

  ${({ status }) =>
    status === 'active' &&
    css`
      border-color: #3b82f6;
      background: #3b82f6;
      color: #fff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    `}

  ${({ status }) =>
    status === 'completed' &&
    css`
      border-color: #22c55e;
      background: #22c55e;
      color: #fff;
    `}

  ${({ status }) =>
    status === 'error' &&
    css`
      border-color: #ef4444;
      background: #ef4444;
      color: #fff;
    `}

  ${({ status }) =>
    status === 'warning' &&
    css`
      border-color: #f59e0b;
      background: #f59e0b;
      color: #fff;
    `}
`;

const StepLabel = styled.div<{ status: Step['status'] }>`
  margin-top: 8px;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  font-weight: 500;

  ${({ status }) =>
    status === 'active' &&
    css`
      color: #3b82f6;
      font-weight: 600;
    `}

  ${({ status }) =>
    status === 'completed' &&
    css`
      color: #22c55e;
      font-weight: 600;
    `}

  ${({ status }) =>
    status === 'error' &&
    css`
      color: #ef4444;
      font-weight: 600;
    `}

  ${({ status }) =>
    status === 'warning' &&
    css`
      color: #f59e0b;
      font-weight: 600;
    `}
`;

const ConnectorLine = styled.div<{ isCompleted: boolean; isWarning: boolean }>`
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e5e7eb;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ isCompleted, isWarning }) =>
      isCompleted || isWarning ? '100%' : '0%'};
    background: ${({ isWarning }) => (isWarning ? '#f59e0b' : '#22c55e')};
    transition: width 0.3s ease;
  }
`;

const StepConnectorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 18px;
  right: 18px;
  height: 36px;
  z-index: 1;
  display: flex;
  align-items: center;
`;

export const Stepper: React.FC<StepperProps> = ({ steps, onStepClick }) => {
  return (
    <StepperContainer>
      {/* 연결선을 위한 배경 요소 */}
      <StepConnectorWrapper>
        {steps.map((step, idx) => {
          if (idx === steps.length - 1) return null;

          const nextStep = steps[idx + 1];
          const isCompleted =
            step.status === 'completed' &&
            (nextStep.status === 'completed' || nextStep.status === 'active');
          const isWarning =
            step.status === 'warning' &&
            (nextStep.status === 'warning' || nextStep.status === 'active');

          return (
            <ConnectorLine
              key={`connector-${idx}`}
              isCompleted={isCompleted}
              isWarning={isWarning}
              style={{
                left: `${(100 / (steps.length - 1)) * idx}%`,
                width: `${100 / (steps.length - 1)}%`,
              }}
            />
          );
        })}
      </StepConnectorWrapper>

      {/* 스텝 요소들 */}
      {steps.map((step, idx) => (
        <StepWrapper key={step.label}>
          <StepCircle
            status={step.status}
            clickable={!!onStepClick}
            aria-current={step.status === 'active' ? 'step' : undefined}
            onClick={() => onStepClick && onStepClick(idx + 1)}
          >
            {step.status === 'completed' ? '✓' : idx + 1}
          </StepCircle>
          <StepLabel status={step.status}>{step.label}</StepLabel>
        </StepWrapper>
      ))}
    </StepperContainer>
  );
};
