import { useMutation } from '@tanstack/react-query';
import { mutateProfileImageCreate } from '@/domain/user/api';

export const useProfileImageCreateMutate = () => {
  return useMutation({
    mutationFn: mutateProfileImageCreate,
  });
};
