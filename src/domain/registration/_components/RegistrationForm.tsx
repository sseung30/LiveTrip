'use client';

import { useRef, useState } from 'react';
import {
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import Button from '@/components/button/Button';
import { BasicInfoFields } from '@/domain/registration/_components/BasicInfoFields';
import { ImageUploader } from '@/domain/registration/_components/ImageUploader';
import { TimeSlotsField } from '@/domain/registration/_components/TimeSlotsField';
import { useBannerImageUpload } from '@/domain/registration/_hooks/useBannerImageUpload';
import { useIntroImageUpload } from '@/domain/registration/_hooks/useIntroImageUpload';
import { createEmptyTimeSlot, type TimeSlot } from '@/domain/registration/_utils/createEmptyTimeSlot';
import type { FormValues } from '@/domain/registration/types';

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
    { setTimeSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot))
    ); };

  return (
    <FormProvider {...methods}>
      <InnerRegistrationForm
        isSubmitting={isSubmitting}
        formRef={formRef}
        handleSubmit={methods.handleSubmit}
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
  timeSlots,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onChangeTimeSlot,
}: any) {
  // ✅ 배너 이미지 훅
  const {
    image: bannerImage,
    handleUpload: handleUploadBanner,
    removeImage: removeBanner,
  } = useBannerImageUpload();

  // ✅ 소개 이미지 훅
  const {
    images: introImages,
    handleUpload: handleUploadIntro,
    removeImage: removeIntro,
  } = useIntroImageUpload(MAX_IMAGE_COUNT_INTRO);

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
        onUpload={handleUploadBanner}
        onRemove={() => { removeBanner(); }}
      />

      {/* ✅ 소개 이미지 */}
      <ImageUploader
        title="소개 이미지 등록"
        description="최대 4장까지 등록할 수 있어요."
        images={introImages}
        maxCount={MAX_IMAGE_COUNT_INTRO}
        onUpload={handleUploadIntro}
        onRemove={removeIntro}
      />

      <div className="mt-8 flex justify-end">
        <Button variant="primary" classNames="w-full md:w-1/2">
          {isSubmitting ? '등록 중...' : '체험 등록하기'}
        </Button>
      </div>
    </form>
  );
}
