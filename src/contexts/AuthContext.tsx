import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserProfile, Identity } from '../types/apiTypes';
import { extractSubjectFromToken } from '../utils/tokenUtils';

interface AuthContextType {
  isAuthenticated: boolean;
  identity: Identity | null;
  profile: UserProfile | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// localStorage로 변경
const STORAGE_KEYS = {
  IDENTITY: 'user_identity',
  PROFILE: 'user_profile',
} as const;

// localStorage에서 값을 가져오는 함수
const getStorageValue = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.error('localStorage 읽기 실패:', err);
    return null;
  }
};

// localStorage에 값을 저장하는 함수
const setStorageValue = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error('localStorage 저장 실패:', err);
  }
};

// localStorage에서 값을 삭제하는 함수
const removeStorageValue = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('localStorage 삭제 실패:', err);
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedIdentity = getStorageValue(STORAGE_KEYS.IDENTITY);
    const storedProfile = getStorageValue(STORAGE_KEYS.PROFILE);
    if (storedIdentity) {
      try {
        const identityObj: Identity = JSON.parse(storedIdentity);
        if (identityObj.token && identityObj.uuid) {
          setIsAuthenticated(true);
          setIdentity(identityObj);
          if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
          } else {
            setProfile(null);
          }
        } else {
          setIsAuthenticated(false);
          setIdentity(null);
          setProfile(null);
        }
      } catch (err) {
        console.error('Identity/Profile 파싱 실패:', err);
        setIsAuthenticated(false);
        setIdentity(null);
        setProfile(null);
      }
    } else {
      setIsAuthenticated(false);
      setIdentity(null);
      setProfile(null);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    removeStorageValue(STORAGE_KEYS.IDENTITY);
    removeStorageValue(STORAGE_KEYS.PROFILE);
    setIsAuthenticated(false);
    setIdentity(null);
    setProfile(null);
  };

  const value = {
    isAuthenticated,
    profile,
    identity,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 로그인/회원가입 성공 시 호출
export const setAuthData = (token: string, profile: UserProfile): void => {
  const uuid = extractSubjectFromToken(token);
  if (!uuid) {
    console.error('토큰에서 UUID 추출 실패');
    return;
  }
  const identityObj: Identity = { token, uuid };
  setStorageValue(STORAGE_KEYS.IDENTITY, JSON.stringify(identityObj));
  setStorageValue(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};
