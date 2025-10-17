import { apiFetch } from '@/api/api';
import {
  type NewTokenResponse,
  newTokenResponseSchema,
  type SigninInputs,
  type SignInResponse,
  signinResponseSchema,
  type SignupInputs,
  type SignUpResponse,
} from '@/domain/auth/type';

const SIGNIN_ENDPOINT = '/auth/login';
const SIGNUP_ENDPOINT = '/users';
const NEW_TOKEN_ENDPOINT = '/auth/tokens';

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
