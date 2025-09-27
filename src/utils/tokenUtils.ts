// JWT 토큰 관련 유틸리티 함수들
import { decodeJwt } from 'jose';

interface JWTPayload {
  sub: string; // subject (uuid)
  exp?: number; // expiration time
  iat?: number; // issued at
  [key: string]: unknown; // 다른 필드들
}

export const parseJWT = (token: string): JWTPayload | null => {
  try {
    // jose 라이브러리를 사용하여 JWT 파싱
    const payload = decodeJwt(token);
    return payload as JWTPayload;
  } catch {
    return null;
  }
};

export const extractSubjectFromToken = (token: string): string | null => {
  const payload = parseJWT(token);
  // subject에 uuid가 저장됨
  return payload?.sub || null;
};

// 토큰이 만료되었는지 확인
export const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};
