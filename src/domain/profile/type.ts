import type { SessionType } from 'next-auth';
import type { UserInfo } from '@/domain/auth/type';

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
export interface ProfileEditRequest {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}
export type ProfileEditResponse = UserInfo;
