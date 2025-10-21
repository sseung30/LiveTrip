import { useMutation } from '@tanstack/react-query';
import { mutateProfileImageCreate } from '@/api/users/api';

export const useProfileImageCreateMutate = () => {
  return useMutation({
    mutationFn: mutateProfileImageCreate,
  });
};
