import { getSession } from 'next-auth/react';
import { auth } from '@/app/api/auth/[...nextauth]/route';

export const SIGNIN_ENDPOINT = '/auth/login';
export const SIGNUP_ENDPOINT = '/users';
export const NEW_TOKEN_ENDPOINT = '/auth/tokens';
export const KAKAO_LOGOUT_URI = 'https://kapi.kakao.com/v1/user/logout';

export const KAKAO_SIGNIN_URI =
  'http://localhost:3000/api/kakao/signin/callback';
export const KAKAO_SIGNUP_URI =
  'http://localhost:3000/api/kakao/signup/callback';

const _KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

export async function getAuth() {
  if (typeof window === 'undefined') {
    return await auth();
  }

  return await getSession();
}
export const getKaKaoAuthroizeURL = (redirectURI: string) => {
  const queryString = new URLSearchParams({
    client_id: String(process.env.NEXT_PUBLIC_KAKAO_REST_API),
    redirect_uri: redirectURI,
    response_type: 'code',
  });

  return `${_KAKAO_AUTHORIZE_URL}/?${queryString}`;
};
