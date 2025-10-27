import Image from 'next/image';
import type { CardListProps } from '@/components/cardList/type';
import StateBadge from '@/components/stateBadge/StateBadge';

const BUTTON_STYLES = {
  change:
    'rounded-lg border border-gray-50 bg-white font-medium text-gray-600 hover:bg-gray-50',
  cancel:
    'rounded-lg border border-gray-50 bg-gray-50 font-medium text-gray-600 hover:bg-[#FCECEA] hover:text-[#F96767]',
  review:
    'bg-primary-500 hover:bg-primary-600 rounded-lg font-medium text-white',
} as const;

export default function CardList({
  state,
  title,
  date,
  startTime,
  endTime,
  price,
  capacity,
  thumbnailUrl = '/images/sample_img.png',
  onChangeReservation,
  onCancelReservation,
  onWriteReview,
}: CardListProps) {
  const showActionButtons = state === 'pending';
  const showReviewButton = state === 'completed';
  const timeRange = `${startTime} - ${endTime}`;
  const formattedPrice = `₩${price.toLocaleString()}`;

  return (
    <>
      <div className='relative hidden h-[200px] w-[640px] md:flex'>
        <div className='relative z-10 flex h-full w-[400px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_0_16px_rgba(0,0,0,0.1)]'>
          <div className='flex flex-col gap-2'>
            <div className='w-fit'>
              <StateBadge state={state} />
            </div>
            <h3 className='text-lg font-bold text-gray-900'>{title}</h3>
            <p className='text-base text-gray-600'>
              {date} · {timeRange}
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                {formattedPrice}
              </span>
              <span className='text-base text-gray-600'>{capacity}명</span>
            </div>

            {showActionButtons && (
              <div className='flex gap-2'>
                <button
                  className={`${BUTTON_STYLES.change} px-3 py-1.5 text-base`}
                  onClick={onChangeReservation}
                >
                  예약 변경
                </button>
                <button
                  className={`${BUTTON_STYLES.cancel} px-3 py-1.5 text-base`}
                  onClick={onCancelReservation}
                >
                  예약 취소
                </button>
              </div>
            )}

            {showReviewButton && (
              <button
                className={`${BUTTON_STYLES.review} px-4 py-1.5 text-base`}
                onClick={onWriteReview}
              >
                후기 작성
              </button>
            )}
          </div>
        </div>

        <div className='relative -ml-28 h-full w-[280px] overflow-hidden rounded-[2rem]'>
          <Image
            fill
            alt={title}
            src={thumbnailUrl}
            className='object-cover'
            sizes='280px'
          />
        </div>
      </div>

      <div className='hidden w-[476px] flex-col gap-4 sm:flex md:hidden'>
        <p className='text-base font-bold text-gray-800'>{date}</p>

        <div className='relative flex h-[168px]'>
          <div className='relative z-10 flex w-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.09)]'>
            <div className='flex flex-col gap-2'>
              <div className='w-fit'>
                <StateBadge state={state} />
              </div>
              <h3 className='text-lg font-bold text-gray-900'>{title}</h3>
              <p className='text-base text-gray-600'>{timeRange}</p>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-lg font-bold text-gray-900'>
                {formattedPrice}
              </span>
              <span className='text-base text-gray-600'>{capacity}명</span>
            </div>
          </div>

          <div className='relative -ml-20 h-full w-[216px] overflow-hidden rounded-3xl'>
            <Image
              fill
              alt={title}
              src={thumbnailUrl}
              className='object-cover'
              sizes='216px'
            />
          </div>
        </div>

        {showActionButtons && (
          <div className='flex gap-2'>
            <button
              className={`${BUTTON_STYLES.change} w-[234px] py-2 text-base`}
              onClick={onChangeReservation}
            >
              예약 변경
            </button>
            <button
              className={`${BUTTON_STYLES.cancel} w-[234px] py-2 text-base`}
              onClick={onCancelReservation}
            >
              예약 취소
            </button>
          </div>
        )}

        {showReviewButton && (
          <button
            className={`${BUTTON_STYLES.review} w-[476px] py-2 text-base`}
            onClick={onWriteReview}
          >
            후기 작성
          </button>
        )}
      </div>

      <div className='flex w-[327px] flex-col gap-3 sm:hidden'>
        <p className='text-sm font-bold text-gray-800'>{date}</p>

        <div className='relative flex h-[136px]'>
          <div className='relative z-10 flex w-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-[0_0_15px_rgba(0,0,0,0.09)]'>
            <div className='flex flex-col gap-1'>
              <div className='w-fit'>
                <StateBadge state={state} className='px-2 py-1 text-xs' />
              </div>
              <h3 className='text-sm font-bold text-gray-900'>{title}</h3>
              <p className='text-xs text-gray-600'>{timeRange}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-sm font-bold text-gray-900'>
                {formattedPrice}
              </span>
              <span className='text-xs text-gray-600'>{capacity}명</span>
            </div>
          </div>

          <div className='relative -ml-15 h-full w-[147px] overflow-hidden rounded-2xl'>
            <Image
              fill
              alt={title}
              src={thumbnailUrl}
              className='object-cover'
              sizes='147px'
            />
          </div>
        </div>

        {showActionButtons && (
          <div className='flex gap-2'>
            <button
              className={`${BUTTON_STYLES.change} w-[159.5px] py-1.5 text-sm`}
              onClick={onChangeReservation}
            >
              예약 변경
            </button>
            <button
              className={`${BUTTON_STYLES.cancel} w-[159.5px] py-1.5 text-sm`}
              onClick={onCancelReservation}
            >
              예약 취소
            </button>
          </div>
        )}

        {showReviewButton && (
          <button
            className={`${BUTTON_STYLES.review} w-[327px] py-1.5 text-sm`}
            onClick={onWriteReview}
          >
            후기 작성
          </button>
        )}
      </div>
    </>
  );
}
