import React from 'react';
import { SignupRequest } from '../types/apiTypes';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxLabel,
  CollapsibleContent,
  FormGrid,
  FormGroup,
  FormLabel,
  FullWidthGroup,
  Input,
  OptionalSection,
  OptionalToggle,
  Select,
  TextArea,
  Toast,
  ToggleIcon,
  WelcomeSubtitle,
  WelcomeTitle,
} from '../styles/pages/RegisterPage.styles';
import { HomeButtonWrapper } from '../styles/pages/LoginPage.styles';
import { Stepper } from './UI/Stepper';
import EyeIcon from '../components/icons/EyeIcon';
import EyeOffIcon from '../components/icons/EyeOffIcon';
import HomeIcon from '../components/icons/HomeIcon';

// 회원가입 왼쪽 섹션 컴포넌트
export const RegisterLeftSection: React.FC<{
  onGoHome: () => void;
}> = ({ onGoHome }) => {
  return (
    <>
      <HomeButtonWrapper onClick={onGoHome} title="홈으로 이동">
        <HomeIcon size={28} color="#888" />
      </HomeButtonWrapper>
      <WelcomeTitle>
        Solicare에 오신 것을
        <br />
        환영합니다
      </WelcomeTitle>
      <WelcomeSubtitle>건강한 일상을 위한 스마트한 관리 플랫폼</WelcomeSubtitle>
      <div style={{ marginTop: '24px' }}>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          <li style={{ margin: '12px 0', fontSize: '16px', color: '#fff' }}>
            ✅ 약물 복용 알림 서비스
          </li>
          <li style={{ margin: '12px 0', fontSize: '16px', color: '#fff' }}>
            ✅ 체계적인 운동 및 식단 관리
          </li>
          <li style={{ margin: '12px 0', fontSize: '16px', color: '#fff' }}>
            ✅ AI 기반 건강 상담
          </li>
        </ul>
      </div>
    </>
  );
};

// 회원가입 스텝 표시 컴포넌트
export const RegisterSteps: React.FC<{
  step: number;
  getStepStatus: (
    stepNumber: number
  ) => 'active' | 'completed' | 'error' | 'incomplete' | 'warning';
  onStepClick: (step: number) => void;
}> = ({ getStepStatus, onStepClick }) => {
  return (
    <Stepper
      steps={[
        { label: '로그인 정보', status: getStepStatus(1) },
        { label: '개인 정보', status: getStepStatus(2) },
        { label: '약관 동의', status: getStepStatus(3) },
      ]}
      onStepClick={onStepClick}
    />
  );
};

// 로그인 정보 입력 폼 (1단계)
export const LoginInfoForm: React.FC<{
  formData: SignupRequest;
  passwordConfirm: string;
  errorsStep1: { [key: string]: string };
  errorMessage: string;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPasswordConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
}> = ({
  formData,
  passwordConfirm,
  errorsStep1,
  errorMessage,
  showPassword,
  showPasswordConfirm,
  loading,
  handleInputChange,
  handlePasswordConfirmChange,
  setShowPassword,
  setShowPasswordConfirm,
  handleNextStep,
}) => {
  return (
    <>
      <FormGrid
        style={{
          gridTemplateColumns: window.innerWidth <= 600 ? '1fr' : '1fr 1fr',
          gap: '18px',
          marginTop: 0,
        }}
      >
        <FormGroup
          style={{ gridColumn: window.innerWidth <= 600 ? '1' : 'span 2' }}
        >
          <FormLabel htmlFor="userId">아이디</FormLabel>
          <Input
            id="userId"
            type="text"
            name="userId"
            placeholder="사용할 아이디를 입력하세요"
            value={formData.userId}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onClick={() => setShowPassword((v) => !v)}
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
        <FormGroup>
          <FormLabel htmlFor="passwordConfirm">비밀번호 확인</FormLabel>
          <div style={{ position: 'relative' }}>
            <Input
              id="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              placeholder="비밀번호 확인을 입력하세요"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
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
              aria-label={
                showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'
              }
              onClick={() => setShowPasswordConfirm((v) => !v)}
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
              {showPasswordConfirm ? (
                <EyeOffIcon size={22} color="#888" />
              ) : (
                <EyeIcon size={22} color="#888" />
              )}
            </button>
          </div>
        </FormGroup>
      </FormGrid>

      {/* 1단계 오류 Toast - 버튼 후에 표시하고 입력값이 있을 때만 */}
      {errorMessage &&
        (formData.userId || formData.password || passwordConfirm) && (
          <Toast type="error" style={{ margin: '16px 0 0 0' }}>
            {errorMessage}
          </Toast>
        )}
      <Button
        type="button"
        onClick={handleNextStep}
        disabled={
          Object.values(errorsStep1).some((e) => e) ||
          !formData.userId ||
          !formData.password ||
          !passwordConfirm ||
          loading
        }
        style={{ width: '100%', marginTop: 24 }}
      >
        {loading ? '계정을 만드는 중...' : '다음'}
      </Button>
    </>
  );
};

