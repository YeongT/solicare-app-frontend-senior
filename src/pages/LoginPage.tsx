import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuth } from '../contexts/AuthContext';
import {
  Button,
  Card,
  Divider,
  FormGroup,
  FormLabel,
  FormSection,
  Input,
  LeftSection,
  PageContainer,
  PageSubtitle,
  PageTitle,
  RightSection,
  Toast,
  ToggleText,
  WelcomeSubtitle,
  WelcomeTitle,
} from '../styles/pages/LoginPage.styles';
import EyeIcon from '../components/icons/EyeIcon';
import EyeOffIcon from '../components/icons/EyeOffIcon';

const LoginPage: React.FC = () => {
  const {
    formData,
    toast,
    loading,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleLogin,
  } = useLogin();

  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  return (
    <PageContainer>
      <Card>
        <LeftSection>
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              cursor: 'pointer',
              fontSize: '1.3rem',
              color: '#333',
              background: 'white',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transition:
                'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
              zIndex: 10,
            }}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
            }}
            title="홈으로 이동"
          >
            🏠
          </div>
          <WelcomeTitle>
            다시 만나서
            <br />
            반갑습니다
          </WelcomeTitle>
          <WelcomeSubtitle>
            Solicare와 함께 건강한 생활을 계속해보세요
          </WelcomeSubtitle>
        </LeftSection>
        <RightSection>
          <FormSection>
            <PageTitle>로그인</PageTitle>
            <PageSubtitle>
              계정에 로그인하여 건강 관리를 계속하세요
            </PageSubtitle>
            <form onSubmit={handleLogin}>
              <FormGroup>
                <FormLabel htmlFor="userId">아이디</FormLabel>
                <Input
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="아이디를 입력하세요"
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
                    aria-label={
                      showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                    }
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
              {toast && <Toast type={toast.type}>{toast.message}</Toast>}
              {toast?.type !== 'success' && (
                <Button type="submit" disabled={loading}>
                  {loading ? '로그인 중..' : '로그인'}
                </Button>
              )}
            </form>
            <Divider />
            <ToggleText>계정이 없으신가요?</ToggleText>
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate('/register')}
            >
              회원가입하기
            </Button>
          </FormSection>
        </RightSection>
      </Card>
    </PageContainer>
  );
};

export default LoginPage;
