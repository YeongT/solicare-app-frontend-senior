import { useEffect, useState } from 'react';

export interface MealRecord {
  id: number;
  name: string;
  time: string;
  date: string;
}

export const useTodayMeals = () => {
  const [todayMeals, setTodayMeals] = useState<MealRecord[]>([]);

  useEffect(() => {
    const loadTodayMeals = () => {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        const meals = JSON.parse(savedMeals);
        const today = new Date().toISOString().split('T')[0];
        const todayMealsList = meals.filter(
          (meal: MealRecord) => meal.date === today
        );
        setTodayMeals(todayMealsList);
      }
    };

    loadTodayMeals();

    const handleStorageChange = () => {
      loadTodayMeals();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadTodayMeals);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadTodayMeals);
    };
  }, []);

  const getMealStatusDisplay = () => {
    const timeSlots = [
      { name: '아침', startHour: 6, endHour: 12 },
      { name: '점심', startHour: 12, endHour: 17 },
      { name: '저녁', startHour: 17, endHour: 23 },
    ];

    return timeSlots.map((timeSlot) => {
      const mealsInTimeSlot = todayMeals.filter((meal) => {
        const mealHour = parseInt(meal.time.split(':')[0]);
        return mealHour >= timeSlot.startHour && mealHour < timeSlot.endHour;
      });

      const recordCount = mealsInTimeSlot.length;
      let statusText;

      if (recordCount === 0) {
        statusText = '기록되지 않음';
      } else {
        const latestMeal = mealsInTimeSlot[mealsInTimeSlot.length - 1];
        statusText = `${latestMeal.time}에 기록됨`;
      }

      return {
        timeSlot: timeSlot.name,
        recordCount,
        statusText,
        hasRecord: recordCount > 0,
      };
    });
  };

  return {
    todayMeals,
    getMealStatusDisplay,
  };
};
