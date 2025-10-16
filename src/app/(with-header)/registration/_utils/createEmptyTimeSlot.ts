// Registration/utils/createEmptyTimeSlot.ts

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export function createEmptyTimeSlot(): TimeSlot {
  return {
    id: `${Date.now()}-${Math.random()}`,
    date: '',
    startTime: '',
    endTime: '',
  };
}
