import type {
  RegistrationFormValues,
  TimeSlot,
} from '@/domain/activity/components/management/RegistrationForm/schemas/registrationSchema';
import type {
  ActivityDetail,
  UpdateActivityPayload,
} from '@/domain/activity/types';

function normalizeKey(date: string, startTime: string, endTime: string) {
  return `${date}|${startTime}|${endTime}`;
}

export function buildUpdatePayload(
  initial: ActivityDetail,
  formValues: RegistrationFormValues,
  timeSlots: TimeSlot[]
): UpdateActivityPayload {
  const payload: UpdateActivityPayload = {
    title: formValues.title.trim(),
    description: formValues.description.trim(),
    category: formValues.category,
    price: Number(formValues.price),
    address: formValues.address.trim(),
    bannerImageUrl: formValues.bannerImage,
    subImageIdsToRemove: [],
    subImageUrlsToAdd: [],
    scheduleIdsToRemove: [],
    schedulesToAdd: [],
  };

  // Images diff
  const initialImages = Array.isArray(initial.subImages)
    ? initial.subImages
    : [];
  const initialUrls = new Set(initialImages.map((i) => i.imageUrl));
  const currentUrls = new Set(
    Array.isArray(formValues.subImageUrls) ? formValues.subImageUrls : []
  );

  // removed: initial url not in current
  payload.subImageIdsToRemove = initialImages
    .filter((img) => !currentUrls.has(img.imageUrl))
    .map((img) => img.id);

  // added: current url not in initial
  payload.subImageUrlsToAdd = [...currentUrls].filter(
    (url) => !initialUrls.has(url)
  );

  // Schedules diff (by date/startTime/endTime key)
  const initialScheduleMap = new Map(
    initial.schedules.map((s) => {
      return [normalizeKey(s.date, s.startTime, s.endTime), s.id];
    })
  );

  const formKeys = new Set(
    timeSlots
      .filter((s) => s.date && s.startTime && s.endTime)
      .map((s) => normalizeKey(s.date, s.startTime, s.endTime))
  );

  // remove ids: initial keys not present in form
  payload.scheduleIdsToRemove = [...initialScheduleMap.entries()]
    .filter(([key]) => !formKeys.has(key))
    .map(([, id]) => id);

  // add schedules: form keys not present in initial
  const initialKeys = new Set(initialScheduleMap.keys());

  payload.schedulesToAdd = timeSlots
    .filter((s) => s.date && s.startTime && s.endTime)
    .filter(
      (s) => !initialKeys.has(normalizeKey(s.date, s.startTime, s.endTime))
    )
    .map((s) => ({ date: s.date, startTime: s.startTime, endTime: s.endTime }));

  return payload;
}
