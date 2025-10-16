// Registration/utils/buildRegistrationPayload.ts

import type { TimeSlot } from '@/app/(with-header)/registration/_utils/createEmptyTimeSlot';

interface PayloadInput {
  formData: {
    title: string;
    description: string;
    category: string;
    price: string;
    address: string;
  };
  bannerImageUrl: string;
  introImages: { src: string }[];
  timeSlots: TimeSlot[];
}

export function buildRegistrationPayload({
  formData,
  bannerImageUrl,
  introImages,
  timeSlots,
}: PayloadInput) {
  return {
    title: formData.title.trim(),
    description: formData.description.trim(),
    category: formData.category,
    price: Number(formData.price),
    address: formData.address.trim(),
    bannerImageUrl,
    subImages: introImages.map((img) => ({ imageUrl: img.src, id: 0 })),
    schedules: timeSlots.map((slot) => { return {
      date: slot.date,
      times: [
        {
          startTime: slot.startTime,
          endTime: slot.endTime,
          id: 0,
        },
      ],
    } }),
  };
}
