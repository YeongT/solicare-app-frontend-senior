import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  showToast: boolean;
}

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ErrorToast = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #dc3545;
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  z-index: 10000;
  max-width: 400px;
  min-width: 300px;
  animation: ${slideIn} 0.3s ease-out;
  display: ${(props) => (props.show ? 'block' : 'none')};
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const ToastHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ToastTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ToastMessage = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.4;
`;

const ErrorDetails = styled.details`
  margin-top: 12px;

  summary {
    cursor: pointer;
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 8px;

    &:hover {
      opacity: 1;
    }
  }
`;

const ErrorLog = styled.pre`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 1.3;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RetryButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

class ErrorBoundary extends Component<Props, State> {
  private toastTimer?: NodeJS.Timeout;
  private errorInfoRef: ErrorInfo | undefined;

  public state: State = {
    hasError: false,
    showToast: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // 오류 발생 시 상태를 한 번만 업데이트
    return {
      hasError: true,
      error,
      showToast: true,
      errorInfo: undefined,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 콘솔 로그만 출력하고 setState는 호출하지 않음
    console.error('🚫 ErrorBoundary caught an error:', error);
    console.error('📍 Error Info:', errorInfo);

    // errorInfo를 ref에 저장 (state 직접 변경 방지)
    this.errorInfoRef = errorInfo;

    // 10초 후 토스트 자동 숨김
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.setState({ showToast: false });
    }, 10000);
  }

  componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  private handleCloseToast = () => {
    this.setState({ showToast: false });
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  };

  private handleRetry = () => {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      showToast: false,
    });

    this.errorInfoRef = undefined;

    // 현재 페이지 새로고침
    window.location.reload();
  };

  private getErrorStack = () => {
    const { error } = this.state;
    const errorInfo = this.errorInfoRef;
    let stack = '';

    if (error) {
      stack += `Error: ${error.message}\n`;
      if (error.stack) {
        stack += `${error.stack}\n\n`;
      }
    }

    if (errorInfo?.componentStack) {
      stack += `Component Stack:${errorInfo.componentStack}`;
    }

    return stack;
  };

  public render() {
    const { hasError, error, showToast } = this.state;

    return (
      <>
        {hasError && (
          <ErrorToast show={showToast}>
            <ToastHeader>
              <ToastTitle>🚫 페이지 오류 발생</ToastTitle>
              <CloseButton onClick={this.handleCloseToast}>×</CloseButton>
            </ToastHeader>

            <ToastMessage>
              {error?.message || '알 수 없는 오류가 발생했습니다.'}
            </ToastMessage>

            <RetryButton onClick={this.handleRetry}>
              🔄 페이지 새로고침
            </RetryButton>

            <ErrorDetails>
              <summary>📋 상세 오류 로그 보기</summary>
              <ErrorLog>{this.getErrorStack()}</ErrorLog>
            </ErrorDetails>
          </ErrorToast>
        )}

        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
