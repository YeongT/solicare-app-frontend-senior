import { useCallback } from 'react';
import { MealRecord } from '../types/apiTypes';

const STORAGE_KEY = 'mealRecords';

function getToday(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function loadRecords(): Record<string, MealRecord[]> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveRecords(records: Record<string, MealRecord[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useMeal() {
  // 오늘 날짜
  const today = getToday();

  // 오늘 식사 기록 불러오기
  const getTodayMeals = useCallback((): MealRecord[] => {
    const records = loadRecords();
    return records[today] || [];
  }, [today]);

  // 식사 기록 추가
  const addMeal = useCallback(
    (meal: Omit<MealRecord, 'id' | 'date'>) => {
      const records = loadRecords();
      const newMeal: MealRecord = {
        ...meal,
        id: Math.random().toString(36).slice(2),
        date: today,
      };
      records[today] = [...(records[today] || []), newMeal];
      saveRecords(records);
    },
    [today]
  );

  // 식사 기록 삭제
  const removeMeal = useCallback(
    (id: string) => {
      const records = loadRecords();
      if (!records[today]) return;
      records[today] = records[today].filter((m) => m.id !== id);
      saveRecords(records);
    },
    [today]
  );

  // 오늘 식사 기록 현황 (type별, 간식 제외)
  const getTodayMealStatus = useCallback(() => {
    const records = loadRecords();
    const todayMeals = records[today] || [];
    const types = ['아침', '점심', '저녁'] as const;
    return types.map((type) => {
      const meal = todayMeals.find((m) => m.type === type);
      return {
        type,
        recorded: !!meal,
        time: meal?.time || null,
        description: meal?.description || null,
        id: meal?.id || null,
      };
    });
  }, [today]);

  return { getTodayMeals, addMeal, removeMeal, getTodayMealStatus };
}
