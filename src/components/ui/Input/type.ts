export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  className?: string;
}
