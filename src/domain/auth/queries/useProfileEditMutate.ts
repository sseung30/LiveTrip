import { useMutation } from '@tanstack/react-query';
import { mutateProfileEdit } from '@/domain/auth/api';

export const useProfileEditMutate = () => {
  return useMutation({
    mutationFn: mutateProfileEdit,
  });
};
