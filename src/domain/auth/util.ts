export const SIGNIN_ENDPOINT = '/auth/login';
export const USER_INFO_ENDPINT = '/users/me';
export const SIGNUP_ENDPOINT = '/users';
export const NEW_TOKEN_ENDPOINT = '/auth/tokens';
export const KAKAO_LOGOUT_URI = 'https://kauth.kakao.com/oauth/logout';
export const getKaKaoAuthroizeURL = (redirectURI: string) => {
  const _KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

  const queryString = new URLSearchParams({
    client_id: String(process.env.NEXT_PUBLIC_KAKAO_REST_API),
    redirect_uri: redirectURI,
    response_type: 'code',
  });

  return `${_KAKAO_AUTHORIZE_URL}?${queryString}`;
};
export const getKaKaoLogoutURL = () => {
  const queryString = new URLSearchParams({
    client_id: String(process.env.NEXT_PUBLIC_KAKAO_REST_API),
    logout_redirect_uri: String(
      process.env.NEXT_PUBLIC_KAKAO_LOGOUT_CALLBACK_URI
    ),
  });

  return `${KAKAO_LOGOUT_URI}?${queryString}`;
};
