import { useMutation } from '@tanstack/react-query';
import { mutateProfileEdit } from '@/api/users/api';

export const useProfileEditMutate = () => {
  return useMutation({
    mutationFn: mutateProfileEdit,
  });
};
