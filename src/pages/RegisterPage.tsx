import React from 'react';
import { useRegister } from '../hooks/useRegister';
import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  CheckboxLabel,
  CollapsibleContent,
  Divider,
  FeatureItem,
  FeatureList,
  FormGrid,
  FormGroup,
  FormLabel,
  FormSection,
  FullWidthGroup,
  Input,
  LeftSection,
  OptionalSection,
  OptionalToggle,
  PageContainer,
  PageSubtitle,
  PageTitle,
  RightSection,
  Select,
  TextArea,
  Toast,
  ToggleIcon,
  ToggleText,
  WelcomeSubtitle,
  WelcomeTitle,
} from '../styles/pages/RegisterPage.styles';

import EyeIcon from '../components/icons/EyeIcon';
import EyeOffIcon from '../components/icons/EyeOffIcon';

const RegisterPage: React.FC = () => {
  const {
    formData,
    passwordConfirm,
    isNotesExpanded,
    agreeToTerms,
    toast,
    loading,
    activeTab,
    step,
    visitedStep,
    navigate,
    formRef,
    errorMessageStep1,
    errorMessageStep2,
    errorMessageStep3,
    handleInputChange,
    handleStepChange,
    handlePasswordConfirmChange,
    handleSignup,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    isLoginInfoComplete,
    isPersonalInfoComplete,
    handleStepClick,
    handlePhoneChange,
    setIsNotesExpanded,
    setAgreeToTerms,
  } = useRegister();

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
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                zIndex: 10,
              }}
              onClick={() => navigate('/')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 2px 8px rgba(0, 0, 0, 0.15)';
              }}
              title="홈으로 이동"
            >
              🏠
            </div>
            <WelcomeTitle>
              Solicare에 오신 것을
              <br />
              환영합니다
            </WelcomeTitle>
            <WelcomeSubtitle>
              건강한 일상을 위한 스마트한 관리 플랫폼
            </WelcomeSubtitle>
            <FeatureList>
              <FeatureItem>약물 복용 알림 서비스</FeatureItem>
              <FeatureItem>체계적인 운동 및 식단 관리</FeatureItem>
              <FeatureItem>AI 기반 건강 상담</FeatureItem>
            </FeatureList>
          </LeftSection>
          <RightSection>
            <PageTitle style={{ marginBottom: 8 }}>계정 만들기</PageTitle>
            <PageSubtitle style={{ marginBottom: 24 }}>
              몇 가지 정보만 입력하면 시작할 수 있습니다
            </PageSubtitle>
            {/* 구분선과 여백 추가 */}
            <Divider
              style={{ margin: '0 0 24px 0', height: 1, background: '#e5e7eb' }}
            />
            {/* 단계 진행 UI */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 32,
              }}
            >
              {[1, 2, 3].map((s) => {
                const label =
                  s === 1 ? '로그인 정보' : s === 2 ? '개인 정보' : '약관 동의';
                const isComplete =
                  s === 1
                    ? formData.userId &&
                      formData.password &&
                      passwordConfirm &&
                      formData.password === passwordConfirm
                    : s === 2
                      ? formData.name &&
                        formData.gender &&
                        formData.age &&
                        formData.phoneNumber &&
                        formData.address
                      : agreeToTerms;
                const isVisited = visitedStep.includes(s);
                let border = '2px solid #d1d5db';
                let background = '#f3f4f6';
                let color = '#222';
                if (step === s) {
                  border = '2px solid #2563eb';
                  background = '#e0e7ff';
                  color = '#2563eb'; // 선택중이면 파란색
                } else if (isVisited) {
                  if (isComplete) {
                    border = '2px solid #22c55e';
                    background = '#dcfce7';
                    color = '#1ca14d';
                  } else {
                    border = '2px solid #ee2828';
                    background = '#fee2e2';
                    color = '#b42020';
                  }
                }
                return (
                  <button
                    key={s}
                    type="button"
                    style={{
                      fontWeight: 700,
                      fontSize: '1.08rem',
                      padding: '8px 24px',
                      borderRadius: 8,
                      border,
                      background,
                      color,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => handleStepChange(s)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
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
                  <>
                    <FormGrid
                      style={{
                        gridTemplateColumns: '1fr 1fr',
                        gap: '18px',
                        marginTop: 0,
                      }}
                    >
                      <FormGroup style={{ gridColumn: 'span 2' }}>
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
                      <FormGroup>
                        <FormLabel htmlFor="passwordConfirm">
                          비밀번호 확인
                        </FormLabel>
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
                              showPasswordConfirm
                                ? '비밀번호 숨기기'
                                : '비밀번호 보기'
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
                    {/* 1단계 오류 Toast: 다음 버튼 위에 고정 */}
                    {errorMessageStep1 && (
                      <Toast type="error" style={{ margin: '24px 0 0 0' }}>
                        {errorMessageStep1}
                      </Toast>
                    )}
                    <Button
                      type="button"
                      onClick={() => handleStepClick(2)}
                      disabled={!isLoginInfoComplete}
                      style={{ width: '100%', marginTop: 24 }}
                    >
                      다음
                    </Button>
                  </>
                )}
                {/* 2단계: 개인정보 */}
                {step === 2 && (
                  <>
                    <FormGrid
                      style={{
                        gridTemplateColumns: '5fr 3fr 2fr',
                        gap: '18px',
                      }}
                    >
                      {/* 이름/성별/나이 */}
                      <FormGroup style={{ gridColumn: '1' }}>
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
                      <FormGroup style={{ gridColumn: '2' }}>
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
                      <FormGroup style={{ gridColumn: '3' }}>
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
                            <ToggleIcon isExpanded={isNotesExpanded}>
                              ▼
                            </ToggleIcon>
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
                    {/* 2단계 오류 Toast: 다음/이전 버튼 위에 고정 */}
                    {errorMessageStep2 && (
                      <Toast type="error" style={{ margin: '24px 0 0 0' }}>
                        {errorMessageStep2}
                      </Toast>
                    )}
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <Button
                        type="button"
                        onClick={() => handleStepClick(1)}
                        style={{ flex: 1 }}
                      >
                        이전
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleStepClick(3)}
                        disabled={!isPersonalInfoComplete}
                        style={{ flex: 1 }}
                      >
                        다음
                      </Button>
                    </div>
                  </>
                )}
                {/* 3단계: 약관 동의 */}
                {step === 3 && (
                  <>
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
                        에 동의합니다. 서비스 이용을 위해 필요한 최소한의
                        개인정보를 수집하며, 동의를 거부할 권리가 있습니다.
                      </CheckboxLabel>
                    </CheckboxGroup>
                    {/* 3단계 오류 Toast: 다음/이전 버튼 위에 고정 */}
                    {errorMessageStep3 && (
                      <Toast type="error" style={{ margin: '24px 0 0 0' }}>
                        {errorMessageStep3}
                      </Toast>
                    )}
                    <Button
                      type="button"
                      onClick={() => handleStepClick(2)}
                      style={{ width: '100%', marginTop: 24 }}
                    >
                      이전
                    </Button>
                  </>
                )}
              </form>
            </FormSection>
            {toast && <Toast type={toast.type}>{toast.message}</Toast>}
            {/* 계정 만들기 버튼: 폼 바깥에 위치, 클릭 시 폼 submit */}
            {toast?.type !== 'success' && (
              <Button
                type="button"
                disabled={
                  !(
                    isPersonalInfoComplete &&
                    isLoginInfoComplete &&
                    agreeToTerms
                  ) || loading
                }
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={() => formRef.current?.requestSubmit()}
              >
                {loading ? '계정을 만드는 중...' : '계정 만들기'}
              </Button>
            )}
            <ToggleText
              role="button"
              tabIndex={-1}
              onClick={() => navigate('/login')}
            >
              이미 계정이 있으신가요?
            </ToggleText>
          </RightSection>
        </Card>
        <div
          style={{
            width: '100%',
            maxWidth: 1300,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          {/*<ToggleText>*/}
          {/*  이미 계정이 있으신가요?*/}
          {/*</ToggleText>*/}
          {/*<Button*/}
          {/*  variant="secondary"*/}
          {/*  type="button"*/}
          {/*  style={{ maxWidth: 540 }}*/}
          {/*  onClick={() => navigate('/login')}*/}
          {/*>*/}
          {/*  로그인하기*/}
          {/*</Button>*/}
        </div>
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
