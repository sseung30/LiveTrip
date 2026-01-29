import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/domain/user/queryOptions';

export const useUserInfo = () => {
  return useQuery({ ...userQueryOptions.me(), retry: 0 });
};
