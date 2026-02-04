import type z from 'zod';
import type {
  newTokenResponseSchema,
  profileEditFormSchema,
  signInCredentialSchema,
  signInFormSchema,
  signInResponseSchema,
  signUpCredentialSchema,
  signUpFormSchema,
} from '@/domain/user/schema';

// ====================================
// Authentication Types
// ====================================

export type SignInFormData = z.infer<typeof signInFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export type SignInCredential = z.infer<typeof signInCredentialSchema>;
export type SignUpCredential = z.infer<typeof signUpCredentialSchema>;

export type SignInResponse = z.infer<typeof signInResponseSchema>;
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

export type ProfileEditFormInputs = z.infer<typeof profileEditFormSchema>;
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
