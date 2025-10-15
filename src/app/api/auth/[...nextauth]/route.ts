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
import { mutateSignin, mutateSignup } from '@/domain/auth/api';
import {
  signinInputSchema,
  type SignInResponse,
  signupInputSchema,
} from '@/domain/auth/type';

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
        console.debug('Initial signin');

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
        console.debug('Access token is still valid');

        return token;
      }
      if (isRefreshTokenValid) {
        //  console.debug("Access token is being refreshed");
        // return await refreshAccessToken(token);
      }

      console.debug('Both tokens have expired');

      return { ...token, error: 'RefreshTokenExpired' } as JWT;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      session.user = token.data.user;
      session.validity = token.data.validity;
      session.error = token.error;

      return session;
    },
  },
});

const _sign = async (credentials: Partial<Record<string, unknown>>) => {
  if ('nickname' in credentials) {
    const signupRes = await mutateSignup(
      signupInputSchema.parse({ ...credentials })
    );

    return signupRes as SignInResponse;
  }
  const signinRes = await mutateSignin(
    signinInputSchema.parse({ ...credentials })
  );

  return signinRes as SignInResponse;
};

export const { GET, POST } = handlers;
