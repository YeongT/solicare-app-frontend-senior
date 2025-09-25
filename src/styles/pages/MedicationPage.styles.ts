import styled from 'styled-components';

export const MedicationWrapper = styled.div<{ modalOpen?: boolean }>`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.background};
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

export const MedicationHeader = styled.div`
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

export const ModalOverlay = styled.div<{ isOpen: boolean }>`
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
  overflow: hidden !important;
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

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 40px 50px;
  width: 98%;
  max-width: 1100px;
  min-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10000;
  transform: translateZ(0);
  will-change: transform;
  margin: auto;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    max-width: 900px;
    min-width: 700px;
  }
  @media (max-width: 768px) {
    width: 95%;
    min-width: unset;
    padding: 30px;
    max-height: 85vh;
  }
  @media (max-width: 480px) {
    width: 98%;
    padding: 25px;
    max-height: 80vh;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 600;
`;

export const CloseButton = styled.button`
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

export const OpenModalButton = styled.button`
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

export const MedicationSectionTitle = styled.h3`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 32px 0;
  font-weight: 600;
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TopSummaryCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 40px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  display: flex;
  align-items: flex-start;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const SummarySection = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 60px;
`;

export const WeeklyScheduleSection = styled.div`
  flex: 0.6;
`;

export const SummaryText = styled.p`
  font-size: 26px;
  color: #555;
  margin-bottom: 20px;
`;

export const SummaryValue = styled.p`
  font-size: 64px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 20px 0;
`;

export const MedicationProgress = styled.div`
  width: 100%;
  height: 25px;
  background-color: #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

export const MedicationProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #28a745;
  border-radius: 12px;
  transition: width 0.5s ease-in-out;
`;

export const MedicationGrid = styled.div`
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

export const MedicationCard = styled.div<{ taken: boolean }>`
  background: ${({ theme }) => theme.colors.card};
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

export const MedicationContent = styled.div`
  margin-bottom: 16px;
`;

export const MedicationName = styled.h4`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 600;
  flex: 1;
`;

export const MedicationCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

export const MedicationTimeDosage = styled.p`
  font-size: 20px;
  color: #6c757d;
  margin: 0 0 8px 0;
`;

export const MedicationNote = styled.p`
  font-size: 18px;
  color: #888;
  margin: 0;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: center;
`;

export const MedicationButton = styled.button<{ taken: boolean }>`
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: ${(props) =>
    props.taken ? '#6c757d' : props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    background-color: ${(props) => (props.taken ? '#5a6268' : '#1746a0')};
  }
  &:active {
    transform: translateY(0);
  }
`;

export const CardDeleteButton = styled.button`
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

export const CardEditButton = styled.button`
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

export const CardButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const NotificationOverlay = styled.div<{ isOpen: boolean }>`
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
  overflow: hidden !important;
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

export const NotificationDialog = styled.div<{ type: 'success' | 'error' }>`
  background: ${({ theme }) => theme.colors.card};
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

export const NotificationIcon = styled.div<{ type: 'success' | 'error' }>`
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

export const NotificationTitle = styled.h3<{ type: 'success' | 'error' }>`
  font-size: 24px;
  color: ${(props) => (props.type === 'success' ? '#28a745' : '#dc3545')};
  margin: 0 0 16px 0;
  font-weight: 700;
`;

export const NotificationMessage = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0 0 20px 0;
  line-height: 1.5;
`;

export const NotificationProgress = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 20px;
`;

export const NotificationProgressBar = styled.div<{
  type: 'success' | 'error';
}>`
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
      width: 0;
    }
  }
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  margin-bottom: 30px;
`;

export const DosageSection = styled.div`
  margin-bottom: 30px;
`;

export const DosageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  label {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
`;

export const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 2px solid
    ${(props) => (props.isActive ? props.theme.colors.primary : '#e0e0e0')};
  background: ${(props) =>
    props.isActive ? props.theme.colors.primary : 'white'};
  color: ${(props) => (props.isActive ? 'white' : '#666')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${(props) => (props.isActive ? '#1746a0' : '#f8f9fa')};
  }
