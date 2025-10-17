import { useDaumPostcodePopup } from 'react-daum-postcode';
import { type Control, Controller, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import Input from '@/components/ui/Input/Input';

interface FormValues {
  title: string;
  category: string;
  description: string;
  price: string;
  address: string;
}

interface BasicInfoFieldsProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  categoryOptions: { label: string; value: string }[];
}
export function BasicInfoFields({ control, register, setValue, categoryOptions }: BasicInfoFieldsProps) {
  const openPostcode = useDaumPostcodePopup();

  const handleAddressSelect = (data: unknown) => {
    const d = data as { roadAddress?: string; jibunAddress?: string };
    const fullAddress = d.roadAddress || d.jibunAddress || "";

    setValue("address", fullAddress, { shouldValidate: true });
  };

  return (
    <>
      {/* 제목 */}
      <Controller
        name="title"
        control={control}
        rules={{ required: '제목은 필수입니다.' }}
        render={({ field }) => 
          { return <Input
            label="제목"
            placeholder="제목을 입력해 주세요"
            className="w-full"
            value={field.value}
            onChange={field.onChange}
          /> }
        }
      />

      {/* 카테고리 */}
      <Controller
        name="category"
        control={control}
        rules={{ required: '카테고리는 필수입니다.' }}
        render={({ field }) => 
          { return <SelectDropdown
            label="카테고리"
            options={categoryOptions}
            placeholder="카테고리를 선택해 주세요"
            defaultValue={field.value || undefined}
            onSelect={field.onChange}
          /> }
        }
      />

      {/* 설명 */}
      <div className="flex flex-col gap-3">
        <textarea
          className="min-h-[180px] w-full rounded-3xl border border-gray-100 bg-white px-5 py-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="체험에 대한 설명을 입력해 주세요"
          {...register('description', { required: '설명은 필수입니다.' })}
        />
      </div>

      {/* 가격 */}
      <Controller
        name="price"
        control={control}
        rules={{
          required: '가격은 필수입니다.',
          validate: (v) => (!Number.isNaN(Number(v)) && Number(v) > 0) || '가격은 0보다 큰 숫자여야 합니다.',
        }}
        render={({ field }) => 
          { return <Input
            label="가격"
            placeholder="체험 금액을 입력해 주세요"
            type="number"
            className="w-full"
            value={field.value}
            onChange={field.onChange}
          /> }
        }
      />

      {/* ✅ 주소 */}
        <Controller
    name="address"
    control={control}
    rules={{ required: '주소는 필수입니다.' }}
    render={({ field }) => 
        { return <label className="flex flex-col w-full text-sm font-medium text-gray-900">
        주소
        <div className="flex gap-2 mt-2">
            <input
            {...field}
            readOnly
            className="flex-1 h-[54px] rounded-xl border px-4 bg-gray-50"
            placeholder="주소를 검색해 주세요"
            />
            <button
            type="button"
            className="w-28 bg-gray-100 rounded-xl"
            onClick={() => openPostcode({ onComplete: handleAddressSelect })}
            >
            주소 검색
            </button>
        </div>
        </label> }
    }
    />
    </>
  );
}