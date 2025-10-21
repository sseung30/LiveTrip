'use client';

import { useRef, useState } from "react";
import { FormProvider, type SubmitErrorHandler,type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import { BasicInfoFields } from "@/domain/registration/_components/BasicInfoFields";
import { ImageUploader } from "@/domain/registration/_components/ImageUploader";
import { TimeSlotsField } from '@/domain/registration/_components/TimeSlotsField';
import { useImageUpload } from "@/domain/registration/_hooks/useImageUpload";
import { createEmptyTimeSlot, type TimeSlot } from "@/domain/registration/_utils/createEmptyTimeSlot";
import type { FormValues } from "@/domain/registration/types";

const CATEGORY_OPTIONS = [
  { label: '문화・예술', value: 'culture_or_art' },
  { label: '식음료', value: 'food_and_beverage' },
  { label: '스포츠', value: 'sport' },
  { label: '투어', value: 'tour' },
  { label: '관광', value: 'sightseeing' },
  { label: '웰빙', value: 'wellbeing' },
];

const MAX_IMAGE_COUNT_BANNER = 1;
const MAX_IMAGE_COUNT_INTRO = 4;

export default function RegistrationForm({ isSubmitting }: any) {
  const methods = useForm<FormValues>({ 
    mode: 'onSubmit',
    defaultValues: {
      bannerImage: '',
      subImageUrls: [],
    },

  });
  const formRef = useRef<HTMLFormElement>(null);
  const { handleSubmit } = methods;

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createEmptyTimeSlot()]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('✅ Submitted:', data);
  };

  const onInvalid: SubmitErrorHandler<FormValues> = (errors) => {
    console.error('❌ Validation errors:', errors);
  };

  const handleAddTimeSlot = () => { setTimeSlots((prev) => [...prev, createEmptyTimeSlot()]); };
  const handleRemoveTimeSlot = (id: string) =>
    { setTimeSlots((prev) => prev.filter((slot) => slot.id !== id)); };
  const handleChangeTimeSlot = (id: string, field: keyof Omit<TimeSlot, 'id'>, value: string) =>
    { setTimeSlots((prev) => prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))); };

  // ✅ Provider로 감싸고, 내부 컴포넌트에서 useImageUpload() 호출
  return (
    <FormProvider {...methods}>
      <InnerRegistrationForm
        isSubmitting={isSubmitting}
        formRef={formRef}
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

/**
 * ✅ 내부 컴포넌트로 분리
 */
function InnerRegistrationForm({
  isSubmitting,
  formRef,
  onSubmit,
  onInvalid,
  timeSlots,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onChangeTimeSlot,
}: any) {
  const {
    images: bannerImages,
    handleUpload: handleUploadBannerImage,
    removeImage: handleRemoveBannerImage,
  } = useImageUpload({
    formFieldName: 'bannerImage',
    isMulti: false,
    maxCount: 1,
  });

  const {
    images: introImages,
    handleUpload: handleUploadIntroImage,
    removeImage: handleRemoveIntroImage,
  } = useImageUpload({
    formFieldName: 'subImageUrls',
    isMulti: true,
    maxCount: 4,
  });

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-8"
      onSubmit={onSubmit}
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

      <ImageUploader
        title="배너 이미지 등록"
        description={`최대 ${MAX_IMAGE_COUNT_BANNER}장까지 등록할 수 있어요.`}
        images={bannerImages}
        maxCount={MAX_IMAGE_COUNT_BANNER}
        onUpload={handleUploadBannerImage}
        onRemove={handleRemoveBannerImage}
      />

      <ImageUploader
        title="소개 이미지 등록"
        description={`최대 ${MAX_IMAGE_COUNT_INTRO}장까지 등록할 수 있어요.`}
        images={introImages}
        maxCount={MAX_IMAGE_COUNT_INTRO}
        onUpload={handleUploadIntroImage}
        onRemove={handleRemoveIntroImage}
      />

      <div className="mt-8 flex justify-end">
        <Button variant="primary" classNames="w-full md:w-1/2">
          {isSubmitting ? '등록 중...' : '체험 등록하기'}
        </Button>
      </div>
    </form>
  );
}
