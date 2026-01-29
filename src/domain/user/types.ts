import z from 'zod';
import {
  nickNameRegex,
  passwordRegex,
} from '@/domain/user/constants/register-key';

// ====================================
// Authentication Types
// ====================================

export const signupInputSchema = z.object({
  email: z.email(),
  nickname: z
    .string()
    .min(4, '4자 이상 입력하세요')
    .max(12, '12자 이하로 입력하세요')
    .regex(nickNameRegex),
  password: z.string().min(8).max(20).regex(passwordRegex),
  confirmPassword: z.string().min(8).max(20).regex(passwordRegex),
  type: z.string(),
});

export const signinInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20).regex(passwordRegex),
  type: z.string().optional(),
});

export const signinResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    profileImageUrl: z.union([z.string(), z.null()]),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const newTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type SigninInputs = z.infer<typeof signinInputSchema>;
export type SignupInputs = z.infer<typeof signupInputSchema>;
export type SignInResponse = z.infer<typeof signinResponseSchema>;
export type NewTokenResponse = z.infer<typeof newTokenResponseSchema>;

// ====================================
// User Information Types
// ====================================

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SignUpResponse = UserInfo;

// ====================================
// Profile Management Types
// ====================================

export interface ProfileEditRequest {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}

export interface ProfileEditResponse extends UserInfo {}

export interface ProfileEditFormInputs {
  profileImageFile: FileList | null;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileImageCreateResponse {
  profileImageUrl: string;
}

// ====================================
// OAuth Types
// ====================================

export interface KaKaoAuthButtonProps {
  text: string;
  kakaoUri: string;
}

export interface KaKaoAuthConfig {
  clientId: string;
  redirectUri: string;
  scope?: string;
}

export interface KaKaoAuthResponse {
  code: string;
  state?: string;
}
