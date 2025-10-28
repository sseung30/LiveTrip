import { useQuery } from '@tanstack/react-query';
import { queryOptions } from '@/domain/auth/queryOptions';

export const useUserInfo = () => {
  return useQuery({ ...queryOptions.me(), retry: 0 });
};