`;

export const DetailedDosageInputs = styled.div``;

export const DosageRow = styled.div`
  display: grid;
  grid-template-columns: 150px 120px 30px 150px 30px;
  gap: 10px;
  align-items: end;
  margin-bottom: 15px;
  justify-content: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const SimpleDosageInput = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 300px;
  }
`;

export const DosageInputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const DaySection = styled.div`
  margin-bottom: 30px;
  label {
    display: block;
    margin-bottom: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
`;

export const DaySectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  label {
    margin-bottom: 0;
  }
`;

export const SelectAllButton = styled.button<{ isAllSelected: boolean }>`
  padding: 8px 16px;
  border: 2px solid
    ${(props) => (props.isAllSelected ? '#dc3545' : props.theme.colors.primary)};
  background: ${(props) =>
    props.isAllSelected ? '#dc3545' : props.theme.colors.primary};
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

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

export const DayButton = styled.button<{ isSelected: boolean }>`
  padding: 12px;
  border: 2px solid
    ${(props) => (props.isSelected ? props.theme.colors.primary : '#e0e0e0')};
  background: ${(props) =>
    props.isSelected ? props.theme.colors.primary : 'white'};
  color: ${(props) => (props.isSelected ? 'white' : '#333')};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${(props) => (props.isSelected ? '#1746a0' : '#f8f9fa')};
  }
`;

export const TimeSection = styled.div`
  margin-bottom: 30px;
  label {
    display: block;
    margin-bottom: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
`;

export const TimeSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  label {
    margin-bottom: 0;
  }
`;

export const TimePresetButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const TimePresetButton = styled.button`
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

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const TimeButton = styled.button<{ isSelected: boolean }>`
  padding: 12px 15px;
  border: 2px solid
    ${(props) => (props.isSelected ? props.theme.colors.primary : '#e0e0e0')};
  background: ${(props) =>
    props.isSelected ? props.theme.colors.primary : 'white'};
  color: ${(props) => (props.isSelected ? 'white' : '#333')};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${(props) => (props.isSelected ? '#1746a0' : '#f8f9fa')};
  }
  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

export const MemoSection = styled.div`
  margin-bottom: 30px;
`;

export const MemoButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 12px;
  border: 2px solid
    ${(props) => (props.isActive ? props.theme.colors.primary : '#e0e0e0')};
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
    border-color: ${({ theme }) => theme.colors.primary};
    background: #f8f9fa;
  }
`;

export const MemoTextarea = styled.div`
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CancelButton = styled.button`
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

export const SaveButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #1746a0;
    border-color: #1746a0;
  }
`;

export const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const RecordModalContent = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 40px 50px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10000;
  transform: translateZ(0);
  will-change: transform;
  margin: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
    padding: 30px;
    max-height: 75vh;
  }
  @media (max-width: 480px) {
    width: 98%;
    padding: 25px;
    max-height: 70vh;
  }
`;

export const RecordModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
`;

export const StatusToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

export const StatusButton = styled.button<{
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

export const RecordDateSection = styled.div`
  margin-bottom: 24px;
  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
`;

export const DateDisplay = styled.div`
  padding: 12px 16px;
  background-color: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  color: #495057;
  font-weight: 500;
`;

export const TimeInputGroup = styled.div`
  margin-bottom: 24px;
  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
`;

export const RecordAmountSection = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  margin-bottom: 24px;
  label {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
  }
`;

export const RecordAmountRow = styled.div`
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
      border-color: ${({ theme }) => theme.colors.primary};
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const RecordMemoSection = styled.div`
  margin-bottom: 30px;
`;

export const RecordMemoButton = styled.button<{ isActive: boolean }>`
  padding: 12px 20px;
  border: 2px solid
    ${(props) => (props.isActive ? props.theme.colors.primary : '#e9ecef')};
  background: ${(props) =>
    props.isActive ? props.theme.colors.primary : 'white'};
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
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${(props) =>
      props.isActive ? 'white' : props.theme.colors.primary};
  }
`;

export const RecordMemoTextarea = styled.div`
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
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    &::placeholder {
      color: #adb5bd;
    }
  }
`;
