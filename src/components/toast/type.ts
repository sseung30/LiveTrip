export interface ToastType {
  message: string;
  eventType: 'success' | 'error';
}
export interface ToastComponentProps extends ToastType {
  index: number;
  deleteToastByIndex: (index: number) => void;
}
