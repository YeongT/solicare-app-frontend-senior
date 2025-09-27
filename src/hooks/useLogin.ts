import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../utils/authApi';
import { SignupRequest } from '../types/apiTypes';
import { setAuthData, useAuth } from '../contexts/AuthContext';

export function useLogin() {
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
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
      if (type === 'error') {
        setShowLoginButton(true);
      }
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowLoginButton(false);
    try {
      const res = await loginApi({
        userId: formData.userId,
        password: formData.password,
      });
      if (res.success && res.profile && res.token) {
        setAuthData(res.token, res.profile);
        showToast('로그인 성공! 대시보드로 이동합니다.', 'success');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1200);
      } else {
        showToast(res.message || '로그인 실패', 'error');
      }
    } catch {
      showToast('로그인 중 오류가 발생했습니다', 'error');
    }
    setLoading(false);
  };

  // 홈 페이지로 이동하는 함수 추가
  const goToHome = () => {
    navigate('/');
  };

  // 회원가입 페이지로 이동하는 함수 추가
  const goToRegister = () => {
    navigate('/register');
  };

  return {
    formData,
    setFormData,
    toast,
    loading,
    showLoginButton,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleLogin,
    navigate,
    isAuthenticated,
    authLoading,
    goToHome,
    goToRegister,
  };
}
