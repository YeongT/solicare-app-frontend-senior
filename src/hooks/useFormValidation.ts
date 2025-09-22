import { useState } from 'react';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validatePhone,
  validateUserId,
} from '../utils/validationUtils';
import { SignupRequest } from '../types/apiTypes';

export function useRegisterValidation(formData: SignupRequest) {
  const [errorMessageStep1, setErrorMessageStep1] = useState<string | null>(
    null
  );
  const [errorMessageStep2, setErrorMessageStep2] = useState<string | null>(
    null
  );
  const [errorMessageStep3, setErrorMessageStep3] = useState<string | null>(
    null
  );
  // 1단계
  function validateStep1(name: string, value: string) {
    let error = null;
    if (name === 'userId') error = validateUserId(value);
    else if (name === 'email') error = validateEmail(value);
    else if (name === 'password') error = validatePassword(value);
    else if (name === 'passwordConfirm')
      error = validatePasswordConfirm(formData.password, value);
    setErrorMessageStep1(error);
  }
  // 2단계
  function validateStep2(name: string, value: string) {
    if (name === 'phoneNumber') {
      setErrorMessageStep2(validatePhone(value));
    }
  }
  // 3단계: 약관 동의
  function validateStep3(agree: boolean) {
    setErrorMessageStep3(agree ? null : '약관 동의가 필요합니다');
  }
  return {
    errorMessageStep1,
    errorMessageStep2,
    errorMessageStep3,
    validateStep1,
    validateStep2,
    validateStep3,
    setErrorMessageStep1,
    setErrorMessageStep2,
    setErrorMessageStep3,
  };
}
