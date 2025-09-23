import React from 'react';
import { useRegister } from '../hooks/useRegister';
import { useAuth } from '../contexts/AuthContext';
import {
  LoginInfoForm,
  LoginLink,
  PersonalInfoForm,
  RegisterLeftSection,
  RegisterSteps,
  Step2Navigation,
  Step3Navigation,
  TermsAgreementForm,
} from '../components/RegisterComponents';
import {
  Card,
  Divider,
  FormSection,
  LeftSection,
  PageContainer,
  PageSubtitle,
  PageTitle,
  RightSection,
  ToggleText,
} from '../styles/pages/RegisterPage.styles';

const RegisterPage: React.FC = () => {
  const {
    // 폼 데이터 및 상태
    formData,
    passwordConfirm,
    isNotesExpanded,
    agreeToTerms,
    loading,
    activeTab,
    step,
    toast,

    // 유효성 검사 관련
    errorsStep1,
    errorsStep2,
    errorMessage,

    // 상태 변경 함수
    navigate,
    formRef,
    setShowPassword,
    setShowPasswordConfirm,
    setIsNotesExpanded,
    setAgreeToTerms,
    setStep,

    // 핸들러 함수
    handleInputChange,
    handlePasswordConfirmChange,
    handleSignup,
    handlePhoneChange,
    handleNextStep,
    showPassword,
    showPasswordConfirm,

    // 스텝 상태 함수
    getStepStatus,
  } = useRegister();

  const { isAuthenticated, loading: authLoading } = useAuth();

  // 로그인 상태 확인
  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  return (
    <PageContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Card>
          <LeftSection>
            <RegisterLeftSection onGoHome={() => navigate('/')} />
          </LeftSection>
          <RightSection>
            <PageTitle style={{ marginBottom: 8 }}>계정 만들기</PageTitle>
            <PageSubtitle style={{ marginBottom: 24 }}>
              몇 가지 정보만 입력하면 시작할 수 있습니다
            </PageSubtitle>

            {/* 단계 진행 UI */}
            <RegisterSteps
              step={step}
              getStepStatus={getStepStatus}
              onStepClick={setStep}
            />

            <FormSection
              style={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: '520px',
                marginBottom: 24,
              }}
            >
              <form ref={formRef} onSubmit={handleSignup}>
                {/* 1단계: 로그인 정보 */}
                {step === 1 && (
                  <LoginInfoForm
                    formData={formData}
                    passwordConfirm={passwordConfirm}
                    errorsStep1={errorsStep1}
                    errorMessage={errorMessage}
                    showPassword={showPassword}
                    showPasswordConfirm={showPasswordConfirm}
                    loading={loading}
                    handleInputChange={handleInputChange}
                    handlePasswordConfirmChange={handlePasswordConfirmChange}
                    setShowPassword={setShowPassword}
                    setShowPasswordConfirm={setShowPasswordConfirm}
                    handleNextStep={handleNextStep}
                  />
                )}

                {/* 2단계: 개인정보 */}
                {step === 2 && (
                  <PersonalInfoForm
                    formData={formData}
                    isNotesExpanded={isNotesExpanded}
                    activeTab={activeTab}
                    errorsStep2={errorsStep2}
                    errorMessage={errorMessage}
                    loading={loading}
                    setIsNotesExpanded={setIsNotesExpanded}
                    handleInputChange={handleInputChange}
                    handlePhoneChange={handlePhoneChange}
                    handleNextStep={handleNextStep}
                  />
                )}

                {/* 3단계: 약관 동의 */}
                {step === 3 && (
                  <TermsAgreementForm
                    agreeToTerms={agreeToTerms}
                    setAgreeToTerms={setAgreeToTerms}
                  />
                )}
              </form>
            </FormSection>

            {/* 2단계와 3단계의 토스트 메시지와 버튼을 FormSection 밖으로 이동 */}
            {step === 2 && (
              <Step2Navigation
                formData={formData}
                errorsStep2={errorsStep2}
                errorMessage={errorMessage}
                loading={loading}
                handleNextStep={handleNextStep}
              />
            )}

            {step === 3 && (
              <Step3Navigation
                toast={toast}
                errorMessage={errorMessage}
                agreeToTerms={agreeToTerms}
                loading={loading}
                formData={formData}
                errorsStep1={errorsStep1}
                errorsStep2={errorsStep2}
                passwordConfirm={passwordConfirm}
                handleSignup={handleSignup}
              />
            )}

            {/* 1단계에서만 "이미 계정이 있으신가요?" 표시 */}
            {step === 1 && (
              <>
                <Divider />
                <ToggleText>이미 계정이 있으신가요?</ToggleText>
                <LoginLink onLoginClick={() => navigate('/login')} />
              </>
            )}
          </RightSection>
        </Card>
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
