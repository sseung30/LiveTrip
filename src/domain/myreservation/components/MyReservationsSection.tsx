'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import Button from '@/components/button/Button';
import {
  AlertModalContents,
  ModalContainer,
  useDialog,
} from '@/components/dialog';
import CategoryIcon from '@/components/icons/CategoryIcon';
import { toast } from '@/components/toast';
import EmptyResult from '@/components/ui/EmptyResult';
import { cancelReservation } from '@/domain/myreservation/api';
import CardList from '@/domain/myreservation/components/CardList';
import { ReviewModalContents } from '@/domain/myreservation/components/ReviewModalContents';
import { useMyReservations } from '@/domain/myreservation/hooks/useMyReservations';
import type { Reservation } from '@/domain/myreservation/type';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const STATUSES = [
  '예약 신청',
  '예약 완료',
  '예약 취소',
  '예약 거절',
  '체험 완료',
];

const STATUS_OBJ = {
  '모든 예약': 'default',
  '예약 신청': 'pending',
  '예약 완료': 'confirmed',
  '예약 취소': 'canceled',
  '예약 거절': 'declined',
  '체험 완료': 'completed',
};

const deleteAction = async (
  prevState: { state: string },
  formData: FormData
) => {
  const raw = formData.get('reservationId');
  const id = Number(raw);

  if (Number.isNaN(id)) {
    return { state: 'error' };
  }

  const result = await cancelReservation(id);

  if (!result.ok) {
    toast({ message: '예약 취소에 실패했습니다.', eventType: 'error' });

    return { state: 'error' };
  }

  toast({ message: '예약이 취소되었습니다', eventType: 'success' });

  return { state: 'success' };
};

const ReviewModalAction = async () => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1500);
  // });

  return { state: 'success' };
};

export default function MyReservationsSection() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // #68 후기 모달 컴포넌트 하나만 배치
  const [reservation, setReservation] = useState<Reservation>();

  const cancelDialog = useDialog();
  const [deleteModalState, deleteModalFormAction, deleteModalIsPending] =
    useActionState(deleteAction, {
      state: 'idle',
    });

  const reviewDialog = useDialog();
  const [, reviewModalFormAction, reviewModalIsPending] = useActionState(
    ReviewModalAction,
    { state: ' ' }
  );

  const [rating, setRating] = useState<number>(0);
  const [inputText, setInputText] = useState<string>();

  const [targetId, setTargetId] = useState<number | null>(null);

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

  useEffect(() => {
    if (deleteModalState.state !== 'success') {
      return;
    }
  }, [deleteModalState]);

  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    reservationList,
    hasReservations,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMyReservations();

  const { loader } = useIntersectionObserver({
    loading: isFetchingNextPage,
    hasMore: hasNextPage,
    setPage,
    rootRef: containerRef,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (page > 0) {
      fetchNextPage();
    }
  }, [page, fetchNextPage]);

  const filteredReservations = useMemo(() => {
    if (!selectedStatus) {
      return reservationList;
    }
    const code = STATUS_OBJ[selectedStatus as keyof typeof STATUS_OBJ];

    return reservationList.filter((r) => r.status === code);
  }, [reservationList, selectedStatus]);

  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className='mt-7.5 flex flex-col'>
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
          예약내역 로딩 중입니다.
        </p>
        <div className='flex justify-center'></div>
      </div>
    );
  }

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
            id={reservation.id}
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

      <section className='verflow-auto [&::-webkit-scrollbar]:hidden'>
        {/* 필터 버튼 랜더링 */}
        {hasReservations && (
          <div role='group' className='mb-3 flex gap-2 md:mb-7.5'>
            <Button
              variant='filter'
              style={selectedStatus === null ? 'default' : 'accent'}
              classNames='w-14'
              onClick={() => {
                setSelectedStatus(null);
              }}
            >
              <CategoryIcon />
            </Button>
            {STATUSES.map((status) => {
              const isSelected = selectedStatus === status;

              return (
                <Button
                  key={status}
                  variant='filter'
                  style={isSelected ? 'default' : 'accent'}
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
        <div
          ref={containerRef}
          className='flex h-200 flex-col gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden'
        >
          {hasReservations &&
            filteredReservations.map((r: Reservation) => {
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
                    reviewSubmitted={r.reviewSubmitted}
                    thumbnailUrl={r.activity.bannerImageUrl}
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
          {hasReservations && hasNextPage && <div ref={loader} />}

          {!hasReservations && (
            <EmptyResult text={'아직 예약한 체험이 없어요'} />
          )}
        </div>
      </section>
    </>
  );
}
