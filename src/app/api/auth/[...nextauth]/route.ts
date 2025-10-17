/* eslint-disable require-atomic-updates */
import { jwtDecode } from 'jwt-decode';
import NextAuth, {
  type AuthValidity,
  type BackendJWT,
  CredentialsSignin,
  type DecodedJWT,
  type Session,
  type User,
} from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { fetchNewToken, mutateSignin, mutateSignup } from '@/domain/auth/api';
import { signinInputSchema, signupInputSchema } from '@/domain/auth/type';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
  constructor(message: string) {
    super(message);
    this.code = message;
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
          };

          return {
            refreshId: refresh.id,
            tokens,
            user,
            validity,
          } as User;
        } catch (error) {
          if (error instanceof Error) {
            return { error: error.message } as User;
          }

          return null;
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
    jwt: async ({ token, user, account }) => {
      const isInitLogin = Boolean(account);

      if (isInitLogin) {
        return {
          ...token,
          data: user,
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
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;
      session.accessToken = token.data.tokens.access;

      return session;
    },
  },
});

const _sign = async (credentials: Partial<Record<string, unknown>>) => {
  if ('nickname' in credentials) {
    const signupRes = await mutateSignup(
      signupInputSchema.parse({ ...credentials })
    );

    return signupRes;
  }
  const signinRes = await mutateSignin(
    signinInputSchema.parse({ ...credentials })
  );

  return signinRes;
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
