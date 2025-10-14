'use client';

import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import CardList from '@/components/cardList/CardList';
import { AlertModalContents } from '@/components/dialog';
import { ModalContainer } from '@/components/dialog/Modal/ModalContainer';
import { ReviewModalContents } from '@/components/dialog/Modal/ReviewModalContents';
import { useDialog } from '@/components/dialog/useDialog';
import type { StateType } from '@/components/stateBadge/type';
import mockData from '@/mocks/mockReservations.json';

const STATUSES = [
  '예약 승인',
  '예약 완료',
  '예약 취소',
  '예약 거절',
  '체험 완료',
];

const deleteAction = async () => {
  console.log('삭제 실행');
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  return { state: 'success' };
};

const closeReviewModalAction = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  return { state: 'close' };
};

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const { reservations, totalCount } = mockData;
  const hasReservations = Boolean(totalCount);

  const [deleteModalState, deleteModalFormAction, deleteModalIsPending] =
    useActionState(deleteAction, {
      state: ' ',
    });

  const cancelReservationDialog = useDialog();

  const [reviewModalState, reviewModalFormAction, reviewModalIsPending] =
    useActionState(closeReviewModalAction, { state: ' ' });
  const [rating, setRating] = useState<number>(0);
  const writeReviewDialog = useDialog();

  const onChangeReservation = () => {
    console.log('예약 변경');
  };

  const onCancelReservation = () => {
    cancelReservationDialog.openDialog();
  };

  useEffect(() => {
    if (reviewModalState.state === 'close') {
      console.log('모달 종료');
      setRating(0);
    }
  }, [reviewModalState.state]);

  return (
    <>
      <ModalContainer dialogRef={cancelReservationDialog.dialogRef}>
        <AlertModalContents
          message='예약을 취소하시겠어요?'
          confirmButtonText='취소하기'
          rejectButtonText='아니오'
          hideModal={cancelReservationDialog.hideDialog}
          confirmAction={deleteModalFormAction}
          isPending={deleteModalIsPending}
        />
      </ModalContainer>

      <main className='w-full'>
        <section className='pb-30'>
          <div className='mb-3 md:mb-7.5'>
            <h2 className='text-18 mb-2.5 font-bold text-gray-950'>예약내역</h2>
            <p className='text-gray-500'>
              예약내역 변경 및 취소할 수 있습니다.
            </p>
          </div>
          {hasReservations && (
            <div role='group' className='mb-3 flex gap-2 md:mb-7.5'>
              {STATUSES.map((status) => {
                const isSelected = selectedStatus === status;

                return (
                  <Button
                    key={status}
                    variant='filter'
                    style={isSelected ? 'accent' : 'default'}
                    classNames='w-[90px]'
                    onClick={() => {
                      setSelectedStatus(status);
                    }}
                  >
                    {status}
                  </Button>
                );
              })}
            </div>
          )}
          <div className='flex h-full flex-col gap-6 overflow-y-auto'>
            {hasReservations &&
              reservations.map((r) => {
                return (
                  <div key={r.id}>
                    <CardList
                      state={r.status as StateType}
                      title={r.activity.title}
                      date={r.date}
                      startTime={r.startTime}
                      endTime={r.endTime}
                      price={r.totalPrice}
                      capacity={10}
                      onChangeReservation={() => {
                        console.log('예약 변경');
                      }}
                      onCancelReservation={() => {
                        onCancelReservation();
                      }}
                      onWriteReview={() => {
                        writeReviewDialog.openDialog();
                      }}
                    />
                    <ModalContainer dialogRef={writeReviewDialog.dialogRef}>
                      <ReviewModalContents
                        title={r.activity.title}
                        date={r.date}
                        startTime={r.startTime}
                        endTime={r.endTime}
                        rating={rating}
                        formAction={deleteAction}
                        hideModal={writeReviewDialog.hideDialog}
                        isPending={reviewModalIsPending}
                        onChange={setRating}
                        onClose={reviewModalFormAction}
                      />
                    </ModalContainer>
                  </div>
                );
              })}
            {!hasReservations && (
              <div className='mt-2.5 flex flex-col'>
                <div className='flex items-center justify-center'>
                  <Image
                    src='/images/reservation_empty.png'
                    alt='empty'
                    width={122}
                    height={122}
                    className='mb-7.5'
                  />
                </div>
                <p className='text-18 mb-7.5 flex justify-center font-medium text-gray-600'>
                  아직 예약한 체험이 없어요
                </p>
                <div className='flex justify-center'>
                  <Button variant='primary' classNames='w-[182px]'>
                    둘러보기
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
