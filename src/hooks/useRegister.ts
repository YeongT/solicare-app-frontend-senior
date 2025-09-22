import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupApi } from '../utils/authApi';
import { SignupRequest } from '../types/apiTypes';
import { setAuthData } from '../contexts/AuthContext';
import { useRegisterValidation } from './useFormValidation';

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
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    errorMessageStep1,
    errorMessageStep2,
    errorMessageStep3,
    validateStep1,
    validateStep2,
  } = useRegisterValidation(formData);

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
    if (step === 1) validateStep1(name, value);
    if (step === 2) validateStep2(name, value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    if (step === 1) validateStep1('passwordConfirm', e.target.value);
  };

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }

  const handleStepChange = (s: number) => {
    setStep(s);
    if (!visitedStep.includes(s)) {
      setVisitedStep([...visitedStep, s]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!agreeToTerms) {
      showToast('개인정보 처리방침에 동의해주세요', 'error');
      setLoading(false);
      return;
    }
    if (formData.password !== passwordConfirm) {
      showToast('비밀번호가 일치하지 않습니다', 'error');
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
        showToast('회원가입 실패', 'error');
      }
    } catch {
      showToast('회원가입 중 오류가 발생했습니다', 'error');
    }
    setLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 단계별 입력 완료 여부
  const isLoginInfoComplete =
    formData.userId &&
    formData.password &&
    passwordConfirm &&
    formData.password === passwordConfirm;
  const isPersonalInfoComplete =
    formData.name &&
    formData.gender &&
    formData.age &&
    formData.phoneNumber &&
    formData.address;

  // 단계 이동 함수
  const handleStepClick = (s: number) => {
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

  return {
    formData,
    setFormData,
    passwordConfirm,
    setPasswordConfirm,
    isNotesExpanded,
    setIsNotesExpanded,
    agreeToTerms,
    setAgreeToTerms,
    toast,
    setToast,
    loading,
    setLoading,
    activeTab,
    step,
    setStep,
    visitedStep,
    setVisitedStep,
    navigate,
    formRef,
    toastTimerRef,
    errorMessageStep1,
    errorMessageStep2,
    errorMessageStep3,
    handleInputChange,
    handlePasswordConfirmChange,
    handleSignup,
    showToast,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    isLoginInfoComplete,
    isPersonalInfoComplete,
    handleStepClick,
    handlePhoneChange,
    handleStepChange,
  };
}
