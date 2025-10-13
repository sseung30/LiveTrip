import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface SignupInputs {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}
export interface SigninInputs {
  email: string;
  password: string;
}
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SignUpResponse = User;

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface KaKaoAuthButtonProps {
  text: string;
}

export interface mutateSigninParams {
  signinInputs: SigninInputs;
  router: AppRouterInstance;
}
export interface mutateSignupParams {
  signupInputs: SignupInputs;
  router: AppRouterInstance;
}
