import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { mockMedications } from '../data/mockData';
import styled from 'styled-components';
import { StatusBadge, NavButton } from '../components/StyledComponents';

// 기존 호환성을 위한 레거시 인터페이스
interface Medication {
  id: number;
  name: string;
  description: string;
  dailyDosage: string;
  memo: string;
  daysOfWeek: string[];
  timeSlots: string[];
  taken: boolean;
  time?: string; // 기존 데이터 호환성을 위해 유지
  dosage?: string; // 기존 데이터 호환성을 위해 유지
  note?: string; // 기존 데이터 호환성을 위해 유지
}

// 복용 기록 인터페이스
interface MedicationRecord {
  id: string;
  medicationId: number;
  recordTime: string; // ISO 문자열 형태의 시간
  status: 'taken' | 'skipped'; // 복용 또는 건너뜀
  amount?: number; // 복용한 개수 (복용일 때만)
  unit?: string; // 단위 (복용일 때만)
  memo?: string; // 추가 메모
}

// 복용 기록 폼 상태
interface RecordForm {
  recordTime: string;
  status: 'taken' | 'skipped';
  amount: number;
  unit: string;
  memo: string;
}

// Styled Components for Medication Page
const MedicationWrapper = styled.div<{ modalOpen?: boolean }>`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  zoom: 0.8;
  transform-origin: top center;
  position: relative;

  ${(props) =>
    props.modalOpen &&
    `
    overflow: hidden;
    height: 100vh;
  `}
`;

const MedicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  padding: 24px 35px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const PageTitle = styled.h2`
  font-size: 28px;
  color: #343a40;
  margin: 0;
  font-weight: 700;
`;

// Modal Styles
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(1px);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  box-sizing: border-box;
  overflow: hidden !important; /* 오버레이 자체에서 스크롤 완전 방지 */
  transform: translateZ(0);
  animation: ${(props) =>
    props.isOpen ? 'fadeIn 0.2s ease-out' : 'fadeOut 0.15s ease-in'};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 50px;
  width: 98%;
  max-width: 1100px;
  min-width: 800px;
  max-height: 90vh; /* 화면 높이의 90%로 제한 */
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 완전 방지 */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10000;
  transform: translateZ(0);
  will-change: transform;
  margin: auto; /* 센터링을 위해 margin을 auto로 변경 */
  box-sizing: border-box;

  @media (max-width: 1200px) {
    max-width: 900px;
    min-width: 700px;
  }

  @media (max-width: 768px) {
    width: 95%;
    min-width: unset;
    padding: 30px;
    max-height: 85vh; /* 모바일에서는 더 작게 */
  }

  @media (max-width: 480px) {
    width: 98%;
    padding: 25px;
    max-height: 80vh; /* 작은 화면에서는 더 작게 */
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid #e9ecef;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  color: #343a40;
  margin: 0;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 32px;
  color: #6c757d;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #343a40;
  }
`;

const OpenModalButton = styled.button`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MedicationSectionTitle = styled.h3`
  font-size: 24px;
  color: #343a40;
  margin: 0 0 32px 0;
  font-weight: 600;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TopSummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 40px;
`;

const SummarySection = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 60px;
`;

const WeeklyScheduleSection = styled.div`
  flex: 0.6;
`;

const SummaryText = styled.p`
  font-size: 26px;
  color: #555;
  margin-bottom: 20px;
`;

const SummaryValue = styled.p`
  font-size: 64px;
  font-weight: bold;
  color: #007bff;
  margin: 0 0 20px 0;
`;

const MedicationProgress = styled.div`
  width: 100%;
  height: 25px;
  background-color: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

const MedicationProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #28a745;
  border-radius: 12px;
  transition: width 0.5s ease-in-out;
`;

const MedicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const MedicationCard = styled.div<{ taken: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 200px;
  transition: transform 0.2s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MedicationContent = styled.div`
  margin-bottom: 16px;
`;

const MedicationName = styled.h4`
  font-size: 22px;
  color: #343a40;
  margin: 0;
  font-weight: 600;
  flex: 1;
`;

const MedicationCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

const MedicationTimeDosage = styled.p`
  font-size: 20px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

const MedicationNote = styled.p`
  font-size: 18px;
  color: #888;
  margin: 0;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: center;
`;

const MedicationButton = styled.button<{ taken: boolean }>`
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: ${(props) => (props.taken ? '#6c757d' : '#007bff')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => (props.taken ? '#5a6268' : '#0056b3')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardDeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardEditButton = styled.button`
  background: #fd7e14;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #e76a00;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// 알림 다이얼로그 스타일 컴포넌트들
const NotificationOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 10001;
  box-sizing: border-box;
  overflow: hidden !important; /* 알림 오버레이에서도 스크롤 완전 방지 */
  transform: translateZ(0);
  animation: ${(props) =>
    props.isOpen ? 'fadeIn 0.15s ease-out' : 'fadeOut 0.1s ease-in'};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const NotificationDialog = styled.div<{ type: 'success' | 'error' }>`
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 90%;
  max-width: 400px;
  min-width: 300px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10002;
  transform: translateZ(0);
  text-align: center;
  border-left: 6px solid
    ${(props) => (props.type === 'success' ? '#28a745' : '#dc3545')};

  @media (max-width: 768px) {
    width: 95%;
    min-width: unset;
    padding: 30px;
    margin: 20px;
  }
`;

const NotificationIcon = styled.div<{ type: 'success' | 'error' }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.type === 'success' ? '#28a745' : '#dc3545'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 20px;
  animation: scaleIn 0.3s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const NotificationTitle = styled.h3<{ type: 'success' | 'error' }>`
  font-size: 24px;
  color: ${(props) => (props.type === 'success' ? '#28a745' : '#dc3545')};
  margin: 0 0 16px 0;
  font-weight: 700;
`;

const NotificationMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

const NotificationProgress = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 20px;
`;

const NotificationProgressBar = styled.div<{ type: 'success' | 'error' }>`
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.type === 'success' ? '#28a745' : '#dc3545'};
  border-radius: 2px;
  animation: countdown 2.5s linear forwards;

  @keyframes countdown {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// 새로운 레이아웃 스타일 컴포넌트들
const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  margin-bottom: 30px;
`;

const DosageSection = styled.div`
  margin-bottom: 30px;
`;

const DosageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  label {
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.isActive ? '#007bff' : '#e0e0e0')};
  background: ${(props) => (props.isActive ? '#007bff' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#666')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    background: ${(props) => (props.isActive ? '#0056b3' : '#f8f9fa')};
  }
`;

const DetailedDosageInputs = styled.div``;

const DosageRow = styled.div`
  display: grid;
  grid-template-columns: 150px 120px 30px 150px 30px;
  gap: 10px;
  align-items: end;
  margin-bottom: 15px;
  justify-content: center;
`;

const SimpleDosageInput = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 300px;
  }
`;

const DosageInputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

const DaySection = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 15px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }
`;

const DaySectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  label {
    margin-bottom: 0;
  }
`;

const SelectAllButton = styled.button<{ isAllSelected: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${(props) => (props.isAllSelected ? '#dc3545' : '#007bff')};
  background: ${(props) => (props.isAllSelected ? '#dc3545' : '#007bff')};
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const DayButton = styled.button<{ isSelected: boolean }>`
  padding: 12px;
  border: 2px solid ${(props) => (props.isSelected ? '#007bff' : '#e0e0e0')};
  background: ${(props) => (props.isSelected ? '#007bff' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : '#333')};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #007bff;
    background: ${(props) => (props.isSelected ? '#0056b3' : '#f8f9fa')};
  }
`;

const TimeSection = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 15px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }
`;

const TimeSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  label {
    margin-bottom: 0;
  }
`;

const TimePresetButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const TimePresetButton = styled.button`
  padding: 6px 12px;
  border: 2px solid #28a745;
  background: #28a745;
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const TimeButton = styled.button<{ isSelected: boolean }>`
  padding: 12px 15px;
  border: 2px solid ${(props) => (props.isSelected ? '#007bff' : '#e0e0e0')};
  background: ${(props) => (props.isSelected ? '#007bff' : 'white')};
  color: ${(props) => (props.isSelected ? 'white' : '#333')};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: #007bff;
    background: ${(props) => (props.isSelected ? '#0056b3' : '#f8f9fa')};
  }
`;

const MemoSection = styled.div`
  margin-bottom: 30px;
`;

const MemoButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => (props.isActive ? '#007bff' : '#e0e0e0')};
  background: ${(props) => (props.isActive ? '#f8f9fa' : 'white')};
  color: #333;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: #007bff;
    background: #f8f9fa;
  }
`;

const MemoTextarea = styled.div`
  margin-top: 15px;

  textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ccc;
    background: #f8f9fa;
  }
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #007bff;
  background: #007bff;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
    border-color: #0056b3;
  }
`;

const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

// 복용 기록 다이얼로그 스타일 컴포넌트들
const RecordModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px 50px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 완전 방지 */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10000;
  transform: translateZ(0);
  will-change: transform;
  margin: auto; /* 센터링을 위해 margin을 auto로 변경 */
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
    padding: 30px;
    max-height: 75vh; /* 모바일에서는 더 작게 */
  }

  @media (max-width: 480px) {
    width: 98%;
    padding: 25px;
    max-height: 70vh; /* 작은 화면에서는 더 작게 */
  }
`;

const RecordModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;

  h2 {
    margin: 0;
    color: #333;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
`;

const StatusToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const StatusButton = styled.button<{
  isActive: boolean;
  statusType: 'taken' | 'skipped';
}>`
  padding: 16px 20px;
  border: 2px solid
    ${(props) => {
      if (props.isActive) {
        return props.statusType === 'taken' ? '#4caf50' : '#ff5722';
      }
      return '#e0e0e0';
    }};
  background: ${(props) => {
    if (props.isActive) {
      return props.statusType === 'taken'
        ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
        : 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)';
    }
    return 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
  }};
  color: ${(props) => (props.isActive ? 'white' : '#666')};
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  box-shadow: ${(props) =>
    props.isActive
      ? '0 4px 12px rgba(0, 0, 0, 0.15)'
      : '0 2px 4px rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.isActive
        ? '0 6px 16px rgba(0, 0, 0, 0.2)'
        : '0 4px 8px rgba(0, 0, 0, 0.1)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

// 복용 기록 다이얼로그용 추가 스타일 컴포넌트들
const RecordDateSection = styled.div`
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }
`;

const DateDisplay = styled.div`
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  color: #495057;
  font-weight: 500;
`;

const TimeInputGroup = styled.div`
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }

  input[type='time'] {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
`;

const RecordAmountSection = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  margin-bottom: 24px;

  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }
`;

const RecordAmountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 12px;
  align-items: end;

  input[type='number'] {
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }

  select {
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    background-color: white;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
`;

const RecordMemoSection = styled.div`
  margin-bottom: 30px;
`;

const RecordMemoButton = styled.button<{ isActive: boolean }>`
  padding: 12px 20px;
  border: 2px solid ${(props) => (props.isActive ? '#007bff' : '#e9ecef')};
  background: ${(props) => (props.isActive ? '#007bff' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#6c757d')};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #007bff;
    color: ${(props) => (props.isActive ? 'white' : '#007bff')};
  }
`;

