'use client';
import Image from 'next/image';
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
import { toast } from '@/components/toast';
import { deleteActivityAction } from '@/domain/myactivities/actions/delete-activity.action';

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
    useActionState(deleteActivityAction, {
      status: 'idle',
      message: '',
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
    if (deleteModalState.status === 'success' && deleteModalState.message) {
      toast({ message: deleteModalState.message, eventType: 'success' });
    }
    if (deleteModalState.status === 'error' && deleteModalState.message) {
      toast({ message: deleteModalState.message, eventType: 'error' });
    }
  }, [deleteModalState]);

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
