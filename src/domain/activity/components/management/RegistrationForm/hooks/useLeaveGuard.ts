'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import { useDialog } from '@/components/dialog/useDialog';

/**
 * Registration/도메인: 페이지 이탈 가드 훅
 * - 새로고침/탭 닫기(beforeunload)
 * - 브라우저 뒤로가기(popstate)
 * - 임의의 내비게이션을 가드하는 guardLeave(action)
 *
 * 사용법
 * const { guardLeave, LeaveModal } = useLeaveGuard(isDirty)
 * <button onClick={() => guardLeave(() => router.back())}>뒤로</button>
 * {LeaveModal} // 폼 JSX 마지막에 렌더
 */
export function useLeaveGuard(isDirty: boolean) {
  const router = useRouter();
  const { dialogRef, openDialog, hideDialog } = useDialog();
  const pendingRef = useRef<null | (() => void)>(null);
  const bypassOnceRef = useRef(false);
  const allowLeaveRef = useRef(false);
  // isDirty가 true가 되는 최초 시점에 한 번만 pushState를 추가하기 위한 플래그
  const pushedOnceRef = useRef(false);

  const openConfirm = useCallback(
    (action?: () => void) => {
      pendingRef.current = action ?? null;
      openDialog();
    },
    [openDialog]
  );

  const onCancel = useCallback(() => {
    pendingRef.current = null;
    hideDialog();
  }, [hideDialog]);

  const onConfirm = useCallback(() => {
    // 모달 닫기 + 가드 1회 우회 플래그 설정
    pendingRef.current = null;
    hideDialog();
    bypassOnceRef.current = true;
    allowLeaveRef.current = true;

    if (typeof window !== 'undefined') {
      window.location.assign('/myactivities');
    } else {
      router.replace('/myactivities');
    }
  }, [hideDialog, router]);

  // 새로고침/탭 닫기
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      // dirty가 아니거나, 허용 플래그가 있으면 경고 띄우지 않음
      if (!isDirty || allowLeaveRef.current) {
        return;
      }
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [isDirty]);

  // 단순 버전: isDirty가 되는 순간 히스토리에 현재 주소를 1번만 추가해
  // 첫 뒤로가기를 popstate에서 안정적으로 가로챈다
  useEffect(() => {
    if (!isDirty) {
      pushedOnceRef.current = false;

      return;
    }
    if (!pushedOnceRef.current) {
      window.history.pushState(null, '', window.location.href);
      pushedOnceRef.current = true;
    }
  }, [isDirty]);

  // 뒤로가기(간단 가드): popstate에서 현재 주소를 다시 push하여 이동 취소 후 모달 표시
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      if (!isDirty) {
        return;
      }
      if (bypassOnceRef.current) {
        bypassOnceRef.current = false;

        return;
      }
      e.preventDefault();
      window.history.pushState(null, '', window.location.href);
      openConfirm(() => {
        window.history.back();
      });
    };

    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
    };
  }, [isDirty, openConfirm]);

  const guardLeave = useCallback(
    (action: () => void) => {
      if (!isDirty) {
        action();
      } else {
        openConfirm(action);
      }
    },
    [isDirty, openConfirm]
  );

  return { guardLeave, dialogRef, onConfirm, onCancel };
}
