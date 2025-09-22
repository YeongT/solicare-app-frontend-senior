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

// 프로필 정보
export interface UserProfile {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  phoneNumber: string;
  address: string;
  note: string;
  uuid: string; // UserProfile에 uuid 추가 (서버 응답에 맞게 확장)
}

// 로그인/회원가입 응답의 body 부분
export interface AuthResponseBody {
  profile: UserProfile;
  token: string;
}

// 실제 API 응답 구조
export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  body: T;
  errors: string[];
}

// 로그인/회원가입 응답 타입 (둘 다 동일)
export type LoginResponse = ApiResponse<AuthResponseBody>;
export type SignupResponse = ApiResponse<AuthResponseBody>;

// 인증 정보 타입: uuid와 token을 함께 저장
export interface Identity {
  uuid: string;
  token: string;
}

export interface Medication {
  id: number | string;
  name: string;
  time?: string;
  timeSlots?: string[];
  daysOfWeek?: string[];
  taken?: boolean;
  description?: string;
  dailyDosage?: string;
  memo?: string;
  dosage?: string;
}

export interface MedicationRecord {
  id: string;
  medicationId: number | string;
  recordTime: string;
  status: 'taken' | 'missed';
}
