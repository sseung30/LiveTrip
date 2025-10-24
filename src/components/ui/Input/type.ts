import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputProps 
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  autoComplete?: string;
  className?: string;
}
