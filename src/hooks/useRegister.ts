import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupApi } from '../utils/authApi';
import { SignupRequest } from '../types/apiTypes';
import { setAuthData } from '../contexts/AuthContext';
import {
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateUserId,
} from '../utils/validationUtils';

export function useRegister() {
  const [formData, setFormData] = useState<SignupRequest>({
    userId: '',
    password: '',
    name: '',
    gender: '',
    age: '',
    phoneNumber: '',
    address: '',
    note: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab] = useState<'personal' | 'login'>('personal');
  const [step, setStep] = useState(1);
  const [visitedStep, setVisitedStep] = useState<number[]>([1]);
  const [signupFailed, setSignupFailed] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 유효성 검사 관련 상태들
  const [errorsStep1, setErrorsStep1] = useState<{
    [key: string]: string;
  }>({});
  const [errorsStep2, setErrorsStep2] = useState<{
    [key: string]: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  // useFormValidation에서 통합된 유효성 검사 함수들
  // 1단계 전체 검사
  function validateStep1All() {
    const errors: { [key: string]: string } = {};
    errors.userId = validateUserId(formData.userId) || '';
    errors.password = validatePassword(formData.password) || '';
    errors.passwordConfirm =
      validatePasswordConfirm(formData.password, passwordConfirm) || '';
    return errors;
  }

  // 2단계 전체 검사
  function validateStep2All() {
    const errors: { [key: string]: string } = {};
    errors.name = !formData.name ? '이름을 입력하세요' : '';
    errors.age = !formData.age ? '나이를 입력하세요' : '';
    errors.gender = !formData.gender ? '성별을 선택하세요' : '';
    errors.phoneNumber = validatePhone(formData.phoneNumber) || '';
    errors.address = !formData.address ? '주소를 입력하세요' : '';
    return errors;
  }

  // 3단계 검사
  function validateStep3(agree: boolean) {
    return agree ? null : '약관 동의가 필요합니다';
  }

  // 입력값 변경에 따른 유효성 검사
  useEffect(() => {
    setErrorsStep1(validateStep1All());
  }, [formData.userId, formData.password, passwordConfirm]);

  useEffect(() => {
    setErrorsStep2(validateStep2All());
  }, [
    formData.name,
    formData.gender,
    formData.age,
    formData.phoneNumber,
    formData.address,
  ]);

  // 에러 메시지 업데이트
  useEffect(() => {
    if (step === 1) {
      const firstError = Object.values(errorsStep1).find((e) => e);
      setErrorMessage(firstError || '');
    } else if (step === 2) {
      const firstError = Object.values(errorsStep2).find((e) => e);
      setErrorMessage(firstError || '');
    } else if (step === 3) {
      const error = validateStep3(agreeToTerms);
      setErrorMessage(error || '');
    }
  }, [errorsStep1, errorsStep2, step, agreeToTerms]);

  // 입력값 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 회원가입 실패 후 입력값 변경 시 경고 상태 초기화
    if (signupFailed) {
      setSignupFailed(false);
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);

    // 회원가입 실패 후 비밀번호 확인 변경 시 경고 상태 초기화
    if (signupFailed) {
      setSignupFailed(false);
    }
  };

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 필수 필드 검사
    const requiredFields = [
      { field: 'userId', label: '아이디' },
      { field: 'password', label: '비밀번호' },
      { field: 'name', label: '이름' },
      { field: 'age', label: '나이' },
      { field: 'gender', label: '성별' },
      { field: 'phoneNumber', label: '전화번호' },
      { field: 'address', label: '주소' },
    ];

    // 빈 필드 체크
    const emptyFields = requiredFields.filter(
      ({ field }) => !formData[field as keyof SignupRequest]
    );
    if (emptyFields.length > 0) {
      const missingField = emptyFields[0].label;
      const missingFieldName = emptyFields[0].field;
      showToast(`${missingField}를 입력해주세요`, 'error');
      // 비어있는 필드가 속한 스텝으로 이동
      if (missingFieldName === 'userId' || missingFieldName === 'password') {
        setStep(1);
      } else {
        setStep(2);
      }
      setLoading(false);
      return;
    }

    // 비밀번호 확인 검사
    if (formData.password !== passwordConfirm) {
      showToast('비밀번호가 일치하지 않습니다', 'error');
      setStep(1);
      setLoading(false);
      return;
    }

    // 약관 동의 검사
    if (!agreeToTerms) {
      showToast('개인정보 처리방침에 동의해주세요', 'error');
      setLoading(false);
      return;
    }

    try {
      const res = await signupApi(formData);
      if (res.success && res.profile && res.token) {
        setAuthData(res.token, res.profile);
        showToast('회원가입 성공!', 'success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1200);
      } else {
        showToast(res.message || '회원가입 실패', 'error');
        setSignupFailed(true); // 실패 시 상태 변경
        // 토스트가 사라진 후 1단계로 이동
        setTimeout(() => {
          setStep(1);
        }, 3000);
      }
    } catch {
      showToast('회원가입 중 오류가 발생했습니다', 'error');
      setSignupFailed(true); // 실패 시 상태 변경
      // 토스트가 사라진 후 1단계로 이동
      setTimeout(() => {
        setStep(1);
      }, 3000);
    }
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 단계 이동 함수
  const handleStepClick = (s: number) => {
    // 다른 단계로 이동할 때 경고 상태 초기화
    if (signupFailed) {
      setSignupFailed(false);
    }
    setStep(s);
    if (!visitedStep.includes(s)) {
      setVisitedStep([...visitedStep, s]);
    }
  };

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      // 그대로 사용
    } else if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    setFormData({ ...formData, phoneNumber: value });
  };

  // 다음 단계로 이동 함수 (RegisterPage에서 이동)
  const handleNextStep = () => {
    if (step === 1) {
      const errors = validateStep1All();
      if (Object.values(errors).some((e) => e)) {
        // 유효성 검사 실패 시 오류 상태로 설정
        return;
      }
      // 1단계 유효성 검사 통과 시 경고 상태 초기화
      if (signupFailed) {
        setSignupFailed(false);
      }
      setStep(2);
    } else if (step === 2) {
      const errors = validateStep2All();
      if (Object.values(errors).some((e) => e)) {
        // 유효성 검사 실패 시 오류 상태로 설정
        return;
      }
      // 2단계 유효성 검사 통과 시 경고 상태 초기화
      if (signupFailed) {
        setSignupFailed(false);
      }
      setStep(3);
    }
  };

  // 단계별 상태를 결정하는 함수 (RegisterPage에서 이동)
  const getStepStatus = (stepNumber: number) => {
    if (step === stepNumber) {
      return 'active';
    }

    // 회원가입 실패 시 1, 2단계를 warning으로 표시
    if (signupFailed && (stepNumber === 1 || stepNumber === 2)) {
      return 'warning';
    }

    // 기존 로직 유지
    if (stepNumber === 1) {
      return Object.values(errorsStep1).every((e) => !e) &&
        formData.userId &&
        formData.password &&
        passwordConfirm
        ? 'completed'
        : Object.values(errorsStep1).some((e) => e) &&
            (formData.userId || formData.password || passwordConfirm)
          ? 'error'
          : 'incomplete';
    } else if (stepNumber === 2) {
      return Object.values(errorsStep2).every((e) => !e) &&
        formData.name &&
        formData.gender &&
        formData.age &&
        formData.phoneNumber &&
        formData.address
        ? 'completed'
        : Object.values(errorsStep2).some((e) => e) &&
            (formData.name ||
              formData.gender ||
              formData.age ||
              formData.phoneNumber ||
              formData.address)
          ? 'error'
          : 'incomplete';
    } else if (stepNumber === 3) {
      return agreeToTerms ? 'completed' : 'incomplete';
    }

    return 'incomplete';
  };

  return {
    formData,
    setFormData,
    passwordConfirm,
    setPasswordConfirm,
    isNotesExpanded,
    setIsNotesExpanded,
    agreeToTerms,
    setAgreeToTerms,
    toast: toast,
    setToast,
    loading,
    setLoading,
    activeTab,
    step,
    setStep,
    visitedStep,
    setVisitedStep,
    signupFailed,
    navigate,
    formRef,
    toastTimerRef,
    handleInputChange,
    handlePasswordConfirmChange,
    handleSignup,
    showToast,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleStepClick,
    handlePhoneChange,
    handleNextStep,
    // 새로 추가된 값들
    errorsStep1,
    errorsStep2,
    errorMessage,
    getStepStatus,
  };
}