// 개인 정보 입력 폼 (2단계)
export const PersonalInfoForm: React.FC<{
  formData: SignupRequest;
  isNotesExpanded: boolean;
  activeTab: string;
  errorsStep2: { [key: string]: string };
  errorMessage: string;
  loading: boolean;
  setIsNotesExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}> = ({
  formData,
  isNotesExpanded,
  activeTab,
  setIsNotesExpanded,
  handleInputChange,
  handlePhoneChange,
}) => {
  return (
    <>
      <FormGrid
        style={{
          gridTemplateColumns: window.innerWidth <= 600 ? '1fr' : '5fr 2fr 3fr',
          gap: '18px',
        }}
      >
        <FormGroup style={{ gridColumn: window.innerWidth <= 600 ? '1' : '1' }}>
          <FormLabel htmlFor="name">이름</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="홍길동"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup style={{ gridColumn: window.innerWidth <= 600 ? '1' : '2' }}>
          <FormLabel htmlFor="age">나이</FormLabel>
          <Input
            id="age"
            type="number"
            name="age"
            placeholder="85"
            value={formData.age}
            onChange={handleInputChange}
            required
            min="0"
            max="120"
          />
        </FormGroup>
        <FormGroup style={{ gridColumn: window.innerWidth <= 600 ? '1' : '3' }}>
          <FormLabel htmlFor="gender">성별</FormLabel>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">성별 선택</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
            <option value="OTHER">기타</option>
          </Select>
        </FormGroup>
      </FormGrid>
      {activeTab === 'personal' && (
        <FullWidthGroup>
          <FormGroup>
            <FormLabel htmlFor="phone">전화번호</FormLabel>
            <Input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="010-1234-5678"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              required
              maxLength={13}
            />
          </FormGroup>
        </FullWidthGroup>
      )}
      {activeTab === 'personal' && (
        <FullWidthGroup style={{ marginTop: 18 }}>
          <FormLabel htmlFor="address">주소</FormLabel>
          <Input
            id="address"
            type="text"
            name="address"
            placeholder="거주지 주소를 입력하세요"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </FullWidthGroup>
      )}
      {activeTab === 'personal' && (
        <FullWidthGroup>
          <OptionalSection>
            <OptionalToggle
              type="button"
              style={{
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
            >
              <span>특이사항 (선택사항)</span>
              <ToggleIcon isExpanded={isNotesExpanded}>▼</ToggleIcon>
            </OptionalToggle>
            {isNotesExpanded && (
              <CollapsibleContent>
                <TextArea
                  id="note"
                  name="note"
                  placeholder="건강상 특이사항이나 주의사항을 입력하세요"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows={3}
                />
              </CollapsibleContent>
            )}
          </OptionalSection>
        </FullWidthGroup>
      )}
    </>
  );
};

// 약관 동의 폼 (3단계)
export const TermsAgreementForm: React.FC<{
  agreeToTerms: boolean;
  setAgreeToTerms: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ agreeToTerms, setAgreeToTerms }) => {
  return (
    <CheckboxGroup>
      <Checkbox
        id="agreeToTerms"
        checked={agreeToTerms}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAgreeToTerms(e.target.checked)
        }
        required
      />
      <CheckboxLabel htmlFor="agreeToTerms">
        <a
          href="https://github.com/Solicare"
          target="_blank"
          rel="noopener noreferrer"
        >
          개인정보 처리방침
        </a>
        에 동의합니다. 서비스 이용을 위해 필요한 최소한의 개인정보를 수집하며,
        동의를 거부할 권리가 있습니다.
      </CheckboxLabel>
    </CheckboxGroup>
  );
};

