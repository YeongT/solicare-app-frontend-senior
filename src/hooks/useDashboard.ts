import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockMedications, mockNotifications } from '../data/mockData';

export interface NotificationItemType {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
}

export interface Medication {
  id: number;
  name: string;
  description: string;
  dailyDosage: string;
  memo: string;
  daysOfWeek: string[];
  timeSlots: string[];
  taken: boolean;
  time?: string;
  dosage?: string;
}

export interface ExerciseRecord {
  id: string;
  date: string;
  duration: number;
  type: string;
}

export const useDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, loading, logout } = useAuth();

  const [medications] = useState<Medication[]>(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : mockMedications;
  });

  // 인증 확인
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  // 모든 알림 생성
  const generateAllNotifications = (): NotificationItemType[] => {
    const now = new Date();
    const currentHour = now.getHours();
    const medicationNotifications: NotificationItemType[] = [];

    medications.forEach((med: Medication) => {
      if (med.timeSlots && med.timeSlots.length > 0) {
        med.timeSlots.forEach((timeSlot) => {
          const [hour] = timeSlot.split(':').map(Number);

          if (currentHour >= hour && !med.taken) {
            medicationNotifications.push({
              id: `med-${med.id}-${timeSlot}`,
              title: `💊 ${med.name} 복용 시간`,
              message: `${timeSlot}에 복용 예정이었습니다. 놓치지 마세요!`,
              time: `${Math.abs(currentHour - hour)}시간 전`,
              type: 'medication-overdue',
            });
          } else if (hour - currentHour <= 1 && hour - currentHour > 0) {
            medicationNotifications.push({
              id: `med-${med.id}-${timeSlot}`,
              title: `⏰ ${med.name} 복용 예정`,
              message: `${timeSlot}에 복용 예정입니다. 준비해주세요.`,
              time: `${hour - currentHour}시간 후`,
              type: 'medication-upcoming',
            });
          }
        });
      }
    });

    const generalNotifications: NotificationItemType[] = mockNotifications
      .filter((notification) => notification.type !== 'medication')
      .map((notification) => ({
        id: String(notification.id),
        title: notification.title,
        message: notification.message,
        time: notification.time,
        type: notification.type,
      }));

    return [...medicationNotifications, ...generalNotifications].slice(0, 5);
  };

  // 페이지 네비게이션
  const handleNavigateToPage = (path: string) => {
    navigate(path);
  };

  // 홈으로 이동
  const handleGoHome = () => {
    navigate('/');
  };

  // 로그아웃
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 오늘의 운동 통계
  const getTodayExerciseStats = () => {
    const savedExercises = localStorage.getItem('exercises');
    if (!savedExercises) return { count: 0, duration: 0 };

    const exercises: ExerciseRecord[] = JSON.parse(savedExercises);
    const today = new Date().toISOString().split('T')[0];

    const todayExercises = exercises.filter(
      (exercise: ExerciseRecord) => exercise.date === today
    );

    const totalDuration = todayExercises.reduce(
      (sum: number, exercise: ExerciseRecord) => sum + (exercise.duration || 0),
      0
    );

    return {
      count: todayExercises.length,
      duration: totalDuration,
    };
  };

  // 오늘의 약물 복용 통계
  const getTodayMedicationStats = () => {
    const totalMedications = medications.length;
    const takenMedications = medications.filter(
      (med: Medication) => med.taken
    ).length;

    return {
      total: totalMedications,
      taken: takenMedications,
      percentage:
        totalMedications > 0
          ? Math.round((takenMedications / totalMedications) * 100)
          : 0,
    };
  };

  return {
    // 상태
    isAuthenticated,
    profile,
    loading,
    medications,

    // 함수
    generateAllNotifications,
    handleNavigateToPage,
    handleGoHome,
    handleLogout,
    getTodayExerciseStats,
    getTodayMedicationStats,
  };
};
