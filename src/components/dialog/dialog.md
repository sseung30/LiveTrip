# Dialog 컴포넌트 사용 가이드

이 문서는 HTML `<dialog>` 엘리먼트를 기반으로 한 모달 컴포넌트들의 사용법을
설명합니다.

## 개요

Dialog 컴포넌트들은 useDialog, Container, Contents로 이루어집니다.

- **`useDialog`**: dialog 엘리먼트를 관리하는 커스텀 훅

- **`ModalContainer`**: 모달 창의 기본 컨테이너 컴포넌트 (Provider 패턴)
- **모달 컨텐츠 컴포넌트들**: 실제 모달 내용을 담는 컴포넌트들 (예:
  `AlertModalContents`)

- **`BottomSheetContainer`**: 하단에서 올라오는 바텀 시트 컨테이너 컴포넌트

## 1. useDialog 훅

### 1.1. 기본 사용법

```typescript
import useDialog from '@/components/dialog/useDialog';

export default function MyComponent() {
  const { dialogRef, openDialog, hideDialog, isOpen } = useDialog();
  // ...
}
```

### 1.2. 반환값

- **`dialogRef`**: HTMLDialogElement에 대한 ref 객체
- **`openDialog`**: dialog를 여는 함수 (`showModal()` 호출)
- **`hideDialog`**: dialog를 닫는 함수 (`close()` 호출)
- **`isOpen`**: dialog의 열림 여부 React 상태

## 2. ModalContainer 컴포넌트

`ModalContainer`는 Provider 패턴으로 설계되어 모달의 기본 구조와 동작을
제공하고, 그 안에 다양한 모달 컨텐츠를 감쌀 수 있습니다. 모달 컨텐츠는 미리
만들어진 컴포넌트(예: `AlertModalContents`)를 사용하거나, 페이지 컴포넌트에서
직접 JSX를 작성하여 구현할 수 있습니다.

### 2.1. Props

- **`dialogRef`**: useDialog에서 반환된 ref 객체
- **`onClose?`**: 모달이 닫힐 때 호출되는 콜백 함수 (선택사항)
- **`classNames?`**: 추가 CSS 클래스명 (선택사항)
- **`children`**: 모달 내부에 렌더링될 컨텐츠

### 2.2. 특징

- 배경 클릭 시 자동으로 모달이 닫힘
- 기본 스타일링 제공 (둥근 모서리, 그림자, 배경 오버레이 등)
- 화면 중앙에 위치

## 3. AlertModalContents 예시

사용자 확인이 필요한 경고 모달을 구현할 때 사용합니다.

### 3.1. 사용 예시

```jsx
'use client';
import { useActionState } from 'react';
import Modal from '@/components/dialog/ModalContainer';
import AlertModalContents from '@/components/dialog/ModalContents/AlertModalContents';
import useDialog from '@/components/dialog/useDialog';

const deleteAction = async () => {
  // 삭제 로직 실행
  console.log('삭제 실행');
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { state: 'success' };
};

export default function DeleteConfirmModal() {
  const [state, formAction, isPending] = useActionState(deleteAction, {
    state: '',
  });
  const { dialogRef, openDialog, hideDialog } = useDialog();

  return (
    <>
      <Modal dialogRef={dialogRef}>
        <AlertModalContents
          message='정말로 이 항목을 삭제하시겠습니까?'
          confirmButtonText='삭제'
          rejectButtonText='취소'
          hideModal={hideDialog}
          confirmAction={formAction}
          isPending={isPending}
        />
      </Modal>

      <button onClick={openDialog} className='bg-red-500 px-4 py-2 text-white'>
        삭제
      </button>
    </>
  );
}
```

### 3.2. 서버 액션과의 통합

AlertModalContents는 React의 `useActionState`와 함께 사용하도록 설계되었습니다:

1. **서버 액션 정의**: 실제 비즈니스 로직을 처리하는 비동기 함수
2. **useActionState 사용**: 액션의 상태와 pending 상태를 관리
3. **isPending으로 로딩 상태 표시**: 버튼에 스피너 표시 및 비활성화

## 4. BottomSheetContainer 컴포넌트

BottomSheetContainer는 고정된 스타일을 사용하며, 내부 컨텐츠의 스타일링은
children 함수 내에서 자유롭게 구현할 수 있습니다.

`BottomSheetContainer`는 모바일 친화적인 바텀 시트 UI를 제공하는 컴포넌트입니다.
`useDialog` 훅과 함께 사용하며, 부드러운 애니메이션과 직관적인 드래그 제스처를
지원합니다.

### 4.1. 특징

- 하단에서 위로 슬라이드되며 나타나는 애니메이션
- 드래그 제스처로 시트를 아래로 끌어내려 닫을 수 있음
- 일정 임계값(100px) 이상 드래그 시 자동으로 닫힘
- 배경(backdrop) 클릭 시 시트가 닫힘
- react-spring과 @use-gesture/react를 활용한 부드러운 인터랙션

### 4.2. 사용 예시

```jsx
'use client';
import BottomSheetContainer from '@/components/dialog/BottomSheetContainer';
import useDialog from '@/components/dialog/useDialog';

export default function MyBottomSheet() {
  const { dialogRef, openDialog, hideDialog, isOpen } = useDialog();

  return (
    <>
      <BottomSheetContainer
        dialogRef={dialogRef}
        isOpen={isOpen}
        hideDialog={hideDialog}
        onClose={() => console.log('바텀 시트 닫힘')}
      >
        {({ closeDialog }) => (
          <div>
            <h2>바텀 시트 제목</h2>
            <p>여기에 내용을 작성합니다.</p>
            <button onClick={closeDialog}>닫기</button>
          </div>
        )}
      </BottomSheetContainer>

      <button onClick={openDialog}>바텀 시트 열기</button>
    </>
  );
}
```

## 5. 스타일링 커스터마이징

Container의 기본 스타일을 변경하려면 `classNames` prop을 사용합니다:

```jsx
<ModalContainer
  dialogRef={dialogRef}
  classNames='bg-gray-100 border-2 border-blue-500'
>
  {/* 내용 */}
</ModalContainer>
```

## 6. 문제해결

### 모달이 열리지 않을 때

- `dialogRef`가 제대로 전달되었는지 확인
- 컴포넌트가 클라이언트 컴포넌트인지 확인

### classNames prop에 스타일링이 적용되지 않을 때

- ModalContainer에서 미리 정의한 tailwind class가 있을 수 있음, 덮어쓰는 것을
  고려해야함.
