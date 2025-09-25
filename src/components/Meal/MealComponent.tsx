import React from 'react';
import {
  MealDeleteButton,
  MealListContainer,
  MealListDesc,
  MealListItem,
  MealListTime,
} from '../../styles/pages/MealPage.styles';
import { MealRecord } from '../../types/apiTypes';

interface MealComponentProps {
  meals: MealRecord[];
  onDelete: (id: string) => void;
}

const MealComponent: React.FC<MealComponentProps> = ({ meals, onDelete }) => {
  if (!meals.length)
    return <div>아직 식사 기록이 없어요! 오늘의 첫 식사를 기록해보세요.</div>;
  return (
    <MealListContainer>
      {meals.map((meal) => (
        <MealListItem key={meal.id}>
          <MealListTime>({meal.time})에 기록됨.</MealListTime>
          <MealListDesc>
            {meal.type} - {meal.description}
          </MealListDesc>
          <MealDeleteButton onClick={() => onDelete(meal.id)}>
            삭제
          </MealDeleteButton>
        </MealListItem>
      ))}
    </MealListContainer>
  );
};

export default MealComponent;
