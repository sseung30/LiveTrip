import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/toast';
import type {
  RegistrationFormValues,
  TimeSlot,
} from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import { createActivityService } from '@/domain/activity/components/management/RegistrationForm/services/activityService';
import type { ActivityDetail, RegisterFormMode } from '@/domain/activity/types';

export function useActivityRegistration(
  mode: RegisterFormMode,
  initialData?: ActivityDetail
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const activityService = createActivityService(
    (message) => {
      toast({ message, eventType: 'success' });
    },
    (message) => {
      toast({ message, eventType: 'error' });
    }
  );

  const registrationMutation = useMutation({
    mutationFn: async ({
      formData,
      timeSlots,
    }: {
      formData: RegistrationFormValues;
      timeSlots: TimeSlot[];
    }) => {
      if (mode === 'edit' && initialData?.id) {
        await activityService.updateActivity(
          initialData.id,
          formData,
          timeSlots,
          initialData
        );
      } else {
        await activityService.registerActivity(
          formData,
          timeSlots,
          formData.bannerImage
        );
      }
    },
    onSuccess: () => {
      // Invalidate and refetch activities list
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      router.replace('/myactivities');
    },
  });

  return {
    registerActivity: registrationMutation.mutate,
    isSubmitting: registrationMutation.isPending,
    error: registrationMutation.error,
  };
}
