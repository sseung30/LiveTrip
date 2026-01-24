'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/api/api';
import { toast } from '@/components/toast';
import type { ActivityDetailResponse } from '@/domain/activities/type';
import InnerRegistrationForm from '@/domain/registration/_components/InnerRegistrationForm';
import { buildRegistrationPayload } from '@/domain/registration/_utils/buildRegistrationPayload';
import { buildUpdatePayload } from '@/domain/registration/_utils/buildUpdatePayload';
import {
  createEmptyTimeSlot,
  type TimeSlot,
} from '@/domain/registration/_utils/createEmptyTimeSlot';
import { normalizeSubImages } from '@/domain/registration/_utils/normalizeSubImages';
import { createActivity, updateActivity } from '@/domain/registration/api';
import type { FormValues } from '@/domain/registration/types';

type Mode = 'create' | 'edit';
interface RegistrationFormProps {
  mode: Mode;
  initialData?: ActivityDetailResponse;
  isSubmitting?: boolean;
}

export default function RegistrationForm({
  mode,
  initialData,
  isSubmitting,
}: RegistrationFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaults: FormValues = {
    title: initialData?.title ?? '',
    category: initialData?.category ?? '',
    description: initialData?.description ?? '',
    address: initialData?.address ?? '',
    price: initialData?.price ? String(initialData.price) : '',
    bannerImage: initialData?.bannerImageUrl ?? '',
    subImageUrls: normalizeSubImages(initialData),
    timeSlots: Array.isArray(initialData?.schedules)
      ? initialData.schedules.map((s) => {
          return {
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
          };
        })
      : [createEmptyTimeSlot()],
  };

  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: defaults,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    Array.isArray(initialData?.schedules)
      ? initialData.schedules.map((s) => {
          return {
            id: `${Date.now()}-${Math.random()}`,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
          };
        })
      : [createEmptyTimeSlot()]
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = buildRegistrationPayload({
      formData: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        address: data.address,
      },
      bannerImageUrl: data.bannerImage,
      introImages: data.subImageUrls.map((url) => ({ src: url })), // 여기서 변환
      timeSlots,
    });

    try {
      if (mode === 'edit' && initialData?.id) {
        // Build update-diff payload for edit endpoint
        const updatePayload = buildUpdatePayload(
          initialData as any,
          data,
          timeSlots
        );

        await updateActivity(initialData.id, updatePayload);
        toast({ message: '체험 수정이 완료되었습니다.', eventType: 'success' });
      } else {
        await createActivity(payload);
        toast({ message: '체험 등록이 완료되었습니다.', eventType: 'success' });
      }
      // 업데이트 후 내 체험 목록 무효화
      await queryClient.invalidateQueries({ queryKey: ['myActivities'] });
      router.replace('/myactivities');
    } catch (error) {
      if (error instanceof ApiError) {
        const message =
          mode === 'edit'
            ? '수정 중 오류가 발생했습니다.'
            : '등록 중 오류가 발생했습니다.';

        toast({ message, eventType: 'error' });
      }
    }
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors) => {
    const messages: string[] = [];
    const seen = new WeakSet<object>();

    const isPlainObject = (val: unknown): val is Record<string, unknown> => {
      if (val === null || typeof val !== 'object') {
        return false;
      }
      const proto = Object.getPrototypeOf(val);

      return proto === Object.prototype || proto === null;
    };

    const visit = (obj: unknown, depth = 0) => {
      if (!obj || depth > 6) {
        return;
      } // guard depth
      if (typeof obj !== 'object') {
        return;
      }

      // Avoid circular refs and non-plain objects
      if (!Array.isArray(obj) && !isPlainObject(obj)) {
        return;
      }

      const key = obj as object;

      if (seen.has(key)) {
        return;
      }
      seen.add(key);

      // FieldError 형태: { message?: string }
      const maybeMessage = (obj as { message?: unknown }).message;

      if (typeof maybeMessage === 'string') {
        messages.push(maybeMessage);
      }

      if (Array.isArray(obj)) {
        for (const v of obj) {
          visit(v, depth + 1);
        }
      } else {
        for (const [k, v] of Object.entries(obj)) {
          if (k === 'ref') {
            continue;
          } // skip RHF ref
          visit(v, depth + 1);
        }
      }
    };

    visit(errors);

    const first = messages.find(Boolean) || '입력값을 확인해 주세요.';

    toast({ message: first, eventType: 'error' });
  };

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

  return (
    <FormProvider {...methods}>
      <InnerRegistrationForm
        isSubmitting={isSubmitting}
        formRef={formRef}
        handleSubmit={methods.handleSubmit}
        mode={mode}
        timeSlots={timeSlots}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        onAddTimeSlot={handleAddTimeSlot}
        onRemoveTimeSlot={handleRemoveTimeSlot}
        onChangeTimeSlot={handleChangeTimeSlot}
      />
    </FormProvider>
  );
}
