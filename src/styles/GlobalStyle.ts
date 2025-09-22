import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
  }
  
  body {
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Noto Sans KR', 'Pretendard', '맑은 고딕', 'Nanum Gothic', 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.01em;
    line-height: 1.7;
    zoom: 1;
    transform: scale(1);
    transform-origin: top left;
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    outline: none;
    border-radius: ${({ theme }) => theme.borderRadius.button};
    box-shadow: ${({ theme }) => theme.boxShadow.button};
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    padding: 0.7em 1.6em;
    font-size: ${({ theme }) => theme.font.body};
    font-weight: 600;
    transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 6px 24px rgba(37,99,235,0.18);
      transform: translateY(-2px) scale(1.03);
    }
    &:active {
      background: ${({ theme }) => theme.colors.primary};
      transform: scale(0.98);
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.textLight};
      cursor: not-allowed;
      box-shadow: none;
    }
  }
  input, select, textarea {
    font-family: inherit;
    border-radius: ${({ theme }) => theme.borderRadius.input};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.boxShadow.input};
    padding: 0.7em 1.2em;
    font-size: ${({ theme }) => theme.font.body};
    background: #fff;
    transition: border 0.2s, box-shadow 0.2s;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}22;
      outline: none;
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.textLight};
      cursor: not-allowed;
      box-shadow: none;
    }
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
  
  @keyframes fadeIn {
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

export default GlobalStyle;
