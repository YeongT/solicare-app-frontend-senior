import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { mockMedications } from '../data/mockData';
import { NavButton, StatusBadge } from '../components/StyledComponents';
import {
  BadgeContainer,
  ButtonSection,
  CancelButton,
  CardButtonGroup,
  CardDeleteButton,
  CardEditButton,
  CloseButton,
  ContentLayout,
  DateDisplay,
  DayButton,
  DayGrid,
  DaySection,
  DaySectionHeader,
  DetailedDosageInputs,
  DosageHeader,
  DosageInputGroup,
  DosageRow,
  DosageSection,
  InputGroup,
  MedicationButton,
  MedicationCard,
  MedicationCardHeader,
  MedicationContent,
  MedicationGrid,
  MedicationHeader,
  MedicationName,
  MedicationNote,
  MedicationProgress,
  MedicationProgressBar,
  MedicationSectionTitle,
  MedicationTimeDosage,
  MedicationWrapper,
  MemoButton,
  MemoSection,
  MemoTextarea,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  NotificationDialog,
  NotificationIcon,
  NotificationMessage,
  NotificationOverlay,
  NotificationProgress,
  NotificationProgressBar,
  NotificationTitle,
  OpenModalButton,
  PageTitle,
  RecordAmountRow,
  RecordAmountSection,
  RecordDateSection,
  RecordMemoButton,
  RecordMemoSection,
  RecordMemoTextarea,
  RecordModalContent,
  RecordModalHeader,
  SaveButton,
  SelectAllButton,
  SimpleDosageInput,
  StatusButton,
  StatusToggle,
  SummarySection,
  SummaryText,
  SummaryValue,
  TimeButton,
  TimeGrid,
  TimeInputGroup,
  TimePresetButton,
  TimePresetButtons,
  TimeSection,
  TimeSectionHeader,
  ToggleButton,
  TopSection,
  TopSummaryCard,
  WeeklyScheduleSection,
} from '../styles/pages/MedicationPage.styles';

// 기존 인터페이스/로직 그대로 유지
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
  note?: string;
}

interface MedicationRecord {
  id: string;
  medicationId: number;
  recordTime: string;
  status: 'taken' | 'skipped';
  amount?: number;
  unit?: string;
  memo?: string;
}

interface RecordForm {
  recordTime: string;
  status: 'taken' | 'skipped';
  amount: number;
  unit: string;
  memo: string;
}

