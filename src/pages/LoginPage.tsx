import React from 'react';
import { useLogin } from '../hooks/useLogin';
import {
  LoginForm,
  LoginLeftSection,
  RegisterLink,
} from '../components/LoginComponents';
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
} from '../styles/pages/LoginPage.styles';

const LoginPage: React.FC = () => {
  const {
    // 상태 값
    formData,
    toast,
    loading,
    showPassword,

    // 상태 변경 함수
    setShowPassword,

    // 이벤트 핸들러
    handleInputChange,
    handleLogin,

    // 네비게이션 함수
    goToHome,
    goToRegister,

    // 인증 관련
    isAuthenticated,
    authLoading,
    navigate,
  } = useLogin();

  // 로그인 상태 확인 - 로그인된 상태면 대시보드로 리디렉션
  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  return (
    <PageContainer>
      <Card>
        <LeftSection>
          <LoginLeftSection onGoHome={goToHome} />
        </LeftSection>
        <RightSection>
          <FormSection>
            <PageTitle>로그인</PageTitle>
            <PageSubtitle>
              계정에 로그인하여 건강 관리를 계속하세요
            </PageSubtitle>

            <LoginForm
              formData={formData}
              showPassword={showPassword}
              loading={loading}
              toast={toast}
              onInputChange={handleInputChange}
              onTogglePassword={() => setShowPassword((v) => !v)}
              onSubmit={handleLogin}
            />

            <Divider />
            <ToggleText>계정이 없으신가요?</ToggleText>
            <RegisterLink onRegister={goToRegister} />
          </FormSection>
        </RightSection>
      </Card>
    </PageContainer>
  );
};

export default LoginPage;
