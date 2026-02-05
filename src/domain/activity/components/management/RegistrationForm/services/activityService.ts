import { ApiError } from '@/api/api';
import { createActivity, updateActivity } from '@/domain/activity/api';
import type {
  RegistrationFormValues,
  TimeSlot,
} from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import { buildRegistrationPayload } from '@/domain/activity/components/management/RegistrationForm/utils/buildRegistrationPayload';
import { buildUpdatePayload } from '@/domain/activity/components/management/RegistrationForm/utils/buildUpdatePayload';
import type { ActivityDetail } from '@/domain/activity/types';

/**
 * Service interface for activity registration and management
 * Centralizes all activity-related API calls and business logic
 */
export interface ActivityService {
  registerActivity: (
    formData: RegistrationFormValues,
    timeSlots: TimeSlot[],
    bannerImageUrl: string
  ) => Promise<void>;
  updateActivity: (
    activityId: number,
    formData: RegistrationFormValues,
    timeSlots: TimeSlot[],
    initialData: ActivityDetail
  ) => Promise<void>;
}

/**
 * Activity service implementation
 * Handles all activity-related operations with proper error handling
 */
export class ActivityServiceImpl implements ActivityService {
  constructor(
    private onError?: (message: string) => void,
    private onSuccess?: (message: string) => void
  ) {}

  async registerActivity(
    formData: RegistrationFormValues,
    timeSlots: TimeSlot[],
    bannerImageUrl: string
  ): Promise<void> {
    try {
      const payload = buildRegistrationPayload({
        formData: {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price,
          address: formData.address,
        },
        bannerImageUrl,
        introImages: formData.subImageUrls.map((url) => ({ src: url })),
        timeSlots,
      });

      await createActivity(payload);
      this.onSuccess?.('체험 등록이 완료되었습니다.');
    } catch (error) {
      if (error instanceof ApiError) {
        this.onError?.('등록 중 오류가 발생했습니다.');
      } else {
        throw error;
      }
    }
  }

  async updateActivity(
    activityId: number,
    formData: RegistrationFormValues,
    timeSlots: TimeSlot[],
    initialData: ActivityDetail
  ): Promise<void> {
    try {
      const updatePayload = buildUpdatePayload(
        initialData,
        formData,
        timeSlots
      );

      await updateActivity(activityId, updatePayload);
      this.onSuccess?.('체험 수정이 완료되었습니다.');
    } catch (error) {
      if (error instanceof ApiError) {
        this.onError?.('수정 중 오류가 발생했습니다.');
      } else {
        throw error;
      }
    }
  }
}

/**
 * Factory function to create activity service with toast notifications
 */
export function createActivityService(
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void
): ActivityService {
  return new ActivityServiceImpl(onError, onSuccess);
}

/**
 * Default activity service with toast notifications
 */
export const activityService = createActivityService(
  (message) => {
    console.log('Success:', message);
  },
  (message) => {
    console.error('Error:', message);
  }
);
