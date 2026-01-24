import { ApiError, apiFetch, BASE_URL } from '@/api/api';
import {
  type NewTokenResponse,
  newTokenResponseSchema,
  type ProfileEditRequest,
  type ProfileEditResponse,
  type ProfileImageCreateResponse,
  type SigninInputs,
  type SignInResponse,
  signinResponseSchema,
  type SignupInputs,
  type SignUpResponse,
  type UserInfo,
} from '@/domain/auth/type';
import { endpoint } from '@/domain/auth/util';
import { getAuth } from '@/utils/getAuth';

export async function getUserInfo(): Promise<UserInfo> {
  return await apiFetch(endpoint.USER_INFO);
}
export async function getNewToken(
  refreshToken: string
): Promise<NewTokenResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint.NEW_TOKEN}`,
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
}

export const mutateSignin = async (
  signinInputs: SigninInputs
): Promise<SignInResponse> => {
  const res = await apiFetch<SignInResponse>(endpoint.SIGNIN, {
    method: 'POST',
    body: JSON.stringify({
      ...signinInputs,
    }),
  });

  return signinResponseSchema.parse(res);
};
export const mutateSignup = async (
  signupInputs: SignupInputs
): Promise<SignInResponse> => {
  await apiFetch<SignUpResponse>(endpoint.SIGNUP, {
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
  const res = await fetch(`${BASE_URL}${endpoint.KAKAO_SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_SIGNIN_CALLBACK_URI}`,
      token,
    }),
  });

  if (!res.ok && res.status === 403) {
    throw new ApiError(403, '카카오 로그인: 회원 정보가 없습니다');
  }

  const json = res.json() as Promise<SignInResponse>;

  return json;
};
export const mutateKaKaoSignUp = async ({
  nickname,
  token,
}: {
  nickname: string;
  token: string;
}): Promise<SignInResponse> => {
  const res = await fetch(`${BASE_URL}${endpoint.KAKAO_SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_SIGNUP_CALLBACK_URI}`,
      token,
    }),
  });

  if (!res.ok && res.status === 400) {
    throw new ApiError(400, '카카오 회원가입: 이미 등록된 사용자입니다');
  }
  const json = await res.json();

  return json as Promise<SignInResponse>;
};

export const mutateProfileEdit = async (
  profileEditRequest: ProfileEditRequest
): Promise<ProfileEditResponse> => {
  const res = await apiFetch<ProfileEditResponse>(endpoint.PROFILE_EDIT, {
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
    endpoint.PROFILE_IMAGE_CREATE,
    {
      method: 'POST',
      body: formData,
    }
  );

  return res;
};
