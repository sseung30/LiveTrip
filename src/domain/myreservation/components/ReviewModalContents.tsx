import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import { ApiError, apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import { toast } from '@/components/toast';
import { fetchRevalidateByTag } from '@/api/revalidate-fetch';

export interface ReviewModalContentsProps {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  rating: number;
  onRatingChange: (v: number) => void;
  text: string;
  onTextChange: (t: string) => void;
  placeholder?: string;
  formAction: (...args: unknown[]) => void;
  hideModal: () => void;
  isPending?: boolean;
}

export function ReviewModalContents({
  id,
  title,
  date,
  startTime,
  endTime,
  rating,
  placeholder = '체험에서 느낀 경험을 자유롭게 남겨주세요',
  onRatingChange,
  text,
  onTextChange,
  formAction,
  hideModal,
  isPending,
}: ReviewModalContentsProps) {
  const [inputCount, setInputCount] = useState<number>(0);

  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    onTextChange(e.target.value);
  };

  const onCloseModal = () => {
    hideModal();
    onTextChange('');
    onRatingChange(0);
  };

  const onClick = async () => {
    const body = { rating, content: text };

    try {
      const res = await apiFetch(`/my-reservations/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      await fetchRevalidateByTag(String(id));
      toast({ message: '후기가 작성되었습니다.', eventType: 'success' });
    } catch (error) {
      // 상태 코드별 처리
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400: {
            toast({
              message: 'content는 문자열로 입력해주세요.',
              eventType: 'error',
            });
            break;
          }
          case 401: {
            toast({ message: '로그인이 필요합니다.', eventType: 'error' });
            // 로그인 화면으로 이동
            break;
          }
          case 403: {
            toast({
              message: '본인의 예약만 리뷰를 작성할 수 있습니다.',
              eventType: 'error',
            });
          }
          case 404: {
            toast({ message: '존재하지 않는 예약입니다.', eventType: 'error' });
            break;
          }
          case 409: {
            toast({ message: '이미 처리된 요청입니다.', eventType: 'error' });
            break;
          }
          default: {
            toast({
              message: '알 수 없는 오류가 발생했습니다.',
              eventType: 'error',
            });
          }
        }
        console.error('후기 작성 실패:', error);
      } else {
        // 네트워크 단절·CORS 등 fetch 자체 예외
        toast({ message: '네트워크 오류가 발생했습니다.', eventType: 'error' });
        console.error('네트워크 예외:', error);
      }
    }
    onCloseModal();
  };

  /**
   * [1, 2, 3, 4, 5]
   */
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className='mx-auto w-82 md:w-96'>
      <div className='mb-7.5'>
        <div className='flex justify-end'>
          <button className='relative h-6 w-6' onClick={onCloseModal}>
            <Image
              fill
              alt='close'
              src='/icons/delete.svg'
              style={{ objectFit: 'cover' }}
            />
          </button>
        </div>
        <div className='flex flex-col'>
          <div className='text-16 mb-1.5 flex justify-center font-bold text-[#112211]'>
            {title}
          </div>
          <div className='text-14 mb-3.5 flex justify-center font-medium text-gray-500'>
            {date} / {startTime} ~ {endTime}
          </div>
        </div>
        <div className='flex justify-center gap-1.5 md:gap-3'>
          {stars.map((n) => {
            const filled = rating >= n;

            return (
              <div key={n}>
                <button
                  className='relative flex h-9 w-9 items-center md:h-10.5 md:w-10.5'
                  onClick={() => {
                    onRatingChange(n);
                  }}
                >
                  <Image
                    fill
                    alt=''
                    src={filled ? '/icons/star.svg' : '/icons/empty-star.svg'}
                    className='star-lg'
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
            value={text}
            onChange={onInputHandler}
          ></textarea>
          <div className='text-14 text-right font-medium text-gray-600'>
            {inputCount}/100
          </div>
        </div>
        <div>
          <Button variant='primary' classNames='w-full' onClick={onClick}>
            작성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
