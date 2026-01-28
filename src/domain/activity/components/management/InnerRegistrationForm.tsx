import { useFormContext } from 'react-hook-form';
import Button from '@/components/button/Button';
import { ModalContainer } from '@/components/dialog/Modal/ModalContainer';
import { BasicInfoFields } from '@/domain/activity/components/management/BasicInfoFields';
import ClientConfirmModal from '@/domain/activity/components/management/ClientConfirmModal';
import { useBannerImageUpload } from '@/domain/activity/components/management/hooks/useBannerImageUpload';
import { useIntroImageUpload } from '@/domain/activity/components/management/hooks/useIntroImageUpload';
import { useLeaveGuard } from '@/domain/activity/components/management/hooks/useLeaveGuard';
import { ImageUploader } from '@/domain/activity/components/management/ImageUploader';
import { TimeSlotsField } from '@/domain/activity/components/management/TimeSlotsField';

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

export default function InnerRegistrationForm({
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

  const isUploadingAny = isBannerUploading || isIntroUploading;

  //모달 훅
  const { formState } = useFormContext();
  const { dialogRef, onConfirm, onCancel } = useLeaveGuard(formState.isDirty);

  const getSubmitButtonMessage = () => {
    if (isUploadingAny) {
      return '업로드 중...';
    }

    if (isSubmitting) {
      return mode === 'edit' ? '수정 중...' : '등록 중...';
    }

    return mode === 'edit' ? '수정하기' : '등록하기';
  };

  return (
    <form
      ref={formRef}
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(onSubmit, onInvalid)} // ✅ react-hook-form submit 연결
    >
      <BasicInfoFields categoryOptions={CATEGORY_OPTIONS} />

      <TimeSlotsField
        timeSlots={timeSlots}
        timeOptions={Array.from(
          { length: 48 },
          (_, i) =>
            `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`
        )}
        onAdd={onAddTimeSlot}
        onRemove={onRemoveTimeSlot}
        onChange={onChangeTimeSlot}
      />

      {/* ✅ 배너 이미지 */}
      <ImageUploader
        required
        title='배너 이미지 등록'
        description='최대 1장까지 등록할 수 있어요.'
        images={bannerImage ? [bannerImage] : []}
        maxCount={MAX_IMAGE_COUNT_BANNER}
        inputId='banner-image-upload'
        onUpload={handleUploadBanner}
        onRemove={() => {
          removeBanner();
        }}
      />

      {/* ✅ 소개 이미지 */}
      <ImageUploader
        required
        title='소개 이미지 등록'
        description='최대 4장까지 등록할 수 있어요.'
        images={introImages}
        maxCount={MAX_IMAGE_COUNT_INTRO}
        inputId='intro-images-upload'
        onUpload={handleUploadIntro}
        onRemove={removeIntro}
      />

      <div className='mt-8 flex justify-center'>
        <Button
          type='submit'
          variant='primary'
          disabled={isUploadingAny || isSubmitting}
          classNames='w-[120px] !text-white text-14 font-bold md:text-14'
        >
          {getSubmitButtonMessage()}
        </Button>
      </div>

      <ModalContainer dialogRef={dialogRef} onClose={onCancel}>
        <ClientConfirmModal
          message={`저장되지 않았습니다.\n 정말 뒤로 가시겠습니까?`}
          cancelText='아니오'
          confirmText='네'
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </ModalContainer>
    </form>
  );
}
