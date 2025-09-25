import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeal } from '../hooks/useMeal';
import { MealRecord } from '../types/apiTypes';
import { NavButton } from '../components/StyledComponents';
import {
  AddButton,
  AddMealForm,
  DietHeader,
  DietWrapper,
  EmptyMessage,
  FormRow,
  Input,
  PageTitle,
  Select,
} from '../styles/pages/MealPage.styles';
import MealComponent from '../components/Meal/MealComponent';

const mealTypes = ['아침', '점심', '저녁', '간식'] as const;

const MealPage: React.FC = () => {
  const navigate = useNavigate();
  const { getTodayMeals, addMeal, removeMeal } = useMeal();
  const [type, setType] = useState<(typeof mealTypes)[number]>('아침');
  const [description, setDescription] = useState('');
  const [meals, setMeals] = useState<MealRecord[]>(getTodayMeals());

  // localStorage 변경 시 갱신
  React.useEffect(() => {
    const syncMeals = () => setMeals(getTodayMeals());
    window.addEventListener('storage', syncMeals);
    return () => window.removeEventListener('storage', syncMeals);
  }, [getTodayMeals]);

  // 추가/삭제 후 갱신
  React.useEffect(() => {
    setMeals(getTodayMeals());
  }, [getTodayMeals]);

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    const now = new Date();
    const time = now.toTimeString().slice(0, 5); // HH:mm
    addMeal({ type, description, time });
    setDescription('');
    setType('아침');
    // meals 상태를 addMeal 직후에 getTodayMeals()로 즉시 갱신하지 않고,
    // useEffect(() => setMeals(getTodayMeals()), [getTodayMeals, description])로 최신화
  };

  React.useEffect(() => {
    setMeals(getTodayMeals());
  }, [getTodayMeals, description]);

  const handleDelete = (id: string) => {
    removeMeal(id);
    setMeals(getTodayMeals());
  };

  return (
    <DietWrapper>
      <DietHeader>
        <PageTitle>🍽️ 오늘의 식사 기록</PageTitle>
        <NavButton onClick={() => navigate(-1)}>뒤로가기</NavButton>
      </DietHeader>
      <AddMealForm onSubmit={handleAddMeal}>
        <FormRow>
          <Select
            value={type}
            onChange={(e) =>
              setType(e.target.value as (typeof mealTypes)[number])
            }
          >
            {mealTypes.map((mt) => (
              <option key={mt} value={mt}>
                {mt}
              </option>
            ))}
          </Select>
          <Input
            type="text"
            placeholder="오늘 먹은 음식을 입력해 주세요! 예: 닭가슴살 샐러드"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={50}
            required
          />
          <AddButton type="submit">기록 추가</AddButton>
        </FormRow>
      </AddMealForm>
      {meals.length === 0 ? (
        <EmptyMessage>
          아직 식사 기록이 없어요! 오늘의 첫 식사를 기록해보세요.
        </EmptyMessage>
      ) : (
        <MealComponent meals={meals} onDelete={handleDelete} />
      )}
    </DietWrapper>
  );
};

export default MealPage;
