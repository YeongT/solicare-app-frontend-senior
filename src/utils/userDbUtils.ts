// 사용자별 데이터 관리 유틸

// 쿠키에서 사용자 UUID 읽기
export function getUserUUIDFromCookie(): string | null {
  const match = document.cookie.match(/user_uuid=([^;]+)/);
  return match ? match[1] : null;
}

// 로그인 시 UUID 생성 및 쿠키 저장
// export function setUserUUIDCookie() {
//   let uuid = getUserUUIDFromCookie();
//   if (!uuid) {
//     uuid = uuidv4();
//     document.cookie = `user_uuid=${uuid}; path=/; max-age=31536000`;
//   }
//   return uuid;
// }

// 사용자별 localStorage key 생성
function getUserDataKey(type: string, uuid: string) {
  return `userdb_${uuid}_${type}`;
}

// 데이터 저장
export function saveUserData(type: string, data: unknown) {
  const uuid = getUserUUIDFromCookie();
  if (!uuid) throw new Error('No user UUID in cookie');
  localStorage.setItem(getUserDataKey(type, uuid), JSON.stringify(data));
}

// 데이터 로딩
export function loadUserData(type: string): unknown {
  const uuid = getUserUUIDFromCookie();
  if (!uuid) throw new Error('No user UUID in cookie');
  const raw = localStorage.getItem(getUserDataKey(type, uuid));
  return raw ? JSON.parse(raw) : null;
}

// 데이터 삭제
// export function removeUserData(type: string) {
//   const uuid = getUserUUIDFromCookie();
//   if (!uuid) throw new Error('No user UUID in cookie');
//   localStorage.removeItem(getUserDataKey(type, uuid));
// }
