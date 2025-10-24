'use client';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import { apiFetch } from '@/api/api';
import Button from '@/components/button/Button';
import CardList from '@/components/cardList/CardList';
import {
  AlertModalContents,
  ModalContainer,
  useDialog,
} from '@/components/dialog';
import { ReviewModalContents } from '@/components/dialog/Modal/ReviewModalContents';
import { toast } from '@/components/toast';
import type { MyReservations, Reservation } from '@/domain/myreservations/type';

interface MyReservationsSectionProps {
  hasReservations: boolean;
  reservations: Reservation[];
}

const STATUSES = [
  '예약 신청',
  '예약 완료',
  '예약 취소',
  '예약 거절',
  '체험 완료',
];

const deleteAction = async (
  prevState: { state: string },
  formData: FormData
) => {
  const raw = formData.get('reservationId');
  const id = Number(raw);

  if (Number.isNaN(id)) {
    return { state: 'error' };
  }

  const body = { status: 'canceled' };

  try {
    await apiFetch(`/my-reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    toast({ message: '예약이 취소되었습니다', eventType: 'success' });
  } catch (error) {
    console.error('error', error);
  }

  return { state: 'success' };
};

const ReviewModalAction = async () => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1500);
  // });

  return { state: 'success' };
};

export default function MyReservationsSection({
  hasReservations,
  reservations,
}: MyReservationsSectionProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // #68 후기 모달 컴포넌트 하나만 배치
  const [reservation, setReservation] = useState<Reservation>();

  const cancelDialog = useDialog();
  const [deleteModalState, deleteModalFormAction, deleteModalIsPending] =
    useActionState(deleteAction, {
      state: 'idle',
    });

  const reviewDialog = useDialog();
  const [reviewModalState, reviewModalFormAction, reviewModalIsPending] =
    useActionState(ReviewModalAction, { state: ' ' });

  const [rating, setRating] = useState<number>(0);
  const [inputText, setInputText] = useState<string>();

  const onChangeReservation = () => {
    console.log('예약 변경');
  };

  const [targetId, setTargetId] = useState<number | null>(null);

  const [list, setList] = useState<Reservation[]>(reservations);

  useEffect(() => {
    if (deleteModalState.state === 'success') {
      (async () => {
        const fresh = await apiFetch<MyReservations>('/my-reservations', {
          method: 'GET',
        });

        setList(fresh.reservations);
        // state 변경
        deleteModalState.state = 'idle';
      })();
    }
  }, [deleteModalState]);

  const onCancelReservation = (id: number) => {
    setTargetId(id);
    cancelDialog.openDialog();
  };

  const handleConfirmCancel = async () => {
    if (!targetId) {
      return;
    }
    const formData = new FormData();

    formData.set('reservationId', String(targetId));
    deleteModalFormAction(formData);
    cancelDialog.hideDialog();
  };

  const onCloseModalContainer = () => {
    setRating(0);
    setInputText('');
  };

  return (
    <>
      <ModalContainer dialogRef={cancelDialog.dialogRef}>
        <AlertModalContents
          message='예약을 취소하시겠어요?'
          confirmButtonText='취소하기'
          rejectButtonText='아니오'
          hideModal={cancelDialog.hideDialog}
          confirmAction={handleConfirmCancel}
          isPending={deleteModalIsPending}
        />
      </ModalContainer>

      {/* #68 후기 모달 컴포넌트 하나만 배치 */}
      <ModalContainer
        dialogRef={reviewDialog.dialogRef}
        onClose={onCloseModalContainer}
      >
        {reservation && (
          <ReviewModalContents
            title={reservation.activity.title}
            date={reservation.date}
            startTime={reservation.startTime}
            endTime={reservation.endTime}
            rating={rating}
            formAction={reviewModalFormAction}
            hideModal={reviewDialog.hideDialog}
            isPending={reviewModalIsPending}
            text={inputText ?? ''}
            onRatingChange={setRating}
            onTextChange={setInputText}
          />
        )}
      </ModalContainer>

      <section className='pb-30'>
        {/* 필터 버튼 랜더링 */}
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
            list.map((r: Reservation) => {
              // 여기서 list.map 쓰면 에러남 is not function
              // 처음에 응답으로 오는 건 배열, 객체 안의,... 객체 형태로...
              // 객체 안에는, map 이 없음

              return (
                <div key={r.id}>
                  <CardList
                    state={r.status}
                    title={r.activity.title}
                    date={r.date}
                    startTime={r.startTime}
                    endTime={r.endTime}
                    price={r.totalPrice}
                    capacity={10}
                    onChangeReservation={() => {
                      onChangeReservation();
                    }}
                    onCancelReservation={() => {
                      onCancelReservation(r.id);
                    }}
                    onWriteReview={() => {
                      reviewDialog.openDialog();
                      setReservation(r); // #68 후기 모달 컴포넌트 하나만 배치
                    }}
                  />
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
    </>
  );
}
