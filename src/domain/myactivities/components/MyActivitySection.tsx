'use client';
import Image from 'next/image';
import Button from '@/components/button/Button';
import { useActionState, useEffect, useRef, useState } from 'react';
import ActivitiyCard from '@/domain/myactivities/components/ActivityCard';
import type { Activity } from '@/domain/myactivities/type';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import {
  AlertModalContents,
  ModalContainer,
  useDialog,
} from '@/components/dialog';
import { useMyActivities } from '@/domain/myactivities/hooks/useMyActivities';
import { deleteMyActivity } from '@/domain/myactivities/api';
import { toast } from '@/components/toast';

const deleteAction = async (
  prevState: { state: string },
  formData: FormData
) => {
  const raw = formData.get('activityId');
  const id = Number(raw);

  if (Number.isNaN(id)) {
    return { state: 'error' };
  }

  const result = await deleteMyActivity(id);

  if (!result.ok) {
    switch (result.status) {
      case 400:
        toast({
          message: '신청 예약이 있는 체험은 삭제할 수 없습니다.',
          eventType: 'error',
        });
        break;
      case 401:
        toast({ message: '로그인이 필요합니다.', eventType: 'error' });
        break;
      case 403:
        toast({
          message: '본인의 체험만 삭제할 수 있습니다.',
          eventType: 'error',
        });
        break;
      case 404:
        toast({ message: '존재하지 않는 체험입니다.', eventType: 'error' });
        break;
      default:
        toast({
          message: '알 수 없는 오류가 발생했습니다.',
          eventType: 'error',
        });
    }
    return { state: 'error' };
  }

  toast({ message: '체험이 삭제되었습니다', eventType: 'success' });
  return { state: 'success' };
};

export default function MyActivitySection() {
  const {
    activities,
    totalCount,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMyActivities();

  const hasActivities = Boolean(totalCount);

  const deleteDialog = useDialog();
  const [deleteModalState, deleteModalFormAction, deleteModalIsPending] =
    useActionState(deleteAction, {
      state: 'idle',
    });

  const [targetId, setTargetId] = useState<number | null>(null);

  const onDeleteActivity = (id: number) => {
    setTargetId(id);
    deleteDialog.openDialog();
  };

  const handleConfirmDelete = async () => {
    if (!targetId) {
      return;
    }
    const formData = new FormData();

    formData.set('activityId', String(targetId));
    deleteModalFormAction(formData);
    deleteDialog.hideDialog();
  };

  useEffect(() => {
    if (deleteModalState.state !== 'success') {
      return;
    }
  }, [deleteModalState]);

  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
          내 체험 관리 로딩 중입니다.
        </p>
        <div className='flex justify-center'></div>
      </div>
    );
  }

  return (
    <>
      <ModalContainer dialogRef={deleteDialog.dialogRef}>
        <AlertModalContents
          message='체험을 삭제하시겠어요?'
          confirmButtonText='삭제하기'
          rejectButtonText='아니오'
          hideModal={deleteDialog.hideDialog}
          confirmAction={handleConfirmDelete}
          isPending={deleteModalIsPending}
        />
      </ModalContainer>
      <div
        ref={containerRef}
        className='scrollbar-hide flex h-200 flex-col gap-6 overflow-y-auto'
      >
        {hasActivities &&
          activities.map((a: Activity) => {
            return (
              <div key={a.id}>
                <ActivitiyCard
                  id={a.id}
                  title={a.title}
                  rating={a.rating}
                  reviewCount={a.reviewCount}
                  price={a.price}
                  bannerImageUrl={a.bannerImageUrl}
                  onDelete={() => onDeleteActivity(a.id)}
                />
              </div>
            );
          })}
        {hasActivities && hasNextPage && <div ref={loader} />}
        {!hasActivities && (
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
              아직 생성한 체험이 없어요
            </p>
            <div className='flex justify-center'></div>
          </div>
        )}
      </div>
    </>
  );
}
