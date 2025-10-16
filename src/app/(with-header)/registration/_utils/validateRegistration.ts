import type { TimeSlot } from '@/app/(with-header)/registration/_utils/createEmptyTimeSlot';

export interface RegistrationValidationInput {
  title: string;
  category: string;
  description: string;
  price: string;
  address: string;
  bannerCount: number;
  timeSlots: TimeSlot[];
}

export function validateRegistration(input: RegistrationValidationInput): string | null {
  if (!input.title.trim()) {return '제목은 필수입니다.';}
  if (!input.category) {return '카테고리는 필수입니다.';}
  if (!input.description.trim()) {return '설명은 필수입니다.';}
  if (!input.price || Number.isNaN(Number(input.price)) || Number(input.price) <= 0)
    {return '가격은 0보다 큰 숫자여야 합니다.';}
  if (!input.address.trim()) {return '주소는 필수입니다.';}
  if (input.bannerCount === 0) {return '배너 이미지는 최소 1장이 필요합니다.';}
  if (
    input.timeSlots.length === 0 ||
    input.timeSlots.some((slot) => !slot.date || !slot.startTime || !slot.endTime)
  )
    {return '예약 가능한 시간대를 하나 이상 추가하고 날짜/시작/종료 시간을 모두 입력해주세요.';}

  return null; // ✅ 통과
}