const RecordMemoTextarea = styled.div`
  margin-top: 16px;

  textarea {
    width: 100%;
    padding: 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: #adb5bd;
    }
  }
`;

const MedicationPage: React.FC = () => {
  const navigate = useNavigate();

  // localStorage에서 약물 데이터 불러오기
  const [medications, setMedications] = useState(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : mockMedications;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 알림 다이얼로그 상태
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  // 알림 표시 함수
  const showNotification = (
    type: 'success' | 'error',
    title: string,
    message: string
  ) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
    });

    // 2.5초 후 자동으로 닫기 (더 빠르게)
    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        isOpen: false,
      }));
    }, 2500);
  };

  // 약물 데이터가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  // 약물 데이터가 변경될 때마다 localStorage에 저장
  React.useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  // 메모 표시 상태
  const [showMemo, setShowMemo] = useState(false);

  // 복용 기록 관련 상태
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedMedicationForRecord, setSelectedMedicationForRecord] =
    useState<Medication | null>(null);
  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);
  const [recordForm, setRecordForm] = useState<RecordForm>({
    recordTime: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:MM 형식
    status: 'taken',
    amount: 1,
    unit: '정',
    memo: '',
  });

  // 복용 기록 다이얼로그 메모 접기/펼치기 상태
  const [showRecordMemo, setShowRecordMemo] = useState(false);

  // 현재 날짜와 시간을 분리하는 헬퍼 함수들
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [recordTime, setRecordTime] = useState(getCurrentTime());

  // 모달 상태에 따른 body 스크롤 제어 (새 약 추가 + 복용 기록 모달)
  React.useEffect(() => {
    if (isModalOpen || isRecordModalOpen) {
      // 더 강력한 스크롤 방지
      document.body.style.overflow = 'hidden !important';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden !important';
      document.documentElement.style.height = '100vh';
    } else {
      // 스타일 복원
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }

    // 컴포넌트 언마운트 시 스타일 복원
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, [isModalOpen, isRecordModalOpen]);

  // 복용 기록 데이터 로드 및 저장
  React.useEffect(() => {
    const savedRecords = localStorage.getItem('medicationRecords');
    if (savedRecords) {
      setMedicationRecords(JSON.parse(savedRecords));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      'medicationRecords',
      JSON.stringify(medicationRecords)
    );
  }, [medicationRecords]);

  // 새 약 추가 폼 상태 - 상세 정보
  const [newMedication, setNewMedication] = useState({
    name: '',
    description: '',
    dailyDosage: '',
    memo: '',
    daysOfWeek: [] as string[],
    timeSlots: [] as string[],
  });

  // 복용량 입력 방식 상태
  const [dosageInputType, setDosageInputType] = useState<'detailed' | 'simple'>(
    'detailed'
  );
  const [dosageDetails, setDosageDetails] = useState({
    amountPerDose: '', // 1회 복용량
    amountUnit: '정', // 단위 (정, 개, mL, 회, 배 등)
    timesPerDay: '', // 하루 복용 횟수
    totalAmount: '', // 총 복용량 (간단 입력 시)
    totalUnit: '정', // 총량 단위
  });

  const unitOptions = ['정', '개', 'mL', '회', '배', '포', '캡슐', '방울'];

  const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
  const timeSlotOptions = [
    '아침 (06:00-09:00)',
    '점심 (11:00-14:00)',
    '저녁 (17:00-20:00)',
    '취침 전 (21:00-23:00)',
  ];

  const handleDayOfWeekChange = (day: string) => {
    setNewMedication((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter((d) => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  // 매일 선택/해제 함수
  const toggleAllDays = () => {
    const allDays = ['월', '화', '수', '목', '금', '토', '일'];
    const isAllSelected = allDays.every((day) =>
      newMedication.daysOfWeek.includes(day)
    );

    setNewMedication((prev) => ({
      ...prev,
      daysOfWeek: isAllSelected ? [] : allDays,
    }));
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(timeSlot)
        ? prev.timeSlots.filter((t) => t !== timeSlot)
        : [...prev.timeSlots, timeSlot],
    }));
  };

  // 시간대 빠른 선택 함수들
  const setMorningEvening = () => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: ['아침 (06:00-09:00)', '저녁 (17:00-20:00)'],
    }));
  };

  const setMorningLunchDinner = () => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: [
        '아침 (06:00-09:00)',
        '점심 (11:00-14:00)',
        '저녁 (17:00-20:00)',
      ],
    }));
  };

  const setAllTimes = () => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: [...timeSlotOptions],
    }));
  };

  // 복용량 문자열 생성 함수
  const generateDosageString = (): string => {
    if (dosageInputType === 'detailed') {
      const { amountPerDose, amountUnit, timesPerDay } = dosageDetails;
      if (amountPerDose && timesPerDay && amountUnit) {
        return `1회 ${amountPerDose}${amountUnit} × ${timesPerDay}회`;
      }
    } else {
      const { totalAmount, totalUnit } = dosageDetails;
      if (totalAmount && totalUnit) {
        return `총 ${totalAmount}${totalUnit}`;
      }
    }
    return '';
  };

  // 폼 유효성 검사
  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    if (!newMedication.name.trim()) {
      return { isValid: false, errorMessage: '약 이름을 입력해주세요.' };
    }
    if (!newMedication.description.trim()) {
      return { isValid: false, errorMessage: '약 설명을 입력해주세요.' };
    }
    if (!generateDosageString()) {
      return {
        isValid: false,
        errorMessage: '복용량 정보를 모두 입력해주세요.',
      };
    }
    if (newMedication.daysOfWeek.length === 0) {
      return { isValid: false, errorMessage: '복용할 요일을 선택해주세요.' };
    }
    if (newMedication.timeSlots.length === 0) {
      return { isValid: false, errorMessage: '복용할 시간대를 선택해주세요.' };
    }
    return { isValid: true, errorMessage: '' };
  };

  const addMedication = () => {
    const validation = validateForm();

    if (validation.isValid) {
      const finalDosage = generateDosageString();

      const newMed = {
        id: Date.now(),
        name: newMedication.name,
        description: newMedication.description,
        dailyDosage: finalDosage,
        memo: newMedication.memo,
        daysOfWeek: newMedication.daysOfWeek,
        timeSlots: newMedication.timeSlots,
        taken: false,
        // 기존 인터페이스 호환성을 위한 필드들
        time: newMedication.timeSlots[0]?.includes('아침')
          ? '08:00'
          : newMedication.timeSlots[0]?.includes('점심')
            ? '12:00'
            : newMedication.timeSlots[0]?.includes('저녁')
              ? '18:00'
              : '21:00',
        dosage: finalDosage,
        note: newMedication.memo,
      };

      setMedications([...medications, newMed]);
      resetForm();
      closeModal();

      // 성공 알림 표시
      showNotification(
        'success',
        '약 추가 완료!',
        `${newMedication.name}이(가) 성공적으로 추가되었습니다.`
      );
    } else {
      // 실패 알림 표시
      showNotification('error', '입력 오류', validation.errorMessage);
    }
  };

  const resetForm = () => {
    setNewMedication({
      name: '',
      description: '',
      dailyDosage: '',
      memo: '',
      daysOfWeek: [],
      timeSlots: [],
    });
    setDosageDetails({
      amountPerDose: '',
      amountUnit: '정',
      timesPerDay: '',
      totalAmount: '',
      totalUnit: '정',
    });
    setDosageInputType('detailed');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // 복용 기록 모달 열기
  const openRecordModal = (medication: Medication) => {
    setSelectedMedicationForRecord(medication);
    setRecordForm({
      recordTime: new Date().toISOString().slice(0, 16),
      status: 'taken',
      amount: 1,
      unit: '정',
      memo: '',
    });
    setRecordTime(getCurrentTime());
    setShowRecordMemo(false);
    setIsRecordModalOpen(true);
  };

  // 복용 기록 모달 닫기
  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
    setSelectedMedicationForRecord(null);
  };

  // 복용 기록 저장
  const saveRecord = () => {
    if (!selectedMedicationForRecord) return;

    // 현재 날짜와 선택된 시간을 결합하여 ISO 문자열 생성
    const currentDate = getCurrentDate();
    const combinedDateTime = `${currentDate}T${recordTime}:00`;

    const newRecord: MedicationRecord = {
      id: Date.now().toString(),
      medicationId: selectedMedicationForRecord.id,
      recordTime: combinedDateTime,
      status: recordForm.status,
      amount: recordForm.status === 'taken' ? recordForm.amount : undefined,
      unit: recordForm.status === 'taken' ? recordForm.unit : undefined,
      memo: recordForm.memo || undefined,
    };

    setMedicationRecords((prev) => [...prev, newRecord]);

    // 복용 상태 업데이트: 복용 기록이 추가되면 해당 약물의 taken 상태 업데이트
    setMedications((prevMeds: Medication[]) =>
      prevMeds.map((med: Medication) =>
        med.id === selectedMedicationForRecord.id
          ? { ...med, taken: recordForm.status === 'taken' }
          : med
      )
    );

    // 다이얼로그를 빠르게 닫기
    closeRecordModal();

    // 성공 알림을 짧은 지연 후 표시 (다이얼로그가 완전히 닫힌 후)
    setTimeout(() => {
      setNotification({
        isOpen: true,
        type: 'success',
        title: '복용 기록이 저장되었습니다!',
        message: `${selectedMedicationForRecord.name}의 ${recordForm.status === 'taken' ? '복용' : '건너뜀'} 기록이 추가되었습니다.`,
      });

      // 알림 자동 닫기 시간을 더 빠르게 설정 (2초)
      setTimeout(() => {
        setNotification((prev) => ({
          ...prev,
          isOpen: false,
        }));
      }, 2000);
    }, 150);
  };

  // 복용 현황 메시지 생성
  const getStatusMessage = (): string => {
    const today = new Date().toLocaleDateString('ko-KR', { weekday: 'long' });
    const dayMapping: { [key: string]: string } = {
      월요일: '월',
      화요일: '화',
      수요일: '수',
      목요일: '목',
      금요일: '금',
      토요일: '토',
      일요일: '일',
    };
    const todayShort = dayMapping[today];

    // 시간대별 복용 상태 확인
    const timeSlots = ['아침', '점심', '저녁', '취침전'];
    const statusByTimeSlot: string[] = [];

    timeSlots.forEach((timeSlot) => {
      const medsInTimeSlot = medications.filter(
        (med: Medication) =>
          med.timeSlots.some((slot) => slot.includes(timeSlot)) &&
          med.daysOfWeek.includes(todayShort)
      );

      if (medsInTimeSlot.length === 0) {
        return; // 해당 시간대에 약이 없으면 표시하지 않음
      }

      const recordedMeds = medicationRecords.filter((record) => {
        const recordDate = new Date(record.recordTime);
        const today = new Date();
        const isToday = recordDate.toDateString() === today.toDateString();

        if (!isToday) return false;

        const recordHour = recordDate.getHours();
        let isInTimeSlot = false;

        if (timeSlot === '아침' && recordHour >= 6 && recordHour < 12)
          isInTimeSlot = true;
        else if (timeSlot === '점심' && recordHour >= 12 && recordHour < 17)
          isInTimeSlot = true;
        else if (timeSlot === '저녁' && recordHour >= 17 && recordHour < 21)
          isInTimeSlot = true;
        else if (timeSlot === '취침전' && (recordHour >= 21 || recordHour < 6))
          isInTimeSlot = true;

        return (
          isInTimeSlot &&
          medsInTimeSlot.some(
            (med: Medication) => med.id === record.medicationId
          )
        );
      });

      if (recordedMeds.length > 0) {
        const lastRecord = recordedMeds[recordedMeds.length - 1];
        const recordTime = new Date(lastRecord.recordTime);
        const timeString = recordTime.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        statusByTimeSlot.push(`${timeSlot}: ${timeString}에 기록됨`);
      } else {
        statusByTimeSlot.push(`${timeSlot}: 기록되지 않음`);
      }
    });

    return statusByTimeSlot.length > 0
      ? statusByTimeSlot.join(' | ')
      : '오늘 복용할 약이 없습니다.';
  };

  // 오늘 복용해야 하는 약물만 필터링
  const getTodayMedications = (): Medication[] => {
    return medications.filter((med: Medication) => {
      // 레거시 데이터 구조 처리
      if (med.daysOfWeek && med.daysOfWeek.length > 0) {
        const today = new Date();
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const todayName = dayNames[today.getDay()];
        return med.daysOfWeek.includes(todayName);
      }
      return false;
    });
  };

  const deleteMedication = (id: number) => {
    setMedications(medications.filter((med: Medication) => med.id !== id));
  };

  // 시간 슬롯에서 한글 부분만 추출하는 함수
  const extractTimeSlotNames = (timeSlots: string[]): string => {
    return timeSlots
      .map((slot) => {
        // "아침 (06:00-09:00)" -> "아침"
        const match = slot.match(/^([가-힣]+)/);
        return match ? match[1] : slot;
      })
      .join(', ');
  };

  // 특정 약물의 오늘 복용 여부를 실제 기록을 기반으로 확인하는 함수
  const isMedicationTakenToday = (medicationId: number): boolean => {
    const today = new Date().toDateString();
    const todayRecords = medicationRecords.filter((record) => {
      const recordDate = new Date(record.recordTime);
      return (
        recordDate.toDateString() === today &&
        record.medicationId === medicationId &&
        record.status === 'taken'
      );
    });
    return todayRecords.length > 0;
  };

  // 오늘 복용해야 하는 약물 기준으로 복용완료 수치 계산
  const todayMedications = getTodayMedications();
  const takenCount = todayMedications.filter((med: Medication) =>
    isMedicationTakenToday(med.id)
  ).length;
  const totalCount = todayMedications.length;

  const getTimeStatus = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const medTime = new Date();
    medTime.setHours(hours, minutes, 0, 0);

    const diff = now.getTime() - medTime.getTime();
    const diffHours = diff / (1000 * 60 * 60);

    if (diffHours < 0) return 'upcoming';
    if (diffHours < 1) return 'current';
    return 'overdue';
  };

  // 요일별 약물 목록을 실제 데이터에서 가져오는 함수 (API 데이터 구조 지원)
  const getMedicationsForDay = (dayIndex: number) => {
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    const targetDay = dayNames[dayIndex];

    return medications.filter((med: Medication) => {
      // 레거시 데이터 구조 처리 (daysOfWeek 배열)
      if (med.daysOfWeek && med.daysOfWeek.includes(targetDay)) {
        return true;
      }

      // TODO: API 데이터 구조 처리 (intakeDates 배열)
      // 향후 API 연동 시 이 부분을 활성화
      // if (med.intakeDates) {
      //   const targetDate = getDateForDayIndex(dayIndex);
      //   return med.intakeDates.includes(targetDate);
      // }

      return false;
    });
  };

  // 특정 요일의 복용 상태를 계산하는 함수
  const getDayMedicationStatus = (dayIndex: number) => {
    const dayMedications = getMedicationsForDay(dayIndex);
    const isToday =
      dayIndex === new Date().getDay() - 1 ||
      (new Date().getDay() === 0 && dayIndex === 6);

    if (!isToday || dayMedications.length === 0) {
      return 'neutral'; // 오늘이 아니거나 약이 없으면 중립 상태
    }

    // 오늘인 경우 실제 복용 기록을 기반으로 상태 계산
    const today = new Date().toDateString();
    const todayRecords = medicationRecords.filter((record) => {
      const recordDate = new Date(record.recordTime);
      return recordDate.toDateString() === today && record.status === 'taken';
    });

    // 복용 기록이 있는 약물들의 ID 목록
    const recordedMedicationIds = todayRecords.map(
      (record) => record.medicationId
    );

    // 오늘 복용해야 하는 약물 중 실제로 복용 기록이 있는 약물 수
    const takenMeds = dayMedications.filter((med: Medication) =>
      recordedMedicationIds.includes(med.id)
    ).length;

    const totalMeds = dayMedications.length;

    if (takenMeds === 0) return 'not-taken'; // 아무것도 안 먹음 - 빨강
    if (takenMeds === totalMeds) return 'all-taken'; // 다 먹음 - 초록
    return 'partial-taken'; // 일부만 먹음 - 주황
  };

  return (
    <MedicationWrapper modalOpen={isModalOpen || isRecordModalOpen}>
      <MedicationHeader>
        <PageTitle>💊 약물 복용 관리</PageTitle>
        <div>
          <NavButton onClick={() => navigate('/dashboard')}>
            대시보드 메인
          </NavButton>
        </div>
      </MedicationHeader>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <MedicationSectionTitle>오늘의 약 복용</MedicationSectionTitle>
        <OpenModalButton onClick={openModal}>+ 새 약 추가</OpenModalButton>
      </div>

      <ContentLayout>
        {/* 위쪽 가로 배치 - 복용 완료 요약 및 주간 스케줄 */}
        <TopSummaryCard>
          <SummarySection>
            <SummaryText>복용 완료</SummaryText>
            <SummaryValue>
              {takenCount} / {totalCount}
            </SummaryValue>
            <MedicationProgress>
              <MedicationProgressBar
                progress={(takenCount / totalCount) * 100}
              />
            </MedicationProgress>
            <div
              style={{
                marginTop: '20px',
                fontSize: '16px',
                color: '#666',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span role="img" aria-label="reminder">
                ⏰
              </span>
              {getStatusMessage()}
            </div>
          </SummarySection>

          <WeeklyScheduleSection>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#343a40',
                marginBottom: '20px',
              }}
            >
              📅 주간 복용 스케줄
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {[
                '월요일',
                '화요일',
                '수요일',
                '목요일',
                '금요일',
                '토요일',
                '일요일',
              ].map((day, index) => {
                const isToday =
                  index === new Date().getDay() - 1 ||
                  (new Date().getDay() === 0 && index === 6);

                // 실제 약물 목록에서 해당 요일의 약물들을 가져옴
                const dayMedications = getMedicationsForDay(index);
                const dayStatus = getDayMedicationStatus(index);

                // 복용 상태에 따른 배경 색상 결정
                let backgroundColor = '#f8f9fa';
                let borderColor = '#e9ecef';

                if (isToday) {
                  switch (dayStatus) {
                    case 'all-taken':
                      backgroundColor = '#e8f5e8';
                      borderColor = '#4caf50';
                      break;
                    case 'partial-taken':
                      backgroundColor = '#fff3e0';
                      borderColor = '#ff9800';
                      break;
                    case 'not-taken':
                      backgroundColor = '#ffebee';
                      borderColor = '#f44336';
                      break;
                    default:
                      backgroundColor = '#e3f2fd';
                      borderColor = '#2196f3';
                  }
                }

                return (
                  <div
                    key={day}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: backgroundColor,
                      borderRadius: '8px',
                      border: `2px solid ${borderColor}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '16px',
                        fontWeight: isToday ? 'bold' : 'normal',
                        color: isToday ? '#1976d2' : '#666',
                        minWidth: '60px',
                      }}
                    >
                      {day}
                      {isToday && (
                        <span style={{ fontSize: '12px', marginLeft: '4px' }}>
                          (오늘)
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}
                    >
                      {dayMedications.length > 0 ? (
                        dayMedications.map(
                          (med: Medication, medIndex: number) => {
                            // 오늘인 경우 실제 복용 상태 확인
                            let medColor = '#666';
                            let medBackground = '#e0e0e0';

                            if (isToday) {
                              medColor = 'white';
                              medBackground = isMedicationTakenToday(med.id)
                                ? '#4caf50'
                                : '#f44336';
                            }

                            return (
                              <div
                                key={medIndex}
                                style={{
                                  fontSize: '12px',
                                  padding: '4px 8px',
                                  background: medBackground,
                                  color: medColor,
                                  borderRadius: '12px',
                                  fontWeight: '500',
                                }}
                              >
                                {med.name}
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div
                          style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            background: '#e0e0e0',
                            color: '#666',
                            borderRadius: '12px',
                            fontWeight: '500',
                          }}
                        >
                          복용할 약 없음
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </WeeklyScheduleSection>
        </TopSummaryCard>

        {/* 아래쪽 4개 약물 카드 1행 배치 */}
        <MedicationGrid>
          {medications.map((medication: Medication) => {
            const timeStatus = getTimeStatus(medication.time || '08:00');
            // 타입 안전성을 위한 확장된 타입 정의
            const med = medication as Medication;

            return (
              <MedicationCard
                key={medication.id}
                taken={isMedicationTakenToday(medication.id)}
              >
                <MedicationContent>
                  <MedicationCardHeader>
                    <MedicationName>{medication.name}</MedicationName>
                    <CardButtonGroup>
                      <CardEditButton
                        onClick={() => {
                          alert('준비중입니다.');
                        }}
                      >
                        수정
                      </CardEditButton>
                      <CardDeleteButton
                        onClick={() => deleteMedication(medication.id)}
                      >
                        삭제
                      </CardDeleteButton>
                    </CardButtonGroup>
                  </MedicationCardHeader>

                  {/* 약 설명을 먼저 표시 */}
                  {med.description && (
                    <MedicationTimeDosage
                      style={{ color: '#666', marginBottom: '8px' }}
                    >
                      📋 {med.description}
                    </MedicationTimeDosage>
                  )}

                  {/* 총 복용량을 약 설명 아래에 표시 */}
                  <MedicationTimeDosage>
                    💊 {med.dailyDosage || medication.dosage || '정보 없음'}
                  </MedicationTimeDosage>

                  {med.daysOfWeek && med.daysOfWeek.length > 0 && (
                    <MedicationTimeDosage>
                      📅 {med.daysOfWeek.join(', ')}요일
                    </MedicationTimeDosage>
                  )}

                  {med.timeSlots && med.timeSlots.length > 0 && (
                    <MedicationTimeDosage>
                      ⏰ {extractTimeSlotNames(med.timeSlots)}
                    </MedicationTimeDosage>
                  )}

                  {/* 레거시 데이터 호환성: timeSlots가 없고 time만 있는 경우에만 표시 */}
                  {medication.time &&
                    (!med.timeSlots || med.timeSlots.length === 0) && (
                      <MedicationTimeDosage>
                        🕒 {medication.time}
                      </MedicationTimeDosage>
                    )}

                  {(med.memo || medication.note) && (
                    <MedicationNote>
                      📝 {med.memo || medication.note}
                    </MedicationNote>
                  )}
                </MedicationContent>
                <div style={{ marginTop: 'auto' }}>
                  <BadgeContainer>
                    <StatusBadge
                      status={
                        isMedicationTakenToday(medication.id)
                          ? 'taken'
                          : 'not-taken'
                      }
                    >
                      {isMedicationTakenToday(medication.id)
                        ? '복용완료'
                        : '미복용'}
                    </StatusBadge>
                    {timeStatus === 'overdue' &&
                      !isMedicationTakenToday(medication.id) && (
                        <StatusBadge status="not-taken">시간 지남</StatusBadge>
                      )}
                  </BadgeContainer>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <MedicationButton
                      taken={false}
                      onClick={() => openRecordModal(medication)}
                      style={{
                        fontSize: '14px',
                        padding: '10px 14px',
                      }}
                    >
                      기록하기
                    </MedicationButton>
                  </div>
                </div>
              </MedicationCard>
            );
          })}
        </MedicationGrid>
      </ContentLayout>

      {/* 새 약 추가 모달 (Portal로 body에 렌더링) */}
      {isModalOpen &&
        createPortal(
          <ModalOverlay isOpen={true}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>새 약 추가</ModalTitle>
                <CloseButton onClick={closeModal}>×</CloseButton>
              </ModalHeader>

              {/* 1. 약 이름과 설명 (맨 위, 가로로) */}
              <TopSection>
                <InputGroup>
                  <label htmlFor="medication-name">약 이름*</label>
                  <input
                    id="medication-name"
                    type="text"
                    value={newMedication.name}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        name: e.target.value,
                      })
                    }
                    placeholder="약 이름을 입력하세요"
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="medication-description">약 설명*</label>
                  <input
                    id="medication-description"
                    type="text"
                    value={newMedication.description}
                    onChange={(e) =>
                      setNewMedication({
                        ...newMedication,
                        description: e.target.value,
                      })
                    }
                    placeholder="간단한 설명을 입력하세요"
                  />
                </InputGroup>
              </TopSection>

              {/* 2. 복용량 설정 (토글 형태) */}
              <DosageSection>
                <DosageHeader>
                  <label>복용량 설정</label>
                  <ToggleButton
                    onClick={() =>
                      setDosageInputType(
                        dosageInputType === 'detailed' ? 'simple' : 'detailed'
                      )
                    }
                    isActive={dosageInputType === 'detailed'}
                  >
                    {dosageInputType === 'detailed' ? '간단하게' : '상세하게'}
                  </ToggleButton>
                </DosageHeader>

                {dosageInputType === 'detailed' ? (
                  <DetailedDosageInputs>
                    <DosageRow>
                      <DosageInputGroup>
                        <label>1회 복용량</label>
                        <input
                          type="number"
                          value={dosageDetails.amountPerDose}
                          onChange={(e) =>
                            setDosageDetails({
                              ...dosageDetails,
                              amountPerDose: e.target.value,
                            })
                          }
                          placeholder="1"
                        />
                      </DosageInputGroup>
                      <DosageInputGroup>
                        <label>단위</label>
                        <select
                          value={dosageDetails.amountUnit}
                          onChange={(e) =>
                            setDosageDetails({
                              ...dosageDetails,
                              amountUnit: e.target.value,
                            })
                          }
                        >
                          {unitOptions.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </DosageInputGroup>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                          fontSize: '18px',
                          fontWeight: '600',
                        }}
                      >
                        ×
                      </div>
                      <DosageInputGroup>
                        <label>하루 복용 횟수</label>
                        <input
                          type="number"
                          value={dosageDetails.timesPerDay}
                          onChange={(e) =>
                            setDosageDetails({
                              ...dosageDetails,
                              timesPerDay: e.target.value,
                            })
                          }
                          placeholder="3"
                        />
                      </DosageInputGroup>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                          fontSize: '18px',
                          fontWeight: '600',
                        }}
                      >
                        회
                      </div>
                    </DosageRow>
                  </DetailedDosageInputs>
                ) : (
                  <SimpleDosageInput>
                    <DosageInputGroup>
                      <label>총 복용량</label>
                      <input
                        type="number"
                        value={dosageDetails.totalAmount}
                        onChange={(e) =>
                          setDosageDetails({
                            ...dosageDetails,
                            totalAmount: e.target.value,
                          })
                        }
                        placeholder="3"
                      />
                    </DosageInputGroup>
                  </SimpleDosageInput>
                )}
              </DosageSection>

              {/* 3. 요일 선택 (가로로) */}
              <DaySection>
                <DaySectionHeader>
                  <label>복용 요일 선택</label>
                  <SelectAllButton
                    isAllSelected={weekDays.every((day) =>
                      newMedication.daysOfWeek.includes(day)
                    )}
                    onClick={toggleAllDays}
                    type="button"
                  >
                    {weekDays.every((day) =>
                      newMedication.daysOfWeek.includes(day)
                    )
                      ? '전체 해제'
                      : '매일'}
                  </SelectAllButton>
                </DaySectionHeader>
                <DayGrid>
                  {weekDays.map((day) => (
                    <DayButton
                      key={day}
                      isSelected={newMedication.daysOfWeek.includes(day)}
                      onClick={() => handleDayOfWeekChange(day)}
                    >
                      {day}요일
                    </DayButton>
                  ))}
                </DayGrid>
              </DaySection>

              {/* 4. 시간 선택 (가로로) */}
              <TimeSection>
                <TimeSectionHeader>
                  <label>복용 시간 선택</label>
                  <TimePresetButtons>
                    <TimePresetButton onClick={setMorningEvening} type="button">
                      아침저녁
                    </TimePresetButton>
                    <TimePresetButton
                      onClick={setMorningLunchDinner}
                      type="button"
                    >
                      아침점심저녁
                    </TimePresetButton>
                    <TimePresetButton onClick={setAllTimes} type="button">
                      전체
                    </TimePresetButton>
                  </TimePresetButtons>
                </TimeSectionHeader>
                <TimeGrid>
                  {timeSlotOptions.map((timeSlot) => (
                    <TimeButton
                      key={timeSlot}
                      isSelected={newMedication.timeSlots.includes(timeSlot)}
                      onClick={() => handleTimeSlotChange(timeSlot)}
                    >
                      {timeSlot}
                    </TimeButton>
                  ))}
                </TimeGrid>
              </TimeSection>

              {/* 5. 메모 추가 */}
              <MemoSection>
                <MemoButton
                  type="button"
                  onClick={() => setShowMemo(!showMemo)}
                  isActive={showMemo}
                >
                  메모 추가 {showMemo ? '▲' : '▼'}
                </MemoButton>
                {showMemo && (
                  <MemoTextarea>
                    <textarea
                      value={newMedication.memo}
                      onChange={(e) =>
                        setNewMedication({
                          ...newMedication,
                          memo: e.target.value,
                        })
                      }
                      placeholder="약에 대한 추가 메모를 입력하세요..."
                      rows={3}
                    />
                  </MemoTextarea>
                )}
              </MemoSection>

              {/* 저장/취소 버튼 */}
              <ButtonSection>
                <CancelButton type="button" onClick={resetForm}>
                  초기화
                </CancelButton>
                <SaveButton type="button" onClick={addMedication}>
                  약 추가
                </SaveButton>
              </ButtonSection>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}

      {/* 알림 다이얼로그 (Portal로 body에 렌더링) */}
      {notification.isOpen &&
        createPortal(
          <NotificationOverlay isOpen={true}>
            <NotificationDialog type={notification.type}>
              <NotificationIcon type={notification.type}>
                {notification.type === 'success' ? '✓' : '✗'}
              </NotificationIcon>
              <NotificationTitle type={notification.type}>
                {notification.title}
              </NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
              <NotificationProgress>
                <NotificationProgressBar type={notification.type} />
              </NotificationProgress>
            </NotificationDialog>
          </NotificationOverlay>,
          document.body
        )}

      {/* 복용 기록 다이얼로그 */}
      {isRecordModalOpen &&
        createPortal(
          <ModalOverlay isOpen={true}>
            <RecordModalContent>
              <RecordModalHeader>
                <h2>{selectedMedicationForRecord?.name} 복용 기록</h2>
                <CloseButton onClick={closeRecordModal}>×</CloseButton>
              </RecordModalHeader>

              {/* 기록 날짜 (고정) */}
              <RecordDateSection>
                <label>기록 일자</label>
                <DateDisplay>{getCurrentDate()}</DateDisplay>
              </RecordDateSection>

              {/* 기록 시간 */}
              <TimeInputGroup>
                <label>기록 시간</label>
                <input
                  type="time"
                  value={recordTime}
                  onChange={(e) => setRecordTime(e.target.value)}
                />
              </TimeInputGroup>

              {/* 기록 상태 */}
              <InputGroup>
                <label>기록 상태</label>
                <StatusToggle>
                  <StatusButton
                    isActive={recordForm.status === 'taken'}
                    statusType="taken"
                    onClick={() =>
                      setRecordForm({ ...recordForm, status: 'taken' })
                    }
                  >
                    복용
                  </StatusButton>
                  <StatusButton
                    isActive={recordForm.status === 'skipped'}
                    statusType="skipped"
                    onClick={() =>
                      setRecordForm({ ...recordForm, status: 'skipped' })
                    }
                  >
                    건너뜀
                  </StatusButton>
                </StatusToggle>
              </InputGroup>

              {/* 복용량 (복용일 때만 표시) */}
              <RecordAmountSection isVisible={recordForm.status === 'taken'}>
                <label>복용량</label>
                <RecordAmountRow>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={recordForm.amount}
                    onChange={(e) =>
                      setRecordForm({
                        ...recordForm,
                        amount: Number(e.target.value),
                      })
                    }
                    placeholder="1"
                  />
                  <select
                    value={recordForm.unit}
                    onChange={(e) =>
                      setRecordForm({ ...recordForm, unit: e.target.value })
                    }
                  >
                    <option value="정">정</option>
                    <option value="캡슐">캡슐</option>
                    <option value="포">포</option>
                    <option value="ml">ml</option>
                    <option value="방울">방울</option>
                  </select>
                </RecordAmountRow>
              </RecordAmountSection>

              {/* 메모 (접기/펼치기) */}
              <RecordMemoSection>
                <RecordMemoButton
                  type="button"
                  onClick={() => setShowRecordMemo(!showRecordMemo)}
                  isActive={showRecordMemo}
                >
                  메모 추가 (선택사항) {showRecordMemo ? '▲' : '▼'}
                </RecordMemoButton>
                {showRecordMemo && (
                  <RecordMemoTextarea>
                    <textarea
                      value={recordForm.memo}
                      onChange={(e) =>
                        setRecordForm({ ...recordForm, memo: e.target.value })
                      }
                      placeholder="특이사항이나 부작용 등을 기록하세요..."
                      rows={3}
                    />
                  </RecordMemoTextarea>
                )}
              </RecordMemoSection>

              {/* 저장/취소 버튼 */}
              <ButtonSection>
                <CancelButton onClick={closeRecordModal}>취소</CancelButton>
                <SaveButton onClick={saveRecord}>기록 저장</SaveButton>
              </ButtonSection>
            </RecordModalContent>
          </ModalOverlay>,
          document.body
        )}
    </MedicationWrapper>
  );
};

export default MedicationPage;