const MedicationPage: React.FC = () => {
  const navigate = useNavigate();

  const [medications, setMedications] = useState(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : mockMedications;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const showNotification = (
    type: 'success' | 'error',
    title: string,
    message: string
  ) => {
    setNotification({ isOpen: true, type, title, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isOpen: false }));
    }, 2500);
  };

  React.useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  React.useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  const [showMemo, setShowMemo] = useState(false);

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedMedicationForRecord, setSelectedMedicationForRecord] =
    useState<Medication | null>(null);
  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);
  const [recordForm, setRecordForm] = useState<RecordForm>({
    recordTime: new Date().toISOString().slice(0, 16),
    status: 'taken',
    amount: 1,
    unit: '정',
    memo: '',
  });

  const [showRecordMemo, setShowRecordMemo] = useState(false);

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

  React.useEffect(() => {
    if (isModalOpen || isRecordModalOpen) {
      document.body.style.overflow = 'hidden !important';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden !important';
      document.documentElement.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }

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

  const [newMedication, setNewMedication] = useState({
    name: '',
    description: '',
    dailyDosage: '',
    memo: '',
    daysOfWeek: [] as string[],
    timeSlots: [] as string[],
  });

  const [dosageInputType, setDosageInputType] = useState<'detailed' | 'simple'>(
    'detailed'
  );
  const [dosageDetails, setDosageDetails] = useState({
    amountPerDose: '',
    amountUnit: '정',
    timesPerDay: '',
    totalAmount: '',
    totalUnit: '정',
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
    setNewMedication((prev) => ({ ...prev, timeSlots: [...timeSlotOptions] }));
  };

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

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    if (!newMedication.name.trim())
      return { isValid: false, errorMessage: '약 이름을 입력해주세요.' };
    if (!newMedication.description.trim())
      return { isValid: false, errorMessage: '약 설명을 입력해주세요.' };
    if (!generateDosageString())
      return {
        isValid: false,
        errorMessage: '복용량 정보를 모두 입력해주세요.',
      };
    if (newMedication.daysOfWeek.length === 0)
      return { isValid: false, errorMessage: '복용할 요일을 선택해주세요.' };
    if (newMedication.timeSlots.length === 0)
      return { isValid: false, errorMessage: '복용할 시간대를 선택해주세요.' };
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
      showNotification(
        'success',
        '약 추가 완료!',
        `${newMedication.name}이(가) 성공적으로 추가되었습니다.`
      );
    } else {
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

  const closeRecordModal = () => {
    setIsRecordModalOpen(false);
    setSelectedMedicationForRecord(null);
  };

  const saveRecord = () => {
    if (!selectedMedicationForRecord) return;
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
    setMedications((prevMeds: Medication[]) =>
      prevMeds.map((med: Medication) =>
        med.id === selectedMedicationForRecord.id
          ? { ...med, taken: recordForm.status === 'taken' }
          : med
      )
    );
    closeRecordModal();
    setTimeout(() => {
      setNotification({
        isOpen: true,
        type: 'success',
        title: '복용 기록이 저장되었습니다!',
        message: `${selectedMedicationForRecord.name}의 ${recordForm.status === 'taken' ? '복용' : '건너뜀'} 기록이 추가되었습니다.`,
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, isOpen: false }));
      }, 2000);
    }, 150);
  };

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
    const timeSlots = ['아침', '점심', '저녁', '취침전'];
    const statusByTimeSlot: string[] = [];
    timeSlots.forEach((timeSlot) => {
      const medsInTimeSlot = medications.filter(
        (med: Medication) =>
          med.timeSlots.some((slot) => slot.includes(timeSlot)) &&
          med.daysOfWeek.includes(todayShort)
      );
      if (medsInTimeSlot.length === 0) return;
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

  const getTodayMedications = (): Medication[] => {
    return medications.filter((med: Medication) => {
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

  const extractTimeSlotNames = (timeSlots: string[]): string => {
    return timeSlots
      .map((slot) => {
        const match = slot.match(/^([가-힣]+)/);
        return match ? match[1] : slot;
      })
      .join(', ');
  };

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

  const getMedicationsForDay = (dayIndex: number) => {
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    const targetDay = dayNames[dayIndex];
    return medications.filter(
      (med: Medication) => med.daysOfWeek && med.daysOfWeek.includes(targetDay)
    );
  };

  const getDayMedicationStatus = (dayIndex: number) => {
    const dayMedications = getMedicationsForDay(dayIndex);
    const isToday =
      dayIndex === new Date().getDay() - 1 ||
      (new Date().getDay() === 0 && dayIndex === 6);
    if (!isToday || dayMedications.length === 0) return 'neutral';
    const today = new Date().toDateString();
    const todayRecords = medicationRecords.filter((record) => {
      const recordDate = new Date(record.recordTime);
      return recordDate.toDateString() === today && record.status === 'taken';
    });
    const recordedMedicationIds = todayRecords.map(
      (record) => record.medicationId
    );
    const takenMeds = dayMedications.filter((med: Medication) =>
      recordedMedicationIds.includes(med.id)
    ).length;
    const totalMeds = dayMedications.length;
    if (takenMeds === 0) return 'not-taken';
    if (takenMeds === totalMeds) return 'all-taken';
    return 'partial-taken';
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
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
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
                const dayMedications = getMedicationsForDay(index);
                const dayStatus = getDayMedicationStatus(index);
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
                      style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
                    >
                      {dayMedications.length > 0 ? (
                        dayMedications.map(
                          (med: Medication, medIndex: number) => {
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

        <MedicationGrid>
          {medications.map((medication: Medication) => {
            const timeStatus = getTimeStatus(medication.time || '08:00');
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

                  {med.description && (
                    <MedicationTimeDosage
                      style={{ color: '#666', marginBottom: '8px' }}
                    >
                      📋 {med.description}
                    </MedicationTimeDosage>
                  )}

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
                      style={{ fontSize: '14px', padding: '10px 14px' }}
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

      {isModalOpen &&
        createPortal(
          <ModalOverlay isOpen={true}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>새 약 추가</ModalTitle>
                <CloseButton onClick={closeModal}>×</CloseButton>
              </ModalHeader>

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

              <DaySection>
                <DaySectionHeader>
                  <label>복용 요일 선택</label>
                  <SelectAllButton
                    isAllSelected={weekDays.every((d) =>
                      newMedication.daysOfWeek.includes(d)
                    )}
                    onClick={toggleAllDays}
                    type="button"
                  >
                    {weekDays.every((d) => newMedication.daysOfWeek.includes(d))
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

      {isRecordModalOpen &&
        createPortal(
          <ModalOverlay isOpen={true}>
            <RecordModalContent>
              <RecordModalHeader>
                <h2>{selectedMedicationForRecord?.name} 복용 기록</h2>
                <CloseButton onClick={closeRecordModal}>×</CloseButton>
              </RecordModalHeader>

              <RecordDateSection>
                <label>기록 일자</label>
                <DateDisplay>{getCurrentDate()}</DateDisplay>
              </RecordDateSection>

              <TimeInputGroup>
                <label>기록 시간</label>
                <input
                  type="time"
                  value={recordTime}
                  onChange={(e) => setRecordTime(e.target.value)}
                />
              </TimeInputGroup>

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
