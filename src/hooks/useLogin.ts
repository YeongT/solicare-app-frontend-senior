import { useEffect, useState } from 'react';
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
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

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
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        showToast('로그인 실패', 'error');
      }
    } catch {
      showToast('로그인 중 오류가 발생했습니다', 'error');
    }
    setLoading(false);
  };

  return {
    formData,
    setFormData,
    toast,
    loading,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleLogin,
  };
}
