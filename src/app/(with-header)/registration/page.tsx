'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Controller, type FieldErrors, useForm } from 'react-hook-form';
import { apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import { BasicInfoFields } from '@/domain/registration/_components/BasicInfoFields';
import { ImageUploader } from '@/domain/registration/_components/ImageUploader';
import { TimeSlotsField } from '@/domain/registration/_components/TimeSlotsField';
import { useImageUpload } from '@/domain/registration/_hooks/useImageUpload';
import { buildRegistrationPayload } from '@/domain/registration/_utils/buildRegistrationPayload';
import { createEmptyTimeSlot, type TimeSlot } from '@/domain/registration/_utils/createEmptyTimeSlot';
import { validateRegistration } from '@/domain/registration/_utils/validateRegistration';

interface FormValues {
  title: string;
  category: string;
  description: string;
  price: string;
  address: string;
}

const CATEGORY_OPTIONS = [
  { label: '문화・예술', value: 'culture_or_art' },
  { label: '식음료', value: 'food_and_beverage' },
  { label: '스포츠', value: 'sport' },
  { label: '투어', value: 'tour' },
  { label: '관광', value: 'sightseeing' },
  { label: '웰빙', value: 'wellbeing' },
];

const MAX_IMAGE_COUNT = 4;

export default function RegistrationPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: '',
      address: '',
    },
  });

  const {
    images: bannerImages,
    handleUpload: handleUploadBannerImages,
    removeImage: handleRemoveBannerImage,
  } = useImageUpload(MAX_IMAGE_COUNT);

  const {
    images: introImages,
    handleUpload: handleUploadIntroImages,
    removeImage: handleRemoveIntroImage,
  } = useImageUpload(MAX_IMAGE_COUNT);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([createEmptyTimeSlot()]);

  const handleAddTimeSlot = () => { setTimeSlots(prev => [...prev, createEmptyTimeSlot()]); };
  const handleRemoveTimeSlot = (id: string) => { setTimeSlots(prev => prev.filter(slot => slot.id !== id)); };
  const handleChangeTimeSlot = (id: string, field: keyof Omit<TimeSlot, 'id'>, value: string) => {
    setTimeSlots(prev => prev.map(slot => (slot.id === id ? { ...slot, [field]: value } : slot)));
  };

  /**
   * ✅ 이미지 업로드 함수 (병렬 Promise.all)
   */
  const uploadImagesToServer = async (files: { file: File }[]): Promise<string[]> => {
    const uploads = files.map(({ file }) => {
      const formData = new FormData();

      formData.append('image', file);

      return apiFetch<{ activityImageUrl: string }>('/activities/image', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {},
      }).then((data: { activityImageUrl: string }) => data.activityImageUrl);
    });

    return Promise.all(uploads);
  };

  const onSubmit = async (formData: FormValues) => {
    const errorMessage = validateRegistration({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      address: formData.address,
      bannerCount: bannerImages.length,
      timeSlots,
    });

    if (errorMessage) {
      toast({ message: errorMessage, eventType: 'error' });

      return;
    }

    try {
      const [bannerUrls, introUrls] = await Promise.all([
        uploadImagesToServer(bannerImages),
        uploadImagesToServer(introImages),
      ]);

      const payload = buildRegistrationPayload({
        formData,
        bannerImageUrl: bannerUrls[0] ?? '',
        introImages: introUrls.map((src) => ({ src, id: 0 })),
        timeSlots,
      });

      await apiFetch('/activities', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      toast({ message: '체험 등록이 완료되었습니다.', eventType: 'success' });

      setTimeout(() => {
        if (document.referrer) {router.back();}
        else {router.push('/activities');}
      }, 700);
    } catch (error) {
      console.error("🔥 Upload error", error);
      toast({ message: '등록에 실패했습니다.', eventType: 'error' });
    }
  };

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    const firstKey = Object.keys(errors)[0] as keyof FormValues | undefined;

    if (firstKey) {
      const msg = (errors[firstKey]?.message as string) || '입력값을 확인해주세요.';

      toast({ message: msg, eventType: 'error' });
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-24">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">내 체험 등록</h1>
      </header>

      <form
        ref={formRef}
        className="flex flex-col gap-12 rounded-3xl bg-white px-6 py-8 md:px-10 md:py-12"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <BasicInfoFields control={control} register={register} setValue={setValue} categoryOptions={CATEGORY_OPTIONS} />

        <TimeSlotsField
          timeSlots={timeSlots}
          timeOptions={Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`)}
          onAdd={handleAddTimeSlot}
          onRemove={handleRemoveTimeSlot}
          onChange={handleChangeTimeSlot}
        />

        <ImageUploader
          title="배너 이미지 등록"
          description={`최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있어요.`}
          images={bannerImages}
          maxCount={MAX_IMAGE_COUNT}
          onUpload={handleUploadBannerImages}
          onRemove={handleRemoveBannerImage}
        />

        <ImageUploader
          title="소개 이미지 등록"
          description={`최대 ${MAX_IMAGE_COUNT}장까지 등록할 수 있어요.`}
          images={introImages}
          maxCount={MAX_IMAGE_COUNT}
          onUpload={handleUploadIntroImages}
          onRemove={handleRemoveIntroImage}
        />

        <div className="flex justify-center pt-4">
          <Button variant="primary" onClick={() => formRef.current?.requestSubmit()}>
            {isSubmitting ? '등록 중...' : '체험 등록하기'}
          </Button>
        </div>
      </form>
    </section>
  );
}
