import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  className?: string;
}
