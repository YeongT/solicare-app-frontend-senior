import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockMedications, mockNotifications } from '../data/mockData';
import {
  generateMealAlerts,
  getEnglishTimeSlot,
  mealIcons,
  MealStatus,
} from '../utils/mealUtils';
import { useMeal } from './useMeal';

// Type definitions
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

export interface MedicationStats {
  total: number;
  taken: number;
  percentage: number;
}

export interface ExerciseStats {
  count: number;
  duration: number;
}

/**
 * Custom hook for dashboard functionality
 * Provides all business logic and data needed for the Dashboard
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, loading, logout } = useAuth();
  const { getTodayMealStatus } = useMeal();

  // State management
  const [medications] = useState<Medication[]>(() => {
    const savedMedications = localStorage.getItem('medications');
    return savedMedications ? JSON.parse(savedMedications) : mockMedications;
  });

  const [mealStatus, setMealStatus] = useState<MealStatus[]>(() =>
    getTodayMealStatus()
  );

  // Authentication check
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  // Sync meal status when localStorage changes
  useEffect(() => {
    const syncMeals = () => setMealStatus(getTodayMealStatus());
    window.addEventListener('storage', syncMeals);
    setMealStatus(getTodayMealStatus());
    return () => window.removeEventListener('storage', syncMeals);
  }, [getTodayMealStatus]);

  /**
   * Generates notifications to display on the dashboard
   * Combines medication reminders with general notifications and meal alerts
   */
  const generateAllNotifications = (): NotificationItemType[] => {
    const now = new Date();
    const currentHour = now.getHours();
    const medicationNotifications: NotificationItemType[] = [];

    // Generate medication notifications
    medications.forEach((med: Medication) => {
      if (med.timeSlots && med.timeSlots.length > 0) {
        med.timeSlots.forEach((timeSlot) => {
          const [hour] = timeSlot.split(':').map(Number);

          // Overdue medication
          if (currentHour >= hour && !med.taken) {
            medicationNotifications.push({
              id: `med-${med.id}-${timeSlot}`,
              title: `💊 ${med.name} 복용 시간`,
              message: `${timeSlot}에 복용 예정이었습니다. 놓치지 마세요!`,
              time: `${Math.abs(currentHour - hour)}시간 전`,
              type: 'medication-overdue',
            });
          }
          // Upcoming medication
          else if (hour - currentHour <= 1 && hour - currentHour > 0) {
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

    // Generate meal alerts using the utility function
    const mealAlerts: NotificationItemType[] = generateMealAlerts(mealStatus);

    // Get general notifications
    const generalNotifications: NotificationItemType[] = mockNotifications
      .filter((notification) => notification.type !== 'medication')
      .map((notification) => ({
        id: String(notification.id),
        title: notification.title,
        message: notification.message,
        time: notification.time,
        type: notification.type,
      }));

    // Combine and limit the number of notifications
    return [
      ...mealAlerts,
      ...medicationNotifications,
      ...generalNotifications,
    ].slice(0, 5);
  };

  /**
   * Get meal status with icons for rendering
   */
  const getMealStatusWithIcons = () => {
    return mealStatus.map((m) => ({
      ...m,
      icon: mealIcons[getEnglishTimeSlot(m.type)] || '🍽️',
    }));
  };

  /**
   * Navigation handlers
   */
  const handleNavigateToPage = (path: string) => {
    navigate(path);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Get today's exercise statistics
   */
  const getTodayExerciseStats = (): ExerciseStats => {
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

  /**
   * Get today's medication statistics
   */
  const getTodayMedicationStats = (): MedicationStats => {
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
    // State
    isAuthenticated,
    profile,
    loading,
    medications,
    mealStatus: getMealStatusWithIcons(),

    // Functions
    generateAllNotifications,
    handleNavigateToPage,
    handleGoHome,
    handleLogout,
    getTodayExerciseStats,
    getTodayMedicationStats,
  };
};