// 2단계 내비게이션 버튼 및 오류 메시지
export const Step2Navigation: React.FC<{
  formData: SignupRequest;
  errorsStep2: { [key: string]: string };
  errorMessage: string;
  loading: boolean;
  handleNextStep: () => void;
}> = ({ formData, errorsStep2, errorMessage, loading, handleNextStep }) => {
  return (
    <>
      {/* 2단계 오류 Toast */}
      {errorMessage &&
        (formData.name ||
          formData.gender ||
          formData.age ||
          formData.phoneNumber ||
          formData.address) && (
          <Toast type="error" style={{ margin: '16px 0', maxWidth: '600px' }}>
            {errorMessage}
          </Toast>
        )}
      <Button
        type="button"
        onClick={handleNextStep}
        disabled={
          Object.values(errorsStep2).some((e) => e) ||
          !formData.name ||
          !formData.gender ||
          !formData.age ||
          !formData.phoneNumber ||
          !formData.address ||
          loading
        }
        style={{ width: '100%', maxWidth: '600px' }}
      >
        {loading ? '계정을 만드는 중...' : '다음'}
      </Button>
    </>
  );
};

// 3단계 제출 버튼 및 오류 메시지
export const Step3Navigation: React.FC<{
  toast: { message: string; type: 'success' | 'error' } | null;
  errorMessage: string;
  agreeToTerms: boolean;
  loading: boolean;
  formData: SignupRequest;
  errorsStep1: { [key: string]: string };
  errorsStep2: { [key: string]: string };
  passwordConfirm: string;
  handleSignup: (e: React.FormEvent) => void;
}> = ({
  toast,
  errorMessage,
  agreeToTerms,
  loading,
  formData,
  errorsStep1,
  errorsStep2,
  passwordConfirm,
  handleSignup,
}) => {
  return (
    <>
      {/* 회원가입 API 토스트 메시지 */}
      {toast && (
        <Toast
          type={toast.type}
          style={{ margin: '16px 0', maxWidth: '600px' }}
        >
          {toast.message}
        </Toast>
      )}

      {/* 3단계 유효성 검사 오류 Toast */}
      {errorMessage && !toast && (
        <Toast type="error" style={{ margin: '16px 0', maxWidth: '600px' }}>
          {errorMessage}
        </Toast>
      )}
      <Button
        type="button"
        disabled={
          !agreeToTerms ||
          loading ||
          Object.values(errorsStep1).some((e) => e) ||
          Object.values(errorsStep2).some((e) => e) ||
          !formData.userId ||
          !formData.password ||
          !passwordConfirm ||
          !formData.name ||
          !formData.gender ||
          !formData.age ||
          !formData.phoneNumber ||
          !formData.address ||
          formData.password !== passwordConfirm
        }
        style={{ width: '100%', maxWidth: '600px' }}
        onClick={handleSignup}
      >
        {loading ? '계정을 만드는 중...' : '계정 만들기'}
      </Button>
    </>
  );
};

// 로그인 링크 컴포넌트
export const LoginLink: React.FC<{
  onLoginClick: () => void;
}> = ({ onLoginClick }) => {
  return (
    <Button
      variant="secondary"
      type="button"
      style={{ maxWidth: 540 }}
      onClick={onLoginClick}
    >
      로그인하기
    </Button>
  );
};
