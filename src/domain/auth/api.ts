import { ApiError, apiFetch } from '@/api/api';
import {
  type NewTokenResponse,
  newTokenResponseSchema,
  type SigninInputs,
  type SignInResponse,
  signinResponseSchema,
  type SignupInputs,
  type SignUpResponse,
} from '@/domain/auth/type';
import {
  KAKAO_LOGOUT_URI,
  NEW_TOKEN_ENDPOINT,
  SIGNIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from '@/domain/auth/util';

export async function fetchNewToken(
  refreshToken: string
): Promise<NewTokenResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${NEW_TOKEN_ENDPOINT}`,
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
  const res = await apiFetch<SignInResponse>(SIGNIN_ENDPOINT, {
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
  await apiFetch<SignUpResponse>(SIGNUP_ENDPOINT, {
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
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/sign-in/kakao`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/oauth/sign-up/kakao`,
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
  const json = await res.json();

  return json as Promise<SignInResponse>;
};

// export const mutateKaKaoLogout = async ({}) => {
//   const auth = await getAuth();
//   const res = await fetch(KAKAO_LOGOUT_URI, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${auth?.accessToken}`,
//     },
//     body: JSON.stringify({}),
//   });
// };
