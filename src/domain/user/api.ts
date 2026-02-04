import { ApiError, apiFetch } from '@/api/api';
import {
  type NewTokenResponse,
  newTokenResponseSchema,
  type SignInCredential,
  type SignInResponse,
  signInResponseSchema,
  type SignUpCredential,
} from '@/domain/user/schema';
import type {
  ProfileEditRequest,
  ProfileEditResponse,
  ProfileImageCreateResponse,
  SignUpResponse,
  UserInfo,
} from '@/domain/user/types';
import { authEndpoint } from '@/domain/user/utils/auth';

export async function getUserInfo(): Promise<UserInfo> {
  return await apiFetch(authEndpoint.USER_INFO);
}
export const getNewToken = async (
  refreshToken: string
): Promise<NewTokenResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${authEndpoint.NEW_TOKEN}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message);
  }
  const result = await res.json();

  return newTokenResponseSchema.parse(result);
};

// ====================================
// Authentication API Functions
// ====================================

export const mutateSignin = async (
  signinInputs: SignInCredential
): Promise<SignInResponse> => {
  const res = await apiFetch<SignInResponse>(authEndpoint.SIGNIN, {
    method: 'POST',
    body: JSON.stringify({
      ...signinInputs,
    }),
  });

  return signInResponseSchema.parse(res);
};

export const mutateSignup = async (
  signupInputs: SignUpCredential
): Promise<SignInResponse> => {
  await apiFetch<SignUpResponse>(authEndpoint.SIGNUP, {
    method: 'POST',
    body: JSON.stringify({
      ...signupInputs,
    }),
  });
  const signinInputs = {
    email: signupInputs.email,
    password: signupInputs.password,
  };

  const res = await mutateSignin(signinInputs);

  return res;
};

export const mutateKaKaoSignIn = async (
  token: string
): Promise<SignInResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_KAKAO_REST_API}${authEndpoint.KAKAO_SIGNIN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_SIGNIN_CALLBACK_URI}`,
        token,
      }),
    }
  );

  if (!res.ok && res.status === 403) {
    throw new ApiError(403, '카카오 로그인: 회원 정보가 없습니다');
  }

  const json = (await res.json()) as Promise<SignInResponse>;

  return json;
};

export const mutateKaKaoSignUp = async ({
  nickname,
  token,
}: {
  nickname: string;
  token: string;
}): Promise<SignInResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_KAKAO_REST_API}${authEndpoint.KAKAO_SIGNUP}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_CALLBACK_URI}`,
        token,
      }),
    }
  );

  if (!res.ok && res.status === 400) {
    throw new ApiError(400, '카카오 회원가입: 이미 등록된 사용자입니다');
  }

  const json = (await res.json()) as Promise<SignInResponse>;

  return json;
};

// ====================================
// Profile Management API Functions
// ====================================

export const mutateProfileEdit = async (
  profileEditRequest: ProfileEditRequest
): Promise<ProfileEditResponse> => {
  const res = await apiFetch<ProfileEditResponse>(authEndpoint.PROFILE_EDIT, {
    method: 'PATCH',
    body: JSON.stringify({
      ...profileEditRequest,
    }),
  });

  return res;
};

export const mutateProfileImageCreate = async (
  imageFile: File
): Promise<ProfileImageCreateResponse> => {
  const formData = new FormData();

  formData.append('image', imageFile);
  const res = await apiFetch<ProfileImageCreateResponse>(
    authEndpoint.PROFILE_IMAGE_CREATE,
    {
      method: 'POST',
      body: formData,
    }
  );

  return res;
};

// ====================================
// OAuth Utility Functions
// ====================================
