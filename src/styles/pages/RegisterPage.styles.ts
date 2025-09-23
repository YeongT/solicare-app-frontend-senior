import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 32px 20px;
  overflow-y: auto;

  @media (max-width: 1140px) {
    align-items: flex-start;
    padding: 24px 16px;
    height: auto;
    min-height: 100vh;
  }

  @media (max-width: 600px) {
    padding: 12px 8px;
    align-items: flex-start;
    height: auto;
    min-height: 100vh;
  }
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  max-width: 1100px;
  width: 100%;
  height: 790px;
  overflow: hidden;

  @media (max-width: 1140px) {
    width: 100%;
    max-width: 650px;
    grid-template-columns: 1fr;
    min-height: auto;
    height: auto;
    border-radius: 12px;
    margin: 0 auto;
    box-shadow: ${({ theme }) => theme.boxShadow.card};
    padding: 0;
  }

  @media (max-width: 600px) {
    max-width: 100vw;
    border-radius: 16px;
    box-shadow: none;
    padding: 0 4px;
    min-height: auto;
  }
`;

export const LeftSection = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  padding: 40px 48px 32px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  border-radius: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.05'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e");
  }

  @media (max-width: 1140px) {
    padding: 32px 24px 24px 24px;
    border-radius: 12px;
    text-align: center;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;

  @media (max-width: 1140px) {
    font-size: 2.25rem;
    margin-bottom: 16px;
  }

  @media (max-width: 600px) {
    font-size: 1.35rem;
    margin-bottom: 10px;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;

  @media (max-width: 1140px) {
    font-size: 1.125rem;
    margin-bottom: 32px;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    margin-bottom: 16px;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 1140px) {
    display: none;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 1.0625rem;
  opacity: 0.92;
  font-weight: 400;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '✓';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    margin-right: 16px;
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
  }

  @media (max-width: 1140px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`;

export const RightSection = styled.div`
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* Card 높이에 맞춤 */
  overflow-y: auto;

  @media (max-width: 1140px) {
    padding: 24px 32px;
    justify-content: flex-start;
    height: auto;
    min-height: auto;
  }

  @media (max-width: 600px) {
    padding: 20px 16px;
    justify-content: flex-start;
    height: auto;
  }
`;

export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: -0.02em;

  @media (max-width: 1140px) {
    font-size: 1.75rem;
    margin-bottom: 10px;
  }

  @media (max-width: 600px) {
    font-size: 1.15rem;
    margin-bottom: 6px;
  }
`;

export const PageSubtitle = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 1140px) {
    font-size: 1rem;
    margin-bottom: 32px;
  }

  @media (max-width: 600px) {
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
`;

export const Toast = styled.div<{ type?: 'error' | 'success' }>`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  background: ${({ theme, type }) =>
    type === 'error' ? theme.colors.error : theme.colors.success};
  color: white;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  box-shadow: ${({ theme }) => theme.boxShadow.card};
  font-size: ${({ theme }) => theme.font.body};
  font-weight: 500;
  text-align: center;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const FullWidthGroup = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 6px; /* gap 줄임 */
`;

export const FormLabel = styled.label`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
  letter-spacing: -0.01em;
`;

export const Input = styled.input`
  padding: 16px 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  font-weight: 400;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
  }
`;

export const Select = styled.select`
  padding: 16px 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.2s ease;
  font-weight: 400;
  line-height: 1.5;
  height: auto;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }
`;

export const OptionalSection = styled.div`
  grid-column: 1 / -1;
  margin-top: 8px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.cardGradient};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const OptionalToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToggleIcon = styled.span<{ isExpanded?: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${({ isExpanded }) => (isExpanded ? 180 : 0)}deg);
  font-size: 1.125rem;
`;

export const CollapsibleContent = styled.div`
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 16px 18px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  font-weight: 400;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
    font-weight: 400;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.cardGradient};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  flex-shrink: 0;
  margin: 2px 0 0;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  cursor: pointer;
  font-weight: 400;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Button = styled.button<{ variant?: 'secondary' }>`
  width: 100%;
  min-width: 140px;
  padding: 16px 24px;
  background: ${({ variant, theme }) =>
    variant === 'secondary' ? 'transparent' : theme.colors.primary};
  color: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.colors.primary : 'white'};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
  white-space: nowrap;

  &:hover {
    background: ${({ variant, theme }) =>
      variant === 'secondary' ? theme.colors.primary : theme.colors.secondary};
    color: white;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.button};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 600px) {
    min-width: 80px;
    font-size: 0.92rem;
    padding: 10px 6px;
    margin-bottom: 10px;
  }
`;

export const ToggleText = styled.div`
  text-align: center;
  margin: 20px 0 16px 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 400;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 10px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 1px;
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const FormSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 0 18px;
  box-sizing: border-box;
  margin: 0 auto;
  max-height: 660px; /* Card 높이 - padding 값에 맞춤 */
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1140px) {
    max-width: 100%;
    padding: 0;
    max-height: none;
  }

  @media (max-width: 600px) {
    max-width: 100vw;
    padding: 0 4px;
    margin: 0;
  }
`;
