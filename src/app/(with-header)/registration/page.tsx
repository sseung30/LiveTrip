'use client';

import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
  useRef,
  useState,
} from 'react';
import Button from '@/components/button/Button';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import Input from '@/components/ui/Input/Input';

interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface UploadedImage {
  id: string;
  src: string;
}

const CATEGORY_OPTIONS = [
  { label: '문화・예술', value: 'culture_or_art' },
  { label: '식음료', value: 'food_and_beverage' },
  { label: '스포츠', value: 'sport' },
  { label: '투어', value: 'tour' },
  { label: '관광', value: 'sightseeing' },
];

const MAX_IMAGE_COUNT = 

const TIME_OPTIONS = Array.from({ length: 24 * 2 }, (_, index) => {
  const hour = Math.floor(index / 2)
    .toString()
    .padStart(2, '0');
  const minute = index % 2 === 0 ? '00' : '30';

  return `${hour}:${minute}`;
});q1qwerty   q1wtyu7i8`1234365rfcv `

const textAreaClass =
  'min-h-[180px] w-full rounded-3xl border border-gray-100 bg-white px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

const selectClass =
  'w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

const readFileAsDataURL = (file: File) =>
  { return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => { resolve(reader.result as string); };
    reader.onerror = () => { reject(reader.error); };
    reader.readAsDataURL(file);
  }) };

export default function RegistrationPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    createEmptyTimeSlot(),
  ]);

  const [bannerImages, setBannerImages] = useState<UploadedImage[]>([
    { id: 'banner-sample-1', src: '/images/sample_img.png' },
    { id: 'banner-sample-2', src: '/images/sample_thumbnail.png' },
  ]);
  const [introImages, setIntroImages] = useState<UploadedImage[]>([
    { id: 'intro-sample-1', src: '/images/sample_thumbnail.png' },
    { id: 'intro-sample-2', src: '/images/sample_img.png' },
    { id: 'intro-sample-3', src: '/images/sample_thumbnail.png' },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    value: string,
  ) => {
    setTimeSlots((prev) =>
      { return prev.map((slot) =>
        { return slot.id === id
          ? {
              ...slot,
              [field]: value,
            }
          : slot },
      ) },
    );
  };

  const createUploadHandler =
    (setImages: Dispatch<SetStateAction<UploadedImage[]>>) =>
    { return async (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (!files?.length) {
        return;
      }

      try {
        const dataUrls = await Promise.all(
          [...files].map((file) => readFileAsDataURL(file)),
        );

        setImages((prev) => {
          const availableCount = MAX_IMAGE_COUNT - prev.length;

          if (availableCount <= 0) {
            return prev;
          }

          const imagesToAdd = dataUrls.slice(0, availableCount).map((src) => { return {
            id: `${Date.now()}-${Math.random()}`,
            src,
          } });

          return [...prev, ...imagesToAdd];
        });
      } catch (error) {
        console.error('이미지 업로드에 실패했습니다.', error);
      } finally {
        event.target.value = '';
      }
    } };

  const handleUploadBannerImages = createUploadHandler(setBannerImages);
  const handleUploadIntroImages = createUploadHandler(setIntroImages);

  const handleRemoveBannerImage = (id: string) => {
    setBannerImages((prev) => prev.filter((image) => image.id !== id));
  };

  const handleRemoveIntroImage = (id: string) => {
    setIntroImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 pb-24">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">내 체험 등록</h1>
      </header>

      <form
        ref={formRef}
        className="flex flex-col gap-12 rounded-3xl bg-white px-6 py-8 md:px-10 md:py-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <Input
            label="제목"
            placeholder="제목을 입력해 주세요"
            value={title}
            className="w-full"
            onChange={setTitle}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-900">카테고리</label>
            <SelectDropdown
              width="100%"
              options={CATEGORY_OPTIONS}
              placeholder="카테고리를 선택해 주세요"
              defaultValue={category || undefined}
              onSelect={setCategory}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-900">설명</label>
            <textarea
              className={textAreaClass}
              placeholder="체험에 대한 설명을 입력해 주세요"
              value={description}
              onChange={(event) => { setDescription(event.target.value); }}
            />
          </div>

          <Input
            label="가격"
            placeholder="체험 금액을 입력해 주세요"
            type="number"
            value={price}
            className="w-full"
            onChange={setPrice}
          />

          <Input
            label="주소"
            placeholder="주소를 입력해 주세요"
            value={address}
            className="w-full"
            onChange={setAddress}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">예약 가능한 시간대</h2>
            <p className="text-sm text-gray-500">
              날짜
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {timeSlots.map((slot, index) => 
              { return <div
                key={slot.id}
                className="flex flex-col gap-3 rounded-2xl p-4 md:flex-row md:items-center md:gap-4"
              >
                <div className="relative w-full md:w-48">
                  <input
                    type="date"
                    className={`${selectClass} pr-12`}
                    value={slot.date}
                    onChange={(event) =>
                      { handleChangeTimeSlot(slot.id, 'date', event.target.value); }
                    }
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <CalendarIcon />
                  </span>
                </div>

                <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center">
                  <select
                    className={selectClass}
                    value={slot.startTime}
                    onChange={(event) =>
                      { handleChangeTimeSlot(slot.id, 'startTime', event.target.value); }
                    }
                  >
                    <option disabled value="">
                      시작 시간
                    </option>
                    {TIME_OPTIONS.map((time) => 
                      { return <option key={`start-${time}`} value={time}>
                        {time}
                      </option> }
                    )}
                  </select>

                  <span className="hidden text-gray-300 md:block">-</span>

                  <select
                    className={selectClass}
                    value={slot.endTime}
                    onChange={(event) =>
                      { handleChangeTimeSlot(slot.id, 'endTime', event.target.value); }
                    }
                  >
                    <option disabled value="">
                      종료 시간
                    </option>
                    {TIME_OPTIONS.map((time) => 
                      { return <option key={`end-${time}`} value={time}>
                        {time}
                      </option> }
                    )}
                  </select>
                </div>

                <div className="flex justify-end md:justify-center">
                  {index === 0 ? (
                    <RoundIconButton ariaLabel="시간대 추가" onClick={handleAddTimeSlot}>
                      <PlusIcon />
                    </RoundIconButton>
                  ) : (
                    <RoundIconButton
                      ariaLabel="시간대 삭제"
                      variant="neutral"
                      onClick={() => { handleRemoveTimeSlot(slot.id); }}
                    >
                      <MinusIcon />
                    </RoundIconButton>
                  )}
                </div>
              </div> }
            )}
          </div>
        </div>

        <ImageUploader
          title="배너 이미지 등록"
          description="최대 4장까지 등록할 수 있어요."
          images={bannerImages}
          onUpload={handleUploadBannerImages}
          onRemove={handleRemoveBannerImage}
        />

        <ImageUploader
          title="소개 이미지 등록"
          description="최대 4장까지 등록할 수 있어요."
          images={introImages}
          onUpload={handleUploadIntroImages}
          onRemove={handleRemoveIntroImage}
        />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            size="lg"
            state="active"
            width={320}
            height={56}
            onClick={() => formRef.current?.requestSubmit()}
          >
            등록하기
          </Button>
        </div>
      </form>
    </section>
  );
}

