import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegistrationFormValues,
  registrationSchema,
} from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import { createEmptyTimeSlot } from '@/domain/activity/components/management/RegistrationForm/utils/createEmptyTimeSlot';
import { normalizeSubImages } from '@/domain/activity/components/management/RegistrationForm/utils/normalizeSubImages';
import type { ActivityDetail } from '@/domain/activity/types';

/**
 * Hook for unified form state management
 * Combines React Hook Form with custom time slots state
 */
export function useActivityForm(initialData?: ActivityDetail) {
  const defaults: RegistrationFormValues = {
    title: initialData?.title ?? '',
    category: initialData?.category ?? '',
    description: initialData?.description ?? '',
    address: initialData?.address ?? '',
    price: initialData?.price ? String(initialData.price) : '',
    bannerImage: initialData?.bannerImageUrl ?? '',
    subImageUrls: normalizeSubImages(initialData),
    timeSlots: Array.isArray(initialData?.schedules)
      ? initialData.schedules.map((s) => ({
          id: String(s.id),
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
        }))
      : [createEmptyTimeSlot()],
  };

  return useForm<RegistrationFormValues>({
    mode: 'onSubmit',
    defaultValues: defaults,
    resolver: zodResolver(registrationSchema),
  });
}
