// ====================================
// User Information Types
// ====================================

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SignUpResponse = UserInfo;

// ====================================
// Profile Management Types
// ====================================

export interface ProfileEditRequest {
  nickname: string;
  profileImageUrl: string | null;
  newPassword: string;
}

export interface ProfileEditResponse extends UserInfo {}
export interface ProfileImageCreateResponse {
  profileImageUrl: string;
}

// ====================================
// OAuth Types
// ====================================

export interface KaKaoAuthButtonProps {
  text: string;
  kakaoUri: string;
}

export interface KaKaoAuthConfig {
  clientId: string;
  redirectUri: string;
  scope?: string;
}

export interface KaKaoAuthResponse {
  code: string;
  state?: string;
}
