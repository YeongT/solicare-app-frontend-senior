import styled from 'styled-components';

export const ChatWrapper = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
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
`;

export const ChatContainer = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  padding: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 350px);
  max-height: 500px;
`;

export const MessageBubble = styled.div<{ type: 'user' | 'ai' }>`
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  line-height: 1.4;
  font-size: 16px;
  background-color: ${(props) =>
    props.type === 'user' ? props.theme.colors.primary : '#e9ecef'};
  color: ${(props) =>
    props.type === 'user' ? 'white' : props.theme.colors.text};
  align-self: ${(props) => (props.type === 'user' ? 'flex-end' : 'flex-start')};
  border-bottom-right-radius: ${(props) =>
    props.type === 'user' ? '5px' : '20px'};
  border-bottom-left-radius: ${(props) =>
    props.type === 'user' ? '20px' : '5px'};
`;

export const MessageText = styled.div`
  margin-bottom: 5px;
`;

export const Timestamp = styled.div`
  font-size: 12px;
  opacity: 0.7;
  text-align: right;
  margin-top: 5px;
`;

export const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: 15px 20px;
  border-radius: 20px;
  background-color: #e9ecef;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-bottom: 15px;
`;

export const InputArea = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 15px 20px;
  margin-bottom: 20px;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    background: #fff;
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(-1px);
  }
  &:disabled {
    background-color: #e9ecef;
    color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

export const VoiceButton = styled.button<{ $isListening?: boolean }>`
  padding: 12px;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-color: ${(props) => (props.$isListening ? '#ff4757' : '#87ceeb')};
  color: white;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  animation: ${(props) =>
    props.$isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'};
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  &:hover {
    background-color: ${(props) =>
      props.$isListening ? '#ff3742' : '#00bfff'};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;

export const QuickQuestionCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const QuickQuestionTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
`;

export const QuickQuestionButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  background-color: rgba(37, 99, 235, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
  margin-right: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
`;
