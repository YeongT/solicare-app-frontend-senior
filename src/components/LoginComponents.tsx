import React from 'react';
import {
  Button,
  FormGroup,
  FormLabel,
  HomeButtonWrapper,
  Input,
  Toast,
  WelcomeSubtitle,
  WelcomeTitle,
} from '../styles/pages/LoginPage.styles';
import EyeIcon from '../components/icons/EyeIcon';
import EyeOffIcon from '../components/icons/EyeOffIcon';
import HomeIcon from '../components/icons/HomeIcon';

// 로그인 폼 컴포넌트
export const LoginForm: React.FC<{
  formData: { userId: string; password: string };
  showPassword: boolean;
  loading: boolean;
  toast: { message: string; type: 'success' | 'error' } | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({
  formData,
  showPassword,
  loading,
  toast,
  onInputChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <FormLabel htmlFor="userId">아이디</FormLabel>
        <Input
          id="userId"
          type="text"
          name="userId"
          placeholder="아이디를 입력하세요"
          value={formData.userId}
          onChange={onInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="password">비밀번호</FormLabel>
        <div style={{ position: 'relative' }}>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={formData.password}
            onChange={onInputChange}
            required
            style={{
              paddingRight: 40,
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            onClick={onTogglePassword}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}
          >
            {showPassword ? (
              <EyeOffIcon size={22} color="#888" />
            ) : (
              <EyeIcon size={22} color="#888" />
            )}
          </button>
        </div>
      </FormGroup>
      {/* 로그인 상태 표시 */}
      {toast ? (
        <Toast type={toast.type}>{toast.message}</Toast>
      ) : loading ? (
        <Button type="button" disabled>
          로그인 중..
        </Button>
      ) : (
        <Button type="submit">로그인</Button>
      )}
    </form>
  );
};

// 왼쪽 섹션 컴포넌트
export const LoginLeftSection: React.FC<{
  onGoHome: () => void;
}> = ({ onGoHome }) => {
  return (
    <>
      <HomeButtonWrapper onClick={onGoHome} title="홈으로 이동">
        <HomeIcon size={28} color="#888" />
      </HomeButtonWrapper>
      <WelcomeTitle>
        다시 만나서
        <br />
        반갑습니다
      </WelcomeTitle>
      <WelcomeSubtitle>
        Solicare와 함께 건강한 생활을 계속해보세요
      </WelcomeSubtitle>
    </>
  );
};

// 회원가입 링크 섹션 컴포넌트
export const RegisterLink: React.FC<{
  onRegister: () => void;
}> = ({ onRegister }) => {
  return (
    <Button variant="secondary" type="button" onClick={onRegister}>
      회원가입하기
    </Button>
  );
};
