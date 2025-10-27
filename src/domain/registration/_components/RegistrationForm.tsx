'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { ApiError, apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import { ModalContainer } from '@/components/dialog/Modal/ModalContainer';
import { toast } from '@/components/toast';
import { BasicInfoFields } from '@/domain/registration/_components/BasicInfoFields';
import ClientConfirmModal from '@/domain/registration/_components/ClientConfirmModal';
import { ImageUploader } from '@/domain/registration/_components/ImageUploader';
import { TimeSlotsField } from '@/domain/registration/_components/TimeSlotsField';
import { useBannerImageUpload } from '@/domain/registration/_hooks/useBannerImageUpload';
import { useIntroImageUpload } from '@/domain/registration/_hooks/useIntroImageUpload';
import { useLeaveGuard } from '@/domain/registration/_hooks/useLeaveGuard';
import { buildRegistrationPayload } from '@/domain/registration/_utils/buildRegistrationPayload';
import { buildUpdatePayload } from '@/domain/registration/_utils/buildUpdatePayload';
import { createEmptyTimeSlot, type TimeSlot } from '@/domain/registration/_utils/createEmptyTimeSlot';
import type { FormValues } from '@/domain/registration/types';
import type { ActivityDetail } from '@/domain/activities/api';
import { updateActivity } from '@/domain/activities/api';


const CATEGORY_OPTIONS = [
  { label: '문화 · 예술', value: '문화 · 예술' },
  { label: '식음료', value: '식음료' },
  { label: '스포츠', value: '스포츠' },
  { label: '투어', value: '투어' },
  { label: '관광', value: '관광' },
  { label: '웰빙', value: '웰빙' },
];

const MAX_IMAGE_COUNT_BANNER = 1;
const MAX_IMAGE_COUNT_INTRO = 4;

type Mode = 'create' | 'edit';

interface RegistrationFormProps {
  mode: Mode;
  initialData?: ActivityDetail;
  isSubmitting?: boolean;
}

export default function RegistrationForm({ mode, initialData, isSubmitting }: RegistrationFormProps) {
  const router = useRouter();
  const normalizeSubImages = (data?: ActivityDetail): string[] => {
    if (!data) return [];
    if (Array.isArray(data.subImageUrls)) return data.subImageUrls;
    if (Array.isArray((data as any).subImages)) {
      const arr = (data as any).subImages as Array<string | { imageUrl: string }>;
      return arr.map((item) => (typeof item === 'string' ? item : item.imageUrl)).filter(Boolean);
    }
    return [];
  };

  const defaults: FormValues = {
    title: initialData?.title ?? '',
    category: initialData?.category ?? '',
    description: initialData?.description ?? '',
    address: initialData?.address ?? '',
    price: initialData?.price != null ? String(initialData.price) : '',
    bannerImage: initialData?.bannerImageUrl ?? '',
    subImageUrls: normalizeSubImages(initialData),
    timeSlots: Array.isArray(initialData?.schedules)
      ? initialData!.schedules!.map((s) => ({ date: s.date, startTime: s.startTime, endTime: s.endTime }))
      : [createEmptyTimeSlot()],
  };

  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: defaults,
  }); 

  const formRef = useRef<HTMLFormElement>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    Array.isArray(initialData?.schedules)
      ? initialData!.schedules!.map((s) => ({ id: `${Date.now()}-${Math.random()}`, date: s.date, startTime: s.startTime, endTime: s.endTime }))
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
    if (mode === 'edit' && initialData?.id != null) {
      // Build update-diff payload for edit endpoint
      const updatePayload = buildUpdatePayload(initialData as any, data, timeSlots);
      await updateActivity(initialData.id, updatePayload);
      toast({ message: '체험 수정이 완료되었습니다.', eventType: 'success' });
    } else {
      await apiFetch('/activities', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      toast({ message: '체험 등록이 완료되었습니다.', eventType: 'success' });
    }
    router.replace('/myactivities');
  } catch (error) {
    const message = error instanceof ApiError
      ? error.message
      : mode === 'edit' ? '수정 중 오류가 발생했습니다.' : '등록 중 오류가 발생했습니다.';

    toast({ message, eventType: 'error' });
  }
}

  const onInvalid: SubmitErrorHandler<FormValues> = (errors) => {
    const messages: string[] = [];
    const seen = new WeakSet<object>();

    const isPlainObject = (val: unknown): val is Record<string, unknown> => {
      if (val === null || typeof val !== 'object') return false;
      const proto = Object.getPrototypeOf(val);
      return proto === Object.prototype || proto === null;
    };

    const visit = (obj: unknown, depth = 0) => {
      if (!obj || depth > 6) return; // guard depth
      if (typeof obj !== 'object') return;

      // Avoid circular refs and non-plain objects
      if (!Array.isArray(obj) && !isPlainObject(obj)) return;

      const key = obj as object;
      if (seen.has(key)) return;
      seen.add(key);

      // FieldError 형태: { message?: string }
      const maybeMessage = (obj as { message?: unknown }).message;
      if (typeof maybeMessage === 'string') {
        messages.push(maybeMessage);
      }

      if (Array.isArray(obj)) {
        for (const v of obj) visit(v, depth + 1);
      } else {
        for (const [k, v] of Object.entries(obj)) {
          if (k === 'ref') continue; // skip RHF ref
          visit(v, depth + 1);
        }
      }
    };

    visit(errors);

    const first = messages.find(Boolean) || '입력값을 확인해 주세요.';
    toast({ message: first, eventType: 'error' });
  };

  const handleAddTimeSlot = () => { setTimeSlots((prev) => [...prev, createEmptyTimeSlot()]); };
  const handleRemoveTimeSlot = (id: string) =>
    { setTimeSlots((prev) => prev.filter((slot) => slot.id !== id)); };
  const handleChangeTimeSlot = (id: string, field: keyof Omit<TimeSlot, 'id'>, value: string) =>
    { setTimeSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    ); };

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