function createEmptyTimeSlot(): TimeSlot {
  return {
    id: `${Date.now()}-${Math.random()}`,
    date: '',
    startTime: '',
    endTime: '',
  };
}

function RoundIconButton({
  children,
  onClick,
  ariaLabel,
  variant = 'primary',
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  variant?: 'primary' | 'neutral';
}) {
  const baseClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border transition';
  const variantClass =
    variant === 'primary'
      ? 'border-primary-100 bg-white text-primary-500 hover:bg-primary-100'
      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50';

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`${baseClass} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ImageUploader({
  title,
  description,
  images,
  onUpload,
  onRemove,
}: {
  title: string;
  description: string;
  images: UploadedImage[];
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  onRemove: (id: string) => void;
}) {
  const [inputId] = useState(
    () => `image-uploader-${Date.now()}-${Math.random()}`,
  );

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <label
          className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-200 bg-gray-25 text-center text-sm text-gray-500 transition hover:border-primary-100 hover:text-primary-500"
          htmlFor={inputId}
        >
          <UploadIcon />
          <span>
            {images.length}/{MAX_IMAGE_COUNT}
          </span>
        </label>

        {images.map((image) => 
          { return <figure
            key={image.id}
            className="relative h-28 w-28 overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src={image.src}
              alt="업로드된 이미지"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              onClick={() => { onRemove(image.id); }}
            >
              <CloseIcon />
            </button>
          </figure> }
        )}
      </div>

      <input
        multiple
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
      />
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="14"
        height="13"
        rx="2"
        stroke="#7A7A80"
        strokeWidth="1.5"
      />
      <path d="M3 8H17" stroke="#7A7A80" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6.5 2.5V5.5"
        stroke="#7A7A80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 2.5V5.5"
        stroke="#7A7A80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3.33325V12.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.33398 8H12.6673"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33398 8H12.6673"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="1.5"
        width="25"
        height="25"
        rx="12.5"
        stroke="#C7C8CF"
        strokeWidth="1.5"
      />
      <path
        d="M14 9V19"
        stroke="#7A7A80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 14H19"
        stroke="#7A7A80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
