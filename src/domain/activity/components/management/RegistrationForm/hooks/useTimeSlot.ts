import { useState } from 'react';
import type { TimeSlot } from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import { createEmptyTimeSlot } from '@/domain/activity/components/management/RegistrationForm/utils/createEmptyTimeSlot';
import type { Schedule } from '@/domain/activity/types';

export function useTimeSlot(schedules: Schedule[]) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>((): TimeSlot[] => {
    if (schedules.length > 0) {
      return schedules.map(
        (s): TimeSlot => ({
          id: `${Date.now()}-${Math.random()}`,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
          isAvailable: true,
        })
      );
    }

    return [createEmptyTimeSlot()];
  });

  console.log(timeSlots);
  const handleAddTimeSlot = () => {
    setTimeSlots((prev) => [...prev, createEmptyTimeSlot()]);
  };

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleChangeTimeSlot = (
    id: string,
    field: keyof Omit<TimeSlot, 'id'>,
    value: string
  ) => {
    setTimeSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    );
  };

  return {
    timeSlots,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    handleChangeTimeSlot,
  };
}
