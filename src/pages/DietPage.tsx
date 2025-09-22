import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavButton } from '../components/StyledComponents';
import {
  AddButton,
  AddMealForm,
  DeleteButton,
  DietHeader,
  DietWrapper,
  EmptyMessage,
  FormRow,
  Input,
  MealInfo,
  MealItem,
  MealList,
  MealName,
  MealTime,
  PageTitle,
  Select,
} from '../styles/pages/DietPage.styles';

interface MealRecord {
  id: number;
  name: string;
  time: string;
  date: string;
}

const DietPage: React.FC = () => {
  const navigate = useNavigate();

  const [meals, setMeals] = useState<MealRecord[]>(() => {
    const savedMeals = localStorage.getItem('meals');
    return savedMeals
      ? JSON.parse(savedMeals)
      : [
          {
            id: 1,
            name: '아침: 계란후라이, 토스트',
            time: '08:00',
            date: '2024-09-14',
          },
          {
            id: 2,
            name: '점심: 김치찌개, 밥',
            time: '12:30',
            date: '2024-09-14',
          },
          {
            id: 3,
            name: '저녁: 연어구이, 샐러드',
            time: '18:00',
            date: '2024-09-14',
          },
        ];
  });

  React.useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const [newMealName, setNewMealName] = useState('');
  const [newMealTime, setNewMealTime] = useState('breakfast');

  const addMeal = () => {
    if (newMealName.trim()) {
      const now = new Date();
      const timeLabels = {
        breakfast: '08:00',
        lunch: '12:00',
        dinner: '18:00',
        snack: '15:00',
      } as const;

      const mealTypeLabels = {
        breakfast: '아침',
        lunch: '점심',
        dinner: '저녁',
        snack: '간식',
      } as const;

      const newMeal: MealRecord = {
        id: Date.now(),
        name: `${mealTypeLabels[newMealTime as keyof typeof mealTypeLabels]}: ${newMealName}`,
        time: timeLabels[newMealTime as keyof typeof timeLabels],
        date: now.toISOString().split('T')[0],
      };

      setMeals([...meals, newMeal]);
      setNewMealName('');
    }
  };

  const deleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addMeal();
    }
  };

  return (
    <DietWrapper>
      <DietHeader>
        <PageTitle>🍽️ 식사 기록</PageTitle>
        <NavButton onClick={() => navigate('/dashboard')}>
          대시보드 메인
        </NavButton>
      </DietHeader>

      <AddMealForm>
        <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>새 식사 추가</h3>
        <FormRow>
          <Select
            value={newMealTime}
            onChange={(e) => setNewMealTime(e.target.value)}
          >
            <option value="breakfast">아침</option>
            <option value="lunch">점심</option>
            <option value="dinner">저녁</option>
            <option value="snack">간식</option>
          </Select>
          <Input
            type="text"
            placeholder="식사 내용을 입력하세요 (예: 김치찌개, 밥)"
            value={newMealName}
            onChange={(e) => setNewMealName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <AddButton onClick={addMeal}>추가</AddButton>
        </FormRow>
      </AddMealForm>

      <MealList>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>
          오늘의 식사 목록
        </h3>
        {meals.length === 0 ? (
          <EmptyMessage>
            아직 기록된 식사가 없습니다. 첫 식사를 추가해보세요!
          </EmptyMessage>
        ) : (
          meals.map((meal) => (
            <MealItem key={meal.id}>
              <MealInfo>
                <MealName>{meal.name}</MealName>
                <MealTime>{meal.time}</MealTime>
              </MealInfo>
              <DeleteButton onClick={() => deleteMeal(meal.id)}>
                삭제
              </DeleteButton>
            </MealItem>
          ))
        )}
      </MealList>
    </DietWrapper>
  );
};

export default DietPage;
