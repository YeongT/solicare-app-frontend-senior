// API 요청 및 응답 타입 정의

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface SignupRequest {
  userId: string;
  password: string;
  name: string;
  gender: string;
  age: string;
  phoneNumber: string;
  address: string;
  note: string;
}

// 실제 API 응답 구조
export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  body: T;
  errors: string[];
}

// 로그인/회원가입 응답의 body 부분
export interface AuthResponseBody {
  profile: SeniorProfile;
  token: string;
}

// 프로필 정보
export interface SeniorProfile {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  address: string;
  note: string;
}

// 로그인/회원가입 응답 타입 (둘 다 동일)
export type LoginResponse = ApiResponse<AuthResponseBody>;
export type SignupResponse = ApiResponse<AuthResponseBody>;

export enum DOSE_METHOD {
  'daily' = 'DAILY',
  'total' = 'TOTAL',
  'asNeeded' = 'AS_NEEDED',
}
export enum DOSE_UNIT {
  'pill' = '정',
  'ml' = '밀리리터',
  'cc' = '씨씨',
  'mg' = '밀리그램',
  'g' = '그램',
  'drop' = '방울',
  'syringe' = '주사기',
}
export enum DOSE_DATE {
  'sunday' = '일',
  'monday' = '월',
  'tuesday' = '화',
  'wednesday' = '수',
  'thursday' = '목',
  'friday' = '금',
  'saturday' = '토',
}
export enum DOSE_TIME {
  'morning' = '아침',
  'lunch' = '점심',
  'dinner' = '저녁',
  'night' = '취침전',
  'any' = '아무때나',
}

export interface Medication {
  uuid: string;
  name: string;
  description: string;
  doseAmount: number;
  doseUnit: DOSE_UNIT;
  doseMethod: DOSE_METHOD;
  daySlots?: DOSE_DATE[];
  timeSlots?: DOSE_TIME[];
  amountPerIntake?: number;
  intakeTimesPerDay?: number;
  memo?: string;
  records: MedicationRecord[];
}

export enum DOSE_RECORD_STATUS {
  'taken' = 'TAKEN',
  'missed' = 'MISSED',
}

export interface MedicationRecord {
  uuid: string;
  timestamp: string;
  status: DOSE_RECORD_STATUS;
  amount?: number;
  memo?: string;
}

export interface MealRecord {
  id: string; // 고유 식별자
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: '아침' | '점심' | '저녁' | '간식';
  description: string;
}
