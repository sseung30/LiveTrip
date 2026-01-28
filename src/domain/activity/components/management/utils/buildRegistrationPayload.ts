import type { TimeSlot } from '@/domain/activity/components/management/utils/createEmptyTimeSlot';

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
    subImageUrls: introImages.map((img) => img.src),
    schedules: timeSlots.map((slot) => {
      return {
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      };
    }),
  };
}
