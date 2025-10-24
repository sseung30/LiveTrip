'use client';

import { useRef, useState } from 'react';
import {
  FormProvider,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import { BasicInfoFields } from '@/domain/registration/_components/BasicInfoFields';
import { ImageUploader } from '@/domain/registration/_components/ImageUploader';
import { TimeSlotsField } from '@/domain/registration/_components/TimeSlotsField';
import { useBannerImageUpload } from '@/domain/registration/_hooks/useBannerImageUpload';
import { useIntroImageUpload } from '@/domain/registration/_hooks/useIntroImageUpload';
import { buildRegistrationPayload } from '@/domain/registration/_utils/buildRegistrationPayload';
import { createEmptyTimeSlot, type TimeSlot } from '@/domain/registration/_utils/createEmptyTimeSlot';
import type { FormValues } from '@/domain/registration/types';

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

export default function RegistrationForm({ isSubmitting }: any) {
  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
    category: '',
    description: '',
    address: '',
    price: '',
    bannerImage: '',
    subImageUrls: [],
    timeSlots: [createEmptyTimeSlot()],
    },
  }); 

  const formRef = useRef<HTMLFormElement>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createEmptyTimeSlot()]);

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

console.log('payload', payload); 

  try {
    const result = await apiFetch('/activities', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    console.log('✅ 등록 성공:', result)
    alert('체험이 등록되었습니다!')
  } catch (error) {
    console.error('❌ 등록 실패:', error)
    alert('등록 중 오류가 발생했습니다.')
  }
}

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
  handleUploadBanner,
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

      <div className="mt-8 flex justify-center">
        <Button variant="primary" classNames="w-[120px] text-14 font-bold md:text-14">
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
