// meal 관련 유틸 함수 모음

// 식사 시간 타입 정의
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
} as const;

// 한글 식사 시간 목록
const KOREAN_TIME_SLOTS = ['아침', '점심', '저녁'] as const;
const ENGLISH_TIME_SLOTS = ['breakfast', 'lunch', 'dinner'] as const;

type KoreanTimeSlot = (typeof KOREAN_TIME_SLOTS)[number];
type EnglishTimeSlot = (typeof ENGLISH_TIME_SLOTS)[number];

// 한글 timeSlot을 영어로 변환하는 함수
export function getEnglishTimeSlot(koreanTimeSlot: string): string {
  const index = KOREAN_TIME_SLOTS.indexOf(koreanTimeSlot as KoreanTimeSlot);
  return index !== -1 ? ENGLISH_TIME_SLOTS[index] : koreanTimeSlot;
}

// 영어 timeSlot을 한글로 변환하는 함수
export function getKoreanTimeSlot(englishTimeSlot: string): string {
  const index = ENGLISH_TIME_SLOTS.indexOf(englishTimeSlot as EnglishTimeSlot);
  return index !== -1 ? KOREAN_TIME_SLOTS[index] : englishTimeSlot;
}

// 영어 timeSlot을 한글로 변환 (기존 호환성을 위해 유지)
export const keyToTimeSlot: Record<string, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

// 식사별 아이콘 매핑 (Dashboard에서 사용하는 것과 통합)
export const mealIcons: Record<string, string> = {
  breakfast: '🌅',
  lunch: '🌞',
  dinner: '🌙',
};

// 식사 시간대 범위 (분 단위) - Dashboard에서 사용하던 로직 이동
export const mealTimeRanges: Record<string, [number, number]> = {
  [MEAL_TYPES.BREAKFAST]: [6 * 60, 8 * 60], // 06:00~08:00
  [MEAL_TYPES.LUNCH]: [11 * 60, 13 * 60], // 11:00~13:00
  [MEAL_TYPES.DINNER]: [17 * 60, 19 * 60], // 17:00~19:00
};

// timeSlot(한글/영어)로 아이콘 반환
export function getMealIcon(timeSlot: string): string {
  const key = getEnglishTimeSlot(timeSlot);
  return mealIcons[key] || '🍽️';
}

// 현재 시간을 분 단위로 반환
export function getMinutesNow(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

// 식사 알림 생성을 위한 타입
export interface MealAlert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
}

// 식사 상태 타입 - useMeal 훅의 getTodayMealStatus 반환 타입과 일치하도록 수정
export interface MealStatus {
  type: '아침' | '점심' | '저녁';
  recorded: boolean;
  time: string | null;
  description: string | null;
  id: string | null;
}

// 식사 알림 생성 함수
export function generateMealAlerts(mealStatus: MealStatus[]): MealAlert[] {
  const nowMinutes = getMinutesNow();
  const currentHour = Math.floor(nowMinutes / 60);
  const currentMinute = nowMinutes % 60;

  // 디버깅을 위한 로그 (개발용)
  console.log(
    '🕐 현재 시간:',
    `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
  );
  console.log('🕐 현재 분 단위:', nowMinutes);

  return mealStatus
    .filter((m) => !m.recorded)
    .map((m) => {
      const englishMealType = getEnglishTimeSlot(m.type);
      const [start, end] = mealTimeRanges[englishMealType];

      // 디버깅 로그
      console.log(`🍽️ ${m.type} 시간 체크:`, {
        meal: m.type,
        englishType: englishMealType,
        timeRange: `${Math.floor(start / 60)}:${(start % 60).toString().padStart(2, '0')} ~ ${Math.floor(end / 60)}:${(end % 60).toString().padStart(2, '0')}`,
        currentTime: nowMinutes,
        isInRange: nowMinutes >= start && nowMinutes < end,
        isAfterRange: nowMinutes >= end,
      });

      if (nowMinutes >= start && nowMinutes < end) {
        // 식사 시간대: 식사 유도
        return {
          id: `meal-alert-${m.type}`,
          title: `${mealIcons[englishMealType]} ${m.type} 식사 알림`,
          message: `지금 ${m.type} 식사 시간이에요!\n식사 후 기록을 남겨보세요.`,
          time: '',
          type: 'diet',
        };
      } else if (nowMinutes >= end) {
        // 식사 시간대 이후: 미기록 알림
        return {
          id: `meal-alert-${m.type}`,
          title: `${mealIcons[englishMealType]} ${m.type} 식사 기록 알림`,
          message: `${m.type} 식사를 아직 기록하지 않았어요~\n지금 기록해 주세요!`,
          time: '',
          type: 'diet',
        };
      }
      // 식사 전에는 알림 없음
      return null;
    })
    .filter((alert): alert is MealAlert => alert !== null);
}
