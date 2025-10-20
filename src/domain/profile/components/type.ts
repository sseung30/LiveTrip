import type { SessionType } from 'next-auth';

export interface ProfileEditFormInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
export interface ProfileEditFormProps {
  nickname: string;
  email: string;
  sessionType: SessionType;
}