function InnerRegistrationForm({
  isSubmitting,
  formRef,
  handleSubmit,
  onSubmit,
  onInvalid,
  mode,
  timeSlots,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onChangeTimeSlot,
}: any) {
  // ✅ 배너 이미지 훅
 const {
  image: bannerImage,
  handleUploadBanner,
  removeImage: removeBanner,
  isUploading: isBannerUploading,
} = useBannerImageUpload();

  // ✅ 소개 이미지 훅
  const {
    images: introImages,
    handleUpload: handleUploadIntro,
    removeImage: removeIntro,
    isUploading: isIntroUploading,
  } = useIntroImageUpload(MAX_IMAGE_COUNT_INTRO);

  const isUploadingAny = Boolean(isBannerUploading || isIntroUploading);

  //모달 훅
  const router = useRouter();
  const { formState } = useFormContext();
  const { guardLeave, dialogRef, onConfirm, onCancel } = useLeaveGuard(formState.isDirty); 

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit, onInvalid)} // ✅ react-hook-form submit 연결
    >
      <BasicInfoFields categoryOptions={CATEGORY_OPTIONS} />

      <TimeSlotsField
        timeSlots={timeSlots}
        timeOptions={Array.from({ length: 48 }, (_, i) =>
          `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`
        )}
        onAdd={onAddTimeSlot}
        onRemove={onRemoveTimeSlot}
        onChange={onChangeTimeSlot}
      />

      {/* ✅ 배너 이미지 */}
      <ImageUploader
        title="배너 이미지 등록"
        description="최대 1장까지 등록할 수 있어요."
        images={bannerImage ? [bannerImage] : []}
        maxCount={MAX_IMAGE_COUNT_BANNER}
        inputId="banner-image-upload"
        onUpload={handleUploadBanner}
        onRemove={() => { removeBanner(); }}
      />

      {/* ✅ 소개 이미지 */}
      <ImageUploader
        title="소개 이미지 등록"
        description="최대 4장까지 등록할 수 있어요."
        images={introImages}
        maxCount={MAX_IMAGE_COUNT_INTRO}
        inputId="intro-images-upload"
        onUpload={handleUploadIntro}
        onRemove={removeIntro}
      />

      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          variant="primary"
          disabled={isUploadingAny || isSubmitting}
          classNames="w-[120px] !text-white text-14 font-bold md:text-14"
        >
          {isUploadingAny
            ? '업로드 중...'
            : isSubmitting
            ? (mode === 'edit' ? '수정 중...' : '등록 중...')
            : (mode === 'edit' ? '수정하기' : '등록하기')}
        </Button>
      </div>

        <ModalContainer dialogRef={dialogRef} onClose={onCancel}>
          <ClientConfirmModal
            message={`저장되지 않았습니다.\n 정말 뒤로 가시겠습니까?`}
            cancelText="아니오"
            confirmText="네"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </ModalContainer>
    </form>
  );
}
