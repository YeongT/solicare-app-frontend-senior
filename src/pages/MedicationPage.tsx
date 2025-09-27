import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../components/StyledComponents';
import {
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
  MedicationCardWrapper,
  MedicationContent,
  MedicationGrid,
  MedicationHeader,
  MedicationName,
  MedicationProgress,
  MedicationProgressBar,
  MedicationSectionTitle,
  MedicationTimeDosage,
  MedicationWrapper,
  MemoButton,
  MemoSection,
  MemoTextarea,
  MemoTooltip,
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

import { useMedication } from '../hooks/useMedication';
import { DOSE_DATE, DOSE_METHOD, DOSE_RECORD_STATUS, DOSE_TIME, DOSE_UNIT, Medication, MedicationRecord } from '../types/apiTypes';

const MedicationPage: React.FC = () => {
  const navigate = useNavigate();

  // useMedication에서 가져온 상태와 함수들
  const {
    sortedMedications,
    isMedicationModalOpen,
    isRecordInputModalOpen,
    isRecordListModalOpen,
    showMemo,
    showRecordMemo,
    selectedMedicationForRecord,
    selectedMedicationForList,
    newMedication,
    newMedicineRecord,
    dosageInputType,
    recordTime,
    notification,
    takenCount,
    totalCount,
    setNewMedication,
    setNewMedicineRecord,
    setDosageInputType,
    setRecordTime,
    setShowMemo,
    setShowRecordMemo,
    openModal,
    closeModal,
    openRecordInputModal,
    closeRecordModal,
    openRecordListModal,
    closeRecordListModal,
    handleDayOfWeekChange,
    toggleAllDays,
    handleTimeSlotChange,
    setMorningEvening,
    setMorningLunchDinner,
    addMedication,
    resetForm: resetMedicationModal,
    saveRecord,
    deleteMedication,
    getCurrentDate,
    getStatusMessage,
    isMedicationTakenToday,
    getMedicationsForDay,
    getDayMedicationStatus,
    formatTimeSlots,
    formatDaySlots,
  } = useMedication();

  // 상수 정의
  const weekDays = Object.values(DOSE_DATE);
  const unitOptions = Object.values(DOSE_UNIT);
  const timeSlotOptions = Object.values(DOSE_TIME);

  // 헬퍼 함수들
  const getTimeStatus = (time: string) => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const medicationTime = new Date(now);
    medicationTime.setHours(hours, minutes, 0, 0);

    return now > medicationTime ? 'overdue' : 'upcoming';
  };

  React.useEffect(() => {
    const modalOpen =
      isMedicationModalOpen || isRecordInputModalOpen || isRecordListModalOpen;

    document.body.style.overflow = modalOpen ? 'hidden' : '';
    document.documentElement.style.overflow = modalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMedicationModalOpen, isRecordInputModalOpen, isRecordListModalOpen]);

  const timeSlotOptionsToText = {
    [DOSE_TIME.morning]: '아침\n(06:00-08:00)',
    [DOSE_TIME.lunch]: '점심\n(11:00-13:00)',
    [DOSE_TIME.dinner]: '저녁\n(17:00-19:00)',
    [DOSE_TIME.night]: '취침 전\n(21:00-23:00)',
    [DOSE_TIME.any]: '아무때나',
  };

  return (
    <MedicationWrapper
      modalOpen={isMedicationModalOpen || isRecordInputModalOpen}
    >
      <MedicationHeader>
        <PageTitle>💊 약물 복용 관리</PageTitle>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                progress={totalCount > 0 ? (takenCount / totalCount) * 100 : 0}
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
                const dayEnum = Object.values(DOSE_DATE)[index];
                const dayMedications = getMedicationsForDay(dayEnum);
                const dayStatus = getDayMedicationStatus(dayEnum);
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
                              medBackground = isMedicationTakenToday(med)
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
          {sortedMedications.map((medication: Medication) => {
            // 오늘 복용해야 하는 약인지 판별
            const today = new Date();
            const allDays: DOSE_DATE[] = Object.values(DOSE_DATE);
            const todayIndex = today.getDay();
            const todayName = allDays[todayIndex];
            const isTodayMed = !medication.daySlots || medication.daySlots.length === 0 || medication.daySlots.includes(todayName);

            // 오늘 복용한 양 계산
            const todayStr = new Date().toISOString().slice(0, 10);
            const todayRecords = medication.records?.filter(
              (rec) =>
                rec.timestamp?.startsWith(todayStr) &&
                rec.status === DOSE_RECORD_STATUS.taken
            ) || [];
            const takenAmount = todayRecords.reduce(
              (sum, rec) => sum + (rec.amount || 0),
              0
            );
            // 총 복용해야 할 양 계산
            const totalNeeded = medication.doseMethod === DOSE_METHOD.daily
              ? (medication.amountPerIntake || 1) * (medication.intakeTimesPerDay || 1)
              : medication.doseAmount;

            // 시간대 표시: total(간단하게)일 때만 '아무때나' 표시
            let timeText = '';
            if (medication.doseMethod !== DOSE_METHOD.daily) {
              timeText = (!medication.timeSlots || medication.timeSlots.length === 0) ? '아무때나' : medication.timeSlots.join(', ');
            } else {
              timeText = (medication.timeSlots && medication.timeSlots.length > 0) ? medication.timeSlots.join(', ') : '';
            }

            // 복용 상태별 테두리 색상 결정 (오늘 복용해야 하는 약만 적용)
            let borderColor = '#e9ecef';
            if (isTodayMed) {
              if (takenAmount === 0) {
                borderColor = '#ff4d4f'; // 빨강(아예 안 먹음)
              } else if (takenAmount < totalNeeded) {
                borderColor = '#ffa500'; // 주황(일부 복용)
              } else {
                borderColor = '#28a745'; // 초록(다 먹음)
              }
            }

            return (
              <MedicationCardWrapper key={medication.uuid}>
                <MedicationCard
                  taken={isMedicationTakenToday(medication)}
                  shouldTakeToday={isTodayMed}
                  style={isTodayMed ? { boxShadow: `0 0 0 2px ${borderColor}` } : {}}
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
                          onClick={() => deleteMedication(medication.uuid)}
                        >
                          삭제
                        </CardDeleteButton>
                      </CardButtonGroup>
                    </MedicationCardHeader>

                    {medication.description && (
                      <MedicationTimeDosage
                        style={{ color: '#666', marginBottom: '8px' }}
                      >
                        📋 {medication.description}
                      </MedicationTimeDosage>
                    )}

                    {/* 복용량 표시 방식 개선 */}
                    <MedicationTimeDosage>
                      💊 {medication.doseMethod === DOSE_METHOD.daily
                        ? `1회 ${medication.amountPerIntake || 1}${medication.doseUnit} × ${medication.intakeTimesPerDay || 1}회`
                        : `총 ${medication.doseAmount}${medication.doseUnit}`
                      }
                    </MedicationTimeDosage>

                    {medication.daySlots && medication.daySlots.length > 0 && (
                      <MedicationTimeDosage>
                        📅 {formatDaySlots(medication.daySlots)}
                      </MedicationTimeDosage>
                    )}

                    {/* 시간대 표시: total(간단하게)일 때만 '아무때나' */}
                    {timeText && (
                      <MedicationTimeDosage>
                        ⏰ {timeText}
                      </MedicationTimeDosage>
                    )}
                  </MedicationContent>
                  <div style={{ marginTop: 'auto' }}>
                    {/* 복용 상황 표시 */}
                    <div style={{
                      color: '#2196f3',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      {takenAmount} / {totalNeeded} {medication.doseUnit} 복용
                    </div>
                    {/* 버튼 순서 변경 및 크기 조정 (4:6 비율) */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => openRecordListModal(medication)}
                        style={{
                          flex: '4',
                          background: 'white',
                          color: '#2196f3',
                          border: '2px solid #2196f3',
                          borderRadius: '8px',
                          fontSize: '14px',
                          padding: '10px 8px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f9ff';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        기록보기
                      </button>
                      <MedicationButton
                        taken={false}
                        onClick={() => openRecordInputModal(medication)}
                        style={{
                          flex: '6',
                          fontSize: '14px',
                          padding: '10px 8px'
                        }}
                      >
                        기록하기
                      </MedicationButton>
                    </div>
                  </div>
                  {/* 메모가 있을 때만 호버링 툴팁 표시 */}
                  {medication.memo && (
                    <MemoTooltip>
                      📝 {medication.memo}
                    </MemoTooltip>
                  )}
                </MedicationCard>
              </MedicationCardWrapper>
            );
          })}
        </MedicationGrid>
      </ContentLayout>

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

      {isMedicationModalOpen &&
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
                    onClick={() => {
                      const newInputType = dosageInputType === 'detailed' ? 'simple' : 'detailed';
                      setDosageInputType(newInputType);
                      // dosageInputType 변경 시 doseMethod도 함께 설정
                      setNewMedication({
                        ...newMedication,
                        doseMethod: newInputType === 'simple' ? DOSE_METHOD.asNeeded : DOSE_METHOD.daily,
                      });
                    }}
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
                          value={newMedication.amountPerIntake || ''}
                          onChange={(e) =>
                            setNewMedication({
                              ...newMedication,
                              amountPerIntake: Number(e.target.value),
                            })
                          }
                          placeholder="1"
                        />
                      </DosageInputGroup>
                      <DosageInputGroup>
                        <label>단위</label>
                        <select
                          value={newMedication.doseUnit}
                          onChange={(e) =>
                            setNewMedication({
                              ...newMedication,
                              doseUnit: e.target.value as DOSE_UNIT,
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
                          value={newMedication.intakeTimesPerDay || ''}
                          onChange={(e) =>
                            setNewMedication({
                              ...newMedication,
                              intakeTimesPerDay: Number(e.target.value),
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
                        value={newMedication.doseAmount}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            doseAmount: Number(e.target.value),
                          })
                        }
                        placeholder="3"
                      />
                    </DosageInputGroup>
                    <DosageInputGroup>
                      <label>단위</label>
                      <select
                        value={newMedication.doseUnit}
                        onChange={(e) =>
                          setNewMedication({
                            ...newMedication,
                            doseUnit: e.target.value as DOSE_UNIT,
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
                  </SimpleDosageInput>
                )}
              </DosageSection>

              {dosageInputType === 'detailed' && (
                <DaySection>
                  <DaySectionHeader>
                    <label>복용 요일 선택</label>
                    <SelectAllButton
                      isAllSelected={weekDays.every((d) =>
                        (newMedication.daySlots || []).includes(d)
                      )}
                      onClick={toggleAllDays}
                      type="button"
                    >
                      {weekDays.every((d) =>
                        (newMedication.daySlots || []).includes(d)
                      )
                        ? '전체 해제'
                        : '매일'}
                    </SelectAllButton>
                  </DaySectionHeader>
                  <DayGrid>
                    {weekDays.map((day) => (
                      <DayButton
                        key={day}
                        isSelected={(newMedication.daySlots || []).includes(day)}
                        onClick={() => handleDayOfWeekChange(day)}
                      >
                        {day}요일
                      </DayButton>
                    ))}
                  </DayGrid>
                </DaySection>
              )}

              {dosageInputType === 'detailed' && (
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
                    </TimePresetButtons>
                  </TimeSectionHeader>
                  <TimeGrid>
                    {timeSlotOptions.map((timeSlot: DOSE_TIME) => (
                      <TimeButton
                        key={timeSlot}
                        isSelected={(newMedication.timeSlots || []).includes(
                          timeSlot
                        )}
                        onClick={() => handleTimeSlotChange(timeSlot)}
                      >
                        <span style={{ whiteSpace: 'pre-line' }}>{timeSlotOptionsToText[timeSlot]}</span>
                      </TimeButton>
                    ))}
                  </TimeGrid>
                </TimeSection>
              )}

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
                <CancelButton type="button" onClick={resetMedicationModal}>
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

      {isRecordInputModalOpen &&
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
                    isActive={
                      newMedicineRecord.status === DOSE_RECORD_STATUS.taken
                    }
                    statusType="taken"
                    onClick={() =>
                      setNewMedicineRecord({
                        ...newMedicineRecord,
                        status: DOSE_RECORD_STATUS.taken,
                      })
                    }
                  >
                    복용
                  </StatusButton>
                  <StatusButton
                    isActive={
                      newMedicineRecord.status === DOSE_RECORD_STATUS.missed
                    }
                    statusType="skipped"
                    onClick={() =>
                      setNewMedicineRecord({
                        ...newMedicineRecord,
                        status: DOSE_RECORD_STATUS.missed,
                      })
                    }
                  >
                    건너뜀
                  </StatusButton>
                </StatusToggle>
              </InputGroup>

              <RecordAmountSection
                isVisible={
                  newMedicineRecord.status === DOSE_RECORD_STATUS.taken
                }
              >
                <label>복용량</label>
                <RecordAmountRow>
                  <input
                    type="number"
                    step="0.5"
                    value={newMedicineRecord.amount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setNewMedicineRecord({
                        ...newMedicineRecord,
                        amount: value,
                      });
                    }}
                    placeholder="1"
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#f8f9fa',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px',
                      color: '#6c757d',
                      minWidth: '80px',
                      justifyContent: 'center',
                    }}
                  >
                    {selectedMedicationForRecord?.doseUnit || DOSE_UNIT.pill}
                  </div>
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
                      value={newMedicineRecord.memo}
                      onChange={(e) =>
                        setNewMedicineRecord({
                          ...newMedicineRecord,
                          memo: e.target.value,
                        })
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

      {isRecordListModalOpen &&
        createPortal(
          <ModalOverlay isOpen={true}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>
                  📋 {selectedMedicationForList?.name} 복용 기록
                </ModalTitle>
                <CloseButton onClick={closeRecordListModal}>×</CloseButton>
              </ModalHeader>

              <div style={{ padding: '20px' }}>
                {selectedMedicationForList?.records &&
                selectedMedicationForList.records.length > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    {selectedMedicationForList.records
                      .sort(
                        (a: MedicationRecord, b: MedicationRecord) =>
                          new Date(b.timestamp).getTime() -
                          new Date(a.timestamp).getTime()
                      )
                      .map((record: MedicationRecord) => {
                        const date = new Date(record.timestamp);
                        const isToday =
                          date.toDateString() === new Date().toDateString();
                        const dateStr = date.toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short',
                        });
                        const timeStr = date.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <div
                            key={record.uuid}
                            style={{
                              background: isToday ? '#f0f8ff' : '#f8f9fa',
                              border: `2px solid ${isToday ? '#2196f3' : '#e9ecef'}`,
                              borderRadius: '12px',
                              padding: '16px',
                              position: 'relative',
                              width: '80%',
                              maxWidth: '80%',
                            }}
                          >
                            {isToday && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '8px',
                                  left: '12px',
                                  background: '#2196f3',
                                  color: 'white',
                                  fontSize: '10px',
                                  padding: '2px 6px',
                                  borderRadius: '10px',
                                  fontWeight: '600',
                                  zIndex: 1,
                                }}
                              >
                                오늘
                              </div>
                            )}

                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '8px',
                                marginTop: isToday ? '20px' : '0',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#333',
                                  }}
                                >
                                  {dateStr}
                                </div>
                                <div
                                  style={{ fontSize: '14px', color: '#666' }}
                                >
                                  {timeStr}
                                </div>
                              </div>
                              <div
                                style={{
                                  background:
                                    record.status === DOSE_RECORD_STATUS.taken
                                      ? '#4caf50'
                                      : '#f44336',
                                  color: 'white',
                                  padding: '4px 12px',
                                  borderRadius: '16px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                }}
                              >
                                {record.status === DOSE_RECORD_STATUS.taken
                                  ? '✓ 복용완료'
                                  : '✗ 건너뜀'}
                              </div>
                            </div>

                            {record.status === DOSE_RECORD_STATUS.taken && (
                              <div
                                style={{
                                  fontSize: '14px',
                                  color: '#666',
                                  marginBottom: '8px',
                                }}
                              >
                                💊 복용량:{' '}
                                {record.amount && record.amount > 0
                                  ? `${record.amount}${selectedMedicationForList?.doseUnit || '정'}`
                                  : '기록되지 않음'}
                              </div>
                            )}

                            {record.memo && (
                              <div
                                style={{
                                  background: 'rgba(255, 255, 255, 0.7)',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  fontSize: '14px',
                                  color: '#555',
                                  fontStyle: 'italic',
                                }}
                              >
                                📝 {record.memo}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      color: '#666',
                    }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                      📝
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        marginBottom: '8px',
                      }}
                    >
                      아직 복용 기록이 없습니다
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      &ldquo;기록하기&rdquo; 버튼을 눌러 첫 복용 기록을
                      남겨보세요!
                    </div>
                  </div>
                )}
              </div>

              <ButtonSection>
                <SaveButton onClick={closeRecordListModal}>닫기</SaveButton>
              </ButtonSection>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </MedicationWrapper>
  );
};

export default MedicationPage;
