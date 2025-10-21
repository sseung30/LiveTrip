import { useMutation } from '@tanstack/react-query';
import { mutateProfileImageCreate } from '@/domain/auth/api';

export const useProfileImageCreateMutate = () => {
  return useMutation({
    mutationFn: mutateProfileImageCreate,
  });
};
