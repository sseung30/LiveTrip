'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetContainer } from '@/components/dialog/BottomSheet/BottomSheetContainer';
import ConfirmModal from '@/components/dialog/Modal/ConfirmModal';
import { ModalContainer } from '@/components/dialog/Modal/ModalContainer';
import { useDialog } from '@/components/dialog/useDialog';
import SelectDropdown from '@/components/dropdown/SelectDropdown';
import ReservationCard from '@/components/reservationPopup/ReservationCard';
import type {
  ReservationPopupProps,
  ReservationStatusType,
} from '@/components/reservationPopup/type';

const TAB_CONFIG: Record<ReservationStatusType, { label: string }> = {
  pending: { label: '신청' },
  confirmed: { label: '승인' },
  declined: { label: '거절' },
};

export default function ReservationPopup({
  isOpen,
  onClose,
  position,
  date,
  schedules,
  reservations,
  onApprove,
  onReject,
}: ReservationPopupProps) {
  const [activeTab, setActiveTab] = useState<ReservationStatusType>('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null
  );
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'approve' | 'reject';
    id: number;
  } | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dialogRef, hideDialog } = useDialog();
  const {
    dialogRef: confirmDialogRef,
    openDialog: openConfirmDialog,
    hideDialog: hideConfirmDialog,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  } = useDialog();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    setIsBottomSheet(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsBottomSheet(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isOpen && isBottomSheet && dialogRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      dialogRef.current.showModal();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else if (!isOpen && isBottomSheet && dialogRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      dialogRef.current.close();
    }
  }, [isOpen, isBottomSheet, dialogRef]);

  const reservationsByStatus = useMemo(() => {
    const pending = reservations.filter((r) => r.status === 'pending');
    const confirmed = reservations.filter((r) => r.status === 'confirmed');
    const declined = reservations.filter((r) => r.status === 'declined');

    return {
      pending,
      confirmed,
      declined,
      counts: {
        pending: pending.length,
        confirmed: confirmed.length,
        declined: declined.length,
      },
    };
  }, [reservations]);

  const scheduleOptions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return schedules.map((schedule) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        label: `${schedule.startTime} - ${schedule.endTime}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value: String(schedule.scheduleId),
      };
    });
  }, [schedules]);

  const filteredReservations =
    selectedScheduleId !== null ? reservationsByStatus[activeTab] : [];

  const handleApprove = (id: number) => {
    setConfirmAction({ type: 'approve', id });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    openConfirmDialog();
  };

  const handleReject = (id: number) => {
    setConfirmAction({ type: 'reject', id });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    openConfirmDialog();
  };

  const handleConfirm = () => {
    if (!confirmAction) {
      return;
    }

    if (confirmAction.type === 'approve') {
      onApprove?.(confirmAction.id);
    } else {
      onReject?.(confirmAction.id);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    hideConfirmDialog();
    setConfirmAction(null);
  };

  const handleCancel = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    hideConfirmDialog();
    setConfirmAction(null);
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      setSelectedScheduleId(null);
    }
  }, [isOpen, date]);

  useEffect(() => {
    if (!isOpen || isBottomSheet) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        // eslint-disable-next-line
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isBottomSheet]);

  if (!isOpen) {
    return null;
  }

  const formatDate = (d: Date) => {
    const year = d.getFullYear().toString().slice(2);
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const renderContent = (closeHandler?: () => void) => {
    return (
      <>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-gray-900'>
            {formatDate(date)}
          </h2>
          <button
            type='button'
            className='text-gray-400 hover:text-gray-600'
            onClick={closeHandler || onClose}
          >
            ✕
          </button>
        </div>

        <div
          className={`mb-6 flex border-b border-gray-200 ${isBottomSheet ? '' : 'gap-6'}`}
        >
          {(Object.keys(TAB_CONFIG) as ReservationStatusType[]).map((key) => {
            return (
              <button
                key={key}
                type='button'
                className={`relative pb-3 text-base font-medium transition-colors ${
                  activeTab === key ? 'text-primary-500' : 'text-gray-400'
                } ${isBottomSheet ? 'flex-1' : ''}`}
                onClick={() => {
                  setActiveTab(key);
                }}
              >
                {TAB_CONFIG[key].label} {reservationsByStatus.counts[key]}
                {activeTab === key && (
                  <div className='bg-primary-500 absolute bottom-0 left-0 h-0.5 w-full' />
                )}
              </button>
            );
          })}
        </div>

        <div
          className={
            isBottomSheet
              ? 'space-y-4 md:flex md:gap-4 md:space-y-0'
              : 'space-y-4'
          }
        >
          <div className={isBottomSheet ? 'w-full md:flex-1' : ''}>
            <h3 className='mb-2 text-base font-semibold text-gray-900'>
              예약 시간
            </h3>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {scheduleOptions.length > 0 && (
              <div className={isBottomSheet ? 'w-full' : ''}>
                <SelectDropdown
                  key={selectedScheduleId}
                  width={isBottomSheet ? 450 : 302}
                  options={scheduleOptions}
                  placeholder='예약 시간을 선택하세요'
                  defaultValue={
                    selectedScheduleId !== null
                      ? selectedScheduleId.toString()
                      : undefined
                  }
                  onSelect={(value) => {
                    setSelectedScheduleId(Number(value));
                  }}
                />
              </div>
            )}
          </div>

          <div className={isBottomSheet ? 'w-full md:flex-1' : ''}>
            <h3 className='mb-2 text-base font-semibold text-gray-900'>
              예약 내역
            </h3>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
            {filteredReservations.length > 0 && (
              <div className='space-y-3'>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */}
                {filteredReservations.map((reservation) => {
                  return (
                    <ReservationCard
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                      key={reservation.id}
                      reservation={reservation}
                      activeTab={activeTab}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  if (isBottomSheet) {
    return (
      <>
        <BottomSheetContainer
          isOpen={isOpen}
          dialogRef={dialogRef}
          hideDialog={hideDialog}
          onClose={onClose}
        >
          {({ closeDialog }) => renderContent(closeDialog as () => void)}
        </BottomSheetContainer>
        <ModalContainer dialogRef={confirmDialogRef}>
          <ConfirmModal
            confirmText={confirmAction?.type === 'approve' ? '승인' : '거절'}
            cancelText='취소'
            message={
              confirmAction?.type === 'approve'
                ? '이 예약을 승인하시겠습니까?'
                : '이 예약을 거절하시겠습니까?'
            }
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </ModalContainer>
      </>
    );
  }

  return (
    <>
      <div
        ref={popupRef}
        className='absolute z-[100] w-[350px] overflow-visible rounded-2xl bg-white p-6 shadow-2xl'
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
        }}
      >
        {renderContent()}
      </div>
      <ModalContainer dialogRef={confirmDialogRef}>
        <ConfirmModal
          confirmText={confirmAction?.type === 'approve' ? '승인' : '거절'}
          cancelText='취소'
          message={
            confirmAction?.type === 'approve'
              ? '이 예약을 승인하시겠습니까?'
              : '이 예약을 거절하시겠습니까?'
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </ModalContainer>
    </>
  );
}
