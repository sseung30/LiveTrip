import { z } from 'zod';

/**
 * Time slot schema for form validation
 */
export const timeSlotSchema = z.object({
  id: z.string(),
  date: z.string('날짜를 선택해 주세요.'),
  startTime: z.string('시작 시간을 선택해 주세요.'),
  endTime: z.string('종료 시간을 선택해 주세요.'),
  isAvailable: z.boolean().optional(),
});
export type TimeSlot = z.infer<typeof timeSlotSchema>;
/**
 * Main registration form schema
 */
export const registrationSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  category: z.string().min(1, '카테고리는 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  address: z.string().min(1, '주소는 필수입니다'),
  price: z
    .string()
    .min(1, '가격은 필수입니다.')
    .refine(
      (val) => !Number.isNaN(Number(val)) && Number(val) > 0,
      '가격은 0보다 큰 숫자여야 합니다'
    ),
  bannerImage: z.string().min(1, '배너 이미지는 필수입니다'),
  subImageUrls: z
    .array(z.string())
    .min(1, '소개 이미지는 최소 1장이 필요합니다.'),
  timeSlots: z.array(timeSlotSchema),
  // .min(1, '예약 가능한 시간대를 하나 이상 추가해 주세요')
  // .refine(
  //   (slots) =>
  //     slots.every((slot) => slot.date && slot.startTime && slot.endTime),
  //   '모든 시간대의 날짜/시작/종료 시간을 입력해 주세요'
  // ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

/**
 * Validation helper function for backward compatibility
 */
export function validateFormData(data: unknown): string | null {
  const result = registrationSchema.safeParse(data);

  if (!result.success) {
    const firstError = result.error.issues[0];

    return firstError.message || '입력값을 확인해 주세요';
  }

  return null;
}
