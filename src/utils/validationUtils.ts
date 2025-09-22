// 유효성 검사 함수 모음
export const validateUserId = (id: string): string | null => {
  if (!id) return '아이디를 입력하세요';
  if (!/^[a-zA-Z0-9]{4,16}$/.test(id))
    return '아이디는 영문/숫자 4~16자여야 합니다';
  return null;
};
export const validateEmail = (email: string): string | null => {
  if (!email) return '이메일을 입력하세요';
  if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email))
    return '이메일 형식이 올바르지 않습니다';
  return null;
};
export const validatePassword = (pw: string): string | null => {
  if (!pw) return '비밀번호를 입력하세요';
  if (pw.length < 8) return '비밀번호는 8자 이상이어야 합니다';
  return null;
};
export const validatePasswordConfirm = (
  pw: string,
  confirm: string
): string | null => {
  if (!confirm) return '비밀번호 확인을 입력하세요';
  if (pw !== confirm) return '비밀번호가 일치하지 않습니다';
  return null;
};
export const validatePhone = (phone: string): string | null => {
  if (!phone) return '전화번호를 입력하세요';
  if (!/^010-\d{4}-\d{4}$/.test(phone))
    return '전화번호 형식이 올바르지 않습니다';
  return null;
};
export {};
