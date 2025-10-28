import { getUserInfo } from '@/domain/auth/api';

export const queryKeys = {
  me: () => {
    return ['me'] as const;
  },
};

export const queryOptions = {
  me: () => {
    return {
      queryKey: queryKeys.me(),
      queryFn: () => getUserInfo(),
    };
  },
};
