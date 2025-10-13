import { apiFetch } from '@/api/api';
import { toast } from '@/components/toast';
import type {
  mutateSigninParams,
  mutateSignupParams,
  SignInResponse,
  SignUpResponse,
} from '@/domain/auth/type';

const SIGNIN_ENDPOINT = '/auth/login';
const SIGNUP_ENDPOINT = '/users';

export const mutateSignin = async ({
  signinInputs,
  router,
}: mutateSigninParams) => {
  try {
    const { accessToken, refreshToken, user } = await apiFetch<SignInResponse>(
      SIGNIN_ENDPOINT,
      {
        method: 'POST',
        body: JSON.stringify({
          ...signinInputs,
        }),
      }
    );

    router.push('/');
  } catch (error) {
    if (error instanceof Error) {
      toast({ message: error.message, eventType: 'error' });
    }
  }
};
export const mutateSignup = async ({
  signupInputs,
  router,
}: mutateSignupParams) => {
  try {
    const user = await apiFetch<SignUpResponse>(SIGNUP_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        ...signupInputs,
      }),
    });
    const signinInputs = {
      email: signupInputs.email,
      password: signupInputs.password,
    };

    await mutateSignin({ signinInputs, router });
  } catch (error) {
    if (error instanceof Error) {
      toast({ message: error.message, eventType: 'error' });
    }
  }
};
