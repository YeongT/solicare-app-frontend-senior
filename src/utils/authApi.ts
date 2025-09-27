import axios from 'axios';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  SeniorProfile,
} from '../types/apiTypes';

const baseURL =
  process.env.REACT_APP_BASE_API_URL || 'http://localhost:8080/api';
console.log(process.env.REACT_APP_BASE_API_URL);
const api = axios.create({ baseURL });

// API 응답 타입 정의
interface AuthApiResponse {
  success: boolean;
  message: string;
  profile?: SeniorProfile;
  token?: string;
}

// 로그인 API
export async function loginApi(data: LoginRequest): Promise<AuthApiResponse> {
  try {
    const res = await api.post<LoginResponse>('/senior/login', data);

    if (res.data.isSuccess && res.data.body) {
      return {
        success: true,
        message: res.data.message,
        profile: res.data.body.profile,
        token: res.data.body.token,
      };
    } else {
      let errorMessage = res.data.message;

      // errors 배열이 있으면 메시지에 추가
      if (res.data.errors && res.data.errors.length > 0) {
        errorMessage += ': ' + res.data.errors.join(', ');
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorData = err.response.data;
      let errorMessage = errorData.message || '로그인 실패';

      // errors 배열이 있으면 메시지에 추가
      if (
        errorData.errors &&
        Array.isArray(errorData.errors) &&
        errorData.errors.length > 0
      ) {
        errorMessage += ': ' + errorData.errors.join(', ');
      }

      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: false,
      message: '알 수 없는 오류가 발생했습니다',
    };
  }
}

// 회원가입 API
export async function signupApi(data: SignupRequest): Promise<AuthApiResponse> {
  try {
    console.log(data);
    const res = await api.post<SignupResponse>('/senior/join', data);

    if (res.data.isSuccess && res.data.body) {
      return {
        success: true,
        message: res.data.message,
        profile: res.data.body.profile,
        token: res.data.body.token,
      };
    } else {
      let errorMessage = res.data.message;

      // errors 배열이 있으면 메시지에 추가
      if (res.data.errors && res.data.errors.length > 0) {
        errorMessage += ': ' + res.data.errors.join(', ');
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const errorData = err.response.data;
      let errorMessage = errorData.message || '회원가입 실패';

      // errors 배열이 있으면 메시지에 추가
      if (
        errorData.errors &&
        Array.isArray(errorData.errors) &&
        errorData.errors.length > 0
      ) {
        errorMessage += ': ' + errorData.errors.join(', ');
      }

      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: false,
      message: '알 수 없는 오류가 발생했습니다',
    };
  }
}
