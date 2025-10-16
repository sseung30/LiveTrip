type User = {
  name: string;
  avatarUrl?: string;
  hasNotification?: boolean;
} | null;

export interface ProfileDropdownProps {
  profileImageUrl: string | null;
  nickname: string;
}
