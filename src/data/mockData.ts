import {
  Medication,
  DOSE_METHOD,
  DOSE_UNIT,
  DOSE_DATE,
  DOSE_TIME,
  DOSE_RECORD_STATUS,
} from '../types/apiTypes';

// Mock data for the application
export const mockMedications: Medication[] = [
  {
    uuid: 'med-1-uuid-2024',
    name: '혈압약',
    description: '고혈압 치료용 약물',
    doseMethod: DOSE_METHOD.daily,
    doseUnit: DOSE_UNIT.pill,
    doseAmount: 1,
    amountPerIntake: 1,
    intakeTimesPerDay: 1,
    memo: '식전 복용',
    daySlots: [
      DOSE_DATE.monday,
      DOSE_DATE.tuesday,
      DOSE_DATE.wednesday,
      DOSE_DATE.thursday,
      DOSE_DATE.friday,
      DOSE_DATE.saturday,
      DOSE_DATE.sunday,
    ],
    timeSlots: [DOSE_TIME.morning],
    records: [
      {
        uuid: 'record-1-1',
        timestamp: '2025-09-22T08:00:00',
        status: DOSE_RECORD_STATUS.taken,
        amount: 1,
        memo: '',
      },
      {
        uuid: 'record-1-2',
        timestamp: '2025-09-23T08:00:00',
        status: DOSE_RECORD_STATUS.taken,
        amount: 1,
        memo: '',
      },
      {
        uuid: 'record-1-3',
        timestamp: '2025-09-24T08:00:00',
        status: DOSE_RECORD_STATUS.missed,
        amount: 0,
        memo: '복용하지 못함',
      },
    ],
  },
  {
    uuid: 'med-2-uuid-2024',
    name: '비타민',
    description: '종합 비타민 보충제',
    doseMethod: DOSE_METHOD.total,
    doseUnit: DOSE_UNIT.pill,
    doseAmount: 2,
    amountPerIntake: 2,
    intakeTimesPerDay: 1,
    memo: '식후 복용',
    daySlots: [
      DOSE_DATE.monday,
      DOSE_DATE.tuesday,
      DOSE_DATE.wednesday,
      DOSE_DATE.thursday,
      DOSE_DATE.friday,
      DOSE_DATE.saturday,
      DOSE_DATE.sunday,
    ],
    timeSlots: [DOSE_TIME.dinner],
    records: [
      {
        uuid: 'record-2-1',
        timestamp: '2025-09-22T18:00:00',
        status: DOSE_RECORD_STATUS.taken,
        amount: 2,
        memo: '',
      },
      {
        uuid: 'record-2-2',
        timestamp: '2025-09-23T18:00:00',
        status: DOSE_RECORD_STATUS.taken,
        amount: 1,
        memo: '1개만 복용',
      },
      {
        uuid: 'record-2-3',
        timestamp: '2025-09-24T18:00:00',
        status: DOSE_RECORD_STATUS.missed,
        amount: 0,
        memo: '복용하지 못함',
      },
    ],
  },
];

export const mockExerciseData = {
  today: {
    steps: 3240,
    distance: '2.1km',
    calories: 156,
    duration: '25분',
  },
  neighborComparison: {
    mySteps: 3240,
    neighborAverage: 2850,
    percentile: 72, // 상위 28%
    ranking: '상위 28%',
  },
  weekly: [
    { day: '월', steps: 2800, duration: '20분' },
    { day: '화', steps: 3200, duration: '25분' },
    { day: '수', steps: 2900, duration: '22분' },
    { day: '목', steps: 3500, duration: '28분' },
    { day: '금', steps: 3100, duration: '24분' },
    { day: '토', steps: 2800, duration: '20분' },
    { day: '일', steps: 3240, duration: '25분' },
  ],
};

export const mockNotifications = [
  {
    id: 1,
    title: '💊 약 복용 알림',
    message: '고혈압약 복용 시간입니다',
    time: '15:00',
    type: 'medication',
  },
  {
    id: 2,
    title: '🚶‍♂️ 운동 추천',
    message: '오늘 걸음 수가 목표에 가까워요!',
    time: '16:30',
    type: 'exercise',
  },
  {
    id: 4,
    title: '💧 수분 섭취',
    message: '물 마실 시간이에요',
    time: '19:00',
    type: 'water',
  },
  {
    id: 5,
    title: '🌙 수면 준비',
    message: '숙면을 위해 준비하세요',
    time: '21:30',
    type: 'sleep',
  },
];
