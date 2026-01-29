import { getUserInfo } from '@/domain/user/api';

export const userQueryKeys = {
  me: () => ['me'] as const,
  profileEdit: () => ['user', 'profile-edit'] as const,
  profileImage: () => ['user', 'profile-image'] as const,
};

export const userQueryOptions = {
  me: () => ({
    queryKey: userQueryKeys.me(),
    queryFn: () => getUserInfo(),
  }),
  profileEdit: () => ({
    queryKey: userQueryKeys.profileEdit(),
    queryFn: () => getUserInfo(), // TODO: Optimize this to use profile edit endpoint when available
  }),
  profileImage: () => ({
    queryKey: userQueryKeys.profileImage(),
    queryFn: () => getUserInfo(), // TODO: Optimize this to use profile image endpoint when available
  }),
};
