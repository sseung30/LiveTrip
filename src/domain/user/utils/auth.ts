export const KAKAO_LOGOUT_URI = 'https://kauth.kakao.com/oauth/logout';
export const authEndpoint = {
  SIGNIN: '/auth/login',
  USER_INFO: '/users/me',
  SIGNUP: '/users',
  NEW_TOKEN: '/auth/tokens',
  PROFILE_EDIT: '/users/me',
  PROFILE_IMAGE_CREATE: '/users/me/image',
  KAKAO_SIGNIN: '/oauth/sign-in/kakao',
  KAKAO_SIGNUP: '/oauth/sign-up/kakao',
};
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
