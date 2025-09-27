import React, { useState, useEffect } from 'react';
import {
  DOSE_UNIT,
  DOSE_METHOD,
  DOSE_TIME,
  DOSE_DATE,
  DOSE_RECORD_STATUS,
  Medication,
  MedicationRecord,
} from '../types/apiTypes';
import { mockMedications } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export const useMedication = () => {
  const { identity, loading } = useAuth(); // loading도 받아옴

  const [medications, setMedications] = useState<Medication[]>([]);

  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [isRecordInputModalOpen, setIsRecordInputModalOpen] = useState(false);
  const [isRecordListModalOpen, setIsRecordListModalOpen] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [showRecordMemo, setShowRecordMemo] = useState(false);

  const [selectedMedicationForRecord, setSelectedMedicationForRecord] =
    useState<Medication | null>(null);
  const [selectedMedicationForList, setSelectedMedicationForList] =
    useState<Medication | null>(null);

  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);

  type MedicationData = Omit<Medication, 'uuid' | 'records'>;
  const [newMedication, setNewMedication] = useState<MedicationData>({
    name: '',
    description: '',
    doseAmount: 1,
    doseUnit: DOSE_UNIT.pill,
    doseMethod: DOSE_METHOD.daily,
    daySlots: [],
    timeSlots: [],
    amountPerIntake: 0,
    intakeTimesPerDay: 0,
    memo: '',
  });

  type MedicationRecordData = Omit<MedicationRecord, 'uuid'>;
  const [newMedicineRecord, setNewMedicineRecord] =
    useState<MedicationRecordData>({
      timestamp: new Date().toISOString().slice(0, 16),
      status: DOSE_RECORD_STATUS.taken,
      amount: 1,
      memo: '',
    });

  const [dosageInputType, setDosageInputType] = useState<'detailed' | 'simple'>(
    'detailed'
  );

  const [recordTime, setRecordTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });

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

  // Helper functions
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

  // Effects
  useEffect(() => {
    // 인증된 사용자가 있고, 로딩이 끝난 후에만 localStorage에서 약물 데이터 로드
    if (!loading && identity?.uuid) {
      const savedMedicines = localStorage.getItem(
        `${identity.uuid}:medications`
      );
      if (savedMedicines) {
        setMedications(JSON.parse(savedMedicines));
      } else {
        // 저장된 데이터가 없으면 mockData로 초기화
        setMedications(mockMedications);
        localStorage.setItem(
          `${identity.uuid}:medications`,
          JSON.stringify(mockMedications)
        );
      }
    }
  }, [identity?.uuid, loading]);

  useEffect(() => {
    // 약물 데이터가 변경될 때마다 localStorage에 저장
    if (!loading && identity?.uuid) {
      localStorage.setItem(
        `${identity.uuid}:medications`,
        JSON.stringify(medications)
      );
    }
  }, [medications, identity?.uuid, loading]);

  useEffect(() => {
    // 약물 기록 데이터 로드
    if (!loading && identity?.uuid) {
      const savedRecords = localStorage.getItem(
        `${identity.uuid}:medicationRecords`
      );
      if (savedRecords) {
        setMedicationRecords(JSON.parse(savedRecords));
      }
    }
  }, [identity?.uuid, loading]);

  useEffect(() => {
    // 약물 기록 데이터 저장
    if (!loading && identity?.uuid && medicationRecords.length > 0) {
      localStorage.setItem(
        `${identity.uuid}:medicationRecords`,
        JSON.stringify(medicationRecords)
      );
    }
  }, [medicationRecords, identity?.uuid, loading]);

  // Modal handlers
  const openMedicationModal = () => setIsMedicationModalOpen(true);
  const closeMedicationModal = () => {
    setIsMedicationModalOpen(false);
    resetMedicationModal();
  };

  const openRecordInputModal = (medication: Medication) => {
    setSelectedMedicationForRecord(medication);
    setRecordTime(getCurrentTime());
    setShowRecordMemo(false);
    // 해당 약물의 기본 복용량으로 초기화
    const defaultAmount = medication.doseMethod === DOSE_METHOD.daily
      ? medication.amountPerIntake || 1
      : medication.doseAmount || 1;

    setNewMedicineRecord({
      timestamp: new Date().toISOString().slice(0, 16),
      status: DOSE_RECORD_STATUS.taken,
      amount: defaultAmount,
      memo: '',
    });
    setIsRecordInputModalOpen(true);
  };

  const closeRecordModal = () => {
    setIsRecordInputModalOpen(false);
    setSelectedMedicationForRecord(null);
  };

  const openRecordListModal = (medication: Medication) => {
    setSelectedMedicationForList(medication);
    setIsRecordListModalOpen(true);
  };

  const closeRecordListModal = () => {
    setIsRecordListModalOpen(false);
    setSelectedMedicationForList(null);
  };

  // Form handlers
  const handleDayOfWeekChange = (day: DOSE_DATE) => {
    setNewMedication((prev) => ({
      ...prev,
      daySlots: prev.daySlots?.includes(day)
        ? prev.daySlots.filter((d) => d !== day)
        : [...(prev.daySlots || []), day],
    }));
  };

  const toggleAllDays = () => {
    const allDays: DOSE_DATE[] = Object.values(DOSE_DATE);
    const isAllSelected = allDays.every((day) =>
      (newMedication.daySlots || []).includes(day)
    );
    setNewMedication((prev) => ({
      ...prev,
      daySlots: isAllSelected ? [] : allDays,
    }));
  };

  const handleTimeSlotChange = (time: DOSE_TIME) => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots?.includes(time)
        ? prev.timeSlots.filter((t) => t !== time)
        : [...(prev.timeSlots || []), time],
    }));
  };

  const setMorningEvening = () => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: [DOSE_TIME.morning, DOSE_TIME.dinner],
    }));
  };

  const setMorningLunchDinner = () => {
    setNewMedication((prev) => ({
      ...prev,
      timeSlots: [DOSE_TIME.morning, DOSE_TIME.lunch, DOSE_TIME.dinner],
    }));
  };

  // Business logic
  const generateDosageString = (): string => {
    if (dosageInputType === 'detailed') {
      const { amountPerIntake, doseUnit, intakeTimesPerDay } = newMedication;
      if (amountPerIntake && intakeTimesPerDay && doseUnit) {
        return `1회 ${amountPerIntake}${doseUnit} × ${intakeTimesPerDay}회`;
      }
    } else {
      const { doseAmount, doseUnit } = newMedication;
      if (doseAmount && doseUnit) {
        return `총 ${doseAmount}${doseUnit}`;
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

    // 간단하게 모드에서는 스케줄 제약이 없으므로 요일과 시간 검증을 건너뜀
    if (newMedication.doseMethod === DOSE_METHOD.daily) {
      if (!newMedication.daySlots || newMedication.daySlots.length === 0)
        return { isValid: false, errorMessage: '복용할 요일을 선택해주세요.' };
      if (!newMedication.timeSlots || newMedication.timeSlots.length === 0)
        return { isValid: false, errorMessage: '복용할 시간대를 선택해주세요.' };
    }

    return { isValid: true, errorMessage: '' };
  };

  // 약 추가 기본값 및 스케줄 처리 보완
  const addMedication = () => {
    const validation = validateForm();
    if (validation.isValid) {
      // 간단하게 모드일 때 doseAmount 기본값 1, daySlots/timeSlots 빈 배열
      const isSimple = newMedication.doseMethod !== DOSE_METHOD.daily;
      const doseAmount = isSimple ? 1 : Number(
        (newMedication.amountPerIntake || 1) * (newMedication.intakeTimesPerDay || 1)
      );
      const newMed: Medication = {
        uuid: crypto.randomUUID(),
        name: newMedication.name,
        description: newMedication.description,
        doseMethod: newMedication.doseMethod,
        doseUnit: newMedication.doseUnit,
        doseAmount,
        amountPerIntake: newMedication.amountPerIntake,
        intakeTimesPerDay: newMedication.intakeTimesPerDay,
        memo: newMedication.memo,
        daySlots: isSimple ? [] : newMedication.daySlots,
        timeSlots: isSimple ? [] : newMedication.timeSlots,
        records: [],
      };
      setMedications([...medications, newMed]);
      resetMedicationModal();
      closeMedicationModal();
      showNotification(
        'success',
        '약 추가 완료!',
        `${newMedication.name}이(가) 성공적으로 추가되었습니다.`
      );
    } else {
      showNotification('error', '입력 오류', validation.errorMessage);
    }
  };

  const resetMedicationModal = () => {
    setNewMedication({
      name: '',
      description: '',
      doseAmount: 0,
      doseUnit: DOSE_UNIT.pill,
      doseMethod: DOSE_METHOD.daily,
      daySlots: [],
      timeSlots: [],
      amountPerIntake: 0,
      intakeTimesPerDay: 0,
      memo: '',
    });
    setDosageInputType('detailed');
  };

  const saveRecord = () => {
    if (!selectedMedicationForRecord) return;

    // 복용 상태일 때만 복용량이 0이면 기록하지 않음, 건너뜀은 허용
    if (
      newMedicineRecord.status === DOSE_RECORD_STATUS.taken &&
      (newMedicineRecord.amount === undefined || newMedicineRecord.amount <= 0)
    ) {
      showNotification('error', '입력 오류', '복용량은 0보다 커야 합니다.');
      return;
    }

    const currentDate = getCurrentDate();
    const combinedDateTime = `${currentDate}T${recordTime}:00`;

    const newRecord: MedicationRecord = {
      uuid: `${Date.now()}`,
      timestamp: combinedDateTime,
      status: newMedicineRecord.status,
      amount:
        newMedicineRecord.status === DOSE_RECORD_STATUS.taken
          ? newMedicineRecord.amount
          : 0,
      memo: newMedicineRecord.memo,
    };

    // 기록을 약물에 추가
    setMedications((prevMeds: Medication[]) =>
      prevMeds.map((med: Medication) =>
        med.uuid === selectedMedicationForRecord.uuid
          ? {
              ...med,
              records: [...(med.records || []), newRecord],
            }
          : med
      )
    );
    setMedicationRecords((prev) => [...prev, newRecord]);
    setNewMedicineRecord({
      timestamp: new Date().toISOString().slice(0, 16),
      status: DOSE_RECORD_STATUS.taken,
      amount: 1,
      memo: '',
    });
    closeRecordModal();
    setTimeout(() => {
      setNotification({
        isOpen: true,
        type: 'success',
        title: '복용 기록이 저장되었습니다!',
        message: `${selectedMedicationForRecord.name}의 복용 기록이 추가되었습니다.`,
      });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, isOpen: false }));
      }, 2000);
    }, 150);
  };

  const deleteMedication = (uuid: string) => {
    const updated = medications.filter((med: Medication) => med.uuid !== uuid);
    setMedications(updated);
  };

  // Status calculation functions

  // 오늘 요일에 해당하는 약만 반환 (간단 추가는 오늘 복용 X)
  const getTodayMedications = (): Medication[] => {
    const today = new Date();
    const allDays: DOSE_DATE[] = Object.values(DOSE_DATE);
    const todayIndex = today.getDay();
    const todayName = allDays[todayIndex];
    return medications.filter((med: Medication) => {
      // daySlots가 undefined/null이면 매일 복용, 빈 배열이면 오늘 복용 X
      if (med.daySlots == null) return true;
      if (Array.isArray(med.daySlots) && med.daySlots.length === 0) return false;
      return med.daySlots.includes(todayName);
    });
  };

  // 오늘 먹어야 하는 약과 나머지 약 분리
  const todayMedications = getTodayMedications();
  const otherMedications = medications.filter(
    (med) => !todayMedications.includes(med)
  );
  const sortedMedications = [...todayMedications, ...otherMedications];

  const isMedicationTakenToday = (medication: Medication): boolean => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayRecords =
      medication.records?.filter(
        (rec) =>
          rec.timestamp?.startsWith(todayStr) &&
          rec.status === DOSE_RECORD_STATUS.taken
      ) || [];
    const takenAmount = todayRecords.reduce(
      (sum, rec) => sum + (rec.amount || 0),
      0
    );
    return (
      takenAmount >= medication.doseAmount * (medication.intakeTimesPerDay || 1)
    );
  };

  const getStatusMessage = (): string => {
    const todayMedications = getTodayMedications();
    if (todayMedications.length === 0) return '오늘 복용할 약이 없습니다.';

    let allTaken = true;
    let anyNotTaken = false;
    const todayStr = new Date().toISOString().slice(0, 10);

    todayMedications.forEach((med) => {
      const todayRecords =
        med.records?.filter(
          (rec) =>
            rec.timestamp?.startsWith(todayStr) &&
            rec.status === DOSE_RECORD_STATUS.taken
        ) || [];
      const takenAmount = todayRecords.reduce(
        (sum, rec) => sum + (rec.amount || 0),
        0
      );
      if (takenAmount < med.doseAmount * (med.intakeTimesPerDay || 1)) {
        allTaken = false;
        anyNotTaken = true;
      }
    });

    if (allTaken) return '오늘 모든 약을 복용 완료했습니다.';
    if (anyNotTaken) return '아직 복용하지 않은 약이 있습니다.';
    return '오늘 복용할 약이 없습니다.';
  };

  const getMedicationsForDay = (date: DOSE_DATE): Medication[] => {
    return medications.filter(
      (med: Medication) => med.daySlots && med.daySlots.includes(date)
    );
  };

  const getDayMedicationStatus = (date: DOSE_DATE) => {
    const dayMedications = getMedicationsForDay(date);
    if (dayMedications.length === 0) return 'neutral';

    const todayStr = new Date().toISOString().slice(0, 10);
    let allTaken = true;
    let anyTaken = false;

    dayMedications.forEach((med: Medication) => {
      const takenAmount = (med.records ?? [])
        .filter(
          (rec) =>
            rec.timestamp?.startsWith(todayStr) &&
            rec.status === DOSE_RECORD_STATUS.taken
        )
        .reduce((sum, rec) => sum + (rec.amount || 0), 0);
      if (med.doseAmount === 0 || takenAmount < med.doseAmount) {
        allTaken = false;
        if (takenAmount > 0) anyTaken = true;
      }
    });
    if (allTaken) return 'all-taken';
    if (anyTaken) return 'partial-taken';
    return 'not-taken';
  };

  // Utility functions
  const formatTimeSlots = (timeSlots?: DOSE_TIME[]): string => {
    return timeSlots ? timeSlots.map((slot) => slot).join(', ') : '';
  };

  const formatDaySlots = (days?: DOSE_DATE[]): string => {
    const allDays: DOSE_DATE[] = Object.values(DOSE_DATE);
    if (!days || days.length === 0) return '';
    if (days.length === 7 && allDays.every((d) => days.includes(d))) {
      return '매일';
    }
    return days.map((d) => d).join(', ') + '요일';
  };

  const totalCount = todayMedications.length;
  const takenCount = todayMedications.filter((med: Medication) =>
    isMedicationTakenToday(med)
  ).length;

  return {
    // State
    medications,
    isMedicationModalOpen,
    isRecordInputModalOpen,
    isRecordListModalOpen,
    showMemo,
    showRecordMemo,
    selectedMedicationForRecord,
    selectedMedicationForList,
    medicationRecords,
    newMedication,
    newMedicineRecord,
    dosageInputType,
    recordTime,
    notification,
    todayMedications,
    otherMedications,
    sortedMedications,
    takenCount,
    totalCount,

    // Setters
    setMedications,
    setNewMedication,
    setNewMedicineRecord,
    setDosageInputType,
    setRecordTime,
    setShowMemo,
    setShowRecordMemo,

    // Handlers
    openModal: openMedicationModal,
    closeModal: closeMedicationModal,
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
    showNotification,

    // Utility functions
    getCurrentDate,
    getCurrentTime,
    getStatusMessage,
    getTodayMedications,
    isMedicationTakenToday,
    getMedicationsForDay,
    getDayMedicationStatus,
    formatTimeSlots,
    formatDaySlots,
  };
};
