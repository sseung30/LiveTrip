import type { User } from 'next-auth';

declare module 'next-auth' {
  export interface UserObject {
    id: number;
    nickname: string;
    email: string;
    profileImageUrl: string | null;
    password: string;
  }

  export interface BackendAccessJWT {
    access: string;
  }

  export interface BackendJWT extends BackendAccessJWT {
    refresh: string;
  }

  export interface DecodedJWT extends UserObject {
    exp: number;
    iat: number;
    id: number;
  }

  export interface AuthValidity {
    validUntil: number;
    refreshUntil: number;
  }
  export type SessionType = 'kakao' | 'normal';

  export interface User {
    refreshId: number;
    tokens: BackendJWT;
    type: SessionType;
    user: UserObject;
    validity: AuthValidity;
    error?: string;
  }

  export interface Session {
    user: UserObject;
    validity: AuthValidity;
    accessToken: JWT;
    type: SessionType;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }
  export interface EditSessionRequest {
    profileImageUrl: string | null;
    email: string;
    nickname: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    data: User;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }
}
