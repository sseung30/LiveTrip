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

export const fetchNewToken = async (
  refreshToken: string
): Promise<NewTokenResponse> => {
  try {
    const res = await apiFetch<NewTokenResponse>(NEW_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        _retry: 'true',
      },
    });

    return newTokenResponseSchema.parse(res);
  } catch (error) {
    throw new Error('Refresh token expired');
  }
};
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
