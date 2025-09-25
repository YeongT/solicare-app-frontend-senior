import styled from 'styled-components';

export const DietWrapper = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const DietHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 24px 35px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
`;

export const PageTitle = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const AddMealForm = styled.form`
  background: ${({ theme }) => theme.colors.card};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    background: #fff;
  }
`;

export const Select = styled.select`
  padding: 14px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;

  @media (min-width: 768px) {
    min-width: 140px;
    width: auto;
    flex-shrink: 0;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 5px;

  @media (min-width: 768px) {
    width: auto;
    margin-top: 0;
    min-width: 100px;
    flex-shrink: 0;
  }

  &:hover {
    background: #1746a0;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const MealListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MealListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 16px;
`;

export const MealListTime = styled.span`
  color: #888;
  font-size: 14px;
  margin-right: 8px;
`;

export const MealListDesc = styled.span`
  flex: 1;
`;

export const MealDeleteButton = styled.button`
  background: none;
  border: none;
  color: #e57373;
  cursor: pointer;
  font-size: 16px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  padding: 30px 20px;
  font-size: 16px;
  line-height: 1.5;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;
