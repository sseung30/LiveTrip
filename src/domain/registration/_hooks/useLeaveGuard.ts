'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import ConfirmModal from '@/components/dialog/Modal/ConfirmModal';
import { ModalContainer } from '@/components/dialog/Modal/ModalContainer';
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

const openConfirm = useCallback((action?: () => void) => {
pendingRef.current = action ?? null;
openDialog();
}, [openDialog]);

const onCancel = useCallback(() => {
pendingRef.current = null;
hideDialog();
}, [hideDialog]);

const onConfirm = useCallback(() => {
const act = pendingRef.current;

pendingRef.current = null;
hideDialog();
if (act) {act();}
else {router.back();}
}, [hideDialog, router]);

// 새로고침/탭 닫기
useEffect(() => {
const beforeUnload = (e: BeforeUnloadEvent) => {
if (!isDirty) {return;}
e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
e.returnValue = '';
};

window.addEventListener('beforeunload', beforeUnload);

return () => { window.removeEventListener('beforeunload', beforeUnload); };
}, [isDirty]);

// 뒤로가기
useEffect(() => {
const onPop = (e: PopStateEvent) => {
if (!isDirty) {return;}
e.preventDefault();
window.history.pushState(null, '', window.location.href);
openConfirm(() => { router.back(); });
};

window.history.pushState(null, '', window.location.href);
window.addEventListener('popstate', onPop);

return () => { window.removeEventListener('popstate', onPop); };
}, [isDirty, openConfirm, router]);

const guardLeave = useCallback((action: () => void) => {
if (!isDirty) {action();}
else {openConfirm(action);}
}, [isDirty, openConfirm]);

return { guardLeave, dialogRef, onConfirm, onCancel };
}

