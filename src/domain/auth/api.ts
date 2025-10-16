import { apiFetch } from '@/api/api';
import {
  type SigninInputs,
  type SignInResponse,
  signinResponseSchema,
  type SignupInputs,
  type SignUpResponse,
} from '@/domain/auth/type';

const SIGNIN_ENDPOINT = '/auth/login';
const SIGNUP_ENDPOINT = '/users';

export const mutateSignin = async (signinInputs: SigninInputs) => {
  try {
    const res = await apiFetch<SignInResponse>(SIGNIN_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        ...signinInputs,
      }),
    });

    return signinResponseSchema.parse(res);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
export const mutateSignup = async (signupInputs: SignupInputs) => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
