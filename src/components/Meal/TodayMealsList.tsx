import React from 'react';
import { getMealIcon } from '../../utils/mealUtils';

interface TodayMealsListProps {
  mealsList: Array<{
    timeSlot: string;
    hasRecord: boolean;
    statusText: string;
  }>;
}

const TodayMealsList: React.FC<TodayMealsListProps> = ({ mealsList }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px 0',
      }}
    >
      {mealsList.map((meal) => (
        <div
          key={meal.timeSlot}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '15px',
          }}
        >
          <span style={{ fontSize: '18px' }}>{getMealIcon(meal.timeSlot)}</span>
          <span style={{ fontWeight: 600, color: '#495057', minWidth: 36 }}>
            {meal.timeSlot}
          </span>
          <span
            style={{
              color: meal.hasRecord ? '#28a745' : '#ff4d4f',
              fontWeight: meal.hasRecord ? 500 : 700,
              fontSize: '14px',
              marginLeft: 'auto',
            }}
          >
            {meal.statusText}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodayMealsList;
