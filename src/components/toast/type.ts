import type { SpringValue } from '@react-spring/web';

export interface ToastType {
  message: string;
  eventType: 'success' | 'error';
}
export interface ToastComponentProps extends ToastType {
  index: number;
  deleteToastByIndex: (index: number) => void;
  style: {
    opacity: SpringValue<number>;
    scale: SpringValue<number>;
  };
}
