import type { TimeSlot } from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';

export function createEmptyTimeSlot(): TimeSlot {
  return {
    id: `${Date.now()}-${Math.random()}`,
    date: '',
    startTime: '',
    endTime: '',
  };
}
