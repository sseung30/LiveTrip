import type { SessionType } from 'next-auth';

export interface ProfileEditFormProps {
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  sessionType: SessionType;
}
export interface ProfileEditFormInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
