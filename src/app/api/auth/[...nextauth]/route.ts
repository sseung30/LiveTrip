/* eslint-disable require-atomic-updates */
import { jwtDecode } from 'jwt-decode';
import NextAuth, {
  type AuthValidity,
  type BackendJWT,
  CredentialsSignin,
  type DecodedJWT,
  type EditSessionRequest,
  type Session,
  type User,
} from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { ApiError } from '@/api/api';
import {
  fetchNewToken,
  mutateKaKaoSignIn,
  mutateKaKaoSignUp,
  mutateSignin,
  mutateSignup,
} from '@/domain/auth/api';
import { signinInputSchema, signupInputSchema } from '@/domain/auth/type';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}
// 카카오 회원가입 필요 에러 (403)를 별도 처리
export class KakaoSigninRequiredError extends CredentialsSignin {
  code = 'KAKAO_SIGNUP_REQUIRED';
  constructor() {
    super('카카오 회원가입이 필요합니다');
    this.code = 'KAKAO_SIGNUP_REQUIRED';
  }
}
export class KakaoAlreadySignupError extends CredentialsSignin {
  code = 'KAKAO_SIGNUP_ALREADY_REGISTERED';
  constructor() {
    super('이미 등록된 사용자 입니다');
    this.code = 'KAKAO_SIGNUP_ALREADY_REGISTERED';
  }
}
export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const res = await _sign(credentials);

          const tokens: BackendJWT = {
            access: res.accessToken,
            refresh: res.refreshToken,
          };

          const access: DecodedJWT = {
            ...jwtDecode(tokens.access),
          };
          const refresh: DecodedJWT = {
            ...jwtDecode(tokens.refresh),
          };

          const validity: AuthValidity = {
            validUntil: access.exp,
            refreshUntil: refresh.exp,
          };
          const user = {
            id: res.user.id,
            nickname: res.user.nickname,
            email: res.user.email,
            profileImageUrl: res.user.profileImageUrl,
            password: credentials.password,
          };
          const isKakao = user.email.split('@')[1].includes('kakao.com');
          const type = isKakao ? 'kakao' : 'normal';

          return {
            refreshId: refresh.id,
            tokens,
            user,
            type,
            validity,
          } as User;
        } catch (error) {
          if (error instanceof KakaoSigninRequiredError) {
            throw new KakaoSigninRequiredError();
          }
          if (error instanceof KakaoAlreadySignupError) {
            throw new KakaoAlreadySignupError();
          }
          if (error instanceof Error) {
            return { error: error.message } as User;
          }

          throw new InvalidLoginError('알 수 없는 오류가 발생했습니다');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user.error) {
        throw new InvalidLoginError(user.error);
      }

      return true;
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      const isInitLogin = Boolean(account);

      if (isInitLogin) {
        return {
          ...token,
          data: user,
        };
      }
      if (trigger === 'update' && session) {
        const { email, profileImageUrl, nickname, password } =
          session as EditSessionRequest;

        token.data.user = {
          ...token.data.user,
          email: email || token.data.user.email,
          profileImageUrl: profileImageUrl || token.data.user.profileImageUrl,
          nickname: nickname || token.data.user.nickname,
          password: password || token.data.user.password,
        };
      }
      const isAccessTokenValid =
        Date.now() < token.data.validity.validUntil * 1000;
      const isRefreshTokenValid =
        Date.now() < token.data.validity.refreshUntil * 1000;

      if (isAccessTokenValid) {
        return token;
      }
      if (isRefreshTokenValid) {
        return await refreshAccessToken(token);
      }

      return { ...token, error: 'RefreshTokenExpired' } as JWT;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      const {
        user,
        validity,
        type,
        tokens: { access: accessToken },
      } = token.data;
      const { error } = token;

      const newSession = {
        ...session,
        user,
        validity,
        error,
        type,
        accessToken,
      };

      return newSession;
    },
  },
});

const _sign = async (credentials: Partial<Record<string, unknown>>) => {
  switch (credentials.type) {
    case 'kakao-signup': {
      try {
        const res = await mutateKaKaoSignUp({
          nickname: credentials.nickname as string,
          token: credentials.token as string,
        });

        return res;
      } catch (error) {
        if (error instanceof ApiError && error.status === 400) {
          // 이미 등록된 사용자
          throw new KakaoAlreadySignupError();
        }
      }
    }
    case 'kakao-signin': {
      try {
        const res = await mutateKaKaoSignIn(credentials.token as string);

        return res;
      } catch (error) {
        if (error instanceof ApiError && error.status === 403) {
          // 카카오 로그인 시 회원가입 필요
          throw new KakaoSigninRequiredError();
        }
      }
    }
    case 'signup': {
      const signupRes = await mutateSignup(
        signupInputSchema.parse({ ...credentials })
      );

      return signupRes;
    }
    default: {
      const signinRes = await mutateSignin(
        signinInputSchema.parse({ ...credentials })
      );

      return signinRes;
    }
  }
};

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    const refreshToken = nextAuthJWTCookie.data.tokens.refresh;

    if (!refreshToken) {
      throw new Error('Token is required');
    }
    const res = await fetchNewToken(nextAuthJWTCookie.data.tokens.refresh);

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res;
    const { exp: newAccessTokenExp }: DecodedJWT = jwtDecode(newAccessToken);
    const { exp: newRefreshTokenExp }: DecodedJWT = jwtDecode(newRefreshToken);

    // Update the token and validity in the next-auth cookie
    nextAuthJWTCookie.data.validity.validUntil = newAccessTokenExp;
    nextAuthJWTCookie.data.validity.refreshUntil = newRefreshTokenExp;
    nextAuthJWTCookie.data.tokens.access = newAccessToken;
    nextAuthJWTCookie.data.tokens.refresh = newRefreshToken;

    return { ...nextAuthJWTCookie };
  } catch (error) {
    console.debug(error);

    return {
      ...nextAuthJWTCookie,
      error: 'RefreshAccessTokenError',
    };
  }
}
export const { GET, POST } = handlers;
