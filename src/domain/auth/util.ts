export const SIGNIN_ENDPOINT = '/auth/login';
export const SIGNUP_ENDPOINT = '/users';
export const NEW_TOKEN_ENDPOINT = '/auth/tokens';
export const KAKAO_LOGOUT_URI = 'https://kapi.kakao.com/v1/user/logout';

export const getKaKaoAuthroizeURL = (redirectURI: string) => {
  const _KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

  const queryString = new URLSearchParams({
    client_id: String(process.env.NEXT_PUBLIC_KAKAO_REST_API),
    redirect_uri: redirectURI,
    response_type: 'code',
  });

  return `${_KAKAO_AUTHORIZE_URL}/?${queryString}`;
};
