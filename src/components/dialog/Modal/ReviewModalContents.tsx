import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import Button from '@/components/button/Button';

export interface ReviewModalContentsProps {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  rating: number;
  onChange: (v: number) => void;
  placeholder?: string;
  onClose?: (...args: unknown[]) => void;
  formAction: (...args: unknown[]) => void;
  hideModal: () => void;
  isPending?: boolean;
}

export function ReviewModalContents({
  title,
  date,
  startTime,
  endTime,
  rating,
  placeholder = '체험에서 느낀 경험을 자유롭게 남겨주세요',
  onClose,
  onChange,
  formAction,
  hideModal,
  isPending,
}: ReviewModalContentsProps) {
  const [inputCount, setInputCount] = useState<number>(0);

  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className='mx-auto w-82 md:w-96'>
      <div className='mb-7.5'>
        <div className='flex justify-end'>x</div>
        <div className='flex flex-col'>
          <div className='text-16 mb-1.5 flex justify-center font-bold text-[#112211]'>
            {title}
          </div>
          <div className='text-14 mb-3.5 flex justify-center font-medium text-gray-500'>
            {date} / {startTime} ~ {endTime}
          </div>
        </div>
        <div className='flex justify-center'>
          {stars.map((n) => {
            // const minusRating = rating >= Number(star.id.split('-')[1]);

            const filled = rating >= n;

            return (
              <div key={n}>
                <button
                  onClick={() => {
                    // setRating(Number(star.id.split('-')[1]));
                    onChange(n);
                    console.log(rating);
                    console.log(n);
                    console.log(filled);
                    console.log('\n');
                  }}
                >
                  <Image
                    alt=''
                    src={filled ? '/icons/star.svg' : '/icons/empty-star.svg'}
                    className='star-lg'
                    width={36}
                    height={36}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className='mb-7.5'>
          <h2 className='text-18 mb-4 font-bold text-gray-950'>
            소중한 경험을 들려주세요
          </h2>
          <textarea
            placeholder={placeholder}
            maxLength={100}
            className='h-49 w-full resize-none items-start rounded-xl border border-gray-100 px-4 pt-4'
            onChange={onInputHandler}
          ></textarea>
          <div className='text-14 text-right font-medium text-gray-600'>
            {inputCount}/100
          </div>
        </div>
        <div>
          <Button variant='primary' classNames='w-full'>
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
